import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiArrowLeft, HiOutlineViewGrid } from 'react-icons/hi';
import {
    TbCurrencyDollar,
    TbFileText,
    TbMap2,
    TbPlaneDeparture,
    TbShieldCheck,
    TbShoppingBag,
    TbUsers,
    TbWorld,
} from 'react-icons/tb';
import { useAuth } from '../auth/AuthContext';
import { getTravellerSnapshot } from '../lib/ai';
import { loadProfile } from '../lib/profileStore';
import DiscoverChat from '../components/discover/DiscoverChat';
import IntelDashboard from '../components/discover/IntelDashboard';

const RAIL = [
    { label: 'Dashboard', icon: HiOutlineViewGrid, to: '/dashboard' },
    { label: 'Discover', icon: TbWorld, to: '/discover' },
    { label: 'Personal profile', icon: TbFileText, to: '/evaluate/profile' },
    { label: 'Travel history', icon: TbPlaneDeparture, to: '/evaluate/travel' },
    { label: 'Earn', icon: TbCurrencyDollar },
    'divider',
    { label: 'Bookings', icon: TbShoppingBag },
    { label: 'Visa evaluation', icon: TbShieldCheck, to: '/evaluate' },
    { label: 'Map Intel', icon: TbMap2 },
    { label: 'Creator Hub', icon: TbUsers },
];

const soon = (name) => toast(`${name} is coming soon.`, { icon: '🔒', style: { background: '#161d18', color: '#f1ede2' } });

function initialsFor(user, profile, name) {
    if (profile.givenName || profile.surname) return `${profile.givenName?.[0] || ''}${profile.surname?.[0] || ''}`.toUpperCase();
    const parts = (user?.name || name || '').trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || 'T';
}

