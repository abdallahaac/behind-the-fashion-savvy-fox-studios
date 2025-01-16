// FullPageApp.jsx
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Experience from "./Experience";
import Logo from "./components/Logo";
import Metric from "./components/MetricWidget";
import SelectionPanel from "./components/SelectionPanel";
import OutfitDetails from "./components/OutfitDetails";
import ModelList from "./components/ModelList";
import { useModels } from "./utils/ModelsContext";

import leaf from "./assets/images/leaf.svg";
import thumb from "./assets/images/thumb.svg";
import heart from "./assets/images/heart.svg";

// Import your CSS files

import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";

export default function FullPageApp() {
	const modelsByCategory = useModels();
	const allModels = [
		...modelsByCategory.EthicallyStrongOptions,
		...modelsByCategory.CapitalisticChoices,
		...modelsByCategory.NeutralChoices,
	];

	const [selectedModel, setSelectedModel] = useState(allModels[0] || null);
	const [collection, setCollection] = useState([]);

	const addToCollection = (model) => {
		if (
			collection.length < 3 &&
			!collection.find((item) => item.id === model.id)
		) {
			setCollection([...collection, model]);
		}
	};

	const removeFromCollection = (modelId) => {
		setCollection(collection.filter((item) => item.id !== modelId));
	};

	useEffect(() => {
		if (!selectedModel && allModels.length > 0) {
			setSelectedModel(allModels[0]);
		}
	}, [selectedModel, allModels]);

	return (
		<div className="app">
			{/* Your entire UI is inside Suspense now */}

			<div className="logo-container">
				<Logo />
				<Metric
					label="Budget"
					value="$ 45,123"
					percentChange="-XX%"
					indicatorColor="#fffff"
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
					value="4.7 / 5"
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
					value="4.7 / 5"
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
					value="4.7 / 5"
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
					value="$ 45,123"
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
				>
					{/* Any 3D assets in <Experience /> will trigger Suspense */}
					<Experience selectedModel={selectedModel} />
				</Canvas>

				<div className="details-container">
					<div className="outfit-details">
						<OutfitDetails
							selectedModel={selectedModel}
							onAddToCollection={addToCollection}
							collection={collection}
						/>
					</div>
					<div className="outfit-details">
						<SelectionPanel
							collection={collection}
							onRemoveFromCollection={removeFromCollection}
						/>
					</div>
				</div>
			</div>

			<div className="model-list-container">
				<ModelList
					selectedModel={selectedModel}
					onModelChange={setSelectedModel}
				/>
			</div>
		</div>
	);
}
