import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Experience({ selectedModel }) {
	const { gl } = useThree();
	const [modelScene, setModelScene] = useState(null);
	const groupRef = useRef();

	// Track mouse dragging
	const isDragging = useRef(false);
	const lastX = useRef(0);

	useEffect(() => {
		if (!selectedModel) return;

		// Load the selected model
		const loader = new GLTFLoader();
		loader.load(selectedModel.model, (gltf) => {
			setModelScene(gltf.scene);
		});
	}, [selectedModel]);

	// Continuously rotate the model on the Y-axis (slow speed)
	useFrame((state, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.2 * delta;
			// Adjust speed if needed (0.2 * delta is roughly 0.2 radians/sec)
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

			// Add manual rotation around the Y-axis
			groupRef.current.rotation.y += deltaX * 0.01;
		};

		const handlePointerUp = () => {
			isDragging.current = false;
		};

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerUp);
		canvas.addEventListener("pointerleave", handlePointerUp);

		// Cleanup
		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerUp);
			canvas.removeEventListener("pointerleave", handlePointerUp);
		};
	}, [gl]);

	return (
		<>
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

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
