import React from 'react';
import { motion } from 'framer-motion';

const Evaluate = () => {
    const evaluate_Image = "https://res.cloudinary.com/dc59hhvse/image/upload/v1768155133/Evaluate_Predict_g1s5tw.png"
    const reapplication_Image = "https://res.cloudinary.com/dc59hhvse/image/upload/v1768155134/Evaluate_Refusal_hcxm2u.png"
    return (
        <section className="py-20 bg-[#EBEAEA40] space-y-12">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Evaluate</h2>
                <p className="text-gray-400 text-sm sentence tracking-wide">A Transparent way to manage your travel reputation</p>
            </div>

            <div className="max-w-5xl bg-white mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-0 items-center shadow-lg rounded-lg overflow-hidden">
                {/* Left Side Content */}
                <div className="order-2 md:order-1 p-8">
                    <div className="w-max flex items-center gap-x-3 px-4 py-3 bg-[#02FE281A] text-[#04E226] border border-[#04E226] text-xs font-bold rounded-full mb-4 uppercase">
                        <Trend /> Predictive Analytics
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Test your eligibility,<br /> with confidence.</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        Predict your immigration outcome by assessing your risks, preferences, budget, and travel history with an instant readiness score to determine actionable steps.
                    </p>
                </div>

                {/* Right Side Image - Fits inside card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 h-80 md:h-96"
                >
                    {/* Image container with fixed height */}
                    <div className="h-full w-full flex items-center justify-center p-4">
                        <motion.img
                            src={evaluate_Image}
                            alt="Planning App UI"
                            className="max-h-full max-w-full object-contain"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Second Card - Image on Left, Text on Right */}
            <div className="max-w-5xl bg-white mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-0 items-center shadow-lg rounded-lg overflow-hidden">
                {/* Left Side Image - Image on the LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 h-80 md:h-96"
                >
                    {/* Image container with fixed height */}
                    <div className="h-full w-full flex items-center justify-center p-4">
                        <motion.img
                            src={reapplication_Image}
                            alt="Reapplication"
                            className="max-h-full max-w-full object-contain"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Right Side Text - Text on the RIGHT */}
                <div className="order-2 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Rejections, Reviews &<br /> Reapplications.</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        Get professional and legal experts to handle your reviews, appeals and administrative analysis with feedback that helps you navigate complicated situations and think like an expert.
                    </p>
                </div>
            </div>
        </section>
    );
};
import { FaShieldAlt } from 'react-icons/fa';
import Trend from '../assets/Trend';

export default Evaluate;
