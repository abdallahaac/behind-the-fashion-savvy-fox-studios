// ModelsContext.jsx (or .js)
import React, { createContext, useContext, useState } from "react";

// 1) Your static models data
// new models
const modelsData = {
	EthicallyStrongOptions: [
		{
			id: 1,
			name: "Earthbound Nomad - loose clothing",
			budget: 4512333,
			cost: 4300,
			sustainability: 4.9,
			ethics: 4.8,
			popularity: 3.2,
			description: "Affordable and ethical, but less trendy.",
			model: "/models/earthyboundNomad.glb",
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
			model: "/models/cube-02.glb",
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
			model: "/models/solarpunkoutfit.glb",
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
			model: "/models/cube-04.glb",
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
			model: "/models/industrialLuxe.glb",
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
			model: "/models/streetRoyal.glb",
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
			model: "/models/cube-07.glb",
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
			model: "/models/cube-08.glb",
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
			model: "/models/kimono.glb",
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
			model: "/models/spaceGothic.glb",
		},
	],

	// Logos
	LogoChoices: [
		{
			id: 1,
			name: "Minimalist Leaf Logo",
			description: "Simple leaf-based design for eco-friendly vibes.",
			model: "/models/cube-02.glb",
		},
		{
			id: 2,
			name: "Retro Badge Logo",
			description: "Vintage flair with bold lines and text.",
			model: "/models/cube-03.glb",
		},
		{
			id: 3,
			name: "Futuristic Neon Logo",
			description: "A neon-glow style with sharp edges.",
			model: "/models/cube-02.glb",
		},
		{
			id: 4,
			name: "3D Chrome Logo",
			description: "Metallic 3D effect, perfect for luxury brands.",
			model: "/models/cube-03.glb",
		},
		{
			id: 5,
			name: "Handwritten Brush Logo",
			description: "A playful script style for a casual brand.",
			model: "/models/cube-03.glb",
		},
	],
};

// 2) Create the context
const ModelsContext = createContext();

// 3) Provider component
export const ModelsProvider = ({ children }) => {
	// *** Add your budget state here ***
	const [budget, setBudget] = useState(null);

	// Combine static model data + dynamic budget in one object:
	const contextValue = {
		...modelsData,
		budget,
		setBudget,
	};

	return (
		<ModelsContext.Provider value={contextValue}>
			{children}
		</ModelsContext.Provider>
	);
};

// 4) Custom hook
export const useModels = () => {
	return useContext(ModelsContext);
};
