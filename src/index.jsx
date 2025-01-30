import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./pages/intro.jsx";
import LandingPage from "./pages/Landing-page.jsx";
import ChooseSelection from "./pages/ChooseSelection.jsx"; // Import the ChooseSelection component
import { ModelsProvider } from "./utils/ModelsContext.jsx"; // Import ModelsProvider
import BuildBrand from "./pages/BuildBrand.jsx";
import FabricLab from "./pages/FabricLab.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<ModelsProvider>
		<Router>
			<Routes>
				<Route path="/choose-selection" element={<ChooseSelection />} />
				<Route path="/" element={<Intro />} />
				<Route path="/landing-page" element={<LandingPage />} />
				<Route path="/build-a-brand" element={<BuildBrand />} />
				<Route path="/fabric-lab" element={<FabricLab />} />
			</Routes>
		</Router>
	</ModelsProvider>
);
