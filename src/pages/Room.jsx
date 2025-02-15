import React, { useState, useEffect, useRef } from "react";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import BuildBrand from "./BuildBrandCanvas";
import gsap from "gsap";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";

function Room() {
	// --- Shared State for Vanguard ---
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);

	// --- Tutorial Visibility ---
	const [showTutorial, setShowTutorial] = useState(false);

	// Other Room states...
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [showPrompt, setShowPrompt] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [
		31, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];
	const promptComponents = [<BuildBrand />];

	// --- Functions for the Tutorial Flow ---
	const openTutorial = () => {
		setShowTutorial(true);
	};

	const closeTutorial = () => {
		setShowTutorial(false);
		// Turn off blinking for the first vanguard.
		setVanguardActiveStates((prev) => {
			const newState = [...prev];
			newState[0] = false;
			return newState;
		});
	};

	// ... (rest of your Room component remains unchanged)
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setShowPrompt(true);
	};

	const handlePlayClick = () => {
		console.log("Play clicked, triggering animation.");
		setPlayAnimation(true);
		setPaused(false);
		setShowPrompt(false);
		setCurrentBreakpointIndex(0);
	};

	const handleContinue = () => {
		setFadeOut(true);
		setTimeout(() => {
			setShowPrompt(false);
			setPaused(false);
			setFadeOut(false);
			setCurrentBreakpointIndex((prev) => prev + 1);
		}, 300);
	};

	// Refs for GSAP fade in
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	useEffect(() => {
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);
	useEffect(() => {
		gsap.fromTo(
			logoContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);

	return (
		<>
			{/* Logo at the top */}
			<div className="logo-container" ref={logoContainerRef}>
				<Logo />
			</div>

			<div
				className="canvas-container"
				style={{ position: "relative" }}
				ref={canvasContainerRef}
			>
				{/* "Play" button */}
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						padding: "8px 16px",
						zIndex: 200,
					}}
					onClick={handlePlayClick}
				>
					Play
				</button>

				{/* "Continue" button */}
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "100px",
						padding: "8px 16px",
						zIndex: 200,
					}}
					onClick={handleContinue}
				>
					Continue
				</button>

				{/* Conditionally render the Tutorial */}
				{showTutorial && <VanguardTutorial onClose={closeTutorial} />}

				{/* Pass the shared vanguard state and a click handler */}
				<Vanguard
					activeStates={vanguardActiveStates}
					onVanguardClick={openTutorial}
				/>

				{/* The 3D Scene */}
				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
				/>

				{/* Prompt overlay */}
				{(showPrompt || fadeOut) && (
					<div
						style={{
							opacity: fadeOut ? 0 : fadeIn ? 1 : 0,
							transition: "opacity 300ms ease-in-out",
						}}
					>
						{React.cloneElement(
							promptComponents[currentBreakpointIndex] || <DefaultPrompt />,
							{ onContinue: handleContinue }
						)}
					</div>
				)}
			</div>
		</>
	);
}

function DefaultPrompt({ onContinue }) {
	return (
		<div>
			<p>Breakpoint reached. Click to continue.</p>
			<button onClick={onContinue}>Continue</button>
		</div>
	);
}

export default Room;
