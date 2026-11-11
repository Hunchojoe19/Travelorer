import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineRefresh } from 'react-icons/hi';
import { TbMicrophone, TbPlayerStopFilled, TbSend } from 'react-icons/tb';
import { splitOptions } from '../../lib/ai';
import useChat from '../ai/useChat';
import useSpeech from '../ai/useSpeech';
import Markdown from '../ai/Markdown';

function greetingFor(snapshot) {
    const t = snapshot.travel;
    if (t.destination) {
        const details = [t.purpose && t.purpose.toLowerCase(), t.lengthOfStay, t.budget && `budget ${t.budget}`].filter(Boolean).join(', ');
        const starters = [
            `What documents do I need?`,
            `How long does the visa take?`,
            t.budget ? 'Is my budget enough?' : 'How much should I budget?',
            t.lengthOfStay ? `Plan my ${t.lengthOfStay} itinerary` : 'Plan my itinerary',
        ];
        return `Hi ${snapshot.name}, I'm **Ama**, your travel co-pilot. I have your trip to **${t.destination}**${
            details ? ` (${details})` : ''
        } in view. Ask me anything: visa documents, timelines, budgeting, or what to expect when you land.\n[[options: ${starters.join(' | ')}]]`;
    }
    return `Hi ${snapshot.name}, I'm **Ama**, your travel co-pilot. Tell me where you're headed, or finish your [travel history](app:/evaluate/travel) so I can tailor everything to your trip.\n[[options: Which visa do I need? | Help me pick a destination | How do I avoid a refusal?]]`;
}

function AmaAvatar({ size = 'h-8 w-8' }) {
    return (
        <span className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d8c27a] to-[#5f7c4f] text-[#0b0f0c]`}>
            <HiOutlineSparkles className="h-4 w-4" />
        </span>
    );
}

function TypingDots() {
    return (
        <span className="inline-flex items-center gap-1 py-1" aria-label="Ama is typing">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
            <span className="ml-1.5 text-xs text-[#8a9389]">Thinking…</span>
        </span>
    );
}

/**
 * Ama chat column of the Discover page. The dashboard can push a question in
 * with ref.current.ask(text).
 */
const DiscoverChat = forwardRef(function DiscoverChat({ snapshot }, ref) {
    const greeting = useMemo(() => greetingFor(snapshot), [snapshot]);
    const { messages, send, retry, reset, busy, hasConversation } = useChat('discover', greeting);
    const [draft, setDraft] = useState('');
    const speech = useSpeech(setDraft);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    const submit = (text) => {
        if (!text.trim() || busy) return;
        send(text);
        setDraft('');
    };

    useImperativeHandle(ref, () => ({ ask: submit, focus: () => inputRef.current?.focus() }));

    useEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const last = messages[messages.length - 1];

    return (
        <section className="flex h-full min-h-0 flex-col" aria-label="Chat with Ama">
            <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[#1d2620] px-5">
                <AmaAvatar size="h-7 w-7" />
                <h2 className="font-serif text-lg font-semibold text-[#f1ede2]">Ama</h2>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-[#7fae7a]">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7fae7a] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7fae7a]" />
                    </span>
                    Live
                </span>
                {hasConversation && (
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-full p-2 text-[#8a9389] transition-colors hover:bg-white/5 hover:text-[#f1ede2]"
                        aria-label="Start a new chat"
                        title="New chat"
                    >
                        <HiOutlineRefresh className="h-4 w-4" />
                    </button>
                )}
            </header>

            <div ref={listRef} className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-6" aria-live="polite">
                {messages.map((message) => {
                    const mine = message.role === 'user';
                    const { body, options } = mine ? { body: message.text, options: [] } : splitOptions(message.text);
                    const showOptions = !busy && message.id === last?.id && options.length > 0;
                    return (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`flex gap-3 ${mine ? 'justify-end' : ''}`}
                        >
                            {!mine && <AmaAvatar />}
                            <div className={`flex min-w-0 max-w-[85%] flex-col ${mine ? 'items-end' : 'items-start'}`}>
                                <div
                                    className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                                        mine
                                            ? 'rounded-br-md bg-[#c9a84c] text-[#15130c]'
                                            : message.error
                                              ? 'rounded-tl-md border border-red-900/60 bg-red-950/40 text-red-200'
                                              : 'rounded-tl-md border border-[#222c25] bg-[#161d18] text-[#e9e6dc]'
                                    }`}
                                >
                                    {mine ? (
                                        <p className="whitespace-pre-wrap">{body}</p>
                                    ) : message.pending && !body ? (
                                        <TypingDots />
                                    ) : (
                                        <Markdown text={body} linkClass="font-medium text-[#d8b85a] underline decoration-[#d8b85a]/40 underline-offset-2 hover:decoration-[#d8b85a]" />
                                    )}
                                    {message.error && (
                                        <button type="button" onClick={() => retry(message)} className="mt-2 text-xs font-semibold underline">
                                            Try again
                                        </button>
                                    )}
                                </div>
                                {showOptions && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {options.map((option, i) => (
                                            <motion.button
                                                key={option}
                                                type="button"
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05 * i }}
                                                whileHover={{ y: -1 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => submit(option)}
                                                className="rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/5 px-3.5 py-1.5 text-xs font-medium text-[#e2c878] transition-colors hover:bg-[#c9a84c]/15"
                                            >
                                                {option}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit(draft);
                }}
                className="shrink-0 px-5 pb-5"
            >
                <div className="flex items-end gap-1 rounded-2xl border border-[#243026] bg-[#121813] py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-[#c9a84c]/50">
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
                        placeholder={speech.listening ? 'Listening…' : 'Ask your co-pilot anything…'}
                        aria-label="Message Ama"
                        className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-[15px] text-[#f1ede2] outline-none placeholder:text-[#6f786e]"
                    />
                    {speech.supported && (
                        <button
                            type="button"
                            onClick={speech.toggle}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                speech.listening ? 'bg-red-500/15 text-red-300' : 'text-[#8a9389] hover:bg-white/5 hover:text-[#f1ede2]'
                            }`}
                            aria-label={speech.listening ? 'Stop voice typing' : 'Voice typing'}
                        >
                            {speech.listening ? <TbPlayerStopFilled className="h-4 w-4" /> : <TbMicrophone className="h-5 w-5" />}
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={!draft.trim() || busy}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/10 disabled:text-[#4b544b] disabled:hover:bg-transparent"
                        aria-label="Send"
                    >
                        <TbSend className="h-5 w-5" />
                    </button>
                </div>
                <p className="mt-2 text-center text-[11px] text-[#5d665c]">Ama can make mistakes. Confirm visa rules on official government sites.</p>
            </form>
        </section>
    );
});

export default DiscoverChat;
