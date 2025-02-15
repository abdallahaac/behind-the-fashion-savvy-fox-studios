import React from "react";
import "../assets/styles/vanguard.css";
import LogoSVG from "../assets/images/logo.svg"; // Assuming the SVG is imported as a file path

function Vanguard() {
	return (
		<div className="vanguard-parent-container">
			<div className="vanguard-container">
				<div className="vanguard">
					<div className="vanguard-inner-circle">
						<img src={LogoSVG} alt="Logo" className="logo-vanguard" />
					</div>
				</div>

				<div className="vanguard">
					<div className="vanguard-inner-circle">
						<img src={LogoSVG} alt="Logo" className="logo-vanguard" />
					</div>
				</div>

				<div className="vanguard">
					<div className="vanguard-inner-circle">
						<img src={LogoSVG} alt="Logo" className="logo-vanguard" />
					</div>
				</div>

				<div className="vanguard">
					<div className="vanguard-inner-circle">
						<img src={LogoSVG} alt="Logo" className="logo-vanguard" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Vanguard;
