import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Import from Leva & r3f-perf if needed
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience({ selectedModel }) {
	// Access the THREE.js WebGL context & camera
	const { gl, camera } = useThree();
	const [modelScene, setModelScene] = useState(null);
	const groupRef = useRef();

	// Track mouse dragging
	const isDragging = useRef(false);
	const lastX = useRef(0);

	// ─────────────────────────────────────────────
	// 1) Leva controls for camera & lights
	// ─────────────────────────────────────────────
	const {
		cameraFov,
		cameraPosition,
		ambientLightIntensity,
		directionalLightIntensity,
	} = useControls("Debug - Camera & Lights", {
		cameraFov: {
			value: camera.fov,
			min: 10,
			max: 100,
			step: 1,
		},
		cameraPosition: {
			value: {
				x: camera.position.x,
				y: camera.position.y,
				z: camera.position.z,
			},
			step: 0.1,
		},
		ambientLightIntensity: {
			value: 1.5,
			min: 0,
			max: 10,
			step: 0.1,
		},
		directionalLightIntensity: {
			value: 4.5,
			min: 0,
			max: 10,
			step: 0.1,
		},
	});

	// ─────────────────────────────────────────────
	// 2) Leva controls for the PLANE
	//    (position, rotation, scale, color, etc.)
	// ─────────────────────────────────────────────
	const { planePos, planeRot, planeScale, planeColor } = useControls(
		"Debug - Plane",
		{
			planePos: {
				value: { x: 0, y: -1, z: 0 },
				step: 0.1,
			},
			planeRot: {
				value: { x: -Math.PI * 0.5, y: 0, z: 0 },
				step: 0.1,
			},
			planeScale: {
				value: 10,
				min: 1,
				max: 50,
				step: 1,
			},
			planeColor: "#88ff88",
		}
	);

	// ─────────────────────────────────────────────
	// 3) Leva controls for the MODEL group
	//    (position, rotation, scale, etc.)
	// ─────────────────────────────────────────────
	const { modelPos, modelRot, modelScale } = useControls("Debug - Model", {
		modelPos: {
			value: { x: -3, y: 0, z: 2 },
			step: 0.1,
		},
		modelRot: {
			value: { x: 0, y: 0, z: 0 },
			step: 0.1,
		},
		modelScale: {
			value: 1,
			min: 0.1,
			max: 5,
			step: 0.1,
		},
	});

	// ─────────────────────────────────────────────
	// Apply camera & lights updates
	// ─────────────────────────────────────────────
	useFrame(() => {
		// Camera updates
		camera.fov = cameraFov;
		camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
		camera.updateProjectionMatrix();
	});

	// Load the selected model
	useEffect(() => {
		if (!selectedModel) return;
		const loader = new GLTFLoader();
		loader.load(selectedModel.model, (gltf) => {
			setModelScene(gltf.scene);
		});
	}, [selectedModel]);

	// Continuously rotate the model on the Y-axis
	useFrame((state, delta) => {
		if (groupRef.current) {
			// Add a slow auto-rotation
			groupRef.current.rotation.y += 0.2 * delta;
		}
	});

	// Attach event listeners for manual dragging
	useEffect(() => {
		const canvas = gl.domElement;

		const handlePointerDown = (e) => {
			isDragging.current = true;
			lastX.current = e.clientX;
		};

		const handlePointerMove = (e) => {
			if (!isDragging.current || !groupRef.current) return;
			const deltaX = e.clientX - lastX.current;
			lastX.current = e.clientX;
			// Manual Y-axis rotation from drag
			groupRef.current.rotation.y += deltaX * 0.01;
		};

		const handlePointerUp = () => {
			isDragging.current = false;
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

	// ─────────────────────────────────────────────
	// Return the scene
	// ─────────────────────────────────────────────
	return (
		<>
			{/* Optional performance panel */}
			{/* <Perf position="top-left" /> */}

			{/* Lights with intensities from Leva */}
			<directionalLight
				position={[1, 2, 3]}
				intensity={directionalLightIntensity}
			/>
			<ambientLight intensity={ambientLightIntensity} />

			{/* Plane with transform & color from Leva */}
			<mesh
				position={[planePos.x, planePos.y, planePos.z]}
				rotation={[planeRot.x, planeRot.y, planeRot.z]}
				scale={planeScale}
			>
				<planeGeometry />
				<meshStandardMaterial color={planeColor} />
			</mesh>

			{/* Group that holds the model with transform from Leva */}
			<group
				ref={groupRef}
				position={[modelPos.x, modelPos.y, modelPos.z]}
				rotation={[modelRot.x, modelRot.y, modelRot.z]}
				scale={modelScale}
			>
				{modelScene && <primitive object={modelScene} />}
			</group>
		</>
	);
}
