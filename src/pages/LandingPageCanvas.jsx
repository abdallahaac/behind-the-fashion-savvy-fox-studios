import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import right_arrow from "../assets/images/right-arrow.svg";
import wordmark from "../assets/images/Savvy Fox Logo Wordmark.png";
import production from "../assets/images/A Savvy Fox Studios production.png";
import Scene from "../utils/Scene.jsx"; // Importing Scene component
import BackgroundImage from "../assets/images/background-image.svg"; // Update the path to your SVG

const LandingPageCanvas = () => {
	const navigate = useNavigate();
	const handleStartExp = (e) => {
		e.preventDefault();
		navigate("/room");
	};

	const [isFading, setIsFading] = useState(false);

	const modelsByCategory = useModels();
	const allModels = modelsByCategory.EthicallyStrongOptions;
	const selectedModel = allModels[0] || null;

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
		};

		applyStyles(styles);

		// Cleanup function to reset styles when component unmounts
		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<div className="landing-canvas-page">
			{/* Full-screen Canvas Scene */}
			{/* <Scene /> */}

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
							STEP INTO THE ROLE OF A FASHION BRAND CEO.
						</h1>
						<p className="body-text-medium">
							Experience what it's like to build a fashion brand from the ground
							up, while <br /> managing crucial factors such as budget,
							audience, and sustainability.
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
				</div>
			</main>
		</div>
	);
};

export default LandingPageCanvas;
