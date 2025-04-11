// SceneWithLoader.js
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import Scene from "./Scene";
import LoadingOverlay from "./LoadingOverlay";

export default function SceneWithLoader(props) {
	const { progress } = useProgress();
	const [fullyLoaded, setFullyLoaded] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);

	// When progress hits 100, mark the scene as fully loaded.
	useEffect(() => {
		if (progress === 100) {
			setFullyLoaded(true);
		}
	}, [progress]);

	const handleEnter = () => {
		setShowOverlay(false);
	};

	return (
		<div style={{ position: "relative", width: "100vw", height: "100vh" }}>
			<Canvas
				style={{
					width: "100%",
					height: "100%",
					background: showOverlay ? "white" : "transparent",
					transition: "background 1s ease",
				}}
				camera={{
					fov: 34,
					near: 0.1,
					far: 200,
					position: [2, 7, 5],
				}}
			>
				<Suspense fallback={null}>
					<Scene {...props} />
				</Suspense>
			</Canvas>
			{showOverlay && (
				<LoadingOverlay
					progress={progress}
					fullyLoaded={fullyLoaded}
					onEnter={handleEnter}
				/>
			)}
		</div>
	);
}
