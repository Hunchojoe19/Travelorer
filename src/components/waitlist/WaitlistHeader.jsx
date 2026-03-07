import React from 'react';
import { motion } from 'framer-motion';

const WaitlistHeader = () => {
    // Typewriter text
    const subtextContent = "Sign up below to join the Beta group waitlist and get our latest updates straight to your inbox.";

    return (
        <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left lg:max-w-md py-12 relative"
        >
            {/* Animated Plane flying in a circular path */}
            <motion.div
                className="absolute text-4xl z-10"
                animate={{
                    x: [0, 120, 120, 0, 0],
                    y: [0, 0, 100, 100, 0],
                    rotate: [0, 90, 180, 270, 360]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    top: '-30px',
                    left: '50%',
                    marginLeft: '-20px'
                }}
            >
                ✈️
            </motion.div>

            <h1 className="text-7xl md:text-[96px] font-bold text-white mb-4 lg:mb-6">
                JOIN THE WAITLIST
            </h1>
            <p className="text-gray-600 font-light text-sm md:text-base lg:text-lg leading-relaxed">
                {Array.from(subtextContent).map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.05,
                            delay: 0.8 + index * 0.02
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </p>
        </motion.div>
    );
};

export default WaitlistHeader;
