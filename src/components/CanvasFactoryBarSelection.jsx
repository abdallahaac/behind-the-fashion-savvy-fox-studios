import React, { useEffect } from "react";
import "../assets/styles/ModelList.css";
import "../assets/styles/CanvasBarList.css";

const CanvasFactoryBarSelection = ({
	items,
	selectedIndex,
	setSelectedIndex,
	onFactorySelect,
}) => {
	// If no items, nothing to show
	if (!items || items.length === 0) {
		return null;
	}

	// On mount, ensure the first item is selected
	useEffect(() => {
		if (items.length > 0 && selectedIndex == null) {
			setSelectedIndex(0);
			if (onFactorySelect) {
				onFactorySelect(items[0]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
			console.log (items[idx])
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
