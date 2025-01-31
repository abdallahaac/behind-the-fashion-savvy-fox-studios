// Scene.jsx
import React, { useRef, useMemo, useEffect, useState, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { Leva, useControls } from "leva";
import { Environment, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Import your custom 3D models
import { Human } from "../models/Human.jsx";
import { LogoOne } from "../models/Logos/LogoOne.jsx";
// etc...

// A small map from style name => .ttf
const fontMap = {
  Future: "/fonts/Orbitron-Regular.ttf",
  Minimalist: "/fonts/DMSans-Regular.ttf",
  Retro: "/fonts/KodeMono-Regular.ttf",
  Elegant: "/fonts/InstrumentSerif-Regular.ttf",
  Bohemian: "/fonts/MuseoModerno-Regular.ttf",
  Playful: "/fonts/DynaPuff-Regular.ttf",
};

export const Scene = forwardRef(function Scene(
  { onSkip, isExperience, whiteBackground, brandName, fontStyle },
  cameraRef
) {
  const meshRef = useRef();
  const finalGradientRef = useRef();
  const whiteGradientRef = useRef();

  // LEVA controls for the mesh
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
    meshRotationX: { value: 0.0, step: 0.1 },
    meshRotationZ: { value: 0.1, step: 0.1 },
    meshScale: { value: 0.7, step: 0.1 },
    meshColor: "#ffffff",
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.81, min: 0, max: 1, step: 0.01 },
    brightness: { value: 1.0, min: 0, max: 2, step: 0.01 },
  });

  // Text controls
  const primaryTextControls = useControls("Text - Primary", {
    position: { value: { x: 5.7, y: 1.9, z: -5.6 }, step: 0.01 },
    rotation: { value: { x: -0.11, y: 0.03, z: 0.11 }, step: 0.01 },
    scale: { value: 1.0, min: 0.1, max: 2, step: 0.1 },
    fontSize: { value: 0.9, min: 0.1, max: 2, step: 0.1 },
    color: "#000000",
    opacity: { value: 0.7, min: 0, max: 1, step: 0.01 },
  });

  const secondaryTextControls = useControls("Text - Secondary", {
    position: { value: { x: 5.8, y: 0.8, z: -5.6 }, step: 0.1 },
    rotation: { value: { x: -0.11, y: 0.03, z: 0.1 }, step: 0.01 },
    scale: { value: 1.0, min: 0.1, max: 2, step: 0.1 },
    fontSize: { value: 0.9, min: 0.1, max: 2, step: 0.1 },
    color: "#000000",
    opacity: { value: 0.7, min: 0, max: 1, step: 0.01 },
  });

  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // LEVA camera controls
  const { camFov, camPosition, camRotation } = useControls("Camera", {
    camFov: { value: 34, min: 1, max: 120, step: 1 },
    camPosition: { value: [0.5, 2.9, 5.2], step: 0.1 },
    camRotation: { value: [-0.19, -0.1, 0.11], step: 0.1 },
  });

  // LEVA rendering controls
  const {
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    toneMappingExposure,
  } = useControls("Rendering", {
    toneMappingExposure: { value: 1.0, min: 0, max: 3, step: 0.01 },
    bloomIntensity: { value: 8.0, min: 0, max: 8, step: 0.05 },
    bloomThreshold: { value: 0.0, min: 0, max: 1, step: 0.01 },
    bloomSmoothing: { value: 0.21, min: 0, max: 1, step: 0.01 },
  });

  // Animate bloom
  const [animatedBloom, setAnimatedBloom] = useState(bloomIntensity);
  useEffect(() => {
    const target = isExperience ? 0 : bloomIntensity;
    gsap.to(
      { value: animatedBloom },
      {
        value: target,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function () {
          setAnimatedBloom(this.targets()[0].value);
        },
      }
    );
  }, [isExperience, bloomIntensity]);

  // Show/hide a logo after experience
  const [isLogoOneReady, setIsLogoOneReady] = useState(false);
  useEffect(() => {
    if (isExperience) {
      const timer = setTimeout(() => {
        setIsLogoOneReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsLogoOneReady(false);
    }
  }, [isExperience]);

  // LogoOne controls
  const logoOneControls = useControls("LogoOne", {
    position: { value: { x: 5.5, y: 0.6, z: -5.7 }, step: 0.1 },
    rotation: { value: { x: 1.2, y: 0.1, z: 0.2 }, step: 0.1 },
    scale: { value: 13.7, min: 0.1, max: 20, step: 0.1 },

    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    metalness: { value: 1, min: 0, max: 1, step: 0.01 },
  });

  // onSkip => rotate mesh + fade in "red"
  useEffect(() => {
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

  // isExperience => fade out "red", fade in "white"
  useEffect(() => {
    if (isExperience) {
      if (finalGradientRef.current) {
        gsap.to(finalGradientRef.current, { opacity: 0, duration: 2 });
      }
      if (whiteGradientRef.current) {
        gsap.to(whiteGradientRef.current, { opacity: 1, duration: 2 });
      }
    }
  }, [isExperience]);

  // Canvas creation
  const handleOnCreated = ({ gl, camera }) => {
    gl.toneMappingExposure = toneMappingExposure;
    if (cameraRef) {
      cameraRef.current = camera;
    }
  };

  // The .ttf for the selected font
  const fontURL = fontMap[fontStyle] || fontMap["Future"];
  const textString = brandName || "BRAND NAME";

  return (
    <>
      <Leva collapsed />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Brownish BG */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -3,
          }}
        >
          <defs>
            <linearGradient
              id="bgGradientBrownish"
              x1="0.084"
              y1="0.7774"
              x2="0.916"
              y2="0.2226"
            >
              <stop offset="27.78%" stopColor="#282828" />
              <stop offset="94.21%" stopColor="#52231f" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradientBrownish)" />
        </svg>

        {/* Red gradient after skip */}
        <div
          ref={finalGradientRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
            opacity: 0,
            background:
              "linear-gradient(123.21deg, #282828 27.78%, rgb(184,79,74) 94.21%)",
          }}
        />

        {/* White gradient once isExperience */}
        <svg
          ref={whiteGradientRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            opacity: 0,
            transition: "opacity 300ms ease",
          }}
        >
          <defs>
            <linearGradient id="bgGradientWhiteish" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(160, 169, 186, 0.6)" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradientWhiteish)" />
        </svg>

        {/* The 3D Canvas */}
        <Canvas
          style={{ width: "100%", height: "100%", background: "transparent" }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          onCreated={handleOnCreated}
          camera={{
            fov: camFov,
            near: 0.1,
            far: 200,
            position: camPosition,
            rotation: camRotation,
          }}
        >
          <Environment preset="sunset" intensity={1.0} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} />

          <mesh
            ref={meshRef}
            position={meshPosition}
            rotation={[meshRotationX, -1.5, meshRotationZ]}
          >
            <Human
              position={[0, 0, 0]}
              scale={meshScale}
              roughness={roughness}
              metalness={metalness}
              color={finalColor}
            />
          </mesh>

          {/* Primary 3D Text */}
          <Text
            font={fontURL}
            fontSize={primaryTextControls.fontSize}
            color={primaryTextControls.color}
            castShadow={false} // Disable casting shadows
            receiveShadow={false} // Disable receiving shadows
            position={[
              primaryTextControls.position.x,
              primaryTextControls.position.y,
              primaryTextControls.position.z,
            ]}
            rotation={[
              primaryTextControls.rotation.x,
              primaryTextControls.rotation.y,
              primaryTextControls.rotation.z,
            ]}
            scale={primaryTextControls.scale}
            anchorX="center"
            anchorY="middle"
          >
            {textString}
          </Text>

          {/* Secondary 3D Text */}
          <Text
            font={fontURL}
            fontSize={secondaryTextControls.fontSize}
            color={secondaryTextControls.color}
            position={[
              secondaryTextControls.position.x,
              secondaryTextControls.position.y,
              secondaryTextControls.position.z,
            ]}
            rotation={[
              secondaryTextControls.rotation.x,
              secondaryTextControls.rotation.y,
              secondaryTextControls.rotation.z,
            ]}
            scale={secondaryTextControls.scale}
            anchorX="center"
            anchorY="middle"
            opacity={secondaryTextControls.opacity}
          >
            <meshBasicMaterial color={0x00000} transparent opacity={0.8} />
            {textString}
          </Text>

          {/* Example: Show LogoOne if "isExperience" */}
          <LogoOne
            visible={isExperience && isLogoOneReady}
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
            scale={logoOneControls.scale}
            roughness={logoOneControls.roughness}
            metalness={logoOneControls.metalness}
          />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              intensity={animatedBloom}
              luminanceThreshold={bloomThreshold}
              luminanceSmoothing={bloomSmoothing}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </>
  );
});
