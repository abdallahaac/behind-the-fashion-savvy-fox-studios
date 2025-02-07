// CameraController.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

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

	useFrame(() => {
		if (cameraRef.current) {
			// Use targetCameraZ if provided; otherwise, fall back to the Leva-controlled z value.
			const effectiveZ = targetCameraZ !== undefined ? targetCameraZ : z;
			cameraRef.current.position.set(x, y, effectiveZ);
			cameraRef.current.rotation.set(rotX, rotY, rotZ);
		}
	});

	return null;
};

export default CameraController;
