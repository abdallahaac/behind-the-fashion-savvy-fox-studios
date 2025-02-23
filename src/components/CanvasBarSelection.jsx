// CanvasBarSelection.jsx
import React from "react";
import { useModels } from "../utils/ModelsContext";

import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasBarSelection = ({ selectedModelIndex, setSelectedModelIndex }) => {
	const { CanvasOutfitsData } = useModels();

	const handlePrev = () => {
		setSelectedModelIndex((prev) =>
			prev === 0 ? CanvasOutfitsData.length - 1 : prev - 1
		);
	};

	const handleNext = () => {
		setSelectedModelIndex((prev) =>
			prev === CanvasOutfitsData.length - 1 ? 0 : prev + 1
		);
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
							onClick={() => setSelectedModelIndex(idx)}
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
