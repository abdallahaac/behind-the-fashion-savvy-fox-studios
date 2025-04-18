/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 outfit9.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF("models/outfit9.glb");
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
				geometry={nodes.outfit777_1.geometry}
				material={materials["Elastane Varnished.001"]}
				position={[0, -0.104, 0.278]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<mesh
				geometry={nodes.outfit777_2.geometry}
				material={materials["White Satin Fabric.001"]}
				position={[0, -0.104, 0.278]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<mesh
				geometry={nodes.outfit777_3.geometry}
				material={materials["Fabric 14.001"]}
				position={[0, -0.104, 0.278]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<mesh
				geometry={nodes.outfit777001.geometry}
				material={materials["Satin Fabric.003"]}
				position={[0, 12.091, 0.278]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<mesh
				geometry={nodes.Retopo_body002.geometry}
				material={materials["Soft Brown Satin Fabric.002"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.Retopo_shoes_r003.geometry}
				material={materials["Material.001"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
		</group>
	);
}

useGLTF.preload("models/outfit9.glb");
