import React, { useRef, useEffect } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function EnvironmentWithCamera({
	playAnimation,
	paused,
	breakpoints = [],
	currentBreakpointIndex,
	onBreakpointHit,
	...props
}) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(
		"models/envBlockoutfull.glb"
	);
	const { actions } = useAnimations(animations, group);

	// Start/stop the actions when "playAnimation" changes
	useEffect(() => {
		if (!actions) return;

		if (playAnimation) {
			Object.values(actions).forEach((action) => {
				// <--- Disable looping and clamp on finish
				action.setLoop(THREE.LoopOnce, 1);
				action.clampWhenFinished = true;

				action.reset().play();
				action.paused = false;
			});
		} else {
			// Not playing => stop everything
			Object.values(actions).forEach((action) => action.stop());
		}
	}, [playAnimation, actions]);

	// Pause/unpause actions if "paused" changes
	useEffect(() => {
		if (!actions) return;

		// Only apply if we're actually playing. (If not playing, they're .stopped)
		if (playAnimation) {
			Object.values(actions).forEach((action) => {
				action.paused = paused;
			});
		}
	}, [paused, playAnimation, actions]);

	// On every frame, check if we crossed a breakpoint AND log the current frame
	useFrame(() => {
		if (!playAnimation || !actions || paused) return;

		const [firstAction] = Object.values(actions);
		if (!firstAction) return;

		const fps = 24;
		const currentFrame = Math.floor(firstAction.time * fps);

		// Log the current frame
		console.log(`Frame: ${currentFrame}`);

		// Check if we hit a breakpoint
		if (currentBreakpointIndex < breakpoints.length) {
			const targetFrame = breakpoints[currentBreakpointIndex];
			if (currentFrame >= targetFrame) {
				console.log(`Hit breakpoint at frame ${targetFrame}`);
				onBreakpointHit?.(currentBreakpointIndex);
			}
		}
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				<mesh
					name="Cube"
					castShadow
					receiveShadow
					geometry={nodes.Cube.geometry}
					material={materials["Material.001"]}
					position={[-0.281, 8.101, 0]}
					scale={[1.149, 1, 1]}
				/>
				<mesh
					name="Cube001"
					castShadow
					receiveShadow
					geometry={nodes.Cube001.geometry}
					material={materials["Material.001"]}
					position={[-0.281, 8.101, 0]}
					scale={[1.149, 1, 1]}
				/>
				<mesh
					name="Cylinder"
					castShadow
					receiveShadow
					geometry={nodes.Cylinder.geometry}
					material={materials["Material.001"]}
					position={[0, 1.372, -11.413]}
					scale={[6.429, 0.728, 6.429]}
				/>
				<mesh
					name="Plane"
					castShadow
					receiveShadow
					geometry={nodes.Plane.geometry}
					material={materials["Material.001"]}
					position={[-0.079, 8.349, -21.829]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Circle042"
					castShadow
					receiveShadow
					geometry={nodes.Circle042.geometry}
					material={materials["Material.001"]}
					position={[-34.477, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle041"
					castShadow
					receiveShadow
					geometry={nodes.Circle041.geometry}
					material={materials["Material.001"]}
					position={[-34.477, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle040"
					castShadow
					receiveShadow
					geometry={nodes.Circle040.geometry}
					material={materials["Material.001"]}
					position={[-34.458, 5.358, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.07}
				/>
				<mesh
					name="Circle033"
					castShadow
					receiveShadow
					geometry={nodes.Circle033.geometry}
					material={materials["Material.001"]}
					position={[-21.349, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle032"
					castShadow
					receiveShadow
					geometry={nodes.Circle032.geometry}
					material={materials["Material.001"]}
					position={[-21.349, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle001"
					castShadow
					receiveShadow
					geometry={nodes.Circle001.geometry}
					material={materials["Material.001"]}
					position={[20.552, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle002"
					castShadow
					receiveShadow
					geometry={nodes.Circle002.geometry}
					material={materials["Material.001"]}
					position={[20.552, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle003"
					castShadow
					receiveShadow
					geometry={nodes.Circle003.geometry}
					material={materials["Material.001"]}
					position={[20.571, 5.358, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.07}
				/>
				<mesh
					name="Circle004"
					castShadow
					receiveShadow
					geometry={nodes.Circle004.geometry}
					material={materials["Material.001"]}
					position={[33.679, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle005"
					castShadow
					receiveShadow
					geometry={nodes.Circle005.geometry}
					material={materials["Material.001"]}
					position={[33.679, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Cube002"
					castShadow
					receiveShadow
					geometry={nodes.Cube002.geometry}
					material={materials["Material.001"]}
					position={[-0.264, 2.639, 7.367]}
					scale={[4.041, 2.771, 3.754]}
				/>
				<mesh
					name="Cube003"
					castShadow
					receiveShadow
					geometry={nodes.Cube003.geometry}
					material={materials["Material.001"]}
					position={[-0.264, 13.493, 7.367]}
					scale={[4.041, 2.59, 3.754]}
				/>
				<mesh
					name="Cube004"
					castShadow
					receiveShadow
					geometry={nodes.Cube004.geometry}
					material={materials["Material.001"]}
					position={[0, 22.105, -11.399]}
				/>
				<mesh
					name="Plane001"
					castShadow
					receiveShadow
					geometry={nodes.Plane001.geometry}
					material={materials["Material.001"]}
					position={[-0.079, 8.349, -21.829]}
					rotation={[Math.PI / 2, 0, 0]}
					scale={[0.974, 1, 1]}
				/>
				<mesh
					name="Cube005"
					castShadow
					receiveShadow
					geometry={nodes.Cube005.geometry}
					material={materials["Material.001"]}
					position={[-29.537, 21.495, -8.266]}
					scale={6.373}
				/>
				<mesh
					name="Cube006"
					castShadow
					receiveShadow
					geometry={nodes.Cube006.geometry}
					material={materials["Material.001"]}
					position={[28.996, 21.495, -8.266]}
					scale={[6.649, 6.373, 6.373]}
				/>
				<mesh
					name="Plane003"
					castShadow
					receiveShadow
					geometry={nodes.Plane003.geometry}
					material={materials["Material.001"]}
					position={[-17.375, 8.349, -52.961]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Cube007"
					castShadow
					receiveShadow
					geometry={nodes.Cube007.geometry}
					material={materials["Material.001"]}
					position={[72.707, 21.495, -8.266]}
					scale={[6.649, 6.373, 6.373]}
				/>
				<mesh
					name="Plane004"
					castShadow
					receiveShadow
					geometry={nodes.Plane004.geometry}
					material={materials["Material.001"]}
					position={[-17.403, 8.349, -52.961]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane005"
					castShadow
					receiveShadow
					geometry={nodes.Plane005.geometry}
					material={materials["Material.001"]}
					position={[-16.009, 8.349, -20.18]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane006"
					castShadow
					receiveShadow
					geometry={nodes.Plane006.geometry}
					material={materials["Material.001"]}
					position={[-37.63, 8.349, -20.119]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane007"
					castShadow
					receiveShadow
					geometry={nodes.Plane007.geometry}
					material={materials["Material.001"]}
					position={[-16.009, 8.349, -54.689]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane008"
					castShadow
					receiveShadow
					geometry={nodes.Plane008.geometry}
					material={materials["Material.001"]}
					position={[-37.63, 8.349, -54.628]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane010"
					castShadow
					receiveShadow
					geometry={nodes.Plane010.geometry}
					material={materials["Material.001"]}
					position={[133.222, 8.349, -20.18]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane011"
					castShadow
					receiveShadow
					geometry={nodes.Plane011.geometry}
					material={materials["Material.001"]}
					position={[111.6, 8.349, -20.119]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane012"
					castShadow
					receiveShadow
					geometry={nodes.Plane012.geometry}
					material={materials["Material.001"]}
					position={[133.222, 8.349, -54.689]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Plane013"
					castShadow
					receiveShadow
					geometry={nodes.Plane013.geometry}
					material={materials["Material.001"]}
					position={[111.6, 8.349, -54.628]}
					rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Circle006"
					castShadow
					receiveShadow
					geometry={nodes.Circle006.geometry}
					material={materials["Material.001"]}
					position={[-47.498, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle007"
					castShadow
					receiveShadow
					geometry={nodes.Circle007.geometry}
					material={materials["Material.001"]}
					position={[-47.498, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle008"
					castShadow
					receiveShadow
					geometry={nodes.Circle008.geometry}
					material={materials["Material.001"]}
					position={[-47.479, 5.358, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.07}
				/>
				<mesh
					name="Circle009"
					castShadow
					receiveShadow
					geometry={nodes.Circle009.geometry}
					material={materials["Material.001"]}
					position={[-34.371, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle010"
					castShadow
					receiveShadow
					geometry={nodes.Circle010.geometry}
					material={materials["Material.001"]}
					position={[-34.371, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle011"
					castShadow
					receiveShadow
					geometry={nodes.Circle011.geometry}
					material={materials["Material.001"]}
					position={[45.355, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle012"
					castShadow
					receiveShadow
					geometry={nodes.Circle012.geometry}
					material={materials["Material.001"]}
					position={[45.355, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.06}
				/>
				<mesh
					name="Circle013"
					castShadow
					receiveShadow
					geometry={nodes.Circle013.geometry}
					material={materials["Material.001"]}
					position={[45.374, 5.358, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={3.07}
				/>
				<mesh
					name="Circle014"
					castShadow
					receiveShadow
					geometry={nodes.Circle014.geometry}
					material={materials["Material.001"]}
					position={[58.482, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle015"
					castShadow
					receiveShadow
					geometry={nodes.Circle015.geometry}
					material={materials["Material.001"]}
					position={[58.482, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={-3.06}
				/>
				<mesh
					name="Circle016"
					castShadow
					receiveShadow
					geometry={nodes.Circle016.geometry}
					material={materials["Material.001"]}
					position={[33.945, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={[3.06, 2.591, 3.06]}
				/>
				<mesh
					name="Circle017"
					castShadow
					receiveShadow
					geometry={nodes.Circle017.geometry}
					material={materials["Material.001"]}
					position={[33.945, 5.306, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={[3.06, 2.591, 3.06]}
				/>
				<mesh
					name="Circle018"
					castShadow
					receiveShadow
					geometry={nodes.Circle018.geometry}
					material={materials["Material.001"]}
					position={[33.961, 5.358, -8.112]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={[3.07, 2.599, 3.07]}
				/>
				<mesh
					name="Circle019"
					castShadow
					receiveShadow
					geometry={nodes.Circle019.geometry}
					material={materials["Material.001"]}
					position={[45.059, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={[-3.06, -2.591, -3.06]}
				/>
				<mesh
					name="Circle020"
					castShadow
					receiveShadow
					geometry={nodes.Circle020.geometry}
					material={materials["Material.001"]}
					position={[45.059, 5.306, -8.112]}
					rotation={[-Math.PI, 0, -Math.PI / 2]}
					scale={[-3.06, -2.591, -3.06]}
				/>
				<PerspectiveCamera
					name="Camera"
					makeDefault={true}
					far={1000}
					near={0.1}
					fov={32.608}
					position={[-96.126, 6.599, -4.402]}
					rotation={[0, -Math.PI / 2, 0]}
				/>
				<mesh
					name="Cube008"
					castShadow
					receiveShadow
					geometry={nodes.Cube008.geometry}
					material={nodes.Cube008.material}
					position={[-78.88, 1.539, -47.771]}
					scale={[3.48, 0.581, 3.48]}
				/>
				<directionalLight
					name="Sun"
					intensity={10}
					decay={2}
					position={[-10.725, 6.264, 19.216]}
					rotation={[-0.149, -0.358, 1.446]}
				>
					<group position={[0, 0, -1]} />
				</directionalLight>
				<pointLight
					name="Point"
					intensity={10.131}
					decay={2}
					position={[-41.677, 8.879, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<pointLight
					name="Point001_1"
					intensity={10.131}
					decay={2}
					position={[-64.229, 8.879, -60.933]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<pointLight
					name="Point002_1"
					intensity={10.131}
					decay={2}
					position={[-64.229, 8.879, -46.259]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<pointLight
					name="Point003_1"
					intensity={10.131}
					decay={2}
					position={[-20.977, 8.879, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<pointLight
					name="Point004_1"
					intensity={10.131}
					decay={2}
					position={[-20.977, 8.879, -49.208]}
					rotation={[-Math.PI / 2, 0, 0]}
				/>
				<mesh
					name="Cube009"
					castShadow
					receiveShadow
					geometry={nodes.Cube009.geometry}
					material={nodes.Cube009.material}
					position={[-34.493, 1.539, -47.771]}
					scale={[3.48, 0.581, 3.48]}
				/>
				<mesh
					name="Cube010"
					castShadow
					receiveShadow
					geometry={nodes.Cube010.geometry}
					material={nodes.Cube010.material}
					position={[40.804, 1.539, -75.429]}
					scale={[3.48, 0.581, 3.48]}
				/>
				<mesh
					name="Cube011"
					castShadow
					receiveShadow
					geometry={nodes.Cube011.geometry}
					material={nodes.Cube011.material}
					position={[95.283, 1.539, -74.429]}
					scale={[3.48, 0.581, 3.48]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("models/envBlockoutfull.glb");
