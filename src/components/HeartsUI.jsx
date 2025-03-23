import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/hearts-ui.css";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

	// Conditionally render an up-caret for "flash-green" or down-caret for "flash-red"
	const renderCaretIcon = () => {
		if (flashClass === "flash-green") {
			return (
				<FontAwesomeIcon
					icon={faCaretUp}
					style={{ color: "green", marginLeft: "8px" }}
				/>
			);
		} else if (flashClass === "flash-red") {
			return (
				<FontAwesomeIcon
					icon={faCaretDown}
					style={{ color: "red", marginLeft: "8px" }}
				/>
			);
		}
		return null;
	};

	return (
		<div
			className={`hearts-ui-container ${flashClass}`}
			onAnimationEnd={() => setFlashClass("")}
		>
			<div className="hearts-ui-left">
				<div style={{ display: "flex", alignItems: "center" }}>
					<div className="metric-title label-large">{title}</div>
					{renderCaretIcon()}
				</div>

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
								{/* If you want to use a regular (outlined) heart for empty: */}
								<FontAwesomeIcon
									icon={filled ? solidHeart : regularHeart}
									className="heart-icon"
									style={{ color: filled ? "red" : "#777" }}
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
