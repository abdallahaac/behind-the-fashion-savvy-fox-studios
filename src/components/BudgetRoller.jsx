// BudgetRoller.js
import React, { useState, useEffect } from "react";
import "../assets/styles/budget-roller.css";
import RandomizeIcon from "../assets/images/shuffle.svg";

const generateRandomNumber = () => {
	const min = 20000;
	const max = 150000;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DigitRoller = ({ digit, rolling, delay }) => {
	const [currentDigit, setCurrentDigit] = useState(0);

	useEffect(() => {
		if (rolling) {
			const interval = setInterval(() => {
				setCurrentDigit(Math.floor(Math.random() * 10)); // Generate random digit 0-9
			}, 50);

			const timeout = setTimeout(() => {
				clearInterval(interval);
				setCurrentDigit(parseInt(digit, 10));
			}, 2000 + delay);

			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		} else {
			setCurrentDigit(parseInt(digit, 10));
		}
	}, [rolling, digit, delay]);

	return (
		<div className="digit">
			<div className="digit-value accent-1">
				{isNaN(currentDigit) ? "-" : currentDigit}
			</div>
		</div>
	);
};

const BudgetRoller = ({ onRollDone }) => {
	const [number, setNumber] = useState("------");
	const [rolling, setRolling] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleRoll = () => {
		setRolling(true);
		setButtonDisabled(true);

		setTimeout(() => {
			const newNumber = generateRandomNumber();
			setNumber(newNumber.toString().padStart(6, "0"));

			// Pass the actual numeric budget back to the parent
			onRollDone(newNumber);

			setRolling(false);
		}, 2000); // length of rolling animation
	};

	const numberString =
		number !== null ? number.toString().padStart(6, "0") : "000000";

	// Format the number as XXX,XXX
	const numberWithComma = `${numberString.slice(0, 3)},${numberString.slice(
		3
	)}`;

	return (
		<div className="budget-roller">
			<div className="number-display">
				<div className="currency accent-1">$</div>
				{numberWithComma.split("").map((char, index) =>
					char === "," ? (
						<div key={index} className="comma accent-1">
							,
						</div>
					) : (
						<DigitRoller
							key={index}
							digit={char}
							rolling={rolling}
							delay={index * 100}
						/>
					)
				)}
			</div>
			<button
				id="roll-button"
				className="add-button"
				onClick={handleRoll}
				disabled={buttonDisabled}
				style={{
					backgroundColor: buttonDisabled ? "#F0F0F0" : "#C83C00",
					cursor: buttonDisabled ? "not-allowed" : "pointer",
				}}
			>
				{rolling ? "Rolling..." : "Randomize Budget"}
				<div id="next-button" className="button-icon">
					<img src={RandomizeIcon} alt="Randomize icon" />
				</div>
			</button>
		</div>
	);
};

export default BudgetRoller;
