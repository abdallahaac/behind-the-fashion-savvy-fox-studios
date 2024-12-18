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
			<div className="header">
				<span className="look-number">
					LOOK #{String(selectedModel.id).padStart(2, "0")}
				</span>
			</div>
			<h1 className="title">{selectedModel.name.toUpperCase()}</h1>
			<div className="feature">
				<span className="icon thumbs-up">
					<img
						src={greenThumb}
						alt="Sustainability Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">
					{selectedModel.sustainability * 20}% Sustainability
				</span>
			</div>
			<div className="progress-bar-2">
				<div
					className="progress-fill"
					style={{ width: `${selectedModel.sustainability * 20}%` }}
				></div>
			</div>
			<p className="description">{selectedModel.description}</p>

			<div className="feature">
				<span className="icon heart">
					<img
						src={greenHeart}
						alt="Popularity Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">
					{selectedModel.popularity * 20}% Popularity
				</span>
			</div>

			<div className="feature">
				<span className="icon thumbs-down">
					<img
						src={redThumb}
						alt="Ethics Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">
					{selectedModel.ethics * 20}% Ethics
				</span>
			</div>
			<p className="description">
				Considerations for ethics and sustainability can influence the broader
				impact of your choices.
			</p>

			<div className="cost-row">
				<div className="cost">
					<h2>${selectedModel.cost}</h2>
					<span>COST OF DESIGN</span>
				</div>
				<button
					className="add-button"
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
