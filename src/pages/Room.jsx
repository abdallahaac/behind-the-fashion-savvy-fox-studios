import React, { useState } from "react";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";

function Room() {
	// Start or stop all animations
	const [playAnimation, setPlayAnimation] = useState(false);

	// If animation is playing, we can pause at breakpoints
	const [paused, setPaused] = useState(false);

	// Show a DOM overlay “Click to continue”
	const [showPrompt, setShowPrompt] = useState(false);

	// Which breakpoint index are we expecting next?
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Define your desired breakpoints here:
	const breakpoints = [
		31, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	// Called by EnvironmentWithCamera when we hit a breakpoint
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		// Pause the animation at the breakpoint
		setPaused(true);
		// Show the popup overlay
		setShowPrompt(true);
	};

	// Called when the user clicks "Play"
	const handlePlayClick = () => {
		console.log("Play clicked, triggering animation.");
		// Start (or restart) the animation
		setPlayAnimation(true);
		// Make sure we’re unpaused if we’re re-starting
		setPaused(false);
		setShowPrompt(false);
		// Reset back to the first breakpoint if desired
		setCurrentBreakpointIndex(0);
	};

	// Called when user clicks the “Continue” button in the popup
	const handleContinue = () => {
		// Hide the overlay
		setShowPrompt(false);
		// Resume the animation
		setPaused(false);
		// Move to the next breakpoint
		setCurrentBreakpointIndex((prev) => prev + 1);
	};

	return (
		<>
			{/* Same top logo as before */}
			<div className="logo-container">
				<Logo />
			</div>

			{/* Parent container with position: relative, so we can absolutely place elements over the Canvas */}
			<div className="canvas-container" style={{ position: "relative" }}>
				{/* The same "Play" button style as old code */}
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

				{/* Pass all relevant props into Scene */}
				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
				/>

				{/* Show the overlay at a breakpoint */}
				{showPrompt && (
					<div
						style={{
							position: "absolute",
							top: "200px",
							left: "50%",
							transform: "translateX(-50%)",
							padding: "16px",
							backgroundColor: "white",
							border: "2px solid black",
							zIndex: 9999,
						}}
					>
						<p>Breakpoint reached. Click to continue.</p>
						<button onClick={handleContinue}>Continue</button>
					</div>
				)}
			</div>
		</>
	);
}

export default Room;
