import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/vanguard-tutorial.css"; // Reusing the same CSS for steps
import "../assets/styles/VanguardPopUps.css";
import BotSvg from "../assets/images/tutorial-bot.svg";

function VanguardPopUp({ steps, onDeactivateActiveVanguard }) {
	// Use the passed steps; if none, fallback to an empty array.
	const _steps = steps || [];

	// State for current step index and hold-to-complete logic
	const [currentStep, setCurrentStep] = useState(0);
	const [doneClicked, setDoneClicked] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);

	// Refs for hold-to-complete and container
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	const containerRef = useRef(null);

	// Fade in the container on mount
	useEffect(() => {
		gsap.fromTo(
			containerRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.5, ease: "power1.out" }
		);
	}, []);

	// Navigation Handlers
	const handleNext = () => {
		if (currentStep < _steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Hold-to-complete Logic (used on the final step "Done")
	const HOLD_DURATION = 500; // milliseconds

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
		// Fade out the container, then call the deactivation callback.
		gsap.fromTo(
			containerRef.current,
			{ opacity: 1 },
			{
				opacity: 0,
				duration: 0.5,
				delay: 0.2,
				ease: "power1.out",
				onComplete: () => {
					console.log("Popup done");
					if (onDeactivateActiveVanguard) {
						onDeactivateActiveVanguard();
					}
				},
			}
		);
	};

	if (!_steps.length) {
		return null; // Nothing to show if no steps are provided.
	}

	return (
		<div
			className="vanguard-tutorial--parent-container"
			onContextMenu={(e) => e.preventDefault()}
		>
			<div className="tutorial-container" ref={containerRef}>
				{/* Step Indicators */}
				<div className="step-container">
					{_steps.map((_, index) => (
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

				{/* Steps Content */}
				<div className="vanguard-tutorial-steps">
					{_steps.map((step, index) => (
						<div
							key={index}
							className={`step-content ${
								index === currentStep ? "active" : "inactive"
							}`}
							style={{ display: index === currentStep ? "block" : "none" }}
						>
							<span>{step.title}</span>
							<p className="tutorial-description">{step.description}</p>
						</div>
					))}
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
					{currentStep < _steps.length - 1 ? (
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
