import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/vanguard-tutorial.css"; // Reusing the same CSS for steps
import "../assets/styles/VanguardPopUps.css";
import BotSvg from "../assets/images/tutorial-bot.svg";

function VanguardPopUp() {
	// Define your steps as an array.
	const steps = [
		{
			title: "ASSISTANT",
			description:
				"Hey there! Welcome to the Vanguard Pitch Office. I’m your assistant to guide and prepare you for your pitch to the Vanguards.",
		},
		{
			title: "ASSISTANT",
			description:
				"As I guide you through each step, the Vanguards will evaluate your brand from every angle—ensure you're making the best choices for its success.",
		},
	];

	// State for current step and hold-to-complete logic
	const [currentStep, setCurrentStep] = useState(0);
	const [doneClicked, setDoneClicked] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);

	// Refs for hold-to-complete and container
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	// Move the ref to the inner container you want to animate:
	const containerRef = useRef(null);

	// Fade in on mount:
	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.5, ease: "power1.out" }
		);
	}, []);

	// Navigation Handlers
	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Hold-to-complete Logic
	const HOLD_DURATION = 500; // Duration in milliseconds

	const startHold = (e) => {
		e.preventDefault();
		if (doneClicked) return;
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
		if (doneClicked) return;
		clearInterval(intervalRef.current);
		if (progress < 100) {
			setProgress(0);
			setIsBlinking(true);
		}
	};

	const handleDone = () => {
		setDoneClicked(true);
		// Animate the inner container (tutorial-container) from opacity 1 to 0.
		gsap.fromTo(
			containerRef.current,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 0.5,
				delay: 0.2,
				ease: "power1.out",
				onComplete: () => {
					console.log("Tutorial done");
					// Optionally, trigger additional actions here.
				},
			}
		);
	};

	return (
		<div
			className="vanguard-tutorial--parent-container"
			onContextMenu={(e) => e.preventDefault()}
		>
			<div className="tutorial-container" ref={containerRef}>
				{/* Step Indicators */}
				<div className="step-container">
					{steps.map((step, index) => (
						<span
							key={index}
							className={`vanguard-tutorial-step ${
								index <= currentStep ? "active-step" : "inactive-step"
							}`}
						></span>
					))}
				</div>

				{/* SVG or Image Section */}
				<div className="vanguard-tutorial-svg">
					<img src={BotSvg} alt="Tutorial Bot" />
				</div>

				{/* Step Description */}
				<div className="vanguard-tutorial-step-description">
					<span>{steps[currentStep].title}</span>
					<p className="tutorial-description">
						{steps[currentStep].description}
					</p>
				</div>

				{/* Navigation Buttons */}
				<div
					className="navigation-buttons"
					style={{
						justifyContent: currentStep === 0 ? "flex-end" : "space-between",
					}}
				>
					{currentStep > 0 && (
						<div
							className="nav-button-tut nav-back"
							onClick={handleBack}
							style={{ cursor: "pointer" }}
						>
							<div style={{ position: "relative", zIndex: 2 }}>Back</div>
						</div>
					)}
					{currentStep === 0 ? (
						<div
							className="nav-button-tut nav-next"
							onClick={handleNext}
							style={{ cursor: "pointer" }}
						>
							<div style={{ position: "relative", zIndex: 2 }}>Next</div>
						</div>
					) : (
						<div
							className={`nav-button-tut nav-done ${
								isBlinking ? "blink-done" : ""
							}`}
							onMouseDown={startHold}
							onMouseUp={endHold}
							onTouchStart={startHold}
							onTouchEnd={endHold}
							style={{ cursor: "pointer" }}
						>
							<div
								className="hold-progress"
								style={{ width: `${progress}%` }}
							/>
							<div style={{ position: "relative", zIndex: 2 }}>Done</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default VanguardPopUp;
