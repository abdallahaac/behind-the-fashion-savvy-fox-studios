// Human.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import CustomMaterial from "../utils/CustomMaterial";

// We take in roughness, metalness, color (already multiplied by brightness)
export function Human({ roughness, metalness, color, ...props }) {
  const { nodes } = useGLTF("models/human.glb");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.human.geometry}>
        {/*
          Instead of plain <meshStandardMaterial>, we use <CustomMaterial> 
          but feed in the props from the Scene (roughness, metalness, color).
        */}
        <CustomMaterial
          roughness={roughness}
          metalness={metalness}
          meshColor={color} // rename to meshColor in CustomMaterial
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/human.glb");
