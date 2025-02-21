import React from "react";
import "../assets/styles/vanguard.css";
import LogoSVG from "../assets/images/logo.svg";

function Vanguard({ activeStates, onVanguardClick }) {
	// Define indices for the vanguards (in your case, 4 items)
	const vanguards = [0, 1, 2, 3];

	return (
		<div className="vanguard-parent-container">
			<div className="vanguard-container">
				{vanguards.map((vIndex) => (
					<div
						key={vIndex}
						className={`vanguard ${
							activeStates[vIndex] ? "vanguard-active" : ""
						}`}
						onClick={() => {
							if (activeStates[vIndex]) {
								onVanguardClick(vIndex);
							}
						}}
					>
						<div
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
