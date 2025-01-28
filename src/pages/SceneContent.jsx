// SceneContent.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { useControls } from "leva";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Custom 3D model
import { Human } from "../models/Human.jsx";

export const SceneContent = ({ animateCamera }) => {
  const meshRef = useRef();
  const cameraRef = useRef();

  // LEVA: Mesh Controls
  const {
    meshPosition,
    meshRotationX,
    meshRotationZ,
    meshScale,
    meshColor,
    roughness,
    metalness,
    brightness,
  } = useControls("Mesh", {
    meshPosition: { value: [2.8, -9.7, 1.5], step: 0.1, label: "Position" },
    meshRotationX: { value: 0.0, step: 0.1, label: "Rotation X" },
    meshRotationZ: { value: 0.1, step: 0.1, label: "Rotation Z" },
    meshScale: { value: 0.7, step: 0.1, label: "Scale" },
    meshColor: "#ffffff",
    roughness: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.01,
      label: "Roughness",
    },
    metalness: {
      value: 0.81,
      min: 0,
      max: 1,
      step: 0.01,
      label: "Metalness",
    },
    brightness: {
      value: 1.0,
      min: 0,
      max: 2,
      step: 0.01,
      label: "Brightness Factor",
    },
  });

  // LEVA: Camera Controls
  const { camFov, camPosition, camRotation } = useControls("Camera", {
    camFov: {
      value: 34,
      min: 1,
      max: 120,
      step: 1,
      label: "Field of View",
    },
    camPosition: {
      value: { x: 0.5, y: 2.9, z: 5.2 },
      step: 0.1,
      label: "Position",
    },
    camRotation: {
      value: { x: -0.19, y: -0.1, z: 0.11 },
      step: 0.01,
      label: "Rotation",
    },
  });

  // LEVA: Rendering Controls
  const {
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    toneMappingExposure,
  } = useControls("Rendering", {
    toneMappingExposure: {
      value: 1.0,
      min: 0,
      max: 3,
      step: 0.01,
      label: "ToneMapping Exposure",
    },
    bloomIntensity: {
      value: 8.0,
      min: 0,
      max: 8,
      step: 0.05,
      label: "Bloom Intensity",
    },
    bloomThreshold: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
      label: "Bloom Threshold",
    },
    bloomSmoothing: {
      value: 0.21,
      min: 0,
      max: 1,
      step: 0.01,
      label: "Bloom Smoothing",
    },
  });

  // Final color calculation
  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // Handle Camera and Gradient Animation
  useEffect(() => {
    if (animateCamera && meshRef.current && cameraRef.current) {
      console.log("Animating camera to x = 7.2 and background transition.");

      // Rotate the mesh
      gsap.to(meshRef.current.rotation, {
        y: 5.5,
        duration: 2,
        ease: "power2.inOut",
      });

      // Animate the camera's x position to 7.2
      gsap.to(cameraRef.current.position, {
        x: 7.2,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [animateCamera]);

  // Update camera's projection matrix
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <>
      {/* Perspective Camera */}
      <PerspectiveCamera
        makeDefault
        fov={camFov}
        position={[camPosition.x, camPosition.y, camPosition.z]}
        rotation={[camRotation.x, camRotation.y, camRotation.z]}
        ref={cameraRef}
      />

      {/* Environment and Lights */}
      <Environment preset="sunset" intensity={1.0} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />

      {/* Human Model */}
      <mesh
        ref={meshRef}
        position={meshPosition}
        rotation={[meshRotationX, -1.5, meshRotationZ]}
      >
        <Human
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={meshScale}
          roughness={roughness}
          metalness={metalness}
          color={finalColor}
        />
      </mesh>

      {/* Post-Processing */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={bloomSmoothing}
        />
      </EffectComposer>
    </>
  );
};
