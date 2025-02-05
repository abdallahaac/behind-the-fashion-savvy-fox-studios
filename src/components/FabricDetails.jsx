import React from "react";
import "../assets/styles/outfit-details.css";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import neutralThumb from "../assets/images/leaf.svg";
import heartIcon from "../assets/images/heart.svg";

const FabricDetails = ({ selectedModel }) => {
    if (!selectedModel) {
        return <div className="design-card">Select a model to see details</div>;
    }

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

    const features = [
        { key: "cost", title: "Cost", icon: selectedModel.model.cost_icon, description: selectedModel.model.cost_description },
        { key: "env", title: "Environment", icon: selectedModel.model.env_icon, description: selectedModel.model.env_description },
        { key: "ethics", title: "Ethics", icon: selectedModel.model.ethics_icon, description: selectedModel.model.ethics_description },
        { key: "sus", title: "Sustainability", icon: selectedModel.model.sus_icon, description: selectedModel.model.sus_description },
        { key: "mat", title: "Material", icon: selectedModel.model.mat_icon, description: selectedModel.model.mat_description },
        { key: "water", title: "Water Use", icon: selectedModel.model.water_icon, description: selectedModel.model.water_description },
        { key: "additional_cons", title: "Additional Cons", icon: selectedModel.model.additional_cons_icon, description: selectedModel.model.additional_cons },
    ];

    return (
        
        <div className="design-card">
            <h1 className="title accent-2">{selectedModel.fabricName}</h1>
            {selectedModel.model.cert_title1 && (
                <div key="cert_title1">
                    <div className="feature">
                        <span className="icon">
                            <img
                                src={selectedModel.model.cert_icon1}
                                alt="Certification Icon"
                                style={{ width: "36px", height: "36px" }}
                            />
                        </span>
                        <span className="feature-text body-text-medium">
                            {selectedModel.model.cert_title1}
                        </span>
                    </div>
                    <div className="p_bar-description">
                        <p className="description body-text-small">
                            {selectedModel.model.cert_description1}
                        </p>
                    </div>
                </div>
            )}
            {selectedModel.model.cert_title2 && (
                <div key="cert_title2">
                    <div className="feature">
                        <span className="icon">
                            <img
                                src={selectedModel.model.cert_icon2}
                                alt="Certification Icon"
                                style={{ width: "36px", height: "36px" }}
                            />
                        </span>
                        <span className="feature-text body-text-medium">
                            {selectedModel.model.cert_title2}
                        </span>
                    </div>
                    <div className="p_bar-description">
                        <p className="description body-text-small">
                            {selectedModel.model.cert_description2}
                        </p>
                    </div>
                </div>
            )}
            {features.map((feature) => (
                feature.description && (
                    <div key={feature.key}>
                        <div className="feature">
                            <span className="icon">
                                {feature.icon && (
                                    <img
                                        src={getIcon(feature.icon)}
                                        alt={`${feature.title} Icon`}
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                )}
                            </span>
                            <span className="feature-text body-text-medium">
                                {selectedModel.model[`${feature.key}_title`]}
                            </span>
                        </div>
                        <div className="p_bar-description">
                            <p className="description body-text-small">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                )
            ))}
         
            
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