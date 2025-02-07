import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepCountBar from "./StepCountBar";
import CollectionOrigMetric from "./CollectionOrigMetric";
import CardSelection from "./CardSelection";
import cracked_heart from "../assets/images/cracked-heart.png";
import shopping_bag from "../assets/images/shopping_bag.svg";
import right_arrow from "../assets/images/right-arrow.svg";
import FontStyleSelection from "./FontSelection";
import StagesCounter from "../components/StagesCounter.jsx";
import Toggle from "../components/Toggle.jsx";

const SelectionPanel = ({
    collection,
    onRemoveFromCollection,
    currentStep,
    brandName,
    setBrandName,
    fontStyle,
    setFontStyle,
    selectedModel,
    setSelectedModel,
    cards,
    onCardSelect,
    selectedCardIndex,
    setSelectedCardIndex,
    currentFabricStep,
    setCurrentFabricStep
}) => {
    const navigate = useNavigate();
    const [hasVisitedAudit, setHasVisitedAudit] = useState(false);

    const handleAuditVisit = () => {
        setHasVisitedAudit(true);
    };

  

    // Function to handle "Create" button click
    const handleCreateClick = () => {
        if (brandName.trim() && fontStyle) {
            navigate("/choose-selection");
        }
    };

    const handleNextFabricStage = () => {
        if (currentFabricStep < 2) {
            setCurrentFabricStep(currentFabricStep + 1);
            setSelectedCardIndex(null);
            setSelectedModel(null);
        }else{
            navigate("/manufacturing");
        }
    };


    // Determine the background color of the "total-price-widget" element
    const getBackgroundColor = () => {
        if (!brandName.trim() || !fontStyle) {
            return "#f0f0f0"; // Disabled/Default background
        }
        return "#fff4e6"; // Active background when valid
    };

    const getBackgroundColorFabricLab = () => {
        return selectedCardIndex !== null ? "#fff4e6" : "#f0f0f0"; // Orange if selected, white if not
    };

    const getButtonClass = () => {
        return selectedCardIndex !== null ? "button button-active" : "button button-disabled";
    };

    const stepTitles = [
        "1. CHOOSE A LIGHT FABRIC",
        "2. CHOOSE A KNIT FABRIC",
        "3. CHOOSE A SHINY FABRIC"
    ];

    const handleCardSelectInternal = (index) => {
        onCardSelect(index, currentFabricStep);
    };

  

    return (
        <div className="selection-panel">
            {/* Header Section */}
            <div className="header-section">
                <StepCountBar currentStep={currentStep} totalSteps={4} />
                {currentStep === 1 && (
                    <div className="choose-outfit-designs accent-2">
                        Create your brand
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="choose-outfit-designs accent-2">
                        Choose Outfit Designs
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="choose-outfit-designs accent-2">
                        Fabrics Lab
                    </div>
                )}
                {currentStep === 4 && (
                    <div className="choose-outfit-designs accent-2">
                        Factory Selection
                    </div>
                )}
            </div>

            {currentStep === 1 && (
                <>
                    {/* My Collection Block */}
                    <div
                        className="my-collection-block"
                        style={{ marginBottom: "240px" }}
                    >
                        <div className="my-collection accent-4">Brand Name</div>
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                type="text"
                                placeholder="Brand Name..."
                                maxLength="12"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                style={{
                                    color: "white",
                                    width: "100%",
                                    padding: "16px",
                                    border: "1.1px solid rgba(240, 240, 240, 0.51)",
                                    borderRadius: "4px",
                                    boxSizing: "border-box",
                                    outline: "none",
                                    fontSize: "14px",
                                    background: "#222222",
                                    letterSpacing: "1px",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#CCC",
                                    fontSize: "12px",
                                    fontFamily: "'DM Sans', sans-serif",
                                }}
                            >
                                {brandName.length} / 12
                            </div>
                        </div>
                    </div>

                    {/* Pass fontStyle and its updater to FontStyleSelection */}
                    <FontStyleSelection
                        selectedOption={fontStyle}
                        setSelectedOption={setFontStyle}
                    />

                    {/* Total Price Widget */}
                    <div
                        className="total-price-widget"
                        style={{
                            backgroundColor: getBackgroundColor(),
                            padding: "16px",
                            borderRadius: "8px",
                            transition: "background-color 0.3s ease",
                            border:
                                brandName.trim() && fontStyle
                                    ? "1px solid #FFC4B1"
                                    : "1px solid transparent",
                        }}
                    >
                        <div className="price">
                            <div
                                className="dollar-amount accent-2"
                                style={{
                                    width: "188px",
                                    color: brandName.trim() && fontStyle ? "#0F0F0F" : "#9B9B9B",
                                }}
                            >
                                {brandName || "Brand Name"}
                            </div>
                            {/* Display the dynamically selected font style */}
                            <div
                                className="total-design-price label-large"
                                style={{
                                    color: brandName.trim() && fontStyle ? "#0F0F0F" : "#9B9B9B",
                                }}
                            >
                                {fontStyle ? `A ${fontStyle} Brand` : "Select a Font Style"}
                            </div>
                        </div>
                        {/* Updated "Create" Button */}
                        <button
                            className="button"
                            onClick={handleCreateClick}
                            style={{
                                width: "90px",
                                height: "40px",
                                cursor:
                                    brandName.trim() && fontStyle ? "pointer" : "not-allowed",
                                backgroundColor:
                                    brandName.trim() && fontStyle ? " #C83C00" : "#888888",
                                transition: "background-color 0.3s ease",
                                border: "none",
                                borderRadius: "5px",
                                color: "white",
                                display: "flex",
                                padding: "16px 8px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            disabled={!brandName.trim() || !fontStyle} // Disable button if brandName or fontStyle is empty
                        >
                            Create
                        </button>
                    </div>
                </>
            )}

            {currentStep === 2 && (
                <>
                    {/* My Collection Block */}
                    <div className="my-collection-block">
                        <div className="my-collection accent-4">My Collection</div>
                        <div className="thumbnail-list">
                            {[...Array(3)].map((_, index) => {
                                const model = collection[index];
                                return (
                                    <div key={index} className={`thumbnail ${model ? "occupied" : "unoccupied"}`}>
                                        {model ? (
                                            <div className="thumbnail-content">
                                                <button
                                                    className="remove-button"
                                                    onClick={() => onRemoveFromCollection(model.id)}
                                                >
                                                    REMOVE
                                                </button>
                                                <img src={model.img_path} alt={model.name} className="model-image" />
                                            </div>
                                        ) : (
                                            <div className="empty-state-text accent-1">
                                                {`0${index + 1}`}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Collection Statistics Block */}
                    <div className="collection-statistics-block">
                        <div className="collection-statistics-header accent-4">
                            Collection Statistics
                        </div>
                        {/* Example metric */}
                        <div className="collection-metric-container">
                            <CollectionOrigMetric
                                label="Collection Originality"
                                originalPercentage={selectedModel.orig_percentage}
                                plagiarizedPercentage={selectedModel.plag_percentage}
                                summaryText="Consumers need to resonate with your designs or your brand risks no sales."
                                icon={
                                    <img
                                        src={cracked_heart}
                                        alt="Originality Icon"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                }
                                showBars={true}
                            />
                        </div>
                    </div>

                    {/* Total Price Widget */}
                    <div className="total-price-widget">
                        <div className="price">
                            <div className="dollar-amount accent-2">
                                $
                                {collection
                                    .reduce((total, item) => total + item.cost, 0)
                                    .toFixed(2)}
                            </div>
                            <div className="total-design-price label-large">
                                Total Design Price
                            </div>
                        </div>
                        <div className="button">
                            <div className="button-text body-text-medium">Purchase</div>
                            <div className="button-icon">
                                <img src={shopping_bag} alt="Shopping Bag Icon" />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {currentStep === 3 && (
                <>
                    <StagesCounter numSteps={3} currentStep={currentFabricStep} />
                    <h1 className="step-title accent-4">{stepTitles[currentFabricStep]}</h1>
                    <CardSelection cards={cards[currentFabricStep]} onCardSelect={handleCardSelectInternal} selectedCardIndex={selectedCardIndex} setSelectedCardIndex={setSelectedCardIndex} />

                    {/* Total Price Widget */}
                    <div
                        className="total-price-widget"
                        style={{
                            backgroundColor: getBackgroundColorFabricLab(),
                            padding: "16px",
                            borderRadius: "8px",
                            transition: "background-color 0.3s ease",
                            border: selectedCardIndex !== null ? "1px solid #FFC4B1" : "1px solid transparent",
                        }}
                    >
                        <div className="price">
                            <div className="dollar-amount accent-2"
                                style={{
                                    color: selectedCardIndex !== null ? "#0F0F0F" : "#9B9B9B",
                                }}
                            >
                                $
                                {selectedCardIndex !== null ? cards[currentFabricStep][selectedCardIndex].cost.toFixed(2) : "0.00"}
                            </div>
                            <div className="total-design-price label-large"
                                style={{
                                    color: selectedCardIndex !== null ? "#0F0F0F" : "#9B9B9B",
                                }}
                            >
                                Total Fabrics Price: ${selectedCardIndex !== null ? cards[currentFabricStep][selectedCardIndex].cost : 0}
                            </div>
                        </div>
                        <button
                            className={getButtonClass()}
                            id="next-fabric-button"
                            onClick={handleNextFabricStage}
                            disabled={selectedCardIndex === null} // Disable button if no card is selected
                        >
                            Purchase
                            <div className="button-icon">
                                <img src={shopping_bag} alt="Shopping Bag Icon" />
                            </div>
                        </button>
                    </div>
                </>
            )}
            {currentStep === 4 && (
                <div>
                    <Toggle selectedModel={selectedModel} />

                    <div className="total-price-widget">
                        <div className="price">
                            <div className="dollar-amount accent-2">
                                $ {selectedModel.cost}
                                {/* {collection
                                    .reduce((total, item) => total + item.cost, 0)
                                    .toFixed(2)} */}
                            </div>
                            <div className="total-design-price label-large">
                                MANUFACTURING COST
                            </div>
                        </div>
                        <button
                            className={getButtonClass()}
                            id="next-fabric-button"
                            onClick={handleNextFabricStage}
                            // disabled={hasVisitedAudit === false} // Disable button if no card is selected
                        >
                            Select
                            <div className="button-icon">
                                <img src={shopping_bag} alt="Shopping Bag Icon" />
                            </div>
                        </button>
                    </div>

                </div>
                
            )}
        </div>
    );
};

export default SelectionPanel;