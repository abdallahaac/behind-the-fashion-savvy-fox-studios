import React, { useState, useEffect } from "react";
import { useModels } from "../utils/ModelsContext";
import "../assets/styles/ModelList.css";

const ModelList = () => {
	// Access models from context
	const modelsByCategory = useModels();

	// Flatten models into a single array
	const models = [
		...modelsByCategory.EthicallyStrongOptions,
		...modelsByCategory.CapitalisticChoices,
		...modelsByCategory.NeutralChoices,
	];

	// Ensure models array is not empty
	const [selectedModel, setSelectedModel] = useState(
		models.length > 0 ? models[0].id : null
	);

	// Log the selected model whenever it changes
	useEffect(() => {
		if (selectedModel !== null) {
			const model = models.find((m) => m.id === selectedModel);
			if (model) {
				console.log(`Selected Model: ${model.name} (ID: ${model.id})`);
			}
		}
	}, [selectedModel, models]);

	const handleModelClick = (model) => {
		setSelectedModel(model.id);
	};

	if (models.length === 0) {
		// Handle the case when there are no models
		return <div>No models available</div>;
	}

	return (
		<div className="model-list-container">
			<button
				className="nav-button"
				onClick={() => setSelectedModel((prev) => (prev > 1 ? prev - 1 : prev))}
			>
				&lt;
			</button>

			<div className="model-buttons">
				{models.map((model) => (
					<button
						key={model.id}
						className={`model-button ${
							selectedModel === model.id ? "active" : ""
						}`}
						onClick={() => handleModelClick(model)}
					>
						{String(model.id).padStart(2, "0")}
					</button>
				))}
			</div>

			<button
				className="nav-button"
				onClick={() =>
					setSelectedModel((prev) => (prev < models.length ? prev + 1 : prev))
				}
			>
				&gt;
			</button>
		</div>
	);
};

export default ModelList;
