import "./choose-selection-style.css";
import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useState } from "react";

// Components & contexts
import Experience from "./Experience.jsx";
import Logo from "./components/Logo.jsx";
import Metric from "./components/MetricWidget.jsx";
import leaf from "./assets/images/leaf.svg";
import thumb from "./assets/images/thumb.svg";
import heart from "./assets/images/heart.svg";
import SelectionPanel from "./components/SelectionPanel.jsx";
import OutfitDetails from "./components/OutfitDetails.jsx";
import ModelList from "./components/ModelList.jsx";
import { ModelsProvider, useModels } from "./utils/ModelsContext.jsx";
import Loader from "./utils/Loader.jsx";

// Leva for debugging
import { Leva } from "leva";

function ChooseSelection() {
	const modelsByCategory = useModels();
	const allModels = [
		...modelsByCategory.EthicallyStrongOptions,
		...modelsByCategory.CapitalisticChoices,
		...modelsByCategory.NeutralChoices,
	];

	// The first model to show
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

	// If no selected model, pick the first once models are loaded
	useEffect(() => {
		if (!selectedModel && allModels.length > 0) {
			setSelectedModel(allModels[0]);
		}
	}, [selectedModel, allModels]);

	useEffect(() => {
		// Need to add this because when you define styles for the body and html elements in intro-style.css, those styles apply globally to the entire document, affecting all components
		document.body.style.margin = "20px";
		document.body.style.padding = "0px";
		document.body.style.backgroundColor = "#515151";
		document.documentElement.style.height = "100vh";
		document.documentElement.style.overflow = "hidden";
	
		// Cleanup function to reset styles when component unmounts
		return () => {
			document.body.style = "";
            document.documentElement.style = "";
		};
	  }, []);
	

	return (
		<div className="app">
			{/*
        Wrap everything that depends on 3D models
        inside Suspense so Loader is shown until loaded.
      */}
			<Suspense fallback={<Loader />}>
				<div className="logo-container">
					<Logo />

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
						{/* The Experience component uses `useLoader` to load the model */}
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
			</Suspense>
		</div>
	);
}

// const root = ReactDOM.createRoot(document.querySelector("#root"));
// root.render(
// 	<ModelsProvider>
// 		{/* Leva for debugging UI */}
// 		<Leva collapsed />
// 		<ChooseSelection />
// 	</ModelsProvider>
// );

export default ChooseSelection;
