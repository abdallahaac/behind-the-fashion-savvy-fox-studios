import React, { useState } from "react";
import "../assets/styles/EnterScreen.css";

function EnterScreen({ onEnter }) {
	const [fadeOut, setFadeOut] = useState(false);

	const handleClick = () => {
		// Trigger the fade-out class, and after the transition ends, call onEnter
		setFadeOut(true);
		setTimeout(() => {
			onEnter();
		}, 500); // match the CSS transition duration
	};

	return (
		<div className={`enter-screen ${fadeOut ? "enter-screen-fade-out" : ""}`}>
			<div className="enter-button" onClick={handleClick}>
				Enter
			</div>
		</div>
	);
}

export default EnterScreen;
