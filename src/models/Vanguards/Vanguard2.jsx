import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF("models/vangard2.glb");

	useEffect(() => {
		Object.values(materials).forEach((material) => {
			// Set roughness to 1 and metalness to 0 for a diffuse surface.
			material.roughness = 1;
			material.metalness = 1.1;
			// Disable any environment map reflections
			if (material.envMap) {
				material.envMapIntensity = 0;
			}
			// Disable clearcoat if present
			if (material.clearcoat !== undefined) {
				material.clearcoat = 0;
			}
			if (material.clearcoatRoughness !== undefined) {
				material.clearcoatRoughness = 1;
			}
		});
	}, [materials]);

	return (
		<group {...props} dispose={null}>
			<group
				position={[208, 39, -1.5]}
				rotation={[Math.PI / 2, 0, 1.5]}
				scale={0.009}
			>
				<mesh
					geometry={nodes.Mesh_0001.geometry}
					material={materials["Material.032"]}
				/>
				<mesh
					geometry={nodes.Mesh_0001_1.geometry}
					material={materials["Material.033"]}
				/>
				<mesh
					geometry={nodes.Mesh_0001_2.geometry}
					material={materials["Material.034"]}
				/>
				<mesh
					geometry={nodes.Mesh_0001_3.geometry}
					material={materials["Material.035"]}
				/>
				<mesh
					geometry={nodes.Mesh_0001_4.geometry}
					material={materials["Velvet texture.008"]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("models/vangard2.glb");
