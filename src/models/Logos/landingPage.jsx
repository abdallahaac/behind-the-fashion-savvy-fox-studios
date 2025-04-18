/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Remove the Leva import since we no longer need a GUI
// import { useControls } from "leva";

export default function MainLogo(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF("models/Logos/MainLogo.glb");

	// Hard-coded default values (based on your previous Leva settings)
	const x = -0.38;
	const y = 0.13;
	const z = -0.01;
	const rx = 1.5;
	const ry = 0;
	const rz = 0;
	const modelScale = 33.9;
	const rotationSpeed = 0.1;

	// Slowly rotate on the Y-axis every frame:
	useFrame((state, delta) => {
		if (!group.current) return;
		group.current.rotation.y += rotationSpeed * delta;
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.Logo_BehindTheFashion.geometry}
				material={materials["Material.001"]}
				position={[x, y, z]}
				rotation={[rx, ry, rz]}
				scale={[modelScale, modelScale, modelScale]}
			/>
		</group>
	);
}

useGLTF.preload("models/Logos/MainLogo.glb");
