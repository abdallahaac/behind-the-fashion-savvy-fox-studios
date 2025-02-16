import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FontStyleSelection from "../utils/FontSelection";
// Import the updated FontStyleSelection component

function CreateBrand({ onStart }) {
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	// State for managing the selected font style
	const [fontStyle, setFontStyle] = useState("");
	// State for managing the brand name (with 12-character limit)
	const [brandName, setBrandName] = useState("");

	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	const buttonContainerRef = useRef(null);
	const createParentRef = useRef(null);
	const loremContainerRef = useRef(null);

	const HOLD_DURATION = 500;

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

	// Called once the hold duration is complete
	const handleDone = () => {
		console.log("Hold-to-complete done. Expanding the container!");
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

	// Fade in the new container when expanded
	useEffect(() => {
		if (isExpanded && loremContainerRef.current) {
			gsap.to(loremContainerRef.current, {
				duration: 1,
				opacity: 1,
				ease: "power2.out",
			});
		}
	}, [isExpanded]);

	return (
		<div className="start-button-container">
			<div
				className={`create-container ${isExpanded ? "expanded-container" : ""}`}
			>
				<div className="create-parent" ref={createParentRef}>
					<div className="create-step-container">
						<div className="steps">
							Step 1 <span>&nbsp;/ 4</span>
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
							className="new-container"
							ref={loremContainerRef}
							style={{ opacity: 0 }}
						>
							<div>BRAND NAME</div>
							{/* Input wrapped to show character counter */}
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
							<div className="font-style">FONT STYLE</div>
							{/* Font selection component */}
							<FontStyleSelection
								selectedOption={fontStyle}
								setSelectedOption={setFontStyle}
							/>
							<div className="font-style">Logo</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CreateBrand;
