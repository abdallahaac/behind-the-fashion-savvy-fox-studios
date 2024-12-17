import React, { useState } from "react";
import "../assets/styles/ModelList.css";

const ModelList = () => {
	const totalModels = 9; // Total number of models
	const [selectedModel, setSelectedModel] = useState(1);

	const handleModelClick = (modelNumber) => {
		setSelectedModel(modelNumber);
		console.log(`Selected Model: ${modelNumber}`);
	};

	return (
		<div className="model-list-container">
			<button
				className="nav-button"
				onClick={() => handleModelClick(Math.max(selectedModel - 1, 1))}
			>
				&lt;
			</button>

			<div className="model-buttons">
				{Array.from({ length: totalModels }, (_, i) => (
					<button
						key={i + 1}
						className={`model-button ${
							selectedModel === i + 1 ? "active" : ""
						}`}
						onClick={() => handleModelClick(i + 1)}
					>
						{String(i + 1).padStart(2, "0")}
					</button>
				))}
			</div>

			<button
				className="nav-button"
				onClick={() =>
					handleModelClick(Math.min(selectedModel + 1, totalModels))
				}
			>
				&gt;
			</button>
		</div>
	);
};

export default ModelList;
