import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";

import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardPopUp from "../components/VanguardPopUps";
import CreateBrand from "../components/CreateBrand";
import Hotseat from "../components/Hotseat";
import QuizQuestions from "../utils/QuizQuestions";
import { handleNext, handleDone } from "../utils/Handlers/HotSeat-Handlers";
import CanvasChooseOutfits from "../components/CanvasChooseOutfits";
import vanguardContents from "../utils/VanguardContents";
import BudgetBar from "../components/BudgetBar";
import HeartsUI from "../components/HeartsUI";
import CanvasFabricLabs from "../components/CanvasFabricsLab";
// NEW: Import CanvasManufactorer
import CanvasManufactorer from "../components/CanvasManufactorer";

import ecoVanguard from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side.svg";
import wealthVanguard from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side.svg";
import ethicsVanguard from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side.svg";

// Import the FundingContext
import { FundingContext } from "../utils/FundingContext";

function Room() {
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);
	const [vanguardActivationCounts, setVanguardActivationCounts] = useState([
		0, 0, 0, 0,
	]);
	const [activeVanguardIndex, setActiveVanguardIndex] = useState(null);
	const [showPopUp, setShowPopUp] = useState(false);

	// Pop-up modal states
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showOutfitSelection, setShowOutfitSelection] = useState(false);
	const [showFabricLabs, setShowFabricLabs] = useState(false);
	// NEW: Add showManufactorer for CanvasManufactorer
	const [showManufactorer, setShowManufactorer] = useState(false);

	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(false);

	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Your breakpoints in Scene
	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	const [selectedLogo, setSelectedLogo] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);

	const [currentStep, setCurrentStep] = useState(0);
	const [mode, setMode] = useState("Normal");
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [result, setResult] = useState(0);

	// Pull from FundingContext instead of local state
	const { fundingAmount, setFundingAmount, generateFunding } =
		useContext(FundingContext);

	useEffect(() => {
		// Example: automatically generate initial funding if you want
		// generateFunding();

		// Shuffle questions for Hotseat
		const shuffledQuestions = QuizQuestions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffledQuestions.slice(0, 3));
	}, []);

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

	useEffect(() => {
		// Auto-play the scene when Room mounts (optional).
		handlePlayClick();
	}, []);

	const handleHotseatDone = () => {
		setShowHotseat(false);
		handleDone(setMode, setCurrentStep, setQuestionIndex);
	};

	// Called by Scene whenever it reaches a breakpoint
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		/*
		 * Your custom logic for each breakpoint:
		 * Add or move these lines as you see fit.
		 */
		if (index === 0) {
			// Show the Vanguard UI
			setShowVanguardUI(true);

			// Example: show the Manufactorer flow at index 0 as well
			setShowManufactorer(true);
		} else if (index === 1) {
			setShowCreateBrand(true);
		} else if (index === 2) {
			// OR you could show it here if you want:
			// setShowManufactorer(true);
		} else if (index === 3) {
			setShowVanguardUI(true);
			setVanguardActiveStates([true, false, false, false]);
		} else if (index === 4) {
			setShowOutfitSelection(true);
		} else if (index === 6) {
			setShowVanguardUI(true);
			setVanguardActiveStates([false, true, true, true]);
		} else if (index === 7) {
			setShowFabricLabs(true);
		} else if (index === 9) {
			setShowVanguardUI(true);
			setVanguardActiveStates([true, false, false, false]);
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

	const handleVanguardClick = (index) => {
		if (!vanguardActiveStates[index]) return;

		// e.g., at breakpoint 9, Vanguard #0 triggers the Hotseat
		if (currentBreakpointIndex === 9 && index === 0) {
			setShowHotseat(true);
			return;
		}

		setActiveVanguardIndex(index);
		incrementVanguardActivation(index);
		setShowPopUp(true);
	};

	const incrementVanguardActivation = (index) => {
		setVanguardActivationCounts((prev) => {
			const newCounts = [...prev];
			newCounts[index]++;
			return newCounts;
		});
	};

	// Called once user closes a Vanguard PopUp
	const handleDeactivateActiveVanguard = () => {
		const prevActive = activeVanguardIndex;
		setShowPopUp(false);
		setActiveVanguardIndex(null);

		// If the first Vanguard was active
		if (prevActive === 0) {
			if (vanguardActivationCounts[0] === 1) {
				// Turn off the first Vanguard, enable the others
				setVanguardActiveStates([false, true, true, true]);
			} else if (vanguardActivationCounts[0] >= 2) {
				// Turn them all off, go to next step
				setVanguardActiveStates([false, false, false, false]);
				handleContinue();
			}
		} else {
			// If it was one of the other vanguards (1, 2, 3)
			setVanguardActiveStates((prevStates) => {
				const newStates = [...prevStates];
				newStates[prevActive] = false;
				// If all secondary vanguards are now off => continue
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
				{/* Shows the dynamic "Funds Raised" amount from context */}
				<BudgetBar />
				<HeartsUI title="ECO VANGUARD" fillNumber={0} imageSrc={ecoVanguard} />
				<HeartsUI
					title="WEALTH VANGUARD"
					fillNumber={0}
					imageSrc={wealthVanguard}
				/>
				<HeartsUI
					title="ETHICS VANGUARD"
					fillNumber={0}
					imageSrc={ethicsVanguard}
				/>
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

				{/* Vanguard UI (the row of Vanguards) */}
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

				{/* CreateBrand Pop-up */}
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

				{/* CanvasChooseOutfits Pop-up */}
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

				{/* NEW: CanvasManufactorer Pop-up */}
				{showManufactorer && (
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
						<CanvasManufactorer
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
								// Close the Manufactorer pop-up
								setShowManufactorer(false);
								// Continue story
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
						/>
					</div>
				)}

				{/* CanvasFabricLabs Pop-up */}
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

				{/* Vanguard Pop-Up (when you click a Vanguard) */}
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

				{/* Hotseat Overlay */}
				{showHotseat && (
					<div
						style={{
							position: "absolute",
							zIndex: 9999,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
						}}
					>
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
									setFundingAmount // pass context setter
								)
							}
							onDone={handleHotseatDone}
							question={selectedQuestions[questionIndex]}
							answers={selectedQuestions[questionIndex]?.answers}
							funding={fundingAmount}
							result={result}
							totalSteps={selectedQuestions.length + 1}
						/>
					</div>
				)}

				{/* Main 3D Scene */}
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
			</div>
		</>
	);
}

export default Room;
