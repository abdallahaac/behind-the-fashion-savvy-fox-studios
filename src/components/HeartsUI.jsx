import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/hearts-ui.css";
import emptyHeart from "../assets/images/empty-heart.svg";
import filledHeart from "../assets/images/filled-heart.svg";

const HeartsUI = ({ title, fillNumber, imageSrc }) => {
	const prevFillNumberRef = useRef(fillNumber);
	const [flashClass, setFlashClass] = useState("");

	// Compare old fillNumber vs new fillNumber to trigger flash
	useEffect(() => {
		if (prevFillNumberRef.current !== fillNumber) {
			if (fillNumber > prevFillNumberRef.current) {
				setFlashClass("flash-green");
			} else if (fillNumber < prevFillNumberRef.current) {
				setFlashClass("flash-red");
			}

			// Match your setTimeout to the total animation duration (3s):
			const timer = setTimeout(() => {
				setFlashClass("");
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [fillNumber]);

	useEffect(() => {
		prevFillNumberRef.current = fillNumber;
	}, [fillNumber]);

	// Create an array of boolean values to determine which hearts are filled
	const hearts = Array(5)
		.fill(false)
		.map((_, index) => index < fillNumber);

	// Log the total number of filled hearts
	const totalFilled = hearts.filter((filled) => filled).length;
	console.log(`${title} hearts - Total hearts filled: ${totalFilled}`);

	return (
		<div
			className={`hearts-ui-container ${flashClass}`}
			onAnimationEnd={() => setFlashClass("")}
		>
			<div className="hearts-ui-left">
				<div className="metric-title label-large">{title}</div>
				<div className="hearts-ui-hearts">
					{hearts.map((filled, index) => {
						console.log(
							`${title} hearts - Heart index ${index} is ${
								filled ? "filled" : "empty"
							}`
						);
						return (
							<span
								key={index}
								className={`heart ${filled ? "filled" : "empty"}`}
							>
								<img
									src={filled ? filledHeart : emptyHeart}
									alt="heart"
									className="heart-icon"
								/>
							</span>
						);
					})}
				</div>
			</div>
			<div className="hearts-ui-right">
				<img src={imageSrc} alt="icon" className="hearts-ui-image" />
			</div>
		</div>
	);
};

HeartsUI.propTypes = {
	title: PropTypes.string.isRequired,
	fillNumber: PropTypes.number.isRequired,
	imageSrc: PropTypes.string.isRequired,
};

export default HeartsUI;
