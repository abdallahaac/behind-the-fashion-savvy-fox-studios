/*****************************************************
 * src/utils/Scene.jsx
 *****************************************************/
import React, { useEffect, lazy, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import FilmGrain from "./MakeItGrain";

// ----- LAZY LOAD YOUR LARGE ASSETS -----
const EnvironmentWithCamera = lazy(() =>
	import("../models/EnvironmentWithCamera").then((module) => ({
		default: module.EnvironmentWithCamera,
	}))
);
const AvantGardeBloom = lazy(() => import("../models/Meshes/AvantGardeBloom"));

// ----- Import your logo models -----
import Butterfly from "../models/Logos/Butterfly";
import Heart from "../models/Logos/Heart";
import MainLogo from "../models/Logos/MainLogo";
import PinLogo from "../models/Logos/Pin";
import Shard from "../models/Logos/Shard";

// ---- Font imports ----
import DMSans from "../assets/fonts/DMSans-Regular.ttf";
import InstrumentSerif from "../assets/fonts/InstrumentSerif-Regular.ttf";
import MuseoModerno from "../assets/fonts/MuseoModerno-Regular.ttf";
import Orbitron from "../assets/fonts/Orbitron-Regular.ttf";
import DynaPuff from "../assets/fonts/DynaPuff-Regular.ttf";
import KodeMono from "../assets/fonts/KodeMono-Regular.ttf";

// Map style strings to font files
const fontMapping = {
	MINIMALIST: DMSans,
	FUTURE: Orbitron,
	RETRO: KodeMono,
	ELEGANT: InstrumentSerif,
	BOHEMIAN: MuseoModerno,
	PLAYFUL: DynaPuff,
};

// Simple lookup for your 5 possible logos
const logosMap = {
	Butterfly: Butterfly,
	Heart: Heart,
	MainLogo: MainLogo,
	Pin: PinLogo,
	Shard: Shard,
};

// Default control values for each logo
const defaultLogoControls = {
	Butterfly: {
		position: [0, -5.5, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		color: "#ff00ff",
	},
	Heart: {
		position: [0, -5.5, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		color: "#ff0000",
	},
	MainLogo: {
		position: [0, -5.5, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		color: "#ffffff",
	},
	Pin: {
		position: [0, -5.5, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		color: "#00ff00",
	},
	Shard: {
		position: [0, -5.5, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		color: "#00ffff",
	},
};

// A component for an individual logo group.
function LogoGroup({ logoKey, basePosition, baseRotation, onLogoMeshMounted }) {
	const groupRef = React.useRef();

	useEffect(() => {
		if (onLogoMeshMounted) {
			onLogoMeshMounted(logoKey, groupRef);
		}
	}, [logoKey, onLogoMeshMounted]);

	// Use x & y from our default controls and force z = -120.
	const controls = defaultLogoControls[logoKey];
	const finalPosition = [
		basePosition[0] + controls.position[0],
		basePosition[1] + controls.position[1],
		-120, // Fixed z position for logos
	];

	const finalRotation = [
		baseRotation[0] + controls.rotation[0],
		baseRotation[1] + controls.rotation[1],
		baseRotation[2] + controls.rotation[2],
	];

	return (
		<group
			ref={groupRef}
			position={finalPosition}
			rotation={finalRotation}
			scale={controls.scale}
		>
			{React.createElement(logosMap[logoKey], { color: controls.color })}
		</group>
	);
}

function AllLogos({ onLogoMeshMounted }) {
	// Base position and rotation taken from the text positions in your scene
	const basePosition = [-69.12, 10.75, -49.51];
	const baseRotation = [0.01, -4.69, -0.02];

	return (
		<>
			{Object.keys(logosMap).map((logoKey) => (
				<LogoGroup
					key={logoKey}
					logoKey={logoKey}
					basePosition={basePosition}
					baseRotation={baseRotation}
					onLogoMeshMounted={onLogoMeshMounted}
				/>
			))}
		</>
	);
}

// Cube component with Leva controls defined in the same file.
function Cube() {
	// Leva control for the cube's position.
	const { position } = useControls("Cube", {
		position: { value: [-39.3, 8.1, -44.3], step: 0.1 },
	});

	return (
		<mesh position={position}>
			{/* Option 1: Use boxGeometry which is automatically recognized */}
			<boxGeometry args={[2, 2, 2]} />
			{/* 
      Option 2: If you prefer using boxBufferGeometry, uncomment the following line 
      and add the extension below.
      
      <boxBufferGeometry args={[2, 2, 2]} />
      */}
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}

// Constantly log the camera position on every frame.
function CameraLogger() {
	const { camera } = useThree();
	useFrame(() => {
		console.log(
			`Camera Position: x: ${camera.position.x.toFixed(
				3
			)}, y: ${camera.position.y.toFixed(3)}, z: ${camera.position.z.toFixed(
				3
			)}`
		);
	});
	return null;
}

const Scene = ({
	playAnimation,
	paused,
	breakpoints,
	currentBreakpointIndex,
	onBreakpointHit,
	brandName,
	fontStyle,
	onLogoMeshMounted,
}) => {
	useEffect(() => {
		console.log("Scene: Rendering scene with Cube and logos.");
	}, []);

	return (
		<>
			{/* Display the Leva controls panel */}
			<Leva collapsed={false} />

			<Canvas gl={{ antialias: true }}>
				<Suspense fallback={null}>
					{/* Global ambient light */}
					<ambientLight intensity={0.5} />

					{/* Constantly log the camera position */}
					{/* <CameraLogger /> */}

					{/* Render the cube with Leva controls */}
					<Cube />

					{/* Render all logos */}
					<AllLogos onLogoMeshMounted={onLogoMeshMounted} />

					{/* Display the brand name as stacked text */}
					{brandName && (
						<>
							<Text
								position={[-69.12, 10.75, -49.51]}
								rotation={[0.01, -4.69, -0.02]}
								fontSize={1.4}
								color={"white"}
								font={fontMapping[fontStyle] || undefined}
								anchorX="center"
								anchorY="middle"
							>
								{brandName.toUpperCase()}
							</Text>
							<Text
								position={[-69.12, 8.75, -49.51]}
								rotation={[0.01, -4.69, -0.02]}
								fontSize={1.4}
								color={"white"}
								font={fontMapping[fontStyle] || undefined}
								anchorX="center"
								anchorY="middle"
							>
								{brandName.toUpperCase()}
							</Text>
							<Text
								position={[-69.12, 6.75, -49.51]}
								rotation={[0.01, -4.69, -0.02]}
								fontSize={1.4}
								color={"white"}
								font={fontMapping[fontStyle] || undefined}
								anchorX="center"
								anchorY="middle"
							>
								{brandName.toUpperCase()}
							</Text>
							<Text
								position={[-69.12, 4.85, -49.51]}
								rotation={[0.01, -4.69, -0.02]}
								fontSize={1.4}
								color={"black"}
								font={fontMapping[fontStyle] || undefined}
								anchorX="center"
								anchorY="middle"
							>
								{brandName.toUpperCase()}
							</Text>
						</>
					)}

					{/* Environment and camera */}
					<EnvironmentWithCamera
						playAnimation={playAnimation}
						paused={paused}
						breakpoints={breakpoints}
						currentBreakpointIndex={currentBreakpointIndex}
						onBreakpointHit={onBreakpointHit}
					/>

					{/* Optional HDR background */}
					<Environment files="/assets/images/hdrFile.hdr" background={false} />

					{/* Optional film grain effect */}
					<FilmGrain />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Scene;
