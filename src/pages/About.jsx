import React from 'react'
import Globe from 'react-globe.gl'

const About = () => {
    return (
        <section className='c-space my-20'>
            <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src = "/assets/grid1.png" alt='grid-1' className='w-full sm:h-[276px] h-fit object-contain'/>
                        <div>
                            <p className='grid-headtext'>Soy Javier</p>
                            <p className='grid-subtext'>Un programador Fullstack entusiasta del desarrollo y construcción de software, diseño de UI/UX, e implementación de lógica.</p>
                        </div>
                    </div> 
                </div>
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src = "" alt='grid-2' className='w-full sm:w-[276px] h-fit object-contain'/>
                        <div className='grid-headtext'>Tech Stack</div>
                        <div className='grid-subtext'>Especializado en Javascript con foco en React</div>
                    </div>
                </div>
                <div className='col-span-1 xl:row-span-4'>
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h[326px] h-fit flex justify-center items-center'>
                            <Globe 
                                height={326}
                                width={326}
                                backgroundColor='rgba(0,0,0,0)'
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl= "//unpkg.com/three-globe/example/img/earth-day.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            />
                        </div>
                        <div>
                            <p className='grid-headtext'>Siempre al pendiente</p>
                        </div>
                    </div>
                    <div className='xl:col-span-2 xl:row-span-3'>
                        <div className='grid-container'>
                            <img src='/assets/grid3.png' alt='grid-3' className='w-full sm:h-[266px] h-fit object-contain'/>
                            <div>
                                <p className='grid-headtext'>Mi pasion por programar</p>
                                <p className='grid-subtext'>Todo comenzo cuando....</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About