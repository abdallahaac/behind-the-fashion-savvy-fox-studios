import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/canvasFabricLabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// Removed import of BotSvg:
// import BotSvg from "../assets/images/tutorial-bot.svg";

import CanvasBarFabrics from "../components/CanvasBarFabrics";

import { useModels } from "../utils/ModelsContext";
import { FundingContext } from "../utils/FundingContext";

const HOLD_DURATION = 0;

function CanvasFabricLabs({ onStart, onCreate, onFabricSelection }) {
	const { CottonChoices, HeavyChoices, SyntheticChoices } = useModels();
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	// Which section (1=Light, 2=Knit, 3=Shiny)
	const [currentSection, setCurrentSection] = useState(1);

	// Fabric arrays for each section
	const getFabricsForSection = () => {
		if (currentSection === 1) return CottonChoices;
		if (currentSection === 2) return HeavyChoices;
		if (currentSection === 3) return SyntheticChoices;
		return [];
	};

	// Track selected fabric (object) per section
	const [selectedFabrics, setSelectedFabrics] = useState({
		1: null,
		2: null,
		3: null,
	});

	// Current array of possible fabrics for the active section
	const fabricsData = getFabricsForSection();

	// Index of the currently highlighted fabric
	const [selectedFabricIndex, setSelectedFabricIndex] = useState(0);

	// The actual highlighted fabric object
	const currentFabric =
		fabricsData && fabricsData.length > 0
			? fabricsData[selectedFabricIndex]
			: null;

	// --------------------------------------------------
	// Calculate total cost of all selected fabrics
	// --------------------------------------------------
	const totalCost = Object.values(selectedFabrics).reduce(
		(acc, fabric) => (fabric ? acc + fabric.cost : acc),
		0
	);

	// --------------------------------------------------
	// Intro "Start" button long-press logic
	// --------------------------------------------------
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

	const startHold = (e) => {
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
	};

	const endHold = (e) => {
		e.preventDefault();
		clearInterval(intervalRef.current);
		if (progress < 100) {
			setProgress(0);
			setIsBlinking(true);
		}
	};

	const handleDone = () => {
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
	};

	useEffect(() => {
		if (isExpanded && loremContainerRef.current) {
			gsap.to(loremContainerRef.current, {
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			});
		}
	}, [isExpanded]);

	// --------------------------------------------------
	// Final (3rd) section Purchase hold logic
	// --------------------------------------------------
	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);
	const createHoldStartRef = useRef(null);
	const createIntervalRef = useRef(null);

	// Are we on the last section?
	const isOnLastSection = currentSection === 3;
	// Check if user selected a fabric in the current section
	const isFabricChosenThisSection = !!selectedFabrics[currentSection];

	const startCreateHold = (e) => {
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
	};

	const endCreateHold = (e) => {
		if (!isOnLastSection || !isFabricChosenThisSection) return;
		e.preventDefault();
		clearInterval(createIntervalRef.current);
		if (createProgress < 100) {
			setCreateProgress(0);
			setIsCreateBlinking(true);
		}
	};

	const handleCreateDone = () => {
		const selectedFabricsArray = Object.values(selectedFabrics);
		// Subtract the cost of the 3rd fabric from the budget
		const finalFabric = selectedFabrics[3];
		if (finalFabric) {
			setFundingAmount((prev) => (prev !== null ? prev - finalFabric.cost : 0));
		}
		console.log("Selected fabrics:", selectedFabricsArray);

		// Call the onFabricSelection callback with the final selections
		onFabricSelection(selectedFabricsArray);

		// Fade out the entire container
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	};

	// --------------------------------------------------
	// On "Purchase" click for sections 1 & 2 -> next & subtract cost
	// On section 3 -> do the hold logic instead
	// --------------------------------------------------
	const handlePurchaseClick = () => {
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
		// If currentSection === 3, we rely on the hold logic
	};

	// --------------------------------------------------
	// Fabric selection logic
	// --------------------------------------------------
	const handleFabricSelect = (fabric) => {
		console.log("clicked");
		if (!fabric) return;
		setSelectedFabrics((prev) => ({
			...prev,
			[currentSection]: fabric,
		}));
	};

	// --------------------------------------------------
	// Section Title
	// --------------------------------------------------
	const getSectionTitle = () => {
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
	};

	// Button label and active styling
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
					{/* === Screen #1: The big "Start" button (not yet expanded) === */}
					{!isExpanded ? (
						<div ref={buttonContainerRef} className="button-container">
							<div className="button-description">
								Source a lightweight, knit, and shiny fabric to use for your
								outfits.
								{/* Current Budget:{" "}
								<strong>${fundingAmount ?? "N/A"}</strong> */}
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
						// === Screen #2: The multi-section fabric selection ===
						<div
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							{/* Top nav: clickable section numbers */}
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

							{/* Title / fabric grid */}
							{/*  */}
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
													handleFabricSelect(fabric);
												}}
											>
												{/* Use the fabric's image path here */}
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

							{/* Purchase button area */}
							<div className="create-submit-container">
								<div
									className={`create-submit ${isButtonActive ? "active" : ""}`}
								>
									<div
										className={`create-description ${
											isButtonActive ? "active" : ""
										}`}
									>
										{/* Display total cost instead of budget */}
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
													? // For 3rd section, blink if user hasn't fully held the button
													  isCreateBlinking
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
										{/* Show hold progress only on the last section */}
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

							{/* CanvasBarFabrics with prev/next */}
							<CanvasBarFabrics
								items={fabricsData}
								selectedIndex={selectedFabricIndex}
								setSelectedIndex={setSelectedFabricIndex}
								// Pass down our fabric selection callback:
								onFabricSelect={handleFabricSelect}
							/>

							{/* Left-hand info panel for the currently highlighted fabric */}
							<div className="left-component">
								{currentFabric && (
									<div className="left-container">
										<div className="header-info">
											<span className="model-title">
												{currentFabric.name.toUpperCase()}
											</span>
											<div className="span-price">${currentFabric.cost}</div>
										</div>
										<div
											style={{ marginTop: "1rem", marginBottom: "1rem" }}
											className="fabric-description"
										>
											<p>
												{currentFabric.env_title
													? currentFabric.env_title
													: "Environment info..."}
											</p>
											<p>
												{currentFabric.env_description
													? currentFabric.env_description
													: "Description..."}
											</p>
										</div>
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
