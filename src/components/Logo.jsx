import React from "react";
import Marquee from "react-fast-marquee";
import LogoSVG from "../assets/images/logo.svg"; // Assuming you've imported the SVG as a React component via a bundler or as a file path

const Logo = () => {
	const handleClick = () => {
		console.log("Purchase button clicked!");
	};

	return (
		<button className="logo-button" onClick={handleClick}>
			<Marquee gradient={false} speed={30} pauseOnHover={false}>
				&nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
			</Marquee>
			<img src={LogoSVG} alt="Logo" className="superimposed-logo" />
		</button>
	);
};

export default Logo;
