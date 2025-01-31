// BuildBrandExperience.jsx
import React from "react";
import BuildBrand from "./BuildBrand";

/**
 * A thin wrapper that takes brandName, fontStyle, and their setters
 * from Intro.jsx and passes them down to <BuildBrand/>.
 */
export default function BuildBrandExperience({
  brandName,
  setBrandName,
  fontStyle,
  setFontStyle,
}) {
  return (
    <BuildBrand
      brandName={brandName}
      setBrandName={setBrandName}
      fontStyle={fontStyle}
      setFontStyle={setFontStyle}
    />
  );
}
