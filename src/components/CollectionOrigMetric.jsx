import React from "react";
import "../assets/styles/collection-orig-metric.css";

const CollectionOriginalityMetric = ({
  label = "Metric Label",
  originalPercentage = 70,
  plagiarizedPercentage = 30,
  summaryText = "Summary text here",
  icon = null,
  showBars = true, // Developer configurable to show or hide bars for more use 
  // add dark mode vs lightmode 
}) => {
  return (
    <div className="collection-originality-metric">
      <div className="metric-label">
        {icon && <div className="icon">{icon}</div>}
        {label}
      </div>

      {/* Conditionally render bars and stats based on the showBars prop */}
      {showBars && (
        <>
          <div className="metric-bar-container">
            <div
              className="original-bar"
              style={{ width: `${originalPercentage}%` }}
            ></div>
            <div
              className="plagiarized-bar"
              style={{ width: `${plagiarizedPercentage}%` }}
            ></div>
          </div>

          <div className="metric-stats">
            <span className="original-percentage">
              <span
                className="color-circle"
                style={{ backgroundColor: "#85E780" }}
              ></span>
              Original Design {originalPercentage}%
            </span>
            <span className="plagiarized-percentage">
              <span
                className="color-circle"
                style={{ backgroundColor: "#FFC4B1" }}
              ></span>
              Plagiarized Design {plagiarizedPercentage}%
            </span>
          </div>
        </>
      )}

      <div className="summary-text">{summaryText}</div>
    </div>
  );
};

export default CollectionOriginalityMetric;
