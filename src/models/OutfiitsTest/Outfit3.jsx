/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 outfit3.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF("models/outfit3.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.Retopo_shoes_r003.geometry}
				material={materials["Material.001"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.011}
			/>
			<mesh
				geometry={nodes.Retopo_body002.geometry}
				material={materials["Fabric.004"]}
				position={[0.005, 0.028, 0.291]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
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
				geometry={nodes.outfit4street_1.geometry}
				material={materials["Satin Fabric.003"]}
				position={[0, 0, -0.021]}
				rotation={[1.589, 0, 0]}
				scale={[0.011, 0.012, 0.011]}
			/>
			<mesh
				geometry={nodes.outfit4street_2.geometry}
				material={materials["Fabric.005"]}
				position={[0, 0, -0.021]}
				rotation={[1.589, 0, 0]}
				scale={[0.011, 0.012, 0.011]}
			/>
			<mesh
				geometry={nodes.outfit4street_6.geometry}
				material={materials["Clean silver(Shiny Metal).001"]}
				position={[0, 0, -0.021]}
				rotation={[1.589, 0, 0]}
				scale={[0.011, 0.012, 0.011]}
			/>
		</group>
	);
}

useGLTF.preload("models/outfit3.glb");
