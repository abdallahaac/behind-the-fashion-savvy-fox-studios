import React from "react";
import "../assets/styles/outfit-details.css";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import greenHeart from "../assets/images/green-heart.svg";

const FabricDetails = ({ selectedModel }) => {
    if (!selectedModel) {
        return <div className="design-card">Select a model to see details</div>;
    }

    return (
        <div className="design-card">
            <h1 className="title accent-2">{selectedModel.fabricName}</h1>
            <div className="feature">
                <span className="icon thumbs-down">
                    <img
                        src={redThumb}
                        alt="Ethics Icon"
                        style={{ width: "24px", height: "24px" }}
                    />
                </span>
                <span className="feature-text body-text-medium">
                    {selectedModel.model.env_title}
                </span>
            </div>
            <div className="p_bar-description">
                <p className="description body-text-small">
                    {selectedModel.model.env_description}
                </p>
            </div>

            <div className="feature">
                <span className="icon thumbs-down">
                    <img
                        src={redThumb}
                        alt="Ethics Icon"
                        style={{ width: "24px", height: "24px" }}
                    />
                </span>
                <span className="feature-text body-text-medium">
                    {selectedModel.model.ethics_title}
                </span>
            </div>
            <div className="p_bar-description">
                <p className="description body-text-small">
                    {selectedModel.model.ethics_description}
                </p>
            </div>

            
            <div className="feature">
                <span className="icon thumbs-down">
                    <img
                        src={redThumb}
                        alt="Ethics Icon"
                        style={{ width: "24px", height: "24px" }}
                    />
                </span>
                <span className="feature-text body-text-medium">
                    {selectedModel.model.water_use}
                </span>
            </div>
            <div className="p_bar-description">
                <p className="description body-text-small">
                    {selectedModel.model.water_description}
                </p>
            </div>

            <div className="cost-row">
                <div className="cost">
                    <h2 className="accent-3">${selectedModel.cost}</h2>
                    <span className="label-large">COST OF DESIGN</span>
                </div>
            </div>
        </div>
    );
};

export default FabricDetails;
