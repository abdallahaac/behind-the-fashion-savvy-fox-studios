/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function WoolModel(props) {
	const { nodes, materials } = useGLTF("models/woolsmall.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.mesh001.geometry}
				material={materials.Fur}
				scale={0.303}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.mesh001_1.geometry}
				material={materials["Material.002"]}
				scale={0.303}
			/>
		</group>
	);
}

useGLTF.preload("models/woolsmall.glb");
