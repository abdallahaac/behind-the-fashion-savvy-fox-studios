import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";

// Import the CreateBrand component
import CreateBrand from "../components/CreateBrand";

function Room() {
	// Shared state for Vanguard
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);

	// Tutorial visibility
	const [showTutorial, setShowTutorial] = useState(false);

	// Animation states
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [showPrompt, setShowPrompt] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Breakpoints
	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	// PROMPT COMPONENTS:
	// Index 0 => an empty fragment (no prompt),
	// Index 1 => <CreateBrand />, etc.
	const promptComponents = [
		<></>,
		<CreateBrand />,
		// If you have more breakpoints requiring different prompts, add them here
	];

	// Show Vanguard UI after hitting first breakpoint
	const [showVanguardUI, setShowVanguardUI] = useState(false);

	// Refs for GSAP
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);

	// ---------------------------------
	// TUTORIAL FLOW
	// ---------------------------------
	const openTutorial = () => {
		setShowTutorial(true);
	};

	const closeTutorial = () => {
		setShowTutorial(false);
		// Turn off blinking for the first vanguard
		setVanguardActiveStates((prev) => {
			const newState = [...prev];
			newState[0] = false;
			return newState;
		});
	};

	// Called when a breakpoint is reached
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setShowPrompt(true);

		// If it's the very first breakpoint, show Vanguard UI
		if (index === 0) {
			setShowVanguardUI(true);
		}
	};

	// Start playing the animation from the beginning
	const handlePlayClick = () => {
		console.log("Play clicked, triggering animation.");
		setPlayAnimation(true);
		setPaused(false);
		setShowPrompt(false);
		setCurrentBreakpointIndex(0);
	};

	// This will be passed down and called by the prompt (e.g., CreateBrand) to continue
	const handleContinue = () => {
		// Fade out the prompt, then hide it and unpause animation
		setFadeOut(true);

		setTimeout(() => {
			setShowPrompt(false);
			setPaused(false);
			setFadeOut(false);

			// Advance to next breakpoint
			setCurrentBreakpointIndex((prev) => prev + 1);
		}, 300);
	};

	// Called when the tutorial "Done" button is fully held
	const handleTutorialDone = () => {
		closeTutorial();
		handleContinue();
	};

	// Fade in canvas on mount
	useEffect(() => {
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			}
		);
	}, []);

	// Fade in logo on mount
	useEffect(() => {
		gsap.fromTo(
			logoContainerRef.current,
			{ opacity: 0 },
			{
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			}
		);
	}, []);

	// Ensure Vanguard container starts hidden
	useEffect(() => {
		if (vanguardContainerRef.current) {
			gsap.set(vanguardContainerRef.current, { opacity: 0 });
		}
	}, []);

	// Fade in the Vanguard container once showVanguardUI is true
	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			gsap.fromTo(
				vanguardContainerRef.current,
				{ opacity: 1 },
				{
					duration: 1,
					opacity: 1,
					ease: "power3.out",
				}
			);
		}
	}, [showVanguardUI]);

	// Autoplay the animation once the Room mounts
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

				{/* Conditionally render the VanguardTutorial */}
				{showTutorial && <VanguardTutorial onDone={handleTutorialDone} />}

				{/* Show Vanguard UI after the first breakpoint */}
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

				{/* Prompt overlay for breakpoints */}
				{(showPrompt || fadeOut) && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1,
							// fadeOut or fadeIn logic
							opacity: fadeOut ? 0 : fadeIn ? 1 : 1,
							transition: "opacity 300ms ease-in-out",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{React.cloneElement(
							promptComponents[currentBreakpointIndex] || <DefaultPrompt />,
							{
								// Pass handleContinue down to whichever prompt is showing
								onContinue: handleContinue,
							}
						)}
					</div>
				)}
			</div>
		</>
	);
}

// A default prompt if there's no matching index in promptComponents
function DefaultPrompt({ onContinue }) {
	return (
		<div style={{ background: "#FFF", padding: 20, borderRadius: 10 }}>
			<p>Breakpoint reached. Click to continue.</p>
			<button onClick={onContinue}>Continue</button>
		</div>
	);
}

export default Room;
