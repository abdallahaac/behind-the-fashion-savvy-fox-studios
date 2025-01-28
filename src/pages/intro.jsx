// Intro.jsx
import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

import React, { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { useNavigate } from "react-router-dom";
import { ModelsProvider, useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import BackgroundImage from "../assets/images/background-image.svg"; // If needed
import Experience from "../Experience.jsx";

// R3F + Drei
import { Environment } from "@react-three/drei";

// Postprocessing
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Your custom model
import { Human } from "../models/Human.jsx";

const Scene = () => {
  // ------------------------ LEVA: Mesh Controls ------------------------
  const {
    meshPosition,
    meshRotation,
    meshScale,
    meshColor,
    roughness,
    metalness,
    brightness,
  } = useControls("Mesh", {
    meshPosition: { value: [2.8, -9.7, 1.5], step: 0.1 },
    meshRotation: { value: [0.0, -1.5, 0.1], step: 0.1 },
    meshScale: { value: 0.7, step: 0.1 },
    meshColor: "#ffffff", // base color
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

  // We create a final color (base color + brightness factor).
  const finalColor = useMemo(() => {
    const color = new THREE.Color(meshColor);
    color.multiplyScalar(brightness);
    return color;
  }, [meshColor, brightness]);

  // ------------------------ LEVA: Camera Controls ------------------------
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

  // ------------------------ LEVA: Rendering Controls ------------------------
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
    <Canvas
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)",
      }}
      // Tone mapping + sRGB
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      onCreated={({ gl }) => {
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
      {/* Environment and lights */}
      <Environment preset="sunset" intensity={1.0} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />

      {/* 
        The Human model: 
        We now pass roughness, metalness, brightness, 
        and finalColor to the Human so it can feed them into CustomMaterial.
      */}
      <Human
        position={meshPosition}
        rotation={meshRotation}
        scale={meshScale}
        roughness={roughness}
        metalness={metalness}
        color={finalColor}
      />

      {/* Bloom Post-Processing */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={bloomSmoothing}
        />
      </EffectComposer>
    </Canvas>
  );
};

const Intro = () => {
  const navigate = useNavigate();

  const handleSkipIntro = (e) => {
    e.preventDefault();
    navigate("/landing-page");
  };

  const sentences = [
    "Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society.",
    "Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three? Let’s find out.",
  ];

  const [revealedWords, setRevealedWords] = useState([[]]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const modelsByCategory = useModels();
  const allModels = modelsByCategory.EthicallyStrongOptions;
  const selectedModel = allModels[0] || null;

  // Reveal text word by word
  useEffect(() => {
    const words = sentences[currentSentenceIndex]?.split(" ") || [];
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setRevealedWords((prev) => {
          const updated = [...prev];
          updated[currentSentenceIndex] = [
            ...(updated[currentSentenceIndex] || []),
            words[currentWordIndex],
          ];
          return updated;
        });
        setCurrentWordIndex((prev) => prev + 1);
      } else if (currentSentenceIndex < sentences.length - 1) {
        setTimeout(() => {
          setCurrentSentenceIndex((prev) => prev + 1);
          setCurrentWordIndex(0);
        }, 1000);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentWordIndex, currentSentenceIndex, sentences, navigate]);

  // Lock the body/html scrolling, etc.
  useEffect(() => {
    const applyStyles = (styles) => {
      Object.keys(styles).forEach((key) => {
        document.body.style[key] = styles[key];
        document.documentElement.style[key] = styles[key];
      });
    };
    const styles = {
      margin: "0",
      padding: "0",
      fontFamily: '"Kode Mono", monospace',
      height: "100vh",
      overflow: "hidden",
    };
    applyStyles(styles);
    return () => {
      document.body.style = "";
      document.documentElement.style = "";
    };
  }, []);

  return (
    <>
      {/* Scene behind the content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Scene />
      </div>

      {/* Leva Controls */}
      <Leva collapsed />

      {/* Text + Intro Content */}
      <div className="homepage" style={{ position: "relative" }}>
        <header className="banner">
          <Marquee
            gradient={false}
            speed={30}
            pauseOnHover={false}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            &nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
            // BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
            BEHIND THE FASHION
          </Marquee>
        </header>

        <main className="content">
          <div className="text-content">
            <div className={`intro-header ${isFading ? "fade-out" : ""}`}>
              <h1 className="accent-5">BEHIND THE FASHION</h1>
              <h2 className="accent-6">// INTRO</h2>
            </div>
            <div className="intro-body">
              {revealedWords.map((words, sentenceIndex) => (
                <p key={sentenceIndex} className={isFading ? "fade-out" : ""}>
                  {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="fade-in-word">
                      {word}{" "}
                    </span>
                  ))}
                </p>
              ))}
              <a
                href="#"
                className={`skip-intro ${isFading ? "fade-out" : ""} accent-5`}
                onClick={handleSkipIntro}
              >
                [SKIP INTRO]
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Intro;
