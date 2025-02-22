import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import "../assets/styles/CHooseSelectionCanvas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBagShopping } from "@fortawesome/free-solid-svg-icons";
import FontStyleSelection from "../utils/FontSelection";
import LogoOne from "../assets/images/logo-one-preview.svg";
import CanvasBarSelection from "./CanvasBarSelection";

// Helper function to return a dynamic description based on the font selection.
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
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [fontStyle, setFontStyle] = useState("MINIMALIST");
	const [brandName, setBrandName] = useState("");
	const [selectedLogo, setSelectedLogo] = useState(null);
	const [createProgress, setCreateProgress] = useState(0);
	const [isCreateBlinking, setIsCreateBlinking] = useState(false);

	// New state to track when the createSubmitContainer is visible
	const [isSubmitContainerVisible, setIsSubmitContainerVisible] =
		useState(false);

	const createHoldStartRef = useRef(null);
	const createIntervalRef = useRef(null);
	const containerRef = useRef(null);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);
	const fontStyleHeaderRef = useRef(null);
	const fontSelectionContainerRef = useRef(null);
	const logoStyleHeaderRef = useRef(null);
	const logoContainerRef = useRef(null);
	const createSubmitContainerRef = useRef(null);

	const HOLD_DURATION = 500;

	// Fade in the entire CreateBrand component on mount.
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
		console.log("CreateBrand: hold-to-complete -> expanding container!");
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
				if (onStart) {
					onStart();
				}
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

	const logoOptions = [
		{ id: "logo1", src: LogoOne },
		{ id: "logo2", src: LogoOne },
	];

	// Only allow logo selection when the submit container is visible.
	const handleLogoClick = (logoId) => {
		if (!isSubmitContainerVisible) return;
		setSelectedLogo(logoId);
		onLogoSelect?.(logoId);
	};

	const isReady =
		brandName.trim() !== "" && fontStyle !== "" && selectedLogo !== null;

	// Lift the fontStyle changes to the parent.
	useEffect(() => {
		if (onFontStyleChange) {
			onFontStyleChange(fontStyle);
		}
	}, [fontStyle, onFontStyleChange]);

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
									<div className="selection-choice">
										<span className="plus">+</span>
									</div>
									<div className="selection-choice">
										<span className="plus">+</span>
									</div>
									<div className="selection-choice">
										<span className="plus">+</span>
									</div>
								</div>

								<div className="font-style" ref={fontStyleHeaderRef}>
									COLLECTION BREAKDOWN
								</div>
								<div ref={fontSelectionContainerRef} className="breakdown">
									<span className="breakdown-desc">
										Select 3 Outfits to View Smart Breakdown
									</span>
								</div>
							</div>
							<br />
							<br />

							<div
								className={`create-submit-container ${
									isReady ? "ready-container" : ""
								}`}
								ref={createSubmitContainerRef}
							>
								<div className="create-submit">
									<div
										className={`create-description ${
											isReady ? "ready-text" : ""
										}`}
									>
										<span
											className={`brand-title ${isReady ? "brand-ready" : ""}`}
										>
											$ - - - -
										</span>
										<span
											className={`brand-desc ${
												isReady ? "brand-desc-ready" : ""
											}`}
										>
											Total Design Price
										</span>
									</div>
									<div
										className={`create-btn ${isReady ? "ready-btn" : "h"}`}
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
												icon={faBagShopping}
												className="icon-right"
											/>
										</div>
									</div>
								</div>
							</div>
							<CanvasBarSelection />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CanvasChooseOutfits;
