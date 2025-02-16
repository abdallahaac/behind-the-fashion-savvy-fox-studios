import React, { useState, useRef } from "react";
import "../assets/styles/create-brand.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CreateBrand({ onContinue }) {
	// Hold-to-Complete State
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);

	// How long the user must hold to complete (ms)
	const HOLD_DURATION = 500;

	// When user presses down on the button
	const startHold = (e) => {
		e.preventDefault();
		setIsBlinking(false);
		setProgress(0);

		holdStartRef.current = Date.now();

		// Interval to gradually increase progress
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

	// When user releases the button
	const endHold = (e) => {
		e.preventDefault();
		clearInterval(intervalRef.current);

		// If user hasn't reached 100%, reset
		if (progress < 100) {
			setProgress(0);
			setIsBlinking(true);
		}
	};

	// Called once user has held long enough
	const handleDone = () => {
		console.log("Hold-to-complete is done. Going to next breakpoint!");
		// Call parent's callback if available
		if (onContinue) onContinue();
	};

	return (
		<div className="start-button-container">
			<div className="create-container">
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
				<div className="button-container">
					<div className="button-description">
						Create a Strong Brand Identity to Build Investor Recognition
					</div>

					{/* The Start button with hold-to-complete behavior */}
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
			</div>
		</div>
	);
}

export default CreateBrand;
