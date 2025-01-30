import React, { useState } from "react";
import "../assets/styles/card-selection.css";

const CardSelection = ({ cards, onCardSelect }) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const toggleCardSelection = (index) => {
        const newSelectedIndex = selectedCardIndex === index ? null : index;
        setSelectedCardIndex(newSelectedIndex);
        onCardSelect(newSelectedIndex);
    };

    return (
        <div className="card-selection-container">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`card ${selectedCardIndex === index ? "selected" : ""}`}
                    onClick={() => toggleCardSelection(index)}
                >
                    <div className="checkbox">
                        <input
                            type="checkbox"
                            checked={selectedCardIndex === index}
                            onChange={() => toggleCardSelection(index)}
                        />
                    </div>
                    <div className="img_container">
                        <img src={card.image} alt={card.fabricName} className="card-image" />
                    </div>
                    <div className="card-info">
                        <p className="fabric-name body-text-medium">{card.fabricName}</p>
                        <p className="fabric-cost accent-5">${card.cost}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardSelection;