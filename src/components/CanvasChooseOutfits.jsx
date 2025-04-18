import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import "../assets/styles/ChooseSelectionCanvas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CanvasBarSelection from "../components/CanvasBarSelection";
import CollectionOriginalityMetric from "../components/CollectionOrigMetric"; // new metric

import { useModels } from "../utils/ModelsContext";
import { FundingContext } from "../utils/FundingContext";
import { useAudioManager } from "../utils/AudioManager";

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
	onOutfitSelect, // <-- NEW: callback from Room
	onCreate,
	onBrandNameChange,
	onFontStyleChange,
	isInputEnabled,
	onClothingSelection,
}) {
	const { CanvasOutfitsData } = useModels();
	const { refs, playSound } = useAudioManager();
	// ================== ADD: Funding Context ==================
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	// --- Local States ---
	const [selectedModelIndex, setSelectedModelIndex] = useState(0);
	const selectedOutfit =
		CanvasOutfitsData && CanvasOutfitsData[selectedModelIndex]
			? CanvasOutfitsData[selectedModelIndex]
			: null;

	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);

	const [fontStyle, setFontStyleLocal] = useState("MINIMALIST");
	const [brandName, setBrandNameLocal] = useState("");
	const [selectedLogo, setSelectedLogo] = useState(null);

	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);
	const [isSubmitContainerVisible, setIsSubmitContainerVisible] =
		useState(false);

	// A 3-slot array for "My Collection"
	const [collection, setCollection] = useState([null, null, null]);
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

	const HOLD_DURATION = 0; // Adjust if you want a real "hold to proceed"

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
		playSound(refs.uiStartSoundRef);
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
		// For simplicity, require user to have 3 outfits in the collection
		if (!isCollectionActive) return;
		playSound(refs.uiStartSoundRef);
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
		if (!isCollectionActive) return;
		e.preventDefault();
		clearInterval(createIntervalRef.current);
		if (createProgress < 100) {
			setCreateProgress(0);
			setIsCreateBlinking(true);
		}
	};

	const handleCreateDone = () => {
		onClothingSelection(collection);
		setFundingAmount((prev) => (prev || 0) - totalDesignPrice);

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

	// ========== Logo click (if relevant) ==========
	const handleLogoClick = (logoId) => {
		if (!isSubmitContainerVisible) return;
		setSelectedLogo(logoId);
	};

	// ========== Collection Logic ==========
	const isCollectionFull = collection.every((slot) => slot !== null);

	// ADD an outfit
	const addToCollection = (outfit, index) => {
		if (refs.addToCollectionRef.current) {
			refs.addToCollectionRef.current.volume = 0.9;
		}
		playSound(refs.addToCollectionRef);
		setCollection((prev) => {
			const idx = prev.findIndex((item) => item === null);
			if (idx === -1) return prev; // no space left
			const newArr = [...prev];
			newArr[idx] = { ...outfit, outfitIndex: index };
			return newArr;
		});

		setAddedOutfits((prev) => {
			const updated = [...prev];
			updated[index] = true;
			return updated;
		});

		// Decrease player's funding by the outfit's price
		//removing this because we only want to remove the outfit cost from total when the whole purchase is made
		// setTotalFundingAmount((prev) => (prev || 0) - outfit.cost);
	};

	// REMOVE an outfit
	const removeBySlotIndex = (slotIndex) => {
		if (refs.removeFromCollectionRef.current) {
			refs.removeFromCollectionRef.current.volume = 0.5; // Set volume to 50%
		}
		playSound(refs.removeFromCollectionRef);
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
				// Give the cost back - removing this because we only want to remove the outfit cost from total when the whole purchase is made
				// setFundingAmount((prev) => (prev || 0) + removedOutfit.cost);
			}
			newArr[slotIndex] = null;
			return newArr;
		});
	};

	// Toggle outfit in/out of collection
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

	// The “smart breakdown” text
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

	// Original/Plagiarized metric
	let averageOriginal = 0;
	if (currentCollectionCount === 3) {
		const sumOriginal = collection.reduce(
			(acc, item) => acc + item.originalDesignPct,
			0
		);
		averageOriginal = Math.round(sumOriginal / 3);
	}
	const averagePlagiarized = 100 - averageOriginal;

	const getSummaryText = (avg) => {
		if (avg >= 80) {
			return "Your collection is highly original! You've chosen truly innovative designs.";
		} else if (avg >= 50) {
			return "Your collection strikes a balance of originality and existing influences.";
		}
		return "Your collection borrows heavily from existing designs. Consider more unique pieces!";
	};

	// For the purchase button, require 3 outfits
	const isCollectionActive = currentCollectionCount === 3;

	// Total design price
	const totalDesignPrice = collection.reduce(
		(acc, item) => acc + (item ? item.cost : 0),
		0
	);

	const thumbsUpImage = "/images/green-thumb.svg";
	const thumbsDownImage = "/images/red-thumb.svg";

	const renderBulletLine = (bulletIndex, iconBullets) => {
		if (!selectedOutfit || !selectedOutfit.bulletPoints) return null;
		if (bulletIndex < 0 || bulletIndex >= selectedOutfit.bulletPoints.length) {
			return null;
		}
		const bulletText = selectedOutfit.bulletPoints[bulletIndex];
		const iconBullet = iconBullets.find(
			(bullet) => bullet.index === bulletIndex
		);
		const showIcon = iconBullet && iconBullet.icon !== "none";
		const isUp = iconBullet && iconBullet.icon === "up";

		return (
			<div className="info-item">
				<div className="info-flex">
					<div className="info-icon">
						<img
							src={isUp ? thumbsUpImage : thumbsDownImage}
							alt={isUp ? "thumbs up" : "thumbs down"}
							style={{
								width: "24px",
								height: "24px",
								visibility: showIcon ? "visible" : "hidden",
							}}
						/>
					</div>
					<div className="info-content">
						<div className={`info-title ${showIcon ? "" : "body-text-small"}`}>
							{bulletText}
						</div>
					</div>
				</div>
			</div>
		);
	};

	// The CTA label
	let ctaLabel = "Add to Collection";
	if (addedOutfits[selectedModelIndex]) {
		ctaLabel = "Remove from Collection";
	} else if (isCollectionFull) {
		ctaLabel = "Max Reached";
	}

	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container higher ${
					isExpanded ? "expanded-container outfit" : ""
				}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 2 <span>/ 4</span>
						</div>
						<div className="step-parent-container">
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							></div>
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							></div>
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
								Select 3 outfits to add to your brand’s collection. 
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
							className="new-container outfit"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div className="section-one">
								<div>MY COLLECTION</div>
								<div
									style={{ position: "relative", width: "100%" }}
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
									{currentCollectionCount < 3 && (
										<span className="breakdown-desc">{breakdownText}</span>
									)}

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
								className="create-submit-container"
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
											{`$${totalDesignPrice.toLocaleString()}`}
										</span>
										<span
											className={`brand-desc ${
												isCollectionActive ? "active" : ""
											}`}
										>
											{isCollectionActive ? "Total Design Price" : ""}
										</span>
									</div>
									<div
										className={`button-start ${
											isCollectionActive ? "blink-start" : "blink-none"
										}`}
										onMouseDown={startCreateHold}
										onMouseUp={endCreateHold}
										onTouchStart={startCreateHold}
										onTouchEnd={endCreateHold}
									>
										<div
											className={`${
												isCollectionActive ? "hold-progress-start" : "not-start"
											}`}
											style={{ width: `${createProgress}%` }}
										/>
										<div
											style={{ position: "relative" }}
											className="purchase-btn"
										>
											Purchase
											<FontAwesomeIcon
												icon={faArrowRight}
												className="icon-right"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* The bar of 9 outfits (buttons) */}
							<CanvasBarSelection
								selectedModelIndex={selectedModelIndex}
								setSelectedModelIndex={setSelectedModelIndex}
								onOutfitSelect={onOutfitSelect} // <-- pass callback down
							/>

							<div className="left-component outfit">
								{selectedOutfit && (
									<div className="left-container">
										<div className="header-info">
											<span className="model-title">
												{selectedOutfit.name.toUpperCase()}
											</span>
											<div className="span-price">${selectedOutfit.cost}</div>
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

										{/* Render thumbs up/down bullet lines, if any */}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[1] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[1].index,
														selectedOutfit.iconBullets
													)}
												</>
											)}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[2] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[2].index,
														selectedOutfit.iconBullets
													)}
												</>
											)}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[3] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[3].index,
														selectedOutfit.iconBullets
													)}
												</>
											)}
										{selectedOutfit.iconBullets &&
											selectedOutfit.iconBullets[4] && (
												<>
													{renderBulletLine(
														selectedOutfit.iconBullets[4].index,
														selectedOutfit.iconBullets
													)}
												</>
											)}

										<div className="cta-container">
											<button
												className={`cta-button body-text-medium ${
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
