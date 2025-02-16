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
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [44, 183, 339, 550];
	const [showVanguardUI, setShowVanguardUI] = useState(false);

	// Refs for GSAP animations
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const tutorialContainerRef = useRef(null);

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

	// Animate Vanguard UI when it is rendered
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

	// Animate VanguardTutorial when it is shown (same as Vanguard UI)
	useEffect(() => {
		if (showTutorial && tutorialContainerRef.current) {
			gsap.fromTo(
				tutorialContainerRef.current,
				{ opacity: 0 },
				{
					duration: 3,
					opacity: 1,
					ease: "power2.out",
				}
			);
		}
	}, [showTutorial]);

	// Called automatically for each breakpoint by <Scene />
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		// Show Vanguard on the first breakpoint
		if (index === 0) {
			setShowVanguardUI(true);
		}
		// Show CreateBrand on the second breakpoint
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
			{/* Logo at the top */}
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

				{/* Tutorial fades in when shown (same pattern as Vanguard UI) */}
				{showTutorial && (
					<div
						ref={tutorialContainerRef}
						style={{
							opacity: 0,
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 101,
							willChange: "opacity, transform",
							transform: "translateZ(0)",
						}}
					>
						<VanguardTutorial onDone={handleTutorialDone} />
					</div>
				)}

				{showVanguardUI && (
					<div
						ref={vanguardContainerRef}
						style={{
							opacity: 0,
							position: "relative",
							zIndex: 999,
							top: "440px",
						}}
					>
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

				{/* Render CreateBrand only once in the entire flow */}
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
							// When the start button is clicked, fade out the Vanguard UI to the left then continue.
							onStart={() => {
								if (vanguardContainerRef.current) {
									gsap.to(vanguardContainerRef.current, {
										duration: 1,
										opacity: 0,
										x: "-100%", // Move to the left
										ease: "power3.inOut",
										onComplete: () => {
											handleContinue();
										},
									});
								} else {
									handleContinue();
								}
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Room;
