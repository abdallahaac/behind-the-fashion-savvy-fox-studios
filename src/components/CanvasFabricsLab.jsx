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

	// For “Start” button hold (initial animation)
	const [isExpanded, setIsExpanded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	// For final purchase hold on section 3
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

	// The highlighted fabric object for the current section
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

	// Boolean true if all three fabrics have been selected.
	const allFabricsSelected = !!(
		selectedFabrics[1] &&
		selectedFabrics[2] &&
		selectedFabrics[3]
	);

	// Compute overall number of fabrics selected and the corresponding text.
	const numFabricsSelected = [
		selectedFabrics[1],
		selectedFabrics[2],
		selectedFabrics[3],
	].filter(Boolean).length;
	const fabricsSelectedText = `${numFabricsSelected}/3 Fabric${
		numFabricsSelected === 1 ? "" : "s"
	} selected`;
	// The text is red (#FF0000) until 3 are selected, then black (#000000).
	const fabricsSelectedStyle = {
		color: numFabricsSelected === 3 ? "#000000" : "#FFC4B1",
	};

	/********************************
	 * Step 1: "Start" button logic (initial animation)
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
	 * Step 2: "Create" final hold for purchase (only active in section 3)
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
				// Only execute purchase if all three fabrics are selected
				if (allFabricsSelected) {
					handlePurchaseClick();
				}
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

	/********************************
	 * Step 3: Final purchase logic (only active when on section 3)
	 ********************************/
	function handlePurchaseClick() {
		// Only allow purchase when on the final section and all fabrics have been selected
		if (!isOnLastSection || !allFabricsSelected) return;

		playSound(refs.uiStartSoundRef);

		// Deduct the entire accumulated total from the funding amount
		setFundingAmount((prev) => (prev !== null ? prev - totalCost : 0));

		// Prepare final selection array
		const selectedFabricsArray = Object.values(selectedFabrics);

		// Trigger final selection callback
		onFabricSelection?.(selectedFabricsArray);

		// Animate container out
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
	 * Navigation: When switching sections, re-highlight previous selection (if any)
	 ********************************/
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

		// Simply update selection (no cost deduction happens until final purchase)
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

		onFabricSelect?.(isSameFabric ? null : fabric.fabricKey);
	}

	// Only mark a fabric as active if it matches the current section's selection.
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

	// For the submit button, we only add the "active" classname when on section 3 and all three fabrics are selected.
	const isButtonActive = currentSection === 3 && allFabricsSelected;
	const buttonLabel = "Purchase";

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
										style={
											selectedFabrics[1]
												? {
														backgroundColor: "#1D7B18",
														...(currentSection === 1
															? { border: "1px solid #85E780" }
															: {}),
												  }
												: {}
										}
									>
										LIGHTWEIGHT
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 2 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(2)}
										style={
											selectedFabrics[2]
												? {
														backgroundColor: "#1D7B18",
														...(currentSection === 2
															? { border: "1px solid #85E780" }
															: {}),
												  }
												: {}
										}
									>
										KNIT
									</div>
									<div className="section-number line"></div>
									<div
										className={`section-number ${
											currentSection === 3 ? "active" : ""
										}`}
										onClick={() => setCurrentSection(3)}
										style={
											selectedFabrics[3]
												? {
														backgroundColor: "#1D7B18",
														...(currentSection === 3
															? { border: "1px solid #85E780" }
															: {}),
												  }
												: {}
										}
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
										<span className="brand-desc" style={fabricsSelectedStyle}>
											{fabricsSelectedText}
										</span>
									</div>
									<div
										className={`button-start ${
											isOnLastSection && allFabricsSelected
												? isCreateBlinking
													? "blink-start"
													: ""
												: "blink-none"
										}`}
										onClick={
											isOnLastSection && allFabricsSelected
												? handlePurchaseClick
												: undefined
										}
										onMouseDown={
											isOnLastSection && allFabricsSelected
												? startCreateHold
												: undefined
										}
										onMouseUp={
											isOnLastSection && allFabricsSelected
												? endCreateHold
												: undefined
										}
										onTouchStart={
											isOnLastSection && allFabricsSelected
												? startCreateHold
												: undefined
										}
										onTouchEnd={
											isOnLastSection && allFabricsSelected
												? endCreateHold
												: undefined
										}
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

							{/* ======== FABRIC SUMMARY SECTION (Optional) ======== */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasFabricLabs;
