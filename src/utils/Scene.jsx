import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";

// ==================== FABRICS ====================
// Import Fabric models from your FabricsTest folder
import Wool from "../models/FabricsTest/Outfit1";
import Silk from "../models/FabricsTest/Outfit2";
import RecycledWool from "../models/FabricsTest/Outfit3";
import RecycledPolyster from "../models/FabricsTest/Outfit4";
import RecycledNylon from "../models/FabricsTest/Outfit5";
import RecycledCotton from "../models/FabricsTest/Outfit6";
import PolysterWool from "../models/FabricsTest/Outfit7";
import Polyster from "../models/FabricsTest/Outfit8";
import Nylon from "../models/FabricsTest/Outfit9";
import Hemp from "../models/FabricsTest/Outfit10";
import Cotton from "../models/FabricsTest/Outfit11";
import ConventionalCotton from "../models/FabricsTest/Outfit12";

// Create a map for fabrics using the given names as keys.
const fabricsMap = {
	wool: Wool,
	silk: Silk,
	recycledWool: RecycledWool,
	recycledPolyster: RecycledPolyster,
	recycledNylon: RecycledNylon,
	recycledCotton: RecycledCotton,
	polysterWool: PolysterWool,
	polyster: Polyster,
	Nylon: Nylon,
	hemp: Hemp,
	cotton: Cotton,
	conventionalcotton: ConventionalCotton,
};

