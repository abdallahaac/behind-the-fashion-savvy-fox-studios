import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/hot-seat.css"; // Make sure to create and style this CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import right_arrow from "../assets/images/right-arrow.svg";

import FundingDisplay from "./FundingDisplay";
import NormalButton from "./NormalButton";

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
                        <div className="hotseat-button-container">
                            <NormalButton
                                text="Answer"
                                icon={right_arrow}
                                size={{ minWidth: "132px", minHeight: "56px" }}
                                active={true}
                                onClick={handleNext}
                            />
                        </div>
                        
                    </>
                );
            case "Result":
                return (
                    <>
                        <div className="vanguard-tutorial-step-title accent-5">
                            {result > 0 ? "CORRECT!" : "WRONG!"}
                            <p className="body-text-small" style={{ fontWeight: 'normal' }}>{question.reasoning}</p>
                        </div>
                        <FundingDisplay result={result} />

                        <div className="hotseat-button-container">
                            <NormalButton
                                text={currentStep < totalSteps - 1 ? "Next" : "Done"}
                                icon={right_arrow}
                                size={{ minWidth: "132px", minHeight: "56px" }}
                                active={true}
                                onClick={currentStep < totalSteps - 1 ? handleNext : onDone}
                            />
                        </div>
                    </>
                );
            case "Normal":
            default:
                return (
                    <>
                        <span className="vanguard-tutorial-step-title accent-5">THE HOT SEAT</span>
                        <p className="tutorial-description">Our turn to ask you questions!</p>

                        <div className="hotseat-button-container">
                            <NormalButton
                                text="Let's Go"
                                icon={right_arrow}
                                size={{ minWidth: "132px", minHeight: "56px" }}
                                active={true}
                                onClick={handleNext}
                            />
                        </div>
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

            <div className="vanguard-tutorial-step-description" id="hotseat-quiz-inner-content">
                {renderContent()}
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