import React, { useState, useEffect } from "react";
import "../assets/styles/card-selection.css";

const CardSelection = ({ cards, onCardSelect, selectedCardIndex, setSelectedCardIndex }) => {
    // const [selectedCardIndex, setSelectedCardIndex] = useState(null);



    const toggleCardSelection = (index) => {
        const newSelectedIndex = selectedCardIndex === index ? null : index;
        setSelectedCardIndex(newSelectedIndex);
        onCardSelect(newSelectedIndex);
    };
    useEffect(() => {

        console.log(selectedCardIndex)

    })

    return (
        <div className="card-selection-container">
            <div className="card-row">
                {cards.slice(0, 2).map((card, index) => (
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
            <div className="card-row">
                {cards.slice(2, 4).map((card, index) => (
                    <div
                        key={index + 2}
                        className={`card ${selectedCardIndex === index + 2 ? "selected" : ""}`}
                        onClick={() => toggleCardSelection(index + 2)}
                    >
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                checked={selectedCardIndex === index + 2}
                                onChange={() => toggleCardSelection(index + 2)}
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
        </div>
    );
};

export default CardSelection;