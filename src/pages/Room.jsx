import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei"; // <-- Use progress in Room now
import { updateVanguardStatus } from "../utils/VanguardStatus";
import { assistantData, allVanguards, ecoVanguard, ethicsVanguard, wealthVanguard } from '../utils/VanguardResponses';
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

// Import your new LoadingOverlay
import LoadingOverlay from "../utils/LoadingOverlay";

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

	// Track model loading progress via Drei
	const { progress: rawProgress } = useProgress();
	// We'll clamp it to 1–99% if we haven't hit the first breakpoint,
	// or 100% once we've hit it.
	const [hasReachedFirstBreakpoint, setHasReachedFirstBreakpoint] =
		useState(false);

	// To control whether the overlay is visible at all
	const [showOverlay, setShowOverlay] = useState(true);

	// You might want to clamp to at least 1% so the bar is never fully empty
	const displayedProgress = hasReachedFirstBreakpoint
		? 100
		: Math.min(Math.max(rawProgress, 1), 99);

	// Breakpoints in Scene
	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858, 2084,
	];

	const [brandName, setBrandName] = useState("MYBRAND");
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

	// LOGO references and selection
	const logoMeshRefs = useRef({});
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [usedLogos, setUsedLogos] = useState(new Set());

	// Callback to capture logo mesh refs from Scene
	const handleLogoMeshMounted = (logoKey, ref) => {
		logoMeshRefs.current[logoKey] = ref;
	};

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
	//set feedback
	const [ethicsFeedback, setEthicsFeedback] = useState(null);
    const [ecoFeedback, setEcoFeedback] = useState(null);
    const [wealthFeedback, setWealthFeedback] = useState(null);


	// FundingContext
	const { fundingAmount, setFundingAmount, generateFunding } =
		useContext(FundingContext);

	const getVanguardData = (activeVanguardIndex, stage) => {
		console.log("current stage", stage);
		switch (activeVanguardIndex) {
			case 0:
				if (stage === STAGES.INTRO){
					return assistantData[0].introduction;
				}
				else if (stage === STAGES.BRAND){
					return allVanguards[0].brand;
				}
			case 1:
				if(stage === STAGES.INTRO){
					return ecoVanguard[0].introduction;
				}
				else if (stage === STAGES.FABRIC || stage === STAGES.MANUFACTURING){	
					return ecoFeedback;
				}
			case 2:
				if(stage === STAGES.INTRO){
					return ethicsVanguard[0].introduction;
				}
				else{
					return ethicsFeedback;
				}
			case 3:
				if(stage === STAGES.INTRO){
					return wealthVanguard[0].introduction;
				}
				else{
					return wealthFeedback;
				}
			default:
				return null;

		}
		
	};
	

	// Once the Scene (and all logos) mount, set them to z = -200 by default.
	useEffect(() => {
		// A small timeout can ensure all refs are assigned
		const timeout = setTimeout(() => {
			const keys = Object.keys(logoMeshRefs.current);
			keys.forEach((key) => {
				const groupRef = logoMeshRefs.current[key];
				if (groupRef && groupRef.current) {
					groupRef.current.position.z = -120;
				}
			});
		}, 50);

		return () => clearTimeout(timeout);
	}, []);

	function animateLogoTo(logoId, newZ) {
		const ref = logoMeshRefs.current[logoId];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
			});
		}
	}

	// When a logo is selected in CreateBrand, we swap it with whatever is currently active:
	// When a logo is selected, animate it to z = -49.51.
	// If another logo is already active, animate that one back to z = 0.
	function handleLogoSelect(newLogoId) {
		// If no logo is currently active, animate the clicked logo to -49.51.
		if (!selectedLogo) {
			animateLogoTo(newLogoId, -49.51);
			setSelectedLogo(newLogoId);
			return;
		}

		// If the clicked logo is already active, do nothing.
		if (selectedLogo === newLogoId) {
			return;
		}

		// Animate the previously active logo back to 0...
		animateLogoTo(selectedLogo, -75);
		// ...and animate the newly clicked logo to -49.51.
		animateLogoTo(newLogoId, -49.51);
		setSelectedLogo(newLogoId);
	}



	useEffect(() => {
		// Shuffle questions for the Hotseat
		const shuffledQuestions = QuizQuestions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffledQuestions.slice(0, 3));
	}, []);
	useEffect(() => {
        console.log("Updated eco hearts:", ecoHearts);
		console.log("Updated ethics hearts:", ethicsHearts);
		console.log("Updated wealth hearts:", wealthHearts);
    }, [ecoHearts, ethicsHearts, wealthHearts]);

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
        console.log("Averages:", averages);
        setAverageEthics(averages.averageEthics);
        setAverageSustainability(averages.averageSustainability);
        setAverageCost(averages.averageCost);
        console.log("current stage", currentStage);

        const ethics_feedback = updateVanguardStatus("ethics", currentStage, averages);
        // use max to make sure hearts don't go below 0
        setEthicsHearts((prevHearts) => Math.max(0, prevHearts + ethics_feedback.hearts));
        console.log("Ethics Vanguard Feedback:", ethics_feedback);
        setEthicsFeedback(ethics_feedback);

        const eco_feedback = updateVanguardStatus("eco", currentStage, averages);
        setEcoHearts((prevHearts) => Math.max(0, prevHearts + eco_feedback.hearts));
        console.log("Eco Vanguard Feedback:", eco_feedback);
        setEcoFeedback(eco_feedback);

        const wealth_feedback = updateVanguardStatus("wealth", currentStage, averages);
        setWealthHearts((prevHearts) => Math.max(0, prevHearts + wealth_feedback.hearts));
        console.log("Wealth Vanguard Feedback:", wealth_feedback);
        setWealthFeedback(wealth_feedback);

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

	// === Overlays & Popups logic ===
	const handleOverlayEnter = () => {
		// Called when user clicks "Enter" on the loading overlay
		setShowOverlay(false);
	};

	const handlePlayClick = () => {
		setPlayAnimation(true);
		setPaused(false);
	};

	const handleContinue = () => {
		setPaused(false);
		setCurrentBreakpointIndex((prev) => prev + 1);
	};

	// Called by Scene whenever we hit a breakpoint
	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

		// If it's the VERY FIRST breakpoint
		if (index === 0) {
			setHasReachedFirstBreakpoint(true);
		}

		switch (index) {
			case 0:
				setShowCreateBrand(true);
				setShowVanguardUI(true);
				break;
			case 1:
				setShowCreateBrand(true);
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
				setVanguardActiveStates([false, false, true, true]);
				break;
			case 7:
				setShowFabricLabs(true);
				break;
			case 9:
				setShowVanguardUI(true);
				setVanguardActiveStates([true, false, false, false]);
				break;
			case 10:
				setShowVanguardUI(true);
				setShowManufactorer(true);
				break;
			case 12:
				setShowVanguardUI(true);
				setVanguardActiveStates([false, true, true, true]);
				break;
			default:
				break;
		}
	};

	// Vanguard click
	const handleVanguardClick = (index) => {
		if (!vanguardActiveStates[index]) return;

		// If at breakpoint 9 and user clicks Vanguard 0 => open Hot Seat
		if (currentBreakpointIndex === 9 && index === 0) {
			setShowHotseat(true);
			setActiveVanguardIndex(0);
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

	const handleDeactivateActiveVanguard = () => {
		const prevActive = activeVanguardIndex;
		setShowPopUp(false);
		setActiveVanguardIndex(null);

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
				if (!newStates[1] && !newStates[2] && !newStates[3]) {
					handleContinue();
				}
				return newStates;
			});
		}
	};

	// Hotseat
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
						setVanguardActivationCounts((prev) => [prev[0], 3, 3, 3]);
					}
					handleDone(setMode, setCurrentStep, setQuestionIndex);
				},
			});
		} else {
			setShowHotseat(false);
			if (activeVanguardIndex === 0) {
				setVanguardActiveStates([false, true, true, true]);
				setVanguardActivationCounts((prev) => [prev[0], 3, 3, 3]);
			}
			handleDone(setMode, setCurrentStep, setQuestionIndex);
		}
	};

	return (
		<>
			{/* Loading Overlay */}
			{showOverlay && (
				<LoadingOverlay
					progress={displayedProgress}
					hasReachedFirstBreakpoint={hasReachedFirstBreakpoint}
					onEnter={handleOverlayEnter}
				/>
			)}

			<div className="logo-container" ref={logoContainerRef}>
				<Logo />
				<BudgetBar />
				<HeartsUI title="ECO VANGUARD" fillNumber={ecoHearts} imageSrc={ecoVanguard_pfp} />
				<HeartsUI
					title="WEALTH VANGUARD"
					fillNumber={wealthHearts}
					imageSrc={wealthVanguard_pfp}
				/>
				<HeartsUI
					title="ETHICS VANGUARD"
					fillNumber={ethicsHearts}
					imageSrc={ethicsVanguard_pfp}
				/>
			</div>

			<div
				className="canvas-container"
				style={{ position: "relative" }}
				ref={canvasContainerRef}
			>
				{/* Vanguard UI */}
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

				{/* CreateBrand */}
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
							opacity: currentBreakpointIndex < 1 ? 0 : 1,
							pointerEvents: currentBreakpointIndex < 1 ? "none" : "auto",
							transition: "opacity 0.8s ease",
							transitionDelay: currentBreakpointIndex < 1 ? "0s" : "6s",
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
							onCreate={() => {
								setShowCreateBrand(false);
								setStage(STAGES.BRAND);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
							onLogoSelect={handleLogoSelect}
						/>
					</div>
				)}

				{/* OutfitSelection */}
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
							onLogoSelect={handleLogoSelect}
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

				{/* CanvasManufactorer */}
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
							onLogoSelect={handleLogoSelect}
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

				{/* CanvasFabricLabs */}
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
							onLogoSelect={handleLogoSelect}
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

				{/* Vanguard Pop-up */}
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
                        steps={[getVanguardData(activeVanguardIndex, stage)]}
                        onDeactivateActiveVanguard={handleDeactivateActiveVanguard}
                    />

						{/* <VanguardPopUp
							steps={
								vanguardContents[activeVanguardIndex].scenarios[
									Math.min(
										vanguardActivationCounts[activeVanguardIndex] - 1,
										vanguardContents[activeVanguardIndex].scenarios.length - 1
									)
								]
							}
							onDeactivateActiveVanguard={handleDeactivateActiveVanguard}
						/> */}
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
							opacity: 1,
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
					brandName={brandName}
					fontStyle={fontStyle}
					onLogoMeshMounted={handleLogoMeshMounted}
				/>
			</div>
		</>
	);
}

export default Room;
