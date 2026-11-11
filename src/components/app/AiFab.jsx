import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

/** Floating Tourain AI button shown on the app screens (bottom-right in the design). */
export default function AiFab() {
    return (
        <motion.button
            type="button"
            aria-label="Ask Tourain AI"
            onClick={() => toast('Tourain AI is coming soon.', { icon: '✨' })}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/40"
        >
            <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[#2563EB]"
                animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut' }}
            />
            <HiOutlineSparkles className="relative h-6 w-6" />
        </motion.button>
    );
}
