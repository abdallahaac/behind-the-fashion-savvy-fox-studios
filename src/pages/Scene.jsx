// Scene.jsx
import React, { useRef, useMemo, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { Leva, useControls } from "leva";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Import your custom 3D models
import { Human } from "../models/Human.jsx";
import { LogoOne } from "../models/Logos/LogoOne.jsx";
import { LogoTwo } from "../models/Logos/LogoTwo.jsx";
import { LogoThree } from "../models/Logos/LogoThree.jsx";
import { LogoFour } from "../models/Logos/LogoFour.jsx";
import { LogoFive } from "../models/Logos/LogoFive.jsx";

export const Scene = forwardRef(function Scene({ onSkip }, cameraRef) {
  const meshRef = useRef();
  const finalGradientRef = useRef();

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

  // Compute final color
  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // LEVA: Camera Controls
  const { camFov, camPosition, camRotation } = useControls("Camera", {
    camFov: { value: 34, min: 1, max: 120, step: 1 },
    camPosition: { value: [0.5, 2.9, 5.2], step: 0.1 },
    camRotation: { value: [-0.19, -0.1, 0.11], step: 0.1 },
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

  // LEVA: Logo Controls
  const logoOneControls = useControls("LogoOne", {
    position: {
      value: { x: -2, y: 1, z: -3 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
      label: "Rotation",
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      step: 0.1,
      label: "Scale",
    },
  });

  const logoTwoControls = useControls("LogoTwo", {
    position: {
      value: { x: 3, y: 0.5, z: -4 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: 0, y: Math.PI / 4, z: 0 },
      step: 0.1,
      label: "Rotation",
    },
    scale: {
      value: { x: 1.2, y: 1.2, z: 1.2 },
      step: 0.1,
      label: "Scale",
    },
  });

  const logoThreeControls = useControls("LogoThree", {
    position: {
      value: { x: -4, y: 2, z: 1 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: Math.PI / 6, y: 0, z: Math.PI / 6 },
      step: 0.1,
      label: "Rotation",
    },
    scale: {
      value: { x: 0.8, y: 0.8, z: 0.8 },
      step: 0.1,
      label: "Scale",
    },
  });

  const logoFourControls = useControls("LogoFour", {
    position: {
      value: { x: 1, y: -1, z: -2 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
      label: "Rotation",
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      step: 0.1,
      label: "Scale",
    },
  });

  const logoFiveControls = useControls("LogoFive", {
    position: {
      value: { x: 5, y: 1.5, z: 0 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: 0, y: Math.PI / 2, z: 0 },
      step: 0.1,
      label: "Rotation",
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      step: 0.1,
      label: "Scale",
    },
  });

  // Skip animation (for your existing logic)
  React.useEffect(() => {
    if (onSkip && meshRef.current && finalGradientRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: 5.5,
        duration: 2,
        ease: "power2.inOut",
      });

      gsap.to(finalGradientRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [onSkip]);

  // Handle camera reference
  const handleOnCreated = ({ gl, camera }) => {
    // Set exposure
    gl.toneMappingExposure = toneMappingExposure;

    // Store camera in the parent's ref
    if (cameraRef) {
      cameraRef.current = camera;
    }
  };

  return (
    <>
      <Leva collapsed />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Initial gradient */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
          }}
        >
          <defs>
            <linearGradient
              id="bgGradientInitial"
              x1="0.084"
              y1="0.7774"
              x2="0.916"
              y2="0.2226"
            >
              <stop offset="27.78%" stopColor="#282828" />
              <stop offset="94.21%" stopColor="#52231f" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradientInitial)" />
        </svg>

        {/* Final gradient */}
        <div
          ref={finalGradientRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(123.21deg, #282828 27.78%, rgb(184,79,74) 94.21%)",
            zIndex: -1,
            opacity: 0,
            transition: "opacity 300ms ease",
          }}
        />

        {/* Three.js Canvas */}
        <Canvas
          style={{ width: "100%", height: "100%", background: "transparent" }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding,
          }}
          onCreated={handleOnCreated}
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

          {/* LogoOne */}
          <LogoOne
            position={[
              logoOneControls.position.x,
              logoOneControls.position.y,
              logoOneControls.position.z,
            ]}
            rotation={[
              logoOneControls.rotation.x,
              logoOneControls.rotation.y,
              logoOneControls.rotation.z,
            ]}
            scale={[
              logoOneControls.scale.x,
              logoOneControls.scale.y,
              logoOneControls.scale.z,
            ]}
          />

          {/* LogoTwo */}
          {/* <LogoTwo
            position={[
              logoTwoControls.position.x,
              logoTwoControls.position.y,
              logoTwoControls.position.z,
            ]}
            rotation={[
              logoTwoControls.rotation.x,
              logoTwoControls.rotation.y,
              logoTwoControls.rotation.z,
            ]}
            scale={[
              logoTwoControls.scale.x,
              logoTwoControls.scale.y,
              logoTwoControls.scale.z,
            ]}
          /> */}

          {/* LogoThree */}
          {/* <LogoThree
            position={[
              logoThreeControls.position.x,
              logoThreeControls.position.y,
              logoThreeControls.position.z,
            ]}
            rotation={[
              logoThreeControls.rotation.x,
              logoThreeControls.rotation.y,
              logoThreeControls.rotation.z,
            ]}
            scale={[
              logoThreeControls.scale.x,
              logoThreeControls.scale.y,
              logoThreeControls.scale.z,
            ]}
          /> */}

          {/* LogoFour */}
          {/* <LogoFour
            position={[
              logoFourControls.position.x,
              logoFourControls.position.y,
              logoFourControls.position.z,
            ]}
            rotation={[
              logoFourControls.rotation.x,
              logoFourControls.rotation.y,
              logoFourControls.rotation.z,
            ]}
            scale={[
              logoFourControls.scale.x,
              logoFourControls.scale.y,
              logoFourControls.scale.z,
            ]}
          /> */}

          {/* LogoFive */}
          {/* <LogoFive
            position={[
              logoFiveControls.position.x,
              logoFiveControls.position.y,
              logoFiveControls.position.z,
            ]}
            rotation={[
              logoFiveControls.rotation.x,
              logoFiveControls.rotation.y,
              logoFiveControls.rotation.z,
            ]}
            scale={[
              logoFiveControls.scale.x,
              logoFiveControls.scale.y,
              logoFiveControls.scale.z,
            ]}
          /> */}

          {/* Post-Processing */}
          <EffectComposer>
            <Bloom
              intensity={bloomIntensity}
              luminanceThreshold={bloomThreshold}
              luminanceSmoothing={bloomSmoothing}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
});
