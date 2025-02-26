import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { updateVanguardStatus } from "../utils/VanguardStatus";
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
import CanvasManufactorer from "../components/CanvasManufactorer";

import ecoVanguard_pfp from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side.svg";
import wealthVanguard_pfp from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side.svg";
import ethicsVanguard_pfp from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side.svg";

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

	const STAGES = {
		INTRO: 'introduction',
		BRAND: 'brand',
		FABRIC: 'fabric',
		CLOTHING: 'clothing',
		MANUFACTURING: 'manufacturing'
	};

	const [stage, setStage] = useState(STAGES.INTRO);
	
	const [activeVanguardIndex, setActiveVanguardIndex] = useState(null);
	const [showPopUp, setShowPopUp] = useState(false);

	// Pop-up modal states
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showOutfitSelection, setShowOutfitSelection] = useState(false);
	const [showFabricLabs, setShowFabricLabs] = useState(false);
	const [showManufactorer, setShowManufactorer] = useState(false);

	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(false);

	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// Breakpoints in Scene
	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858,
	];

	const [selectedLogo, setSelectedLogo] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const hotseatRef = useRef(null);

	// Hot Seat & quiz tracking
	const [currentStep, setCurrentStep] = useState(0);
	const [mode, setMode] = useState("Normal");
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [result, setResult] = useState(0);

	// Average Scores and Items selected from Stages
	const [selectedClothingItems, setSelectedClothingItems] = useState([]);
	const [selectedFabricItems, setSelectedFabricItems] = useState([]);
	const [selectedManufacturingItems, setSelectedManufacturingItems] = useState([]);
	// const [selectItems, setSelectedItems] = useState([]);
	const [averageEthics, setAverageEthics] = useState(0);
	const [averageSustainability, setAverageSustainability] = useState(0);
	const [averageCost, setAverageCost] = useState(0);
	// control hearts fill
	const [ethicsHearts, setEthicsHearts] = useState(3);
	let ethics_feedback = useRef(null);
	const [ecoHearts, setEcoHearts] = useState(3);
	let eco_feedback = useRef(null);
	const [wealthHearts, setWealthHearts] = useState(3);
	let wealth_feedback = useRef(null);

	// FundingContext
	const { fundingAmount, setFundingAmount, generateFunding } =
		useContext(FundingContext);

	useEffect(() => {
		// Optional: generateFunding() if you want an initial amount
		// generateFunding();

		// Shuffle questions for the Hotseat
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
		// Auto-play the scene on mount (optional)
		handlePlayClick();
	}, []);

	//Calculating average scores of metrics : cost, ethics, sustainability
	const calculateAverageScores = (selectedItems) => {
		// Convert selectedItems to an array if it's an object
		const itemsArray = Array.isArray(selectedItems) ? selectedItems : Object.values(selectedItems);
	
		const totalEthics = itemsArray.reduce((sum, item) => sum + (item.ethics || 0), 0);
		const totalSustainability = itemsArray.reduce((sum, item) => sum + (item.sustainability || 0), 0);
		const totalCost = itemsArray.reduce((sum, item) => sum + (item.cost || 0), 0);
	
		const itemCount = itemsArray.length;
		const sustainabilityCount = itemsArray.filter(item => item.sustainability !== undefined).length;
	
		const averageEthics = totalEthics / itemCount;
		const averageSustainability = sustainabilityCount > 0 ? totalSustainability / sustainabilityCount : 0;
		const averageCost = totalCost / itemCount;
	
		console.log("Average Ethics:", averageEthics);
		console.log("Average Sustainability:", averageSustainability);
		console.log("Average Cost:", averageCost);
	
		return {
			averageEthics,
			averageSustainability,
			averageCost,
		};
	};

	const handleSelectionCalculations = (selectedItems, setSelectedItems, currentStage) => {
		setSelectedItems(selectedItems);
		const averages = calculateAverageScores(selectedItems);
		setAverageEthics(averages.averageEthics);
		setAverageSustainability(averages.averageSustainability);
		setAverageCost(averages.averageCost);
		// console.log("current stage", currentStage);

		ethics_feedback = updateVanguardStatus("ethics", currentStage, averages);
		setEthicsHearts((prevHearts) => prevHearts + ethics_feedback.hearts);
		// console.log("Ethics Vanguard Feedback:", ethics_feedback);

		eco_feedback = updateVanguardStatus("eco", currentStage, averages);
		setEcoHearts((prevHearts) => prevHearts + eco_feedback.hearts);
		// console.log("Eco Vanguard Feedback:", eco_feedback);

		wealth_feedback = updateVanguardStatus("wealth", currentStage, averages);
		setWealthHearts((prevHearts) => prevHearts + wealth_feedback.hearts);
		// console.log("Wealth Vanguard Feedback:", wealth_feedback);
	};
	const handleClothingSelection = (selectedItems) => {
		const newStage = STAGES.CLOTHING;
        setStage(newStage);
		handleSelectionCalculations(selectedItems, setSelectedClothingItems, newStage);
	};
	
	const handleFabricSelection = (selectedItems) => {
		const newStage = STAGES.FABRIC;
        setStage(newStage);
        handleSelectionCalculations(selectedItems, setSelectedFabricItems, newStage);
	};
	
	const handleManufacturingSelection = (selectedItems) => {
		const newStage = STAGES.MANUFACTURING;
        setStage(newStage);
        handleSelectionCalculations(selectedItems, setSelectedManufacturingItems, newStage);
	};

	// === Hotseat: fade out overlay, then set vanguard states ===
	const handleHotseatDone = () => {
		if (hotseatRef.current) {
			gsap.to(hotseatRef.current, {
				duration: 1,
				opacity: 0,
				ease: "power2.out",
				onComplete: () => {
					setShowHotseat(false);

					// If Vanguard 0 was in the hot seat:
					if (activeVanguardIndex === 0) {
						// Deactivate Vanguard 0 and activate the others
						setVanguardActiveStates([false, true, true, true]);
						// Force them all to third scenario
						setVanguardActivationCounts((prev) => {
							return [prev[0], 3, 3, 3];
						});
					}

					// Normal finishing logic for the Hotseat
					handleDone(setMode, setCurrentStep, setQuestionIndex);
				},
			});
		} else {
			// Fallback if no hotseatRef
			setShowHotseat(false);

			if (activeVanguardIndex === 0) {
				setVanguardActiveStates([false, true, true, true]);
				setVanguardActivationCounts((prev) => {
					return [prev[0], 3, 3, 3];
				});
			}

			handleDone(setMode, setCurrentStep, setQuestionIndex);
		}
	};

	// Called by Scene whenever we hit a breakpoint
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		switch (index) {
			case 0:
				setShowVanguardUI(true);
				break;
			case 1:
				setShowCreateBrand(true);
				break;
			case 2:
				// Possibly show the manufactorer pop-up if you want
				// setShowManufactorer(true);
				break;
			case 3:
				setShowVanguardUI(true);
				setVanguardActiveStates([true, false, false, false]);
				break;
			case 4:
				setShowOutfitSelection(true);
				break;
			case 6:
				setShowVanguardUI(true);
				setVanguardActiveStates([false, true, true, true]);
				break;
			case 7:
				setShowFabricLabs(true);
				break;
			case 9:
				// At breakpoint 9 -> show Vanguard 0 (for the Hot Seat).
				setShowVanguardUI(true);
				setVanguardActiveStates([true, false, false, false]);
				break;
			case 10:
				// Another example if you want something at 10
				setShowVanguardUI(true);
				setShowManufactorer(true);
				break;
			default:
				break;
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

	// Clicking on a Vanguard
	const handleVanguardClick = (index) => {
		// If that Vanguard is not active, do nothing
		if (!vanguardActiveStates[index]) return;

		// If at breakpoint 9 and user clicks Vanguard 0 => open Hot Seat
		if (currentBreakpointIndex === 9 && index === 0) {
			setShowHotseat(true);
			setActiveVanguardIndex(0);
			return;
		}

		// Otherwise, normal flow
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

	// Closing the Vanguard PopUp
	const handleDeactivateActiveVanguard = () => {
		const prevActive = activeVanguardIndex;
		setShowPopUp(false);
		setActiveVanguardIndex(null);

		// If we just closed Vanguard 0
		if (prevActive === 0) {
			if (vanguardActivationCounts[0] === 1) {
				// Turn off Vanguard 0, enable 1..3
				setVanguardActiveStates([false, true, true, true]);
			} else if (vanguardActivationCounts[0] >= 2) {
				// Turn them all off, continue
				setVanguardActiveStates([false, false, false, false]);
				handleContinue();
			}
		} else {
			// If one of vanguards (1..3) is closed
			setVanguardActiveStates((prevStates) => {
				const newStates = [...prevStates];
				newStates[prevActive] = false;
				// If all 1..3 are off => continue
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
				{/* Funding Amount UI */}
				<BudgetBar />
				<HeartsUI title="ECO VANGUARD" fillNumber={ethicsHearts} imageSrc={ecoVanguard_pfp} />
				<HeartsUI
					title="WEALTH VANGUARD"
					fillNumber={ecoHearts}
					imageSrc={wealthVanguard_pfp}
				/>
				<HeartsUI
					title="ETHICS VANGUARD"
					fillNumber={wealthHearts}
					imageSrc={ethicsVanguard_pfp}
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
							onClothingSelection={handleClothingSelection}
						/>
					</div>
				)}

				{/* CanvasManufactorer Pop-up */}
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
								setShowManufactorer(false);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
							onManufacturingSelection={handleManufacturingSelection}
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
							onFabricSelection={handleFabricSelection}
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
						ref={hotseatRef}
						style={{
							position: "absolute",
							zIndex: 9999,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
							opacity: 1, // Start fully visible
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
									setFundingAmount
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
