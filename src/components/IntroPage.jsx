ac
a...
Invisible

v... — Yesterday at 10:53 PM
Image
v... — Yesterday at 11:06 PM
Image
add in decription of each outfit the collection originality score
and price
ac — Yesterday at 11:35 PM
i keep getting the same error againnn
Image
is it fine if i just merge with intro branch?
ac — Today at 1:30 AM
Image
v... — Today at 1:31 AM
YAYAYAYYESSSS
ac — Today at 1:31 AM
Woooo
Didn’t get the font change added yet
Im passing out 😂
v... — Today at 1:31 AM
LOL THATS OKAY bed time
I’m about to head off to bed too
Good work!
ac — Today at 1:32 AM
You too!
v... — Today at 4:51 PM
okay so I asked jeremy to try this: https://optimizeglb.com/
Compress .glb and .gltf online. Get 5 free credits now.
Fast and Efficient GLB Compressor - Compress glTF and glb files without losing quality online. Get 5 free credits.
and if that doesnt work we'll need to try DRACO loader
and if they eventually become really small sizes, we can load all outfits in when landing on choosing outfit age because right now it does the ..LOADING thing everytime we switch to outfit 1..2.3..4
ac — Today at 5:01 PM
Amazing let’s goooo
v... — Today at 5:19 PM
jeremy is taking a while tho :// i dont want to use up my free credits for the ones hes already sent
ac — Today at 5:39 PM
I can do it
v... — Today at 5:52 PM
JEREMY JUST SENT EM
okay ive been working on using dracoLoader
but i think me u and jeremy should hop on a call later
to see if we can work together for the last page
ac — Today at 5:56 PM
Heading home rn
v... — Today at 6:12 PM
okayy i need to use my PC cause the files got too big
☠️
ac — Today at 6:18 PM
just got home gonna finish up the font selection
ac — Today at 7:15 PM
just finished the build a brand section and connected it the the choose-selection page
v... — Today at 7:15 PM
okay nice! did u add the tutorial part to the brand part
as an overlay
also i want to merge some stuff from test-veronica to main-web
ac — Today at 7:16 PM
where are we putting that? and which video?
v... — Today at 7:17 PM
Image
it should look like this with buiild a brand under it
and the code to use it as a component:
import React from 'react';
import Tutorial from './components/Tutorial';
import bmaxx1 from "./assets/videos/BMAXX_1.mp4";
import bmaxx2 from "./assets/videos/BMAXX_2.mp4";

const App = () => {
    const tutorialVideos = [
        bmaxx1,
        bmaxx2,
    ];

    return (
        <div className="App">
            <Tutorial videos={tutorialVideos} />
        </div>
    );
};

export default App;
 
the nvideos i think r already in videos folder
okay so i will wait to push my changes
because its an old file change that updates the originality score of each outfit
ac — Today at 7:26 PM
fiiiiire
got it to work now i am just connecting the budget
v... — Today at 7:33 PM
YAY
okay im having some success with the draco loader and jeremys optimised files
ac — Today at 7:45 PM
okay all connected
wanna look it over with me real quick ?
\
v... — Today at 7:45 PM
yah
You missed a call from v... that lasted a few seconds. — Today at 7:45 PM
v... started a call. — Today at 7:45 PM
v... — Today at 7:56 PM
           <a href="#" className={`skip-intro  ${isFading ? "fade-out" : ""} accent-5`} onClick={handleSkipIntro}>
                            [SKIP INTRO]
                        </a>      
import "./intro-style.css";
import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState, Suspense } from "react";
Expand
message.txt
8 KB
﻿
import "./intro-style.css";
import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useNavigate } from 'react-router-dom';
import { ModelsProvider, useModels } from "./utils/ModelsContext.jsx";
import Marquee from "react-fast-marquee";
import BackgroundImage from "./assets/images/background-image.svg"; // Update the path to your SVG
import Experience from "./Experience.jsx";

