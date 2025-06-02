import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import lenis from '../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const TransitionScene = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;    // Initial text animation timeline with shorter scroll duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#transition-scene",
        start: "top bottom-=10%", // Start earlier
        end: "top center+=20%", // End earlier
        scrub: 1,
        onUpdate: (self) => {
          // Update Lenis scroll for smoother animation
          lenis.raf(performance.now());
        },
      }
    });    tl.fromTo(textRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotation: -5
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        ease: "power3.out",
      }
    );// Pin the text with quicker transition
    ScrollTrigger.create({
      trigger: "#about",
      start: "top 20%", // Pin slightly earlier
      end: "top top", // End at the top of the about section
      pin: "#about-title",
      pinSpacing: false,      onEnter: () => {
        gsap.to(textRef.current, {
          y: -20,
          scale: 0.85,
          opacity: 0.95,
          rotation: -2,
          duration: 0.4,
          ease: "power3.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(textRef.current, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power3.inOut",
        });
      }
    });
  }, []);

  return (    <section 
      id="transition-scene" 
      className="min-h-[70vh] w-full relative bg-gradient-to-b from-transparent to-black flex items-center justify-center"
    >
      <img
        src="/assets/AbtMe.svg"
        alt="About Me"
        ref={textRef}
        id="about-title"
        className="w-64 md:w-96 opacity-0 transform-gpu"
      />
    </section>
  );
};

export default TransitionScene;
