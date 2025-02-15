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

	// The breakpoints your animation will hit
	const breakpoints = [
		31, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	// The different prompt components to show at each breakpoint
	const promptComponents = [<BuildBrand />];

	// --- Vanguard UI visibility ---
	const [showVanguardUI, setShowVanguardUI] = useState(false);

	// GSAP Refs
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);

	// --- Tutorial Flow Functions ---
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

	// When a breakpoint is reached...
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setShowPrompt(true);

		// When the first breakpoint is hit, show Vanguard UI
		if (index === 0) {
			setShowVanguardUI(true);
		}
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

	// Close tutorial AND continue
	const handleTutorialDone = () => {
		closeTutorial();
		handleContinue();
	};

	// ---- GSAP Animations ----
	// 1) Fade in the canvas on mount
	useEffect(() => {
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);

	// 2) Fade in the logo on mount
	useEffect(() => {
		gsap.fromTo(
			logoContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);

	// 3) Make sure the Vanguard container starts hidden
	useEffect(() => {
		if (vanguardContainerRef.current) {
			gsap.set(vanguardContainerRef.current, { opacity: 0 });
		}
	}, []);

	// 4) Fade in the Vanguard container when showVanguardUI becomes true
	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			gsap.fromTo(
				vanguardContainerRef.current,
				{ opacity: 1 },
				{ duration: 1, opacity: 1, ease: "power3.out" }
			);
		}
	}, [showVanguardUI]);

	// Auto-play the animation when the Room component mounts
	useEffect(() => {
		handlePlayClick();
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
				{/* Debugging buttons */}
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
				{showTutorial && <VanguardTutorial onDone={handleTutorialDone} />}

				{/* Vanguard UI fades in once the first breakpoint is reached */}
				{showVanguardUI && (
					<div ref={vanguardContainerRef}>
						<Vanguard
							activeStates={vanguardActiveStates}
							onVanguardClick={openTutorial}
						/>
					</div>
				)}

				{/* The 3D Scene */}
				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
				/>

				{/* Prompt overlay (fadeOut or fadeIn logic) */}
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
