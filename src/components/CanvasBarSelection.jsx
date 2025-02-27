import React from "react";
import { useModels } from "../utils/ModelsContext";

import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasBarSelection = ({
	selectedModelIndex,
	setSelectedModelIndex,
	onOutfitSelect, // <--- NEW: callback from Room to animate outfits
	//
}) => {
	const { CanvasOutfitsData } = useModels();

	const handlePrev = () => {
		const newIndex =
			selectedModelIndex === 0
				? CanvasOutfitsData.length - 1
				: selectedModelIndex - 1;
		setSelectedModelIndex(newIndex);
		if (onOutfitSelect) {
			const outfitKey = `Outfit${CanvasOutfitsData[newIndex].id}`;
			onOutfitSelect(outfitKey);
		}
	};

	const handleNext = () => {
		const newIndex =
			selectedModelIndex === CanvasOutfitsData.length - 1
				? 0
				: selectedModelIndex + 1;
		setSelectedModelIndex(newIndex);
		if (onOutfitSelect) {
			const outfitKey = `Outfit${CanvasOutfitsData[newIndex].id}`;
			onOutfitSelect(outfitKey);
		}
	};

	const handleButtonClick = (outfit, idx) => {
		setSelectedModelIndex(idx);
		if (onOutfitSelect) {
			// Convert numeric ID (1..9) to the actual outfit key "Outfit1".. "Outfit9"
			const outfitKey = `Outfit${outfit.id}`;
			onOutfitSelect(outfitKey);
		}
	};

	return (
		<div className="canvas-list">
			<div className="model-list-container canvas-list">
				<button className="nav-button" onClick={handlePrev}>
					&lt;
				</button>

				<div className="model-buttons">
					{CanvasOutfitsData.map((outfit, idx) => (
						<button
							key={outfit.id}
							className={`accent-6 model-button ${
								idx === selectedModelIndex ? "active" : ""
							}`}
							onClick={() => handleButtonClick(outfit, idx)}
						>
							{outfit.id < 10 ? `0${outfit.id}` : outfit.id}
						</button>
					))}
				</div>

				<button className="nav-button" onClick={handleNext}>
					&gt;
				</button>
			</div>
		</div>
	);
};

export default CanvasBarSelection;
