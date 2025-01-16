// FontStyleSelection.js
import React from "react";

const FontStyleSelection = ({ selectedOption, setSelectedOption }) => {
	const fontOptions = [
		"Future",
		"Minimalist",
		"Retro",
		"Elegant",
		"Bohemian",
		"Playful",
	];

	const handleOptionClick = (option) => {
		if (selectedOption === option) {
			// Deselect if the same option is clicked
			setSelectedOption(null);
		} else {
			// Select the new option
			setSelectedOption(option);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "8px",
				marginTop: "16px",
			}}
		>
			{/* Font Style Header */}
			<div
				style={{
					fontFamily: "'DM Sans', sans-serif",
					fontSize: "12px",
					fontWeight: "bold",
					color: "#FFFFFF",
					textTransform: "uppercase",
				}}
			>
				Font Style
			</div>

			{/* Font Style Options */}
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "8px",
				}}
			>
				{fontOptions.map((text) => {
					const active = selectedOption === text;
					return (
						<div
							key={text}
							onClick={() => handleOptionClick(text)}
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								padding: "4px 12px",
								borderRadius: "32px",
								background: active ? "#FFEEEB" : "#FFFEFD",
								color: active ? "#C83C00" : "#0F0F0F",
								fontFamily: active ? "'Kode Mono'" : "'DM Sans'",
								fontWeight: active ? "700" : "400",
								fontSize: "12px",
								textTransform: "uppercase",
								cursor: "pointer",
								border: "1px solid transparent",
								minWidth: "60px",
								textAlign: "center",
							}}
						>
							{text}
							{active && (
								<span
									style={{
										marginLeft: "8px",
										color: "#C83C00",
										fontWeight: "bold",
										cursor: "pointer",
									}}
								>
									×
								</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FontStyleSelection;
