import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";
import Logo from "./components/Logo";
import Metric from "./components/MetricWidget";
import SelectionPanel from "./components/SelectionPanel";
import OutfitDetails from "./components/OutfitDetails";

// Import the new LogoModelList
import LogoModelList from "./components/LogoModelList";

import { useModels } from "./utils/ModelsContext";

import leaf from "./assets/images/leaf.svg";
import thumb from "./assets/images/thumb.svg";
import heart from "./assets/images/heart.svg";

import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";

export default function BuildBrand() {
	// Grab our logo array from context
	const { LogoChoices = [] } = useModels();

	// State for the currently selected logo model
	const [selectedLogoModel, setSelectedLogoModel] = useState(
		LogoChoices[0] || null
	);

	// State for the models in the "collection"
	const [collection, setCollection] = useState([]);

	// 1) State for the current step
	const [currentStep, setCurrentStep] = useState(1);

	// Add a model to the collection if there is space (limit 3) and it's not already added
	const addToCollection = (model) => {
		if (
			collection.length < 3 &&
			!collection.find((item) => item.id === model.id)
		) {
			setCollection([...collection, model]);
		}
	};

	// Remove a model from the collection by ID
	const removeFromCollection = (modelId) => {
		setCollection(collection.filter((item) => item.id !== modelId));
	};

	// Make sure we have a default selected logo model
	useEffect(() => {
		if (!selectedLogoModel && LogoChoices.length > 0) {
			setSelectedLogoModel(LogoChoices[0]);
		}
	}, [selectedLogoModel, LogoChoices]);

	return (
		<div className="app">
			{/* Top container with Logo and Metrics */}
			<div className="logo-container">
				<Logo />

				{/* Example Metric components */}
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#ffffff"
					percentChangeStyles={{
						backgroundColor: "none",
						padding: "3px 6px",
						borderRadius: "5px",
						color: "#ffffff",
						fontWeight: "bold",
					}}
				/>
				<Metric
					label="Sustainability"
					value=""
					percentChange="-XX%"
					indicatorColor="#1d7b18"
					percentChangeStyles={{
						backgroundColor: "#1d7b18",
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
					value=""
					percentChange="-XX%"
					indicatorColor="#1d7b18"
					percentChangeStyles={{
						backgroundColor: "#1d7b18",
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
					value=""
					percentChange="-XX%"
					indicatorColor="#C83C00"
					percentChangeStyles={{
						backgroundColor: "#C83C00",
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
					label="Projected Revenue"
					value="$"
					percentChange="-XX%"
					indicatorColor="#C83C00"
					percentChangeStyles={{
						backgroundColor: "#C83C00",
						padding: "5px",
						borderRadius: "7px",
						color: "#fffefd",
						fontSize: "13px",
					}}
				/>
			</div>

			{/* Main 3D Canvas area */}
			<div className="canvas-container">
				<h4
					style={{
						position: "absolute",
						zIndex: 0,
						fontSize: "5vh",
						top: "0px",
						left: "50%", // center horizontally if desired
						transform: "translateX(-50%)",
						margin: 0,
						padding: 0,
					}}
				>
					Header One
				</h4>
				<h4
					style={{
						position: "absolute",
						zIndex: 0,
						fontSize: "5vh",
						top: "407px", // adjust for center
						left: "50%",
						transform: "translate(-50%, -50%)", // to center vertically and horizontally at the point
						margin: 0,
						padding: 0,
					}}
				>
					Header Two
				</h4>
				<h4
					style={{
						position: "absolute",
						zIndex: 0,
						fontSize: "5vh",
						top: "814px", // near bottom; adjust if needed
						left: "50%",
						transform: "translate(-50%, -100%)", // shift up by height if needed
						margin: 0,
						padding: 0,
					}}
				>
					Header Three
				</h4>

				<Canvas
					style={{ position: "relative", zIndex: 1 }} // Higher z-index than h4
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
					{/* Pass the selected logo to the Experience component */}
					<Experience selectedModel={selectedLogoModel} />
				</Canvas>

				{/* Right-side (or below) detail panel */}
				<div className="details-container">
					<div className="outfit-details">
						{/* Pass the collection and current step into the selection panel */}
						<SelectionPanel
							collection={collection}
							onRemoveFromCollection={removeFromCollection}
							currentStep={1}
						/>
					</div>
				</div>
			</div>

			{/* Render the logo model list at the bottom (or wherever needed) */}
			<div className="model-list-container">
				<LogoModelList
					selectedLogoModel={selectedLogoModel}
					onLogoModelChange={setSelectedLogoModel}
				/>
			</div>

			{/* Step navigation buttons (optional) */}
		</div>
	);
}
