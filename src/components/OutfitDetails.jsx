import React from "react";
import "../assets/styles/outfit-details.css";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import greenHeart from "../assets/images/green-heart.svg";

const OutfitDetails = ({ selectedModel, onAddToCollection, collection }) => {
	if (!selectedModel) {
		return <div className="design-card">Select a model to see details</div>;
	}

	// Disable the button if collection length is 3
	const isAddDisabled = collection.length >= 3;

	return (
		<div className="design-card">
			<div>
				<span className="look-number label-large">
					LOOK #{String(selectedModel.id).padStart(2, "0")}
				</span>
			</div>
			<h1 className="title accent-2">{selectedModel.name.toUpperCase()}</h1>
			<div className="feature">
				<span className="icon thumbs-up">
					<img
						src={greenThumb}
						alt="Sustainability Icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</span>
				<span className="feature-text body-text-medium">
					{selectedModel.sustainability * 20}% Sustainability
				</span>
			</div>
			<div className="p_bar-description">
				<div className="progress-bar-2">
					<div
						className="progress-fill"
						style={{ width: `${selectedModel.sustainability * 20}%` }}
					></div>
				</div>
				<p className="description body-text-small">
					{selectedModel.description}
				</p>
			</div>

			<div className="feature">
				<span className="icon heart">
					<img
						src={greenHeart}
						alt="Popularity Icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</span>
				<span className="feature-text body-text-medium">
					{selectedModel.popularity * 20}% Popularity
				</span>
			</div>

			<div className="feature">
				<span className="icon thumbs-down">
					<img
						src={redThumb}
						alt="Ethics Icon"
						style={{ width: "24px", height: "24px" }}
					/>
				</span>
				<span className="feature-text body-text-medium">
					{selectedModel.ethics * 20}% Ethics
				</span>
			</div>
			<div className="p_bar-description">
				<p className="description body-text-small">
					Considerations for ethics and sustainability can influence the broader
					impact of your choices.
				</p>
			</div>

			<div className="cost-row">
				<div className="cost">
					<h2 className="accent-3">${selectedModel.cost}</h2>
					<span className="label-large">COST OF DESIGN</span>
				</div>
				<button
					className="add-button body-text-medium"
					onClick={() => onAddToCollection(selectedModel)}
					disabled={isAddDisabled} // Disable the button
				>
					{isAddDisabled ? "Max Limit Reached" : "+ Add to Collection"}
				</button>
			</div>
		</div>
	);
};

export default OutfitDetails;
