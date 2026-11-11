import React from 'react';
import { motion } from 'framer-motion';
import { HiBadgeCheck } from 'react-icons/hi';
import { TbUserCheck } from 'react-icons/tb';
import Confetti from '../app/Confetti';

/** "Your Travel History has been completed!" */
export default function TravelComplete({ onNext }) {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto flex max-w-md flex-col items-center text-center"
            aria-labelledby="travel-complete-title"
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                className="relative flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-[#2F6FED]"
            >
                <Confetti count={32} spread={240} />
                <TbUserCheck className="h-16 w-16 text-[#2F6FED]" strokeWidth={1.6} />
                <motion.span
                    className="absolute right-1 top-1"
                    initial={{ scale: 0, rotate: -120 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.45, type: 'spring', stiffness: 300, damping: 12 }}
                    aria-hidden="true"
                >
                    <HiBadgeCheck className="h-9 w-9 text-[#4CD964]" />
                </motion.span>
            </motion.div>
            <h1 id="travel-complete-title" className="mt-8 text-2xl font-semibold text-black">
                Your Travel History has been completed!
            </h1>
            <p className="mt-2 text-sm text-gray-500">Now let&apos;s move onto the trip details</p>
            <motion.button
                type="button"
                onClick={onNext}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-10 rounded-lg bg-[#2F6FED] px-14 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#245ad0]"
            >
                Next
            </motion.button>
        </motion.section>
    );
}
