import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import Button from '../components/Button.jsx';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial state for grid containers
            gsap.set('.grid-container', { 
                opacity: 0,
                y: 30
            });

            // Animate grid containers
            gsap.to('.grid-container', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top center+=20%",
                    end: "center center",
                    toggleActions: "play none none reverse"
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText('javibenn@gmail.com');
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };    return (
        <section ref={aboutRef} className='c-space min-h-screen' id="about">
            <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img 
                            src="assets/grid1.png" 
                            alt='grid-1' 
                            className='w-full sm:h-[400px] h-fit object-contain'
                        />
                        <div>
                            <p className='grid-headtext'>Soy Javier</p>
                            <p className='grid-subtext'>
                                Un programador Fullstack entusiasta del desarrollo y construcción de software, 
                                diseño de UI/UX, e implementación de lógica.
                            </p>
                        </div>
                    </div> 
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img 
                            src="assets/grid2.png" 
                            alt="grid-2" 
                            className="w-full sm:h-[400px] h-fit object-contain" 
                        />
                        <div>
                            <p className='grid-headtext'>Tech Stack</p>
                            <p className='grid-subtext'>Especializado en Javascript con foco en React</p>
                        </div>
                    </div>
                </div>

                <div className='col-span-1 xl:row-span-4'>
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center'>
                            <Globe 
                                height={326}
                                width={326}
                                backgroundColor='rgba(0,0,0,0)'
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            />
                        </div>
                        <div>
                            <p className='grid-headtext'>Siempre al pendiente</p>
                            <p className='grid-subtext'>Basado en Guatemala y abierto a trabajo remoto en cualquier parte del mundo.</p>
                            <Button name="Contactame" isBeam containerClass="w-full mt-10" />
                        </div>
                    </div>
                </div>

                <div className='xl:col-span-2 xl:row-span-3'>
                    <div className='grid-container'>
                        <img 
                            src='assets/grid3.png' 
                            alt='grid-3' 
                            className='w-full sm:h-[266px] h-fit object-contain'
                        />
                        <div>
                            <p className='grid-headtext'>Mi pasión por programar</p>
                            <p className='grid-subtext'>
                                Me encanta resolver problemas y construir cosas a través del código. 
                                La programación no es solo mi profesión, es mi pasión. 
                                Disfruto explorar nuevas tecnologías y mejorar mis habilidades.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='xl:col-span-1 xl:row-span-2'>
                    <div className='grid-container'>
                        <img 
                            src='assets/grid4.png'
                            alt='grid-4'
                            className='w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top'
                        />
                        <div className='space-y-2'>
                            <p className='grid-subtext text-center'>Contactame</p>
                            <div className='copy-container' onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt='copy' />
                                <p className='lg:text-2xl md:text-xl font-medium text-gray_gradient text-white'>
                                    javibenn@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About