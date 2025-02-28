// src/utils/Scene.jsx

import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Environment } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";

// ==================== FABRICS ====================
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
import Acrylic from "../models/FabricsTest/Outfit1";

const fabricsMap = {
	acrylic: Acrylic,
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

function FabricGroup({
	fabricKey,
	basePosition,
	baseRotation,
	onFabricMeshMounted,
}) {
	const groupRef = React.useRef();

	React.useEffect(() => {
		if (onFabricMeshMounted) {
			onFabricMeshMounted(fabricKey, groupRef);
		}
	}, [fabricKey, onFabricMeshMounted]);

	if (!fabricsMap[fabricKey]) return null;
	const FabricComponent = fabricsMap[fabricKey];

	return (
		<group
			ref={groupRef}
			position={[...basePosition]}
			rotation={[...baseRotation]}
		>
			<FabricComponent />
		</group>
	);
}

function AllFabrics({ onFabricMeshMounted }) {
	const basePos = [30, 7, -200];
	const baseRot = [0, 1.5, 0];

	return (
		<>
			{Object.keys(fabricsMap).map((key) => (
				<FabricGroup
					key={key}
					fabricKey={key}
					basePosition={basePos}
					baseRotation={baseRot}
					onFabricMeshMounted={onFabricMeshMounted}
				/>
			))}
		</>
	);
}

// ==================== FACTORIES (NEW) ====================
import Factory1 from "../models/Factories/Outfit1";
import Factory2 from "../models/Factories/Outfit2";
import Factory3 from "../models/Factories/Outfit3";
import Factory4 from "../models/Factories/Outfit4";
import Factory5 from "../models/Factories/Outfit5";

const factoryMap = {
	artisthread: Factory1,
	phoenix: Factory2,
	sundar: Factory3,
	silveroak: Factory4,
	anadolu: Factory5,
};

/**
 * We'll just loop over `Object.keys(factoryMap)` to place them all at z=-200.
 * That way they appear behind the scene and can be animated forward to z=-75.
 */
function FactoryGroup({
	factoryKey,
	basePosition,
	baseRotation,
	onFactoryMeshMounted,
}) {
	const groupRef = useRef();

	useEffect(() => {
		if (onFactoryMeshMounted) {
			onFactoryMeshMounted(factoryKey, groupRef);
		}
	}, [factoryKey, onFactoryMeshMounted]);

	if (!factoryMap[factoryKey]) return null;
	const FactoryComponent = factoryMap[factoryKey];

	return (
		<group
			ref={groupRef}
			position={[...basePosition]}
			rotation={[...baseRotation]}
		>
			<FactoryComponent />
		</group>
	);
}

function AllFactories({ onFactoryMeshMounted }) {
	const basePos = [90, 7, -200];
	const baseRot = [0, 1.5, 0];

	return (
		<>
			{Object.keys(factoryMap).map((key) => (
				<FactoryGroup
					key={key}
					factoryKey={key}
					basePosition={basePos}
					baseRotation={baseRot}
					onFactoryMeshMounted={onFactoryMeshMounted}
				/>
			))}
		</>
	);
}

// ==================== LOGOS ====================
import Butterfly from "../models/Logos/Butterfly";
import Heart from "../models/Logos/Heart";
import MainLogo from "../models/Logos/MainLogo";
import PinLogo from "../models/Logos/Pin";
import Shard from "../models/Logos/Shard";

import DMSans from "../assets/fonts/DMSans-Regular.ttf";
import InstrumentSerif from "../assets/fonts/InstrumentSerif-Regular.ttf";
import MuseoModerno from "../assets/fonts/MuseoModerno-Regular.ttf";
import Orbitron from "../assets/fonts/Orbitron-Regular.ttf";
import DynaPuff from "../assets/fonts/DynaPuff-Regular.ttf";
import KodeMono from "../assets/fonts/KodeMono-Regular.ttf";

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

	const controls = defaultLogoControls[logoKey] || {};
	const finalPosition = [
		basePosition[0] + controls.position[0],
		basePosition[1] + controls.position[1],
		-120, // push behind by default
	];
	const finalRotation = [baseRotation[0], baseRotation[1], baseRotation[2]];

	const LogoComponent = logosMap[logoKey];
	if (!LogoComponent) return null;

	return (
		<group
			ref={groupRef}
			position={finalPosition}
			rotation={finalRotation}
			scale={controls.scale}
		>
			<LogoComponent color={controls.color} />
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

	const finalZ = outfitKey === "Outfit1" ? basePosition[2] : -115;
	const finalPosition = [basePosition[0], basePosition[1], finalZ];
	const finalRotation = baseRotation;

	const OutfitComponent = outfitsMap[outfitKey];
	if (!OutfitComponent) return null;

	return (
		<group ref={groupRef} position={finalPosition} rotation={finalRotation}>
			<OutfitComponent />
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

// ==================== ENVIRONMENT & BLOOM ====================
const EnvironmentWithCamera = lazy(() =>
	import("../models/EnvironmentWithCamera").then((module) => ({
		default: module.EnvironmentWithCamera,
	}))
);

function CameraLogger() {
	const { camera } = useThree();
	useFrame(() => {
		// Uncomment to debug camera movement/position
		// console.log(
		//   `Camera Position: x:${camera.position.x.toFixed(
		//     3
		//   )} y:${camera.position.y.toFixed(3)} z:${camera.position.z.toFixed(3)}`
		// );
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
	onOutfitMeshMounted,
	onFabricMeshMounted,
	onFactoryMeshMounted, // <-- new
}) => {
	useEffect(() => {
		console.log(
			"Scene: Rendering scene with logos, outfits, fabrics, factories..."
		);
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

					{/* All Factories (NEW) */}
					<AllFactories onFactoryMeshMounted={onFactoryMeshMounted} />

					<CameraLogger />

					{/* Brand Name Text */}
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
