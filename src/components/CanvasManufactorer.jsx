import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import "../assets/styles/ChooseSelectionCanvas.css";
import "../assets/styles/CanvasManufacturer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shopping_bag from "../assets/images/shopping_bag.svg";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CanvasFactoryBarSelection from "./CanvasFactoryBarSelection";
import { useModels } from "../utils/ModelsContext";
import botSvg from "../assets/images/tutorial-bot.svg"; // example only

import { FundingContext } from "../utils/FundingContext";

import { useAudioManager } from "../utils/AudioManager";

const HOLD_DURATION = 0;

function CanvasManufactorer({
	onStart,
	onCreate,
	onManufacturingSelection,
	onFactorySelect,
}) {
	// Pull factory data from context
	const { CanvasManufacturer } = useModels();
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	// Default to the first factory in CanvasManufacturer (if it exists).
	const [selectedFactoryIndex, setSelectedFactoryIndex] = useState(0);
	const initialFactory =
		CanvasManufacturer && CanvasManufacturer.length > 0
			? CanvasManufacturer[0]
			: 0;
	const [selectedFactory, setSelectedFactory] = useState(initialFactory);

	// About vs. Factory Audit toggle
	const [isAbout, setIsAbout] = useState(true);

	// "Start" button expansion logic
	const [isExpanded, setIsExpanded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	const containerRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);
	const { refs, playSound } = useAudioManager();

	// Purchase hold logic
	const [purchaseProgress, setPurchaseProgress] = useState(0);
	const [isPurchaseBlinking, setIsPurchaseBlinking] = useState(false);
	const purchaseHoldStartRef = useRef(null);
	const purchaseIntervalRef = useRef(null);

	// Fade in container
	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.out" }
		);
	}, []);

	// ----------------- "START" BUTTON HOLD LOGIC -----------------
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

	// Called once user completes the "Start" hold
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
		setSelectedFactory(initialFactory);
	};

	// Fade in the main panel once expanded
	useEffect(() => {
		if (isExpanded && loremContainerRef.current) {
			gsap.to(loremContainerRef.current, {
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			});
		}
	}, [isExpanded]);

	// ----------------- FACTORY SELECTION LOGIC -------------------
	function handleFactorySelectionInUI(factory) {
		if (!factory) return;
		const idx = CanvasManufacturer
			? CanvasManufacturer.findIndex((f) => f.id === factory.id)
			: -1;

		setSelectedFactoryIndex(idx);
		setSelectedFactory(factory);


		// Real-time 3D toggling
		if (onFactorySelect && factory.factoryKey) {
			onFactorySelect(factory.factoryKey);
		}
	}

	// ----------------- PURCHASE BUTTON HOLD LOGIC ----------------
	const isPurchaseActive = !!selectedFactory;

	const startPurchaseHold = (e) => {
		if (!isPurchaseActive) return;
		playSound(refs.uiStartSoundRef);
		e.preventDefault();
		setIsPurchaseBlinking(false);
		setPurchaseProgress(0);
		purchaseHoldStartRef.current = Date.now();

		purchaseIntervalRef.current = setInterval(() => {
			const elapsed = Date.now() - purchaseHoldStartRef.current;
			const newProgress = (elapsed / HOLD_DURATION) * 100;
			if (newProgress >= 100) {
				setPurchaseProgress(100);
				handlePurchase();
				clearInterval(purchaseIntervalRef.current);
			} else {
				setPurchaseProgress(newProgress);
			}
		}, 30);
	};

	const endPurchaseHold = (e) => {
		if (!isPurchaseActive) return;
		e.preventDefault();
		clearInterval(purchaseIntervalRef.current);
		if (purchaseProgress < 100) {
			setPurchaseProgress(0);
			setIsPurchaseBlinking(true);
		}
	};

	// Called once user completes the purchase hold
	const handlePurchase = () => {
		if (!selectedFactory) return;
		const cost = Number(selectedFactory.cost) || 0;

		// Deduct from funding
		setFundingAmount((prev) => (prev !== null ? prev - cost : 0));

		const selectedFactoryArray = [selectedFactory];

		onManufacturingSelection(selectedFactoryArray);

		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	};

	// Safely derive the actual factory from the array
	const currentFactory =
		selectedFactoryIndex >= 0 &&
		CanvasManufacturer &&
		selectedFactoryIndex < CanvasManufacturer.length
			? CanvasManufacturer[selectedFactoryIndex]
			: null;
	// Called whenever user picks a new factory from the bar
	function handleFactorySelectionInUI(factory) {
		if (!factory) return;
		playSound(refs.addToCollectionRef);
		setSelectedFactoryIndex(() =>
			CanvasManufacturer.findIndex((f) => f.id === factory.id)
		);
		// For real-time 3D toggling:
		if (onFactorySelect && factory.factoryKey) {
			onFactorySelect(factory.factoryKey);
		}
	}

	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container ${
					isExpanded ? "expanded-container factory" : ""
				}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 4 <span>/ 4</span>
						</div>
						<div className="step-parent-container">
							<div
								className="step-containers"
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
							<div
								className="step-containers"
								style={{ backgroundColor: "white" }}
							/>
						</div>
					</div>
					<div className="brand-create">Factory Selection</div>
				</div>

				<div className="body-create">
					{/* BEFORE EXPANSION: the "Start" button */}
					{!isExpanded ? (
						<div ref={buttonContainerRef} className="button-container">
							<div className="button-description">
								Choose a manufacturer from anywhere in the world and explore the
								various standards they follow.
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
						// AFTER EXPANSION: the full manufacturer panel
						<div
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							{/* Manufacturer selection bar */}
							<CanvasFactoryBarSelection
								items={CanvasManufacturer}
								selectedIndex={selectedFactoryIndex}
								setSelectedIndex={setSelectedFactoryIndex}
								onFactorySelect={handleFactorySelectionInUI}
							/>

							{/* No factory found? Show placeholder */}
							{!currentFactory ? (
								<div
									className="factory-placeholder"
									style={{
										height: "100%",
										width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										textAlign: "center",
									}}
								>
									Please select a Factory
								</div>
							) : (
								<div className="factory-container">
									<div className="factory-title">{currentFactory.title}</div>

									{/* ABOUT/FACTORY AUDIT TOGGLE */}
									<div className="factory-toggle-switch">
										<div className="factory-about-products-container">
											<div
												className="toggle-slider"
												style={{ left: isAbout ? "0%" : "50%" }}
											></div>
											<button
												className="factory-toggle left accent-6"
												onClick={() => setIsAbout(true)}
											>
												ABOUT
											</button>
											<button
												className="factory-toggle right accent-6"
												onClick={() => setIsAbout(false)}
											>
												FACTORY AUDIT
											</button>
										</div>
									</div>

									{/* Render "ABOUT" or "FACTORY AUDIT" info */}
									{isAbout && (
										<div className="about-container">
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="75"
													height="75"
													src={currentFactory.about?.locationImage}
													alt="factory"
												/>
												<div className="location-container">
													<div className="location-title body-text-medium">
														{currentFactory.about?.locationTitle}
													</div>
													<div className="location-description body-text-small">
														{currentFactory.about?.locationDescription}
													</div>
												</div>
											</div>

											<div className="factory-location-container">
												{currentFactory.about?.standardImage && (
													<img
														className="factory-img"
														width="40"
														height="40"
														src={currentFactory.about?.standardImage}
														alt=""
													/>
												)}
												<div className="location-container">
													<div className="location-title body-text-medium">
														{currentFactory.about?.standardTitle}
													</div>
													<div className="location-description body-text-small">
														{currentFactory.about?.standardDescription}
													</div>
												</div>
											</div>

											{currentFactory.about?.etiImage && (
												<div className="factory-location-container">
													<img
														className="factory-img"
														width="40"
														height="40"
														src={currentFactory.about?.etiImage}
														alt=""
													/>
													<div className="location-container">
														<div className="location-title body-text-medium">
															{currentFactory.about?.etiBaseTitle}
														</div>
														<div className="location-description body-text-small">
															{currentFactory.about?.etiBaseDescription}
														</div>
													</div>
												</div>
											)}
										</div>
									)}

									{!isAbout && (
										<div className="factory-audit-container">
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="24"
													height="24"
													src={currentFactory.factoryAudit?.fairWageImage}
													alt="fair-wage"
												/>
												<div className="location-container">
													<div className="location-title body-text-medium">
														{currentFactory.factoryAudit?.fairWageTitle}
													</div>
													<div className="location-description body-text-small">
														{currentFactory.factoryAudit?.fairWageDescription}
													</div>
												</div>
											</div>
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="24"
													height="24"
													src={currentFactory.factoryAudit?.energyImage}
													alt="energy"
												/>
												<div className="location-container">
													<div className="location-title body-text-medium">
														{currentFactory.factoryAudit?.energyEfficiencyTitle}
													</div>
													<div className="location-description body-text-small">
														{
															currentFactory.factoryAudit
																?.energyEfficiencyDescription
														}
													</div>
												</div>
											</div>
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="24"
													height="24"
													src={currentFactory.factoryAudit?.wasteImage}
													alt="waste"
												/>
												<div className="location-container">
													<div className="location-title body-text-medium">
														{currentFactory.factoryAudit?.wasteEfficiencyTitle}
													</div>
													<div className="location-description body-text-small">
														{
															currentFactory.factoryAudit
																?.wasteEfficiencyDescription
														}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}

							{/* Bottom purchase area */}
							<div className="create-submit-container factory">
								<div
									className={`create-submit ${
										isPurchaseActive ? "active" : ""
									}`}
								>
									<div
										className={`create-description ${
											isPurchaseActive ? "active" : ""
										}`}
									>
										<span
											className={`brand-title ${
												isPurchaseActive ? "active" : ""
											}`}
										>
											${currentFactory ? currentFactory.cost : "00000"}
										</span>
										<span
											className={`brand-desc ${
												isPurchaseActive ? "active" : ""
											}`}
										>
											Manufacturing Cost
										</span>
									</div>
									<div
										className={`button-start ${
											isPurchaseActive
												? isPurchaseBlinking
													? "blink-start"
													: ""
												: "blink-none"
										}`}
										onMouseDown={startPurchaseHold}
										onMouseUp={endPurchaseHold}
										onTouchStart={startPurchaseHold}
										onTouchEnd={endPurchaseHold}
									>
										{isPurchaseActive && (
											<div
												className="hold-progress-start"
												style={{ width: `${purchaseProgress}%` }}
											/>
										)}
										<div
											style={{ position: "relative" }}
											className="purchase-btn"
										>
											Select
											<div className="button-icon">
												<img src={shopping_bag} alt="Shopping Bag Icon" />
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* End new-container */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasManufactorer;
