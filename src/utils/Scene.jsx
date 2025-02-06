import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraController from "./CameraController.jsx";
import DirectionalLights from "./Lights/DirectionalLights.jsx";
import { BlenderScene } from "../models/BlenderScene.jsx";

const Scene = ({ playAnimation }) => {
	return (
		<Canvas
			className="full-screen-canvas"
			gl={{ antialias: true }}
			camera={{
				fov: 34,
				near: 0.1,
				far: 200,
				position: [2, 7, 5],
			}}
		>
			{/* Pass the targetCameraZ prop to CameraController */}

			{/* Ambient light */}
			<ambientLight intensity={0.5} />

			{/* Orbit controls */}
			{/* <OrbitControls /> */}

			{/* Pass the playAnimation prop to BlenderScene */}
			<BlenderScene scale={0.1} playAnimation={playAnimation} />
		</Canvas>
	);
};

export default Scene;
