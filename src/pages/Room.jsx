import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Components and utilities
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";
import VanguardPopUp from "../components/VanguardPopUps";
import CreateBrand from "../components/CreateBrand";
import Hotseat from "../components/Hotseat";
import QuizQuestions from "../utils/QuizQuestions";
import { handleNext, handleDone } from "../utils/Handlers/HotSeat-Handlers";
import FabricLab from "./FabricLabCanvas";

// Our new content mapping
import vanguardContents from "../utils/VanguardContents";

function Room() {
	// Example states for Vanguard UI
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true, // Vanguard 0 initially active
		false, // Vanguard 1
		false, // Vanguard 2
		false, // Vanguard 3
	]);

	// Track how many times each Vanguard has been activated
	const [vanguardActivationCounts, setVanguardActivationCounts] = useState([
		0, 0, 0, 0,
	]);

	// Which Vanguard is currently selected (for pop-up)
	const [activeVanguardIndex, setActiveVanguardIndex] = useState(null);

	// Control the pop-up for Vanguards 1, 2, 3 (or for subsequent activations)
	const [showPopUp, setShowPopUp] = useState(false);

	// Control the tutorial for Vanguard 0 (first activation)
	const [showTutorial, setShowTutorial] = useState(false);

	// Additional UI states
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(true);

	// Scene / animation states
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [44, 183, 339, 550];

	// Branding states
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	// Refs for animation
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const tutorialContainerRef = useRef(null);

	// Hotseat states
	const [currentStep, setCurrentStep] = useState(0);
	const [mode, setMode] = useState("Normal");
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [result, setResult] = useState(0);
	const [funding, setFunding] = useState("Funding");

	// Shuffle questions on mount
	useEffect(() => {
		const shuffledQuestions = QuizQuestions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffledQuestions.slice(0, 3));
	}, []);

	// Initial fade in for canvas and logo
	useEffect(() => {
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
		gsap.fromTo(
			logoContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);

	// Animate Vanguard UI in
	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			gsap.set(vanguardContainerRef.current, { x: -100, opacity: 0 });
			gsap.to(vanguardContainerRef.current, {
				duration: 1,
				x: 0,
				opacity: 1,
				ease: "power3.out",
			});
		}
	}, [showVanguardUI]);

	// Animate tutorial container in
	useEffect(() => {
		if (showTutorial && tutorialContainerRef.current) {
			gsap.fromTo(
				tutorialContainerRef.current,
				{ autoAlpha: 0 },
				{ duration: 1, autoAlpha: 1, ease: "power3.out" }
			);
		}
	}, [showTutorial]);

	// Auto-play (optional)
	useEffect(() => {
		handlePlayClick();
	}, []);

	// Hotseat callbacks
	const handleHotseatDone = () => {
		setShowHotseat(false);
		handleDone(setMode, setCurrentStep, setQuestionIndex);
	};

	// Breakpoint handler
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		if (index === 0) {
			setShowVanguardUI(true);
		} else if (index === 1) {
			setShowCreateBrand(true);
		} else if (index === 3) {
			setShowVanguardUI(true);
			const randomIndex = Math.floor(Math.random() * 3) + 1; // 1,2,or 3
			setVanguardActiveStates(() => {
				const newStates = [false, false, false, false];
				newStates[randomIndex] = true;
				return newStates;
			});
		}
	};

	const handlePlayClick = () => {
		setPlayAnimation(true);
		setPaused(false);
	};

	const handleContinue = () => {
		setPaused(false);
		setCurrentBreakpointIndex((prev) => prev + 1);
	};

	// Open the tutorial (for Vanguard 0)
	const openTutorial = () => {
		setShowTutorial(true);
	};

	// Close the tutorial and deactivate Vanguard 0
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

	/**
	 * When a Vanguard is clicked:
	 * - For Vanguard 0, if it’s the first activation, show the tutorial.
	 * - Otherwise, show the popup with the appropriate scenario.
	 */
	const handleVanguardClick = (index) => {
		if (!vanguardActiveStates[index]) return;

		if (index === 0) {
			if (vanguardActivationCounts[0] === 0) {
				openTutorial();
			} else {
				setActiveVanguardIndex(0);
				incrementVanguardActivation(index);
				setShowPopUp(true);
			}
		} else {
			setActiveVanguardIndex(index);
			incrementVanguardActivation(index);
			setShowPopUp(true);
		}
	};

	// Increment the activation count for a given Vanguard
	const incrementVanguardActivation = (index) => {
		setVanguardActivationCounts((prev) => {
			const newCounts = [...prev];
			newCounts[index] += 1;
			return newCounts;
		});
	};

	/**
	 * When the popup "Done" is pressed, we want to:
	 * - Hide the popup.
	 * - Force Vanguard 0 to reappear.
	 * - Ensure that its activation count is updated to trigger the second activation scenario.
	 */
	const handleDeactivateActiveVanguard = () => {
		setShowPopUp(false);
		setActiveVanguardIndex(null);
		// Force Vanguard 0 to appear with its second activation:
		setVanguardActiveStates([true, false, false, false]);
		setVanguardActivationCounts((prev) => {
			const newCounts = [...prev];
			// If the first activation count is less than 2, set it to 2
			if (newCounts[0] < 2) {
				newCounts[0] = 2;
			}
			return newCounts;
		});
	};

	return (
		<>
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

				{/* Tutorial for Vanguard 0 (first activation) */}
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

				{/* Vanguard UI (clickable circles) */}
				{showVanguardUI && (
					<div
						ref={vanguardContainerRef}
						style={{ position: "relative", zIndex: 999, top: "50%" }}
					>
						<Vanguard
							activeStates={vanguardActiveStates}
							onVanguardClick={handleVanguardClick}
						/>
					</div>
				)}

				{/* Brand creation UI */}
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
							onStart={() => {
								if (vanguardContainerRef.current) {
									gsap.to(vanguardContainerRef.current, {
										duration: 1,
										x: -200,
										opacity: 0,
										ease: "power3.inOut",
										onComplete: () => {
											setShowVanguardUI(false);
											handleContinue();
										},
									});
								} else {
									handleContinue();
								}
							}}
							onLogoSelect={(logoId) => setSelectedLogo(logoId)}
							onCreate={() => {
								setShowCreateBrand(false);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
						/>
					</div>
				)}

				{/* Dynamic Vanguard Popup */}
				{showPopUp && activeVanguardIndex !== null && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1100,
						}}
					>
						<VanguardPopUp
							// Select the correct scenario based on activation count.
							steps={
								vanguardContents[activeVanguardIndex].scenarios[
									Math.min(
										vanguardActivationCounts[activeVanguardIndex] - 1,
										vanguardContents[activeVanguardIndex].scenarios.length - 1
									)
								]
							}
							onDeactivateActiveVanguard={handleDeactivateActiveVanguard}
						/>
					</div>
				)}

				{/* Scene component with breakpoints */}
				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
					selectedLogo={selectedLogo}
					brandName={brandName}
					fontStyle={fontStyle}
				/>

				{/* Optional Hotseat UI */}
				{showHotseat && (
					<div style={{ position: "absolute", zIndex: 9999 }}>
						<Hotseat
							mode={mode}
							currentStep={currentStep}
							onNext={() =>
								handleNext(
									mode,
									setMode,
									questionIndex,
									setQuestionIndex,
									selectedQuestions,
									setCurrentStep,
									setResult,
									setFunding
								)
							}
							onDone={handleHotseatDone}
							question={selectedQuestions[questionIndex]}
							answers={selectedQuestions[questionIndex]?.answers}
							funding={funding}
							result={result}
							totalSteps={selectedQuestions.length + 1}
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default Room;
