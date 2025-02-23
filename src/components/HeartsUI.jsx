import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/hearts-ui.css"; 
import emptyHeart from "../assets/images/empty-heart.svg"; 
import filledHeart from "../assets/images/filled-heart.svg"; 

const HeartsUI = ({ title, fillNumber, imageSrc }) => {
    const hearts = Array(5).fill(false).map((_, index) => index < fillNumber);

    return (
        <div className="hearts-ui-container">
            <div className="hearts-ui-left">
                <div className="metric-title label-large">{title}</div>
                <div className="hearts-ui-hearts">
                    {hearts.map((filled, index) => (
                        <span key={index} className={`heart ${filled ? "filled" : "empty"}`}>
                            <img src={filled ? filledHeart : emptyHeart} alt="heart" className="heart-icon" />
                        </span>
                    ))}
                </div>
            </div>
            <div className="hearts-ui-right">
                <img src={imageSrc} alt="icon" className="hearts-ui-image" />
            </div>
        </div>
    );
};

HeartsUI.propTypes = {
    title: PropTypes.string.isRequired,
    fillNumber: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
};

export default HeartsUI;