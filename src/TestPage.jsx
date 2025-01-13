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