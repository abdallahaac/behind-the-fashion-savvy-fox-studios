// BudgetContext.js
import React, { createContext, useState, useContext } from "react";

// 1) Create the context
const BudgetContext = createContext();

// 2) Create a custom hook to access the context easily
export function useBudget() {
	return useContext(BudgetContext);
}

// 3) Create the provider to wrap your app
export function BudgetProvider({ children }) {
	const [budget, setBudget] = useState(null);

	return (
		<BudgetContext.Provider value={{ budget, setBudget }}>
			{children}
		</BudgetContext.Provider>
	);
}
