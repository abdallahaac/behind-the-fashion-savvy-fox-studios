import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	OrbitControls,
	Text,
	Environment, // <-- import from drei
} from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import LoadingOverlay from "./LoadingOverlay";

// ----- LAZY LOAD YOUR LARGE ASSETS -----
const EnvironmentWithCamera = lazy(() =>
	import("../models/EnvironmentWithCamera").then((module) => ({
		default: module.EnvironmentWithCamera,
	}))
);

// Example: If you have other models
const AvantGardeBloom = lazy(() => import("../models/Meshes/AvantGardeBloom"));

// Fonts
import DMSans from "../assets/fonts/DMSans-Regular.ttf";
import InstrumentSerif from "../assets/fonts/InstrumentSerif-Regular.ttf";
import MuseoModerno from "../assets/fonts/MuseoModerno-Regular.ttf";
import Orbitron from "../assets/fonts/Orbitron-Regular.ttf";
import DynaPuff from "../assets/fonts/DynaPuff-Regular.ttf";
import KodeMono from "../assets/fonts/KodeMono-Regular.ttf";
import FilmGrain from "./MakeItGrain";

// Map style strings to font files
const fontMapping = {
	MINIMALIST: DMSans,
	FUTURE: Orbitron,
	RETRO: KodeMono,
	ELEGANT: InstrumentSerif,
	BOHEMIAN: MuseoModerno,
	PLAYFUL: DynaPuff,
};

// ----- Example Cube component with Leva controls -----
const Cube = ({ position, scale, logoId }) => {
	const { cubePosition, cubeScale, cubeColor } = useControls("Cube", {
		cubePosition: {
			value: { x: position[0], y: position[1], z: position[2] },
			step: 0.001,
		},
		cubeScale: { value: scale, min: 0, max: 10, step: 0.001 },
		cubeColor: { value: "orange" },
	});

	const meshRef = useRef();
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
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
	selectedLogo, // e.g. "logo1"
	brandName,
	fontStyle, // e.g. "MINIMALIST", "FUTURE", etc.
}) => {
	useEffect(() => {
		console.log("Scene: selectedLogo changed:", selectedLogo);
		if (!selectedLogo) {
			console.error("Scene: No logo selected, Cube will not render.");
		}
	}, [selectedLogo]);

	return (
		<>
			{/* Loading overlay that fades when assets are ready */}
			<LoadingOverlay />

			{/* 3D Canvas setup */}
			<Canvas gl={{ antialias: true }}>
				<Suspense fallback={null}>
					{/* Soft, global ambient light */}
					<ambientLight intensity={0.5} />

					{/*
           Optionally, use orbit controls for debugging or free-flight around the scene
           <OrbitControls makeDefault />
          */}

					{/* Example Cube usage */}
					{selectedLogo && (
						<Cube
							position={[-78.88, 5.539, -115.1]}
							scale={2}
							logoId={selectedLogo}
						/>
					)}

					{/* Example multiple 3D Text objects */}
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

					{/* Our environment model with camera and animations */}
					<EnvironmentWithCamera
						playAnimation={playAnimation}
						paused={paused}
						breakpoints={breakpoints}
						currentBreakpointIndex={currentBreakpointIndex}
						onBreakpointHit={onBreakpointHit}
					/>

					{/* Example: Another lazy-loaded model
          <AvantGardeBloom /> 
          */}

					{/* 
            HDR Environment: 
            - files="/path/to/hdrFile.hdr" must match your actual file location
            - background={true} if you want the HDR to show as the sky
            - If background={false}, you'll still get reflections, but no HDR sky
          */}
					<Environment files="/assets/images/hdrFile.hdr" background={false} />
					<FilmGrain />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Scene;
