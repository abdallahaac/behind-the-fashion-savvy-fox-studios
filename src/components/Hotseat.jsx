import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/hot-seat.css"; // Make sure to create and style this CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Hotseat = ({ mode, currentStep, onNext, onDone, question, answers, funding, result, totalSteps }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerChange = (index) => {
        setSelectedAnswer(index);
    };

    const handleNext = () => {
        setSelectedAnswer(null); // Reset the selected answer
        onNext();
    };

    const renderContent = () => {
        switch (mode) {
            case "Quiz":
                return (
                    <>
                        <span className="vanguard-tutorial-step-title accent-5">Question {currentStep}</span>
                        <p className="tutorial-description body-text-small">{question.question}</p>
                        <div className="hotseat-answers body-text-small">
                            {answers.map((answer, index) => (
                                <div key={index} className={`hotseat-answer ${selectedAnswer === index ? 'checked' : ''}`}>
                                    <input
                                        type="radio"
                                        id={`answer-${index}`}
                                        name="answer"
                                        onChange={() => handleAnswerChange(index)}
                                        checked={selectedAnswer === index}
                                    />
                                    <label htmlFor={`answer-${index}`}>{answer}</label>
                                </div>
                            ))}
                        </div>
                        <button className="nav-button-tut nav-next" onClick={handleNext}>
                            Answer
                            <FontAwesomeIcon icon={faArrowRight} className="icon-right" />
                        </button>
                    </>
                );
            case "Result":
                return (
                    <>
                        <div className="vanguard-tutorial-step-title accent-5">
                            {result > 0 ? "CORRECT!" : "WRONG!"}
                            <p className="body-text-small">{question.reasoning}</p>
                        </div>
                        <div className="hotseat-result">
                            <div className="hotseat-funding accent-5">$ FUNDING</div>
                            <div className={`accent-3 hotseat-amount ${result > 0 ? "win" : "lose"}`}>
                                {result > 0 ? `+${result}` : result}
                            </div>
                        </div>
                        <button className="nav-button-tut nav-next" onClick={currentStep < totalSteps - 1 ? handleNext : onDone}>
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
                        <button className="nav-button-tut nav-next" onClick={handleNext}>
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
                        className={`vanguard-tutorial-step ${index <= currentStep ? "hotseat-active-step" : "hotseat-inactive-step"}`}
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
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        reasoning: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    funding: PropTypes.string,
    result: PropTypes.number,
    totalSteps: PropTypes.number.isRequired,
};

export default Hotseat;