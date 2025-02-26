// FilmGrain.js
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { makeItGrain } from "./GrainShader";

export default function FilmGrain() {
	const { camera } = useThree();

	useEffect(() => {
		// Call the helper to attach the grain mesh to the camera.
		makeItGrain(THREE, camera);
	}, [camera]);

	return null;
}
