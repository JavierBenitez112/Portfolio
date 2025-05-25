import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TransitionCube = ({ ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const cubeRef = useRef();

  useEffect(() => {
    if (!cubeRef.current) return;

    gsap.fromTo(cubeRef.current.position, 
      {
        z: -20,
        y: 0,
        x: 0
      },
      {
        z: 5,
        y: 0,
        x: 0,
        scrollTrigger: {
          trigger: "#transition-scene",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        }
      }
    );

    gsap.fromTo(cubeRef.current.scale,
      {
        x: 4,
        y: 4,
        z: 4
      },
      {
        x: 8,
        y: 8,
        z: 8,
        scrollTrigger: {
          trigger: "#transition-scene",
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        }
      }
    );

    gsap.to(cubeRef.current.material,
      {
        opacity: 0,
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "top top",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <mesh
      ref={cubeRef}
      geometry={nodes.Cube.geometry}
      position={[0, 0, -20]}
      scale={4}
      {...props}
    >
      <meshMatcapMaterial color="#df0054" transparent opacity={1} />
    </mesh>
  );
};

useGLTF.preload('models/cube.glb');

export default TransitionCube;
