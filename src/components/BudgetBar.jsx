import React, { useContext, useEffect, useState } from "react";
import "../assets/styles/MetricBars.css";
import { FundingContext } from "../utils/FundingContext";

function BudgetBar() {
	const { fundingAmount } = useContext(FundingContext);
	const [animate, setAnimate] = useState(false);

	// Trigger the flip animation whenever fundingAmount changes.
	useEffect(() => {
		setAnimate(true);
		const timer = setTimeout(() => setAnimate(false), 600); // match the duration of the CSS animation
		return () => clearTimeout(timer);
	}, [fundingAmount]);

	// Format the display amount.
	const displayAmount = fundingAmount
		? `$${fundingAmount.toLocaleString()}`
		: "$ ---";

	return (
		<div className="metric-budget-container">
			<div className="metric-child-container">
				<div className="metric-title">Funds Raised</div>
				<div className={`metric-amount ${animate ? "flip" : ""}`}>
					{displayAmount}
				</div>
			</div>
		</div>
	);
}

export default BudgetBar;
