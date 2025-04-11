import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { useModels } from "../utils/ModelsContext.jsx";
import Scene from "../utils/Scene.jsx";

const IntroSingleCanvas = () => {
	const navigate = useNavigate();

	// Skip Intro handler
	const handleSkipIntro = (e) => {
		e.preventDefault();
		navigate("/landing-page");
	};

	// Typed-text / reveal logic
	const sentences = [
		"Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society.",
		"Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three? Lets find out.",
	];
	const [revealedWords, setRevealedWords] = useState([[]]);
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);

	// Grabbing the model from context
	const modelsByCategory = useModels();
	const allModels = modelsByCategory.EthicallyStrongOptions;
	const selectedModel = allModels[0] || null;

	useEffect(() => {
		const words = sentences[currentSentenceIndex]?.split(" ") || [];
		const interval = setInterval(() => {
			if (currentWordIndex < words.length) {
				// Reveal words one by one
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
				// Move to next sentence
				setTimeout(() => {
					setCurrentSentenceIndex((prev) => prev + 1);
					setCurrentWordIndex(0);
				}, 1000);
				clearInterval(interval);
			}
			// Optional fade-out logic after the last sentence
			// ...
		}, 100);

		return () => clearInterval(interval);
	}, [currentWordIndex, currentSentenceIndex, sentences]);

	useEffect(() => {
		// Apply basic body/html styles
		const applyStyles = (styles) => {
			Object.keys(styles).forEach((key) => {
				document.body.style[key] = styles[key];
				document.documentElement.style[key] = styles[key];
			});
		};

		applyStyles({
			margin: "0",
			padding: "0",
			fontFamily: '"Kode Mono", monospace',
			height: "100vh",
			overflow: "hidden",
		});

		// Cleanup on unmount
		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<div className="intro-canvas-page">
			{/* Single Canvas as a background (Scene) */}
			<Scene />

			{/* Marquee / Banner */}
			<header className="banner">
				<Marquee gradient={false} speed={30} pauseOnHover={false}>
					&nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
					// BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
					BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
				</Marquee>
			</header>

			{/* Main Text Content */}
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
							className={`skip-intro ${isFading ? "fade-out" : ""} accent-5`}
							onClick={handleSkipIntro}
						>
							[SKIP INTRO]
						</a>
					</div>
				</div>
			</main>
		</div>
	);
};

export default IntroSingleCanvas;
