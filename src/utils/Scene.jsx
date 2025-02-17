import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentWithCamera } from "../models/EnvironmentWIthCamera";
import { useControls, Leva } from "leva";
import * as THREE from "three";

// Cube component with Leva controls for debugging and r3f animation.
// Now the animation is triggered when the logo is selected (via the logoId prop),
// not when the cube itself is clicked.
const Cube = ({ position, scale, logoId }) => {
	// Use Leva to control initial position, scale, and color.
	// We force the initial z value to -115.1.
	const { cubePosition, cubeScale, cubeColor } = useControls("Cube", {
		cubePosition: {
			value: { x: position[0], y: position[1], z: -115.1 },
			step: 0.1,
		},
		cubeScale: { value: scale, min: 0, max: 10, step: 0.1 },
		cubeColor: { value: "orange" },
	});

	const meshRef = useRef();
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		console.log("Cube: rendered with logoId:", logoId);
		if (!logoId) {
			console.error("Cube: logoId is not provided!");
		}
		// When the logoId equals "logo1", trigger the animation.
		if (logoId === "logo1") {
			setAnimate(true);
		}
	}, [logoId]);

	// Animate the cube's z position on each frame using r3f's useFrame.
	useFrame(() => {
		if (!meshRef.current) return;
		// Determine the target z: if animate is true, target is -48.1; otherwise, -115.1.
		const targetZ = animate ? -48.1 : -115.1;
		// Smoothly interpolate current z toward the target.
		meshRef.current.position.z = THREE.MathUtils.lerp(
			meshRef.current.position.z,
			targetZ,
			0.1
		);
	});

	return (
		<mesh
			ref={meshRef}
			// We do not need an onClick handler here since the animation is triggered
			// when the logo is selected.
			position={[cubePosition.x, cubePosition.y, cubePosition.z]}
			scale={cubeScale}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={cubeColor} />
		</mesh>
	);
};

const Scene = ({
	playAnimation,
	paused,
	breakpoints,
	currentBreakpointIndex,
	onBreakpointHit,
	selectedLogo, // Received from Room component
}) => {
	useEffect(() => {
		console.log("Scene: selectedLogo changed:", selectedLogo);
		if (!selectedLogo) {
			console.error("Scene: No logo selected, cube will not render.");
		}
	}, [selectedLogo]);

	return (
		<>
			{/* Render Leva panel for debugging */}
			{/* <Leva
				style={{ position: "fixed", top: "10px", right: "10px", zIndex: 90000 }}
				collapsed={false}
			/> */}
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
				{selectedLogo && (
					<Cube
						position={[-78.88, 5.539, -47.771]} // x and y are from here; z is forced to -115.1 initially.
						scale={2}
						logoId={selectedLogo}
					/>
				)}
				<EnvironmentWithCamera
					playAnimation={playAnimation}
					paused={paused}
					breakpoints={breakpoints}
					currentBreakpointIndex={currentBreakpointIndex}
					onBreakpointHit={onBreakpointHit}
				/>
			</Canvas>
		</>
	);
};

export default Scene;
