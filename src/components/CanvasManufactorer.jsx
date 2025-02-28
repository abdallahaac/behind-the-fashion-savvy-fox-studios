// src/components/CanvasManufactorer.jsx

import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import "../assets/styles/CHooseSelectionCanvas.css";
import "../assets/styles/CanvasManufacturer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import CanvasFactoryBarSelection from "./CanvasFactoryBarSelection";
import { useModels } from "../utils/ModelsContext";
import botSvg from "../assets/images/tutorial-bot.svg"; // example only

import { FundingContext } from "../utils/FundingContext";

const HOLD_DURATION = 0;

function CanvasManufactorer({
	onStart,
	onCreate,
	onManufacturingSelection,
	onFactorySelect, // <-- NEW callback for real-time 3D toggling
}) {
	const { CanvasManufacturer } = useModels(); // from your context
	const { fundingAmount, setFundingAmount } = useContext(FundingContext);

	// Selected factory index
	const [selectedFactoryIndex, setSelectedFactoryIndex] = useState(0);
	const currentFactory =
		CanvasManufacturer && CanvasManufacturer.length > 0
			? CanvasManufacturer[selectedFactoryIndex]
			: null;

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

	// We track the final selection
	const [selectedFactory, setSelectedFactory] = useState(null);

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
		setSelectedFactory(currentFactory);
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

	// Purchase hold logic (optional)
	const [purchaseProgress, setPurchaseProgress] = useState(0);
	const [isPurchaseBlinking, setIsPurchaseBlinking] = useState(false);
	const purchaseHoldStartRef = useRef(null);
	const purchaseIntervalRef = useRef(null);

	const isPurchaseActive = !isAbout && currentFactory;

	const startPurchaseHold = (e) => {
		if (!isPurchaseActive) return;
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

	const handlePurchase = () => {
		if (!currentFactory) return;
		const cost = Number(currentFactory.cost) || 0;

		// Deduct from funding
		setFundingAmount((prev) => (prev !== null ? prev - cost : 0));

		console.log("Purchased factory", currentFactory);
		const selectedFactoryArray = [currentFactory];
		// Pass the final factory selection back up
		onManufacturingSelection(selectedFactoryArray);

		// Fade out
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	};

	// Called whenever user picks a new factory from the bar
	function handleFactorySelectionInUI(factory) {
		if (!factory) return;
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

							{/* Current factory info */}
							{currentFactory && (
								<div className="factory-container">
									<div className="factory-title">{currentFactory.title}</div>

									{/* Toggle switch for About / Factory Audit */}
									<div className="factory-toggle-switch">
										<div className="factory-about-products-container">
											<div
												className="toggle-slider"
												style={{ left: isAbout ? "0%" : "50%" }}
											></div>

											<button
												className="factory-toggle left"
												onClick={() => setIsAbout(true)}
											>
												ABOUT
											</button>
											<button
												className="factory-toggle right"
												onClick={() => setIsAbout(false)}
											>
												FACTORY AUDIT
											</button>
										</div>
									</div>

									{/* Conditionally render the About or Factory Audit sections */}
									{isAbout && (
										<div className="about-container">
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="75"
													height="75"
													src={
														currentFactory.about?.locationImage?.botSvg ||
														botSvg
													}
													alt="factory"
												/>
												<div className="location-container">
													<div className="location-title">
														{currentFactory.about?.locationTitle}
													</div>
													<div className="location-description">
														{currentFactory.about?.locationDescription}
													</div>
												</div>
											</div>

											<div className="factory-location-container">
												{currentFactory.about?.standardImage && (
													<img
														className="factory-img"
														width="75"
														height="75"
														src={
															currentFactory.about?.standardImage?.botSvg ||
															botSvg
														}
														alt=""
													/>
												)}
												<div className="location-container">
													<div className="location-title">
														{currentFactory.about?.standardTitle}
													</div>
													<div className="location-description">
														{currentFactory.about?.standardDescription}
													</div>
												</div>
											</div>

											{currentFactory.about?.etiImage && (
												<div className="factory-location-container">
													<img
														className="factory-img"
														width="75"
														height="75"
														src={currentFactory.about?.etiImage?.botSvg}
														alt=""
													/>
													<div className="location-container">
														<div className="location-title">
															{currentFactory.about?.etiBaseTitle}
														</div>
														<div className="location-description">
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
													width="75"
													height="75"
													src={
														currentFactory.factoryAudit?.fairWageImage
															?.botSvg || botSvg
													}
													alt="fair-wage"
												/>
												<div className="location-container">
													<div className="location-title">
														{currentFactory.factoryAudit?.fairWageTitle}
													</div>
													<div className="location-description">
														{currentFactory.factoryAudit?.fairWageDescription}
													</div>
												</div>
											</div>
											<div className="factory-location-container">
												<img
													className="factory-img"
													width="75"
													height="75"
													src={
														currentFactory.factoryAudit?.energyImage?.botSvg ||
														botSvg
													}
													alt="energy"
												/>
												<div className="location-container">
													<div className="location-title">
														{currentFactory.factoryAudit?.energyEfficiencyTitle}
													</div>
													<div className="location-description">
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
													width="75"
													height="75"
													src={
														currentFactory.factoryAudit?.wasteImage?.botSvg ||
														botSvg
													}
													alt="waste"
												/>
												<div className="location-container">
													<div className="location-title">
														{currentFactory.factoryAudit?.wasteEfficiencyTitle}
													</div>
													<div className="location-description">
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
											{isPurchaseActive
												? "Manufacturing Cost"
												: "Manufacturing Cost"}
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
											Purchase
											<FontAwesomeIcon
												icon={faArrowRight}
												className="icon-right"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasManufactorer;
