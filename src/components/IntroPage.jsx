// src/components/IntroPage.jsx

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom"; // <-- Import Link
import BackgroundImage from "../assets/images/background-image.svg"; // Make sure the path is correct

const IntroPage = () => {
	const sentences = [
		"Sustainability and ethics in fashion are catalysts for a revolutionary shift toward a more harmonious world.",
		"This movement redefines fashion, transforming it into a force for good — ensuring style no longer comes at the expense of the planet or its people. The future of fashion is responsible, regenerative, and transformative.",
	];

	const [revealedWords, setRevealedWords] = useState([[]]);
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
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
				// move to the next sentence after short delay
				setTimeout(() => {
					setCurrentSentenceIndex((prev) => prev + 1);
					setCurrentWordIndex(0);
				}, 1000);
				clearInterval(interval);
			} else {
				clearInterval(interval); // done
			}
		}, 100);

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
					{/* Use Link instead of <a> so that React Router handles navigation */}
					<Link to="/main" className="skip-intro">
						[SKIP INTRO]
					</Link>
				</div>

				<div className="intro-image">
					<img src={BackgroundImage} alt="Fashion Intro" />
				</div>
			</main>
		</div>
	);
};

export default IntroPage;
