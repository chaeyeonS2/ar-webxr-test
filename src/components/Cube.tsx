// The complete explanation can be found in this Youtube playlist if you are not clear about the working of this example.
// https://youtube.com/playlist?list=PLpM_sf_d5YTPXeVp4cmgN_cNBj9pNTEmZ

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Cube = ({ position = [0, 0, 0] }) => {
  const cubeRef = useRef<any>();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  return (
    <>
      <mesh ref={cubeRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>
    </>
  );
};

export default Cube;
