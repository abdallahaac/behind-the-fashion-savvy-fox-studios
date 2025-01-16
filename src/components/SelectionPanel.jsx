import React from "react";
import StepCountBar from "./StepCountBar";
import CollectionOrigMetric from "./CollectionOrigMetric";
import cracked_heart from "../assets/images/cracked-heart.png";
import shopping_bag from "../assets/images/shopping_bag.svg";
import FontStyleSelection from "./FontSelection";

const SelectionPanel = ({
	collection,
	onRemoveFromCollection,
	currentStep,
	brandName,
	setBrandName,
}) => {
	// New state for font style selection
	const [fontStyle, setFontStyle] = React.useState(null);

	console.log("currentStep in SelectionPanel:", currentStep);

	return (
		<div className="selection-panel">
			{/* Header Section */}
			<div className="header-section">
				<StepCountBar currentStep={currentStep} totalSteps={5} />
				{currentStep === 1 && (
					<div className="choose-outfit-designs accent-2">
						Create your brand
					</div>
				)}
				{currentStep === 2 && (
					<div className="choose-outfit-designs accent-2">
						Choose Outfit Designs
					</div>
				)}
			</div>

			{currentStep === 1 && (
				<>
					{/* My Collection Block */}
					<div
						className="my-collection-block"
						style={{ marginBottom: "240px" }}
					>
						<div className="my-collection accent-4">Brand Name</div>
						<div style={{ position: "relative", width: "100%" }}>
							<input
								type="text"
								placeholder="Brand Name..."
								maxLength="12"
								value={brandName}
								onChange={(e) => setBrandName(e.target.value)}
								style={{
									color: "white",
									width: "100%",
									padding: "16px",
									border: "1.1px solid rgba(240, 240, 240, 0.51)",
									borderRadius: "4px",
									boxSizing: "border-box",
									outline: "none",
									fontSize: "14px",
									background: "#222222",
									letterSpacing: "1px",
								}}
							/>
							<div
								style={{
									position: "absolute",
									right: "10px",
									top: "50%",
									transform: "translateY(-50%)",
									color: "#CCC",
									fontSize: "12px",
									fontFamily: "'DM Sans', sans-serif",
								}}
							>
								{brandName.length} / 12
							</div>
						</div>
					</div>

					{/* Pass state and updater to FontStyleSelection */}
					<FontStyleSelection
						selectedOption={fontStyle}
						setSelectedOption={setFontStyle}
					/>

					{/* Total Price Widget */}
					<div className="total-price-widget">
						<div className="price">
							<div className="dollar-amount accent-2">
								{brandName || "Brand Name"}
							</div>
							{/* Display the dynamically selected font style */}
							<div className="total-design-price label-large">
								{fontStyle || "Brand Style"}
							</div>
						</div>
						<div className="button">
							<div className="button-text body-text-medium">Create</div>
							<div className="button-icon"></div>
						</div>
					</div>
				</>
			)}

			{currentStep === 2 && (
				<>
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
							<div className="total-design-price label-large">
								Total Design Price
							</div>
						</div>
						<div className="button">
							<div className="button-text body-text-medium">Purchase</div>
							<div className="button-icon">
								<img src={shopping_bag} alt="Shopping Bag Icon" />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SelectionPanel;
