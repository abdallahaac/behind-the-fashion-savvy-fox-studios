import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Intro from "./pages/intro.jsx";
import LandingPage from "./pages/Landing-page.jsx";
import ChooseSelection from "./pages/ChooseSelection.jsx";
import { ModelsProvider } from "./utils/ModelsContext.jsx";
import BuildBrandCanvas from "./pages/BuildBrandCanvas.jsx";
import FabricLab from "./pages/FabricLab.jsx";
import Manufacturing from "./pages/Manufacturing.jsx";
import IntroSingleCanvas from "./pages/IntroCanvas.jsx";
import LandingPageCanvas from "./pages/LandingPageCanvas.jsx";
import Room from "./pages/Room.jsx";
import { FundingProvider } from "./utils/FundingContext.jsx";
import PersonaPage from "./pages/Persona-page.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<ModelsProvider>
		<FundingProvider>
			<Router>
				<Routes>
					<Route path="/choose-selection" element={<ChooseSelection />} />
					<Route path="/" element={<LandingPageCanvas/>} />
					<Route path="/landing-page" element={<PersonaPage />} />
					<Route path="/build-a-brand" element={<BuildBrandCanvas />} />
					<Route path="/fabric-lab" element={<FabricLab />} />
					<Route path="/room" element={<Room />} />
					<Route path="/manufacturing" element={<Manufacturing />} />
					<Route path="/persona" element={<PersonaPage />} /> 

				</Routes>
			</Router>
		</FundingProvider>
	</ModelsProvider>
);