// Default controls for each fabric (customize positions, scales, rotations as needed)
const defaultFabricControls = {
	wool: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	silk: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	recycledWool: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	recycledPolyster: {
		position: [0, 0, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
	},
	recycledNylon: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	recycledCotton: {
		position: [0, 0, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
	},
	polysterWool: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	polyster: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Nylon: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	hemp: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	cotton: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	conventionalcotton: {
		position: [0, 0, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
	},
	arcrylic: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
};

// Component that renders a single fabric model group.
// It applies a base position/rotation and any per-fabric adjustments.
function FabricGroup({
	fabricKey,
	basePosition,
	baseRotation,
	onFabricMeshMounted,
}) {
	const groupRef = useRef();

	useEffect(() => {
		if (onFabricMeshMounted) {
			onFabricMeshMounted(fabricKey, groupRef);
		}
	}, [fabricKey, onFabricMeshMounted]);

	const controls = defaultFabricControls[fabricKey] || {};
	const finalPosition = [
		basePosition[0] + (controls.position[0] || 0),
		basePosition[1] + (controls.position[1] || 0),
		basePosition[2] + (controls.position[2] || 0),
	];
	const finalRotation = [
		baseRotation[0] + (controls.rotation[0] || 0),
		baseRotation[1] + (controls.rotation[1] || 0),
		baseRotation[2] + (controls.rotation[2] || 0),
	];

	return (
		<group
			ref={groupRef}
			position={finalPosition}
			rotation={finalRotation}
			scale={controls.scale}
		>
			{React.createElement(fabricsMap[fabricKey])}
		</group>
	);
}

// Component to render all fabrics.
function AllFabrics({ onFabricMeshMounted }) {
	const basePosition = [30, 7, -75]; // Example base position
	const baseRotation = [0, 1.5, 0];

	return (
		<>
			{Object.keys(fabricsMap).map((fabricKey) => (
				<FabricGroup
					key={fabricKey}
					fabricKey={fabricKey}
					basePosition={basePosition}
					baseRotation={baseRotation}
					onFabricMeshMounted={onFabricMeshMounted}
				/>
			))}
		</>
	);
}

// ==================== LOGOS ====================
// ----- LOGOS -----
import Butterfly from "../models/Logos/Butterfly";
import Heart from "../models/Logos/Heart";
import MainLogo from "../models/Logos/MainLogo";
import PinLogo from "../models/Logos/Pin";
import Shard from "../models/Logos/Shard";

// ----- FONTS -----
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

const logosMap = {
	Butterfly,
	Heart,
	MainLogo,
	Pin: PinLogo,
	Shard,
};

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

function LogoGroup({ logoKey, basePosition, baseRotation, onLogoMeshMounted }) {
	const groupRef = useRef();

	useEffect(() => {
		if (onLogoMeshMounted) {
			onLogoMeshMounted(logoKey, groupRef);
		}
	}, [logoKey, onLogoMeshMounted]);

	const controls = defaultLogoControls[logoKey];
	const finalPosition = [
		basePosition[0] + controls.position[0],
		basePosition[1] + controls.position[1],
		-120, // Force z = -120 for logos
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

// ==================== OUTFITS ====================
// ----- OUTFITS -----
import Outfit1 from "../models/OutfiitsTest/Outfit1";
import Outfit2 from "../models/OutfiitsTest/Outfit2";
import Outfit3 from "../models/OutfiitsTest/Outfit3";
import Outfit4 from "../models/OutfiitsTest/Outfit4";
import Outfit5 from "../models/OutfiitsTest/Outfit5";
import Outfit6 from "../models/OutfiitsTest/Outfit6";
import Outfit7 from "../models/OutfiitsTest/Outfit7";
import Outfit8 from "../models/OutfiitsTest/Outfit8";
import Outfit9 from "../models/OutfiitsTest/Outfit9";
import FilmGrain from "./MakeItGrain";

const outfitsMap = {
	Outfit1,
	Outfit2,
	Outfit3,
	Outfit4,
	Outfit5,
	Outfit6,
	Outfit7,
	Outfit8,
	Outfit9,
};

const defaultOutfitControls = {
	Outfit1: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit2: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit3: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit4: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit5: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit6: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit7: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit8: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
	Outfit9: { position: [0, 0, 0], scale: [1, 1, 1], rotation: [0, 0, 0] },
};

function OutfitGroup({
	outfitKey,
	basePosition,
	baseRotation,
	onOutfitMeshMounted,
}) {
	const groupRef = useRef();

	useEffect(() => {
		if (onOutfitMeshMounted) {
			onOutfitMeshMounted(outfitKey, groupRef);
		}
	}, [outfitKey, onOutfitMeshMounted]);

	const controls = defaultOutfitControls[outfitKey] || {};
	const finalZ =
		outfitKey === "Outfit1"
			? basePosition[2] + (controls.position[2] || 0)
			: -115;
	const finalPosition = [
		basePosition[0] + (controls.position[0] || 0),
		basePosition[1] + (controls.position[1] || 0),
		finalZ,
	];
	const finalRotation = [
		baseRotation[0] + (controls.rotation?.[0] || 0),
		baseRotation[1] + (controls.rotation?.[1] || 0),
		baseRotation[2] + (controls.rotation?.[2] || 0),
	];

	return (
		<group
			ref={groupRef}
			position={finalPosition}
			rotation={finalRotation}
			scale={controls.scale || [1, 1, 1]}
		>
			{React.createElement(outfitsMap[outfitKey])}
		</group>
	);
}

function AllOutfits({ onOutfitMeshMounted }) {
	const basePosition = [-39, 7, -45];
	const baseRotation = [0.01, -4.69, -0.02];

	return (
		<>
			{Object.keys(outfitsMap).map((outfitKey) => (
				<OutfitGroup
					key={outfitKey}
					outfitKey={outfitKey}
					basePosition={basePosition}
					baseRotation={baseRotation}
					onOutfitMeshMounted={onOutfitMeshMounted}
				/>
			))}
		</>
	);
}

// ==================== LAZY LOADED ENVIRONMENT & BLOOM ====================
const EnvironmentWithCamera = lazy(() =>
	import("../models/EnvironmentWithCamera").then((module) => ({
		default: module.EnvironmentWithCamera,
	}))
);
const AvantGardeBloom = lazy(() => import("../models/Meshes/AvantGardeBloom"));

// ==================== CAMERA LOGGER ====================
function CameraLogger() {
	const { camera } = useThree();
	useFrame(() => {
		// Uncomment for debugging:
		console.log(
			`Camera Position: x:${camera.position.x.toFixed(
				3
			)} y:${camera.position.y.toFixed(3)} z:${camera.position.z.toFixed(3)}`
		);
	});
	return null;
}

// ==================== SCENE COMPONENT ====================
const Scene = ({
	playAnimation,
	paused,
	breakpoints,
	currentBreakpointIndex,
	onBreakpointHit,
	brandName,
	fontStyle,
	onLogoMeshMounted,
	onOutfitMeshMounted,
	onFabricMeshMounted, // new prop for fabrics
}) => {
	useEffect(() => {
		console.log("Scene: Rendering scene with logo, outfit, and fabric meshes.");
	}, []);

	return (
		<>
			<Leva collapsed={false} />
			<Canvas gl={{ antialias: true }}>
				<Suspense fallback={null}>
					<ambientLight intensity={0.5} />

					{/* All Outfits */}
					<AllOutfits onOutfitMeshMounted={onOutfitMeshMounted} />

					{/* All Logos */}
					<AllLogos onLogoMeshMounted={onLogoMeshMounted} />

					{/* All Fabrics */}
					<AllFabrics onFabricMeshMounted={onFabricMeshMounted} />

					<CameraLogger />

					{/* Display brand name text */}
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

					<EnvironmentWithCamera
						playAnimation={playAnimation}
						paused={paused}
						breakpoints={breakpoints}
						currentBreakpointIndex={currentBreakpointIndex}
						onBreakpointHit={onBreakpointHit}
					/>

					<Environment files="/assets/images/hdrFile.hdr" background={false} />
					<FilmGrain />
				</Suspense>
			</Canvas>
		</>
	);
};

export default Scene;
