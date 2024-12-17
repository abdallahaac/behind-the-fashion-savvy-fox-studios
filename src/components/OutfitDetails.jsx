import React from "react";
import "../assets/styles/outfit-details.css";
import greenThumb from "../assets/images/green-thumb.svg";
import redThumb from "../assets/images/red-thumb.svg";
import greenHeart from "../assets/images/green-heart.svg";
const OutfitDetails = () => {
	return (
		<div className="design-card">
			<div className="header">
				<span className="look-number">LOOK #01</span>
			</div>
			<h1 className="title">SPACE GOTHIC CHROMATICA</h1>
			<div className="feature">
				<span className="icon thumbs-up">
					<img
						src={greenThumb}
						alt="Sustainability Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">100% Original Design</span>
			</div>
			<div className="progress-bar-2">
				<div className="progress-fill"></div>
			</div>
			<p className="description">
				Purchasing original designs promote fair compensation for artists’
				skills and efforts.
			</p>

			<div className="feature">
				<span className="icon heart">
					<img
						src={greenHeart}
						alt="Sustainability Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">People Like Your Design</span>
			</div>

			<div className="feature">
				<span className="icon thumbs-down">
					<img
						src={redThumb}
						alt="Sustainability Icon"
						style={{ width: "30px", height: "30px" }}
					/>
				</span>
				<span className="feature-text">Limited Body Sizes Available</span>
			</div>
			<p className="description">
				Having a wide option of clothing sizes ensure accessibility to a wider
				range of consumers.
			</p>

			<div className="cost-row">
				<div className="cost">
					<h2>$4300</h2>
					<span>COST OF DESIGN</span>
				</div>
				<button className="add-button">+ Add to Collection</button>
			</div>
		</div>
	);
};

export default OutfitDetails;
