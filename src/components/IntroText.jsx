// components/IntroText.jsx
import React, { useEffect, useState } from "react";

export const IntroText = ({ sentences, onSkip, showLanding }) => {
  const [revealedWords, setRevealedWords] = useState([[]]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (showLanding) return;

    const words = sentences[currentSentenceIndex]?.split(" ") || [];
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
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
        // Wait before switching to next sentence
        setTimeout(() => {
          setCurrentSentenceIndex((prev) => prev + 1);
          setCurrentWordIndex(0);
        }, 1000);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentWordIndex, currentSentenceIndex, sentences, showLanding]);

  return (
    <div className="text-content">
      <div className="intro-header">
        <h1 className="accent-5">BEHIND THE FASHION</h1>
        <h2 className="accent-6">// INTRO</h2>
      </div>
      <div className="intro-body">
        {revealedWords.map((words, idx) => (
          <p key={idx} className={isFading ? "fade-out" : ""}>
            {words.map((word, widx) => (
              <span key={widx} className="fade-in-word">
                {word}{" "}
              </span>
            ))}
          </p>
        ))}

        {/* Skip button */}
        <a
          href="#"
          className={`skip-intro ${isFading ? "fade-out" : ""} accent-5`}
          onClick={onSkip}
        >
          [SKIP INTRO]
        </a>
      </div>
    </div>
  );
};
