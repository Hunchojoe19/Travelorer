import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from '../components/app/Confetti';

const BACKGROUND =
    "https://res.cloudinary.com/dc59hhvse/image/upload/v1769295772/Background_Image_tlbwuj.png";
const LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png';

export default function LoginSuccess() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#EAF4FF]">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${BACKGROUND}')` }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#E6F0FF]/60 to-white/30" aria-hidden="true" />

            <header className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-12">
                <img src={LOGO} alt="Tourain" className="h-[28px] w-[142px]" />
            </header>

            <main className="relative z-10 flex flex-1 items-start justify-center px-4 pb-16 pt-8 sm:pt-6">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex w-full max-w-[980px] flex-col items-center rounded-2xl bg-white px-6 py-20 text-center shadow-xl sm:py-28"
                    aria-labelledby="login-success-title"
                >
                    <div className="relative flex h-20 w-20 items-center justify-center">
                        <Confetti />
                        {/* expanding ring */}
                        <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-[#4CD964]"
                            initial={{ scale: 1, opacity: 0.45 }}
                            animate={{ scale: 1.9, opacity: 0 }}
                            transition={{ delay: 0.45, duration: 1.4, repeat: 2, ease: 'easeOut' }}
                        />
                        <motion.div
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
                            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#4CD964] text-white shadow-lg shadow-[#4CD964]/40"
                        >
                            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" aria-hidden="true">
                                <motion.path
                                    d="M5 12.5l4.5 4.5L19 7.5"
                                    stroke="currentColor"
                                    strokeWidth="2.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.45, duration: 0.45, ease: 'easeOut' }}
                                />
                            </svg>
                        </motion.div>
                    </div>
                    <motion.h1
                        id="login-success-title"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 text-2xl font-semibold text-[#3CC13B]"
                    >
                        Login Successful!
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-3 text-sm text-gray-800">
                        Welcome back to Tourain AI Visa Assistant
                    </motion.p>
                    <motion.button
                        type="button"
                        onClick={() => navigate('/dashboard', { replace: true })}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-8 rounded-lg bg-black px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                    >
                        Continue
                    </motion.button>
                </motion.section>
            </main>
        </div>
    );
}
