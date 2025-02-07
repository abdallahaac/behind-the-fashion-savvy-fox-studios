import React, { useState, useEffect } from "react";
import "../assets/styles/toggle.css";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import neutralThumb from "../assets/images/leaf.svg";

const Toggle = ({ selectedModel, onAuditVisit }) => {
    const [isAbout, setIsAbout] = useState(true);

    useEffect(() => {
        // Reset to "ABOUT" tab when selectedModel changes
        setIsAbout(true);
    }, [selectedModel]);

    const getIcon = (iconType) => {
        switch (iconType) {
            case "positive":
                return greenThumb;
            case "negative":
                return redThumb;
            case "neutral":
                return neutralThumb;
            default:
                return neutralThumb;
        }
    };

    const handleVisitedAudit = () => {
        onAuditVisit(selectedModel.id);
    };

    return (
        <div className="toggle-container">
            <h2 className="factory-title accent-3">{selectedModel.name}</h2>
            <div className="toggle-buttons">
                <button
                    className={`toggle-button accent-5 ${isAbout ? "active" : ""}`}
                    onClick={() => setIsAbout(true)}
                >
                    ABOUT
                </button>
                <button
                    className={`toggle-button accent-5 ${!isAbout ? "active" : ""}`}
                    onClick={() => {
                        setIsAbout(false);
                        handleVisitedAudit();
                    }}
                >
                    FACTORY AUDIT
                </button>
            </div>
            <div className="toggle-content">
                {isAbout ? (
                    <div className="about-content">
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={selectedModel.location_icon}
                                        alt="Location Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container"> 
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.location}
                                    </span>

                                    <p className="item-description body-text-small">
                                        {selectedModel.location_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={selectedModel.cert_icon1}
                                        alt="Certification Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container">
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.cert_title1}
                                    </span>
                                    <p className="item-description body-text-small">
                                        {selectedModel.cert_description1}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={selectedModel.cert_icon2}
                                        alt="Certification Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container">
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.cert_title2}
                                    </span>
                                    <p className="item-description body-text-small">
                                        {selectedModel.cert_description2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="factory-audit-content">
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={getIcon(selectedModel.mat_icon)}
                                        alt="thumb Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container">
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.mat_title}
                                    </span>
                                    <p className="item-description body-text-small">
                                        {selectedModel.mat_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={getIcon(selectedModel.env_icon)}
                                        alt="thumb Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container">
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.env_title}
                                    </span>
                                    <p className="item-description body-text-small">
                                        {selectedModel.env_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="info-container">
                            <div className="p_bar-description" id="added-logo">
                                <span className="toggle-icon">
                                    <img
                                        src={getIcon(selectedModel.ethics_icon)}
                                        alt="thumb Icon"
                                        style={{ width: "36px", height: "36px" }}
                                    />
                                </span>
                                <div className="text-container">
                                    <span className="feature-text body-text-medium">
                                        {selectedModel.ethics_title}
                                    </span>
                                    <p className="item-description body-text-small">
                                        {selectedModel.ethics_description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Toggle;