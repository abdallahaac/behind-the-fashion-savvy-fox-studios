// Tutorial.js
import React, { useState, useEffect } from "react";
import BudgetRoller from "./BudgetRoller";
import right_arrow from "../assets/images/right-arrow.svg";
import "../assets/styles/tutorial.css";

const Tutorial = ({ videos, onBudgetGenerated }) => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [isBudgetRolled, setIsBudgetRolled] = useState(false);

	const handleNext = () => {
		if (currentVideoIndex < videos.length) {
			setCurrentVideoIndex((prev) => prev + 1);
		} else {
			// Close the tutorial box
			document.querySelector(".tutorial-overlay").style.display = "none";
		}
	};

	// Now we receive the number from BudgetRoller
	const handleBudgetRollDone = (generatedBudget) => {
		// Mark as rolled, so the "Done" button is active
		setIsBudgetRolled(true);
		// Pass up to BuildBrand
		if (onBudgetGenerated) {
			onBudgetGenerated(generatedBudget);
		}
	};

	useEffect(() => {
		const videoElement = document.querySelector(".tutorial-video");
		if (videoElement) {
			videoElement.load();
			videoElement.play();
		}
	}, [currentVideoIndex]);

	return (
		<div className="tutorial-overlay">
			<div className="tutorial-box">
				{currentVideoIndex < videos.length ? (
					<video
						className="tutorial-video"
						// controls removed
						autoPlay
						muted
						onEnded={handleNext}
					>
						<source src={videos[currentVideoIndex]} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				) : (
					<>
						<div className="heading-2">Brand Budget</div>
						{/*
               We pass handleBudgetRollDone to BudgetRoller
               so it knows how to pass the budget upward.
            */}
						<BudgetRoller onRollDone={handleBudgetRollDone} />
					</>
				)}
				<button
					id="tutorial-button"
					className="add-button"
					onClick={handleNext}
					disabled={currentVideoIndex >= videos.length && !isBudgetRolled}
					style={{
						backgroundColor:
							currentVideoIndex >= videos.length && !isBudgetRolled
								? "#cccccc"
								: "#C83C00",
						cursor:
							currentVideoIndex >= videos.length && !isBudgetRolled
								? "not-allowed"
								: "pointer",
					}}
				>
					{currentVideoIndex >= videos.length ? "Done" : "Next"}
					<div id="next-button" className="button-icon">
						<img src={right_arrow} alt="Right Arrow Icon" />
					</div>
				</button>
				<div className="pagination-bar">
					{videos.map((_, index) => (
						<div
							key={index}
							className={`pagination-dot ${
								index === currentVideoIndex ? "active" : ""
							}`}
						></div>
					))}
					<div
						className={`pagination-dot ${
							currentVideoIndex === videos.length ? "active" : ""
						}`}
					></div>
				</div>
			</div>
		</div>
	);
};

export default Tutorial;
