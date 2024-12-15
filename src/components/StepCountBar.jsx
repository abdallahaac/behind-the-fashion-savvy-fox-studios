import React from "react";
import PropTypes from "prop-types";

const StepCountBar = ({ currentStep, totalSteps }) => {
	return (
		<div className="step-count-bar">
			<div className="step-count">
				<div className="current-step">Step {currentStep}</div>
				<div className="total-step">/{totalSteps}</div>
			</div>
			<div className="progress-bar">
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

StepCountBar.propTypes = {
	currentStep: PropTypes.number.isRequired,
	totalSteps: PropTypes.number.isRequired,
};

export default StepCountBar;
