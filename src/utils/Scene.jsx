/*****************************************************
 * src/utils/Scene.jsx
 *****************************************************/
import React, { useEffect, lazy, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
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
// It creates a ref for its <group> and calls onLogoMeshMounted to send the ref upward.
function LogoGroup({ logoKey, basePosition, baseRotation, onLogoMeshMounted }) {
	const groupRef = useRef();

	useEffect(() => {
		if (onLogoMeshMounted) {
			onLogoMeshMounted(logoKey, groupRef);
		}
	}, [logoKey, onLogoMeshMounted]);

	// Use x & y from our default controls and force z = 0 initially.
	const controls = defaultLogoControls[logoKey];
	const finalPosition = [
		basePosition[0] + controls.position[0],
		basePosition[1] + controls.position[1],
		-120, // All logos start at z = 0
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
		console.log(
			"Scene: Rendering all logos at the text position. (Initial z = 0)"
		);
	}, []);

	return (
		<>
			<Canvas gl={{ antialias: true }}>
				<Suspense fallback={null}>
					{/* Global ambient light */}
					<ambientLight intensity={0.5} />

					{/* Render all logos without Leva controls */}
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

					{/* Optional HDR background (set background to true if desired) */}
					<Environment files="/assets/images/hdrFile.hdr" background={false} />

					{/* Optional film grain effect */}
					<FilmGrain />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Scene;
