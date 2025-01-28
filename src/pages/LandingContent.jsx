import React from "react";
// We no longer use useNavigate here, because we won't navigate, we'll animate the camera instead.
// import { useNavigate } from "react-router-dom";

// Image imports for LandingPage content
import right_arrow from "../assets/images/right-arrow.svg";
import wordmark from "../assets/images/Savvy Fox Logo Wordmark.png";
import production from "../assets/images/A Savvy Fox Studios production.png";
// (BackgroundImage import not strictly necessary if you don't display it here)

export const LandingContent = ({ onStartExp }) => {
  /**
   * We receive onStartExp (a function) from Intro.jsx. This function
   * animates the camera's x position. The code below calls that instead of navigating.
   */
  const handleStartExp = (e) => {
    e.preventDefault();
    if (onStartExp) {
      onStartExp();
    }
  };

  return (
    <div className="landing-content" style={{ width: "100%" }}>
      <div className="text-content fade-in">
        <div className="landing-header fade-in">
          <h1 className="accent-5">BEHIND THE FASHION</h1>
          <h2 className="accent-6">// LANDING PAGE</h2>
        </div>
        <div className="landing-body fade-in">
          <h1 className="landing-h1 landing-page">
            STEP INTO THE ROLE OF A FASHION BRAND CEO.
          </h1>
          <p className="body-text-medium">
            Experience what it's like to build a fashion brand from the ground
            up, while <br /> managing crucial factors such as budget, audience,
            and sustainability.
          </p>
        </div>
        <button
          id="start-button"
          className="add-button body-text-medium fade-in"
          onClick={handleStartExp}
        >
          Start the Experience
          <div className="button-icon">
            <img src={right_arrow} alt="Right Arrow Icon" />
          </div>
        </button>
        <div className="credits-container fade-in">
          <img className="wordmark" src={wordmark} alt="Savvy Fox Logo" />
          <img src={production} alt="A Savvy Fox Studios production" />
        </div>
      </div>

      <div className="intro-image model-container fade-in">
        {/* If you want to display a background image, uncomment:
            <img src={BackgroundImage} alt="Background" />
          Or any additional 3D elements, etc. */}
      </div>
    </div>
  );
};
