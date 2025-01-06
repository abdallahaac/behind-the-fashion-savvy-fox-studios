import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// 1) Import Leva & Perf
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

	// 2) Leva controls for camera & lights
	//    - cameraFov & cameraPosition
	//    - lights intensities
	const {
		cameraFov,
		cameraPosition,
		ambientLightIntensity,
		directionalLightIntensity,
	} = useControls("Debug", {
		cameraFov: {
			value: camera.fov, // Start from the current camera.fov
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

	// Update camera each frame with Leva values
	useFrame(() => {
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

	return (
		<>
			{/* 3) Add Perf in the scene - it will show top-left by default */}
			{/* <Perf position="top-left" /> */}

			{/* Lights whose intensities can be debugged via Leva */}
			<directionalLight
				position={[1, 2, 3]}
				intensity={directionalLightIntensity}
			/>
			<ambientLight intensity={ambientLightIntensity} />

			{/* Plane or ground */}
			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>

			{/* Group that holds the model for rotation */}
			<group ref={groupRef} position={[-3, 0, 2]}>
				{modelScene && <primitive object={modelScene} />}
			</group>
		</>
	);
}
