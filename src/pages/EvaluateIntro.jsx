import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/app/AppHeader';
import AiFab from '../components/app/AiFab';

export default function EvaluateIntro() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white">
            <AppHeader />
            <main className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-24 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base leading-relaxed text-gray-500"
                >
                    Tourain AI Proprietary Visa Assessment will calculate a score for you based on the facts of your visa
                    case. This should take about 10 - 12 minutes.
                </motion.p>
                <button
                    type="button"
                    onClick={() => navigate('/evaluate/profile')}
                    className="mt-10 rounded-lg bg-[#2F6FED] px-10 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#245ad0]"
                >
                    Get Started
                </button>

                <section className="mt-28 max-w-xl text-xs leading-relaxed text-gray-500" aria-labelledby="disclaimer-title">
                    <h2 id="disclaimer-title" className="mb-3 text-sm text-gray-500">
                        Disclaimer
                    </h2>
                    <p>
                        This feature is built as a transparent, trustworthy tool that makes high-stakes visa information
                        accessible, affordable, and actionable for applicants.
                    </p>
                    <p className="mt-2">Our goal is to help you make better informed decision.</p>
                    <p className="mt-2">
                        We use a tiered parameter system, blending public data, user-provided details, and real-time
                        embassy intelligence.
                    </p>
                </section>
            </main>
            <AiFab />
        </div>
    );
}
