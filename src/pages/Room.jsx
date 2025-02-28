import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";
import { updateVanguardStatus } from "../utils/VanguardStatus";
import {
	assistantData,
	allVanguards,
	ecoVanguard,
	ethicsVanguard,
	wealthVanguard,
} from "../utils/VanguardResponses";
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
		INTRO: "introduction",
		BRAND: "brand",
		FABRIC: "fabric",
		CLOTHING: "clothing",
		MANUFACTURING: "manufacturing",
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

	const [hasReachedFirstBreakpoint, setHasReachedFirstBreakpoint] =
		useState(false);
	const [showOverlay, setShowOverlay] = useState(true);

	const displayedProgress = hasReachedFirstBreakpoint
		? 100
		: Math.min(Math.max(rawProgress, 1), 99);

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

	// === OUTFIT references and selection ===
	const outfitMeshRefs = useRef({});
	const [selectedOutfit, setSelectedOutfit] = useState("Outfit1");

	// === FABRIC references and selection ===
	const fabricMeshRefs = useRef({});
	const [selectedFabric, setSelectedFabric] = useState(null);

	// Called by Scene for each logo
	const handleLogoMeshMounted = (logoKey, ref) => {
		logoMeshRefs.current[logoKey] = ref;
	};

	// Called by Scene for each outfit
	const handleOutfitMeshMounted = (outfitKey, ref) => {
		outfitMeshRefs.current[outfitKey] = ref;
	};

	// Called by Scene for each fabric
	const handleFabricMeshMounted = (fabricKey, ref) => {
		fabricMeshRefs.current[fabricKey] = ref;
	};

	function animateLogoTo(logoId, newZ) {
		const ref = logoMeshRefs.current[logoId];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
				onComplete: () => {
					if (ref.current) {
						console.log(
							`[LOGO] ${logoId} final position:`,
							ref.current.position.toArray()
						);
					}
				},
			});
		}
	}

	function animateOutfitTo(outfitId, newZ) {
		const ref = outfitMeshRefs.current[outfitId];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
				onComplete: () => {
					if (ref.current) {
						console.log(
							`[OUTFIT] ${outfitId} final position:`,
							ref.current.position.toArray()
						);
					}
				},
			});
		}
	}
	// GSAP helper for fabrics
	function animateFabricTo(fabricKey, newZ) {
		const ref = fabricMeshRefs.current[fabricKey];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
				onComplete: () => {
					if (ref.current) {
						console.log(
							`[FABRIC] ${fabricKey} final position:`,
							ref.current.position.toArray()
						);
					}
				},
			});
		}
	}

	// ==============
	// OUTFIT logic
	// ==============
	function handleOutfitSelect(newOutfitId) {
		if (selectedOutfit === newOutfitId) return;
		animateOutfitTo(selectedOutfit, -120);
		animateOutfitTo(newOutfitId, -45);
		setSelectedOutfit(newOutfitId);
	}

	// ==============
	// LOGO logic
	// ==============
	function handleLogoSelect(newLogoId) {
		if (!selectedLogo) {
			animateLogoTo(newLogoId, -49.51);
			setSelectedLogo(newLogoId);
			return;
		}
		if (selectedLogo === newLogoId) return;
		animateLogoTo(selectedLogo, -100);
		animateLogoTo(newLogoId, -49.51);
		setSelectedLogo(newLogoId);
	}

	// ==============
	// FABRIC logic
	// ==============
	// Called by child CanvasFabricLabs
	function handleFabricSelect(newFabricKey) {
		if (!newFabricKey) return;
		if (selectedFabric === newFabricKey) return;

		// Animate old fabric away
		if (selectedFabric) {
			animateFabricTo(selectedFabric, -200);
		}
		// Animate new fabric forward
		animateFabricTo(newFabricKey, -75);
		setSelectedFabric(newFabricKey);

		console.log(
			"[FABRIC SELECT] Changing from",
			selectedFabric,
			"to",
			newFabricKey
		);
	}

	// Shuffling questions for hotseat
	useEffect(() => {
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
		handlePlayClick();
	}, []);

	// ==============
	// CLOTHING & FABRIC & MANUFACTURING calculations
	// ==============
	const [selectedClothingItems, setSelectedClothingItems] = useState([]);
	const [selectedFabricItems, setSelectedFabricItems] = useState([]);
	const [selectedManufacturingItems, setSelectedManufacturingItems] = useState(
		[]
	);
	const [averageEthics, setAverageEthics] = useState(0);
	const [averageSustainability, setAverageSustainability] = useState(0);
	const [averageCost, setAverageCost] = useState(0);

	const [ethicsHearts, setEthicsHearts] = useState(3);
	const [ecoHearts, setEcoHearts] = useState(3);
	const [wealthHearts, setWealthHearts] = useState(3);
	const [ethicsFeedback, setEthicsFeedback] = useState(null);
	const [ecoFeedback, setEcoFeedback] = useState(null);
	const [wealthFeedback, setWealthFeedback] = useState(null);

	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	const getVanguardData = (activeVanguardIndex, stage) => {
		console.log("current stage", stage);
		switch (activeVanguardIndex) {
			case 0:
				if (stage === STAGES.INTRO) {
					return assistantData[0].introduction;
				} else if (stage === STAGES.BRAND) {
					return allVanguards[0].brand;
				}
				break;
			case 1:
				if (stage === STAGES.INTRO) {
					return ecoVanguard[0].introduction;
				} else if (stage === STAGES.FABRIC || stage === STAGES.MANUFACTURING) {
					return ecoFeedback;
				}
				break;
			case 2:
				if (stage === STAGES.INTRO) {
					return ethicsVanguard[0].introduction;
				} else {
					return ethicsFeedback;
				}
			case 3:
				if (stage === STAGES.INTRO) {
					return wealthVanguard[0].introduction;
				} else {
					return wealthFeedback;
				}
			default:
				return null;
		}
	};

	function calculateAverageScores(selectedItems) {
		const itemsArray = Array.isArray(selectedItems)
			? selectedItems
			: Object.values(selectedItems);
		const totalEthics = itemsArray.reduce(
			(sum, item) => sum + (item.ethics || 0),
			0
		);
		const totalSustainability = itemsArray.reduce(
			(sum, item) => sum + (item.sustainability || 0),
			0
		);
		const totalCost = itemsArray.reduce(
			(sum, item) => sum + (item.cost || 0),
			0
		);

		const itemCount = itemsArray.length;
		const sustainabilityCount = itemsArray.filter(
			(item) => item.sustainability !== undefined
		).length;

		const averageEthics = itemCount > 0 ? totalEthics / itemCount : 0;
		const averageSustainability =
			sustainabilityCount > 0 ? totalSustainability / sustainabilityCount : 0;
		const averageCost = itemCount > 0 ? totalCost / itemCount : 0;

		return { averageEthics, averageSustainability, averageCost };
	}

	function handleSelectionCalculations(
		selectedItems,
		setSelectedItems,
		currentStage
	) {
		setSelectedItems(selectedItems);
		const averages = calculateAverageScores(selectedItems);
		console.log("Averages:", averages);
		setAverageEthics(averages.averageEthics);
		setAverageSustainability(averages.averageSustainability);
		setAverageCost(averages.averageCost);
		console.log("current stage", currentStage);

		const ethics_feedback = updateVanguardStatus(
			"ethics",
			currentStage,
			averages
		);
		setEthicsHearts((prev) => Math.max(0, prev + ethics_feedback.hearts));
		console.log("Ethics Vanguard Feedback:", ethics_feedback);
		setEthicsFeedback(ethics_feedback);

		const eco_feedback = updateVanguardStatus("eco", currentStage, averages);
		setEcoHearts((prev) => Math.max(0, prev + eco_feedback.hearts));
		console.log("Eco Vanguard Feedback:", eco_feedback);
		setEcoFeedback(eco_feedback);

		const wealth_feedback = updateVanguardStatus(
			"wealth",
			currentStage,
			averages
		);
		setWealthHearts((prev) => Math.max(0, prev + wealth_feedback.hearts));
		console.log("Wealth Vanguard Feedback:", wealth_feedback);
		setWealthFeedback(wealth_feedback);
	}

	function handleClothingSelection(selectedItems) {
		const newStage = STAGES.CLOTHING;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedClothingItems,
			newStage
		);
	}

	function handleFabricSelection(selectedItems) {
		const newStage = STAGES.FABRIC;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedFabricItems,
			newStage
		);
	}

	function handleManufacturingSelection(selectedItems) {
		const newStage = STAGES.MANUFACTURING;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedManufacturingItems,
			newStage
		);
	}

	// Overlays & popups
	const handleOverlayEnter = () => {
		setShowOverlay(false);
	};

	function handlePlayClick() {
		setPlayAnimation(true);
		setPaused(false);
	}

	function handleContinue() {
		setPaused(false);
		setCurrentBreakpointIndex((prev) => prev + 1);
	}

	function handleBreakpointHit(index) {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);

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
	}

	function handleVanguardClick(index) {
		if (!vanguardActiveStates[index]) return;
		if (currentBreakpointIndex === 9 && index === 0) {
			setShowHotseat(true);
			setActiveVanguardIndex(0);
			return;
		}
		setActiveVanguardIndex(index);
		incrementVanguardActivation(index);
		setShowPopUp(true);
	}

	function incrementVanguardActivation(index) {
		setVanguardActivationCounts((prev) => {
			const newCounts = [...prev];
			newCounts[index]++;
			return newCounts;
		});
	}

	function handleDeactivateActiveVanguard() {
		const prevActive = activeVanguardIndex;
		setShowPopUp(false);
		setActiveVanguardIndex(null);

		if (prevActive === 0) {
			if (vanguardActivationCounts[0] === 1) {
				setVanguardActiveStates([false, true, true, true]);
			} else if (vanguardActivationCounts[0] >= 2) {
				setVanguardActiveStates([false, false, false, false]);
				handleContinue();
			}
		} else {
			setVanguardActiveStates((prevStates) => {
				const newStates = [...prevStates];
				newStates[prevActive] = false;
				if (!newStates[1] && !newStates[2] && !newStates[3]) {
					handleContinue();
				}
				return newStates;
			});
		}
	}

	// HOTSEAT
	function handleHotseatDone() {
		if (hotseatRef.current) {
			gsap.to(hotseatRef.current, {
				duration: 1,
				opacity: 0,
				ease: "power2.out",
				onComplete: () => {
					setShowHotseat(false);
					if (activeVanguardIndex === 0) {
						setVanguardActiveStates([false, true, true, true]);
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
	}

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
				<HeartsUI
					title="ECO VANGUARD"
					fillNumber={ecoHearts}
					imageSrc={ecoVanguard_pfp}
				/>
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
							onOutfitSelect={handleOutfitSelect}
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
							onCreate={() => {
								setShowFabricLabs(false);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2}
							onFabricSelection={(arr) => {
								console.log("Final fabric selection =>", arr);
								// do your cost calculations
							}}
							onFabricSelect={handleFabricSelect}
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
					onOutfitMeshMounted={handleOutfitMeshMounted}
					onFabricMeshMounted={handleFabricMeshMounted}
				/>
			</div>
		</>
	);
}

export default Room;
