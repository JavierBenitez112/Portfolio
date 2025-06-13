import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { use } from 'react'
import Target from './Target';
import {useRef} from 'react'

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 28], 0.25, delta);
    if (!isMobile) {
      easing.dampE(groupRef.current.rotation, [state.pointer.y/30, -state.pointer.x/50, 0], 0.25, delta);
    }
  });


  return (
    <group ref={groupRef}>{children}</group>
  );
};

export default HeroCamera