import { EffectComposer, Bloom } from "@react-three/postprocessing";

function SceneWithBloom() {
  return (
    <>
      {/* Normal scene objects go here */}
      <Human position={[0, 0, 0]} scale={0.1} />

      {/* Post-processing pipeline */}
      <EffectComposer>
        <Bloom
          intensity={1.5} // bloomStrength
          luminanceThreshold={0.4} // bloomThreshold
          luminanceSmoothing={0.8} // bloomRadius
        />
      </EffectComposer>
    </>
  );
}
