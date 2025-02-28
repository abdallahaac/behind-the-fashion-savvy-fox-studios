// src/pages/Room.jsx

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

// Funding context & overlay
import { FundingContext } from "../utils/FundingContext";
import LoadingOverlay from "../utils/LoadingOverlay";

function Room() {
	// ============ VANGUARD / STAGES SETUP ============
	const STAGES = {
		INTRO: "introduction",
		BRAND: "brand",
		FABRIC: "fabric",
		CLOTHING: "clothing",
		MANUFACTURING: "manufacturing",
		FINAL: "final",
	};
	const [stage, setStage] = useState(STAGES.INTRO);

	// Vanguard states
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

	// ============ SHOW / HIDE UI ===============
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showOutfitSelection, setShowOutfitSelection] = useState(false);
	const [showFabricLabs, setShowFabricLabs] = useState(false);
	const [showManufactorer, setShowManufactorer] = useState(false);
	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(false);

	// ============ ANIMATION + BREAKPOINTS ============
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);

	// We'll unify to this larger list of breakpoints
	

	// Scene loading progress
	const { progress: rawProgress } = useProgress();
	const [hasReachedFirstBreakpoint, setHasReachedFirstBreakpoint] =
		useState(false);
	const [showOverlay, setShowOverlay] = useState(true);
	const displayedProgress = hasReachedFirstBreakpoint
		? 100
		: Math.min(Math.max(rawProgress, 1), 99);

	const breakpoints = [
		44, 183, 339, 550, 675, 854, 1065, 1200, 1339, 1554, 1695, 1858, 2084, 2300
	];

	const [brandName, setBrandName] = useState("MYBRAND");
	const [fontStyle, setFontStyle] = useState("");
	const logoMeshRefs = useRef({});
	const outfitMeshRefs = useRef({});
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [selectedOutfit, setSelectedOutfit] = useState("Outfit1");

	// ============ FABRIC STATES ============
	const fabricMeshRefs = useRef({});
	const [selectedFabric, setSelectedFabric] = useState(null);

	// ============ FACTORY STATES (new) ============
	const factoryMeshRefs = useRef({});
	const [selectedFactory, setSelectedFactory] = useState(null);

	// ============ REF TO DOM ELEMENTS ============
	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const hotseatRef = useRef(null);

	// ============ HOTSEAT / QUIZ ============
	const [currentStep, setCurrentStep] = useState(0);
	const [mode, setMode] = useState("Normal");
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [result, setResult] = useState(0);

	// ============ HEARTS + FEEDBACK LOGIC ============
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

	// ============ FUNDING CONTEXT ============
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

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
				else if(stage === STAGES.FINAL){
					return assistantData[0].finalFeedback;
				}
			case 1:
				if(stage === STAGES.INTRO){
					return ecoVanguard[0].introduction;
				}
				else if (stage === STAGES.FABRIC || stage === STAGES.MANUFACTURING ||stage === STAGES.FINAL){	
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
	

	// Called by Scene for each outfit (NEW)
	// const handleOutfitMeshMounted = (outfitKey, ref) => {
	// 	outfitMeshRefs.current[outfitKey] = ref;
	// };

	// Animate a given logo's Z position
	function animateLogoTo(logoId, newZ) {
		const ref = logoMeshRefs.current[logoId];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
			});
		}
	}

	// Animate a given outfit's Z position (unchanged)
	function animateOutfitTo(outfitId, newZ) {
		const ref = outfitMeshRefs.current[outfitId];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
			});
		}
	}

	// OUTFIT selection logic: swap the current active outfit with the clicked outfit
	function handleOutfitSelect(newOutfitId) {
		// If the clicked outfit is already active, do nothing.
		if (selectedOutfit === newOutfitId) {
			return;
		}
		// Animate the currently active outfit (initially "Outfit1") back to z = -75.
		animateOutfitTo(selectedOutfit, -120);
		// Animate the newly clicked outfit forward to z = -45.
		animateOutfitTo(newOutfitId, -45);
		// Update the active outfit state.
		setSelectedOutfit(newOutfitId);
		//
	}
	// LOGO selection logic
	function handleLogoSelect(newLogoId) {
		// If no logo is currently active, animate the clicked logo to z = -49.51
		if (!selectedLogo) {
			animateLogoTo(newLogoId, -49.51);
			setSelectedLogo(newLogoId);
			return;
		}
		// If the clicked logo is already active, do nothing.
		if (selectedLogo === newLogoId) {
			return;
		}
		// Animate the previously active logo back to z = -75 (for example).
		animateLogoTo(selectedLogo, -100);
		// Animate the newly clicked logo to z = -49.51.
		animateLogoTo(newLogoId, -49.51);
		setSelectedLogo(newLogoId);
	}



	useEffect(() => {
		const shuffled = QuizQuestions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffled.slice(0, 3));
	}, []);

	// ============ INTRO FADE-IN ============
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

	// ============ VANGUARD UI FADE-IN ============
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

	// ============ AUTO-PLAY SCENE ON MOUNT ============
	useEffect(() => {
		handlePlayClick();
	}, []);

	//Calculating average scores of metrics : cost, ethics, sustainability
	const calculateAverageScores = (selectedItems) => {
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

		const averageEthics = totalEthics / itemCount;
		const averageSustainability =
			sustainabilityCount > 0 ? totalSustainability / sustainabilityCount : 0;
		const averageCost = totalCost / itemCount;

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
		
    

        const ethics_feedback = updateVanguardStatus("ethics", currentStage, averages, ethicsHearts);
        // use max to make sure hearts don't go below 0
        setEthicsHearts((prevHearts) => Math.max(0, prevHearts + ethics_feedback.hearts));
        console.log("Ethics Vanguard Feedback:", ethics_feedback);
        setEthicsFeedback(ethics_feedback);

        const eco_feedback = updateVanguardStatus("eco", currentStage, averages, ecoHearts);
        setEcoHearts((prevHearts) => Math.max(0, prevHearts + eco_feedback.hearts));
        console.log("Eco Vanguard Feedback:", eco_feedback);
        setEcoFeedback(eco_feedback);

        const wealth_feedback = updateVanguardStatus("wealth", currentStage, averages, wealthHearts);
        setWealthHearts((prevHearts) => Math.max(0, prevHearts + wealth_feedback.hearts));
        console.log("Wealth Vanguard Feedback:", wealth_feedback);
        setWealthFeedback(wealth_feedback);

		

    };

	const handleFinalPitch = () => {
		const newStage = STAGES.FINAL;
		setStage(newStage);
		const ethics_feedback = updateVanguardStatus("ethics", newStage, {}, ethicsHearts);
		setEthicsFeedback(ethics_feedback);

		const eco_feedback = updateVanguardStatus("eco", newStage, {}, ecoHearts);
		setEcoFeedback(eco_feedback);

		const wealth_feedback = updateVanguardStatus("wealth", newStage, {}, wealthHearts);
		setWealthFeedback(wealth_feedback);
		// take current number of hearts and use it in VanguardPopUp
		console.log("Ethics Hearts:", ethicsHearts);
		console.log("Eco Hearts:", ecoHearts);
		console.log("Wealth Hearts:", wealthHearts);
	}

	
	const handleClothingSelection = (selectedItems) => {
		const newStage = STAGES.CLOTHING;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedClothingItems,
			newStage
		);
	};

	const handleFabricSelection = (selectedItems) => {
		const newStage = STAGES.FABRIC;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedFabricItems,
			newStage
		);
	};

	const handleManufacturingSelection = (selectedItems) => {
		const newStage = STAGES.MANUFACTURING;
		setStage(newStage);
		handleSelectionCalculations(
			selectedItems,
			setSelectedManufacturingItems,
			newStage
		);
	};

	// === Overlays & Popups logic ===
	const handleOverlayEnter = () => {
		setShowOverlay(false);
	};
	function handlePlayClick() {
		setPlayAnimation(true);
		setPaused(false);
	};

	// this resumes the play after the user has paused it
	const handleContinue = () => {
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
			case 13:
				handleFinalPitch();
				setShowVanguardUI(true);
				setVanguardActiveStates([true, false, false, false]);
				break;
			default:
				break;
		}
	}

	// ============ LOGO MESH MOUNT ============
	function handleLogoMeshMounted(logoKey, ref) {
		logoMeshRefs.current[logoKey] = ref;
	}

	// ============ OUTFIT MESH MOUNT ============
	function handleOutfitMeshMounted(outfitKey, ref) {
		outfitMeshRefs.current[outfitKey] = ref;
	}

	// ============ FABRIC MESH MOUNT ============
	function handleFabricMeshMounted(fabricKey, ref) {
		fabricMeshRefs.current[fabricKey] = ref;
	}

	// ============ FACTORY MESH MOUNT (new) ============
	function handleFactoryMeshMounted(factoryKey, ref) {
		factoryMeshRefs.current[factoryKey] = ref;
	}

	// ============ GSAP ANIM HELPERS ============
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
	function animateFactoryTo(factoryKey, newZ) {
		const ref = factoryMeshRefs.current[factoryKey];
		if (ref && ref.current) {
			gsap.to(ref.current.position, {
				z: newZ,
				duration: 1,
				onComplete: () => {
					if (ref.current) {
						console.log(
							`[FACTORY] ${factoryKey} final position:`,
							ref.current.position.toArray()
						);
					}
				},
			});
		}
	}

	// ============ LOGO SELECT LOGIC ============
	function handleLogoSelect(newLogoId) {
		if (!selectedLogo) {
			// no previous => bring the new one forward
			animateLogoTo(newLogoId, -49.51);
			setSelectedLogo(newLogoId);
			return;
		}
		if (selectedLogo === newLogoId) return;
		// push old back
		animateLogoTo(selectedLogo, -100);
		animateLogoTo(newLogoId, -49.51);
		setSelectedLogo(newLogoId);
	}

	// ============ OUTFIT SELECT LOGIC ============
	function handleOutfitSelect(newOutfitId) {
		if (selectedOutfit === newOutfitId) return;
		// push old away
		animateOutfitTo(selectedOutfit, -120);
		// bring new forward
		animateOutfitTo(newOutfitId, -45);
		setSelectedOutfit(newOutfitId);
	}

	// ============ FABRIC SELECT LOGIC ============
	function handleFabricSelect(newFabricKey) {
		if (!newFabricKey) return;
		if (selectedFabric === newFabricKey) return;

		if (selectedFabric) {
			// push old behind
			animateFabricTo(selectedFabric, -200);
		}
		// bring new forward
		animateFabricTo(newFabricKey, -75);
		setSelectedFabric(newFabricKey);

		console.log("[FABRIC SELECT] from", selectedFabric, "to", newFabricKey);
	}

	// ============ FACTORY SELECT LOGIC (new) ============
	function handleFactorySelect(newFactoryKey) {
		if (!newFactoryKey) return;
		if (selectedFactory === newFactoryKey) return;

		// push old behind
		if (selectedFactory) {
			animateFactoryTo(selectedFactory, -200);
		}
		// bring new forward
		animateFactoryTo(newFactoryKey, -75);
		setSelectedFactory(newFactoryKey);

		console.log("[FACTORY SELECT] from", selectedFactory, "to", newFactoryKey);
	}

	// ============ VANGUARD / HOTSEAT UI ============
	function handleVanguardClick(index) {
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
			if (vanguardActivationCounts[0] === 1 || stage === STAGES.FINAL) {
				// Turn off Vanguard 0, enable 1..3
				setVanguardActiveStates([false, true, true, true]);
			} else if (vanguardActivationCounts[0] >= 2) {
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
	}

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

			{/* Logo + Hearts UI */}
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
							// Pass a callback for real-time 3D toggling
							onFactorySelect={handleFactorySelect}
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
							onFabricSelection={handleFabricSelection}
							// Real-time 3D toggling of fabric
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
						currentStage={stage}
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
					// LOGO & OUTFIT references
					onLogoMeshMounted={handleLogoMeshMounted}
					onOutfitMeshMounted={handleOutfitMeshMounted}
					// FABRIC references
					onFabricMeshMounted={handleFabricMeshMounted}
					// FACTORY references (new)
					onFactoryMeshMounted={handleFactoryMeshMounted}
				/>
			</div>
		</>
	);
}

export default Room;
