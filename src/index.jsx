import "./style.css";
import "./assets/styles/logo-button.css";
import "./assets/styles/metric-widget.css";
import "./assets/styles/selection-panel.css";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import BackgroundImage from "./assets/images/background-image.svg"; // Update the path to your SVG

const App = () => {
	const sentences = [
		"Sustainability and ethics in fashion are catalysts for a revolutionary shift toward a more harmonious world.",
		"This movement redefines fashion, transforming it into a force for good — ensuring style no longer comes at the expense of the planet or its people. The future of fashion is responsible, regenerative, and transformative.",
	];

	const [revealedWords, setRevealedWords] = useState([[]]); // Tracks revealed words for each sentence
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // Tracks the current sentence
	const [currentWordIndex, setCurrentWordIndex] = useState(0); // Tracks the word index within the current sentence

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
				clearInterval(interval); // Stop interval when all sentences are displayed
			}
		}, 100); // Adjust the interval to control the speed of word reveal
		return () => clearInterval(interval);
	}, [currentWordIndex, currentSentenceIndex, sentences]);

	return (
		<div className="homepage">
			<header className="header">
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
				<div className="intro-header">
					<h1>BEHIND THE FASHION</h1>
					<h2>// INTRO</h2>
				</div>
				<div className="intro-body">
					{revealedWords.map((words, sentenceIndex) => (
						<p key={sentenceIndex}>
							{words.map((word, wordIndex) => (
								<span key={wordIndex} className="fade-in-word">
									{word}{" "}
								</span>
							))}
						</p>
					))}
					<a href="#" className="skip-intro">
						[SKIP INTRO]
					</a>
				</div>
				<div className="intro-image">
					<img src={BackgroundImage} alt="Fashion Intro" />
				</div>
			</main>
		</div>
	);
};

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);

export default App;
