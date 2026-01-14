import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const Hero = () => {
    return (
        <div
            className="relative pt-32 pb-20 overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dc59hhvse/image/upload/v1768401091/685cc40648a523c6ae809c7e_bg-hero_nmuu2k.png')" }}
        >
            <div className="absolute inset-0 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 relative z-10">

                {/* Left Content - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 max-w-xl text-left"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        The Smart Way To <br />
                        Get Your Travel Visa
                    </h1>

                    <p className="text-black text-lg font-light mb-10">
                        Tourain simplifies the application process by assisting you with the information, preparation and resources you need to navigate easily.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button
                            href="#waitlist"
                            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-transform hover:scale-105 shadow-xl"
                        >
                            Join the waitlist
                        </button>
                        <button className="flex items-center gap-3 px-6 py-4 text-gray-800 font-medium hover:text-black transition-colors">
                            <div className="w-10 h-10 bg-[#000000] rounded-full flex items-center justify-center shadow-md">
                                <FaPlay className="ml-1 w-3 h-3 text-[#7CB8FE]" />
                            </div>
                            Play video
                        </button>
                    </div>
                </motion.div>

                {/* Right Content / Visuals - Image on the right */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-1 flex justify-end"
                >
                    <div className="w-full max-w-2xl relative">
                        {/* Main center image - bigger size */}
                        <motion.img
                            src="https://res.cloudinary.com/dc59hhvse/image/upload/v1768151001/Hero_Image_fdsngy.png"
                            alt="Happy Traveler"
                            className="w-full h-auto object-contain z-10 relative rounded-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Soft gradient fade at bottom to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Hero;
