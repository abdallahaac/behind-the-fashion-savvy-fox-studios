// Cutscene.jsx
import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/cutscene.css";

const Cutscene = ({ videoSrc, onCutsceneEnd }) => {
	const [fadeState, setFadeState] = useState("init");
	const videoRef = useRef(null);

	useEffect(() => {
		// After mount, wait ~50ms then go from "init" => "fade-in"
		const fadeInTimer = setTimeout(() => {
			setFadeState("fade-in");
		}, 50);

		return () => clearTimeout(fadeInTimer);
	}, []);

	const handleVideoEnd = () => {
		// Pause so the final frame stays still while fading out

		// Switch container to "fade-out"
		setFadeState("fade-out");

		// After fade-out completes (1.5s), remove the cutscene
		const fadeOutTimer = setTimeout(() => {
			if (onCutsceneEnd) onCutsceneEnd();
		}, 1500); // match your CSS fade-out duration

		// Cleanup if unmounted early
		return () => clearTimeout(fadeOutTimer);
	};

	return (
		<div className={`cutscene-container ${fadeState}`}>
			<video
				ref={videoRef}
				className="cutscene-video"
				src={videoSrc}
				autoPlay
				playsInline
				onEnded={handleVideoEnd}
			/>
		</div>
	);
};

export default Cutscene;
