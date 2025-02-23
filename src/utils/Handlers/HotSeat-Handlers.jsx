// HotSeat-Handlers.js
export const handleNext = (
	mode,
	setMode,
	questionIndex,
	setQuestionIndex,
	selectedQuestions,
	setCurrentStep,
	setResult,
	setFundingAmount // <--- the context setter
) => {
	if (mode === "Normal") {
		setMode("Quiz");
		setCurrentStep((prev) => prev + 1);
	} else if (mode === "Quiz") {
		const selectedAnswer = document.querySelector(
			'input[name="answer"]:checked'
		)?.nextSibling.textContent;

		if (!selectedAnswer) {
			alert("Please select an answer before proceeding.");
			return;
		}

		setMode("Result");
		const selectedQuestion = selectedQuestions[questionIndex];
		const correctAnswer = selectedQuestion.correctAnswer;

		if (selectedAnswer === correctAnswer) {
			setResult(selectedQuestion.winAmount);
			// Increase total funding by winAmount
			setFundingAmount((prev) => prev + selectedQuestion.winAmount);
		} else {
			setResult(selectedQuestion.loseAmount);
			// Decrease (or possibly add negative) from the total
			setFundingAmount((prev) => prev + selectedQuestion.loseAmount);
		}
	} else if (mode === "Result") {
		if (questionIndex < selectedQuestions.length - 1) {
			setQuestionIndex((prev) => prev + 1);
			setMode("Quiz");
		} else {
			// If no more questions, reset
			setMode("Normal");
			setQuestionIndex(0);
		}
		setCurrentStep((prev) => prev + 1);
	}
};

export const handleDone = (setMode, setCurrentStep, setQuestionIndex) => {
	setMode("Normal");
	setCurrentStep(0);
	setQuestionIndex(0);
};
