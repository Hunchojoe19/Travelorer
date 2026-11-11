import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiX, HiOutlineRefresh, HiOutlineArrowsExpand } from 'react-icons/hi';
import { TbMicrophone, TbPlayerStopFilled, TbSend } from 'react-icons/tb';
import { useAuth } from '../../auth/AuthContext';
import { getTravellerSnapshot, splitOptions } from '../../lib/ai';
import useChat from '../ai/useChat';
import useSpeech from '../ai/useSpeech';
import Markdown from '../ai/Markdown';

function greetingFor(snapshot) {
    const starters = [];
    if (!snapshot.profileDone || !snapshot.travelDone) starters.push('Finish my assessment');
    starters.push('Check my visa readiness', 'Help me plan my trip', 'Something else');
    const trip = snapshot.travel.destination ? ` I see you're planning a trip to **${snapshot.travel.destination}**.` : '';
    return `Hi ${snapshot.name}! 👋 I'm Tourain AI.${trip} What can I help you with today?\n[[options: ${starters.slice(0, 4).join(' | ')}]]`;
}

function TypingDots() {
    return (
        <span className="inline-flex items-center gap-1 py-1" aria-label="Tourain AI is typing">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-gray-400"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
            <span className="ml-1.5 text-xs text-gray-400">Thinking…</span>
        </span>
    );
}

/** The chat panel of the floating Tourain AI assistant. */
function AssistantPanel({ onClose }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const greeting = useMemo(() => greetingFor(getTravellerSnapshot(user)), [user]);
    const { messages, send, retry, reset, busy, hasConversation } = useChat('assistant', greeting);
    const [draft, setDraft] = useState('');
    const speech = useSpeech(setDraft);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages]);

    const submit = (text) => {
        if (!text.trim() || busy) return;
        send(text);
        setDraft('');
    };

    const last = messages[messages.length - 1];

    return (
        <motion.div
            role="dialog"
            aria-label="Tourain AI assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            className="fixed inset-x-3 bottom-3 z-50 flex h-[78vh] max-h-[640px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:w-[390px]"
        >
            <header className="flex items-center gap-3 bg-gradient-to-r from-[#1E3F94] to-[#2F6FED] px-4 py-3 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    <HiOutlineSparkles className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">Tourain AI</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Your travel assistant
                    </span>
                </span>
                {hasConversation && (
                    <button type="button" onClick={reset} className="rounded-full p-2 hover:bg-white/15" aria-label="Start a new chat" title="New chat">
                        <HiOutlineRefresh className="h-4 w-4" />
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => {
                        onClose();
                        navigate('/discover');
                    }}
                    className="rounded-full p-2 hover:bg-white/15"
                    aria-label="Open Discover"
                    title="Open Discover"
                >
                    <HiOutlineArrowsExpand className="h-4 w-4" />
                </button>
                <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-white/15" aria-label="Close assistant">
                    <HiX className="h-4 w-4" />
                </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-gray-50/60 px-4 py-4 text-sm" aria-live="polite">
                {messages.map((message) => {
                    const mine = message.role === 'user';
                    const { body, options } = mine ? { body: message.text, options: [] } : splitOptions(message.text);
                    const showOptions = !busy && message.id === last?.id && options.length > 0;
                    return (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}
                        >
                            <div
                                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                                    mine
                                        ? 'rounded-br-md bg-[#2F6FED] text-white'
                                        : message.error
                                          ? 'rounded-bl-md bg-red-50 text-red-700 ring-1 ring-red-100'
                                          : 'rounded-bl-md bg-white text-gray-800 shadow-sm ring-1 ring-gray-100'
                                }`}
                            >
                                {mine ? (
                                    <p className="whitespace-pre-wrap">{body}</p>
                                ) : message.pending && !body ? (
                                    <TypingDots />
                                ) : (
                                    <Markdown text={body} linkClass="font-medium text-[#2F6FED] underline underline-offset-2" onNavigate={onClose} />
                                )}
                                {message.error && (
                                    <button type="button" onClick={() => retry(message)} className="mt-2 text-xs font-semibold underline">
                                        Try again
                                    </button>
                                )}
                            </div>
                            {showOptions && (
                                <div className="mt-2 flex max-w-[95%] flex-wrap gap-2">
                                    {options.map((option) => (
                                        <motion.button
                                            key={option}
                                            type="button"
                                            whileHover={{ y: -1 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => submit(option)}
                                            className="rounded-full border border-[#2F6FED]/30 bg-white px-3 py-1.5 text-xs font-medium text-[#1E3F94] transition-colors hover:bg-[#2F6FED]/5"
                                        >
                                            {option}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit(draft);
                }}
                className="flex items-end gap-2 border-t border-gray-100 bg-white p-3"
            >
                <textarea
                    ref={inputRef}
                    rows={1}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            submit(draft);
                        }
                    }}
                    placeholder={speech.listening ? 'Listening…' : 'Ask Tourain AI…'}
                    aria-label="Message Tourain AI"
                    className="max-h-28 min-h-[40px] flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/15"
                />
                {speech.supported && (
                    <button
                        type="button"
                        onClick={speech.toggle}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${speech.listening ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
                        aria-label={speech.listening ? 'Stop voice typing' : 'Voice typing'}
                    >
                        {speech.listening ? <TbPlayerStopFilled className="h-4 w-4" /> : <TbMicrophone className="h-5 w-5" />}
                    </button>
                )}
                <button
                    type="submit"
                    disabled={!draft.trim() || busy}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2F6FED] text-white transition-colors hover:bg-[#245ad0] disabled:opacity-40"
                    aria-label="Send"
                >
                    <TbSend className="h-5 w-5" />
                </button>
            </form>
        </motion.div>
    );
}

/** Floating Tourain AI button (bottom-right) that opens the assistant. */
export default function AiFab() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AnimatePresence>{open && <AssistantPanel onClose={() => setOpen(false)} />}</AnimatePresence>
            <motion.button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close Tourain AI' : 'Open Tourain AI'}
                aria-expanded={open}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className={`fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3F94] text-white shadow-lg shadow-[#2563EB]/30 ${
                    open ? 'hidden sm:flex' : 'flex'
                }`}
            >
                {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#2563EB]/30 [animation-duration:2.5s]" aria-hidden="true" />}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={open ? 'x' : 'spark'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        {open ? <HiX className="h-6 w-6" /> : <HiOutlineSparkles className="h-6 w-6" />}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </>
    );
}
