// Home.jsx
import React, { useState } from "react";
import { LandingContent } from "./LandingContent"; // Adjust the path as necessary
import { Scene } from "./Scene"; // Adjust the path as necessary

export const Home = () => {
  const [startExperience, setStartExperience] = useState(false);

  const handleStartExp = () => {
    setStartExperience(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Render LandingContent only if the experience hasn't started */}
      {!startExperience && <LandingContent onStart={handleStartExp} />}

      {/* Always render Scene, but pass animateCamera as a prop */}
      <Scene animateCamera={startExperience} />
    </div>
  );
};
