// src/components/CanvasFactoryBarSelection.jsx

import React from "react";
import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasFactoryBarSelection = ({
	items,
	selectedIndex,
	setSelectedIndex,
	onFactorySelect,
}) => {
	if (!items || items.length === 0) {
		return null;
	}

	const handlePrev = () => {
		setSelectedIndex((prevIndex) => {
			const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
			if (onFactorySelect) {
				onFactorySelect(items[newIndex]);
			}
			return newIndex;
		});
	};

	const handleNext = () => {
		setSelectedIndex((prevIndex) => {
			const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
			if (onFactorySelect) {
				onFactorySelect(items[newIndex]);
			}
			return newIndex;
		});
	};

	const handleNumberClick = (idx) => {
		setSelectedIndex(idx);
		if (onFactorySelect) {
			onFactorySelect(items[idx]);
		}
	};

	return (
		<div className="canvas-list">
			<div className="model-list-container canvas-list">
				<button className="nav-button" onClick={handlePrev}>
					&lt;
				</button>
				<div className="model-buttons">
					{items.map((factory, idx) => (
						<button
							key={factory.id}
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
			</div>
		</div>
	);
};

export default CanvasFactoryBarSelection;
