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

    return (
        <div className="min-h-screen bg-white">
            <AppHeader />
            <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 text-center sm:px-6">
                <p className="text-sm text-gray-500">Welcome, {name}</p>
                <h1 className="mt-2 text-xl font-bold text-[#1E3F94] sm:text-2xl">What goal do you have in mind today?</h1>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {GOALS.map((goal, index) => (
                        <motion.button
                            key={goal.id}
                            type="button"
                            onClick={() => openGoal(goal)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            whileHover={{ y: -4 }}
                            className={`relative flex h-[200px] flex-col overflow-hidden rounded-2xl p-6 text-left shadow-sm ${goal.card}`}
                        >
                            <span className="text-lg font-bold">{goal.title}</span>
                            <ul className={`mt-3 list-disc space-y-1.5 pl-4 text-xs ${goal.bullet}`}>
                                {goal.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            {goal.Illustration && (
                                <goal.Illustration
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute -bottom-3 left-1/2 h-24 w-24 -translate-x-1/2 ${goal.illustrationClass}`}
                                />
                            )}
                            <span
                                className={`absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full ${goal.arrow}`}
                                aria-hidden="true"
                            >
                                <HiArrowRight className="h-5 w-5" />
                            </span>
                        </motion.button>
                    ))}
                </div>
            </main>
            <AiFab />
        </div>
    );
}
