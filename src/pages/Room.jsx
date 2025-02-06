import React, { useState } from "react";
import Metric from "../components/MetricWidget";
import Logo from "../components/Logo";
import Scene from "../utils/Scene";
import leaf from "../assets/images/leaf.svg";
import thumb from "../assets/images/thumb.svg";
import heart from "../assets/images/heart.svg";
import { useModels } from "../utils/ModelsContext";

function Room() {
	const { LogoChoices, budget, setBudget } = useModels();
	// State for the camera's z-position
	const [cameraZ, setCameraZ] = useState(5); // initial camera z is 5
	// State to trigger the Blender animation
	const [playAnimation, setPlayAnimation] = useState(false);

	// This callback receives the newBudget from Tutorial, stores in context
	const handleBudgetGenerated = (newBudget) => {
		setBudget(newBudget); // Write to context
	};

	// Handler for button click
	const handleClick = () => {
		console.log("Button clicked, triggering animation.");
		// Optionally update camera position (if needed)
		setCameraZ(2.7);
		// Trigger the Blender animation by setting playAnimation to true.
		setPlayAnimation(true);
		// If you need the animation to be re-triggerable,
		// you might later reset playAnimation to false (for example, using a timeout).
	};

	return (
		<>
			<div className="logo-container">
				<Logo />
				{/* ... other metrics ... */}
			</div>

			<div className="canvas-container" style={{ position: "relative" }}>
				{/* Button placed on top of the canvas */}
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						padding: "8px 16px",
						zIndex: 10,
					}}
					onClick={handleClick}
				>
					Click Me
				</button>

				{/* Pass cameraZ and playAnimation state to Scene */}
				<Scene targetCameraZ={cameraZ} playAnimation={playAnimation} />
			</div>
		</>
	);
}

export default Room;
