import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

// If you need debugging, uncomment the lines below:
// import { useControls } from "leva";
// import { Perf } from "r3f-perf";
const ENABLE_LEVA = true;

export default function Experience({ selectedModel, preloadedModels }) {
	const { gl, camera } = useThree();
	// The group we spin/orbit
	const groupRef = useRef();

	// Keep an internal angle for orbit (auto-rotate)
	const [orbitAngle, setOrbitAngle] = useState(0);

	// Get the preloaded model for the selected model
	const gltf = preloadedModels[selectedModel.id - 1];

	// On mount, tweak camera if desired
	useEffect(() => {
		camera.rotation.set(-0.23, -0.1, 0.1);
	}, [camera]);

	// ──────────────────────────────────────────────────
	// (1) BOUNDING BOX LOGIC (normalize model sizes)
	// ──────────────────────────────────────────────────
	useEffect(() => {
		if (!gltf) return;

		const scene = gltf.scene;
		const box = new THREE.Box3().setFromObject(scene);
		const size = new THREE.Vector3();
		box.getSize(size);

		const desiredSize = 2; // largest dimension we want
		const maxDim = Math.max(size.x, size.y, size.z);
		const scaleFactor = desiredSize / maxDim;

		scene.scale.setScalar(scaleFactor);

		// Recompute bounding box, center the model
		box.setFromObject(scene);
		const center = new THREE.Vector3();
		box.getCenter(center);
		scene.position.sub(center);
	}, [gltf]);

	// ──────────────────────────────────────────────────
	// (2) APPLY TRANSFORM FROM MODEL DATA
	// ──────────────────────────────────────────────────
	useEffect(() => {
		if (!gltf || !selectedModel.transform) return;

		const { position, rotation, scale } = selectedModel.transform;
		const scene = gltf.scene;

		// position
		scene.position.fromArray(position || [0, 0, 0]);
		// rotation
		scene.rotation.fromArray(rotation || [0, 0, 0]);

		// scale
		if (typeof scale === "number") {
			// uniform scale
			scene.scale.setScalar(scale);
		} else if (Array.isArray(scale)) {
			// non-uniform scale, e.g. [1, 2, 1]
			scene.scale.fromArray(scale);
		}
	}, [gltf, selectedModel]);

	// ──────────────────────────────────────────────────
	// (3) APPLY CUSTOM MATERIAL PARAMS
	// ──────────────────────────────────────────────────
	useEffect(() => {
		if (!gltf || !selectedModel.materialParams) return;

		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				const {
					metalness = 0.0,
					roughness = 1.0,
					color = "#ffffff",
				} = selectedModel.materialParams;

				// Reuse existing material
				child.material.metalness = metalness;
				child.material.roughness = roughness;
				child.material.color = new THREE.Color(color);

				// Or override with a new material if you prefer:
				// child.material = new THREE.MeshPhysicalMaterial({ ... });
			}
		});
	}, [gltf, selectedModel]);

	// ──────────────────────────────────────────────────
	// (4) AUTO SPIN + ORBIT THE MODEL
	// ──────────────────────────────────────────────────
	useFrame((_, delta) => {
		if (!groupRef.current) return;

		// Axis to spin around automatically
		const axis = selectedModel.autoRotateAxis || "y"; // default
		// Orbit radius (circle around origin)
		const radius = selectedModel.autoRotateRadius || 0; // 0 = no orbit

		// Spin in place
		const spinSpeed = 0.2; // how fast to spin
		switch (axis) {
			case "x":
				groupRef.current.rotation.x += spinSpeed * delta;
				break;
			case "z":
				groupRef.current.rotation.z += spinSpeed * delta;
				break;
			case "y":
			default:
				groupRef.current.rotation.y += spinSpeed * delta;
				break;
		}

		// Orbit around that axis
		setOrbitAngle((prev) => prev + spinSpeed * delta);
		const angle = orbitAngle + spinSpeed * delta;

		// revolve in a plane perpendicular to the chosen axis
		switch (axis) {
			case "x":
				// revolve in Y-Z plane
				groupRef.current.position.y = radius * Math.sin(angle);
				groupRef.current.position.z = radius * Math.cos(angle);
				break;
			case "z":
				// revolve in X-Y plane
				groupRef.current.position.x = radius * Math.sin(angle);
				groupRef.current.position.y = radius * Math.cos(angle);
				break;
			case "y":
			default:
				// revolve in X-Z plane
				groupRef.current.position.x = radius * Math.sin(angle);
				groupRef.current.position.z = radius * Math.cos(angle);
				break;
		}
	});

	// ──────────────────────────────────────────────────
	// (5) DRAG LOGIC: CHOOSE AXIS, SET SPEED
	// ──────────────────────────────────────────────────
	useEffect(() => {
		const canvas = gl.domElement;
		let isDragging = false;
		let lastX = 0;

		// Use the model's or a default drag speed
		const mouseDragSpeed = selectedModel.mouseDragSpeed || 0.01;
		// Which axis to rotate on drag? (x, y, or z)
		const dragAxis = selectedModel.dragAxis || "y";

		const handlePointerDown = (e) => {
			isDragging = true;
			lastX = e.clientX;
		};

		const handlePointerMove = (e) => {
			if (!isDragging || !groupRef.current) return;
			const deltaX = e.clientX - lastX;
			lastX = e.clientX;

			// Rotate on the chosen axis by deltaX * mouseDragSpeed
			switch (dragAxis) {
				case "x":
					groupRef.current.rotation.x += deltaX * mouseDragSpeed;
					break;
				case "z":
					groupRef.current.rotation.z += deltaX * mouseDragSpeed;
					break;
				case "y":
				default:
					groupRef.current.rotation.y += deltaX * mouseDragSpeed;
					break;
			}
		};

		const handlePointerUp = () => {
			isDragging = false;
		};

		canvas.addEventListener("pointerdown", handlePointerDown);
		canvas.addEventListener("pointermove", handlePointerMove);
		canvas.addEventListener("pointerup", handlePointerUp);
		canvas.addEventListener("pointerleave", handlePointerUp);

		return () => {
			canvas.removeEventListener("pointerdown", handlePointerDown);
			canvas.removeEventListener("pointermove", handlePointerMove);
			canvas.removeEventListener("pointerup", handlePointerUp);
			canvas.removeEventListener("pointerleave", handlePointerUp);
		};
	}, [gl, selectedModel]);

	return (
		<>
			{/* If needed:
         {ENABLE_LEVA && <Perf position="top-left" />}
      */}
			<Environment preset="city" />
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			{/* The group that auto-rotates + orbits. The GLTF is inside. */}
			<group ref={groupRef}>{gltf && <primitive object={gltf.scene} />}</group>
		</>
	);
}
