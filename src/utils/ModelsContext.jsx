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
            orig_percentage: 80,
            plag_percentage: 20,
            model: "/models/earthyboundNomad.glb",
            // *** Additional fields for transform & material
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 0,
                roughness: 0.9,
                color: "#ffffff",
            },
        },
    ],
    CapitalisticChoices: [
        {
            id: 2,
            name: "Neo-Y2K Shimmer",
            budget: 47000,
            cost: 4400,
            sustainability: 2.1,
            ethics: 1.8,
            popularity: 5.0,
            description: "Ultra-trendy but ethically low.",
            orig_percentage: 30,
            plag_percentage: 70,
            model: "/models/avantGardeBloom.glb",
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 1.0,
                roughness: 0.2,
                color: "#ffffff",
            },
        },
        {
            id: 3,
            name: "Industrial Luxe",
            budget: 43000,
            cost: 4000,
            sustainability: 1.5,
            ethics: 1.7,
            popularity: 5.0,
            description: "Expensive, low ethics, very popular.",
            orig_percentage: 40,
            plag_percentage: 60,
            model: "/models/industrialLuxe.glb",
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 0.8,
                roughness: 0.1,
                color: "#aaaaaa",
            },
        },
        {
            id: 4,
            name: "Plush Street Royale",
            budget: 49000,
            cost: 4500,
            sustainability: 2.8,
            ethics: 3.0,
            popularity: 4.9,
            description: "Capitalistic but somewhat neutral.",
            orig_percentage: 50,
            plag_percentage: 50,
            model: "/models/streetRoyal.glb",
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 0.5,
                roughness: 0.3,
                color: "#fffeff",
            },
        },
    ],
    NeutralChoices: [
        {
            id: 5,
            name: "Midnight Edge Grunge",
            budget: 46500,
            cost: 4300,
            sustainability: 2.5,
            ethics: 2.8,
            popularity: 4.0,
            description: "Trendy with average ethics.",
            orig_percentage: 60,
            plag_percentage: 40,
            model: "/models/kimono.glb",
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 1,
                roughness: 0.6,
                color: "#ffff",
            },
        },
        {
            id: 6,
            name: "Space Gothic Chromatica",
            budget: 46500,
            cost: 4300,
            sustainability: 4.7,
            ethics: 4.7,
            popularity: 4.7,
            description: "A balanced option.",
            orig_percentage: 70,
            plag_percentage: 30,
            model: "/models/spaceGothic.glb",
            transform: {
                position: [0, -4, -0.1],
                rotation: [0, 100, 0],
                scale: 0.6,
            },
            materialParams: {
                metalness: 0.5,
                roughness: 0.3,
                color: "#ffffff",
            },
        },
    ],

    // Logos
    LogoChoices: [
        {
            id: 1,
            name: "Minimalist Leaf Logo",
            description: "Simple leaf-based design for eco-friendly vibes.",
            model: "/models/logo-1.glb",
            transform: {
                position: [0, 0, 0],
                rotation: [8, 1, 0],
                scale: 20.0,
            },
            materialParams: {
                metalness: 1,
                roughness: 0,
                color: "#ffffff",
            },
        },
        {
            id: 2,
            name: "Retro Badge Logo",
            description: "Vintage flair with bold lines and text.",
            model: "/models/logo-02.glb",
            transform: {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: 0.7,
            },
            materialParams: {
                metalness: 1,
                roughness: 0,
                color: "#ffffff",
            },
        },
        {
            id: 3,
            name: "Futuristic Neon Logo",
            description: "A neon-glow style with sharp edges.",
            model: "/models/logo-03.glb",
            transform: {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: 0.8,
            },
        },
        {
            id: 4,
            name: "3D Chrome Logo",
            description: "Metallic 3D effect, perfect for luxury brands.",
            model: "/models/logo-04.glb",
            transform: {
                position: [0, 0, 0],
                rotation: [0, Math.PI / 3, 0],
                scale: 2,
            },
            materialParams: {
                metalness: 1,
                roughness: 0,
                color: "#ffffff",
            },
            autoRotateRadius: 0.001,
        },
        {
            id: 5,
            name: "Handwritten Brush Logo",
            description: "A playful script style for a casual brand.",
            model: "/models/logo-05.glb",
            transform: {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: 1.0,
            },
            materialParams: {
                metalness: 1,
                roughness: 0,
                color: "#ffffff",
            },
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