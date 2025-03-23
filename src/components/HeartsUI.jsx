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
	const [difference, setDifference] = useState(0);

	// Compare old fillNumber vs new fillNumber to trigger flash
	useEffect(() => {
		if (prevFillNumberRef.current !== fillNumber) {
			const diff = fillNumber - prevFillNumberRef.current;
			setDifference(Math.abs(diff));

			if (diff > 0) {
				setFlashClass("flash-green");
			} else if (diff < 0) {
				setFlashClass("flash-red");
			}

			// Match your setTimeout to the total animation duration (3s):
			const timer = setTimeout(() => {
				setFlashClass("");
				setDifference(0); // Reset difference after the animation
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

	// Conditionally render multiple carets based on how many hearts gained or lost
	const renderCaretIcons = () => {
		if (flashClass === "flash-green") {
			// Hearts increased => up-caret repeated `difference` times
			return new Array(difference)
				.fill(null)
				.map((_, i) => (
					<FontAwesomeIcon
						key={i}
						icon={faCaretUp}
						style={{ color: "green", marginLeft: "4px" }}
					/>
				));
		} else if (flashClass === "flash-red") {
			// Hearts decreased => down-caret repeated `difference` times
			return new Array(difference)
				.fill(null)
				.map((_, i) => (
					<FontAwesomeIcon
						key={i}
						icon={faCaretDown}
						style={{ color: "red", marginLeft: "4px" }}
					/>
				));
		}
		return null;
	};

	// Log total hearts for debugging
	const totalFilled = hearts.filter((filled) => filled).length;
	console.log(`${title} hearts - Total hearts filled: ${totalFilled}`);

	return (
		<div
			className={`hearts-ui-container ${flashClass}`}
			onAnimationEnd={() => {
				setFlashClass("");
				setDifference(0); // Also reset difference on animation end
			}}
		>
			<div className="hearts-ui-left">
				<div style={{ display: "flex", alignItems: "center" }}>
					<div className="metric-title label-large">{title}</div>
					{renderCaretIcons()}
				</div>

				<div className="hearts-ui-hearts">
					{hearts.map((filled, index) => (
						<span
							key={index}
							className={`heart ${filled ? "filled" : "empty"}`}
						>
							<FontAwesomeIcon
								icon={filled ? solidHeart : regularHeart}
								className="heart-icon"
								style={{ color: filled ? "red" : "#777" }}
							/>
						</span>
					))}
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
