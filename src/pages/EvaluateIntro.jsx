import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi';
import AppHeader from '../components/app/AppHeader';
import { useAuth } from '../auth/AuthContext';
import { loadProfile } from '../lib/profileStore';
import AiFab from '../components/app/AiFab';

export default function EvaluateIntro() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const profileDone = Boolean(loadProfile(user?.id).completedAt);
    return (
        <div className="min-h-screen bg-white">
            <AppHeader />
            <main className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-24 pt-20 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.2 }}
                    className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2F6FED]/10 text-[#2F6FED]"
                    aria-hidden="true"
                >
                    <motion.span animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                        <HiOutlineSparkles className="h-8 w-8" />
                    </motion.span>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="text-base leading-relaxed text-gray-500"
                >
                    Tourain AI Proprietary Visa Assessment will calculate a score for you based on the facts of your visa
                    case. This should take about 10 - 12 minutes.
                </motion.p>
                <motion.button
                    type="button"
                    onClick={() => navigate('/evaluate/profile')}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative mt-10 overflow-hidden rounded-lg bg-[#2F6FED] px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2F6FED]/30"
                >
                    <motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30"
                        animate={{ left: ['-50%', '150%'] }}
                        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                    />
                    <span className="relative">{profileDone ? 'View my profile' : 'Get Started'}</span>
                </motion.button>
                {profileDone && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#2E9E2C]"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3CC13B]" aria-hidden="true" />
                        Your profile is complete
                    </motion.p>
                )}

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-28 max-w-xl text-xs leading-relaxed text-gray-500" aria-labelledby="disclaimer-title">
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
                </motion.section>
            </main>
            <AiFab />
        </div>
    );
}
