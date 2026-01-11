import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NavLink = ({ href, children, isScrolled }) => {
    return (
        <a
            href={href}
            className={`relative font-medium text-sm py-2 group transition-colors duration-300 ${
                isScrolled
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-white/90 hover:text-white'
            }`}
        >
            {children}
            {/* Animated bottom border */}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${
                isScrolled ? 'bg-blue-400' : 'bg-white'
            }`}></span>
        </a>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-white/10 backdrop-blur-md border-b border-white/20 py-3'
                : 'bg-transparent py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                            isScrolled ? 'text-blue-400' : 'text-white'
                        }`}>Tourain</span>
                        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2"></div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="#why" isScrolled={isScrolled}>Why Tourain</NavLink>
                        <NavLink href="#features" isScrolled={isScrolled}>Features</NavLink>
                        <NavLink href="#faqs" isScrolled={isScrolled}>FAQs</NavLink>
                        <button  className="px-5 cursor-pointer py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                            Join the waitlist
                        </button>
                    </div>

                    {/* Mobile Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 w-full shadow-lg border-b border-gray-100">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a href="#why" className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium">Why Tourain</a>
                        <a href="#features" className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium">Features</a>
                        <a href="#faqs" className="block px-3 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium">FAQs</a>
                        <a href="#signin" className="block px-3 py-2 text-center bg-black text-white rounded-full font-medium mt-4"> Join the waitlist</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
