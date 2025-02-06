// CameraController.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const CameraController = ({ targetCameraZ }) => {
	const { camera } = useThree();
	const cameraRef = useRef(camera);

	// Leva controls for adjusting camera position and rotation
	const { x, y, z, rotX, rotY, rotZ } = useControls("Camera Controls", {
		x: { value: 2, min: -10, max: 10, step: 0.1 },
		y: { value: 2, min: -10, max: 10, step: 0.1 },
		z: { value: 5, min: -10, max: 10, step: 0.1 },
		rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
		rotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
		rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
	});

	// Animate camera z when targetCameraZ changes
	useEffect(() => {
		if (targetCameraZ !== undefined && cameraRef.current) {
			gsap.to(cameraRef.current.position, {
				z: targetCameraZ,
				duration: 1,
				ease: "power2.out",
			});
		}
	}, [targetCameraZ]);

	useFrame(() => {
		if (cameraRef.current) {
			// Always update x and y from Leva controls.
			cameraRef.current.position.x = x;
			cameraRef.current.position.y = y;
			// Only update z manually if targetCameraZ is not provided.
			if (targetCameraZ === undefined) {
				cameraRef.current.position.z = z;
			}
			cameraRef.current.rotation.set(rotX, rotY, rotZ);
		}
	});

	return null;
};

export default CameraController;
