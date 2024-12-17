import React, { createContext, useContext } from "react";

// Models Data
const modelsData = [
	{
		id: 1,
		name: "Space Gothic Chromatica",
		budget: 45123,
		cost: 4300,
		sustainabilityScore: 4.7,
		ethicsScore: 4.7,
		popularityScore: 4.7,
		model: "../assets/models/model1.gltf",
	},
	{
		id: 2,
		name: "Cosmic Elegance",
		budget: 38900,
		cost: 3500,
		sustainabilityScore: 4.5,
		ethicsScore: 4.3,
		popularityScore: 4.6,
		model: "../assets/models/model2.gltf",
	},
	{
		id: 3,
		name: "Galactic Couture",
		budget: 51200,
		cost: 4600,
		sustainabilityScore: 4.9,
		ethicsScore: 4.8,
		popularityScore: 4.9,
		model: "../assets/models/model3.gltf",
	},
	{
		id: 4,
		name: "Nebula Silk",
		budget: 47000,
		cost: 4400,
		sustainabilityScore: 4.6,
		ethicsScore: 4.5,
		popularityScore: 4.8,
		model: "../assets/models/model4.gltf",
	},
	{
		id: 5,
		name: "Lunar Chic",
		budget: 43000,
		cost: 4000,
		sustainabilityScore: 4.4,
		ethicsScore: 4.3,
		popularityScore: 4.7,
		model: "../assets/models/model5.gltf",
	},
	{
		id: 6,
		name: "Stellar Grace",
		budget: 49000,
		cost: 4500,
		sustainabilityScore: 4.7,
		ethicsScore: 4.6,
		popularityScore: 4.8,
		model: "../assets/models/model6.gltf",
	},
	{
		id: 7,
		name: "Solar Flare Classic",
		budget: 39900,
		cost: 3700,
		sustainabilityScore: 4.5,
		ethicsScore: 4.4,
		popularityScore: 4.5,
		model: "../assets/models/model7.gltf",
	},
	{
		id: 8,
		name: "Aurora Style",
		budget: 52000,
		cost: 4800,
		sustainabilityScore: 4.8,
		ethicsScore: 4.8,
		popularityScore: 4.9,
		model: "../assets/models/model8.gltf",
	},
	{
		id: 9,
		name: "Zenith Fashion",
		budget: 46500,
		cost: 4300,
		sustainabilityScore: 4.6,
		ethicsScore: 4.7,
		popularityScore: 4.8,
		model: "../assets/models/model9.gltf",
	},
];

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
