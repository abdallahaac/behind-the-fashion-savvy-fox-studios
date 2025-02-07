import React, { useState, useEffect } from "react";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import BuildBrand from "./BuildBrandCanvas";

function Room() {
	// Start or stop all animations
	const [playAnimation, setPlayAnimation] = useState(false);

	// If animation is playing, we can pause at breakpoints
	const [paused, setPaused] = useState(false);

	// Whether the prompt should be displayed (mounted)
	const [showPrompt, setShowPrompt] = useState(false);

	// Whether we are currently fading out the prompt (true = in transition)
	const [fadeOut, setFadeOut] = useState(false);

	// Whether we are currently fading in
	const [fadeIn, setFadeIn] = useState(false);

	// Which breakpoint index are we expecting next?
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Define your desired breakpoints here:
	const breakpoints = [
		31, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	// Specialized UI for each breakpoint index:
	const promptComponents = [
		// e.g. <PromptOne />,
		<></>,
		<></>,
		<BuildBrand />,
		// e.g. <PromptTwo />,
		// e.g. <PromptThree />,
		// ...
	];

	/*
    Whenever "showPrompt" flips to true:
    1. We mount the prompt at opacity: 0 (fadeIn = false initially).
    2. After a tiny delay (50ms), set fadeIn = true to transition from 0 -> 1.
  */
	useEffect(() => {
		if (showPrompt) {
			setFadeIn(false); // make sure it starts at 0
			const timer = setTimeout(() => {
				setFadeIn(true); // next render => 1 (triggers CSS transition)
			}, 50);
			return () => clearTimeout(timer);
		} else {
			setFadeIn(false);
		}
	}, [showPrompt]);

	// Called by Scene when a breakpoint is reached
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setShowPrompt(true); // triggers fade-in effect
	};

	// "Play" button starts (or restarts) the animation
	const handlePlayClick = () => {
		console.log("Play clicked, triggering animation.");
		setPlayAnimation(true);
		setPaused(false);
		setShowPrompt(false);
		setCurrentBreakpointIndex(0); // optional reset
	};

	// "Continue" button fades out the prompt & continues the animation
	const handleContinue = () => {
		setFadeOut(true);

		setTimeout(() => {
			setShowPrompt(false); // unmount prompt
			setPaused(false);
			setFadeOut(false); // reset fadeOut
			setCurrentBreakpointIndex((prev) => prev + 1);
		}, 300); // 300ms matches our CSS transition
	};

	return (
		<>
			{/* Logo at the top */}
			<div className="logo-container">
				<Logo />
			</div>

			{/* Parent container with position: relative */}
			<div className="canvas-container" style={{ position: "relative" }}>
				{/* "Play" button */}
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						padding: "8px 16px",
						zIndex: 10,
					}}
					onClick={handlePlayClick}
				>
					Play
				</button>

				{/* "Continue" button right beside "Play" */}
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "100px",
						padding: "8px 16px",
						zIndex: 10,
					}}
					onClick={handleContinue}
				>
					Continue
				</button>

				{/* The 3D Scene */}
				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
				/>

				{/*
          Show the prompt overlay if:
            - showPrompt is true (we're at a breakpoint), or
            - fadeOut is true (we're in the middle of a fade-out).
        */}
				{(showPrompt || fadeOut) && (
					<div
						style={{
							position: "absolute",
							top: "200px",
							left: "50%",
							transform: "translateX(-50%)",
							padding: "16px",
							zIndex: 9999,

							// FADE LOGIC:
							// - fadeOut => 0
							// - else fadeIn => 1
							// - else => 0 (before it has had time to fade in)
							opacity: fadeOut ? 0 : fadeIn ? 1 : 0,
							transition: "opacity 0.3s ease",

							backgroundColor: "white",
							border: "2px solid black",
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

// Fallback component if you haven't defined something in `promptComponents`
function DefaultPrompt({ onContinue }) {
	return (
		<div>
			<p>Breakpoint reached. Click to continue.</p>
			<button onClick={onContinue}>Continue</button>
		</div>
	);
}

export default Room;
