import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Components and utilities
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
// Removed VanguardTutorial import since we no longer use it
import VanguardPopUp from "../components/VanguardPopUps";
import CreateBrand from "../components/CreateBrand";
import Hotseat from "../components/Hotseat";
import QuizQuestions from "../utils/QuizQuestions";
import { handleNext, handleDone } from "../utils/Handlers/HotSeat-Handlers";
import CanvasChooseOutfits from "../components/CanvasChooseOutfits"; // outfit selection screen
import vanguardContents from "../utils/VanguardContents";
import BudgetBar from "../components/BudgetBar";
import CanvasFabricLabs from "../components/CanvasFabricsLab"; // Fabric Labs component

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

	// Control the pop-up for any Vanguard
	const [showPopUp, setShowPopUp] = useState(false);

	// Additional UI states
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showOutfitSelection, setShowOutfitSelection] = useState(false);
	const [showFabricLabs, setShowFabricLabs] = useState(false);
	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(true);

	// Scene / animation states
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	// Branding states
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	// Refs for animation
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	// Removed tutorialContainerRef since we no longer use a tutorial

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
			// setShowVanguardUI(true);
			setShowFabricLabs(true);
		} else if (index === 1) {
			// Show the brand creation UI
			setShowCreateBrand(true);
		} else if (index === 3) {
			setShowVanguardUI(true);
			// Activate only Vanguard 0 at this breakpoint.
			setVanguardActiveStates(() => [true, false, false, false]);
		} else if (index === 4) {
			// Show outfit selection instead of CreateBrand:
			setShowOutfitSelection(true);
		} else if (index === 6) {
			setShowVanguardUI(true);
			// Activate secondary vanguards.
			setVanguardActiveStates(() => [false, true, true, true]);
		} else if (index === 7) {
			// IMPORTANT: Pass a value (true) so that Fabric Labs is activated.
			setShowFabricLabs(true);
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

	/**
	 * When a Vanguard is clicked:
	 * Now, regardless of which Vanguard is clicked, we simply:
	 *  - Set the active index,
	 *  - Increment its activation count, and
	 *  - Show its popup.
	 */
	const handleVanguardClick = (index) => {
		// Ignore clicks on inactive Vanguards.
		if (!vanguardActiveStates[index]) return;

		setActiveVanguardIndex(index);
		incrementVanguardActivation(index);
		setShowPopUp(true);
	};

	// Increment the activation count for a given Vanguard.
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
	 * - If Vanguard 0 was active and this was its first activation,
	 *   then activate Vanguards 1, 2, and 3.
	 * - Otherwise, simply deactivate the current Vanguard.
	 * - Finally, advance the scene (by calling handleContinue).
	 */
	const handleDeactivateActiveVanguard = () => {
		const prevActive = activeVanguardIndex;
		setShowPopUp(false);
		setActiveVanguardIndex(null);

		if (prevActive === 0) {
			// For Vanguard 0: if this is its first activation, then activate Vanguards 1–3.
			if (vanguardActivationCounts[0] === 1) {
				setVanguardActiveStates([false, true, true, true]);
			} else if (vanguardActivationCounts[0] >= 2) {
				// If Vanguard 0 has been activated more than once, simply deactivate all and advance.
				setVanguardActiveStates([false, false, false, false]);
				handleContinue();
			}
		} else {
			// For secondary vanguards (indexes 1, 2, 3):
			setVanguardActiveStates((prevStates) => {
				const newStates = [...prevStates];
				newStates[prevActive] = false;
				// If all secondary vanguards are off, then advance.
				if (!newStates[1] && !newStates[2] && !newStates[3]) {
					handleContinue();
				}
				return newStates;
			});
		}
	};

	return (
		<>
			<div className="logo-container" ref={logoContainerRef}>
				<Logo />
				<BudgetBar />
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

				{/* Outfit selection UI */}
				{showOutfitSelection && (
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
						<CanvasChooseOutfits
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
								setShowOutfitSelection(false);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
						/>
					</div>
				)}

				{/* Fabric Labs UI */}
				{showFabricLabs && (
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
						<CanvasFabricLabs
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
								setShowFabricLabs(false);
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
				{/* {showHotseat && (
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
        )} */}
			</div>
		</>
	);
}

export default Room;