/** Avatar with a small account menu (dashboard, profile, sign out). */
function AccountMenu({ initials, align = 'right', up = false }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const ref = useRef(null);
    useEffect(() => {
        if (!open) return undefined;
        const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, [open]);
    const items = [
        ['Dashboard', () => navigate('/dashboard')],
        ['Tourain website', () => navigate('/')],
        ['My profile', () => navigate('/evaluate/profile')],
        ['Travel history', () => navigate('/evaluate/travel')],
        [
            'Sign out',
            () => {
                signOut();
                navigate('/', { replace: true });
            },
        ],
    ];
    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Account menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#8a9a5b] to-[#4b5d3a] text-xs font-semibold text-[#f6f1df] ring-2 ring-[#0b0f0c] transition-transform hover:scale-105"
            >
                {initials}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="menu"
                        initial={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.97 }}
                        transition={{ duration: 0.12 }}
                        className={`absolute z-50 w-44 overflow-hidden rounded-xl border border-[#243026] bg-[#141a15] py-1 text-sm shadow-xl ${
                            align === 'right' ? 'right-0' : 'left-0'
                        } ${up ? 'bottom-11' : 'top-11'}`}
                    >
                        {items.map(([label, action]) => (
                            <li key={label} role="none">
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => {
                                        setOpen(false);
                                        action();
                                    }}
                                    className={`block w-full px-4 py-2 text-left transition-colors hover:bg-white/5 ${label === 'Sign out' ? 'text-red-300' : 'text-[#e9e6dc]'}`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

function Rail({ initials }) {
    return (
        <nav className="hidden w-[72px] shrink-0 flex-col items-center border-r border-[#1d2620] py-5 md:flex" aria-label="Tourain">
            <Link
                to="/"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a84c] font-serif text-lg font-bold text-[#15130c] shadow-[0_0_24px_rgba(201,168,76,0.25)]"
                aria-label="Tourain website"
                title="Tourain website"
            >
                T
            </Link>
            <ul className="mt-8 flex flex-col items-center gap-2">
                {RAIL.map((item, i) =>
                    item === 'divider' ? (
                        <li key={`d${i}`} className="my-2 h-px w-8 bg-[#1f2922]" aria-hidden="true" />
                    ) : (
                        <li key={item.label} className="group relative">
                            {item.to ? (
                                <Link
                                    to={item.to}
                                    aria-label={item.label}
                                    aria-current={item.to === '/discover' ? 'page' : undefined}
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                                        item.to === '/discover' ? 'bg-[#1a2219] text-[#d8b85a]' : 'text-[#8a9389] hover:bg-white/5 hover:text-[#f1ede2]'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => soon(item.label)}
                                    aria-label={`${item.label}, coming soon`}
                                    aria-disabled="true"
                                    className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-xl text-[#4f584f] transition-colors hover:bg-white/5"
                                >
                                    <item.icon className="h-5 w-5" />
                                </button>
                            )}
                            <span className="pointer-events-none absolute left-14 top-1/2 z-40 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1d251f] px-2.5 py-1.5 text-xs text-[#f1ede2] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                {item.label}
                                {!item.to && <span className="text-[#8a9389]"> · soon</span>}
                            </span>
                        </li>
                    ),
                )}
            </ul>
            <span className="mt-auto mb-4 text-[10px] font-medium tracking-[0.35em] text-[#4f584f] [writing-mode:vertical-rl]">TOURAIN</span>
            <AccountMenu initials={initials} align="left" up />
        </nav>
    );
}

/** Discover: chat with Ama (left) and the intelligence dashboard (right). */
export default function DiscoverPage() {
    const { user } = useAuth();
    const snapshot = useMemo(() => getTravellerSnapshot(user), [user]);
    const initials = useMemo(() => initialsFor(user, loadProfile(user?.id), snapshot.name), [user, snapshot.name]);
    const chatRef = useRef(null);
    const [mobileTab, setMobileTab] = useState('chat');

    useEffect(() => {
        const previous = document.title;
        document.title = 'Discover · Tourain';
        return () => {
            document.title = previous;
        };
    }, []);

    const ask = (text) => {
        setMobileTab('chat');
        // Let the chat column show (on phones) before sending.
        setTimeout(() => chatRef.current?.ask(text), 0);
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#070a08] text-[#e9e6dc] md:p-4">
            {/* Phone/tablet top bar: switch between the chat and the dashboard */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#1d2620] px-4 py-3 md:mb-3 md:rounded-2xl md:border lg:hidden">
                <Link to="/dashboard" className="flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-[#d8b85a] hover:bg-white/5" aria-label="Back to dashboard">
                    <HiArrowLeft className="h-4 w-4" /> Dashboard
                </Link>
                <div className="flex flex-1 rounded-full bg-[#121813] p-1 text-sm" role="tablist" aria-label="Discover sections">
                    {[
                        ['chat', 'Ama'],
                        ['dashboard', 'Dashboard'],
                    ].map(([id, label]) => (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            aria-selected={mobileTab === id}
                            onClick={() => setMobileTab(id)}
                            className={`flex-1 rounded-full py-1.5 font-medium transition-colors ${mobileTab === id ? 'bg-[#c9a84c] text-[#15130c]' : 'text-[#8a9389]'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <AccountMenu initials={initials} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 overflow-hidden bg-[#0b0f0c] md:rounded-[28px] md:border md:border-[#1d2620] md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            >
                <Rail initials={initials} />

                <div className={`min-h-0 min-w-0 flex-1 lg:max-w-[46%] lg:border-r lg:border-[#1d2620] ${mobileTab === 'chat' ? 'flex flex-col' : 'hidden'} lg:flex lg:flex-col`}>
                    <DiscoverChat ref={chatRef} snapshot={snapshot} />
                </div>

                <section
                    className={`min-h-0 min-w-0 flex-1 flex-col ${mobileTab === 'dashboard' ? 'flex' : 'hidden'} lg:flex`}
                    aria-label="Intelligence dashboard"
                >
                    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#1d2620] px-5">
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[#b9beb4]">Intelligence dashboard</h2>
                        <Link
                            to="/dashboard"
                            className="ml-4 hidden items-center gap-1.5 rounded-full border border-[#243026] px-3 py-1.5 text-xs font-medium text-[#d8b85a] transition-colors hover:border-[#c9a84c]/50 hover:bg-[#c9a84c]/10 lg:flex"
                        >
                            <HiOutlineViewGrid className="h-3.5 w-3.5" /> Dashboard
                        </Link>
                        <span className="ml-auto hidden items-center gap-1.5 text-sm text-[#7fae7a] sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7fae7a]" /> All signals live
                        </span>
                        <span className="hidden lg:block">
                            <AccountMenu initials={initials} />
                        </span>
                    </header>
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                        <IntelDashboard snapshot={snapshot} onAsk={ask} />
                    </div>
                </section>
            </motion.div>
        </div>
    );
}
