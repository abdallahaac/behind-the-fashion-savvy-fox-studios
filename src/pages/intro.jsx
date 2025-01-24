import "../intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { ModelsProvider, useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import BackgroundImage from "../assets/images/background-image.svg"; // Update the path to your SVG
import Experience from "../Experience.jsx";

const Intro = () => {
	const navigate = useNavigate();
	const handleSkipIntro = (e) => {
		e.preventDefault();
		navigate("/landing-page");
	};

	const sentences = [
		"Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society. ",
		"Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three?  Lets find out.",
	];

	const [revealedWords, setRevealedWords] = useState([[]]); // Tracks revealed words for each sentence
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // Tracks the current sentence
	const [currentWordIndex, setCurrentWordIndex] = useState(0); // Tracks the word index within the current sentence
	const [isFading, setIsFading] = useState(false); // Tracks if the text is fading out

	const modelsByCategory = useModels();
	const allModels = modelsByCategory.EthicallyStrongOptions;
	const selectedModel = allModels[0] || null;
	// const modelPath = selectedModel?.model || null;

	useEffect(() => {
		const words = sentences[currentSentenceIndex]?.split(" ") || [];
		const interval = setInterval(() => {
			if (currentWordIndex < words.length) {
				// Reveal words one by one in the current sentence
				setRevealedWords((prev) => {
					const updated = [...prev];
					updated[currentSentenceIndex] = [
						...(updated[currentSentenceIndex] || []),
						words[currentWordIndex],
					];
					return updated;
				});
				setCurrentWordIndex((prev) => prev + 1);
			} else if (currentSentenceIndex < sentences.length - 1) {
				// Move to the next sentence after a short delay
				setTimeout(() => {
					setCurrentSentenceIndex((prev) => prev + 1);
					setCurrentWordIndex(0);
				}, 1000); // Delay before starting the next sentence
				clearInterval(interval);
			}
			// else {
			// 	// Wait 5 seconds before fading out the words
			// 	setTimeout(() => {
			// 		setIsFading(true);
			// 		setTimeout(() => {
			// 			navigate("/landing-page");
			// 		}, 1000); // Duration of the fade-out animation before navigating to the next page
			// 	}, 5000); // Wait 5 seconds before starting the fade-out
			// 	clearInterval(interval);
			// }
			//
			//
		}, 100); // Adjust the interval to control the speed of word reveal
		return () => clearInterval(interval);
	}, [currentWordIndex, currentSentenceIndex, sentences, navigate]);

	useEffect(() => {
		// Apply styles to body and html elements
		const applyStyles = (styles) => {
			Object.keys(styles).forEach((key) => {
				document.body.style[key] = styles[key];
				document.documentElement.style[key] = styles[key];
			});
		};

		const styles = {
			margin: "0",
			padding: "0",
			fontFamily: '"Kode Mono", monospace',
			height: "100vh",
			overflow: "hidden",
			background: "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)",
		};

		applyStyles(styles);

		// Cleanup function to reset styles when component unmounts
		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<div className="homepage">
			<header className="banner">
				<Marquee
					gradient={false}
					speed={30}
					pauseOnHover={false}
					style={{ marginTop: 10, marginBottom: 10 }}
				>
					&nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
					// BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
					BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
				</Marquee>
			</header>

			<main className="content">
				<div className="text-content">
					<div className={`intro-header ${isFading ? "fade-out" : ""}`}>
						<h1 className="accent-5">BEHIND THE FASHION</h1>
						<h2 className="accent-6">// INTRO</h2>
					</div>
					<div className="intro-body">
						{revealedWords.map((words, sentenceIndex) => (
							<p key={sentenceIndex} className={isFading ? "fade-out" : ""}>
								{words.map((word, wordIndex) => (
									<span key={wordIndex} className="fade-in-word">
										{word}{" "}
									</span>
								))}
							</p>
						))}
						<a
							href="#"
							className={`skip-intro  ${isFading ? "fade-out" : ""} accent-5`}
							onClick={handleSkipIntro}
						>
							[SKIP INTRO]
						</a>
					</div>
				</div>

				<div className="intro-image model-container">
					<img src={BackgroundImage} alt="Background Image" />
					{/* <Canvas
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                        }}
                        camera={{
                            fov: 34,
                            near: 0.1,
                            far: 200,
                            position: [0.5, 2.9, 5.2],
                            rotation: [-0.19, -0.1, 0.11],
                        }}
                    >
                        <Experience selectedModel={selectedModel} />
                    </Canvas> */}
				</div>
			</main>
		</div>
	);
};

// const root = ReactDOM.createRoot(document.querySelector("#root"));

// root.render(<Intro />);

export default Intro;
