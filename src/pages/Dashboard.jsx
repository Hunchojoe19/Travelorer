import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineLockClosed } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { displayName, loadProfile } from '../lib/profileStore';
import AppHeader from '../components/app/AppHeader';
import AiFab from '../components/app/AiFab';
import discoverImage from '../assets/discover_man.png';
import earnImage from '../assets/earn.png';

const GOALS = [
    {
        id: 'discover',
        title: 'Discover',
        items: ['Ask AI anything', 'Get travel requirements', 'Make an application'],
        card: 'bg-[#1E3F94] text-white',
        bullet: 'text-white/90',
        arrow: 'bg-[#3B82F6] text-white',
        image: discoverImage,
        imageClass: 'bottom-0 left-1/2 h-[190px] -translate-x-[60%] opacity-50',
        comingSoon: true,
        badge: 'bg-white/15 text-white ring-1 ring-white/25',
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
        image: earnImage,
        imageClass: 'bottom-3 left-5 h-[120px]',
        comingSoon: true,
        badge: 'bg-[#1E3F94]/10 text-[#1E3F94] ring-1 ring-[#1E3F94]/15',
    },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const name = useMemo(() => displayName(user, loadProfile(user?.id)), [user]);

    const openGoal = (goal) => {
        if (goal.to && !goal.comingSoon) navigate(goal.to);
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
                    {GOALS.map((goal, index) => {
                        const locked = Boolean(goal.comingSoon);
                        return (
                            <motion.button
                                key={goal.id}
                                type="button"
                                onClick={() => openGoal(goal)}
                                aria-disabled={locked}
                                aria-label={locked ? `${goal.title}, coming soon` : goal.title}
                                title={locked ? `${goal.title} is coming soon` : undefined}
                                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.6 + 0.12 * index, type: 'spring', stiffness: 180, damping: 18 }}
                                whileHover={locked ? 'lockedHover' : 'hover'}
                                whileFocus={locked ? 'lockedHover' : undefined}
                                whileTap={locked ? undefined : { scale: 0.98 }}
                                variants={{ hover: { y: -8, boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.25)' } }}
                                className={`group relative flex h-[300px] flex-col overflow-hidden rounded-2xl p-6 text-left shadow-sm ${goal.card} ${
                                    locked ? 'cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            >
                                {/* light sweep on hover (available cards only) */}
                                {!locked && (
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/20"
                                        variants={{ hover: { left: '130%', transition: { duration: 0.7, ease: 'easeInOut' } } }}
                                    />
                                )}

                                <span className="flex items-start justify-between gap-2">
                                    <span className="text-lg font-bold">{goal.title}</span>
                                    {locked ? (
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide backdrop-blur ${goal.badge}`}>
                                            <HiOutlineLockClosed className="h-3 w-3" aria-hidden="true" />
                                            Coming soon
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                                            </span>
                                            Available
                                        </span>
                                    )}
                                </span>
                                <ul className={`mt-3 list-disc space-y-1.5 pl-4 text-xs ${goal.bullet}`}>
                                    {goal.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>

                                {goal.image && (
                                    <motion.img
                                        src={goal.image}
                                        alt=""
                                        aria-hidden="true"
                                        draggable="false"
                                        className={`pointer-events-none absolute w-auto select-none object-contain ${goal.imageClass}`}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 3.5 + index, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                )}

                                {locked ? (
                                    <>
                                        {/* "launching soon" note slides up on hover/focus instead of an arrow */}
                                        <motion.span
                                            aria-hidden="true"
                                            className="absolute inset-x-4 bottom-4 rounded-xl bg-black/55 px-4 py-2.5 text-center text-xs font-medium text-white backdrop-blur"
                                            initial={{ opacity: 0, y: 12 }}
                                            variants={{ lockedHover: { opacity: 1, y: 0 } }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            We&apos;re putting the finishing touches on {goal.title}. Launching soon!
                                        </motion.span>
                                        <span
                                            aria-hidden="true"
                                            className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-black/15 text-current opacity-70 transition-opacity group-hover:opacity-0"
                                        >
                                            <HiOutlineLockClosed className="h-4 w-4" />
                                        </span>
                                    </>
                                ) : (
                                    <motion.span
                                        className={`absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full ${goal.arrow}`}
                                        aria-hidden="true"
                                        variants={{ hover: { x: 4, scale: 1.12 } }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    >
                                        <HiArrowRight className="h-5 w-5" />
                                    </motion.span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </main>
            <AiFab />
        </div>
    );
}
