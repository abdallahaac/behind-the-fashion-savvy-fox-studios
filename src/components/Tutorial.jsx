import React, { useState, useEffect } from 'react';
import '../assets/styles/tutorial.css';
import right_arrow from "../assets/images/right-arrow.svg";

const Tutorial = ({ videos }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleNext = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    useEffect(() => {
        const videoElement = document.querySelector('.tutorial-video');
        if (videoElement) {
            videoElement.load();
            videoElement.play();
        }
    }, [currentVideoIndex]);

    return (
        <div className="tutorial-overlay">
            <div className="tutorial-box">
                <video
                    className="tutorial-video"
                    controls
                    autoPlay
                    muted
                    onEnded={handleNext}
                >
                    <source src={videos[currentVideoIndex]} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button id="tutorial-button" className="add-button" onClick={handleNext}>
                    Next
                    <div id="next-button" className="button-icon">
                        <img src={right_arrow} alt="Right Arrow Icon" />
                    </div>
                </button>
                <div className="pagination-bar">
                    {videos.map((_, index) => (
                        <div
                            key={index}
                            className={`pagination-dot ${index === currentVideoIndex ? 'active' : ''}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorial;