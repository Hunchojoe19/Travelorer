import React from 'react';
import { motion } from 'framer-motion';

const Discover = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20 relative"
            >
                <div className='w-full flex flex-col items-center gap-2'>

                <span className="text-gray-400 sentence tracking-widest text-base font-semibold">How it works</span>
                <div className='w-8 h-0.5 bg-black text-center'/>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">Discover</h2>
                <p className="text-gray-400 mt-2">A Simple way to build your strategy faster</p>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">

                {/* Feature 1: Plan your trip */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-gray-900 mb-4"
                        >
                            Plan your trip in minutes,<br /> not weeks.
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 mb-8 leading-relaxed lg:max-w-xl"
                        >
                            {/* Save hours of research and stops complicating data.
                            Use our app for automated visa results, you
                            can check anywhere in real-time. */}
                            Save hours of research and huge consulting fees.
                        Ask AI and explore conversations that answer your visa-related questions in real-time.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <motion.div
                            className="p-6 md:p-10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Mockup UI */}
                            <motion.img
                                // src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
                                src="https://res.cloudinary.com/dc59hhvse/image/upload/v1768154444/Discover_Trip-in-minutes_bqzaqb.png"
                                alt="Planning App UI"
                                className="rounded-2xl w-full h-auto object-cover"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                <div className="h-2 w-32 bg-gray-100 rounded"></div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Feature 2: Turn inspiration into actions */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-gray-900 mb-4"
                        >
                            Turn inspiration into <br />simplified actions.
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 mb-8 leading-relaxed lg:max-w-xl"
                        >
                            Get tailored recommendations and expert reviews
                            with clearly defined actions to help you
                            make better informed decisions.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <motion.div
                            className="p-6 md:p-10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Mockup UI */}
                            <motion.img
                                // src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
                                src="https://res.cloudinary.com/dc59hhvse/image/upload/v1768155101/Discover_Simplified-Action_nhpjyq.png"
                                alt="Planning App UI"
                                className="rounded-2xl w-full h-auto object-cover"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                <div className="h-2 w-32 bg-gray-100 rounded"></div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
                {/* Feature 3: Expert Advice */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-gray-900 mb-4"
                        >
                            Expert advise at your  <br />fingertips.
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-gray-500 mb-8 leading-relaxed lg:max-w-xl"
                        >
                            Collaborate using improvement actions on what works and mistakes to avoid with step-by-step guide from documentation to compliance.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <motion.div
                            className="p-6 md:p-10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Mockup UI */}
                            <motion.img
                                // src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
                                src="https://res.cloudinary.com/dc59hhvse/image/upload/v1768155108/Discover_Expert-Advise_hfu4xw.png"
                                alt="Planning App UI"
                                className="rounded-2xl w-full h-auto object-cover"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                <div className="h-2 w-32 bg-gray-100 rounded"></div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    {/* <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <motion.div
                            className="bg-blue-50 rounded-3xl p-8 relative z-10 transform md:-rotate-2 hover:rotate-0 transition-transform duration-500"
                            whileHover={{ scale: 1.02 }}
                        >
                        
                            <motion.div
                                className="bg-white rounded-2xl shadow-xl p-4 flex gap-4 items-center mb-4"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=100&q=80"
                                    className="w-16 h-16 rounded-xl object-cover"
                                    alt="Destination"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <div>
                                    <div className="font-bold text-gray-800">Santorini Trip</div>
                                    <div className="text-green-500 text-sm font-semibold">Visa Free</div>
                                </div>
                            </motion.div>
                            <motion.button
                                className="bg-black text-white px-6 py-2 rounded-lg text-sm font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Now
                            </motion.button>
                        </motion.div>
                    </motion.div> */}
                </div>
            </div>
        </section>
    );
};

export default Discover;
