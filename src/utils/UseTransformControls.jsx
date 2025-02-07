// useTransformControls.js
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * A reusable hook that provides Leva controls for position, rotation, and scale
 */
export function useTransformControls(label = "Mesh") {
	// Create a ref for the mesh that we'll transform
	const meshRef = useRef();

	// Define Leva controls
	const { position, rotation, scale } = useControls(label, {
		position: {
			value: [0, 0, 0],
			step: 0.1,
		},
		rotation: {
			value: [0, 0, 0],
			step: 0.1,
		},
		scale: {
			value: 1,
			min: 0.1,
			max: 10,
			step: 0.1,
		},
	});

	// On every frame, update the mesh transform
	useFrame(() => {
		if (!meshRef.current) return;
		meshRef.current.position.set(...position);
		meshRef.current.rotation.set(...rotation);
		meshRef.current.scale.set(scale, scale, scale);
	});

	return meshRef;
}
