import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default function AvantGardeBloom(props) {
	const group = useRef();
	// Use the useGLTF hook and configure the loader to use DRACOLoader
	const { nodes, materials } = useGLTF(
		"/models/avantGardeBloom.glb",
		(loader) => {
			const dracoLoader = new DRACOLoader();
			// Use the Google-hosted Draco decoder files (or change this to your local path)
			dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
			loader.setDRACOLoader(dracoLoader);
		}
	);

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				geometry={nodes.Sphere010.geometry}
				material={materials["Silver fabric procedural"]}
				position={[-0.06, 10.87, -0.42]}
				scale={0.25}
			/>
			<group
				position={[0.12, 10.67, -0.04]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.14, 0.19, 0.13]}
			>
				<mesh
					geometry={nodes.Sphere001.geometry}
					material={nodes.Sphere001.material}
				/>
				<mesh
					geometry={nodes.Sphere001_1.geometry}
					material={nodes.Sphere001_1.material}
				/>
				<mesh
					geometry={nodes.Sphere001_2.geometry}
					material={nodes.Sphere001_2.material}
				/>
				<mesh
					geometry={nodes.Sphere001_3.geometry}
					material={nodes.Sphere001_3.material}
				/>
				<mesh
					geometry={nodes.Sphere001_4.geometry}
					material={nodes.Sphere001_4.material}
				/>
				<mesh
					geometry={nodes.Sphere001_5.geometry}
					material={nodes.Sphere001_5.material}
				/>
			</group>
			<group
				position={[-0.25, 10.67, -0.04]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.14, 0.19, 0.13]}
			>
				<mesh
					geometry={nodes.Sphere001_6.geometry}
					material={nodes.Sphere001_6.material}
				/>
				<mesh
					geometry={nodes.Sphere001_7.geometry}
					material={nodes.Sphere001_7.material}
				/>
				<mesh
					geometry={nodes.Sphere001_8.geometry}
					material={nodes.Sphere001_8.material}
				/>
				<mesh
					geometry={nodes.Sphere001_9.geometry}
					material={nodes.Sphere001_9.material}
				/>
				<mesh
					geometry={nodes.Sphere001_10.geometry}
					material={nodes.Sphere001_10.material}
				/>
				<mesh
					geometry={nodes.Sphere001_11.geometry}
					material={nodes.Sphere001_11.material}
				/>
			</group>
			<mesh
				geometry={nodes.Retopo_hair.geometry}
				material={nodes.Retopo_hair.material}
				position={[-0.07, 11.2, -0.19]}
				scale={[0.61, 0.5, 0.5]}
			/>
			<mesh
				geometry={nodes.Retopo_Cube022.geometry}
				material={nodes.Retopo_Cube022.material}
				position={[-0.07, 10.64, 0.17]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube021.geometry}
				material={nodes.Retopo_Cube021.material}
				position={[-0.06, 10.65, -0.19]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube020.geometry}
				material={nodes.Retopo_Cube020.material}
				position={[-0.06, 11.14, -0.28]}
				scale={0.25}
			/>
			<group position={[-0.07, 10.64, 0.19]} scale={0.25}>
				<mesh
					geometry={nodes.mesh019.geometry}
					material={nodes.mesh019.material}
				/>
				<mesh
					geometry={nodes.mesh019_1.geometry}
					material={nodes.mesh019_1.material}
				/>
			</group>
			<mesh
				geometry={nodes.Retopo_Cube018.geometry}
				material={nodes.Retopo_Cube018.material}
				position={[-0.07, 10.64, 0.2]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube017.geometry}
				material={nodes.Retopo_Cube017.material}
				position={[-0.07, 10.63, 0.21]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube016.geometry}
				material={nodes.Retopo_Cube016.material}
				position={[-0.07, 10.65, -0.36]}
				rotation={[0.51, 0, 0]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube015.geometry}
				material={nodes.Retopo_Cube015.material}
				position={[-0.06, 10.63, -0.19]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_Cube014.geometry}
				material={materials["Material.009"]}
				position={[-0.06, 10.65, -0.19]}
				scale={0.25}
			/>
			<group
				position={[-0.06, 10.77, -0.88]}
				rotation={[1.47, 0, Math.PI]}
				scale={[0.11, 0.11, 0.11]}
			>
				<mesh
					geometry={nodes.Plane003.geometry}
					material={nodes.Plane003.material}
				/>
				<mesh
					geometry={nodes.Plane003_1.geometry}
					material={materials["Material.011"]}
				/>
			</group>
			<mesh
				geometry={nodes.NurbsPath034.geometry}
				material={materials["Material.012"]}
				position={[-0.06, 10.79, -1.34]}
				rotation={[0, Math.PI / 2, 0]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.leg_r.geometry}
				material={nodes.leg_r.material}
				position={[-0.68, 2.68, -0.27]}
				rotation={[Math.PI, 0, 0.02]}
				scale={[-0.24, -0.24, -0.24]}
			/>
			<mesh
				geometry={nodes.leg_l.geometry}
				material={nodes.leg_l.material}
				position={[0.59, 2.68, -0.27]}
				rotation={[0, 0, 0.02]}
				scale={[0.24, 0.24, 0.24]}
			/>
			<mesh
				geometry={nodes.largePuffer003.geometry}
				material={materials["Yellow wool"]}
				position={[-0.04, 0.31, 0.53]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.01}
			/>
			<mesh
				geometry={nodes.largePuffer.geometry}
				material={materials["Sequints Pattern Fabric"]}
				position={[-0.08, 4.43, 0.62]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.01}
			/>
			<group position={[-19.01, 0, 0]}>
				<mesh
					geometry={nodes["Geo-Scatter_Merged_Export_1"].geometry}
					material={materials["White Flower.001"]}
				/>
				<mesh
					geometry={nodes["Geo-Scatter_Merged_Export_2"].geometry}
					material={materials["M_Flower_Sunflower.001"]}
				/>
				<mesh
					geometry={nodes["Geo-Scatter_Merged_Export_3"].geometry}
					material={materials["Flower Vase_Assorted Color.003"]}
				/>
			</group>
			<group
				position={[-0.07, 10.69, -0.19]}
				rotation={[0, 0, -Math.PI / 2]}
				scale={0.25}
			>
				<mesh
					geometry={nodes.Cylinder039_1.geometry}
					material={nodes.Cylinder039_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder039_2.geometry}
					material={materials["Material.014"]}
				/>
			</group>
			<group
				position={[-0.06, 11.11, -0.76]}
				rotation={[2.2, 0, 0]}
				scale={[-0.19, -0.19, -0.19]}
			>
				<mesh
					geometry={nodes.Cylinder038_1.geometry}
					material={nodes.Cylinder038_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder038_2.geometry}
					material={nodes.Cylinder038_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder038_3.geometry}
					material={nodes.Cylinder038_3.material}
				/>
			</group>
			<group
				position={[0.3, 10.95, -0.58]}
				rotation={[-0.02, 0.44, -1.43]}
				scale={[0.19, 0.19, 0.19]}
			>
				<mesh
					geometry={nodes.Cylinder037_1.geometry}
					material={nodes.Cylinder037_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder037_2.geometry}
					material={nodes.Cylinder037_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder037_3.geometry}
					material={nodes.Cylinder037_3.material}
				/>
			</group>
			<group
				position={[0.22, 10.79, -0.72]}
				rotation={[-0.06, 0.77, -1.67]}
				scale={[0.19, 0.19, 0.19]}
			>
				<mesh
					geometry={nodes.Cylinder036_1.geometry}
					material={nodes.Cylinder036_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder036_2.geometry}
					material={nodes.Cylinder036_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder036_3.geometry}
					material={nodes.Cylinder036_3.material}
				/>
			</group>
			<group
				position={[0.1, 10.95, -0.8]}
				rotation={[0.72, 1.26, -1.99]}
				scale={[0.19, 0.19, 0.19]}
			>
				<mesh
					geometry={nodes.Cylinder035_1.geometry}
					material={nodes.Cylinder035_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder035_2.geometry}
					material={nodes.Cylinder035_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder035_3.geometry}
					material={nodes.Cylinder035_3.material}
				/>
			</group>
			<group
				position={[0.18, 11.1, -0.66]}
				rotation={[0.1, 0.81, -1.1]}
				scale={[0.18, 0.18, 0.18]}
			>
				<mesh
					geometry={nodes.Cylinder034_1.geometry}
					material={nodes.Cylinder034_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder034_2.geometry}
					material={nodes.Cylinder034_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder034_3.geometry}
					material={nodes.Cylinder034_3.material}
				/>
			</group>
			<group
				position={[0.04, 11.23, -0.62]}
				rotation={[0.12, 1.25, -0.73]}
				scale={[0.13, 0.13, 0.13]}
			>
				<mesh
					geometry={nodes.Cylinder033_1.geometry}
					material={nodes.Cylinder033_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder033_2.geometry}
					material={nodes.Cylinder033_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder033_3.geometry}
					material={nodes.Cylinder033_3.material}
				/>
			</group>
			<group
				position={[0.16, 11.24, -0.5]}
				rotation={[0.29, 0.68, -0.81]}
				scale={[0.1, 0.1, 0.1]}
			>
				<mesh
					geometry={nodes.Cylinder032_1.geometry}
					material={nodes.Cylinder032_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder032_2.geometry}
					material={nodes.Cylinder032_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder032_3.geometry}
					material={nodes.Cylinder032_3.material}
				/>
			</group>
			<group
				position={[-0.43, 10.95, -0.58]}
				rotation={[3.12, 0.44, -1.43]}
				scale={[-0.19, -0.19, -0.19]}
			>
				<mesh
					geometry={nodes.Cylinder026_1.geometry}
					material={nodes.Cylinder026_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder026_2.geometry}
					material={nodes.Cylinder026_2.material}
				/>
				<mesh
					geometry={nodes.Cylinder026_3.geometry}
					material={nodes.Cylinder026_3.material}
				/>
			</group>
			<group
				position={[-0.34, 10.79, -0.72]}
				rotation={[3.08, 0.77, -1.67]}
				scale={[-0.19, -0.19, -0.19]}
			>
				<mesh
					geometry={nodes.Cylinder006.geometry}
					material={nodes.Cylinder006.material}
				/>
				<mesh
					geometry={nodes.Cylinder006_1.geometry}
					material={nodes.Cylinder006_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder006_2.geometry}
					material={nodes.Cylinder006_2.material}
				/>
			</group>
			<group
				position={[-0.22, 10.95, -0.8]}
				rotation={[-2.42, 1.26, -1.99]}
				scale={[-0.19, -0.19, -0.19]}
			>
				<mesh
					geometry={nodes.Cylinder011.geometry}
					material={nodes.Cylinder011.material}
				/>
				<mesh
					geometry={nodes.Cylinder011_1.geometry}
					material={nodes.Cylinder011_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder011_2.geometry}
					material={nodes.Cylinder011_2.material}
				/>
			</group>
			<group
				position={[-0.31, 11.1, -0.66]}
				rotation={[-3.04, 0.81, -1.1]}
				scale={[-0.18, -0.18, -0.18]}
			>
				<mesh
					geometry={nodes.Cylinder012.geometry}
					material={nodes.Cylinder012.material}
				/>
				<mesh
					geometry={nodes.Cylinder012_1.geometry}
					material={nodes.Cylinder012_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder012_2.geometry}
					material={nodes.Cylinder012_2.material}
				/>
			</group>
			<group
				position={[-0.16, 11.23, -0.62]}
				rotation={[-3.03, 1.25, -0.73]}
				scale={[-0.13, -0.13, -0.13]}
			>
				<mesh
					geometry={nodes.Cylinder005.geometry}
					material={nodes.Cylinder005.material}
				/>
				<mesh
					geometry={nodes.Cylinder005_1.geometry}
					material={nodes.Cylinder005_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder005_2.geometry}
					material={nodes.Cylinder005_2.material}
				/>
			</group>
			<group
				position={[-0.29, 11.24, -0.5]}
				rotation={[-2.85, 0.68, -0.81]}
				scale={[-0.1, -0.1, -0.1]}
			>
				<mesh
					geometry={nodes.Cylinder004.geometry}
					material={nodes.Cylinder004.material}
				/>
				<mesh
					geometry={nodes.Cylinder004_1.geometry}
					material={nodes.Cylinder004_1.material}
				/>
				<mesh
					geometry={nodes.Cylinder004_2.geometry}
					material={nodes.Cylinder004_2.material}
				/>
			</group>
			<group
				position={[-0.06, 10.79, -2.86]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.07, 0.05, 0.07]}
			>
				<mesh
					geometry={nodes.Cylinder003.geometry}
					material={nodes.Cylinder003.material}
				/>
				<mesh
					geometry={nodes.Cylinder003_1.geometry}
					material={materials["Pyrex Glass"]}
				/>
				<mesh
					geometry={nodes.Cylinder003_2.geometry}
					material={nodes.Cylinder003_2.material}
				/>
			</group>
			<mesh
				geometry={nodes.Retopo_body002_AnkleGlass001.geometry}
				material={materials.AnkleGlass}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_bodyBase001.geometry}
				material={materials.bodyBase}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_bodyCeramic001.geometry}
				material={materials.bodyCeramic}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_fingerLight001.geometry}
				material={materials.fingerLight}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_glass_joints001.geometry}
				material={materials.glass_joints}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.25}
			/>
			<mesh
				geometry={nodes.Retopo_body002_gold_Body001.geometry}
				material={materials.gold_Body}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_Iridescent_Ceramic001.geometry}
				material={materials["Carbon Fiber"]}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_shoeBottom001.geometry}
				material={materials.shoeBottom}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_shoeLight001.geometry}
				material={materials.shoeLight}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_shoeSilver001.geometry}
				material={materials.shoeSilver}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_shoeSole_wood001.geometry}
				material={materials["Soft Neon Lamp"]}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.25, 0.25, 0.25]}
			/>
			<mesh
				geometry={nodes.Retopo_body002_thighGlass001.geometry}
				material={materials.thighGlass}
				position={[-0.05, 0.14, -0.26]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.25}
			/>
		</group>
	);
}

useGLTF.preload("/models/avantGardeBloom.glb");
