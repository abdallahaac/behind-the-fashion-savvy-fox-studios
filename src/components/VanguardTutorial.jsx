import React, { useState } from "react";
import "../assets/styles/vanguard-tutorial.css";
import "../assets/styles/font-vars.css";
import BotSvg from "../assets/images/tutorial-bot.svg";

function VanguardTutorial() {
	// Define your steps with title and description.
	const steps = [
		{
			title: "ASSISTANT",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur distinctio voluptas ab laudantium iure omnis dolorum minus ipsam provident odio libero, iusto amet nobis magnam earum necessitatibus unde, inventore ducimus!",
		},
		{
			title: "STEP 2",
			description:
				"Step 2 description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "STEP 3",
			description:
				"Step 3 description goes here. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];

	const [currentStep, setCurrentStep] = useState(0);

	// Handlers for navigation
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

	return (
		<div className="vanguard-tutorial--parent-container">
			<div className="tutorial-container">
				{/* Step indicators */}
				<div className="step-container">
					{steps.map((step, index) => (
						<span
							key={index}
							className="vanguard-tutorial-step"
							style={{
								// Previous and current steps are grey; future steps are light grey.
								backgroundColor: index <= currentStep ? "#9B9B9B" : "#F0F0F0",
							}}
						></span>
					))}
				</div>

				{/* SVG image */}
				<div className="vanguard-tutorial-svg">
					<img src={BotSvg} alt="Tutorial Bot" />
				</div>

				{/* Step title and description */}
				<div className="vanguard-tutorial-step-description">
					<span>{steps[currentStep].title}</span>
					<p className="tutorial-description">
						{steps[currentStep].description}
					</p>
				</div>

				{/* Navigation buttons */}
				<div className="next-btn">
					{currentStep > 0 && (
						<div
							className="back"
							onClick={handleBack}
							style={{ cursor: "pointer" }}
						>
							Back
						</div>
					)}
					{currentStep < steps.length - 1 && (
						<div
							className="next"
							onClick={handleNext}
							style={{
								cursor: "pointer",
								// If no Back button is rendered (i.e., on the first page), push Next to the right.
								marginLeft: currentStep === 0 ? "auto" : "0",
							}}
						>
							Next
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default VanguardTutorial;
