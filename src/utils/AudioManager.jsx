import React, { createContext, useContext, useRef } from "react";
import backgroundMusic from "../assets/sounds/backgroundMusic/BTF_Backgroundmusic.mp3";
import notificationSound from "../assets/sounds/notifications/Button_12.mp3";
import uiClickSound from "../assets/sounds/UI/Buttons/Button_2.mp3";
import startSound from "../assets/sounds/UI/Buttons/Button_8.mp3";
import transitionSound from "../assets/sounds/UI/UI_transition/UI_CLASSIC_Button_Mid_Simple_06.wav";
import ethicsNeutral from "../assets/sounds/Vanguards/Female/Female_neutral.mp3";
import ethicsBad from "../assets/sounds/Vanguards/Female/female_disgust.mp3";
import wealthNeutral from "../assets/sounds/Vanguards/Male/Male_bald_neutral.mp3";
import wealthBad from "../assets/sounds/Vanguards/Male/Male_bald_bad.mp3";
import ecoNeutral from "../assets/sounds/Vanguards/Male/Male_eco_neutral.mp3";
import ecoBad from "../assets/sounds/Vanguards/Male/Male_eco_bad.mp3";
import moneySound from "../assets/sounds/moneysound/cash.mp3"
import robot1 from "../assets/sounds/robot/robot_2.mp3";
import addToCollection from "../assets/sounds/UI/Buttons/Button_22.mp3";
import removeFromCollection from "../assets/sounds/UI/Buttons/Button_15.mp3";
import heartsSound from "../assets/sounds/UI/Hearts/heart2.wav";
import overallHeartSound from "../assets/sounds/UI/Hearts/Heart.mp3";
import correctSound from "../assets/sounds/quiz/right/correct.mp3";
import wrongSound from "../assets/sounds/quiz/wrong/incorrect.mp3";
import hotseatMusic from "../assets/sounds/quiz/Quiz_music/quiz_track.wav";

// Create the AudioManagerContext
const AudioManagerContext = createContext();

// AudioManagerProvider Component
export const AudioManagerProvider = ({ children }) => {
    // Audio refs
    const bgMusicRef = useRef(null);
    const notificationSoundRef = useRef(null);
    const uiClickSoundRef = useRef(null);
    const uiStartSoundRef = useRef(null);
    const uiTransitionRef = useRef(null);
    const ethicsNeutralRef = useRef(null);
    const ethicsBadRef = useRef(null);
    const wealthNeutralRef = useRef(null);
    const wealthBadRef = useRef(null);
    const environmentNeutralRef = useRef(null);
    const environmentBadRef = useRef(null); 
    const moneySoundRef = useRef(null);   
    const robotSound1Ref = useRef(null);  
    const addToCollectionRef = useRef(null);    
    const removeFromCollectionRef = useRef(null);
    const heartsSoundRef = useRef(null);
    const correctSoundRef = useRef(null);
    const wrongSoundRef = useRef(null);
    const hotseatMusicRef = useRef(null);
    const overallHeartSoundRef = useRef(null);

    // Utility function to play a sound
    const playSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.pause(); // Reset the sound
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.error("Error playing sound:", err);
            });
        }
    };

    // Utility function to pause a sound
    const pauseSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    return (
        <>
            {/* Audio Elements */}
            <audio ref={bgMusicRef} src={backgroundMusic} loop />
            <audio ref={notificationSoundRef} src={notificationSound} />
            <audio ref={uiClickSoundRef} src={uiClickSound} />
            <audio ref={uiStartSoundRef} src={startSound} />
            <audio ref={uiTransitionRef} src={transitionSound} />
            <audio ref={ethicsNeutralRef} src={ethicsNeutral} />
            <audio ref={ethicsBadRef} src={ethicsBad} />
            <audio ref={wealthNeutralRef} src={wealthNeutral} />
            <audio ref={wealthBadRef} src={wealthBad} />
            <audio ref={environmentNeutralRef} src={ecoNeutral} />
            <audio ref={environmentBadRef} src={ecoBad} />
            <audio ref={moneySoundRef} src={moneySound} />
            <audio ref={robotSound1Ref} src={robot1} />
            <audio ref={addToCollectionRef} src={addToCollection} />
            <audio ref={removeFromCollectionRef} src={removeFromCollection} />
            <audio ref={heartsSoundRef} src={heartsSound} />
            <audio ref={correctSoundRef} src={correctSound} />
            <audio ref={wrongSoundRef} src={wrongSound} />
            <audio ref={hotseatMusicRef} src={hotseatMusic} loop />
            <audio ref={overallHeartSoundRef} src={overallHeartSound} />

            {/* Provide the refs and utility functions via context */}
            <AudioManagerContext.Provider
                value={{
                    refs: { bgMusicRef, notificationSoundRef, uiClickSoundRef, uiStartSoundRef, uiTransitionRef, ethicsNeutralRef, ethicsBadRef, wealthNeutralRef, wealthBadRef, environmentNeutralRef, environmentBadRef, moneySoundRef, robotSound1Ref, addToCollectionRef, removeFromCollectionRef, heartsSoundRef, correctSoundRef, wrongSoundRef, hotseatMusicRef, overallHeartSoundRef },
                    playSound,
                    pauseSound,
                }}
            >
                {children}
            </AudioManagerContext.Provider>
        </>
    );
};

// Hook to use the AudioManagerContext
export const useAudioManager = () => useContext(AudioManagerContext);