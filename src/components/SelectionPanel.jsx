import React, { useState } from "react";
import StepCountBar from "./StepCountBar";
import CollectionOrigMetric from "./CollectionOrigMetric";
import cracked_heart from "../assets/images/cracked-heart.png";
import shopping_bag from "../assets/images/shopping_bag.svg";

const SelectionPanel = ({
	collection,
	onRemoveFromCollection,
	currentStep,
}) => {
	// 1. Create a state variable for the brand name
	const [brandName, setBrandName] = useState("");

	return (
		<div className="selection-panel">
			{/* Header Section */}
			<div className="header-section">
				{/* Step Count Bar (always visible) */}
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

						{/* Position a parent container relative to hold the input + counter */}
						<div style={{ position: "relative", width: "100%" }}>
							<input
								type="text"
								placeholder="Brand Name..."
								maxLength="12"
								// 2. Bind the input to our state variable
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
									borderRadius: "4px",
									letterSpacing: "1px",
								}}
							/>
							{/* 3. The character counter (absolute positioned) */}
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

					{/* Font Style Selection */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "8px",
							marginTop: "16px",
						}}
					>
						{/* Font Style Header */}
						<div
							style={{
								fontFamily: "'DM Sans', sans-serif",
								fontSize: "12px",
								fontWeight: "bold",
								color: "#FFFFFF",
								textTransform: "uppercase",
							}}
						>
							Font Style
						</div>

						{/* Font Style Options */}
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: "8px",
							}}
						>
							{[
								{ text: "Future", active: true },
								{ text: "Minimalist", active: false },
								{ text: "Retro", active: true },
								{ text: "Elegant", active: false },
								{ text: "Bohemian", active: false },
								{ text: "Playful", active: false },
							].map(({ text, active }) => (
								<div
									key={text}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										padding: "4px 12px",
										borderRadius: "32px",
										background: active ? "#FFEEEB" : "#FFFEFD",
										color: active ? "#C83C00" : "#0F0F0F",
										fontFamily: active ? "'Kode Mono'" : "'DM Sans'",
										fontWeight: active ? "700" : "400",
										fontSize: "12px",
										textTransform: "uppercase",
										cursor: "pointer",
										border: "1px solid transparent",
										minWidth: "60px",
										textAlign: "center",
									}}
								>
									{text}
									{active && (
										<span
											style={{
												marginLeft: "8px",
												color: "#C83C00",
												fontWeight: "bold",
												cursor: "pointer",
											}}
										>
											×
										</span>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Total Price Widget */}
					<div className="total-price-widget">
						<div className="price">
							{/* 4. Display brandName if it’s not empty; otherwise, fallback to "Brand Name" */}
							<div className="dollar-amount accent-2">
								{brandName || "Brand Name"}
							</div>
							<div className="total-design-price label-large">Brand Style</div>
						</div>
						<div className="button">
							<div className="button-text body-text-medium">Create</div>
							<div className="button-icon"></div>
						</div>
					</div>
				</>
			)}

			{/* Everything below only shows for Step 2 */}
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
