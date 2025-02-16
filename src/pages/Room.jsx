import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";
import CreateBrand from "../components/CreateBrand";

function Room() {
	// States
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);
	const [showTutorial, setShowTutorial] = useState(false);

	// Scene playback & breakpoints
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);

	// If you only want to show CreateBrand on a certain breakpoint,
	// we can toggle it with this boolean:
	const [showCreateBrand, setShowCreateBrand] = useState(false);

	// The active breakpoint
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Our breakpoints
	const breakpoints = [44, 183, 339, 550];

	// Show Vanguard UI after the first breakpoint is reached
	const [showVanguardUI, setShowVanguardUI] = useState(false);

	// Refs for GSAP
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);

	// ---------------------------
	// GSAP Effects (initial fade-ins)
	// ---------------------------
	useEffect(() => {
		// Fade in the 3D canvas
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			}
		);
		// Fade in the logo
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

	// Hides Vanguard container initially
	useEffect(() => {
		if (vanguardContainerRef.current) {
			gsap.set(vanguardContainerRef.current, { opacity: 0 });
		}
	}, []);

	// If we decide to show the Vanguard UI
	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			gsap.fromTo(
				vanguardContainerRef.current,
				{ opacity: 0 },
				{
					duration: 1,
					opacity: 1,
					ease: "power3.out",
				}
			);
		}
	}, [showVanguardUI]);

	// Called automatically for each breakpoint by <Scene />
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		// Example: the first time we hit breakpoint 0, show Vanguard
		if (index === 0) {
			setShowVanguardUI(true);
		}
		// Example: the second time we hit a breakpoint (index=1), show CreateBrand
		if (index === 1) {
			setShowCreateBrand(true);
		}
	};

	// Start the main animation
	const handlePlayClick = () => {
		setPlayAnimation(true);
		setPaused(false);
	};

	// Move to the next breakpoint
	const handleContinue = () => {
		setPaused(false);
		setCurrentBreakpointIndex((prev) => prev + 1);
	};

	// For Vanguard tutorial usage
	const openTutorial = () => {
		setShowTutorial(true);
	};
	const closeTutorial = () => {
		setShowTutorial(false);
		setVanguardActiveStates((prev) => {
			const newState = [...prev];
			newState[0] = false;
			return newState;
		});
	};
	const handleTutorialDone = () => {
		closeTutorial();
		handleContinue();
	};

	// Auto-play once the Room is loaded
	useEffect(() => {
		handlePlayClick();
	}, []);

	return (
		<>
			{/* Logo at top */}
			<div className="logo-container" ref={logoContainerRef}>
				<Logo />
			</div>

			<div
				className="canvas-container"
				style={{ position: "relative" }}
				ref={canvasContainerRef}
			>
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
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
						left: "80px",
						zIndex: 200,
					}}
					onClick={handleContinue}
				>
					Continue
				</button>

				{showTutorial && <VanguardTutorial onDone={handleTutorialDone} />}

				{showVanguardUI && (
					<div ref={vanguardContainerRef}>
						<Vanguard
							activeStates={vanguardActiveStates}
							onVanguardClick={openTutorial}
						/>
					</div>
				)}

				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
				/>

				{/* 
          Render CreateBrand only once in the entire flow. 
          showCreateBrand determines if/when it's visible.
        */}
				{showCreateBrand && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CreateBrand
							// Here’s the crucial part: onStart => we simply continue to next breakpoint
							onStart={() => {
								handleContinue();
								// We DO NOT hide CreateBrand, so it doesn't fade out.
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Room;
