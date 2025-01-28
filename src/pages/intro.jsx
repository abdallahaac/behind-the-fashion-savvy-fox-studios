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

const Intro = () => {
  const [skip, setSkip] = useState(false);
  const [showLanding, setShowLanding] = useState(false);

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
   * This function will be passed into LandingContent and called when
   * the user clicks the "Start the Experience" button. It will animate
   * the camera's x-position (instead of navigating).
   */
  const handleStartExpCameraAnim = () => {
    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: 7.1, // Move camera's x position to 7.1
        duration: 2,
        ease: "power2.inOut",
      });
    }
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
         * Pass the cameraRef to <Scene /> using ref={cameraRef}.
         * We also pass skip state so Scene can handle the "skip" animation.
         */}
        <Scene onSkip={skip} ref={cameraRef} />
      </div>

      {/* Include Leva (collapsed) if you still need it */}
      <Leva collapsed />

      {/* Page Content */}
      <div className="homepage" style={{ position: "relative" }}>
        {/* Banner with marquee */}
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
            /**
             * Instead of just rendering <LandingContent />,
             * we now pass an onStartExp prop that triggers
             * the camera animation when clicked.
             */
            <LandingContent onStartExp={handleStartExpCameraAnim} />
          ) : (
            <IntroText
              sentences={sentences}
              onSkip={handleSkipIntro}
              showLanding={showLanding}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default Intro;
