import "../assets/styles/intro-style.css";
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
import right_arrow from "../assets/images/right-arrow.svg";
import wordmark from "../assets/images/Savvy Fox Logo Wordmark.png";
import production from "../assets/images/A Savvy Fox Studios production.png";
import logo from "../assets/images/logo.svg";
import Experience from "../Experience.jsx";

const LandingPage = () => {
	const navigate = useNavigate();
	const handleStartExp = (e) => {
		e.preventDefault();
		navigate("/build-a-brand");
	};

	const [isFading, setIsFading] = useState(false); // Tracks if the text is fading out

	const modelsByCategory = useModels();
	const allModels = modelsByCategory.EthicallyStrongOptions;
	const selectedModel = allModels[0] || null;
	// const modelPath = selectedModel?.model || null;

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
				<div className="text-content fade-in">
					<div className="landing-header fade-in">
						<h1 className="accent-5">BEHIND THE FASHION</h1>
						<h2 className="accent-6">// LANDING PAGE</h2>
					</div>
					<div className="landing-body fade-in">
						<h1 className="landing-h1 landing-page">
							{" "}
							STEP INTO THE ROLE OF A FASHION BRAND CEO.
						</h1>
						<p className="body-text-medium">
							{" "}
							Experience what its like to build a fashion brand from the ground
							up, while <br /> managing crucial factors such as budget,
							audience, and sustainability.{" "}
						</p>
					</div>
					<button
						id="start-button"
						className="add-button body-text-medium fade-in"
						onClick={handleStartExp}
					>
						Start the Experience
						<div className="button-icon">
							<img src={right_arrow} alt="Right Arrow Icon" />
						</div>
					</button>
					<div className="credits-container fade-in">
						<img className="wordmark" src={wordmark} alt="wordmark Image" />
						<img src={production} alt="production" />
					</div>
				</div>

				<div className="intro-image model-container fade-in">
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

export default LandingPage;
