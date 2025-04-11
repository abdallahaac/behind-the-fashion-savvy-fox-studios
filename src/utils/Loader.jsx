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
				backgroundColor: "white", // maintain dark background
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					color: "#C83C00", // Use button's primary color
					fontSize: "24px",
					fontWeight: "bold", // Match the button's bold style
					textAlign: "center",
					padding: "20px",
					border: "2px solid #C83C00", // Optional: add a border to highlight the loading text
					borderRadius: "10px", // Rounded corners to match button aesthetics
				}}
			>
				<p style={{ margin: "0 0 10px" }}>Loading 3D Assets...</p>
				<p style={{ margin: 0 }}>{progress.toFixed(2)}%</p>
			</div>
		</div>
	);
}
