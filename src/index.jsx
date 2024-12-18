import "./style.css";
import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import * as THREE from "three";
import Logo from "./components/Logo.jsx";
import Metric from "./components/MetricWidget.jsx";
import leaf from "./assets/images/leaf.svg";
import thumb from "./assets/images/thumb.svg";
import heart from "./assets/images/heart.svg";
import SelectionPanel from "./components/SelectionPanel.jsx";
import OutfitDetails from "./components/OutfitDetails.jsx";
import ModelList from "./components/ModelList.jsx";
import { ModelsProvider, useModels } from "./utils/ModelsContext.jsx";
import { useState, useEffect } from "react";

const App = () => {
	const modelsByCategory = useModels();
	const allModels = [
		...modelsByCategory.EthicallyStrongOptions,
		...modelsByCategory.CapitalisticChoices,
		...modelsByCategory.NeutralChoices,
	];

	// Set the initial model to the first model in the list
	const [selectedModel, setSelectedModel] = useState(allModels[0]);

	useEffect(() => {
		console.log("Initial model set:", selectedModel);
	}, []);

	return (
		<div className="app">
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

			{/* Three-column layout */}
			<div className="three-column-layout">
				<div className="left-column">
					<div className="canvas-container">
						<Canvas
							gl={{
								antialias: true,
								toneMapping: THREE.ACESFilmicToneMapping,
							}}
							camera={{
								fov: 45,
								near: 0.1,
								far: 200,
								position: [3, 2, 6],
							}}
						>
							<Experience selectedModel={selectedModel} />
						</Canvas>
					</div>
				</div>

				<div className="center-column">
					<OutfitDetails selectedModel={selectedModel} />
				</div>

				<div className="right-column">
					<SelectionPanel />
				</div>
			</div>
			<ModelList
				selectedModel={selectedModel}
				onModelChange={setSelectedModel}
			/>
		</div>
	);
};

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
	<ModelsProvider>
		<App />
	</ModelsProvider>
);
