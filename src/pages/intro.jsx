// Intro.jsx
import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Leva, useControls } from "leva";
import { gsap } from "gsap";
import Marquee from "react-fast-marquee";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useNavigate } from "react-router-dom";

// Custom 3D model
import { Human } from "../models/Human.jsx";

// Image imports for LandingPage content
import right_arrow from "../assets/images/right-arrow.svg";
import wordmark from "../assets/images/Savvy Fox Logo Wordmark.png";
import production from "../assets/images/A Savvy Fox Studios production.png";
import BackgroundImage from "../assets/images/background-image.svg"; // Update the path to your SVG

// -----------------------------------------------------
// SCENE COMPONENT
// -----------------------------------------------------
const Scene = ({ onSkip }) => {
  // Mesh ref for GSAP animation
  const meshRef = useRef();

  // LEVA: Mesh Controls (excluding Y rotation)
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

      {/* Human model */}
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
  );
};

// -----------------------------------------------------
// INTRO COMPONENT
// -----------------------------------------------------
const Intro = () => {
  const navigate = useNavigate(); // Not needed if not navigating
  const [skip, setSkip] = useState(false);
  const [showLanding, setShowLanding] = useState(false); // New state to show LandingPage

  const handleSkipIntro = (e) => {
    e.preventDefault();
    setSkip(true); // Trigger the rotation animation
    setTimeout(() => {
      setShowLanding(true); // Show LandingPage content after animation
    }, 2000); // Duration matches GSAP animation
  };

  const sentences = [
    "Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society.",
    "Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three? Let’s find out.",
  ];

  const [revealedWords, setRevealedWords] = useState([[]]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Reveal text word by word
  useEffect(() => {
    if (showLanding) return; // Do not reveal words if landing is shown

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
  }, [currentWordIndex, currentSentenceIndex, sentences, showLanding]);

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

  // LandingPage content: moved into a component
  const LandingContent = () => {
    const handleStartExp = (e) => {
      e.preventDefault();
      // Implement further navigation or actions
      // For example, you could trigger another animation or component
      navigate("/build-a-brand");
    };

    return (
      <div className="landing-content">
        <div className="text-content fade-in">
          <div className="landing-header fade-in">
            <h1 className="accent-5">BEHIND THE FASHION</h1>
            <h2 className="accent-6">// LANDING PAGE</h2>
          </div>
          <div className="landing-body fade-in">
            <h1 className="landing-h1 landing-page">
              STEP INTO THE ROLE OF A FASHION BRAND CEO.
            </h1>
            <p className="body-text-medium">
              Experience what it's like to build a fashion brand from the ground
              up, while <br /> managing crucial factors such as budget,
              audience, and sustainability.
            </p>
          </div>
          <button
            id="start-button"
            className="add-button body-text-medium fade-in"
            onClick={handleStartExp}
          >
            Start the Experience
            <div className="button-icon">
              <img src={right_arrow} alt="Right Arrow Icon" />
            </div>
          </button>
          <div className="credits-container fade-in">
            <img className="wordmark" src={wordmark} alt="wordmark Image" />
            <img src={production} alt="production" />
          </div>
        </div>

        <div className="intro-image model-container fade-in">
          {/* <img src={BackgroundImage} alt="Background Image" /> */}
          {/* Optionally, include Canvas or other 3D elements if needed */}
        </div>
      </div>
    );
  };

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
        <Scene onSkip={skip} />
      </div>

      {/* Leva Controls */}
      <Leva collapsed />

      {/* Page Content */}
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
          {showLanding ? (
            // Render LandingPage content
            <LandingContent />
          ) : (
            // Render Intro text
            <div className="text-content">
              <div className="intro-header">
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
                  className={`skip-intro ${
                    isFading ? "fade-out" : ""
                  } accent-5`}
                  onClick={handleSkipIntro}
                >
                  [SKIP INTRO]
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Intro;
