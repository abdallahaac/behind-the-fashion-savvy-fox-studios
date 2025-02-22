import React from "react";
import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasBarSelection = () => {
	return (
		<div className="canvas-list">
			<div className="model-list-container canvas-list">
				<button className="nav-button">&lt;</button>
				<div className="model-buttons">
					{/* Place your canvas bar content here */}
					<button class="accent-6 model-button ">03</button>
					<button class="accent-6 model-button ">01</button>
					<button class="accent-6 model-button ">01</button>
				</div>
				<button className="nav-button">&gt;</button>
			</div>
		</div>
	);
};

export default CanvasBarSelection;
