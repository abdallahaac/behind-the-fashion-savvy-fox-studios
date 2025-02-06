// Scene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraController from "./CameraController.jsx";
import { EnvironmentMesh } from "../models/EnvironmentMesh.jsx"; // Adjust path as needed

const Scene = () => {
	return (
		<Canvas
			className="full-screen-canvas"
			gl={{ antialias: true }}
			camera={{
				fov: 34,
				near: 0.1,
				far: 200,
				position: [2, 2, 5],
			}}
		>
			{/* Camera controls via Leva (optional) */}
			<CameraController />

			{/* Basic lighting */}
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 2, 5]} intensity={1} />

			<OrbitControls />

			{/* Our environment, now with transform controls */}
			<EnvironmentMesh
				position={[3.0, 1.3, -2]}
				scale={0.1}
				rotation={[0, 1.5, 0]}
			/>

			{/* Possibly a rotating cube or other objects */}
		</Canvas>
	);
};

export default Scene;
