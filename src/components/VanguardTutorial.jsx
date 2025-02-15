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
	// New state to show/hide the tutorial
	const [isTutorialVisible, setIsTutorialVisible] = useState(true);

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
	const HOLD_DURATION = 500; // Duration in ms

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
				if (onClose) onClose();
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
