import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import "../assets/styles/CHooseSelectionCanvas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CanvasBarSelection from "../components/CanvasBarSelection";
import CollectionOriginalityMetric from "../components/CollectionOrigMetric"; // new metric

import { useModels } from "../utils/ModelsContext";

function getBrandDesc(font) {
	switch (font) {
		case "MINIMALIST":
			return "A Minimalist brand";
		case "FUTURE":
			return "A Futuristic brand";
		case "RETRO":
			return "A Retro brand";
		case "ELEGANT":
			return "An Elegant brand";
		case "BOHEMIAN":
			return "A Bohemian brand";
		case "PLAYFUL":
			return "A Playful brand";
		default:
			return "Your brand awaits";
	}
}

function CanvasChooseOutfits({
	onStart,
	onLogoSelect,
	onCreate,
	onBrandNameChange,
	onFontStyleChange,
	isInputEnabled,
}) {
	const { CanvasOutfitsData } = useModels(); // fetch the 9 outfits from context

	// --- Local States ---
	const [selectedModelIndex, setSelectedModelIndex] = useState(0);
	const selectedOutfit =
		CanvasOutfitsData && CanvasOutfitsData[selectedModelIndex]
			? CanvasOutfitsData[selectedModelIndex]
			: null;

	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [fontStyle, setFontStyle] = useState("MINIMALIST");
	const [brandName, setBrandName] = useState("");
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);
	const [isSubmitContainerVisible, setIsSubmitContainerVisible] =
		useState(false);

	// -- A 3-slot array for "My Collection"
	const [collection, setCollection] = useState([null, null, null]);
	// -- Track which outfits are "added"
	const [addedOutfits, setAddedOutfits] = useState(Array(9).fill(false));

	// Refs for GSAP
	const containerRef = useRef(null);
	const holdStartRef = useRef(null);
	const intervalRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);
	const fontStyleHeaderRef = useRef(null);
	const fontSelectionContainerRef = useRef(null);
	const logoStyleHeaderRef = useRef(null);
	const logoContainerRef = useRef(null);
	const createSubmitContainerRef = useRef(null);
	const createHoldStartRef = useRef(null);
	const createIntervalRef = useRef(null);

	const HOLD_DURATION = 500;

	// ==================== Initial GSAP Fade In ====================
	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.out" }
		);
	}, []);

	// ========== Expand on First Long Press ==========
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

	useEffect(() => {
		if (isExpanded) {
			const tl = gsap.timeline({
				defaults: { opacity: 0, duration: 0.5, ease: "power2.out" },
			});
			tl.from(fontStyleHeaderRef.current, { delay: 0.3 })
				.from(fontSelectionContainerRef.current, { delay: 0.2 })
				.from(logoStyleHeaderRef.current, { delay: 0.2 })
				.from(logoContainerRef.current, { delay: 0.2 })
				.from(createSubmitContainerRef.current, {
					delay: 0.2,
					onComplete: () => setIsSubmitContainerVisible(true),
				});
		}
	}, [isExpanded]);

	// ========== Second hold: Purchase ==========
	const startCreateHold = (e) => {
		if (!isReady) return;
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
		if (!isReady) return;
		e.preventDefault();
		clearInterval(createIntervalRef.current);
		if (createProgress < 100) {
			setCreateProgress(0);
			setIsCreateBlinking(true);
		}
	};

	const handleCreateDone = () => {
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	};

	// ========== Logo Click ==========
	const handleLogoClick = (logoId) => {
		if (!isSubmitContainerVisible) return;
		setSelectedLogo(logoId);
		onLogoSelect?.(logoId);
	};

	// ========== Ready to "Purchase"? ==========
	const isReady =
		brandName.trim() !== "" && fontStyle !== "" && selectedLogo !== null;

	useEffect(() => {
		if (onFontStyleChange) {
			onFontStyleChange(fontStyle);
		}
	}, [fontStyle, onFontStyleChange]);

	// ========== Thumbs Up/Down Helper ==========
	const thumbsUpImage = "/images/green-thumb.svg";
	const thumbsDownImage = "/images/red-thumb.svg";

	const renderBulletLine = (bulletIndex, isUp) => {
		if (!selectedOutfit || !selectedOutfit.bulletPoints) return null;
		if (bulletIndex < 0 || bulletIndex >= selectedOutfit.bulletPoints.length) {
			return null;
		}
		const bulletText = selectedOutfit.bulletPoints[bulletIndex];
		return (
			<div className="info-item">
				<div className="info-flex">
					<div className="info-icon">
						<img
							src={isUp ? thumbsUpImage : thumbsDownImage}
							alt={isUp ? "thumbs up" : "thumbs down"}
							style={{ width: "24px", height: "24px" }}
						/>
					</div>
					<div className="info-content">
						<div className="info-title">{bulletText}</div>
					</div>
				</div>
			</div>
		);
	};

	// ========== Collection Logic ==========
	const isCollectionFull = collection.every((slot) => slot !== null);

	const addToCollection = (outfit, index) => {
		setCollection((prev) => {
			const idx = prev.findIndex((item) => item === null);
			if (idx === -1) return prev; // no space
			const newArr = [...prev];
			newArr[idx] = { ...outfit, outfitIndex: index };
			return newArr;
		});

		setAddedOutfits((prev) => {
			const updated = [...prev];
			updated[index] = true;
			return updated;
		});
	};

	const removeBySlotIndex = (slotIndex) => {
		setCollection((prev) => {
			const newArr = [...prev];
			const removedOutfit = newArr[slotIndex];
			if (removedOutfit) {
				const realIndex = removedOutfit.outfitIndex;
				setAddedOutfits((old) => {
					const updated = [...old];
					updated[realIndex] = false;
					return updated;
				});
			}
			newArr[slotIndex] = null;
			return newArr;
		});
	};

	const toggleOutfit = () => {
		if (!selectedOutfit) return;
		if (addedOutfits[selectedModelIndex]) {
			// Already added -> find and remove
			const slotIndex = collection.findIndex(
				(slot) => slot && slot.outfitIndex === selectedModelIndex
			);
			if (slotIndex !== -1) {
				removeBySlotIndex(slotIndex);
			}
		} else {
			if (isCollectionFull) return;
			addToCollection(selectedOutfit, selectedModelIndex);
		}
	};

	let ctaLabel = "Add to Collection";
	if (addedOutfits[selectedModelIndex]) {
		ctaLabel = "Remove from Collection";
	} else if (isCollectionFull) {
		ctaLabel = "Max Reached";
	}

	// ========== Dynamic Breakdown Text (no text if all 3 are chosen) ==========
	const currentCollectionCount = collection.filter(
		(item) => item !== null
	).length;
	let breakdownText = "";
	if (currentCollectionCount === 0) {
		breakdownText = "Select 3 Outfits to View Smart Breakdown";
	} else if (currentCollectionCount > 0 && currentCollectionCount < 3) {
		breakdownText = `${currentCollectionCount} Outfit${
			currentCollectionCount > 1 ? "s" : ""
		} Selected — Add ${
			3 - currentCollectionCount
		} More to View Smart Breakdown`;
	}
	// Note: if (currentCollectionCount === 3) we omit any text, so breakdownText = ""

	// ========== Compute Combined Originality Once 3 Are Chosen ==========
	let averageOriginal = 0;
	if (currentCollectionCount === 3) {
		const sumOriginal = collection.reduce(
			(acc, item) => acc + item.originalDesignPct,
			0
		);
		averageOriginal = Math.round(sumOriginal / 3);
	}
	const averagePlagiarized = 100 - averageOriginal;

	// Simple example of dynamic summary text based on averageOriginal
	const getSummaryText = (avg) => {
		if (avg >= 80) {
			return "Your collection is highly original! You've chosen truly innovative designs.";
		} else if (avg >= 50) {
			return "Your collection strikes a balance of originality and existing influences.";
		}
		return "Your collection borrows heavily from existing designs. Consider more unique pieces!";
	};

	// Determine if purchase section should use active styles when three outfits have been selected
	const isCollectionActive = currentCollectionCount === 3;

	// ========== RENDER ==========
	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container ${isExpanded ? "expanded-container" : ""}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 2 <span>/ 4</span>
						</div>
						<div className="step-parent-container">
							<div className="step-containers"></div>
							<div className="step-containers"></div>
							<div className="step-containers"></div>
							<div className="step-containers"></div>
						</div>
					</div>
					<div className="brand-create">CHOOSE OUTFIT DESIGNS</div>
				</div>

				<div className="body-create">
					{/* === Screen #1: The big "Start" button (not yet expanded) === */}
					{!isExpanded ? (
						<div ref={buttonContainerRef} className="button-container">
							<div className="button-description">
								Create a Strong Brand Identity to Build Investor Recognition
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
						// === Screen #2: Expanded view with collection ===
						<div
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div className="section-one">
								<div>MY COLLECTION</div>
								<div
									style={{ position: "relative", width: "92%" }}
									className="collection-container"
								>
									{/* Render the 3 outfit slots */}
									{collection.map((item, idx) => {
										if (item) {
											return (
												<div key={idx} className="selection-choice active">
													<span className="plus image">
														<img src={item.img_path} alt="" />
													</span>
													<button
														className="remove-button"
														onClick={() => removeBySlotIndex(idx)}
													>
														Remove
													</button>
												</div>
											);
										} else {
											return (
												<div key={idx} className="selection-choice">
													<span className="plus">+</span>
												</div>
											);
										}
									})}
								</div>

								<div className="font-style" ref={fontStyleHeaderRef}>
									COLLECTION BREAKDOWN
								</div>

								{/* The .breakdown container */}
								<div ref={fontSelectionContainerRef} className="breakdown">
									{/* Only show the text if collectionCount < 3 */}
									{currentCollectionCount < 3 && (
										<span className="breakdown-desc">{breakdownText}</span>
									)}

									{/* Show the metric only if 3 outfits are selected */}
									{currentCollectionCount === 3 && (
										<CollectionOriginalityMetric
											label="Collection Originality Metric"
											originalPercentage={averageOriginal}
											plagiarizedPercentage={averagePlagiarized}
											summaryText={getSummaryText(averageOriginal)}
											showBars={true}
										/>
									)}
								</div>
							</div>

							<br />
							<br />

							{/* =========== Purchase Section =========== */}
							<div
								className={`create-submit-container ${
									isReady ? "ready-container" : ""
								}`}
								ref={createSubmitContainerRef}
							>
								<div
									className={`create-submit ${
										isCollectionActive ? "active" : ""
									}`}
								>
									<div
										className={`create-description ${
											isCollectionActive ? "active" : ""
										}`}
									>
										<span
											className={`brand-title ${
												isCollectionActive ? "active" : ""
											}`}
										>
											$ - - - -
										</span>
										<span
											className={`brand-desc ${
												isCollectionActive ? "active" : ""
											}`}
										>
											Total Design Price
										</span>
									</div>
									<div
										className={`create-btn ${isReady ? "ready-btn" : "h"} ${
											isCollectionActive ? "active" : ""
										}`}
										onMouseDown={startCreateHold}
										onMouseUp={endCreateHold}
										onTouchStart={startCreateHold}
										onTouchEnd={endCreateHold}
									>
										<div
											className="hold-progress-create"
											style={{ width: `${createProgress}%` }}
										/>
										<div style={{ position: "relative", zIndex: 2 }}>
											Purchase
											<FontAwesomeIcon
												icon={faArrowRight}
												className="icon-right"
											/>
										</div>
									</div>
								</div>
							</div>

							<CanvasBarSelection
								selectedModelIndex={selectedModelIndex}
								setSelectedModelIndex={setSelectedModelIndex}
							/>

							<div className="left-component">
								{selectedOutfit && (
									<div className="left-container">
										<div className="header-info">
											<span className="model-title">
												{selectedOutfit.name.toUpperCase()}
											</span>
											<div className="span-price">${selectedOutfit.price}</div>
										</div>

										<div className="info-item">
											<div className="info-flex">
												<div className="info-icon">
													<img
														src={
															selectedOutfit.originalDesignPct >= 50
																? thumbsUpImage
																: thumbsDownImage
														}
														alt={
															selectedOutfit.originalDesignPct >= 50
																? "thumbs up"
																: "thumbs down"
														}
														style={{ width: "24px", height: "24px" }}
													/>
												</div>
												<div className="info-content">
													<div className="info-title">
														{selectedOutfit.originalDesignPct}% Original Design
													</div>
													<div className="progress-bar">
														<div
															className="progress-fill"
															style={{
																width: `${selectedOutfit.originalDesignPct}%`,
															}}
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Render any "thumbs up/down" bullet lines */}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[1] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[1].index,
														selectedOutfit.iconBullets[1].icon === "up"
													)}
												</>
											)}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[2] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[2].index,
														selectedOutfit.iconBullets[2].icon === "up"
													)}
												</>
											)}

										<div className="cta-container">
											<button
												className={`cta-button ${
													ctaLabel === "Remove from Collection"
														? "remove"
														: ctaLabel === "Max Reached"
														? "disabled-button"
														: ""
												}`}
												onClick={toggleOutfit}
												disabled={ctaLabel === "Max Reached"}
											>
												{ctaLabel}
												{ctaLabel === "Add to Collection" && (
													<span className="cta-button-price">+</span>
												)}
											</button>
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

export default CanvasChooseOutfits;
