import React from "react";

// Helper function to map font style names to font families
function getFontFamily(fontStyle) {
	switch (fontStyle) {
		case "MINIMALIST":
			return "'DM Sans', sans-serif";
		case "FUTURE":
			return "'Orbitron', sans-serif";
		case "RETRO":
			return "'Kode Mono', monospace";
		case "ELEGANT":
			return "'Instrument Serif', serif";
		case "BOHEMIAN":
			return "'MuseoModerno', cursive";
		case "PLAYFUL":
			return "'DynaPuff', cursive";
		default:
			return "inherit";
	}
}

const fontOptions = [
	"MINIMALIST",
	"FUTURE",
	"RETRO",
	"ELEGANT",
	"BOHEMIAN",
	"PLAYFUL",
];

const FontStyleSelection = ({ selectedOption, setSelectedOption }) => {
	return (
		<div
			className="font-style-selection"
			style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
		>
			{fontOptions.map((option) => (
				<div
					key={option}
					onClick={() => setSelectedOption(option)}
					style={{
						cursor: "pointer",
						padding: "8px 12px",
						fontWeight: selectedOption === option ? "bold" : "normal",
						borderRadius: "20px",
						fontFamily: getFontFamily(option),
						backgroundColor: selectedOption === option ? "#FFEEEB" : "#505050",
						color: selectedOption === option ? "#C83C00" : "WHITE",
						transition: "all 300ms ease",
					}}
				>
					{option}
				</div>
			))}
		</div>
	);
};

export default FontStyleSelection;
