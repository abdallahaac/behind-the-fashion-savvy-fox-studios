// DirectionalLights.jsx
import React from "react";
import { useControls } from "leva";

const DirectionalLights = () => {
	// Controls for Directional Light 1
	const light1 = useControls("Directional Light 1", {
		color: { value: "#ffffff" },
		intensity: { value: 1, min: 0, max: 2, step: 0.1 },
		posX: { value: 2, min: -10, max: 10, step: 0.1 },
		posY: { value: 2, min: -10, max: 10, step: 0.1 },
		posZ: { value: 5, min: -10, max: 10, step: 0.1 },
	});

	// Controls for Directional Light 2
	const light2 = useControls("Directional Light 2", {
		color: { value: "#ff0000" },
		intensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
		posX: { value: -2, min: -10, max: 10, step: 0.1 },
		posY: { value: 4, min: -10, max: 10, step: 0.1 },
		posZ: { value: 3, min: -10, max: 10, step: 0.1 },
	});

	// Controls for Directional Light 3
	const light3 = useControls("Directional Light 3", {
		color: { value: "#00ff00" },
		intensity: { value: 0.75, min: 0, max: 2, step: 0.1 },
		posX: { value: 5, min: -10, max: 10, step: 0.1 },
		posY: { value: 1, min: -10, max: 10, step: 0.1 },
		posZ: { value: -5, min: -10, max: 10, step: 0.1 },
	});

	return (
		<>
			<directionalLight
				color={light1.color}
				intensity={light1.intensity}
				position={[light1.posX, light1.posY, light1.posZ]}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={5}
				shadow-camera-far={100}
			/>
			<directionalLight
				color={light2.color}
				intensity={light2.intensity}
				position={[light2.posX, light2.posY, light2.posZ]}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={5}
				shadow-camera-far={100}
			/>
			<directionalLight
				color={light3.color}
				intensity={light3.intensity}
				position={[light3.posX, light3.posY, light3.posZ]}
				castShadow
				shadow-mapSize-width={1024}
				shadow-mapSize-height={1024}
				shadow-camera-near={5}
				shadow-camera-far={100}
			/>
		</>
	);
};

export default DirectionalLights;
