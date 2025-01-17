import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

// 1) Import Leva & r3f-perf for debugging
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience({ selectedModel, preloadedModels }) {
    // Access the THREE.js WebGL context & camera
    const { gl, camera } = useThree();
    const groupRef = useRef();

    // ─────────────────────────────────────────────
    // LEVA CONTROLS: Camera & Lights
    // ─────────────────────────────────────────────
    const {
        cameraFov,
        cameraPosition,
        cameraRotation,
        ambientLightIntensity,
        directionalLightIntensity,
    } = useControls("Debug - Camera & Lights", {
        cameraFov: {
            value: camera.fov,
            min: 10,
            max: 100,
            step: 1,
        },
        cameraPosition: {
            value: {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z,
            },
            step: 0.1,
        },
        cameraRotation: {
            value: {
                x: camera.rotation.x,
                y: camera.rotation.y,
                z: camera.rotation.z,
            },
            step: 0.01,
        },
        ambientLightIntensity: {
            value: 1.5,
            min: 0,
            max: 10,
            step: 0.1,
        },
        directionalLightIntensity: {
            value: 4.5,
            min: 0,
            max: 10,
            step: 0.1,
        },
    });

    // ─────────────────────────────────────────────
    // LEVA CONTROLS: Plane
    // ─────────────────────────────────────────────
    const { planePos, planeRot, planeScale, planeColor } = useControls(
        "Debug - Plane",
        {
            planePos: { value: { x: 0, y: -1, z: 0 }, step: 0.1 },
            planeRot: { value: { x: -Math.PI * 0.5, y: 0, z: 0 }, step: 0.1 },
            planeScale: { value: 10, min: 1, max: 50, step: 1 },
            planeColor: "#88ff88",
        }
    );

    // ─────────────────────────────────────────────
    // LEVA CONTROLS: Model transform
    // ─────────────────────────────────────────────
    const { modelPos, modelRot, modelScale } = useControls("Debug - Model", {
        modelPos: { value: { x: 0.8, y: -1.4, z: 2.8 }, step: 0.1 },
        modelRot: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
        modelScale: { value: 0.1, min: 0.1, max: 5, step: 0.1 },
    });

    // ─────────────────────────────────────────────
    // Apply camera & lights updates each frame
    // ─────────────────────────────────────────────
    useFrame(() => {
        camera.fov = cameraFov;
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z);
        camera.updateProjectionMatrix();
    });

    // Get the preloaded model for the selected model
    const gltf = preloadedModels[selectedModel.id - 1]; // Assuming model IDs are 1-based and sequential

    // Adjust camera once
    useEffect(() => {
        camera.rotation.set(-0.24, 0.01, 0.0);
    }, [camera]);

    // ─────────────────────────────────────────────
    // Slowly auto-rotate the model
    // ─────────────────────────────────────────────
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.2 * delta;
        }
    });

    // ─────────────────────────────────────────────
    // Dragging logic for the model (optional)
    // ─────────────────────────────────────────────
    useEffect(() => {
        const canvas = gl.domElement;
        let isDragging = false;
        let lastX = 0;

        const handlePointerDown = (e) => {
            isDragging = true;
            lastX = e.clientX;
        };

        const handlePointerMove = (e) => {
            if (!isDragging || !groupRef.current) return;
            const deltaX = e.clientX - lastX;
            lastX = e.clientX;
            groupRef.current.rotation.y += deltaX * 0.01;
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
    }, [gl]);

    // ─────────────────────────────────────────────
    // Return the scene
    // ─────────────────────────────────────────────
    return (
        <>
            {/*
        OPTIONAL Performance panel. 
        Uncomment to see real-time stats:
      */}
            {/* <Perf position="top-left" /> */}

            {/* Lights with intensities from Leva */}
            <directionalLight
                position={[1, 2, 3]}
                intensity={directionalLightIntensity}
            />
            <ambientLight intensity={ambientLightIntensity} />

            {/* Plane with transform & color from Leva */}
            {/* <mesh
                position={[planePos.x, planePos.y, planePos.z]}
                rotation={[planeRot.x, planeRot.y, planeRot.z]}
                scale={planeScale}
            >
                <planeGeometry />
                <meshStandardMaterial color={planeColor} />
            </mesh> */}

            {/* The 3D Model group */}
            <group
                ref={groupRef}
                position={[modelPos.x, modelPos.y, modelPos.z]}
                rotation={[modelRot.x, modelRot.y, modelRot.z]}
                scale={modelScale}
            >
                {gltf && <primitive object={gltf.scene} />}
            </group>
        </>
    );
}