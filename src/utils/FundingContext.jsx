import React, { createContext, useState } from "react";

export const FundingContext = createContext();

export function FundingProvider({ children }) {
	// Initialize fundingAmount to 100000 (or 0, or whatever).
	// If you leave it as null, your BudgetBar shows "$ ---" initially.
	const [fundingAmount, setFundingAmount] = useState(0);

	// Example function to randomize or set a higher initial funding:
	const generateFunding = () => {
		const amount = 100000;
		setFundingAmount(amount);
		return amount;
	};

	return (
		<FundingContext.Provider
			value={{ fundingAmount, setFundingAmount, generateFunding }}
		>
			{children}
		</FundingContext.Provider>
	);
}
