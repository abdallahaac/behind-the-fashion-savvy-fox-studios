import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/canvasFabricLabs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import neutralThumb from "../assets/images/emotion_neutral.svg";

import CanvasBarFabrics from "../components/CanvasBarFabrics";
import { useModels } from "../utils/ModelsContext";
import { FundingContext } from "../utils/FundingContext";
import { useAudioManager } from "../utils/AudioManager";

const HOLD_DURATION = 0;

// Helper function to format price values
const formatPrice = (price) => {
	if (!price) return "";
	if (price >= 1000) {
		return (price / 1000).toFixed(0) + "k";
	}
	return price;
};

function CanvasFabricLabs({
	onStart,
	onCreate,
	onFabricSelection,
	onFabricSelect,
}) {
	const { CottonChoices, HeavyChoices, SyntheticChoices } = useModels();
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);
	const { refs, playSound } = useAudioManager();

	// Which section (1=Light, 2=Knit, 3=Shiny)
	const [currentSection, setCurrentSection] = useState(1);

	// Track if a section was already purchased
	const [purchasedSections, setPurchasedSections] = useState({
		1: false,
		2: false,
		3: false,
	});

	// Selected fabric object for each section
	const [selectedFabrics, setSelectedFabrics] = useState({
		1: null,
		2: null,
		3: null,
	});

	// Index of the currently highlighted fabric within the current section’s array
	const [selectedFabricIndex, setSelectedFabricIndex] = useState(-1);

	const containerRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);

	// For “Start” button hold
	const [isExpanded, setIsExpanded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	// For “Create” button hold (final step)
	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);
	const createHoldStartRef = useRef(null);
	const createIntervalRef = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.out" }
		);
	}, []);

	// Returns an array of fabrics for the current section
	const getFabricsForSection = () => {
		if (currentSection === 1) return CottonChoices;
		if (currentSection === 2) return HeavyChoices;
		if (currentSection === 3) return SyntheticChoices;
		return [];
	};

	const fabricsData = getFabricsForSection();

	// The actual highlighted fabric object for the current section
	const currentFabric =
		fabricsData && fabricsData.length > 0
			? fabricsData[selectedFabricIndex]
			: null;

	// For display: total cost of all chosen fabrics
	const totalCost = Object.values(selectedFabrics).reduce(
		(acc, fabric) => (fabric ? acc + fabric.cost : acc),
		0
	);

	const isOnLastSection = currentSection === 3;
	const isFabricChosenThisSection = !!selectedFabrics[currentSection];

	/********************************
	 * Step 1: "Start" button logic
	 ********************************/
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
		playSound(refs.uiStartSoundRef);
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

	/********************************
	 * Step 2: "Create" final hold
	 ********************************/
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
		const selectedFabricsArray = Object.values(selectedFabrics);

		// If section 3 not yet purchased, subtract cost now
		const finalFabric = selectedFabrics[3];
		if (finalFabric && !purchasedSections[3]) {
			setFundingAmount((prev) => (prev !== null ? prev - finalFabric.cost : 0));
			setPurchasedSections((old) => ({ ...old, 3: true }));
		}

		// Return final selection
		onFabricSelection?.(selectedFabricsArray);

		// Fade out container
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	}

	/********************************
	 * Step 3: Purchase logic
	 ********************************/
	function handlePurchaseClick() {
		if (!isFabricChosenThisSection) return;

		playSound(refs.uiStartSoundRef);

		// If not yet purchased, subtract cost for this section
		if (!purchasedSections[currentSection]) {
			const chosenFabric = selectedFabrics[currentSection];
			if (chosenFabric) {
				setFundingAmount((prev) =>
					prev !== null ? prev - chosenFabric.cost : 0
				);
			}
			setPurchasedSections((old) => ({ ...old, [currentSection]: true }));
		}

		// Move to next section if applicable
		if (currentSection < 3) {
			setCurrentSection((prevSec) => prevSec + 1);
			setSelectedFabricIndex(-1); // reset highlight for new section
		}
	}

	// When navigating back, highlight the previously selected fabric (if any)
	useEffect(() => {
		if (selectedFabrics[currentSection]) {
			const fabricId = selectedFabrics[currentSection].id;
			const idx = getFabricsForSection().findIndex((f) => f.id === fabricId);
			setSelectedFabricIndex(idx >= 0 ? idx : -1);
		} else {
			setSelectedFabricIndex(-1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSection]);

	/********************************
	 * Step 4: Fabric selection logic
	 ********************************/
	function handleClickOnFabric(fabric, idx) {
		const alreadySelected = selectedFabrics[currentSection];
		const isSameFabric = alreadySelected && alreadySelected.id === fabric.id;

		playSound(refs.addToCollectionRef);

		if (purchasedSections[currentSection]) {
			if (isSameFabric) {
				// Remove the fabric and refund its cost
				setFundingAmount((prev) => prev + fabric.cost);
				setSelectedFabrics((prev) => ({
					...prev,
					[currentSection]: null,
				}));
				setSelectedFabricIndex(-1);
			} else {
				if (alreadySelected) {
					// Refund old cost
					setFundingAmount((prev) => prev + alreadySelected.cost);
				}
				// Charge for new fabric
				setFundingAmount((prev) => (prev !== null ? prev - fabric.cost : 0));
				setSelectedFabrics((prev) => ({
					...prev,
					[currentSection]: fabric,
				}));
				setSelectedFabricIndex(idx);
			}
		} else {
			// Not yet purchased: simply update the selection
			if (isSameFabric) {
				setSelectedFabrics((prev) => ({
					...prev,
					[currentSection]: null,
				}));
				setSelectedFabricIndex(-1);
			} else {
				setSelectedFabrics((prev) => ({
					...prev,
					[currentSection]: fabric,
				}));
				setSelectedFabricIndex(idx);
			}
		}

		onFabricSelect?.(isSameFabric ? null : fabric.fabricKey);
	}

	// Instead of checking across all sections, mark as active only if this fabric is the selection for the current section.
	const isFabricActive = (fabric) =>
		selectedFabrics[currentSection]?.id === fabric.id;

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
	const isButtonActive = !!selectedFabrics[currentSection];

	function getIcon(iconType) {
		switch (iconType) {
			case "positive":
				return greenThumb;
			case "negative":
				return redThumb;
			case "neutral":
			default:
				return neutralThumb;
		}
	}

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
										LIGHTWEIGHT
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 2 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(2)}
									>
										KNIT
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 3 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(3)}
									>
										SHINY
									</div>
								</div>
								<div className="fabric-title-container">
									<div>
										<div className="fabric-title">{getSectionTitle()}</div>
										<div className="fabric-selection-container">
											{fabricsData.map((fabric, idx) => {
												const isActive = isFabricActive(fabric);
												return (
													<div
														key={fabric.id}
														className={`fabric-container ${
															isActive ? "active" : ""
														}`}
														onClick={() => handleClickOnFabric(fabric, idx)}
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
																${formatPrice(fabric.cost)}
															</div>
														</div>
													</div>
												);
											})}
										</div>
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
												className={
													isFabricChosenThisSection
														? "hold-progress-start"
														: "not-start"
												}
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

							{/* Optional: Bottom fabric bar */}
							<CanvasBarFabrics
								items={fabricsData}
								selectedIndex={selectedFabricIndex}
								setSelectedIndex={setSelectedFabricIndex}
								onFabricSelect={(fabric) => handleClickOnFabric(fabric)}
							/>

							<div className="left-component outfit" id="fabric-only-container">
								{currentFabric ? (
									<div className="left-container">
										<div className="header-info">
											<span className="model-title">
												{currentFabric.name.toUpperCase()}
											</span>
											<div className="span-price">
												${formatPrice(currentFabric.cost)}
											</div>
										</div>
										<div
											className="fabric-description"
											style={{ marginTop: "1rem", marginBottom: "1rem" }}
										>
											{currentFabric.cert_title1 && (
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
											)}
											{currentFabric.cert_title2 && (
												<div className="category-item">
													<div className="icon-container">
														<img
															src={currentFabric.cert_icon2}
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
															{currentFabric.cert_title2}
														</p>
														<p className="category-description body-text-small">
															{currentFabric.cert_description2}
														</p>
													</div>
												</div>
											)}
											{currentFabric.cat1_title && (
												<div className="category-item">
													<div className="icon-container icon-padding">
														<img
															src={getIcon(currentFabric.cat1_icon)}
															alt="Common Icon"
															style={{ width: "24px", height: "24px" }}
														/>
													</div>
													<div className="text-container">
														<p className="category-title body-text-medium">
															{currentFabric.cat1_title}
														</p>
														<p className="category-description body-text-small">
															{currentFabric.cat1_descripiton}
														</p>
													</div>
												</div>
											)}
											{currentFabric.cat2_title && (
												<div className="category-item">
													<div className="icon-container icon-padding">
														<img
															src={getIcon(currentFabric.cat2_icon)}
															alt="Environment Icon"
															style={{ width: "24px", height: "24px" }}
														/>
													</div>
													<div className="text-container">
														<p className="category-title body-text-medium">
															{currentFabric.cat2_title}
														</p>
														<p className="category-description body-text-small">
															{currentFabric.cat2_descripiton}
														</p>
													</div>
												</div>
											)}
											{currentFabric.cat3_title && (
												<div className="category-item">
													<div className="icon-container icon-padding">
														<img
															src={getIcon(currentFabric.cat3_icon)}
															alt="Ethics Icon"
															style={{ width: "24px", height: "24px" }}
														/>
													</div>
													<div className="text-container">
														<p className="category-title body-text-medium">
															{currentFabric.cat3_title}
														</p>
														<p className="category-description body-text-small">
															{currentFabric.cat3_descripiton}
														</p>
													</div>
												</div>
											)}
											{currentFabric.cat4_title && (
												<div className="category-item">
													<div className="icon-container icon-padding">
														<img
															src={getIcon(currentFabric.cat4_icon)}
															alt="Cost Icon"
															style={{ width: "24px", height: "24px" }}
														/>
													</div>
													<div className="text-container">
														<p className="category-title body-text-medium">
															{currentFabric.cat4_title}
														</p>
														<p className="category-description body-text-small">
															{currentFabric.cat4_descripiton}
														</p>
													</div>
												</div>
											)}
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

							{/* ======== FABRIC SUMMARY SECTION ======== */}
							{/* <div className="fabric-summary-container">
								<h3 className="fabric-summary-title">Your Fabric Selections</h3>
								<ul className="fabric-summary-list">
									<li>
										Light:{" "}
										{selectedFabrics[1]
											? `${selectedFabrics[1].name} – $${formatPrice(
													selectedFabrics[1].cost
											  )}`
											: "None"}
									</li>
									<li>
										Knit:{" "}
										{selectedFabrics[2]
											? `${selectedFabrics[2].name} – $${formatPrice(
													selectedFabrics[2].cost
											  )}`
											: "None"}
									</li>
									<li>
										Shiny:{" "}
										{selectedFabrics[3]
											? `${selectedFabrics[3].name} – $${formatPrice(
													selectedFabrics[3].cost
											  )}`
											: "None"}
									</li>
								</ul>
							</div> */}
							{/* ======== END FABRIC SUMMARY SECTION ======== */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasFabricLabs;
