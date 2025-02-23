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
				<div className="metric-title">Funds Raised</div>
				<div className={`metric-amount ${animate ? "flip" : ""}`}>
					{displayAmount}
				</div>
			</div>
		</div>
	);
}

export default BudgetBar;
