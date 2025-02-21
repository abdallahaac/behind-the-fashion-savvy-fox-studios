import React, { createContext, useState } from "react";

export const FundingContext = createContext();

export function FundingProvider({ children }) {
	const [fundingAmount, setFundingAmount] = useState(null);

	// Generate a random funding amount between 45,000 and 100,000
	const generateFunding = () => {
		const amount = Math.floor(Math.random() * (100000 - 45000 + 1)) + 45000;
		setFundingAmount(amount);
		return amount;
	};

	return (
		<FundingContext.Provider
			value={{ fundingAmount, generateFunding, setFundingAmount }}
		>
			{children}
		</FundingContext.Provider>
	);
}
