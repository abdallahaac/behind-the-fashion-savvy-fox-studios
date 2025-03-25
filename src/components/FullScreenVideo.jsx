import React, { useRef, useEffect, useState } from "react";
// Import FontAwesomeIcon and the volume icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/full-screen-video.css";

const FullScreenVideo = ({ videoSrc, onVideoEnd }) => {
	const videoRef = useRef(null);
	const [isMuted, setIsMuted] = useState(false);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (videoElement) {
			videoElement.addEventListener("ended", onVideoEnd);
		}
		return () => {
			if (videoElement) {
				videoElement.removeEventListener("ended", onVideoEnd);
			}
		};
	}, [onVideoEnd]);

	// Update the video element's muted property whenever isMuted changes.
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.muted = isMuted;
		}
	}, [isMuted]);

	// Called when the user clicks "Skip the Video"
	const handleSkip = () => {
		if (onVideoEnd) {
			onVideoEnd();
		}
	};

	// Toggle the mute state.
	const handleMuteToggle = () => {
		setIsMuted((prevMuted) => !prevMuted);
	};

	return (
		<div className="video-container">
			{/* Control buttons container */}
			<div className="video-controls">
				<button className="skip-button add-button" onClick={handleSkip}>
					Skip the Video
				</button>
				{/* Audio button with the icon that toggles on click */}
				<div className="audio-btn" onClick={handleMuteToggle}>
					<FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
				</div>
			</div>
			<video
				className="full-screen-video"
				ref={videoRef}
				src={videoSrc}
				autoPlay
				loop={true}
				controls={false}
			/>
		</div>
	);
};

export default FullScreenVideo;
