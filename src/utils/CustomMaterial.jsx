import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";

export default function CustomMaterial({ children, ...props }) {
  const materialRef = useRef();
  const { gl } = useThree();

  // 1) Load and convert env map (equirectangular -> PMREM)
  //    If your file is at public/env.jpg, you can refer to "/env.jpg" directly.
  const texture = useLoader(THREE.TextureLoader, "hdr/env.jpg");
  const pmrem = new THREE.PMREMGenerator(gl);
  const envMap = pmrem.fromEquirectangular(texture).texture;
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  // 2) Each frame, we update the custom uniform
  useFrame((state) => {
    if (materialRef.current?.userData?.shader) {
      materialRef.current.userData.shader.uniforms.uTime.value =
        state.clock.getElapsedTime();
    }
  });

  return (
    <meshStandardMaterial
      ref={materialRef}
      envMap={envMap}
      metalness={0.8}
      roughness={0.28}
      onBeforeCompile={(shader) => {
        // Insert our custom uniform
        shader.uniforms.uTime = { value: 0 };

        // Inject rotation logic at the top of the fragment shader:
        shader.fragmentShader =
          `
          uniform float uTime;

          // A rotation utility
          mat4 rotationMatrix(vec3 axis, float angle) {
            axis = normalize(axis);
            float s = sin(angle);
            float c = cos(angle);
            float oc = 1.0 - c;

            return mat4(
              oc * axis.x * axis.x + c,         oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                              0.0,                                0.0,                                1.0
            );
          }

          vec3 rotate(vec3 v, vec3 axis, float angle) {
            mat4 m = rotationMatrix(axis, angle);
            return (m * vec4(v, 1.0)).xyz;
          }
        ` + shader.fragmentShader;

        // Modify the envmap reflection chunk to apply rotation
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <envmap_physical_pars_fragment>`,
          `#ifdef USE_ENVMAP
  vec3 getIBLIrradiance( const in vec3 normal ) {
    #ifdef ENVMAP_TYPE_CUBE_UV
      vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
      vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
      return PI * envMapColor.rgb * envMapIntensity;
    #else
      return vec3( 0.0 );
    #endif
  }

  vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
    #ifdef ENVMAP_TYPE_CUBE_UV
      vec3 reflectVec = reflect( - viewDir, normal );
      reflectVec = normalize( mix( reflectVec, normal, roughness * roughness ) );
      reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

      // <-- Here we add our time-based rotation
      reflectVec = rotate(reflectVec, vec3(1.0, 0.0, 0.0), uTime * 0.05);

      vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
      return envMapColor.rgb * envMapIntensity;
    #else
      return vec3( 0.0 );
    #endif
  }
#endif
`
        );
        // Store the shader on the material for access in the render loop
        materialRef.current.userData.shader = shader;
      }}
      {...props}
    />
  );
}
