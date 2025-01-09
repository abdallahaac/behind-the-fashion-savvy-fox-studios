import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Optional: If you want Leva controls
// import { useControls } from "leva";
// import { Perf } from "r3f-perf";

export default function Experience({ selectedModel }) {
	const { gl, camera } = useThree();
	const groupRef = useRef();

	// If `selectedModel` is null or undefined, you can pass a fallback URL or skip rendering
	const modelPath = selectedModel?.model || null;

	// Use the built-in Suspense-aware loader
	const gltf = useLoader(GLTFLoader, modelPath);

	// Adjust camera once, if you’d like:
	useEffect(() => {
		camera.rotation.set(-0.24, 0.01, 0.0);
	}, [camera]);

	// Example: Slowly rotate the model on Y
	useFrame((state, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.2 * delta;
		}
	});

	// Basic dragging logic (optional)
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
			{/* Optional performance panel: <Perf position="top-left" /> */}
			{/* Lights */}
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			{/* The actual 3D model */}
			<group ref={groupRef} position={[0, -1.2, 3.3]} scale={0.1}>
				{/* If gltf was loaded successfully, gltf.scene is your model */}
				{gltf && <primitive object={gltf.scene} />}
			</group>
		</>
	);
}
