import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "../utils/Scene";
import Logo from "../components/Logo";
import Vanguard from "../components/Vanguard";
import VanguardTutorial from "../components/VanguardTutorial";
import CreateBrand from "../components/CreateBrand";
import Hotseat from "../components/Hotseat";
import QuizQuestions from "../utils/QuizQuestions";
import { handleNext, handleDone } from "../utils/Handlers/HotSeat-Handlers";
import FabricLab from "./FabricLabCanvas";
import VanguardPopUp from "../components/VanguardPopUps";

function Room() {
	const [vanguardActiveStates, setVanguardActiveStates] = useState([
		true,
		false,
		false,
		false,
	]);
	const [showTutorial, setShowTutorial] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);
	const [playAnimation, setPlayAnimation] = useState(false);
	const [paused, setPaused] = useState(false);
	const [showCreateBrand, setShowCreateBrand] = useState(false);
	const [showVanguardUI, setShowVanguardUI] = useState(false);
	const [showHotseat, setShowHotseat] = useState(true);
	const [currentBreakpointIndex, setCurrentBreakpointIndex] = useState(0);
	const breakpoints = [44, 183, 339, 550];

	const [selectedLogo, setSelectedLogo] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [fontStyle, setFontStyle] = useState("");

	const canvasContainerRef = useRef(null);
	const logoContainerRef = useRef(null);
	const vanguardContainerRef = useRef(null);
	const tutorialContainerRef = useRef(null);

	// Used for Hotseat questions
	const [currentStep, setCurrentStep] = useState(0);
	const [mode, setMode] = useState("Normal");
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedQuestions, setSelectedQuestions] = useState([]);
	const [result, setResult] = useState(0);
	const [funding, setFunding] = useState("Funding");

	useEffect(() => {
		console.log("Room: selectedLogo updated:", selectedLogo);
	}, [selectedLogo]);

	useEffect(() => {
		gsap.fromTo(
			canvasContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
		gsap.fromTo(
			logoContainerRef.current,
			{ opacity: 0 },
			{ duration: 1, opacity: 1, ease: "power2.out" }
		);
	}, []);

	useEffect(() => {
		if (showVanguardUI && vanguardContainerRef.current) {
			gsap.set(vanguardContainerRef.current, { x: -100, opacity: 0 });
			gsap.to(vanguardContainerRef.current, {
				duration: 1,
				x: 0,
				opacity: 1,
				ease: "power3.out",
			});
		}
	}, [showVanguardUI]);

	useEffect(() => {
		if (showTutorial && tutorialContainerRef.current) {
			gsap.fromTo(
				tutorialContainerRef.current,
				{ autoAlpha: 0 },
				{ duration: 1, autoAlpha: 1, ease: "power3.out" }
			);
		}
	}, [showTutorial]);

	useEffect(() => {
		const shuffledQuestions = QuizQuestions.sort(() => 0.5 - Math.random());
		setSelectedQuestions(shuffledQuestions.slice(0, 3));
	}, []);

	const handleHotseatDone = () => {
		setShowHotseat(false); // Hide the Hotseat component
		handleDone(setMode, setCurrentStep, setQuestionIndex);
	};

	const handleBreakpointHit = (index) => {
		console.log("Reached breakpoint index:", index);
		setPaused(true);
		setCurrentBreakpointIndex(index);
		if (index === 0) {
			setShowVanguardUI(true);
		} // In Room.js, inside handleBreakpointHit:
		else if (index === 3) {
			setShowVanguardUI(true);
			// Randomly activate one vanguard from indices 1, 2, or 3:
			const randomIndex = Math.floor(Math.random() * 3) + 1; // produces 1, 2, or 3
			setVanguardActiveStates(() => {
				const newStates = [false, false, false, false]; // All off
				newStates[randomIndex] = true; // Only the random one is active
				return newStates;
			});
		}
		if (index === 1) {
			setShowCreateBrand(true);
		}
	};

	const handlePlayClick = () => {
		setPlayAnimation(true);
		setPaused(false);
	};

	const handleContinue = () => {
		setPaused(false);
		setCurrentBreakpointIndex((prev) => prev + 1);
	};

	const openTutorial = () => {
		setShowTutorial(true);
	};
	const closeTutorial = () => {
		setShowTutorial(false);
		setVanguardActiveStates((prev) => {
			const newState = [...prev];
			newState[0] = false;
			return newState;
		});
	};
	const handleTutorialDone = () => {
		closeTutorial();
		handleContinue();
	};

	// Modified onVanguardClick: receives the clicked index.
	const handleVanguardClick = (index) => {
		if (index === 0) {
			// For the first vanguard (index 0), open the tutorial.
			openTutorial();
		} else if (index > 0 && currentBreakpointIndex === 3) {
			// For any active vanguard with index 1, 2, or 3 when breakpoint is 3, show the pop-up.
			setShowPopUp(true);
		}
	};

	useEffect(() => {
		handlePlayClick();
	}, []);

	return (
		<>
			<div className="logo-container" ref={logoContainerRef}>
				<Logo />
			</div>

			<div
				className="canvas-container"
				style={{ position: "relative" }}
				ref={canvasContainerRef}
			>
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						zIndex: 200,
					}}
					onClick={handlePlayClick}
				>
					Play
				</button>
				<button
					style={{
						position: "absolute",
						top: "10px",
						left: "80px",
						zIndex: 200,
					}}
					onClick={handleContinue}
				>
					Continue
				</button>

				{showTutorial && (
					<div
						ref={tutorialContainerRef}
						style={{
							opacity: 0,
							position: "relative",
							top: "50%",
							left: 0,
							zIndex: 999,
						}}
					>
						<VanguardTutorial onDone={handleTutorialDone} />
					</div>
				)}

				{showVanguardUI && (
					<div
						ref={vanguardContainerRef}
						style={{ position: "relative", zIndex: 999, top: "50%" }}
					>
						<Vanguard
							activeStates={vanguardActiveStates}
							onVanguardClick={handleVanguardClick}
						/>
					</div>
				)}

				{showCreateBrand && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CreateBrand
							onStart={() => {
								console.log(
									"CreateBrand: onStart -> fade out Vanguard, then continue"
								);
								if (vanguardContainerRef.current) {
									gsap.to(vanguardContainerRef.current, {
										duration: 1,
										x: -200,
										opacity: 0,
										ease: "power3.inOut",
										onComplete: () => {
											setShowVanguardUI(false);
											handleContinue();
										},
									});
								} else {
									handleContinue();
								}
							}}
							onLogoSelect={(logoId) => {
								console.log("Room: onLogoSelect called with", logoId);
								setSelectedLogo(logoId);
							}}
							onCreate={() => {
								setShowCreateBrand(false);
								handleContinue();
							}}
							onBrandNameChange={setBrandName}
							onFontStyleChange={setFontStyle}
							isInputEnabled={currentBreakpointIndex >= 2} // enabled only when breakpoint 2 is reached
						/>
					</div>
				)}

				{/* Render the PopUp when conditions are met */}
				{showPopUp && (
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: 1100,
						}}
					>
						<VanguardPopUp
							onDeactivateActiveVanguard={() => {
								// Update your vanguard active states here.
								setVanguardActiveStates([true, false, false, false]);
							}}
						/>
					</div>
				)}

				<Scene
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={handleBreakpointHit}
					selectedLogo={selectedLogo}
					brandName={brandName}
					fontStyle={fontStyle}
				/>
			</div>
		</>
	);
}

export default Room;
