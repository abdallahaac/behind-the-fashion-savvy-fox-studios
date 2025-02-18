import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";
import CreateBrand from "../components/CreateBrand";

function Room() {
	// States for other UI components.
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);
	const [showTutorial, setShowTutorial] = useState(false);
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);

	// Whether to show CreateBrand and/or Vanguard on the screen.
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showVanguardUI, setShowVanguardUI] = useState(false);

	// Keep track of breakpoints (indices) as the animation plays.
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [44, 183, 339, 550];

	// New state for selected logo (lifted from CreateBrand).
	const [selectedLogo, setSelectedLogo] = useState(null);

	// Refs for GSAP animations.
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const tutorialContainerRef = useRef(null);

	// Log changes to selectedLogo.
	useEffect(() => {
		console.log("Room: selectedLogo updated:", selectedLogo);
	}, [selectedLogo]);

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

	// Animate Vanguard UI each time it's set to true
	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			// Set its position off-screen so we can animate in from the left.
			gsap.set(vanguardContainerRef.current, { x: -100, opacity: 0 });
			gsap.to(vanguardContainerRef.current, {
				duration: 1,
				x: 0,
				opacity: 1,
				ease: "power3.out",
			});
		}
	}, [showVanguardUI]);

	// Animate Vanguard tutorial if it becomes visible
	useEffect(() => {
		if (showTutorial && tutorialContainerRef.current) {
			gsap.fromTo(
				tutorialContainerRef.current,
				{ autoAlpha: 0 },
				{
					duration: 1,
					autoAlpha: 1,
					ease: "power3.out",
				}
			);
		}
	}, [showTutorial]);

	// Called automatically for each breakpoint by <Scene />
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		// Show Vanguard at the first and third breakpoints:
		if (index === 0) {
			setShowVanguardUI(true);
		} else if (index === 3) {
			setShowVanguardUI(true);
		}

		// Show CreateBrand at the second breakpoint:
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

	// Vanguard tutorial controls
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

				{showTutorial && (
					<div
						ref={tutorialContainerRef}
						style={{
							opacity: 0,
							position: "relative",
							top: "50%",
							left: 0,
							zIndex: 999,
						}}
					>
						<VanguardTutorial onDone={handleTutorialDone} />
					</div>
				)}

				{showVanguardUI && (
					<div
						ref={vanguardContainerRef}
						style={{
							// We'll position & animate this container from the left
							position: "relative",
							zIndex: 999,
							top: "50%",
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
					selectedLogo={selectedLogo} // Pass the selected logo to Scene
				/>

				{/* Show CreateBrand at the second breakpoint. */}
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
							// 1) When the hold-to-start is complete:
							//    Fade out the current Vanguard UI by sliding left, then
							//    continue to the *next* breakpoint.
							onStart={() => {
								console.log(
									"CreateBrand: onStart -> fade out Vanguard, then continue"
								);
								if (vanguardContainerRef.current) {
									gsap.to(vanguardContainerRef.current, {
										duration: 1,
										x: -200, // move left
										opacity: 0,
										ease: "power3.inOut",
										onComplete: () => {
											setShowVanguardUI(false); // remove from DOM
											handleContinue();
										},
									});
								} else {
									handleContinue();
								}
							}}
							// Store the user-selected logo
							onLogoSelect={(logoId) => {
								console.log("Room: onLogoSelect called with", logoId);
								setSelectedLogo(logoId);
							}}
							// 2) When the "Create" button is clicked:
							//    Fade out CreateBrand, advance to next breakpoint (where Vanguard reappears).
							onCreate={() => {
								setShowCreateBrand(false); // remove CreateBrand
								handleContinue(); // advance to the next breakpoint
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Room;
