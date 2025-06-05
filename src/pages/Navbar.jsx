import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants/index.js';

const NavItems = ({ setIsOpen }) => {
    const handleClick = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                    <a 
                        href={href} 
                        className="nav-li_a hover:text-white transition-colors" 
                        onClick={(e) => handleClick(e, href)}
                    >
                        {name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => link.href.substring(1));
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space">
                    <a href="#home" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
                        Javier
                    </a>
                    <button 
                        className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex" 
                        aria-label="Toggle menu" 
                        onClick={toggleMenu}
                    >
                        <img 
                            src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"} 
                            alt="toggle" 
                            className="w-6 h-6" 
                        />
                    </button>

                    <nav className='sm:flex hidden'>
                        <NavItems setIsOpen={setIsOpen} />
                    </nav>
                </div>
            </div>
            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all duration-300 ease-in-out`}>
                <nav className='p-5'>
                    <NavItems setIsOpen={setIsOpen} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;