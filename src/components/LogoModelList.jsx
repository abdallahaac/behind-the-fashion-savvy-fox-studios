import React, { useEffect } from "react";
import { useModels } from "../utils/ModelsContext";
import "../assets/styles/ModelList.css"; // reuse or add your own CSS

const LogoModelList = ({ selectedLogoModel, onLogoModelChange }) => {
	// Pull out the array of logo models
	const { LogoChoices = [] } = useModels();

	useEffect(() => {
		if (selectedLogoModel) {
			console.log(
				`Selected Logo Model: ${selectedLogoModel.name} (ID: ${selectedLogoModel.id})`
			);
		}
	}, [selectedLogoModel]);

	const handleLogoClick = (logoModel) => {
		onLogoModelChange(logoModel);
	};

	return (
		<div className="model-list-container">
			{/* Nav button for going backward */}
			<button
				className="nav-button"
				onClick={() =>
					onLogoModelChange((prev) =>
						prev && prev.id > LogoChoices[0].id
							? LogoChoices.find((m) => m.id === prev.id - 1)
							: prev
					)
				}
			>
				&lt;
			</button>

			<div className="model-buttons">
				{LogoChoices.map((logoModel) => (
					<button
						key={logoModel.id}
						className={`accent-6 model-button ${
							selectedLogoModel && selectedLogoModel.id === logoModel.id
								? "active"
								: ""
						}`}
						onClick={() => handleLogoClick(logoModel)}
					>
						{String(logoModel.id).padStart(2, "0")}
					</button>
				))}
			</div>

			{/* Nav button for going forward */}
			<button
				className="nav-button"
				onClick={() =>
					onLogoModelChange((prev) =>
						prev && prev.id < LogoChoices[LogoChoices.length - 1].id
							? LogoChoices.find((m) => m.id === prev.id + 1)
							: prev
					)
				}
			>
				&gt;
			</button>
		</div>
	);
};

export default LogoModelList;
