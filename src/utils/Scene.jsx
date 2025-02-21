import React, { useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { EnvironmentWithCamera } from "../models/EnvironmentWIthCamera";
import { useControls, Leva } from "leva";
import * as THREE from "three";

// Import your font files
import DMSans from "../assets/fonts/DMSans-Regular.ttf";
import InstrumentSerif from "../assets/fonts/InstrumentSerif-Regular.ttf";
import MuseoModerno from "../assets/fonts/MuseoModerno-Regular.ttf";
import Orbitron from "../assets/fonts/Orbitron-Regular.ttf";
import DynaPuff from "../assets/fonts/DynaPuff-Regular.ttf";
import KodeMono from "../assets/fonts/KodeMono-Regular.ttf";

// Map your font style names to the corresponding TTF files.
const fontMapping = {
	MINIMALIST: DMSans,
	FUTURE: Orbitron,
	RETRO: KodeMono,
	ELEGANT: InstrumentSerif,
	BOHEMIAN: MuseoModerno,
	PLAYFUL: DynaPuff,
};

// Cube component with Leva controls for debugging.
const Cube = ({ position, scale, logoId }) => {
	const { cubePosition, cubeScale, cubeColor } = useControls("Cube", {
		cubePosition: {
			value: { x: position[0], y: position[1], z: -115.1 },
			step: 0.001,
		},
		cubeScale: { value: scale, min: 0, max: 10, step: 0.001 },
		cubeColor: { value: "orange" },
	});

	const meshRef = React.useRef();
	const [animate, setAnimate] = React.useState(false);

	React.useEffect(() => {
		console.log("Cube: rendered with logoId:", logoId);
		if (!logoId) {
			console.error("Cube: logoId is not provided!");
		}
		if (logoId === "logo1") {
			setAnimate(true);
		}
	}, [logoId]);

	useFrame(() => {
		if (!meshRef.current) return;
		const targetZ = animate ? -48.1 : -115.1;
		meshRef.current.position.z = THREE.MathUtils.lerp(
			meshRef.current.position.z,
			targetZ,
			0.1
		);
	});

	return (
		<mesh
			ref={meshRef}
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
	selectedLogo, // from Room
	brandName, // from Room
	fontStyle, // from Room (e.g. "MINIMALIST", "FUTURE", etc.)
}) => {
	useEffect(() => {
		console.log("Scene: selectedLogo changed:", selectedLogo);
		if (!selectedLogo) {
			console.error("Scene: No logo selected, cube will not render.");
		}
	}, [selectedLogo]);

	// // Create separate Leva control groups for each text instance.
	// const text1Controls = useControls("Text 1", {
	// 	textPosition: { value: { x: -78.88, y: 12.2, z: -47.771 }, step: 0.01 },
	// 	textRotation: { value: { x: -0.02, y: -4.8, z: 0 }, step: 0.01 },
	// 	textFontSize: { value: 2.9, min: 0.1, max: 10, step: 0.001 },
	// 	textColor: { value: "white" },
	// });
	// const text2Controls = useControls("Text 2", {
	// 	textPosition: { value: { x: -78.88, y: 10.0, z: -47.771 }, step: 0.01 },
	// 	textRotation: { value: { x: -0.02, y: -4.8, z: 0 }, step: 0.01 },
	// 	textFontSize: { value: 2.9, min: 0.1, max: 10, step: 0.001 },
	// 	textColor: { value: "white" },
	// });
	// const text3Controls = useControls("Text 3", {
	// 	textPosition: { value: { x: -78.88, y: 7.46, z: -47.771 }, step: 0.01 },
	// 	textRotation: { value: { x: -0.02, y: -4.8, z: 0 }, step: 0.01 },
	// 	textFontSize: { value: 2.9, min: 0.1, max: 10, step: 0.001 },
	// 	textColor: { value: "white" },
	// });
	// const text4Controls = useControls("Text 4", {
	// 	textPosition: { value: { x: -78.88, y: 4.9, z: -47.771 }, step: 0.01 },
	// 	textRotation: { value: { x: -0.02, y: -4.8, z: 0 }, step: 0.01 },
	// 	textFontSize: { value: 2.9, min: 0.1, max: 10, step: 0.001 },
	// 	textColor: { value: "white" },
	// });

	return (
		<>
			{/* Leva panel for real-time controls */}
			{/* <Leva collapsed={false} /> */}

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
				{selectedLogo && (
					<Cube
						position={[-78.88, 5.539, -47.771]}
						scale={2}
						logoId={selectedLogo}
					/>
				)}

				{/* Render multiple 3D Text objects with separate controls.
            The brandName is converted to uppercase for display. */}
				{brandName && (
					<Text
						position={[-69.12, 4.35, -49.51]}
						rotation={[0.01, -4.69, -0.02]}
						fontSize={1.9}
						color={"white"}
						font={fontMapping[fontStyle] || undefined}
						anchorX="center"
						anchorY="middle"
					>
						{brandName.toUpperCase()}
					</Text>
				)}
				{brandName && (
					<Text
						position={[-69.12, 4.35, -49.51]}
						rotation={[0.01, -4.69, -0.02]}
						fontSize={1.9}
						color={"black"}
						font={fontMapping[fontStyle] || undefined}
						anchorX="center"
						anchorY="middle"
					>
						{brandName.toUpperCase()}
					</Text>
				)}
				{brandName && (
					<Text
						position={[-69.12, 10.35, -49.51]}
						rotation={[0.01, -4.69, -0.02]}
						fontSize={1.9}
						color={"white"}
						font={fontMapping[fontStyle] || undefined}
						anchorX="center"
						anchorY="middle"
					>
						{brandName.toUpperCase()}
					</Text>
				)}
				{brandName && (
					<Text
						position={[-69.12, 8.35, -49.51]}
						rotation={[0.01, -4.69, -0.02]}
						fontSize={1.9}
						color={"white"}
						font={fontMapping[fontStyle] || undefined}
						anchorX="center"
						anchorY="middle"
					>
						{brandName.toUpperCase()}
					</Text>
				)}

				{brandName && (
					<Text
						position={[-69.12, 6.35, -49.51]}
						rotation={[0.01, -4.69, -0.02]}
						fontSize={1.9}
						color={"white"}
						font={fontMapping[fontStyle] || undefined}
						anchorX="center"
						anchorY="middle"
					>
						{brandName.toUpperCase()}
					</Text>
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
