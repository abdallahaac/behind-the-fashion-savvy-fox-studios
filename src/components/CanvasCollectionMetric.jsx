// src/components/CanvasCollectionMetric.jsx
import React from "react";
import "../assets/styles/collection-orig-metric.css"; // or your custom CSS
import CollectionOriginalityMetric from "./CollectionOrigMetric";

function CanvasCollectionMetric({ averageOriginalPct }) {
	const plagiarizedPct = 100 - averageOriginalPct;

	return (
		<div className="canvas-collection-metric">
			<CollectionOriginalityMetric />
		</div>
	);
}

export default CanvasCollectionMetric;
