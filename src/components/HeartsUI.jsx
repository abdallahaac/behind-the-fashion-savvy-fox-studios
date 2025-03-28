import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/hearts-ui.css";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Audio
import { useAudioManager } from "../utils/AudioManager";

// ECO VANGUARD REACTION IMAGES
import EcoSideDisapprove from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side_Disapprove.svg";
import EcoSideHappy from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side_Happy.svg";
import EcoSideLove from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side_Love.svg";
import EcoSideNeutral from "../assets/images/Vanguards/Vanguard_Eco/Eco_Side_Neutral.svg";

// WEALTH VANGUARD REACTION IMAGES
import WealthSideDisapprove from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side_Disapprove.svg";
import WealthSideHappy from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side_Happy.svg";
import WealthSideLove from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side_Love.svg";
import WealthSideNeutral from "../assets/images/Vanguards/Vanguard_Wealth/Wealth_Side_Neutral.svg";

// ETHIC VANGUARD REACTION IMAGES
import EthicSideDisapprove from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side_Disapprove.svg";
import EthicSideHappy from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side_Happy.svg";
import EthicSideLove from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side_Love.svg";
import EthicSideNeutral from "../assets/images/Vanguards/Vanguard_Ethic/Ethic_Side_Neutral.svg";

/**
 * Maps the new fillNumber and the heart difference to a corresponding reaction image.
 * - If hearts decreased (difference < 0), always return the "disapprove" image.
 * - Otherwise, for an increase, return an image based on the final fillNumber:
 *    0 → disapprove; 1-2 → neutral; 3-4 → happy; 5 → love.
 */
function getReactionImage(title, fillNumber, difference) {
	let disapprove, neutral, happy, love;
	if (title.toUpperCase().includes("ECO")) {
		disapprove = EcoSideDisapprove;
		neutral = EcoSideNeutral;
		happy = EcoSideHappy;
		love = EcoSideLove;
	} else if (title.toUpperCase().includes("WEALTH")) {
		disapprove = WealthSideDisapprove;
		neutral = WealthSideNeutral;
		happy = WealthSideHappy;
		love = WealthSideLove;
	} else if (title.toUpperCase().includes("ETHIC")) {
		disapprove = EthicSideDisapprove;
		neutral = EthicSideNeutral;
		happy = EthicSideHappy;
		love = EthicSideLove;
	} else {
		return null;
	}

	if (difference < 0) {
		return disapprove;
	}

	if (difference === 0) {
		return null;
	}

	if (fillNumber === 0) {
		return disapprove;
	} else if (fillNumber === 1 || fillNumber === 2) {
		return neutral;
	} else if (fillNumber === 3 || fillNumber === 4) {
		return happy;
	} else if (fillNumber === 5) {
		return love;
	}
	return null;
}

const HeartsUI = ({ title, fillNumber, imageSrc }) => {
	const { refs, playSound } = useAudioManager(); // Access audio refs and playSound
	const prevFillNumberRef = useRef(fillNumber);
	const [flashClass, setFlashClass] = useState("");
	const [difference, setDifference] = useState(0);
	// currentImage holds the permanent image (reaction or default)
	const [currentImage, setCurrentImage] = useState(imageSrc);

	// Update currentImage if the parent changes the default imageSrc
	useEffect(() => {
		setCurrentImage(imageSrc);
	}, [imageSrc]);

	// Play sound when hearts change
    useEffect(() => {
        if (refs.heartsSoundRef && difference !== 0) { // Only play sound if hearts changed
            playSound(refs.heartsSoundRef);
        }
    }, [difference, refs, playSound]); // Trigger when `difference` changes

	// Compare old fillNumber vs new fillNumber to trigger flash and update reaction image
	useEffect(() => {
		if (prevFillNumberRef.current !== fillNumber) {
			const diff = fillNumber - prevFillNumberRef.current;
			setDifference(diff); // keep sign to detect gain or loss

			if (diff > 0) {
				setFlashClass("flash-green");
			} else if (diff < 0) {
				setFlashClass("flash-red");
			}

			const reactionImage = getReactionImage(title, fillNumber, diff);
			if (reactionImage) {
				setCurrentImage(reactionImage);
			}
			// Set timeout to clear the flash class (but do not change currentImage)
			const timer = setTimeout(() => {
				setFlashClass("");
				setDifference(0);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [fillNumber, title]);

	useEffect(() => {
		prevFillNumberRef.current = fillNumber;
	}, [fillNumber]);

	// Create an array for rendering hearts
	const hearts = Array(5)
		.fill(false)
		.map((_, index) => index < fillNumber);

	// Render multiple caret icons based on the number of hearts gained/lost
	const renderCaretIcons = () => {
		if (flashClass === "flash-green") {
			const count = Math.abs(difference);
			return new Array(count)
				.fill(null)
				.map((_, i) => (
					<FontAwesomeIcon
						key={i}
						icon={faCaretUp}
						style={{ color: "green", marginLeft: "4px" }}
					/>
				));
		} else if (flashClass === "flash-red") {
			const count = Math.abs(difference);
			return new Array(count)
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

	return (
		<div
			className={`hearts-ui-container ${flashClass}`}
			onAnimationEnd={() => {
				setFlashClass("");
				setDifference(0);
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
				<img src={currentImage} alt="icon" className="hearts-ui-image" />
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
