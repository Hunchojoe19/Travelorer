import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavLink = ({ href, children, isScrolled, forceBlue }) => {

    return (
        <a
            href={href}
            className={`relative font-medium text-sm py-2 group transition-colors duration-300 ${isScrolled
                ? (forceBlue ? 'text-white' : 'text-blue-400 font-bold')
                : 'text-white/90 hover:text-white'
                }`}
        >
            {children}
            {/* Animated bottom border */}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-out group-hover:w-full ${isScrolled && !forceBlue ? 'bg-blue-400' : 'bg-white'
                }`}></span>
        </a>
    );
};

const Navbar = ({ forceBlue = false, logoOnly = false }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(forceBlue);
    const pathName = useLocation().pathname;

    useEffect(() => {
        if (logoOnly) {
            setIsScrolled(false); // No background if logoOnly
            return;
        }
        if (forceBlue) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [forceBlue, logoOnly]);

    const logo = "https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png"
    const white_logo = "https://res.cloudinary.com/dc59hhvse/image/upload/v1768401091/Tourain_logo_u9puuh.png"

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? (forceBlue ? 'bg-[#003B95] py-3 shadow-lg' : 'bg-white/10 backdrop-blur-md border-b border-white/20 py-3')
            : (logoOnly ? 'bg-transparent py-4' : 'bg-transparent py-4')
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src={logoOnly || (isScrolled && !forceBlue) ? logo : white_logo} alt='Tourain logo' loading='lazy' className='w-[142px] h-[28px] cursor-pointer' />
                    </div>

                    {/* Desktop Nav */}
                    {!logoOnly && (
                        <div className="hidden md:flex items-center space-x-8">
                            {pathName !== '/waitlist' && <NavLink href="#why" isScrolled={isScrolled} forceBlue={forceBlue}>Why Tourain?</NavLink>}
                            {pathName !== '/waitlist' && <NavLink href="#features" isScrolled={isScrolled} forceBlue={forceBlue}>Features</NavLink>}
                            {pathName === '/waitlist' && <NavLink href="/" isScrolled={isScrolled} forceBlue={forceBlue}>Home</NavLink>}
                            {pathName !== '/waitlist' && <Link to="/waitlist" className={`px-5 cursor-pointer py-2 rounded-full text-sm font-medium transition-colors ${forceBlue ? 'bg-white text-[#003B95] hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-400'}`}>
                                Join the waitlist
                            </Link>}
                        </div>
                    )}

                    {/* Mobile Button */}
                    {!logoOnly && (
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled && !forceBlue ? 'text-blue-400' : 'text-white'} hover:bg-white/10 focus:outline-none`}
                            >
                                {isOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && !logoOnly && (
                <div className={`md:hidden absolute top-full left-0 w-full shadow-lg border-b ${forceBlue ? 'bg-[#003B95] border-white/10' : 'bg-white/95 backdrop-blur-md border-gray-100'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {pathName !== '/waitlist' && <a href="#why" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${forceBlue ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-50'}`}>Why Tourain</a>}
                        {pathName === '/waitlist' && <a href="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${forceBlue ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-50'}`}>Home</a>}
                        {pathName !== '/waitlist' && <a href="#features" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md font-medium ${forceBlue ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-50'}`}>Features</a>}
                        {pathName !== '/waitlist' && <Link to="/waitlist" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-center rounded-full font-medium mt-4 ${forceBlue ? 'bg-white text-[#003B95]' : 'bg-black text-white'}`}> Join the waitlist</Link>}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
