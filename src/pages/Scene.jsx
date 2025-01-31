import React, { useRef, useMemo, useEffect, useState, forwardRef } from "react";
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

// We add "isExperience" as a prop here
export const Scene = forwardRef(function Scene(
  { onSkip, isExperience },
  cameraRef
) {
  // Refs
  const meshRef = useRef();
  const finalGradientRef = useRef(); // "red" gradient that appears on skip
  const whiteGradientRef = useRef(); // "white" gradient that appears on experience

  // ----------------------------------
  // LEVA: Mesh Controls
  // ----------------------------------
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

  // Compute final color for the mesh
  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // ----------------------------------
  // LEVA: Camera Controls
  // ----------------------------------
  const { camFov, camPosition, camRotation } = useControls("Camera", {
    camFov: { value: 34, min: 1, max: 120, step: 1 },
    camPosition: { value: [0.5, 2.9, 5.2], step: 0.1 },
    camRotation: { value: [-0.19, -0.1, 0.11], step: 0.1 },
  });

  // ----------------------------------
  // LEVA: Rendering Controls
  // ----------------------------------
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

  // ----------------------------------
  // Animated Bloom
  // ----------------------------------
  const [animatedBloom, setAnimatedBloom] = useState(bloomIntensity);
  useEffect(() => {
    // If isExperience is true, fade bloom out to 0; otherwise revert
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

  // ----------------------------------
  // Example: Timed display of a Logo (LogoOne)
  // ----------------------------------
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

  // LEVA: LogoOne Controls
  const logoOneControls = useControls("LogoOne", {
    position: { value: { x: 6.4, y: 1, z: -3 }, step: 0.1, label: "Position" },
    rotation: {
      value: { x: 1.1, y: 0.2, z: 0.2 },
      step: 0.1,
      label: "Rotation",
    },
    scale: { value: { x: 9, y: 9, z: 9 }, step: 0.1, label: "Scale" },
    roughness: { value: 0, min: 0, max: 1, step: 0.01, label: "Roughness" },
    metalness: { value: 1, min: 0, max: 1, step: 0.01, label: "Metalness" },
  });
  const logoTwoControls = useControls("LogoTwo", {
    position: {
      value: { x: 15.3, y: 1.4, z: -3 },
      step: 0.1,
      label: "Position",
    },
    rotation: {
      value: { x: 0.0, y: -1.6, z: 0.1 },
      step: 0.1,
      label: "Rotation",
    },
    scale: { value: { x: 0.5, y: 0.5, z: 0.5 }, step: 0.1, label: "Scale" },
    roughness: { value: 0, min: 0, max: 1, step: 0.01, label: "Roughness" },
    metalness: { value: 1, min: 0, max: 1, step: 0.01, label: "Metalness" },
  });
  // ...same for Logos Two, Three, etc. if needed

  // ----------------------------------
  // onSkip => rotate mesh + fade in red finalGradientRef
  // ----------------------------------
  useEffect(() => {
    if (onSkip && meshRef.current && finalGradientRef.current) {
      // Rotate the mesh
      gsap.to(meshRef.current.rotation, {
        y: 5.5,
        duration: 2,
        ease: "power2.inOut",
      });
      // Fade in the red gradient
      gsap.to(finalGradientRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [onSkip]);

  // ----------------------------------
  // When isExperience => fade OUT red gradient, fade IN white gradient
  // ----------------------------------
  useEffect(() => {
    if (isExperience) {
      // Fade out the "red" gradient
      if (finalGradientRef.current) {
        gsap.to(finalGradientRef.current, {
          opacity: 0,
          duration: 2,
          ease: "power2.inOut",
        });
      }
      // Fade in the "white" gradient
      if (whiteGradientRef.current) {
        gsap.to(whiteGradientRef.current, {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
        });
      }
    }
  }, [isExperience]);

  // ----------------------------------
  // Handle camera creation
  // ----------------------------------
  const handleOnCreated = ({ gl, camera }) => {
    gl.toneMappingExposure = toneMappingExposure;
    if (cameraRef) {
      cameraRef.current = camera;
    }
  };

  // ----------------------------------
  // Return JSX
  // ----------------------------------
  return (
    <>
      <Leva collapsed />

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* 
          1) Base Brownish Gradient (always visible, zIndex: -3)
        */}
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

        {/*
          2) "Final" Red Gradient (appears AFTER skip, fades in via finalGradientRef)
          Start invisible at opacity:0, place it just above the base brownish (zIndex:-2)
        */}
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
            transition: "opacity 300ms ease",
          }}
        />

        {/*
          3) White Gradient (fades in ONLY once isExperience === true)
          Start invisible at opacity:0, place it topmost (zIndex:-1)
        */}
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
            <linearGradient
              id="bgGradientWhiteish"
              x1="0"
              y1="1"
              x2="0"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {/* 
                This replicates "to top, rgba(160, 169, 186, 0.6) 0%, #ffffff 100%".
              */}
              <stop offset="0%" stopColor="rgba(160, 169, 186, 0.6)" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bgGradientWhiteish)" />
        </svg>

        {/* 
          4) Three.js Canvas on top
        */}
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
          {/* Environment & Lights */}
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

          {/* Example: LogoOne once isExperience + a short delay */}
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
            scale={[
              logoOneControls.scale.x,
              logoOneControls.scale.y,
              logoOneControls.scale.z,
            ]}
            roughness={logoOneControls.roughness}
            metalness={logoOneControls.metalness}
          />
          <LogoTwo
            visible={isExperience && isLogoOneReady}
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
            roughness={logoTwoControls.roughness}
            metalness={logoTwoControls.metalness}
          />

          {/* 
            Additional logos (LogoTwo, LogoThree, etc.) go here...
          */}

          {/* Post-Processing */}
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
