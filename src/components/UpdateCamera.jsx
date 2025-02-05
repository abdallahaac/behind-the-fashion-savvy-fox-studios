// UpdateCamera.jsx
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function UpdateCamera({ fov, position, rotation, cameraRef }) {
	const { camera } = useThree();

	useEffect(() => {
		// Update camera field of view
		camera.fov = fov;

		// Update camera position
		camera.position.fromArray(position);

		// Update camera rotation (Euler angles in radians)
		camera.rotation.fromArray(rotation);

		// If you need to store a ref to the camera outside, set it here:
		if (cameraRef) {
			cameraRef.current = camera;
		}

		// Important: after modifying fov, call this
		camera.updateProjectionMatrix();
	}, [camera, fov, position, rotation, cameraRef]);

	// This component does not render anything
	return null;
}
