import React, { useEffect } from 'react'
import Navbar from './pages/Navbar'
import Hero from './pages/Hero'
import TransitionScene from './pages/TransitionScene'
import About from './pages/About'
import lenis from './lib/scroll'

const App = () => {
  useEffect(() => {
    // Lenis is already initialized in the scroll.js file
    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="scene-wrapper">
      <Navbar />
      <main className="relative">
        <Hero/>
        <TransitionScene />
        <About/>
      </main>
    </div>
  )
}

export default App