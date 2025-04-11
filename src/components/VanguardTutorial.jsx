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

function VanguardTutorial({ onDone }) {
	// New state to show/hide the tutorial
	const [isTutorialVisible, setIsTutorialVisible] = useState(true);

	// Steps data
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
		{
			title: "ASSISTANT",
			description:
				"Hint! - Take a look at the widgets at the top of your screen. They’ll provide insights into the decisions each investor will prefer!",
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

	// Fade in the entire tutorial container on mount (handled solely here)
	useEffect(() => {
		gsap.fromTo(
			parentRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.8, ease: "power2.out" }
		);
	}, []);

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
			console.log(currentStep);
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
	const HOLD_DURATION = 0; // Duration in ms

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
		gsap.to(parentRef.current, {
			opacity: 0,
			duration: 0.5,
			delay: 0.6,
			ease: "power1.out",
			onComplete: () => {
				setIsTutorialVisible(false);
				// Update the activation count for Vanguard 0 by notifying the parent.
				if (onDone) onDone({ tutorialCompleted: true });
			},
		});
	};

	if (!isTutorialVisible) {
		return null;
	}

	return (
		<div
			className="vanguard-tutorial--parent-container"
			ref={parentRef}
			onContextMenu={(e) => e.preventDefault()}
		>
			<div className="tutorial-container">
				<div
					className={`step-container ${steps.length === 1 ? "no-step" : ""}`}
				>
					{steps.map((step, index) => (
						<span
							key={index}
							className={`vanguard-tutorial-step ${
								index <= currentStep ? "active-step" : "inactive-step"
							}`}
						></span>
					))}
				</div>

				<div className="vanguard-tutorial-svg">
					<img src={BotSvg} alt="Tutorial Bot" />
				</div>

				<div
					className="vanguard-tutorial-step-description"
					ref={descriptionRef}
				>
					<span>{steps[currentStep].title}</span>
					<p className="tutorial-description">
						{steps[currentStep].description}
					</p>
				</div>

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
						<div
							className={`nav-button-tut nav-done ${
								isBlinking ? "blink-done" : ""
							}`}
							onMouseDown={startHold}
							onMouseUp={endHold}
							onTouchStart={startHold}
							onTouchEnd={endHold}
						>
							<div
								className="hold-progress"
								style={{ width: `${progress}%` }}
							/>
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
