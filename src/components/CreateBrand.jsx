import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FontStyleSelection from "../utils/FontSelection";
import LogoOne from "../assets/images/logo-one-preview.svg";

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

function CreateBrand({ onStart, onLogoSelect, onCreate }) {
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [fontStyle, setFontStyle] = useState("");
	const [brandName, setBrandName] = useState("");
	const [selectedLogo, setSelectedLogo] = useState(null); // For logo selection

	// Refs
	const containerRef = useRef(null);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);

	// For staggered animations
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

	// Called once the hold duration is complete.
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
				// Trigger parent callback to fade out Vanguard & move to next breakpoint
				if (onStart) {
					onStart();
				}
			},
		});
	};

	// Fade in the expanded container.
	useEffect(() => {
		if (isExpanded && loremContainerRef.current) {
			gsap.to(loremContainerRef.current, {
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			});
		}
	}, [isExpanded]);

	// Once expanded, fade in inner elements in sequence using a timeline.
	useEffect(() => {
		if (isExpanded) {
			const tl = gsap.timeline({
				defaults: { opacity: 0, duration: 0.5, ease: "power2.out" },
			});
			tl.from(fontStyleHeaderRef.current, { delay: 0.3 })
				.from(fontSelectionContainerRef.current, { delay: 0.2 })
				.from(logoStyleHeaderRef.current, { delay: 0.2 })
				.from(logoContainerRef.current, { delay: 0.2 })
				.from(createSubmitContainerRef.current, { delay: 0.2 });
		}
	}, [isExpanded]);

	// Define logo options (demo: same image for both)
	const logoOptions = [
		{ id: "logo1", src: LogoOne },
		{ id: "logo2", src: LogoOne },
	];

	// Logo click logic
	const handleLogoClick = (logoId) => {
		setSelectedLogo(logoId);
		onLogoSelect?.(logoId);
	};

	// The form is considered ready only if all three inputs are provided
	const isReady =
		brandName.trim() !== "" && fontStyle !== "" && selectedLogo !== null;

	// Handler for the "Create" button
	const handleCreateClick = () => {
		if (!isReady) return;

		// Fade out the entire CreateBrand container
		gsap.to(containerRef.current, {
			duration: 1,
			opacity: 0,
			ease: "power2.out",
			onComplete: () => {
				onCreate?.();
			},
		});
	};

	return (
		<div className="start-button-container" ref={containerRef}>
			<div
				className={`create-container ${isExpanded ? "expanded-container" : ""}`}
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
					{/* Before expansion: show hold-to-start */}
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
						// After expansion: show brand creation options
						<div
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div className="section-one">
								<div>BRAND NAME</div>
								<div style={{ position: "relative", width: "92%" }}>
									<input
										type="text"
										placeholder="Brand Name..."
										maxLength="12"
										value={brandName}
										onChange={(e) => setBrandName(e.target.value)}
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
								<div className="logo-container" ref={logoContainerRef}>
									{logoOptions.map((logo) => (
										<div
											key={logo.id}
											className={`logo ${
												selectedLogo === logo.id ? "clicked" : ""
											}`}
											onClick={() => handleLogoClick(logo.id)}
										>
											<img src={logo.src} alt={`Logo ${logo.id}`} />
										</div>
									))}
								</div>
							</div>

							{/* The bottom 'Create' button */}
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
										className={`create-btn ${isReady ? "ready-btn" : ""}`}
										onClick={handleCreateClick}
									>
										Create
										<FontAwesomeIcon
											icon={faArrowRight}
											className="icon-right"
										/>
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
