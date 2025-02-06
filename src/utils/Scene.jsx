import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const RotatingCube = () => {
	const cubeRef = useRef();

	useFrame(() => {
		if (cubeRef.current) {
			cubeRef.current.rotation.x += 0.01;
			cubeRef.current.rotation.y += 0.01;
		}
	});

	return (
		<mesh ref={cubeRef} position={[0, 0, 0]}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="white" />
		</mesh>
	);
};

const Scene = () => {
	// Leva controls for adjusting camera position
	const { cameraX, cameraY, cameraZ } = useControls("Camera Position", {
		cameraX: { value: 2, min: -10, max: 10, step: 0.1 },
		cameraY: { value: 2, min: -10, max: 10, step: 0.1 },
		cameraZ: { value: 5, min: -10, max: 10, step: 0.1 },
	});

	return (
		<Canvas
			className="intro-canvas"
			gl={{
				antialias: true,
				toneMapping: THREE.ACESFilmicToneMapping,
			}}
			camera={{
				fov: 34,
				near: 0.1,
				far: 200,
				position: [cameraX, cameraY, cameraZ], // Controlled via Leva
			}}
		>
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 2, 5]} intensity={1} />

			{/* Leva-controlled camera movement */}
			<OrbitControls />

			<Suspense fallback={null}>
				<RotatingCube />
			</Suspense>
		</Canvas>
	);
};

export default Scene;
