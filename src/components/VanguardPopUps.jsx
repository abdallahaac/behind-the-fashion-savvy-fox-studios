import React, { useState, useRef, useEffect, useContext } from "react";
import { gsap } from "gsap";
import "../assets/styles/vanguard-tutorial.css";
import "../assets/styles/VanguardPopUps.css";
import right_arrow from "../assets/images/right-arrow.svg";
import { FundingContext } from "../utils/FundingContext";
import allVanguardsHappy from "../assets/images/Vanguards/allVanguards_happy.svg";
import allVanguardsThumbsUp from "../assets/images/Vanguards/allVanguards_thumbsUp.svg";

import NormalButton from "./NormalButton";

function VanguardPopUp({ steps, onDeactivateActiveVanguard, currentStage }) {
	// Flatten the steps array
	const _steps = steps.flat(2) || [];

	// State for current step index and hold-to-complete logic
	const [currentStep, setCurrentStep] = useState(0);
	const [doneClicked, setDoneClicked] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);

	// Use the global funding context
	const { fundingAmount, setFundingAmount, generateFunding } =
		useContext(FundingContext);

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
	useEffect(() => {
		console.log("Updated funding Amount", fundingAmount);
	}, [fundingAmount]);

	useEffect(() => {
		console.log("activationIndex", currentStep);
		console.log("steps", steps);
	}, []);

	// When the current step changes, if funding is needed, ensure a funding amount is generated.
	// useEffect(() => {
	//     const step = _steps[currentStep];
	//     if (step && step.funding ) {
	//         generateFunding();
	//     }
	// }, [currentStep, _steps, generateFunding]);

	// Navigation Handlers
	const handleNext = () => {
		if (currentStep < _steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};
	const handleHello = () => {};
	console.log("hello");
	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	// Hold-to-complete Logic (used on the final step "Done")
	const HOLD_DURATION = 0; // milliseconds

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
		console.log("handleDones");
		setDoneClicked(true);
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
					const step = _steps[currentStep];
					if (step && step.funding) {
						setFundingAmount((prev) => (prev || 0) + step.funding);
					}
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

	const renderStep = (step, index) => {
		const description = step.funding
			? step.description.replace(
					"$100k",
					`$${step.funding.toLocaleString()} grant`
			  )
			: step.description;

		const isAllVanguardsHappy = step.img_path === allVanguardsHappy;
		const isAllVanguardsThumbsUp = step.img_path === allVanguardsThumbsUp;

		if (currentStage === "finalPersona") {
			return (
				<div className="vanguard-popup-step">
					{step.img_path && (
						<img
							src={step.img_path}
							alt={step.title}
							className={`step-image ${
								isAllVanguardsHappy || isAllVanguardsThumbsUp
									? "all-vanguards-happy"
									: ""
							}`}
						/>
					)}
					{step.assignment && (
						<p className="assignment body-text-small">{step.assignment}</p>
					)}
					{step.persona_title && (
						<h2 className="persona-title accent-2">{step.persona_title}</h2>
					)}
					<p
						className="tutorial-description"
						style={{ textAlign: "center", color: "white" }}
					>
						{description}
					</p>
					{index === 2 && step.link && (
						<a
							href={step.link}
							target="_blank"
							rel="noopener noreferrer"
							className="step-link"
						>
							{step.link}
						</a>
					)}
					{step.inner_title && (
						<span className="inner-title">{step.inner_title}</span>
					)}
				</div>
			);
		}

		return (
			<div className="vanguard-popup-step">
				{step.img_path && (
					<img
						src={step.img_path}
						alt={step.title}
						className={`step-image ${
							isAllVanguardsHappy || isAllVanguardsThumbsUp
								? "all-vanguards-happy"
								: ""
						}`}
					/>
				)}
				<span>{step.title}</span>
				<p className="tutorial-description">{description}</p>
				{step.funding && (
					<span className="tutorial-funding-container">
						<div className="funding-container">
							<span className="funding label-large" style={{ color: "black" }}>
								$&nbsp;&nbsp;Funding
							</span>
							<div
								className="funding-amount"
								style={{ color: step.funding > 0 ? "#1D7B18" : "#C83C00" }}
							>
								{currentStage === "final"
									? step.funding > 0
										? `+${step.fundTitle}`
										: `${step.fundTitle}`
									: step.funding > 0
									? `+${step.funding.toLocaleString()}`
									: `${step.funding.toLocaleString()}`}
							</div>
						</div>
					</span>
				)}
			</div>
		);
	};

	return (
		<div
			className="vanguard-tutorial--parent-container"
			onContextMenu={(e) => e.preventDefault()}
		>
			<div
				className="tutorial-container"
				ref={containerRef}
				id={
					currentStage === "final" || currentStage === "finalPersona"
						? "hotseat"
						: undefined
				}
			>
				{/* Step Indicators */}
				<div
					className="step-container"
					style={_steps.length === 1 ? { opacity: 0 } : {}}
				>
					{_steps.map((_, index) => (
						<span
							key={index}
							className={`vanguard-tutorial-step ${
								index <= currentStep ? "active-step" : "inactive-step"
							}`}
						></span>
					))}
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
							{renderStep(step)}
						</div>
					))}
				</div>

				{/* Navigation Buttons */}
				<div
					className="navigation-buttons"
					style={{
						justifyContent:
							currentStage === "final"
								? "center"
								: currentStep === 0
								? "flex-end"
								: "space-between",
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
					) : currentStage === "final" ? (
						<div
							className={`nav-button-tut nav-done`}
							onMouseDown={startHold}
							onMouseUp={endHold}
							onTouchStart={startHold}
							onTouchEnd={endHold}
							style={{ cursor: "pointer", backgroundColor: "white" }}
						>
							<div
								className="hold-progress"
								style={{ width: `${progress}%` }}
							/>
							<div style={{ position: "relative", zIndex: 2 }}>Next</div>
						</div>
					) : (
						<div
							className={`nav-button-tut nav-done`}
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
