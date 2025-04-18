/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF("models/ConventionalCotton.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_1.geometry}
				material={materials["Hexagonal Metal Frames Blueish"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_2.geometry}
				material={materials["Cotton pad muji.001"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_3.geometry}
				material={materials["leafGreen.002"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_4.geometry}
				material={materials["Muddy Soil Gravel.001"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_5.geometry}
				material={materials["Bamboo.001"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_6.geometry}
				material={materials["Material.003"]}
				scale={1.152}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder023_7.geometry}
				material={materials["Black Concave Circles"]}
				scale={1.152}
			/>
		</group>
	);
}

useGLTF.preload("models/ConventionalCotton.glb");
