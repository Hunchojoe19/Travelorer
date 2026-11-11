import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiArrowRight, HiOutlineLockClosed } from 'react-icons/hi';
import {
    TbBolt,
    TbCircleCheck,
    TbClipboardCheck,
    TbCurrencyNaira,
    TbPlane,
    TbPlayerPlayFilled,
    TbShieldExclamation,
    TbUsersGroup,
} from 'react-icons/tb';

const card = 'rounded-2xl border border-[#1f2922] bg-[#111712]';

function SectionTitle({ children, sample, action }) {
    return (
        <div className="mb-3 mt-8 flex items-center gap-2">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[#9aa397]">{children}</h3>
            {sample && <SampleTag />}
            {action && <span className="ml-auto">{action}</span>}
        </div>
    );
}

function SampleTag() {
    return (
        <span className="rounded-full border border-[#c9a84c]/25 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#c9a84c]/80" title="Example data. Live feeds are coming soon.">
            Sample
        </span>
    );
}

const soon = (name) => toast(`${name} is coming soon.`, { icon: '🔒', style: { background: '#161d18', color: '#f1ede2' } });

/** Live exchange rate for the user's budget currency (or USD) against the naira. */
function useNairaRate(currency) {
    const base = currency && currency !== 'NGN' ? currency : 'USD';
    const [state, setState] = useState({ status: 'loading', base });
    useEffect(() => {
        let cancelled = false;
        setState({ status: 'loading', base });
        fetch(`https://open.er-api.com/v6/latest/${base}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
            .then((data) => {
                const rate = data?.rates?.NGN;
                if (cancelled) return;
                if (data?.result === 'success' && rate) {
                    setState({ status: 'live', base, rate, updated: data.time_last_update_unix ? new Date(data.time_last_update_unix * 1000) : null });
                } else setState({ status: 'sample', base });
            })
            .catch(() => !cancelled && setState({ status: 'sample', base }));
        return () => {
            cancelled = true;
        };
    }, [base]);
    return state;
}

function SignalCard({ icon: Icon, iconClass, value, label, note, noteClass, sample, onClick, delay }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -3 }}
            className={`${card} group relative flex flex-col items-start p-4 text-left transition-colors hover:border-[#c9a84c]/40`}
        >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>
                <Icon className="h-[18px] w-[18px]" />
            </span>
            {sample && (
                <span className="absolute right-3 top-3">
                    <SampleTag />
                </span>
            )}
            <span className="mt-4 text-xl font-semibold text-[#f1ede2]">{value}</span>
            <span className="text-xs text-[#8a9389]">{label}</span>
            <span className={`mt-2 text-xs ${noteClass}`}>{note}</span>
        </motion.button>
    );
}

/** Right-hand "Intelligence dashboard" of Discover: the user's real data plus clearly marked sample feeds. */
export default function IntelDashboard({ snapshot, onAsk }) {
    const navigate = useNavigate();
    const t = snapshot.travel;
    const fx = useNairaRate(t.budgetCurrency);
    const stepsDone = (snapshot.profileDone ? 1 : 0) + (snapshot.travelDone ? 1 : 0);
    const nextStep = !snapshot.profileDone ? 'Personal profile next' : !snapshot.travelDone ? 'Travel history next' : 'Trip details coming soon';
    const fxValue = fx.status === 'live' ? fx.rate.toLocaleString('en', { maximumFractionDigits: fx.rate < 10 ? 4 : 0 }) : fx.status === 'loading' ? '…' : '1,542';
    const fxBase = fx.status === 'sample' ? 'USD' : fx.base;

    const tripRows = [
        ['Destination', t.destination],
        ['Purpose', t.purpose],
        ['Visa type', t.visaType],
        ['Length of stay', t.lengthOfStay],
        ['Budget', t.budget],
        ['Funded by', t.fundedBy],
    ].filter(([, v]) => v);

    return (
        <div className="px-5 pb-10 pt-5">
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[260px] overflow-hidden rounded-2xl border border-[#1f2922]"
            >
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#7aa7c7" />
                            <stop offset="0.55" stopColor="#e6c79a" />
                            <stop offset="1" stopColor="#c9773f" />
                        </linearGradient>
                        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0.35" stopColor="#0b0f0c" stopOpacity="0" />
                            <stop offset="1" stopColor="#0b0f0c" stopOpacity="0.92" />
                        </linearGradient>
                    </defs>
                    <rect width="600" height="260" fill="url(#sky)" />
                    <circle cx="470" cy="70" r="26" fill="#fff4dc" opacity="0.85" />
                    <motion.g animate={{ x: [0, -18, 0] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}>
                        <path d="M-20 170 L40 95 L70 120 L110 60 L150 115 L190 90 L240 150 L300 105 L350 140 L420 80 L470 125 L520 100 L640 160 L640 260 L-20 260Z" fill="#b5653a" />
                        <path d="M-20 195 L60 140 L120 175 L190 130 L260 180 L330 145 L400 185 L470 150 L540 180 L640 150 L640 260 L-20 260Z" fill="#8c4527" />
                    </motion.g>
                    <path d="M-20 225 L120 205 L300 220 L460 200 L640 215 L640 260 L-20 260Z" fill="#5b2c1a" />
                    <motion.g initial={{ x: -60 }} animate={{ x: 660 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
                        <path d="M0 0 l18 -4 l6 -6 l3 0 l-3 7 l10 -2 l3 -3 l2 0 l-2 4 l-37 8z" transform="translate(0 48)" fill="#1b2420" opacity="0.65" />
                    </motion.g>
                    <rect width="600" height="260" fill="url(#fade)" />
                </svg>
                <button
                    type="button"
                    onClick={() => onAsk(t.destination ? `Give me a quick briefing for my trip to ${t.destination}.` : 'Give me a quick briefing on how to start planning a trip abroad.')}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
                    aria-label="Ask Ama for a trip briefing"
                    title="Ask Ama for a trip briefing"
                >
                    <TbPlayerPlayFilled className="h-4 w-4" />
                </button>
                <div className="absolute inset-x-6 bottom-5">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#e2c878]">Your co-pilot is watching</p>
                    <p className="mt-1 font-serif text-3xl font-semibold text-white">Move with Confidence</p>
                    <p className="mt-1 text-sm text-white/70">
                        {t.destination ? `Next stop: ${t.destination}${t.lengthOfStay ? ` · ${t.lengthOfStay}` : ''}` : 'Tell Ama where you are headed to get started.'}
                    </p>
                </div>
            </motion.div>

            {/* Signals */}
            <SectionTitle>Live signals for you</SectionTitle>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SignalCard
                    icon={TbClipboardCheck}
                    iconClass="bg-[#2F6FED]/20 text-[#7ea6ff]"
                    value={`${stepsDone}/3`}
                    label="Visa assessment"
                    note={nextStep}
                    noteClass={stepsDone === 2 ? 'text-[#7fae7a]' : 'text-[#d8b85a]'}
                    onClick={() => navigate(snapshot.profileDone ? '/evaluate/travel' : '/evaluate/profile')}
                    delay={0.1}
                />
                <SignalCard
                    icon={TbPlane}
                    iconClass="bg-sky-400/15 text-sky-300"
                    value="Low"
                    label="Flight risk"
                    note="Stable"
                    noteClass="text-[#d8b85a]"
                    sample
                    onClick={() => soon('Flight Intel')}
                    delay={0.18}
                />
                <SignalCard
                    icon={TbCurrencyNaira}
                    iconClass="bg-emerald-400/15 text-emerald-300"
                    value={fxValue}
                    label={`${fxBase}/NGN`}
                    note={fx.status === 'live' ? `Live${fx.updated ? ` · ${fx.updated.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}` : ''}` : fx.status === 'loading' ? 'Fetching rate…' : '-0.4%'}
                    noteClass={fx.status === 'live' ? 'text-[#7fae7a]' : 'text-[#7ea6ff]'}
                    sample={fx.status === 'sample'}
                    onClick={() =>
                        onAsk(
                            t.budget
                                ? `How does the current ${fxBase}/NGN rate affect my ${t.budget} budget?`
                                : `What should I know about the ${fxBase}/NGN exchange rate when budgeting for travel?`,
                        )
                    }
                    delay={0.26}
                />
            </div>

            {/* Get started */}
            <SectionTitle>Get started</SectionTitle>
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Visa Check', icon: TbCircleCheck, tone: 'bg-[#122019] text-[#7ea6ff]', onClick: () => navigate('/evaluate') },
                    { label: 'Flight Intel', icon: TbPlane, tone: 'bg-[#1b1a10] text-[#e2c878]', locked: true },
                    { label: 'Creator Hub', icon: TbUsersGroup, tone: 'bg-[#16161a] text-[#c9c9d6]', locked: true },
                ].map((item, i) => (
                    <motion.button
                        key={item.label}
                        type="button"
                        onClick={item.locked ? () => soon(item.label) : item.onClick}
                        aria-disabled={item.locked || undefined}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        whileHover={{ y: -3 }}
                        className={`relative flex h-[118px] flex-col items-center justify-center gap-3 rounded-2xl border border-[#1f2922] ${item.tone} transition-colors hover:border-[#c9a84c]/40 ${
                            item.locked ? 'cursor-not-allowed' : ''
                        }`}
                    >
                        <item.icon className="h-8 w-8" />
                        <span className="text-sm font-medium text-[#f1ede2]">{item.label}</span>
                        {item.locked && (
                            <span className="absolute right-2.5 top-2.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#8a9389]">
                                <HiOutlineLockClosed className="h-3 w-3" /> Soon
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* The user's trip, from their answers */}
            <SectionTitle
                action={
                    snapshot.profileDone && (
                        <Link to="/evaluate/travel" className="flex items-center gap-1 text-xs font-medium text-[#d8b85a] hover:underline">
                            {snapshot.travelDone ? 'Update' : 'Continue'} <HiArrowRight className="h-3 w-3" />
                        </Link>
                    )
                }
            >
                Your trip
            </SectionTitle>
            {tripRows.length ? (
                <div className={`${card} p-4`}>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                        {tripRows.map(([k, v]) => (
                            <div key={k}>
                                <dt className="text-[11px] uppercase tracking-wider text-[#6f786e]">{k}</dt>
                                <dd className="mt-0.5 text-sm text-[#f1ede2]">{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <button
                        type="button"
                        onClick={() => onAsk(`Review my trip plan to ${t.destination || 'my destination'} and tell me what to do next.`)}
                        className="mt-4 text-xs font-medium text-[#d8b85a] hover:underline"
                    >
                        Ask Ama to review this trip →
                    </button>
                </div>
            ) : (
                <div className={`${card} flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center`}>
                    <p className="flex-1 text-sm text-[#b9beb4]">
                        {snapshot.profileDone
                            ? 'Answer the travel history questions so Ama can tailor advice to your trip.'
                            : 'Complete your visa assessment so Ama can tailor advice to you.'}
                    </p>
                    <Link
                        to={snapshot.profileDone ? '/evaluate/travel' : '/evaluate/profile'}
                        className="rounded-lg bg-[#c9a84c] px-4 py-2 text-xs font-semibold text-[#15130c] transition-colors hover:bg-[#d8b85a]"
                    >
                        {snapshot.profileDone ? 'Add travel history' : 'Start assessment'}
                    </Link>
                </div>
            )}

            {/* Sample news feed */}
            <SectionTitle
                sample
                action={
                    <button type="button" onClick={() => soon('The intelligence feed')} className="flex items-center gap-1 text-xs font-medium text-[#d8b85a]/70">
                        View all <HiArrowRight className="h-3 w-3" />
                    </button>
                }
            >
                Recent intelligence
            </SectionTitle>
            <ul className="space-y-3">
                {[
                    { icon: TbBolt, title: 'Germany Schengen approval rate up 12%', time: '2m ago', tag: 'Visa' },
                    { icon: TbPlane, title: 'BA LOS→LHR prices dropped £180', time: '14m ago', tag: 'Flights' },
                    { icon: TbShieldExclamation, title: 'New Nigeria travel advisory issued', time: '1h ago', tag: 'Advisory' },
                ].map((item, i) => (
                    <motion.li
                        key={item.title}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className={`${card} flex items-center gap-4 p-4`}
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c9a84c]/10 text-[#d8b85a]">
                            <item.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-sm text-[#f1ede2]">{item.title}</span>
                            <span className="mt-1 flex items-center gap-2 text-xs text-[#6f786e]">
                                {item.time}
                                <span className="rounded bg-[#c9a84c]/10 px-1.5 py-0.5 text-[#d8b85a]">{item.tag}</span>
                            </span>
                        </span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}
