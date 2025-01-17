// BuildBrand.js
import React, { useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Suspense } from "react";
import Experience from "./Experience";
import Logo from "./components/Logo";
import Metric from "./components/MetricWidget";
import SelectionPanel from "./components/SelectionPanel";
import LogoModelList from "./components/LogoModelList";
import Tutorial from "./components/Tutorial";
import Loader from "./utils/Loader"; // Import the Loader component

// Import our models & budget from context
import { useModels } from "./utils/ModelsContext";

import leaf from "./assets/images/leaf.svg";
import thumb from "./assets/images/thumb.svg";
import heart from "./assets/images/heart.svg";

import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";

// Helper to pick the correct font family
function getFontFamily(fontStyle) {
	switch (fontStyle) {
		case "Future":
			return "'Orbitron', sans-serif";
		case "Minimalist":
			return "'DM Sans', sans-serif";
		case "Retro":
			return "'Kode Mono', monospace";
		case "Elegant":
			return "'Instrument Serif', serif";
		case "Bohemian":
			return "'MuseoModerno', cursive";
		case "Playful":
			return "'DynaPuff', cursive";
		default:
			return "inherit";
	}
}

export default function BuildBrand() {
    // 1) Access the entire context
    const { LogoChoices, budget, setBudget } = useModels();

    // Preload all logo models
    const preloadedLogoModels = useLoader(GLTFLoader, LogoChoices.map(model => model.model), (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);
    });

    // Example videos
    const tutorialVideos = ["./videos/BMAXX_1.mp4", "./videos/BMAXX_2.mp4"];

    // State for the currently selected logo model
    const [selectedLogoModel, setSelectedLogoModel] = useState(
        LogoChoices[0] || null
    );

    // State for the outfit "collection"
    const [collection, setCollection] = useState([]);

    // Step, brand name, font style
    const [currentStep, setCurrentStep] = useState(1);
    const [brandName, setBrandName] = useState("");
    const [fontStyle, setFontStyle] = useState("Future");

    // Add a model to the collection
    const addToCollection = (model) => {
        if (
            collection.length < 3 &&
            !collection.find((item) => item.id === model.id)
        ) {
            setCollection([...collection, model]);
        }
    };

    // Remove a model
    const removeFromCollection = (modelId) => {
        setCollection(collection.filter((item) => item.id !== modelId));
    };

    // Make sure we have a default selected logo if none chosen
    useEffect(() => {
        if (!selectedLogoModel && LogoChoices.length > 0) {
            setSelectedLogoModel(LogoChoices[0]);
        }
    }, [selectedLogoModel, LogoChoices]);

    const derivedFontFamily = getFontFamily(fontStyle);

    // 2) This callback receives the newBudget from Tutorial, stores in context
    const handleBudgetGenerated = (newBudget) => {
        setBudget(newBudget); // Write to context
    };

    return (
        <Suspense fallback={<Loader />}>
            <div className="app">
                {/* Show the tutorial, pass handleBudgetGenerated */}
                <Tutorial
                    videos={tutorialVideos}
                    onBudgetGenerated={handleBudgetGenerated}
                />

                <div className="logo-container">
                    <Logo />

                    {/* 3) Display the budget from context in a Metric */}
                    <Metric
                        label="Budget"
                        value={budget !== null ? `$ ${budget.toLocaleString()}` : "$ ------"}
                        percentChange="-XX%"
                        percentChangeStyles={{
                            backgroundColor: "none",
                            padding: "3px 6px",
                            borderRadius: "5px",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}
                    />

                    {/* Sample other metrics */}
                    <Metric
                        label="Sustainability"
                        value="-- / 5"
                        percentChange="-XX%"
                        percentChangeStyles={{
                            padding: "5px",
                            borderRadius: "7px",
                            color: "#ffffff",
                            fontSize: "13px",
                        }}
                        icon={
                            <img
                                src={leaf}
                                alt="Sustainability Icon"
                                style={{ width: "20px", height: "20px" }}
                            />
                        }
                    />
                    <Metric
                        label="Ethics"
                        value="-- / 5"
                        percentChange="-XX%"
                        percentChangeStyles={{
                            padding: "3px 6px",
                            borderRadius: "5px",
                            color: "#ffffff",
                            fontWeight: "bold",
                        }}
                        icon={
                            <img
                                src={thumb}
                                alt="Ethics Icon"
                                style={{ width: "20px", height: "20px" }}
                            />
                        }
                    />
                    <Metric
                        label="Popularity"
                        value="-- / 5"
                        percentChange="-XX%"
                        percentChangeStyles={{
                            padding: "5px",
                            borderRadius: "7px",
                            color: "#fffefd",
                            fontSize: "13px",
                        }}
                        icon={
                            <img
                                src={heart}
                                alt="Popularity Icon"
                                style={{ width: "20px", height: "20px" }}
                            />
                        }
                    />
                    <Metric
                        className="landing-page"
                        label="Projected Revenue"
                        value="$ ------"
                        percentChange="-XX%"
                        indicatorColor="#C83C00"
                        percentChangeStyles={{
                            padding: "5px",
                            borderRadius: "7px",
                            color: "#fffefd",
                            fontSize: "13px",
                        }}
                    />
                </div>

                <div className="canvas-container">
                    {/* Just applying brandName in fancy text */}
                    <h4
                        style={{
                            position: "absolute",
                            zIndex: 0,
                            fontSize: "8rem",
                            top: "50px",
                            left: "39%",
                            transform: "translateX(-50%)",
                            margin: 0,
                            padding: 0,
                            opacity: 0.8,
                            textTransform: "uppercase",
                            fontFamily: derivedFontFamily,
                        }}
                    >
                        {brandName || "brand name"}
                    </h4>

                    <h4
                        style={{
                            position: "absolute",
                            zIndex: 0,
                            fontSize: "8rem",
                            top: "250px",
                            left: "39%",
                            transform: "translateX(-50%)",
                            margin: 0,
                            padding: 0,
                            opacity: 0.8,
                            textTransform: "uppercase",
                            fontFamily: derivedFontFamily,
                        }}
                    >
                        {brandName || "brand name"}
                    </h4>

                    <h4
                        style={{
                            position: "absolute",
                            zIndex: 3,
                            fontSize: "8rem",
                            top: "450px",
                            left: "38%",
                            transform: "translateX(-48%)",
                            margin: 0,
                            padding: 0,
                            textTransform: "uppercase",
                            opacity: 1,
                            marginBottom: "-100px",
                            fontFamily: derivedFontFamily,
                        }}
                    >
                        {brandName || "brand name"}
                    </h4>
                    <h4
                        style={{
                            zIndex: 0,
                            position: "absolute",
                            fontSize: "8rem",
                            top: "650px",
                            left: "38%",
                            transform: "translateX(-48%)",
                            margin: 0,
                            padding: 0,
                            textTransform: "uppercase",
                            opacity: 0.3,
                            marginBottom: "-100px",
                            fontFamily: derivedFontFamily,
                        }}
                    >
                        {brandName || "brand name"}
                    </h4>

                    {/* ...other repeated brandName elements... */}

                    <Canvas
                        style={{
                            position: "relative",
                            zIndex: 1,
                            background:
                                "linear-gradient(to top,rgba(160, 169, 186, 0.6) 0%, #ffffff 100%)",
                        }}
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                        }}
                        camera={{
                            fov: 65,
                            near: 0.1,
                            far: 200,
                            position: [3.8, 2.0, 7.2],
                            rotation: [-0.19, -0.1, 0.11],
                        }}
                    >
                        <Experience selectedModel={selectedLogoModel} preloadedModels={preloadedLogoModels} />
                    </Canvas>

                    <div className="details-container">
                        <div className="outfit-details" style={{ zIndex: 10 }}>
                            <SelectionPanel
                                collection={collection}
                                onRemoveFromCollection={removeFromCollection}
                                currentStep={currentStep}
                                brandName={brandName}
                                setBrandName={setBrandName}
                                fontStyle={fontStyle}
                                setFontStyle={setFontStyle}
                            />
                        </div>
                    </div>
                </div>

                <div className="model-list-container" style={{ zIndex: "8" }}>
                    <LogoModelList
                        selectedLogoModel={selectedLogoModel}
                        onLogoModelChange={setSelectedLogoModel}
                    />
                </div>
            </div>
        </Suspense>
    );
}