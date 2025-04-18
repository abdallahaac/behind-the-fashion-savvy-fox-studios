/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PolyesterWoolBlend(props) {
	const { nodes, materials } = useGLTF("models/PolyesterWoolBlend.glb");
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.mesh002.geometry}
				material={materials.Fur}
				position={[-7.514, 2.295, 1.757]}
				rotation={[0, -0.278, 0]}
				scale={0.265}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.mesh002_1.geometry}
				material={materials["Material.002"]}
				position={[-7.514, 2.295, 1.757]}
				rotation={[0, -0.278, 0]}
				scale={0.265}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder010_1.geometry}
				material={materials["Fabric 63"]}
				position={[-9.219, 1.769, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder010_2.geometry}
				material={materials.Glass}
				position={[-9.219, 1.769, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder010_3.geometry}
				material={materials["Material.001"]}
				position={[-9.219, 1.769, 0]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Sphere004.geometry}
				material={materials["Hemp fabric"]}
				position={[-10.349, 2.532, -0.005]}
				scale={0.096}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Plane033.geometry}
				material={materials["Hemp fabric"]}
				position={[-10.527, 1.772, 0]}
				rotation={[0, 0, -Math.PI / 2]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Sphere006.geometry}
				material={materials["Hemp fabric"]}
				position={[-8.101, 2.532, 0]}
				scale={0.096}
			/>
		</group>
	);
}

useGLTF.preload("models/PolyesterWoolBlend.glb");

rembrandt;

city;
