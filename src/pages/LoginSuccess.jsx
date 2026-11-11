import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

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
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4CD964] text-white"
                    >
                        <HiCheck className="h-12 w-12" strokeWidth={1} />
                    </motion.div>
                    <h1 id="login-success-title" className="mt-8 text-2xl font-semibold text-[#3CC13B]">
                        Login Successful!
                    </h1>
                    <p className="mt-3 text-sm text-gray-800">Welcome back to Tourain AI Visa Assistant</p>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard', { replace: true })}
                        className="mt-8 rounded-lg bg-black px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                    >
                        Continue
                    </button>
                </motion.section>
            </main>
        </div>
    );
}
