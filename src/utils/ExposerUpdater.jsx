import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function ExposureUpdater({ exposure }) {
  const { gl } = useThree();

  // This effect runs whenever `exposure` changes
  useEffect(() => {
    gl.toneMappingExposure = exposure;
  }, [exposure, gl]);

  return null;
}

export default ExposureUpdater;
