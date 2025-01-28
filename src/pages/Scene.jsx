// Scene.jsx
import React, { useEffect, useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { Leva, useControls } from "leva";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Custom 3D model
import { Human } from "../models/Human.jsx";

export const Scene = ({ onSkip }) => {
  const meshRef = useRef();

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
    meshPosition: { value: [2.8, -9.7, 1.5], step: 0.1 },
    meshRotationX: { value: 0.0, step: 0.1, label: "Rotation X" },
    meshRotationZ: { value: 0.1, step: 0.1, label: "Rotation Z" },
    meshScale: { value: 0.7, step: 0.1 },
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

  // Final color calculation
  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // Rotate the mesh on skip intro
  useEffect(() => {
    if (onSkip && meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: 5.5,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [onSkip]);

  // LEVA: Camera Controls
  const { camFov, camPosition, camRotation } = useControls("Camera", {
    camFov: {
      value: 34,
      min: 1,
      max: 120,
      step: 1,
    },
    camPosition: {
      value: [0.5, 2.9, 5.2],
      step: 0.1,
    },
    camRotation: {
      value: [-0.19, -0.1, 0.11],
      step: 0.1,
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

  return (
    <>
      <Leva collapsed />
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)",
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        onCreated={({ gl }) => {
          // Set exposure from LEVA controls
          gl.toneMappingExposure = toneMappingExposure;
        }}
        camera={{
          fov: camFov,
          near: 0.1,
          far: 200,
          position: camPosition,
          rotation: camRotation,
        }}
      >
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
      </Canvas>
    </>
  );
};
