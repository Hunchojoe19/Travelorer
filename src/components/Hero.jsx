import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 overflow-hidden bg-hero-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">

                {/* Left Content */}
                <div className="w-full md:w-1/2 text-left mb-12 md:mb-0 z-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        The Smart Way To <br />
                        Get Your Travel Visa
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-white/90 text-lg md:text-xl max-w-lg mb-10"
                    >
                        Travel smarter. No application reviews, just the info you need. Guaranteed,
                        fast and secure way to travel needs.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                        <a
                            href="#waitlist"
                            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-transform hover:scale-105 shadow-xl"
                        >
                            Join the waitlist
                        </a>
                        <button className="flex items-center gap-3 px-6 py-4 text-gray-800 font-medium hover:text-black transition-colors">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                                <FaPlay className="ml-1 w-3 h-3 text-gray-900" />
                            </div>
                            See How
                        </button>
                    </motion.div>
                </div>

                {/* Right Content / Visuals */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-full md:w-1/2 relative flex justify-center md:justify-end"
                >
                    <div className="relative">
                        {/* Main center image */}
                        <img
                            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80"
                            alt="Happy Traveler"
                            className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-4 border-white shadow-2xl z-10 relative"
                        />

                        {/* Floating bubbles */}
                        <div className="absolute top-4 -left-8 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce hover:pause z-20">
                            <img src="https://images.unsplash.com/photo-1518684079-3c830dcef6db?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="User" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-800">Visa Approved</span>
                                <span className="text-[10px] text-green-500">Ready to fly</span>
                            </div>
                        </div>

                        <div className="absolute bottom-8 -right-4 bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3 animate-bounce delay-700 z-20">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-800">Flight Booked</span>
                                <span className="text-[10px] text-gray-400">Tue, 24 Aug</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Soft gradient fade at bottom to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Hero;
