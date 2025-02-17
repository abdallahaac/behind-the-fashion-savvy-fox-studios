import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentWithCamera } from "../models/EnvironmentWIthCamera";
import { useControls, Leva } from "leva";

// Cube component with Leva controls for debugging.
const Cube = ({ position, scale, logoId }) => {
	// Use Leva to control position, scale, and color.
	const { cubePosition, cubeScale, cubeColor } = useControls("Cube", {
		cubePosition: {
			value: { x: position[0], y: position[1], z: position[2] },
			step: 0.1,
		},
		cubeScale: { value: scale, min: 0, max: 10, step: 0.1 },
		cubeColor: { value: "orange" },
	});

	useEffect(() => {
		console.log("Cube: rendered with logoId:", logoId);
		if (!logoId) {
			console.error("Cube: logoId is not provided!");
		}
	}, [logoId]);

	return (
		<mesh
			position={[cubePosition.x, cubePosition.y, cubePosition.z]}
			scale={cubeScale}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={cubeColor} />
		</mesh>
	);
};

const Scene = ({
	playAnimation,
	paused,
	breakpoints,
	currentBreakpointIndex,
	onBreakpointHit,
	selectedLogo, // Received from Room component
}) => {
	useEffect(() => {
		console.log("Scene: selectedLogo changed:", selectedLogo);
		if (!selectedLogo) {
			console.error("Scene: No logo selected, cube will not render.");
		}
	}, [selectedLogo]);

	return (
		<>
			{/* Add Leva here so the control panel is visible */}
			<Canvas
				gl={{ antialias: true }}
				camera={{
					fov: 34,
					near: 0.1,
					far: 200,
					position: [2, 7, 5],
				}}
			>
				<ambientLight intensity={0.5} />
				{/* <OrbitControls /> */}

				{/* Render the cube only if a logo is selected */}
				{selectedLogo && (
					<Cube
						position={[-78.88, 5.539, -47.771]}
						scale={2}
						logoId={selectedLogo}
					/>
				)}

				<EnvironmentWithCamera
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={onBreakpointHit}
				/>
			</Canvas>
		</>
	);
};

export default Scene;