const Intro = () => {
    const navigate = useNavigate();
    const handleSkipIntro = (e) => {
        e.preventDefault();
        navigate('/landing-page');
    };

    const sentences = [
        "Today’s clothing brands face a complex balancing act. They must not only consider the quality and cost of their materials, but also their Impact on the planet & Society. ",
        "Will your brand prioritize profits, sustainability, or ethical productions — can you figure out a way to balance all three?  Lets find out.",
    ];

    const [revealedWords, setRevealedWords] = useState([[]]); // Tracks revealed words for each sentence
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // Tracks the current sentence
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Tracks the word index within the current sentence
    const [isFading, setIsFading] = useState(false); // Tracks if the text is fading out

    const modelsByCategory = useModels();
    const allModels = modelsByCategory.EthicallyStrongOptions;
    const selectedModel = allModels[0] || null;
    // const modelPath = selectedModel?.model || null;

    useEffect(() => {
        const words = sentences[currentSentenceIndex]?.split(" ") || [];
        const interval = setInterval(() => {
            if (currentWordIndex < words.length) {
                // Reveal words one by one in the current sentence
                setRevealedWords((prev) => {
                    const updated = [...prev];
                    updated[currentSentenceIndex] = [
                        ...(updated[currentSentenceIndex] || []),
                        words[currentWordIndex],
                    ];
                    return updated;
                });
                setCurrentWordIndex((prev) => prev + 1);
            } else if (currentSentenceIndex < sentences.length - 1) {
                // Move to the next sentence after a short delay
                setTimeout(() => {
                    setCurrentSentenceIndex((prev) => prev + 1);
                    setCurrentWordIndex(0);
                }, 1000); // Delay before starting the next sentence
                clearInterval(interval);
            } else {
                // Wait 5 seconds before fading out the words
                setTimeout(() => {
                    setIsFading(true);
                    setTimeout(() => {
                        navigate('/landing-page');
                    }, 1000); // Duration of the fade-out animation before navigating to the next page
                }, 5000); // Wait 5 seconds before starting the fade-out
                clearInterval(interval);
            }
        }, 100); // Adjust the interval to control the speed of word reveal
        return () => clearInterval(interval);
    }, [currentWordIndex, currentSentenceIndex, sentences, navigate]);

    useEffect(() => {
        // Apply styles to body and html elements
        const applyStyles = (styles) => {
            Object.keys(styles).forEach((key) => {
                document.body.style[key] = styles[key];
                document.documentElement.style[key] = styles[key];
            });
        };

        const styles = {
            margin: "0",
            padding: "0",
            fontFamily: '"Kode Mono", monospace',
            height: "100vh",
            overflow: "hidden",
            background: "linear-gradient(123.21deg, #282828 27.78%, #52231f 94.21%)",
        };

        applyStyles(styles);

        // Cleanup function to reset styles when component unmounts
        return () => {
            document.body.style = "";
            document.documentElement.style = "";
        };
    }, []);

    return (
        <div className="homepage">
            <header className="banner">
                <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={false}
                    style={{ marginTop: 10, marginBottom: 10 }}
                >
                    &nbsp;BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION
                    // BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                    BEHIND THE FASHION // BEHIND THE FASHION // BEHIND THE FASHION //
                </Marquee>
            </header>

            <main className="content">
                <div className="text-content">
					<div className={`intro-header ${isFading ? "fade-out" : ""}`}>	
                        <h1 className="accent-5">BEHIND THE FASHION</h1>
                        <h2 className="accent-6">// INTRO</h2>
                    </div>
                    <div className="intro-body">
                        {revealedWords.map((words, sentenceIndex) => (
                            <p key={sentenceIndex} className={isFading ? "fade-out" : ""}>
                                {words.map((word, wordIndex) => (
                                    <span key={wordIndex} className="fade-in-word">
                                        {word}{" "}
                                    </span>
                                ))}
                            </p>
                        ))}
                        <a href="#" className={`skip-intro  ${isFading ? "fade-out" : ""} accent-5`} onClick={handleSkipIntro}>
                            [SKIP INTRO]
                        </a>
                    </div>
                </div>

                <div className="intro-image model-container">
                    <img src={BackgroundImage} alt="Background Image" />
                    {/* <Canvas
                        gl={{
                            antialias: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                        }}
                        camera={{
                            fov: 34,
                            near: 0.1,
                            far: 200,
                            position: [0.5, 2.9, 5.2],
                            rotation: [-0.19, -0.1, 0.11],
                        }}
                    >
                        <Experience selectedModel={selectedModel} />
                    </Canvas> */}
                </div>
            </main>
        </div>
    );
};

// const root = ReactDOM.createRoot(document.querySelector("#root"));

// root.render(<Intro />);

export default Intro;
