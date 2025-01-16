// Experience.jsx
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

// 1) Import Leva & r3f-perf for debugging
import { useControls } from "leva";
import { Perf } from "r3f-perf";

// ─────────────────────────────────────────────
const ENABLE_LEVA = false; // comment out to disable Leva
// ─────────────────────────────────────────────

// *** NEW: Import Environment from drei
import { Environment } from "@react-three/drei";

export default function Experience({ selectedModel }) {
	const { gl, camera } = useThree();
	const groupRef = useRef();

	// 2) Provide fallback defaults (if Leva is disabled)
	let cameraFov = camera.fov;
	let cameraPosition = {
		x: camera.position.x,
		y: camera.position.y,
		z: camera.position.z,
	};
	let cameraRotation = {
		x: camera.rotation.x,
		y: camera.rotation.y,
		z: camera.rotation.z,
	};
	let ambientLightIntensity = 1.5;
	let directionalLightIntensity = 4.5;

	let planePos = { x: 0, y: -1, z: 0 };
	let planeRot = { x: -Math.PI * 0.5, y: 0, z: 0 };
	let planeScale = 10;
	let planeColor = "#88ff88";

	let modelPos = { x: 0.8, y: -1.4, z: 2.8 };
	let modelRot = { x: 0, y: 0, z: 0 };
	let modelScale = 0.1;

	// 3) Only run useControls if ENABLE_LEVA is true
	if (ENABLE_LEVA) {
		({
			cameraFov,
			cameraPosition,
			cameraRotation,
			ambientLightIntensity,
			directionalLightIntensity,
		} = useControls("Debug - Camera & Lights", {
			cameraFov: { value: camera.fov, min: 10, max: 100, step: 1 },
			cameraPosition: {
				value: {
					x: camera.position.x,
					y: camera.position.y,
					z: camera.position.z,
				},
				step: 0.1,
			},
			cameraRotation: {
				value: {
					x: camera.rotation.x,
					y: camera.rotation.y,
					z: camera.rotation.z,
				},
				step: 0.01,
			},
			ambientLightIntensity: { value: 1.5, min: 0, max: 10, step: 0.1 },
			directionalLightIntensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
		}));

		({ planePos, planeRot, planeScale, planeColor } = useControls(
			"Debug - Plane",
			{
				planePos: { value: { x: 0, y: -1, z: 0 }, step: 0.1 },
				planeRot: { value: { x: -Math.PI * 0.5, y: 0, z: 0 }, step: 0.1 },
				planeScale: { value: 10, min: 1, max: 50, step: 1 },
				planeColor: "#88ff88",
			}
		));

		({ modelPos, modelRot, modelScale } = useControls("Debug - Model", {
			modelPos: { value: { x: 0.8, y: -1.4, z: 2.8 }, step: 0.1 },
			modelRot: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
			modelScale: { value: 0.1, min: 0.1, max: 5, step: 0.1 },
		}));
	}

	useFrame(() => {
		camera.fov = cameraFov;
		camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
		camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z);
		camera.updateProjectionMatrix();
	});

	// Load model via useLoader
	const modelPath = selectedModel?.model || null;
	const gltf = useLoader(GLTFLoader, modelPath);

	useEffect(() => {
		camera.rotation.set(-0.24, 0.01, 0.0);
	}, [camera]);

	// *** NEW: Override materials for reflectivity or glass
	useEffect(() => {
		if (!gltf) return;
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				// --- Option A) Metallic, mirror-like:
				child.material = new THREE.MeshPhysicalMaterial({
					metalness: 1,
					roughness: 0,
					reflectivity: 1,
					color: new THREE.Color("#ffffff"),
				});

				/* --- Option B) Glassy, translucent: 
				child.material = new THREE.MeshPhysicalMaterial({
					transmission: 1,
					thickness: 0.5,
					roughness: 0,
					metalness: 0,
					ior: 1.25, 
					envMapIntensity: 1,
					color: new THREE.Color("#ffffff"),
				});
				*/
			}
		});
	}, [gltf]);

	// Slowly auto-rotate the model
	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.2 * delta;
		}
	});

	// Optional dragging logic
	useEffect(() => {
		const canvas = gl.domElement;
		let isDragging = false;
		let lastX = 0;

		const handlePointerDown = (e) => {
			isDragging = true;
			lastX = e.clientX;
		};

		const handlePointerMove = (e) => {
			if (!isDragging || !groupRef.current) return;
			const deltaX = e.clientX - lastX;
			lastX = e.clientX;
			groupRef.current.rotation.y += deltaX * 0.01;
		};

		const handlePointerUp = () => {
			isDragging = false;
		};

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerUp);
		canvas.addEventListener("pointerleave", handlePointerUp);

		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerUp);
			canvas.removeEventListener("pointerleave", handlePointerUp);
		};
	}, [gl]);

	return (
		<>
			{/* OPTIONAL Performance panel */}
			{ENABLE_LEVA}

			{/* *** NEW: The environment map for reflections */}
			<Environment preset="city" />

			{/* Lights */}
			<directionalLight
				position={[1, 2, 3]}
				intensity={directionalLightIntensity}
			/>
			<ambientLight intensity={ambientLightIntensity} color={[11, 43, 53]} />

			{/* 3D Model */}
			<group ref={groupRef}>{gltf && <primitive object={gltf.scene} />}</group>
		</>
	);
}
