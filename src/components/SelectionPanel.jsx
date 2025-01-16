import React from "react";
import StepCountBar from "./StepCountBar";
import CollectionOrigMetric from "./CollectionOrigMetric";
import cracked_heart from "../assets/images/cracked-heart.png";
import shopping_bag from "../assets/images/shopping_bag.svg";

const SelectionPanel = ({ selectedModel, collection, onRemoveFromCollection }) => {
	return (
		<div className="selection-panel">
			{/* Header Section */}
			<div className="header-section">
				{/* Step Count Bar */}
				<StepCountBar currentStep={1} totalSteps={5} />

				{/* Choose Outfit Designs */}
				<div className="choose-outfit-designs accent-2">Choose Outfit Designs</div>
			</div>

			{/* My Collection Block */}
			<div className="my-collection-block">
				<div className="my-collection accent-4">My Collection</div>
				<div className="thumbnail-list">
					{[...Array(3)].map((_, index) => {
						const model = collection[index];
						return (
							<div key={index} className="thumbnail">
								{model ? (
									<div className="thumbnail-content">
										<div className="model-name">{model.name}</div>
										<button
											className="remove-button"
											onClick={() => onRemoveFromCollection(model.id)}
										>
											Remove
										</button>
									</div>
								) : (
									<div className="empty-state-text accent-1">XXX</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Collection Statistics Block */}
			<div className="collection-statistics-block">
				<div className="collection-statistics-header accent-4">
					Collection Statistics
				</div>

				{/* Info Widget 1 */}
				<div className="collection-metric-container">
					<CollectionOrigMetric
						label="Collection Originality"
						originalPercentage={selectedModel.orig_percentage}
						plagiarizedPercentage={selectedModel.plag_percentage}
						summaryText="Consumers need to resonate with your designs or your brand risks no sales."
						icon={
							<img
								src={cracked_heart}
								alt="Originality Icon"
								style={{ width: "20px", height: "20px" }}
							/>
						}
						showBars={true}
					/>
				</div>
			</div>

			{/* Total Price Widget */}
			<div className="total-price-widget">
				<div className="price">
					<div className="dollar-amount accent-2">
						$
						{collection
							.reduce((total, item) => total + item.cost, 0)
							.toFixed(2)}
					</div>
					<div className="total-design-price label-large">Total Design Price</div>
				</div>
				<div className="button">
					<div className="button-text body-text-medium">Purchase</div>
					<div className="button-icon">
					    <img src={shopping_bag} alt="Shopping Bag Icon" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectionPanel;
