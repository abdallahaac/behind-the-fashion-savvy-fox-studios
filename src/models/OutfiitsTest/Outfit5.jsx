/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 outfit5.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF("models/outfit5.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.hair001.geometry}
				material={materials["hair_defaultMat4.001"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.hair001_1.geometry}
				material={materials["Dummy_SHD1.001"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.outfit3j001.geometry}
				material={materials["Satin Fabric.004"]}
				position={[0, 0, 0.265]}
				rotation={[1.575, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.outfit3j001_2.geometry}
				material={materials["Neutral Woven Fabric.001"]}
				position={[0, 0, 0.265]}
				rotation={[1.575, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.outfit3j001_3.geometry}
				material={materials["Medival fabric.001"]}
				position={[0, 0, 0.265]}
				rotation={[1.575, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.outfit3j001_5.geometry}
				material={materials["Fabric.010"]}
				position={[0, 0, 0.265]}
				rotation={[1.575, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.Retopo_body002.geometry}
				material={materials["Fabric.009"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.Retopo_shoes_r003.geometry}
				material={materials["Material.002"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.Sphere001.geometry}
				material={materials["Material.003"]}
				position={[0, 16.996, 0.529]}
				rotation={[-0.506, 0, 0]}
				scale={[0.171, 0.171, 0.04]}
			/>
		</group>
	);
}

useGLTF.preload("models/outfit5.glb");
