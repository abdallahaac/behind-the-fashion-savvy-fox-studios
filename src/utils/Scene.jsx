import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentWithCamera } from "../models/EnvironmentWIthCamera";

const Scene = ({
	playAnimation,
	paused,
	breakpoints,
	currentBreakpointIndex,
	onBreakpointHit,
}) => {
	return (
		<Canvas
			gl={{ antialias: true }}
			camera={{
				fov: 34,
				near: 0.1,
				far: 200,
				position: [2, 7, 5],
			}}
		>
			<ambientLight intensity={0.5} />
			{/* <OrbitControls /> */}

			<EnvironmentWithCamera
				playAnimation={playAnimation}
				paused={paused}
				breakpoints={breakpoints}
				currentBreakpointIndex={currentBreakpointIndex}
				onBreakpointHit={onBreakpointHit}
			/>
		</Canvas>
	);
};

export default Scene;
