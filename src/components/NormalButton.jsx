import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/selection-panel.css"; 

const NormalButton = ({ text, icon, size, disabled, active, onClick }) => {
    const { minWidth, minHeight } = size;

    return (
        <button
            className={`button ${active ? "button-active" : ""}`}
            style={{ minWidth, minHeight }}
            onClick={onClick}
        >
            <span className="button-text">{text}</span>
            {icon && <img src={icon} alt="icon" className="button-icon" />}
        </button>
    );
};

NormalButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
    size: PropTypes.shape({
        minWidth: PropTypes.string,
        minHeight: PropTypes.string,
    }),
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};

NormalButton.defaultProps = {
    icon: null,
    size: { minWidth: "125px", minHeight: "56px" },
    disabled: false,
    active: false,
    onClick: () => {},
};

export default NormalButton;