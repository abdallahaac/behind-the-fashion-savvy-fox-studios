import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";
import LogoSVG from "../assets/images/logo.svg"; // Assuming the SVG is imported as a file path

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import right_arrow from "../assets/images/right-arrow.svg";
import wordmark from "../assets/images/Savvy Fox Logo Wordmark.png";
import production from "../assets/images/credits.svg";
import Scene from "../utils/Scene.jsx"; // Importing Scene component
import BackgroundImage from "../assets/images/background-image.svg"; // Update the path if needed
import FullScreenVideo from '../components/FullScreenVideo.jsx';
import videoSrc from '../assets/videos/intro_video.mp4';

// Import FontAwesomeIcon and the volume icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

// Import GSAP for animations
import gsap from "gsap";

const LandingPageCanvas = () => {
	const navigate = useNavigate();
	const [playVideo, setPlayVideo] = useState(false);


	const handleStartExp = (e) => {
        e.preventDefault();
        // Animate the overlay's opacity to 1 for a smooth cross-fade
        gsap.to(".transition-overlay", {
            duration: 0.5,
            opacity: 1,
            ease: "power2.inOut",
            onComplete: () => {
                setPlayVideo(true);
            },
        });
    };

	const handleVideoEnd = () => {
        gsap.to(".transition-overlay", {
            duration: 0.5,
            opacity: 1,
            ease: "power2.inOut",
            onComplete: () => {
                navigate("/room");
            },
        });
    };

	// State to toggle sound on/off; defaults to false (sound off, showing xmark)
	const [soundOn, setSoundOn] = useState(true);
	const toggleSound = () => {
		setSoundOn((prev) => !prev);
	};

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
			background: "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)", // match your background
		};

		applyStyles(styles);

		// Cleanup: reset styles when component unmounts
		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<>
			{/* The cross-fade overlay */}
			<div className="transition-overlay" />
			{playVideo && <FullScreenVideo videoSrc={videoSrc} onVideoEnd={handleVideoEnd} />}


			<div className="landing-canvas-page">
				{/* Full-screen Canvas Scene */}
				{/* <Scene /> */}

				<header className="banner">
					{/* The marquee text */}
					<Marquee
						gradient={false}
						speed={30}
						pauseOnHover={false}
						className="marquee-center"
					>
						&nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
						// BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
						BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
						BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
						BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
						BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
					</Marquee>

					{/* The clipped logo */}
					<img
						src={LogoSVG}
						alt="Logo"
						className="superimposed-logo super-landing"
					/>
				</header>

				<main className="content">
					<div className="text-content fade-in">
						<div className="landing-body fade-in">
							<h1 className="landing-h1 landing-page">
								STEP INTO THE ROLE OF A FASHION BRAND CEO.
							</h1>
							<p className="body-text-medium">
								Experience what it's like to build a fashion brand from the
								ground up, while <br /> managing crucial factors such as budget,
								audience, and sustainability.
							</p>
						</div>

						<div className="audio-start">
							<button
								id="start-button"
								className="add-button body-text-medium fade-in"
								onClick={handleStartExp}
							>
								Build Your Brand
							</button>

							{/* Audio button with the icon that toggles on click */}
							<div className="audio-btn" onClick={toggleSound}>
								<FontAwesomeIcon
									icon={soundOn ? faVolumeHigh : faVolumeXmark}
								/>
							</div>
						</div>

						<div className="credits-container fade-in">
							<img src={production} alt="production" />
						</div>
					</div>
					<div className="intro-image model-container fade-in">
						<img
							style={{ position: "absolute", width: "100%", height: "100%" }}
							src={LogoSVG}
							alt="Background Image"
						/>
					</div>
				</main>
			</div>
		</>
	);
};

export default LandingPageCanvas;
