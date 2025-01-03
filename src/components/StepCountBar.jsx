import React from "react";

const StepCountBar = ({ currentStep, totalSteps }) => {
	return (
		<div className="step-count-bar">
			<div className="step-count">
				<div className="current-step label-large">Step {currentStep}</div>
				<div className="total-step label-large">/{totalSteps}</div>
			</div>
			<div className="progress-bar label-large">
				{Array.from({ length: totalSteps }, (_, index) => (
					<div
						key={index}
						className={`progress ${index < currentStep ? "filled" : ""}`}
					></div>
				))}
			</div>
		</div>
	);
};

export default StepCountBar;
