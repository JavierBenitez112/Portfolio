import React, { Suspense, useRef } from 'react';
import Scenario from '../components/Scenario';
import CanvasLoader from '../components/CanvasLoader';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants';
import Target from '../components/target';
import Cube from '../components/Cube';
import HeroCamera from '../components/HeroCamera';
import Button from '../components/Button';
import LavaLamp from '../components/LavaLamp';
import Cassette from '../components/Cassette';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const sizes = calculateSizes(isMobile);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <section ref={heroRef} className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <div className="hero-content w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 relative z-10">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hi, I am Javier
          <span className="waving-hand">
            <img src="/assets/Hand.svg" alt="waving hand" className="inline-block w-11 h-10 ml-3" />
          </span>
        </p>
        <span className="hero_tag text-gray_gradient">Fullstack Developer</span>
      </div>
      <div className="canvas-container w-full h-full absolute inset-0" ref={canvasRef}>
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 30]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <group>
              <HeroCamera isMobile={isMobile}>
                <Scenario
                  position={isMobile ? [100, -10, 26] : [100, -26, 32]}
                  rotation={[-0.43, -2.4, -0.6]}
                  scale={isMobile ? 0.12 : 0.16}
                />
              </HeroCamera>
              <Target
                position={isMobile ? [80, -12, 14] : [80, -20, -15]}
                rotation={[-0.1, -1.8, -0.1]}
                scale={isMobile ? 2.6 : 9}
              />
              <LavaLamp
                position={isMobile ? [80, 15, 42] : [80, 5, 70]}
                scale={isMobile ? 0.8 : 9}
                rotation={[0, -2.5, 0]}
              />
              <Cube
                position={isMobile ? [80, -15, 42] : [80, -20, 70]}
                scale={isMobile ? 2 : 4}
                rotation={[0, Math.PI, 0]}
              />
              <Cassette
                position={isMobile ? [80, 18, 50] : [80, 10,-20]}
                scale={isMobile ? 1 : 7}
                rotation={[0.2, -0.9, 0.3]}
              />
            </group>
            <ambientLight intensity={3} color={"#ffffff"} />
            <directionalLight intensity={1} position={[10, 10, 10]} color={"#ffffff"} />
            <pointLight intensity={0.8} position={[-10, -10, -10]} color={"#00ccff"} />
            <spotLight
              intensity={0.7}
              position={[5, 15, 5]}
              angle={0.3}
              penumbra={1}
              color={"#ff00ff"}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className='absolute bottom-7 left-0 right-0 w-full z-10 c-space'>
        <a href='#contact' className='w-fit'>
          <Button name="Trabajemos Juntos!" isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>
        </a>
      </div>
    </section>
  );
};

export default Hero;