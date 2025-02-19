import "../assets/styles/fabric-lab.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import Experience from "../Experience.jsx";
import Logo from "../components/Logo.jsx";
import Metric from "../components/MetricWidget.jsx";
import leaf from "../assets/images/leaf.svg";
import thumb from "../assets/images/thumb.svg";
import heart from "../assets/images/heart.svg";
import SelectionPanel from "../components/SelectionPanel.jsx";
import OutfitDetails from "../components/OutfitDetails.jsx";
import FabricDetails from "../components/FabricDetails.jsx";
import StagesCounter from "../components/StagesCounter.jsx";

// Import your existing context
import { useModels } from "../utils/ModelsContext.jsx";
import Loader from "../utils/Loader.jsx";
import { Leva } from "leva";

function FabricLab() {
	const { CottonChoices, HeavyChoices, SyntheticChoices, budget } = useModels();
	const [selectedCardIndex, setSelectedCardIndex] = useState(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedModel, setSelectedModel] = useState(null);
	const [currentFabricStep, setCurrentFabricStep] = useState(0);

	// Ensure CottonChoices has at least four elements
	if (!CottonChoices || CottonChoices.length < 4) {
		return <div>Not enough fabric choices available.</div>;
	}

	// Define the nested cards array for different stages
	const cards = [
		[
			{
				image: CottonChoices[0].img_path,
				fabricName: CottonChoices[0].name,
				cost: CottonChoices[0].cost,
				model: CottonChoices[0],
			},
			{
				image: CottonChoices[1].img_path,
				fabricName: CottonChoices[1].name,
				cost: CottonChoices[1].cost,
				model: CottonChoices[1],
			},
			{
				image: CottonChoices[2].img_path,
				fabricName: CottonChoices[2].name,
				cost: CottonChoices[2].cost,
				model: CottonChoices[2],
			},
			{
				image: CottonChoices[3].img_path,
				fabricName: CottonChoices[3].name,
				cost: CottonChoices[3].cost,
				model: CottonChoices[3],
			},
		],
		[
			{
				image: HeavyChoices[0].img_path,
				fabricName: HeavyChoices[0].name,
				cost: HeavyChoices[0].cost,
				model: HeavyChoices[0],
			},
			{
				image: HeavyChoices[1].img_path,
				fabricName: HeavyChoices[1].name,
				cost: HeavyChoices[1].cost,
				model: HeavyChoices[1],
			},
			{
				image: HeavyChoices[2].img_path,
				fabricName: HeavyChoices[2].name,
				cost: HeavyChoices[2].cost,
				model: HeavyChoices[2],
			},
			{
				image: HeavyChoices[3].img_path,
				fabricName: HeavyChoices[3].name,
				cost: HeavyChoices[3].cost,
				model: HeavyChoices[3],
			},
		],
		[
			{
				image: SyntheticChoices[0].img_path,
				fabricName: SyntheticChoices[0].name,
				cost: SyntheticChoices[0].cost,
				model: SyntheticChoices[0],
			},
			{
				image: SyntheticChoices[1].img_path,
				fabricName: SyntheticChoices[1].name,
				cost: SyntheticChoices[1].cost,
				model: SyntheticChoices[1],
			},
			{
				image: SyntheticChoices[2].img_path,
				fabricName: SyntheticChoices[2].name,
				cost: SyntheticChoices[2].cost,
				model: SyntheticChoices[2],
			},
			{
				image: SyntheticChoices[3].img_path,
				fabricName: SyntheticChoices[3].name,
				cost: SyntheticChoices[3].cost,
				model: SyntheticChoices[3],
			},
		],
		// Add more stages if needed
	];

	// Preload all models
	const preloadedFabricModels = useLoader(
		GLTFLoader,
		CottonChoices.map((model) => model.model),
		(loader) => {
			const dracoLoader = new DRACOLoader();
			dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
			loader.setDRACOLoader(dracoLoader);
		}
	);

	const handleCardSelect = (index, currentFabricStep) => {
		setSelectedCardIndex(index);
		setSelectedModel(cards[currentFabricStep][index]);
	};

	// The first model to show
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

	// // If no selected model, pick the first once models are loaded
	// useEffect(() => {
	//     if (!selectedModel && CottonChoices.length > 0) {
	//         setSelectedModel(CottonChoices[0]);
	//     }
	// }, [selectedModel, CottonChoices]);

	useEffect(() => {
		// Global body styling for this page
		document.body.style.margin = "20px";
		document.body.style.padding = "0px";
		document.body.style.backgroundColor = "#515151";
		return () => {
			document.body.style = "";
			document.documentElement.style = "";
		};
	}, []);

	return (
		<div className="app">
			<div className="canvas-container">
				<StagesCounter
					numSteps={3}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
				/>

				<div className="details-container">
					<div className="outfit-details">
						<FabricDetails selectedModel={selectedModel} />
					</div>
					<div className="outfit-details-rs">
						<SelectionPanel
							currentStep={3}
							selectedModel={selectedModel}
							setSelectedModel={setSelectedModel}
							cards={cards}
							selectedCardIndex={selectedCardIndex}
							setSelectedCardIndex={setSelectedCardIndex}
							onCardSelect={handleCardSelect}
							currentFabricStep={currentFabricStep}
							setCurrentFabricStep={setCurrentFabricStep}
						/>
					</div>
				</div>
			</div>

			{/* <div className="model-list-container">
                    <ModelList
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                    />
                </div> */}
		</div>
	);
}

export default FabricLab;
