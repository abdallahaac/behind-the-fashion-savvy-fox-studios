import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";
import { Leva } from "leva";
import { gsap } from "gsap";

// Import **all** the same styles here (and only here):
import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";

// Sub-components
import { Scene } from "./Scene";
import { LandingContent } from "./LandingContent";
import { IntroText } from "./IntroText";

// Import BuildBrand component
import BuildBrandExperience from "./BuildBrandExperience";

const Intro = () => {
  const [skip, setSkip] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [startExperience, setStartExperience] = useState(false);
  const [fadeOutAll, setFadeOutAll] = useState(false); // <-- New fade-out state

  /**
   * We will store the THREE.js camera in a ref so that we can animate it
   * when "Start Experience" is clicked in LandingContent.
   */
  const cameraRef = useRef(null);

  // Sentences for intro text
  const sentences = [
    "Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society.",
    "Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three? Let’s find out.",
  ];

  // Skip intro logic
  const handleSkipIntro = (e) => {
    e.preventDefault();
    setSkip(true);
    // Wait for GSAP rotation in Scene to finish
    setTimeout(() => {
      setShowLanding(true);
    }, 2000);
  };

  /**
   * This function is passed into LandingContent and called when
   * the user clicks the "Start the Experience" button. It will:
   *   1. Fade out the marquee header and landing content.
   *   2. After fade-out completes, animate the camera.
   *   3. Show the BuildBrand UI.
   */
  const handleStartExpCameraAnim = () => {
    // 1) Trigger fade-out
    setFadeOutAll(true);

    // 2) Wait for fade-out transition to finish before animating camera
    setTimeout(() => {
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: 6.1,
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => {
            // 3) Finally show BuildBrand
            setStartExperience(true);
          },
        });
      }
    }, 1500); // match or exceed your .fade-out transition duration
  };

  // Lock body scrolling, etc. (as in your original code)
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
      {/* Background 3D Scene */}
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
        {/**
         * Pass the cameraRef and skip state to <Scene />.
         * Also pass the isExperience state if needed.
         */}
        <Scene onSkip={skip} ref={cameraRef} isExperience={startExperience} />
      </div>

      {/* Include Leva (collapsed) if you still need it */}
      <Leva collapsed />

      {/* Page Content */}
      <div className="homepage" style={{ position: "relative" }}>
        {/* Conditionally render the marquee header (fade out if needed) */}
        {!startExperience && (
          <header className={`banner ${fadeOutAll ? "fade-out" : ""}`}>
            <Marquee
              gradient={false}
              speed={30}
              pauseOnHover={false}
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              &nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE
              FASHION // BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE
              FASHION // BEHIND THE FASHION
            </Marquee>
          </header>
        )}

        <main className="content" style={{ position: "relative" }}>
          {/* Step 1: Intro text (shown if not skipping & not showing landing) */}
          {!startExperience && !showLanding && (
            <IntroText
              sentences={sentences}
              onSkip={handleSkipIntro}
              showLanding={showLanding}
            />
          )}

          {/* Step 2: Landing content (once skip is done) */}
          {!startExperience && showLanding && (
            <div
              className={`landing-container ${fadeOutAll ? "fade-out" : ""}`}
            >
              <LandingContent onStartExp={handleStartExpCameraAnim} />
            </div>
          )}

          {/* Step 3: BuildBrand UI (shown after camera anim) */}
          {startExperience && <BuildBrandExperience />}
        </main>
      </div>
    </>
  );
};

export default Intro;
