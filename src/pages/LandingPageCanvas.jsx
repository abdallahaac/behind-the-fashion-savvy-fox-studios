import "../assets/styles/intro-style.css";
import "../assets/styles/logo-button.css";
import "../assets/styles/metric-widget.css";
import "../assets/styles/selection-panel.css";
import LogoThree from "../../public/images/Logo1.png";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModels } from "../utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import gsap from "gsap";

// R3F + Drei
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

// Local assets...
import production from "../assets/images/credits.svg";
import FullScreenVideo from "../components/FullScreenVideo.jsx";
import videoSrc from "../assets/videos/intro_video.mp4";

// Your glTF-based 3D logo component
import MainLogo from "../models/Logos/landingPage.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useAudioManager } from "../utils/AudioManager";

import FilmGrain from "../utils/MakeItGrain.jsx";
import hdrFile from "../assets/images/hdrFile.hdr";

const LandingPageCanvas = () => {
    const navigate = useNavigate();
    const { refs, playSound } = useAudioManager();
    const [playVideo, setPlayVideo] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    const toggleSound = () => {
        setSoundOn((prev) => {
            if (refs.bgMusicRef?.current) {
                if (prev) {
                    refs.bgMusicRef.current.pause(); // Pause music
                } else {
                    refs.bgMusicRef.current.play(); // Play music
                }
            }
            return !prev;
        });
    };

    const handleStartExp = (e) => {
        e.preventDefault();
        gsap.to(".transition-overlay", {
            duration: 0.5,
            opacity: 1,
            ease: "power2.inOut",
            onComplete: () => setPlayVideo(true),
        });
    };

    const handleVideoEnd = () => {
        gsap.to(".transition-overlay", {
            duration: 0.5,
            opacity: 1,
            ease: "power2.inOut",
            onComplete: () => {
                // Resume background music after video ends
                if (refs.bgMusicRef?.current && soundOn) {
                    refs.bgMusicRef.current.play();
                }
                navigate("/room");
            },
        });
    };

    // Start background music on page load
    useEffect(() => {
        if (refs.bgMusicRef?.current) {
            refs.bgMusicRef.current.volume = 0.2;
            refs.bgMusicRef.current.loop = true;
            playSound(refs.bgMusicRef); // Start playing background music
        }

        return () => {
            if (refs.bgMusicRef?.current) {
                refs.bgMusicRef.current.pause(); // Stop music when component unmounts
            }
        };
    }, [refs.bgMusicRef, playSound]);

    // Pause background music when video starts
    useEffect(() => {
        if (playVideo && refs.bgMusicRef?.current) {
            refs.bgMusicRef.current.pause();
        }
    }, [playVideo, refs.bgMusicRef]);

    const modelsByCategory = useModels();
    const allModels = modelsByCategory.EthicallyStrongOptions;
    const selectedModel = allModels[0] || null;

    return (
        <>
            {/* Fullscreen overlay + optional video */}
            <div className="transition-overlay" />
            {playVideo && (
                <FullScreenVideo videoSrc={videoSrc} onVideoEnd={handleVideoEnd} />
            )}

            {/* The main container */}
            <div className="landing-canvas-page">
                {/* HEADER */}
                <header className="banner">
                    <Marquee
                        gradient={false}
                        speed={30}
                        pauseOnHover={false}
                        className="marquee-center"
                    >
                        &nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
                        // BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                        BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                        BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                        BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                        BEHIND THE FASHION //
                    </Marquee>

                    <img
                        src={LogoThree}
                        alt="Logo"
                        className="superimposed-logo super-landing"
                    />
                </header>

                {/* MAIN CONTENT */}
                <main className="content">
                    <div className="text-content fade-in">
                        <div className="landing-body fade-in">
                            <h1 className="landing-h1 landing-page">
                                STEP INTO THE ROLE OF A FASHION BRAND CEO.
                            </h1>
                            <p className="body-text-medium">
                                Experience what it's like to build a fashion brand from the ground up, while managing crucial factors such as budget, audience, and sustainability.
                            </p>
                        </div>

                        <div className="audio-start">
                            <button
                                id="start-button"
                                className="add-button body-text-medium fade-in"
                                onClick={handleStartExp}
                            >
                                Build Your Brand
                            </button>
                            <div className="audio-btn" onClick={toggleSound}>
                                <FontAwesomeIcon
                                    icon={soundOn ? faVolumeHigh : faVolumeXmark}
                                />
                            </div>
                        </div>

                        <div className="credits-container fade-in">
                            <img src={production} alt="production" />
                        </div>
                    </div>

                    {/* Canvas + 3D Model */}
                    <div
                        className="intro-image model-container fade-in"
                        style={{ position: "relative", width: "100%", height: "100%" }}
                    >
                        <Canvas
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                pointerEvents: "auto",
                            }}
                            camera={{ position: [0, 0, 5], fov: 45 }}
                        >
                            <FilmGrain />

                            <ambientLight intensity={1.2} />
                            <directionalLight intensity={1} position={[1, 1, 10]} />

                            {/* The 3D Main Logo */}
                            <MainLogo />

                            {/* Hide OrbitControls by disabling them */}
                            <OrbitControls enabled={false} />

                            <Environment files={hdrFile} background={false} />
                        </Canvas>
                    </div>
                </main>
            </div>
        </>
    );
};

export default LandingPageCanvas;