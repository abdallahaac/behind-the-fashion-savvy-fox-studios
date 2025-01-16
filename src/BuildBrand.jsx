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
					indicatorColor="#fffff"
				/>
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#fffff"
				/>
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#fffff"
				/>
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#fffff"
				/>
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#fffff"
				/>
			</div>

			{/* Main 3D Canvas area */}
			<div className="canvas-container">
				<Canvas
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
					style={{
						background:
							"linear-gradient(to top,rgba(160, 169, 186, 0.6) 0%, #ffffff 100%)",
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
