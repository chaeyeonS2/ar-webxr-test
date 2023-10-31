// The complete explanation can be found in this Youtube playlist if you are not clear about the working of this example.
// https://youtube.com/playlist?list=PLpM_sf_d5YTPXeVp4cmgN_cNBj9pNTEmZ

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
// The complete explanation can be found in this Youtube playlist if you are not clear about the working of this example.
// https://youtube.com/playlist?list=PLpM_sf_d5YTPXeVp4cmgN_cNBj9pNTEmZ

import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Cube from "./Cube";

const XrHitCube = () => {
  const reticleRef = useRef<any>();
  const [cubes, setCubes] = useState<any>([]);

  const { isPresenting } = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeCube = (e: any) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setCubes([...cubes, { position, id }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {/* showing the cubes only when the xr session is active */}
      {isPresenting &&
        cubes.map(({ position, id }: any) => {
          return <Cube key={id} position={position} />;
        })}
      {isPresenting && (
        <Interactive onSelect={placeCube}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}
      {/* showing a single cube by default at the center of the screen when the xr session is not active */}
      {!isPresenting && <Cube />}
    </>
  );
};

export default XrHitCube;
