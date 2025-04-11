// utils/Debug/useMaterialControls.js
import { useControls } from "leva";

export function useMaterialControls(label = "Mesh Material") {
	// Leva panel controls for material parameters
	const controls = useControls(label, {
		roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
		metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
		// You can add more parameters as needed, for example:
		// emissiveIntensity: { value: 1, min: 0, max: 5, step: 0.1 },
	});

	return controls;
}
