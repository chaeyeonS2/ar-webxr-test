// The complete explanation can be found in this Youtube playlist if you are not clear about the working of this example.
// https://youtube.com/playlist?list=PLpM_sf_d5YTPXeVp4cmgN_cNBj9pNTEmZ

import { Canvas } from "@react-three/fiber";
import { XR, ARButton } from "@react-three/xr";
import XrHitCube from "./components/XrHitCube";
import "./styles.css";

export default function App() {
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"]
        }}
      />
      <Canvas>
        <XR referenceSpace="local">
          <XrHitCube />
        </XR>
      </Canvas>
    </>
  );
}
