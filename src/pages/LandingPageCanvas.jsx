import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";
import LogoThree from "../../public/images/Logo1.png";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import gsap from "gsap";

// R3F + Drei
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

// 1) Import Leva
import { Leva } from "leva";

// Local assets...
import LogoSVG from "../assets/images/logo.svg";
import production from "../assets/images/credits.svg";
import FullScreenVideo from "../components/FullScreenVideo.jsx";
import videoSrc from "../assets/videos/intro_video.mp4";

// Your glTF-based 3D logo component that now uses Leva controls and animates rotation
import MainLogo from "../models/Logos/landingPage.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import FilmGrain from "../utils/MakeItGrain.jsx";
import hdrFile from "../assets/images/hdrFile.hdr";

const LandingPageCanvas = () => {
	const navigate = useNavigate();
	const [playVideo, setPlayVideo] = useState(false);

	const handleStartExp = (e) => {
		e.preventDefault();
		gsap.to(".transition-overlay", {
			duration: 0.5,
			opacity: 1,
			ease: "power2.inOut",
			onComplete: () => setPlayVideo(true),
		});
	};

	const handleVideoEnd = () => {
		gsap.to(".transition-overlay", {
			duration: 0.5,
			opacity: 1,
			ease: "power2.inOut",
			onComplete: () => navigate("/room"),
		});
	};

	const [soundOn, setSoundOn] = useState(true);
	const toggleSound = () => setSoundOn((prev) => !prev);

	const modelsByCategory = useModels();
	const allModels = modelsByCategory.EthicallyStrongOptions;
	const selectedModel = allModels[0] || null;

	// Apply custom body/html styling
	useEffect(() => {
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
			background: "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)",
		});

		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<>
			{/* Fullscreen overlay + optional video */}
			<div className="transition-overlay" />
			{playVideo && (
				<FullScreenVideo videoSrc={videoSrc} onVideoEnd={handleVideoEnd} />
			)}

			{/* The main container */}
			<div className="landing-canvas-page">
				{/* HEADER */}
				<header className="banner">
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
						BEHIND THE FASHION //
					</Marquee>

					<img
						src={LogoThree}
						alt="Logo"
						className="superimposed-logo super-landing"
					/>
				</header>

				{/* MAIN CONTENT */}
				<main className="content">
					<div className="text-content fade-in">
						<div className="landing-body fade-in">
							<h1 className="landing-h1 landing-page">
								STEP INTO THE ROLE OF A FASHION BRAND CEO.
							</h1>
							<p className="body-text-medium">
								Experience what it's like to build a fashion brand...
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

					{/* Canvas + 3D Model */}
					<div
						className="intro-image model-container fade-in"
						style={{ position: "relative", width: "100%", height: "100%" }}
					>
						<Canvas
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								pointerEvents: "auto",
							}}
							camera={{ position: [0, 0, 5], fov: 45 }}
						>
							<FilmGrain />

							<ambientLight intensity={1.2} />
							<directionalLight intensity={1} position={[1, 1, 10]} />

							{/* The 3D Main Logo (with Leva controls for position/rotation/scale) */}
							<MainLogo />

							{/* Hide OrbitControls by disabling them */}
							<OrbitControls enabled={false} />

							<Environment files={hdrFile} background={false} />
						</Canvas>
					</div>
				</main>
			</div>

			{/* If you want to hide the Leva panel, simply remove or comment it out.
          For now, it's omitted so nothing extra appears.
      */}
		</>
	);
};

export default LandingPageCanvas;
