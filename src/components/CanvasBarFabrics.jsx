import React from "react";
import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasBarFabrics = ({
	items,
	selectedIndex,
	setSelectedIndex,
	onFabricSelect, // callback to parent
}) => {
	if (!items || items.length === 0) {
		return null;
	}

	const handlePrev = () => {
		setSelectedIndex((prevIndex) => {
			const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
			if (onFabricSelect) {
				onFabricSelect(items[newIndex]);
			}
			return newIndex;
		});
	};

	const handleNext = () => {
		setSelectedIndex((prevIndex) => {
			const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
			if (onFabricSelect) {
				onFabricSelect(items[newIndex]);
			}
			return newIndex;
		});
	};

	const handleNumberClick = (idx) => {
		setSelectedIndex(idx);
		if (onFabricSelect) {
			onFabricSelect(items[idx]);
		}
	};

	return (
		<div className="canvas-list">
			{/* <div className="model-list-container canvas-list">
				<button className="nav-button" onClick={handlePrev}>
					&lt;
				</button>

				<div className="model-buttons">
					{items.map((fabric, idx) => (
						<button
							key={fabric.id}
							className={`accent-6 model-button ${
								idx === selectedIndex ? "active" : ""
							}`}
							onClick={() => handleNumberClick(idx)}
						>
							{idx + 1}
						</button>
					))}
				</div>

				<button className="nav-button" onClick={handleNext}>
					&gt;
				</button>
			</div> */}
		</div>
	);
};

export default CanvasBarFabrics;
