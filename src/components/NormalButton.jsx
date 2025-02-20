import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/selection-panel.css"; // Ensure this file contains the necessary styles

const NormalButton = ({ text, icon, size, active, disabled, onClick }) => {
    const { minWidth, minHeight } = size;

    return (
        <button
            className={`button ${disabled ? "button-disabled" : active ? "button-active" : ""}`}
            style={{ minWidth, minHeight }}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="button-text">{text}</span>
            {icon && <img src={icon} alt="icon" className="button-icon" />}
        </button>
    );
};

NormalButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    size: PropTypes.shape({
        minWidth: PropTypes.string,
        minHeight: PropTypes.string,
    }),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

NormalButton.defaultProps = {
    icon: null,
    size: { minWidth: "125px", minHeight: "56px" },
    active: false,
    disabled: false,
    onClick: () => {},
};

export default NormalButton;