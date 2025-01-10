// Loader.jsx
import React from "react";
import { useProgress } from "@react-three/drei";

export default function Loader() {
	const { progress } = useProgress();

	return (
		<div
			style={{
				position: "fixed",
				zIndex: 9999,
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "#000",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div style={{ color: "#fff", fontSize: "24px", textAlign: "center" }}>
				<p>Loading 3D Assets...</p>
				<p>{progress.toFixed(2)}%</p>
			</div>
		</div>
	);
}
