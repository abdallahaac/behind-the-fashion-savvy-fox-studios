import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "../assets/styles/create-brand.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CreateBrand({ onStart }) {
	const [progress, setProgress] = useState(0);
	const [isBlinking, setIsBlinking] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [showLorem, setShowLorem] = useState(false);
	const intervalRef = useRef(null);
	const holdStartRef = useRef(null);
	const buttonContainerRef = useRef(null);

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

		// If user hasn’t reached 100%, reset
		if (progress < 100) {
			setProgress(0);
			setIsBlinking(true);
		}
	};

	// Called once user has held long enough
	const handleDone = () => {
		console.log("Hold-to-complete done. Expanding the container!");
		setIsExpanded(true);

		// Fade out the button-container with GSAP
		gsap.to(buttonContainerRef.current, {
			duration: 1,
			opacity: 0,
			onComplete: () => {
				setShowLorem(true);
				// Optionally, call the parent onStart callback here:
				if (onStart) {
					onStart();
				}
			},
		});
	};

	return (
		<div className="start-button-container">
			<div
				className={`create-container ${isExpanded ? "expanded-container" : ""}`}
			>
				<div className="create-parent">
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
					{!showLorem ? (
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
						<div className="lorem-container">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
							nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
							Nulla quis sem at nibh elementum imperdiet.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CreateBrand;
