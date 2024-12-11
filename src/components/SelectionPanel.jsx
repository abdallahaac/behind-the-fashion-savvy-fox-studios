import React from "react";

const SelectionPanel = () => {
	return (
		<div className="selection-panel">
			{/* Header Section */}
			<div className="header-section">
				{/* Step Count Bar */}
				<div className="step-count-bar">
					<div className="step-count">
						<div className="current-step">Step</div>
						<div className="total-step">/5</div>
					</div>
					<div className="progress-bar">
						<div className="progress filled"></div>
						<div className="progress filled"></div>
						<div className="progress"></div>
						<div className="progress"></div>
						<div className="progress"></div>
					</div>
				</div>

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
				<div className="info-widget">
					<div className="widget-header">
						<div className="widget-header-row">
							{/* Icon hidden by default */}
							{/* <div className="icon"></div> */}
							<div className="header-text">Statistic 1</div>
						</div>
						{/* Bar Chart, Chart Description, Caption hidden by default */}
					</div>
				</div>

				{/* Info Widget 2 */}
				<div className="info-widget">
					<div className="widget-header">
						<div className="widget-header-row">
							{/* Icon hidden by default */}
							{/* <div className="icon"></div> */}
							<div className="header-text">Statistic 2</div>
						</div>
						{/* Bar Chart, Chart Description, Caption hidden by default */}
					</div>
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
