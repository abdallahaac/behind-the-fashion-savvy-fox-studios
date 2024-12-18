import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Experience({ selectedModel }) {
	const { camera } = useThree();
	const [modelScene, setModelScene] = useState(null);

	const cubeRef = useRef();

	useEffect(() => {
		if (!selectedModel) return;

		// Load the selected model
		const loader = new GLTFLoader();
		loader.load(selectedModel.model, (gltf) => {
			setModelScene(gltf.scene);
		});
		// console.log(selectedModel.model);
	}, [selectedModel]);

	useFrame((state, delta) => {
		if (cubeRef.current) {
			cubeRef.current.rotation.y += delta;
		}
	});

	return (
		<>
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>

			{/* Dynamically render the model */}
			{modelScene && (
				<primitive object={modelScene} position={[0, 0, 0]} scale={[1, 1, 1]} />
			)}
		</>
	);
}
