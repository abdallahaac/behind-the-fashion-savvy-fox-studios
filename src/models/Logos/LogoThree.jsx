import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function LogoThree(props) {
  const { nodes, materials } = useGLTF("models/logo-03.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curve.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("models/logo-03.glb");
