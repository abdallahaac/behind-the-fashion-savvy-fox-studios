import React, { useEffect } from "react";
import { useModels } from "../utils/ModelsContext";
import "../assets/styles/ModelList.css";
import { useAudioManager } from "../utils/AudioManager";

const ModelList = ({ selectedModel, onModelChange, models }) => {

	const { refs, playSound } = useAudioManager();

	useEffect(() => {
		if (selectedModel) {
			console.log(
				`Selected Model: ${selectedModel.name} (ID: ${selectedModel.id})`
			);
			console.log(selectedModel);
		}
	}, [selectedModel]);

	const handleModelClick = (model) => {
		console.log("UI Transition Sound Ref:", refs.uiTransitionRef.current); // Debugging log
		playSound(refs.uiTransitionRef);

		onModelChange(model); // Update the selected model
	};

	return (
		<div className="model-list-container">
			<button
				className="nav-button"
				onClick={() =>
					onModelChange((prev) =>
						prev && prev.id > 1
							? models.find((m) => m.id === prev.id - 1)
							: prev
					)
				}
			>
				&lt;
			</button>

			<div className="model-buttons">
				{models.map((model) => (
					<button
						key={model.id}
						className={`accent-6 model-button ${
							selectedModel && selectedModel.id === model.id ? "active" : ""
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
					onModelChange((prev) =>
						prev && prev.id < models.length
							? models.find((m) => m.id === prev.id + 1)
							: prev
					)
				}
			>
				&gt;
			</button>
		</div>
	);
};

export default ModelList;
