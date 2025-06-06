import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

const Cube = ({ ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');
  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);
  const ctx = useRef(gsap.context(() => {}));

  useEffect(() => {
    ctx.current = gsap.context(() => {
      // Only continuous rotation animation
      const rotationTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
      });

      rotationTimeline.to(cubeRef.current.rotation, {
        y: hovered ? '+=2' : `+=${Math.PI * 2}`,
        x: hovered ? '+=2' : `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: {
          each: 0.15,
        },
      });
    });

    return () => ctx.current.revert();
  }, [hovered]);

  const handlePointerEnter = () => {
    if (!hovered) {
      setHovered(true);
    }
  };

  const handlePointerLeave = () => {
    if (hovered) {
      setHovered(false);
    }
  };

  return (
    <Float floatIntensity={2} rotationIntensity={0.3}>
      <group position={[9, -4, 0]} rotation={[2.6, 0.8, -1.8]} scale={2} dispose={null} {...props}>
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}>
          <meshMatcapMaterial matcap={texture} toneMapped={false} color="#df0054" transparent />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload('models/cube.glb');

export default Cube;