import React, { useContext, useEffect, useState } from "react";
import "../assets/styles/MetricBars.css";
import { FundingContext } from "../utils/FundingContext";

function BudgetBar() {
	const { fundingAmount } = useContext(FundingContext);
	const [animate, setAnimate] = useState(false);

	// Whenever fundingAmount changes, trigger flip animation
	useEffect(() => {
		setAnimate(true);
		const timer = setTimeout(() => setAnimate(false), 600);
		return () => clearTimeout(timer);
	}, [fundingAmount]);

	// If fundingAmount is 0 or null, we show "$ ---"; otherwise format it.
	const displayAmount =
		fundingAmount && fundingAmount !== 0
			? `$${fundingAmount.toLocaleString()}`
			: "$ ---";

	return (
		<div className="metric-budget-container">
			<div className="metric-child-container">
				<div className="metric-details">
					<div className="metric-title label-large">Funds Raised</div>
					<div className={`metric-amount accent-2 ${animate ? "flip" : ""}`}>
						{displayAmount}
					</div>
				</div>
			
			</div>
		</div>
	);
}

export default BudgetBar;
