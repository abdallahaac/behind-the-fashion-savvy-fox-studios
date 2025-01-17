import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./intro.jsx";
import LandingPage from "./Landing-page.jsx";
import ChooseSelection from "./ChooseSelection.jsx"; // Import the ChooseSelection component
import { ModelsProvider } from "./utils/ModelsContext.jsx"; // Import ModelsProvider
import BuildBrand from "./BuildBrand.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<ModelsProvider>
		<Router>
			<Routes>
				<Route path="/choose-selection" element={<ChooseSelection />} />
				<Route path="/" element={<Intro />} />
				<Route path="/landing-page" element={<LandingPage />} />
				<Route path="/build-a-brand" element={<BuildBrand />} />
			</Routes>
		</Router>
	</ModelsProvider>
);
