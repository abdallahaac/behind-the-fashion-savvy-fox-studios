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

	// Sections: 1=Lightweight, 2=Knit, 3=Shiny
	const [currentSection, setCurrentSection] = useState(1);

	// Store the selected fabric for each section
	const [selectedFabrics, setSelectedFabrics] = useState({
		1: null,
		2: null,
		3: null,
	});

	// Currently highlighted fabric index (in the array of that section)
	const [selectedFabricIndex, setSelectedFabricIndex] = useState(-1);

	// Refs for GSAP animation
	const containerRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);

	// "Start" button hold logic
	const [isExpanded, setIsExpanded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	// "Purchase" final hold logic
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

	/**
	 * Returns an array of fabrics for the current section
	 */
	const getFabricsForSection = () => {
		switch (currentSection) {
			case 1:
				return CottonChoices;
			case 2:
				return HeavyChoices;
			case 3:
				return SyntheticChoices;
			default:
				return [];
		}
	};

	const fabricsData = getFabricsForSection();

	// The highlighted fabric object for the current section
	const currentFabric =
		fabricsData && fabricsData.length > 0
			? fabricsData[selectedFabricIndex]
			: null;

	// For display: total cost of all 3 chosen fabrics
	const totalCost = Object.values(selectedFabrics).reduce(
		(acc, fabric) => (fabric ? acc + fabric.cost : acc),
		0
	);

	// Count how many sections currently have a fabric
	const numFabricsSelected = [
		selectedFabrics[1],
		selectedFabrics[2],
		selectedFabrics[3],
	].filter(Boolean).length;

	// If all 3 are selected => we allow the final purchase
	const allFabricsSelected = numFabricsSelected === 3;

	// Used for the "X/3 Fabrics selected" label
	const fabricsSelectedText = `${numFabricsSelected}/3 Fabric${
		numFabricsSelected === 1 ? "" : "s"
	} selected`;

	// Color for the "X/3" label: black if all chosen, else a lighter color
	const fabricsSelectedStyle = {
		color: allFabricsSelected ? "#000000" : "#FFC4B1",
	};

	/********************************
	 * Step 1: "Start" button (initial hold)
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
	 * Final "Purchase" hold (only works if all 3 fabrics are selected)
	 ********************************/
	function startCreateHold(e) {
		if (!allFabricsSelected) return;
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
		if (!allFabricsSelected) return;
		e.preventDefault();
		clearInterval(createIntervalRef.current);
		if (createProgress < 100) {
			setCreateProgress(0);
			setIsCreateBlinking(true);
		}
	}

	/**
	 * handleCreateDone subtracts the total cost of all 3 fabrics,
	 * then calls onFabricSelection -> fade out -> onCreate
	 */
	function handleCreateDone() {
		// Deduct total cost from budget
		setFundingAmount((prev) => (prev !== null ? prev - totalCost : 0));

		// Pass the selected array to callback
		const selectedFabricsArray = Object.values(selectedFabrics);
		onFabricSelection?.(selectedFabricsArray);

		// Fade out entire container, then call onCreate
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
	 * When switching sections, highlight previously selected item if any
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
	 * Fabric selection logic
	 ********************************/
	function handleClickOnFabric(fabric, idx) {
		const alreadySelected = selectedFabrics[currentSection];
		const isSameFabric = alreadySelected && alreadySelected.id === fabric.id;

		playSound(refs.addToCollectionRef);

		if (isSameFabric) {
			// Deselect if user clicks the same fabric again
			setSelectedFabrics((prev) => ({
				...prev,
				[currentSection]: null,
			}));
			setSelectedFabricIndex(-1);

			onFabricSelect?.(null); // pass null if deselected
		} else {
			setSelectedFabrics((prev) => ({
				...prev,
				[currentSection]: fabric,
			}));
			setSelectedFabricIndex(idx);

			// Trigger any 3D updates with the chosen fabric key
			onFabricSelect?.(fabric.fabricKey);
		}
	}

	// Helpers
	const isFabricActive = (fabric) =>
		selectedFabrics[currentSection]?.id === fabric.id;

	function getIcon(iconType) {
		switch (iconType) {
			case "positive":
				return greenThumb;
			case "negative":
				return redThumb;
			default:
				return neutralThumb;
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

	/**
	 * We only activate the .create-submit button if all 3 fabrics are chosen
	 */
	const isButtonActive = allFabricsSelected;
	const buttonLabel = "Purchase";

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
							/>
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							/>
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							/>
							<div className="step-containers" />
						</div>
					</div>
					<div className="brand-create">Select Fabrics</div>
				</div>

				<div className="body-create">
					{/* BEFORE SELECTION: The hold-to-start prompt */}
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
						// AFTER "Start": Fabric selection UI
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
									<div className="section-number line" />
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
									<div className="section-number line" />
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
															width="100px"
															height="100px"
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

							{/* The "create-submit" area: only active if all 3 are chosen */}
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
											isButtonActive
												? isCreateBlinking
													? "blink-start"
													: ""
												: "blink-none"
										}`}
										onMouseDown={startCreateHold}
										onMouseUp={endCreateHold}
										onTouchStart={startCreateHold}
										onTouchEnd={endCreateHold}
									>
										{/* Show the hold-progress bar only if active */}
										{isButtonActive && (
											<div
												className="hold-progress-start"
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

							{/* Optional bottom “carousel” of fabrics */}
							<CanvasBarFabrics
								items={fabricsData}
								selectedIndex={selectedFabricIndex}
								setSelectedIndex={setSelectedFabricIndex}
								onFabricSelect={(fabric) => handleClickOnFabric(fabric)}
							/>

							{/* Display info about the currently-selected fabric */}
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
											{/* Certification 1 */}
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
											{/* Certification 2 */}
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
											{/* Common Material Comment */}
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
											{/* Environment Comment */}
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
											{/* Ethics Comment */}
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
											{/* Cost Comment */}
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
							{/* End fabric-only-container */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasFabricLabs;
