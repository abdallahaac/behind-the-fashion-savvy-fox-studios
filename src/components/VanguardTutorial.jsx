import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../assets/styles/vanguard-tutorial.css";
import "../assets/styles/font-vars.css";
import BotSvg from "../assets/images/tutorial-bot.svg";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faArrowLeft,
	faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function VanguardTutorial({ onClose }) {
	// Steps data
	const steps = [
		{
			title: "ASSISTANT",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur distinctio voluptas ...",
		},
		{
			title: "STEP 2",
			description: "Step 2 description goes here. Lorem ipsum dolor sit amet.",
		},
		{
			title: "STEP 3",
			description:
				"Step 3 description goes here. Sed do eiusmod tempor incididunt...",
		},
	];

	const [currentStep, setCurrentStep] = useState(0);
	const [doneClicked, setDoneClicked] = useState(false);

	// Loader fill from 0% to 100%
	const [progress, setProgress] = useState(0);

	// Controls if the “Done” button is blinking
	const [isBlinking, setIsBlinking] = useState(true);

	// Refs
	const parentRef = useRef(null);
	const descriptionRef = useRef(null);
	const navButtonsRef = useRef(null);

	// For “hold-to-complete” logic
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	// Animate step description in
	useEffect(() => {
		gsap.fromTo(
			descriptionRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.5, ease: "power1.out" }
		);
	}, [currentStep]);

	// Animate nav buttons in
	useEffect(() => {
		if (navButtonsRef.current) {
			gsap.fromTo(
				navButtonsRef.current.children,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.8, ease: "power1.out" }
			);
		}
	}, [currentStep]);

	// ---------------------------
	// Navigation Handlers
	// ---------------------------
	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	// ---------------------------
	// Hold-to-Complete Logic
	// ---------------------------
	const HOLD_DURATION = 500; // 2 seconds

	const startHold = (e) => {
		e.preventDefault(); // Prevent default mouse/touch behaviors
		// If we've already completed or are in done state, do nothing
		if (doneClicked) return;

		// Stop blinking as soon as the user starts pressing
		setIsBlinking(false);

		// Reset loader progress to 0
		setProgress(0);

		// Record the hold start time
		holdStartRef.current = Date.now();

		// Use setInterval to update the progress smoothly
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
		}, 30); // update ~ every 30ms
	};

	// Cancel hold if user releases early
	const endHold = (e) => {
		e.preventDefault(); // Prevent default mouse/touch behaviors
		if (doneClicked) return;

		clearInterval(intervalRef.current);

		// If user didn't complete the hold, reset
		if (progress < 100) {
			setProgress(0);
			// Resume blinking to prompt user again
			setIsBlinking(true);
		}
	};

	const handleDone = () => {
		setDoneClicked(true);
		// Fade out the tutorial with GSAP, then call onClose
		gsap.to(parentRef.current, {
			opacity: 0,
			duration: 0.5,
			delay: 0.6,
			ease: "power1.out",
			onComplete: () => {
				if (onClose) onClose();
			},
		});
	};

	return (
		<div
			className="vanguard-tutorial--parent-container"
			ref={parentRef}
			onContextMenu={(e) => e.preventDefault()} // Prevent right-click/long-press menus
		>
			<div className="tutorial-container">
				{/* Step indicators */}
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

				{/* SVG image */}
				<div className="vanguard-tutorial-svg">
					<img src={BotSvg} alt="Tutorial Bot" />
				</div>

				{/* Step Title/Description */}
				<div
					className="vanguard-tutorial-step-description"
					ref={descriptionRef}
				>
					<span>{steps[currentStep].title}</span>
					<p className="tutorial-description">
						{steps[currentStep].description}
					</p>
				</div>

				{/* Nav Buttons */}
				<div className="next-btn" ref={navButtonsRef}>
					{currentStep > 0 && (
						<div className="nav-button-tut nav-back" onClick={handleBack}>
							<FontAwesomeIcon icon={faArrowLeft} className="icon-left" />
							Back
						</div>
					)}

					{currentStep < steps.length - 1 ? (
						<div
							className={`nav-button-tut nav-next ${
								currentStep === 0 ? "ml-auto" : ""
							}`}
							onClick={handleNext}
						>
							Next
							<FontAwesomeIcon icon={faArrowRight} className="icon-right" />
						</div>
					) : (
						// --------- The "Done" button with hold-to-complete ---------
						<div
							className={`nav-button-tut nav-done ${
								isBlinking ? "blink-done" : ""
							}`}
							onMouseDown={startHold}
							onMouseUp={endHold}
							onTouchStart={startHold}
							onTouchEnd={endHold}
						>
							{/* Loader overlay filling from left to right */}
							<div
								className="hold-progress"
								style={{ width: `${progress}%` }}
							/>

							{/* "Done" text + icon (above the filling) */}
							<div style={{ position: "relative", zIndex: 2 }}>
								Done
								<FontAwesomeIcon icon={faCheckCircle} className="icon-done" />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default VanguardTutorial;
