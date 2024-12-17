import React from "react";
import StepCountBar from "./StepCountBar";
import CollectionOrigMetric from "./CollectionOrigMetric";
import cracked_heart from "../assets/images/cracked-heart.png";

const SelectionPanel = () => {
	return (
		<div className="selection-panel">
			{/* Header Section */}
			<div className="header-section">
				{/* Step Count Bar */}
				<StepCountBar currentStep={3} totalSteps={5} />

				{/* Choose Outfit Designs */}
				<div className="choose-outfit-designs">Choose Outfit Designs</div>
			</div>

			{/* My Collection Block */}
			<div className="my-collection-block">
				<div className="my-collection">My Collection</div>
				<div className="thumbnail-list">
					<div className="thumbnail">
						<div className="empty-state-text">XXX</div>
					</div>
					<div className="thumbnail">
						<div className="empty-state-text">XXX</div>
					</div>
					<div className="thumbnail">
						<div className="empty-state-text">XXX</div>
					</div>
				</div>
			</div>

			{/* Collection Statistics Block */}
			<div className="collection-statistics-block">
				<div className="collection-statistics-header">
					Collection Statistics
				</div>

				{/* Info Widget 1 */}
				<div className="collection-metric-container">
					<CollectionOrigMetric
						label="Collection Originality"
						originalPercentage={50}
						plagiarizedPercentage={50}
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

				{/* Info Widget 2 */}
				<div className="collection-metric-container">
					<CollectionOrigMetric
						label="Your Collection Lacks Interest"
						summaryText="Consumers need to resonate with your designs or your brand risks no sales."
						icon={
							<img
								src={cracked_heart}
								alt="Originality Icon"
								style={{ width: "20px", height: "20px" }}
							/>
						}
						showBars={false}
					/>
				</div>
			</div>

			{/* Total Price Widget */}
			<div className="total-price-widget">
				<div className="price">
					<div className="dollar-amount">$0.00</div>
					<div className="total-design-price">Total Design Price</div>
				</div>
				<div className="button">
					<div className="button-text">Buy</div>
					<div className="button-icon"></div>
				</div>
			</div>
		</div>
	);
};

export default SelectionPanel;
