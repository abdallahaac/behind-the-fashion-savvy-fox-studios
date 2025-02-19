import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/hot-seat.css"; // Make sure to create and style this CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Hotseat = ({ mode, currentStep, onNext, onDone, question, answers, funding, result, totalSteps }) => {
    const renderContent = () => {
        switch (mode) {
            case "Quiz":
                return (
                    <>
                        <span className="vanguard-tutorial-step-title accent-5">Question {currentStep}</span>
                        <p className="tutorial-description">{question}</p>
                        <div className="hotseat-answers body-text-small">
                            {answers.map((answer, index) => (
                                <div key={index} className="hotseat-answer">
                                    <input type="radio" id={`answer-${index}`} name="answer" />
                                    <label htmlFor={`answer-${index}`}>{answer}</label>
                                </div>
                            ))}
                        </div>
                        <button className="nav-button-tut nav-next" onClick={onNext}>
                            Answer
                            <FontAwesomeIcon icon={faArrowRight} className="icon-right" />
                        </button>
                    </>
                );
            case "Result":
                return (
                    <>
                        <span className="vanguard-tutorial-step-title accent-5">Result</span>
                        <div className="hotseat-result">
                            <div className="hotseat-funding accent-5">{funding}</div>
                            <div className={`body-text-small hotseat-amount ${result > 0 ? "win" : "lose"}`}>
                                {result > 0 ? `+${result}` : result}
                            </div>
                        </div>
                        <button className="nav-button-tut nav-next" onClick={currentStep < totalSteps - 1 ? onNext : onDone}>
                            {currentStep < totalSteps - 1 ? "Next" : "Done"}
                            <FontAwesomeIcon icon={faArrowRight} className="icon-right" />
                        </button>
                    </>
                );
            case "Normal":
            default:
                return (
                    <>
                        <span className="vanguard-tutorial-step-title accent-5">THE HOT SEAT</span>
                        <p className="tutorial-description">Get ready to answer some questions and win some money!</p>
                        <button className="nav-button-tut nav-next" onClick={onNext}>
                            Start
                            <FontAwesomeIcon icon={faArrowRight} className="icon-right" />
                        </button>
                    </>
                );
        }
    };

    return (
        <div className="tutorial-container" id="hotseat"> 
            <div className="step-container">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <span
                        key={index}
                        className={`vanguard-tutorial-step ${index <= currentStep ? "active-step" : "inactive-step"}`}
                    ></span>
                ))}
            </div>

            <div className="vanguard-tutorial-svg">
                <img src="../assets/images/Vanguards/sims-hotseat.svg" alt="Hotseat" />
            </div>

            <div className="vanguard-tutorial-step-description">
                {renderContent()}
            </div>

            <div className="next-btn">
                {/* Removed the back button */}
            </div>
        </div>
    );
};

Hotseat.propTypes = {
    mode: PropTypes.oneOf(["Normal", "Quiz", "Result"]).isRequired,
    currentStep: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    question: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.string),
    funding: PropTypes.string,
    result: PropTypes.number,
    totalSteps: PropTypes.number.isRequired,
};

export default Hotseat;