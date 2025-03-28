import React from "react";
import "../assets/styles/vanguard.css";
import Vanguard1 from "../assets/images/LogoNew.svg";

import Vanguard2 from "../assets/images/Vanguard-1.svg";
import Vanguard3 from "../assets/images/Vanguard-2.svg";
import Vanguard4 from "../assets/images/Vanguard-3.svg";
import { useAudioManager } from "../utils/AudioManager";

function Vanguard({ activeStates, onVanguardClick }) {
	// Define indices for the vanguards (e.g., 0: Exo, 1: Sustainable, 2: Capitalist, etc.)
	const vanguards = [0, 1, 2, 3];
	const vanguardImages = [Vanguard1, Vanguard2, Vanguard3, Vanguard4];
	const { refs, playSound } = useAudioManager();

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
								playSound(refs.uiClickSoundRef);
								onVanguardClick(vIndex);
								
							}
						}}
					>
						<div
							className={`vanguard-inner-circle ${
								activeStates[vIndex] ? "blink-animation" : ""
							}`}
						>
							<img
								src={vanguardImages[vIndex]}
								alt={`Vanguard ${vIndex + 1}`}
								className="logo-vanguard"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Vanguard;
