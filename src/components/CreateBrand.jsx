import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FontStyleSelection from "../utils/FontSelection";
import LogoOne from "../../public/images/Logo2.png";
import LogoTwo from "../../public/images/Logo3.png";
import LogoThree from "../../public/images/Logo1.png";
import LogoFour from "../../public/images/Logo4.png";
import LogoFive from "../../public/images/Logo5.png";
import { useAudioManager } from "../utils/AudioManager";

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

function CreateBrand({
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
	const [isSubmitContainerVisible, setIsSubmitContainerVisible] =
		useState(false);
	const { refs, playSound } = useAudioManager();
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

	// Adjust as needed
	const HOLD_DURATION = 0; // Example: 0.8s hold to complete

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
				if (onStart) onStart();
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

	// Example logos you’re displaying as clickable.
	const logoOptions = [
		{ id: "Butterfly", src: LogoOne },
		{ id: "Heart", src: LogoTwo },
		{ id: "MainLogo", src: LogoThree },
		{ id: "Pin", src: LogoFour },
		{ id: "Shard", src: LogoFive },
	];

	const handleLogoClick = (logoId) => {
		playSound(refs.uiTransitionRef);
		if (!isSubmitContainerVisible) return;
		setSelectedLogo(logoId);
		onLogoSelect?.(logoId);
	};

	const isReady =
		brandName.trim() !== "" && fontStyle !== "" && selectedLogo !== null;

	useEffect(() => {
		if (onFontStyleChange) {
			onFontStyleChange(fontStyle);
		}
	}, [fontStyle, onFontStyleChange]);

	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container ${
					isExpanded ? "expanded-container create" : ""
				}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 1 <span>/ 4</span>
						</div>
						<div className="step-parent-container">
							<div className="step-containers"></div>
							<div className="step-containers"></div>
							<div className="step-containers"></div>
							<div className="step-containers"></div>
						</div>
					</div>
					<div className="brand-create">CREATE YOUR BRAND</div>
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
							className="new-container brand"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div className="section-one">
								<div>BRAND NAME</div>
								<div style={{ position: "relative", width: "100%" }}>
									<input
										type="text"
										placeholder="Brand Name..."
										maxLength="12"
										value={brandName}
										onChange={(e) => {
											setBrandName(e.target.value);
											onBrandNameChange && onBrandNameChange(e.target.value);
										}}
										style={{
											color: "white",
											width: "100%",
											padding: "16px",
											border: "1.1px solid rgba(240, 240, 240, 0.51)",
											borderRadius: "16px",
											boxSizing: "border-box",
											outline: "none",
											fontSize: "14px",
											background: "#222222",
											letterSpacing: "1px",
											margin: "20px 0px",
											textTransform: "uppercase",
										}}
									/>
									<div
										style={{
											position: "absolute",
											right: "10px",
											top: "50%",
											transform: "translateY(-50%)",
											color: "#CCC",
											fontSize: "12px",
											fontFamily: "'DM Sans', sans-serif",
										}}
									>
										{brandName.length} / 12
									</div>
								</div>

								<div className="font-style" ref={fontStyleHeaderRef}>
									Font Style
								</div>
								<div ref={fontSelectionContainerRef}>
									<FontStyleSelection
										selectedOption={fontStyle}
										setSelectedOption={setFontStyle}
									/>
								</div>

								<div className="logo-style" ref={logoStyleHeaderRef}>
									Logo
								</div>
								<div className="logo-container logos" ref={logoContainerRef}>
									{logoOptions.map((logo) => (
										<div
											key={logo.id}
											className={`logo ${
												selectedLogo === logo.id ? "clicked" : ""
											} ${!isSubmitContainerVisible ? "disabled" : ""}`}
											onClick={() => handleLogoClick(logo.id)}
										>
											<img src={logo.src} alt={`Logo ${logo.id}`} />
										</div>
									))}
								</div>
							</div>

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
											{brandName || "brand title"}
										</span>
										<span
											className={`brand-desc ${
												isReady ? "brand-desc-ready" : ""
											}`}
										>
											{getBrandDesc(fontStyle)}
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
											Create
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

export default CreateBrand;
