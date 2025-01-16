import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";
import Logo from "./components/Logo";
import Metric from "./components/MetricWidget";
import SelectionPanel from "./components/SelectionPanel";
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

	// Lifted state for the brand name
	const [brandName, setBrandName] = useState("");

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
					className="landing-page"
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
						fontSize: "8rem",
						top: "50px",
						left: "30%",
						transform: "translateX(-50%)",
						margin: 0,
						padding: 0,
						opacity: 0.8,
						textTransform: "uppercase",
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
						left: "30%",
						transform: "translateX(-50%)",
						margin: 0,
						padding: 0,
						opacity: 0.8,
						textTransform: "uppercase",
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
						left: "29%",
						transform: "translateX(-48%)",
						margin: 0,
						padding: 0,
						textTransform: "uppercase",
						opacity: 1,
						marginBottom: "-100px",
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
						left: "29%",
						transform: "translateX(-48%)",
						margin: 0,
						padding: 0,
						textTransform: "uppercase",
						opacity: 0.3,
						marginBottom: "-100px",
					}}
				>
					{brandName || "brand name"}
				</h4>

				<Canvas
					style={{
						position: "relative",
						zIndex: 1,

						background:
							"linear-gradient(to top,rgba(160, 169, 186, 0.6) 0%, #ffffff 100%)",
					}} // Higher z-index than h4
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
					<div className="outfit-details" style={{ zIndex: 10 }}>
						{/* Pass the collection, current step, and brand state to SelectionPanel */}
						<SelectionPanel
							collection={collection}
							onRemoveFromCollection={removeFromCollection}
							currentStep={1}
							brandName={brandName}
							setBrandName={setBrandName}
						/>
					</div>
				</div>
			</div>

			{/* Render the logo model list at the bottom (or wherever needed) */}
			<div className="model-list-container" style={{ zIndex: "8" }}>
				<LogoModelList
					selectedLogoModel={selectedLogoModel}
					onLogoModelChange={setSelectedLogoModel}
				/>
			</div>

			{/* Step navigation buttons (optional) */}
		</div>
	);
}
