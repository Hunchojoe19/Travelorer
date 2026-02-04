import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessModal = ({ isOpen, onClose, userEmail }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full relative overflow-hidden"
                        >
                            {/* Confetti Animation */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(30)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            y: -20,
                                            x: Math.random() * 100 + '%',
                                            opacity: 1,
                                            rotate: 0
                                        }}
                                        animate={{
                                            y: '100vh',
                                            rotate: Math.random() * 360,
                                            opacity: 0
                                        }}
                                        transition={{
                                            duration: Math.random() * 2 + 2,
                                            delay: Math.random() * 0.5,
                                            ease: "easeOut"
                                        }}
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'][Math.floor(Math.random() * 6)]
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                {/* Success Icon */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="text-7xl mb-6"
                                >
                                    🎉
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-4xl font-bold text-[#003B95] mb-4"
                                >
                                    Welcome to the Waitlist!
                                </motion.h2>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-2"
                                >
                                    You're all set! We'll send you updates at:
                                </motion.p>

                                {/* Email */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-[#003B95] font-semibold text-lg mb-8"
                                >
                                    {userEmail}
                                </motion.p>

                                {/* Close Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={onClose}
                                    className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-all hover:scale-105 shadow-lg"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
