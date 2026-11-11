import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { TbCoins, TbMap2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../auth/AuthContext';
import { displayName, loadProfile } from '../lib/profileStore';
import AppHeader from '../components/app/AppHeader';
import AiFab from '../components/app/AiFab';

const GOALS = [
    {
        id: 'discover',
        title: 'Discover',
        items: ['Ask AI anything', 'Get travel requirements', 'Make an application'],
        card: 'bg-[#1E3F94] text-white',
        bullet: 'text-white/90',
        arrow: 'bg-[#3B82F6] text-white',
        Illustration: TbMap2,
        illustrationClass: 'text-white/25',
    },
    {
        id: 'evaluate',
        title: 'Evaluate',
        items: ['Predict Visa Outcome', 'Refusals', 'Book an assistant'],
        card: 'bg-[#F8CB57] text-white',
        bullet: 'text-white/95',
        arrow: 'bg-[#F27A2B] text-white',
        to: '/evaluate',
    },
    {
        id: 'earn',
        title: 'Earn',
        items: ['Share Travel Info', 'Build Referrals'],
        card: 'bg-[#E8F7E4] text-[#1E3F94]',
        bullet: 'text-[#1E3F94]',
        arrow: 'bg-[#6CA144] text-white',
        Illustration: TbCoins,
        illustrationClass: 'text-[#F27A2B]/70',
    },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const name = useMemo(() => displayName(user, loadProfile(user?.id)), [user]);

    const openGoal = (goal) => {
        if (goal.to) navigate(goal.to);
        else toast(`${goal.title} is coming soon.`);
    };

    const headline = 'What goal do you have in mind today?'.split(' ');

    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* soft drifting colour glows behind the content */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#1E3F94]/10 blur-3xl"
                animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-64 h-96 w-96 rounded-full bg-[#F8CB57]/20 blur-3xl"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            <AppHeader />
            <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-10 text-center sm:px-6">
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-500"
                >
                    Welcome, {name}{' '}
                    <motion.span
                        className="inline-block origin-[70%_70%]"
                        animate={{ rotate: [0, 18, -8, 18, 0] }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        aria-hidden="true"
                    >
                        👋
                    </motion.span>
                </motion.p>
                <h1 className="mt-2 text-xl font-bold text-[#1E3F94] sm:text-2xl" aria-label={headline.join(' ')}>
                    {headline.map((word, i) => (
                        <motion.span
                            key={i}
                            aria-hidden="true"
                            className="inline-block"
                            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                        >
                            {word}&nbsp;
                        </motion.span>
                    ))}
                </h1>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {GOALS.map((goal, index) => (
                        <motion.button
                            key={goal.id}
                            type="button"
                            onClick={() => openGoal(goal)}
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.6 + 0.12 * index, type: 'spring', stiffness: 180, damping: 18 }}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            variants={{ hover: { y: -8, boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)' } }}
                            className={`group relative flex h-[200px] flex-col overflow-hidden rounded-2xl p-6 text-left shadow-sm ${goal.card}`}
                        >
                            {/* light sweep on hover */}
                            <motion.span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/20"
                                variants={{ hover: { left: '130%', transition: { duration: 0.7, ease: 'easeInOut' } } }}
                            />
                            <span className="text-lg font-bold">{goal.title}</span>
                            <ul className={`mt-3 list-disc space-y-1.5 pl-4 text-xs ${goal.bullet}`}>
                                {goal.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            {goal.Illustration && (
                                <motion.span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2"
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 3.5 + index, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <goal.Illustration className={`h-24 w-24 ${goal.illustrationClass}`} />
                                </motion.span>
                            )}
                            <motion.span
                                className={`absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full ${goal.arrow}`}
                                aria-hidden="true"
                                variants={{ hover: { x: 4, scale: 1.12 } }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                                <HiArrowRight className="h-5 w-5" />
                            </motion.span>
                        </motion.button>
                    ))}
                </div>
            </main>
            <AiFab />
        </div>
    );
}
