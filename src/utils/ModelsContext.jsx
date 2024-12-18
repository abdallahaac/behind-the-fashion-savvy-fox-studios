import React, { createContext, useContext } from "react";
// modelsData.js
const modelsData = {
	EthicallyStrongOptions: [
		{
			id: 1,
			name: "Earthbound Nomad - loose clothing",
			budget: 45123,
			cost: 4300,
			sustainability: 4.9,
			ethics: 4.8,
			popularity: 3.2,
			description: "Affordable and ethical, but less trendy.",
			model: "../assets/models/model1.gltf",
		},
		{
			id: 2,
			name: "Avant-Garde Bloom - mix of florals in the outfit",
			budget: 38900,
			cost: 3500,
			sustainability: 5.0,
			ethics: 4.9,
			popularity: 3.8,
			description: "High-end ethical fashion.",
			model: "../assets/models/model2.gltf",
		},
		{
			id: 3,
			name: "Solarpunk",
			budget: 51200,
			cost: 4600,
			sustainability: 4.5,
			ethics: 4.6,
			popularity: 3.5,
			description: "A balanced, affordable, ethical choice.",
			model: "../assets/models/model3.gltf",
		},
	],
	CapitalisticChoices: [
		{
			id: 4,
			name: "Neo-Y2K Shimmer",
			budget: 47000,
			cost: 4400,
			sustainability: 2.1,
			ethics: 1.8,
			popularity: 5.0,
			description: "Ultra-trendy but ethically low.",
			model: "../assets/models/model4.gltf",
		},
		{
			id: 5,
			name: "Industrial Luxe",
			budget: 43000,
			cost: 4000,
			sustainability: 1.5,
			ethics: 1.7,
			popularity: 5.0,
			description: "Expensive, low ethics, very popular.",
			model: "../assets/models/model5.gltf",
		},
		{
			id: 6,
			name: "Plush Street Royale",
			budget: 49000,
			cost: 4500,
			sustainability: 2.8,
			ethics: 3.0,
			popularity: 4.9,
			description: "Capitalistic but somewhat neutral.",
			model: "../assets/models/model6.gltf",
		},
	],
	NeutralChoices: [
		{
			id: 7,
			name: "Neo-Vintage Edge",
			budget: 39900,
			cost: 3700,
			sustainability: 3.0,
			ethics: 3.2,
			popularity: 4.0,
			description: "A balanced option.",
			model: "../assets/models/model7.gltf",
		},
		{
			id: 8,
			name: "Retro Future Core",
			budget: 52000,
			cost: 4800,
			sustainability: 3.0,
			ethics: 3.2,
			popularity: 4.0,
			description: "A balanced option.",
			model: "../assets/models/model8.gltf",
		},
		{
			id: 9,
			name: "Midnight Edge Grunge",
			budget: 46500,
			cost: 4300,
			sustainability: 2.5,
			ethics: 2.8,
			popularity: 4.0,
			description: "Trendy with average ethics.",
			model: "../assets/models/model9.gltf",
		},
		{
			id: 10,
			name: "Space Gothic Chromatica",
			budget: 46500,
			cost: 4300,
			sustainability: 4.7,
			ethics: 4.7,
			popularity: 4.7,
			description: "A balanced option.",
			model: "../assets/models/model10.gltf",
		},
	],
};

export default modelsData;

// Context Creation
const ModelsContext = createContext();

// Provider Component
export const ModelsProvider = ({ children }) => {
	return (
		<ModelsContext.Provider value={modelsData}>
			{children}
		</ModelsContext.Provider>
	);
};

// Custom Hook
export const useModels = () => useContext(ModelsContext);
