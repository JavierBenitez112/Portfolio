import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import lenis from '../lib/scroll';
import { logo } from '../lib/logo';

gsap.registerPlugin(ScrollTrigger);

const TransitionScene = () => {
  const fadeOverlayRef = useRef(null);
  const svgOverlayRef = useRef(null);
  const overlayCopyRef = useRef(null);
  const logoContainerRef = useRef(null);
  const logoMaskRef = useRef(null);

  useEffect(() => {
    const initialOverlayScale = 350;
    const logoContainer = logoContainerRef.current;
    const logoMask = logoMaskRef.current;

    if (logoMask && logoContainer) {
      logoMask.setAttribute("d", logo);
      const logoDimensions = logoContainer.getBoundingClientRect();
      const logoBoundingBox = logoMask.getBBox();
      const horizontalScaleRatio = logoDimensions.width / logoBoundingBox.width;
      const verticalScaleRatio = logoDimensions.height / logoBoundingBox.height;
      const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);
      const logoHorizontalPosition = (logoDimensions.width - logoBoundingBox.width * logoScaleFactor) / 2 - logoBoundingBox.x * logoScaleFactor;
      const logoVerticalPosition = (logoDimensions.height - logoBoundingBox.height * logoScaleFactor) / 2 - logoBoundingBox.y * logoScaleFactor;
      logoMask.setAttribute("transform", `translate(${logoHorizontalPosition}, ${logoVerticalPosition}) scale(${logoScaleFactor})`);
    }

    ScrollTrigger.create({
      trigger: "#transition-scene",
      start: "top top",
      end: "200%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        let fadeOverlayOpacity = 0;
        if (scrollProgress >= 0.25) {
          fadeOverlayOpacity = Math.min(1, (scrollProgress - 0.25) * (1/0.4));
        }
        gsap.set(fadeOverlayRef.current, {
          opacity: fadeOverlayOpacity
        });
        if (svgOverlayRef.current) {
          const normalizedProgress = scrollProgress * (1/0.85);
          const overlayScale = initialOverlayScale * Math.pow(1/initialOverlayScale, normalizedProgress);
          gsap.set(svgOverlayRef.current, {
            scale: overlayScale
          });
        }
        if (scrollProgress >= 0.6 && scrollProgress <= 0.85) {
          const overlayCopyRevealProgress = (scrollProgress - 0.6) * (1/0.25);
          const gradientSpread = 100;
          const gradientBottomPosition = 240 - overlayCopyRevealProgress * 280;
          const gradientTopPosition = gradientBottomPosition - gradientSpread;
          const overlayCopyScale = 1.25 - 0.25 * overlayCopyRevealProgress;
          if (overlayCopyRef.current) {
            overlayCopyRef.current.style.background = `linear-gradient(to bottom, #111117 0%, #111117 ${gradientTopPosition}%, #e66461 100%) ${gradientBottomPosition}%, #e66461 100%)`;
            overlayCopyRef.current.style.backgroundClip = "text";
            gsap.set(overlayCopyRef.current, {
              scale: overlayCopyScale,
              opacity: overlayCopyRevealProgress
            });
          }
        } else if (scrollProgress < 0.6 && overlayCopyRef.current) {
          gsap.set(overlayCopyRef.current, {
            opacity: 0
          });
        }
      }
    });
  }, []);

  return (
    <section id="transition-scene" className="min-h-screen w-full relative">
      <div ref={fadeOverlayRef} className="fade-overlay"></div>
      <div ref={svgOverlayRef} className="overlay">
        <svg width="100%" height="100%">
          <defs>
            <mask id="LogoRevealMask">
              <rect width="100%" height="100%" fill="white"/>
              <path ref={logoMaskRef} id="logoMask"></path>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="#111117" mask="url(#LogoRevealMask)"/>
        </svg>
      </div>
      <div ref={logoContainerRef} className="logo-container"></div>
      <div className="overlay-copy">
        <h1 ref={overlayCopyRef}>
          Fullstack Developer<br/>
          Creative<br/>
          Problem Solver<br/>
        </h1>
      </div>
    </section>
  );
};

export default TransitionScene;
