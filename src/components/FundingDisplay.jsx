import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/hot-seat.css"; 

const FundingDisplay = ({ result }) => {
    return (
        <div className="hotseat-result">
            <div className="hotseat-funding accent-5">$ FUNDING</div>
            {/* give a win or lose tag to change color of the result amount */}
            <div className={`accent-3 hotseat-amount ${result > 0 ? "win" : "lose"}`}>
                {result > 0 ? `+${result}` : result}
            </div>
        </div>
    );
};

FundingDisplay.propTypes = {
    result: PropTypes.number.isRequired,
};

export default FundingDisplay;