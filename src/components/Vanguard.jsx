import React, { useState } from "react";
import "../assets/styles/vanguard.css";
import LogoSVG from "../assets/images/logo.svg"; // Adjust path as needed
import Tutorial from "./Tutorial";

function Vanguard() {
	// Track which Vanguards are active. For 4 items, we have an array of 4 booleans.
	// By default, all are false (no border, no animation).
	const [activeStates, setActiveStates] = useState([
		false,
		false,
		false,
		false,
	]);

	// Toggle a specific Vanguard's active state
	const handleToggle = (index) => {
		setActiveStates((prev) => {
			const updated = [...prev];
			updated[index] = !updated[index];
			return updated;
		});
	};

	// For convenience, define how many Vanguards we want to render
	const vanguards = [0, 1, 2, 3];

	return (
		<div className="vanguard-parent-container">
			<div className="vanguard-container">
				{vanguards.map((vIndex) => (
					<div
						key={vIndex}
						// Conditionally add a class if activeStates[vIndex] is true
						className={`vanguard ${
							activeStates[vIndex] ? "vanguard-active" : ""
						}`}
						onClick={() => handleToggle(vIndex)}
					>
						<div
							// Conditionally add the blinking class
							className={`vanguard-inner-circle ${
								activeStates[vIndex] ? "blink-animation" : ""
							}`}
						>
							<img src={LogoSVG} alt="Logo" className="logo-vanguard" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Vanguard;
