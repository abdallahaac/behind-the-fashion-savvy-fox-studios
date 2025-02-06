import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";

const CameraController = () => {
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
			cameraRef.current.position.set(x, y, z);
			cameraRef.current.rotation.set(rotX, rotY, rotZ);
		}
	});

	return null; // This component doesn't render anything
};

export default CameraController;
