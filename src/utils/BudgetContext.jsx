// BudgetContext.js
import React, { createContext, useState, useContext } from "react";

// 1) Create the context
const BudgetContext = createContext();

// 2) Custom hook to access the context
export function useBudget() {
	return useContext(BudgetContext);
}

// 3) The provider that wraps your app
export function BudgetProvider({ children }) {
	const [budget, setBudget] = useState(null);

	return (
		<BudgetContext.Provider value={{ budget, setBudget }}>
			{children}
		</BudgetContext.Provider>
	);
}
