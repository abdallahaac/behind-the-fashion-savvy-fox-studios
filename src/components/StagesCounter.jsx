import React, { useState } from "react";
import "../assets/styles/stages-counter.css";

const StagesCounter = ({ numSteps, currentStep }) => {
    return (
        <div className="count-bar">
            <div className="steps body-text-medium">
                {Array.from({ length: numSteps }, (_, index) => (
                    <div key={index} className="step-container">
                        <div className={`step ${currentStep === index ? "active" : ""}`}>
                            {index + 1}
                        </div>
                        {index < numSteps - 1 && <div className="line"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StagesCounter;