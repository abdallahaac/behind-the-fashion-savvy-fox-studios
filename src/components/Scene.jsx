// // components/Scene.jsx
// import React, { useEffect, useRef } from "react";
// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { gsap } from "gsap";
// import { Environment } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";

// // For camera debugging & real-time tweaking (optional)
// import { useControls } from "leva";

// // Our custom 3D model
// import { Human } from "../models/Human";

// export function Scene({ stage, skipIntro }) {
//   const meshRef = useRef(null);
//   const { camera, gl } = useThree();

//   // LEVA: example controls for the model
//   const {
//     meshPosition,
//     meshScale,
//     meshColor,
//     roughness,
//     metalness,
//     brightness,
//   } = useControls("Mesh", {
//     meshPosition: { value: [2.8, -9.7, 1.5], step: 0.1 },
//     meshScale: { value: 0.7, step: 0.1 },
//     meshColor: "#ffffff",
//     roughness: {
//       value: 0.2,
//       min: 0,
//       max: 1,
//       step: 0.01,
//       label: "Roughness",
//     },
//     metalness: {
//       value: 0.81,
//       min: 0,
//       max: 1,
//       step: 0.01,
//       label: "Metalness",
//     },
//     brightness: {
//       value: 1.0,
//       min: 0,
//       max: 2,
//       step: 0.01,
//       label: "Brightness Factor",
//     },
//   });

//   // Final color calculation
//   const finalColor = React.useMemo(() => {
//     const color = new THREE.Color(meshColor);
//     color.multiplyScalar(brightness);
//     return color;
//   }, [meshColor, brightness]);

//   // LEVA: Example camera controls if you want to fine-tune
//   const { camFov, toneMappingExposure } = useControls("Camera & Render", {
//     camFov: { value: 34, min: 1, max: 120, step: 1 },
//     toneMappingExposure: { value: 1.0, min: 0, max: 3, step: 0.01 },
//   });

//   // LEVA: Bloom controls
//   const { bloomIntensity, bloomThreshold, bloomSmoothing } = useControls(
//     "Bloom",
//     {
//       bloomIntensity: {
//         value: 8.0,
//         min: 0,
//         max: 10,
//         step: 0.1,
//       },
//       bloomThreshold: {
//         value: 0.0,
//         min: 0,
//         max: 1,
//         step: 0.01,
//       },
//       bloomSmoothing: {
//         value: 0.21,
//         min: 0,
//         max: 1,
//         step: 0.01,
//       },
//     }
//   );

//   // Handle toneMapping exposure from LEVA
//   useEffect(() => {
//     gl.toneMapping = THREE.ACESFilmicToneMapping;
//     gl.outputEncoding = THREE.sRGBEncoding;
//     gl.toneMappingExposure = toneMappingExposure;
//   }, [toneMappingExposure, gl]);

//   // Animate camera or model when stage changes
//   useEffect(() => {
//     // On mount, set initial camera
//     if (stage === "intro") {
//       // For example, place camera in an 'intro' position
//       camera.position.set(0.5, 2.9, 5.2);
//       camera.rotation.set(-0.19, -0.1, 0.11);
//       camera.fov = camFov;
//       camera.updateProjectionMatrix();
//     }

//     if (stage === "landing") {
//       // Example: GSAP camera to new position/rotation
//       gsap.to(camera.position, {
//         x: 3,
//         y: 3,
//         z: 8,
//         duration: 2,
//         ease: "power2.inOut",
//       });
//       gsap.to(camera.rotation, {
//         x: -0.2,
//         y: 0.0,
//         z: 0.0,
//         duration: 2,
//         ease: "power2.inOut",
//         onUpdate: () => camera.updateProjectionMatrix(),
//       });
//     }

//     if (stage === "buildBrand") {
//       // Another camera location
//       gsap.to(camera.position, {
//         x: 5,
//         y: 5,
//         z: 10,
//         duration: 2,
//         ease: "power2.inOut",
//       });
//       gsap.to(camera.rotation, {
//         x: -0.3,
//         y: 0.2,
//         z: 0.0,
//         duration: 2,
//         ease: "power2.inOut",
//         onUpdate: () => camera.updateProjectionMatrix(),
//       });
//     }
//   }, [stage, camera, camFov]);

//   // If user clicks "skipIntro", spin the model
//   useEffect(() => {
//     if (skipIntro && meshRef.current) {
//       gsap.to(meshRef.current.rotation, {
//         y: 5.5,
//         duration: 2,
//         ease: "power2.inOut",
//       });
//     }
//   }, [skipIntro]);

//   return (
//     <>
//       <Environment preset="sunset" intensity={1.0} />
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 10, 5]} intensity={1.0} />

//       {/* Our single Human model (replace with your actual loaded model or multiple) */}
//       <mesh ref={meshRef} position={meshPosition} rotation={[0, -1.5, 0]}>
//         <Human
//           scale={meshScale}
//           roughness={roughness}
//           metalness={metalness}
//           color={finalColor}
//         />
//       </mesh>

//       {/* Post-processing */}
//       <EffectComposer>
//         <Bloom
//           intensity={bloomIntensity}
//           luminanceThreshold={bloomThreshold}
//           luminanceSmoothing={bloomSmoothing}
//         />
//       </EffectComposer>
//     </>
//   );
// }
