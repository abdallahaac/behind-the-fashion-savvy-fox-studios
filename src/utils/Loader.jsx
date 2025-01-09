// Loader.jsx
import React from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
	console.log("loading...");
	const { progress } = useProgress();
	return (
		<Html center>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					fontSize: "24px",
					color: "#ffffff",
				}}
			>
				<div>Loading...</div>
				<div>{progress.toFixed(2)}%</div>
			</div>
		</Html>
	);
}
