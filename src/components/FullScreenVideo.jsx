import React, { useRef, useEffect } from 'react';
import "../assets/styles/full-screen-video.css"; 

const FullScreenVideo = ({ videoSrc, onVideoEnd }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('ended', onVideoEnd);
        }
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', onVideoEnd);
            }
        };
    }, [onVideoEnd]);

    return (
        <div className="video-container">
            <video className="full-screen-video" ref={videoRef} src={videoSrc} autoPlay controls />
        </div>
    );
};

export default FullScreenVideo;