import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/canvasFabricLabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import neutralThumb from "../assets/images/leaf.svg";

// Removed import of BotSvg:
// import BotSvg from "../assets/images/tutorial-bot.svg";

import CanvasBarFabrics from "../components/CanvasBarFabrics";
import { useModels } from "../utils/ModelsContext";
import { FundingContext } from "../utils/FundingContext";

const HOLD_DURATION = 0;

function CanvasFabricLabs({
	onStart,
	onCreate,
	onFabricSelection,
	onFabricSelect, // For real-time 3D toggling
}) {
	const { CottonChoices, HeavyChoices, SyntheticChoices } = useModels();
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	// Which section (1=Light, 2=Knit, 3=Shiny)
	const [currentSection, setCurrentSection] = useState(1);

	// Selected fabric object for each section
	const [selectedFabrics, setSelectedFabrics] = useState({
		1: null,
		2: null,
		3: null,
	});

	// Index of the currently highlighted fabric
	const [selectedFabricIndex, setSelectedFabricIndex] = useState(0);

	// Return array based on which section is active
	const getFabricsForSection = () => {
		if (currentSection === 1) return CottonChoices;
		if (currentSection === 2) return HeavyChoices;
		if (currentSection === 3) return SyntheticChoices;
		return [];
	};

	const getIcon = (iconType) => {
		switch (iconType) {
			case "positive":
				return greenThumb;
			case "negative":
				return redThumb;
			case "neutral":
				return neutralThumb;
			default:
				return neutralThumb;
		}
	};

	// Current array of possible fabrics for the active section
	const fabricsData = getFabricsForSection();

	// The actual highlighted fabric object
	const currentFabric =
		fabricsData && fabricsData.length > 0
			? fabricsData[selectedFabricIndex]
			: null;

	// cost (just for display)
	const totalCost = Object.values(selectedFabrics).reduce(
		(acc, fabric) => (fabric ? acc + fabric.cost : acc),
		0
	);

	// Start button logic
	const [isExpanded, setIsExpanded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	const containerRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.out" }
		);
	}, []);

	function startHold(e) {
		e.preventDefault();
		setIsBlinking(false);
		setProgress(0);
		holdStartRef.current = Date.now();

		intervalRef.current = setInterval(() => {
			const elapsed = Date.now() - holdStartRef.current;
			const newProgress = (elapsed / HOLD_DURATION) * 100;
			if (newProgress >= 100) {
				setProgress(100);
				handleDone();
				clearInterval(intervalRef.current);
			} else {
				setProgress(newProgress);
			}
		}, 30);
	}

	function endHold(e) {
		e.preventDefault();
		clearInterval(intervalRef.current);
		if (progress < 100) {
			setProgress(0);
			setIsBlinking(true);
		}
	}

	function handleDone() {
		gsap.to(createParentRef.current, {
			duration: 1,
			backgroundColor: "black",
			borderBottom: "1px solid rgb(66, 66, 66)",
			ease: "power2.out",
		});
		gsap.to(buttonContainerRef.current, {
			duration: 1,
			opacity: 0,
			onComplete: () => {
				setIsExpanded(true);
				onStart?.();
			},
		});
	}

	useEffect(() => {
		if (isExpanded && loremContainerRef.current) {
			gsap.to(loremContainerRef.current, {
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			});
		}
	}, [isExpanded]);

	// Final hold in the 3rd section
	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);
	const createHoldStartRef = useRef(null);
	const createIntervalRef = useRef(null);

	const isOnLastSection = currentSection === 3;
	const isFabricChosenThisSection = !!selectedFabrics[currentSection];

	function startCreateHold(e) {
		if (!isOnLastSection || !isFabricChosenThisSection) return;
		e.preventDefault();
		setIsCreateBlinking(false);
		setCreateProgress(0);
		createHoldStartRef.current = Date.now();

		createIntervalRef.current = setInterval(() => {
			const elapsed = Date.now() - createHoldStartRef.current;
			const newProgress = (elapsed / HOLD_DURATION) * 100;
			if (newProgress >= 100) {
				setCreateProgress(100);
				handleCreateDone();
				clearInterval(createIntervalRef.current);
			} else {
				setCreateProgress(newProgress);
			}
		}, 30);
	}

	function endCreateHold(e) {
		if (!isOnLastSection || !isFabricChosenThisSection) return;
		e.preventDefault();
		clearInterval(createIntervalRef.current);
		if (createProgress < 100) {
			setCreateProgress(0);
			setIsCreateBlinking(true);
		}
	}

	function handleCreateDone() {
		const selectedFabricsArray = Object.values(selectedFabrics) || [];

		// Subtract cost of the final pick from budget
		const finalFabric = selectedFabrics[3];
		if (finalFabric) {
			setFundingAmount((prev) => (prev !== null ? prev - finalFabric.cost : 0));
		}

		// Trigger final selection to Room
		onFabricSelection(selectedFabricsArray);

		// Fade out entire container
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	}

	function handlePurchaseClick() {
		if (!isFabricChosenThisSection) return;
		if (currentSection < 3) {
			const chosenFabric = selectedFabrics[currentSection];
			if (chosenFabric) {
				setFundingAmount((prev) =>
					prev !== null ? prev - chosenFabric.cost : 0
				);
			}
			setCurrentSection((prevSec) => prevSec + 1);
			setSelectedFabricIndex(0);
		}
	}

	/**
	 * Called when user clicks a fabric.
	 * We store it in local state (for cost, summary, etc.)
	 * Then we call onFabricSelect(fabric.fabricKey) to tell Room to animate the 3D mesh.
	 */
	function handleFabricSelectInUI(fabric) {
		console.log("Fabric clicked:", fabric);
		setSelectedFabrics((prev) => ({
			...prev,
			[currentSection]: fabric,
		}));

		if (onFabricSelect && fabric.fabricKey) {
			console.log("[CanvasFabricLabs] onFabricSelect =>", fabric.fabricKey);
			onFabricSelect(fabric.fabricKey);
		} else {
			console.log("[CanvasFabricLabs] onFabricSelect not called");
		}
	}

	function getSectionTitle() {
		switch (currentSection) {
			case 1:
				return "1. CHOOSE A LIGHT FABRIC";
			case 2:
				return "2. CHOOSE A KNIT FABRIC";
			case 3:
				return "3. CHOOSE A SHINY FABRIC";
			default:
				return "";
		}
	}

	const buttonLabel = currentSection < 3 ? "Purchase" : "Purchase";
	const isButtonActive = isFabricChosenThisSection;

	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container ${
					isExpanded ? "expanded-container fabric" : ""
				}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 3 <span>/ 4</span>
						</div>
						<div className="step-parent-container">
							<div
								className={`step-containers ${
									currentSection >= 1 ? "active-step" : ""
								}`}
								style={{ backgroundColor: "white" }}
							></div>
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							></div>
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							></div>
							<div className="step-containers"></div>
						</div>
					</div>
					<div className="brand-create">Select Fabrics</div>
				</div>

				<div className="body-create">
					{!isExpanded ? (
						<div ref={buttonContainerRef} className="button-container">
							<div className="button-description">
								Source a lightweight, knit, and shiny fabric to use for your
								outfits.
							</div>
							<div
								className={`button-start ${isBlinking ? "blink-start" : ""}`}
								onMouseDown={startHold}
								onMouseUp={endHold}
								onTouchStart={startHold}
								onTouchEnd={endHold}
							>
								<div
									className="hold-progress-start"
									style={{ width: `${progress}%` }}
								/>
								<div style={{ position: "relative", zIndex: 2 }}>
									Start
									<FontAwesomeIcon icon={faArrowRight} className="icon-right" />
								</div>
							</div>
						</div>
					) : (
						<div
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div className="fabric-nav-container">
								<div className="fabric-nav-child-container">
									<div
										className={`section-number ${
											currentSection === 1 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(1)}
									>
										1
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 2 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(2)}
									>
										2
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 3 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(3)}
									>
										3
									</div>
								</div>
							</div>

							<div className="fabric-title-container">
								<div>
									<div className="fabric-title">{getSectionTitle()}</div>
									<div className="fabric-selection-container">
										{fabricsData.map((fabric, idx) => (
											<div
												key={fabric.id}
												className={`fabric-container ${
													idx === selectedFabricIndex ? "active" : ""
												}`}
												onClick={() => {
													setSelectedFabricIndex(idx);
													handleFabricSelectInUI(fabric);
												}}
											>
												<img
													className="fabric-img"
													width={"100px"}
													height={"100px"}
													src={fabric.img_path}
													alt={fabric.name}
												/>
												<div className="fabric-options">
													<div className="fabric-option-title">
														{fabric.name}
													</div>
													<div className="fabric-option-price">
														${fabric.cost}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className="create-submit-container">
								<div
									className={`create-submit ${isButtonActive ? "active" : ""}`}
								>
									<div
										className={`create-description ${
											isButtonActive ? "active" : ""
										}`}
									>
										<span
											className={`brand-title ${
												isButtonActive ? "active" : ""
											}`}
										>
											${totalCost}
										</span>
										<span
											className={`brand-desc ${isButtonActive ? "active" : ""}`}
										>
											{currentSection < 3
												? "Click Purchase to Advance"
												: "Hold Purchase to Complete"}
										</span>
									</div>
									<div
										className={`button-start ${
											isButtonActive
												? isOnLastSection
													? isCreateBlinking
														? "blink-start"
														: ""
													: ""
												: "blink-none"
										}`}
										onClick={handlePurchaseClick}
										onMouseDown={startCreateHold}
										onMouseUp={endCreateHold}
										onTouchStart={startCreateHold}
										onTouchEnd={endCreateHold}
									>
										{isOnLastSection && (
											<div
												className={`${
													isFabricChosenThisSection
														? "hold-progress-start"
														: "not-start"
												}`}
												style={{ width: `${createProgress}%` }}
											/>
										)}
										<div
											style={{ position: "relative" }}
											className="purchase-btn"
										>
											{buttonLabel}
											<FontAwesomeIcon
												icon={faArrowRight}
												className="icon-right"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* CanvasBarFabrics: previous/next cycle */}
							<CanvasBarFabrics
								items={fabricsData}
								selectedIndex={selectedFabricIndex}
								setSelectedIndex={setSelectedFabricIndex}
								onFabricSelect={(fabric) => handleFabricSelectInUI(fabric)}
							/>

							{/* Left-hand info panel for the currently highlighted fabric */}
							<div className="left-component outfit">
								{currentFabric ? (
									<div className="left-container">
										<div className="header-info">
											<span className="model-title">
												{currentFabric.name.toUpperCase()}
											</span>
											<div className="span-price">${currentFabric.cost}</div>
										</div>
										<div
											className="fabric-description"
											style={{ marginTop: "1rem", marginBottom: "1rem" }}
										>
											<div className="category-item">
												<div className="icon-container">
													<img
														src={currentFabric.cert_icon1}
														alt="Certification Icon"
														style={{
															width: "36px",
															height: "36px",
															padding: "5px",
														}}
													/>
												</div>
												<div className="text-container">
													<p className="category-title body-text-medium">
														{currentFabric.cert_title1}
													</p>
													<p className="category-description body-text-small">
														{currentFabric.cert_description1}
													</p>
												</div>
											</div>
											<div className="category-item">
												<div className="icon-container icon-padding">
													<img
														src={getIcon(currentFabric.env_icon)}
														alt="Environment Icon"
														style={{ width: "24px", height: "24px" }}
													/>
												</div>
												<div className="text-container">
													<p className="category-title body-text-medium">
														{currentFabric.env_title}
													</p>
													<p className="category-description body-text-small">
														{currentFabric.env_description}
													</p>
												</div>
											</div>
											<div className="category-item">
												<div className="icon-container icon-padding">
													<img
														src={getIcon(currentFabric.ethics_icon)}
														alt="Ethics Icon"
														style={{ width: "24px", height: "24px" }}
													/>
												</div>
												<div className="text-container">
													<p className="category-title body-text-medium">
														{currentFabric.ethics_title}
													</p>
													<p className="category-description body-text-small">
														{currentFabric.ethics_description}
													</p>
												</div>
											</div>
											<div className="category-item">
												<div className="icon-container icon-padding">
													<img
														src={getIcon(currentFabric.water_icon)}
														alt="Water Icon"
														style={{ width: "24px", height: "24px" }}
													/>
												</div>
												<div className="text-container">
													<p className="category-title body-text-medium">
														{currentFabric.water_title}
													</p>
													<p className="category-description body-text-small">
														{currentFabric.water_description}
													</p>
												</div>
											</div>
										</div>
									</div>
								) : (
									<div
										className="placeholder accent-3"
										style={{ color: "black" }}
									>
										<p className="accent-3 default-no-selection">
											SELECT A FABRIC TO VIEW STATISTICS
										</p>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasFabricLabs;
