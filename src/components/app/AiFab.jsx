import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLockClosed, HiOutlineSparkles } from 'react-icons/hi';

/**
 * Floating Tourain AI button (bottom-right in the design). Tourain AI isn't live
 * yet, so the button is shown as unavailable and explains that on hover/focus.
 */
export default function AiFab() {
    const [showHint, setShowHint] = useState(false);
    return (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        id="ai-fab-hint"
                        role="tooltip"
                        initial={{ opacity: 0, x: 10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="max-w-[220px] rounded-xl bg-gray-900 px-4 py-3 text-left text-xs text-white shadow-xl"
                    >
                        <span className="mb-0.5 flex items-center gap-1.5 font-semibold">
                            <HiOutlineSparkles className="h-3.5 w-3.5 text-[#FBBF24]" /> Tourain AI
                        </span>
                        Your personal visa assistant is coming soon.
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                type="button"
                aria-disabled="true"
                aria-label="Tourain AI, coming soon"
                aria-describedby={showHint ? 'ai-fab-hint' : undefined}
                onClick={(e) => {
                    e.preventDefault();
                    setShowHint(true);
                }}
                onMouseEnter={() => setShowHint(true)}
                onMouseLeave={() => setShowHint(false)}
                onFocus={() => setShowHint(true)}
                onBlur={() => setShowHint(false)}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
                className="relative flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full bg-[#2563EB]/70 text-white shadow-lg shadow-[#2563EB]/25"
            >
                <HiOutlineSparkles className="h-6 w-6 opacity-80" />
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#2563EB] shadow" aria-hidden="true">
                    <HiOutlineLockClosed className="h-3 w-3" />
                </span>
            </motion.button>
        </div>
    );
}
