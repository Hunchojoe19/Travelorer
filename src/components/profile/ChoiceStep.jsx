import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * One question with tile answers (marital status, employment, profession).
 * Picking a tile highlights it, then moves on to the next step.
 */
export default function ChoiceStep({ title, subtitle = 'Documents required vary based on your persona', options, value, onSelect }) {
    const [picked, setPicked] = useState(value || null);

    const choose = (optionValue) => {
        setPicked(optionValue);
        // Let the user see the highlighted tile before moving on.
        setTimeout(() => onSelect(optionValue), 280);
    };

    return (
        <section className="mx-auto max-w-2xl text-center" aria-labelledby="choice-title">
            <h1 id="choice-title" className="text-2xl font-semibold text-black">
                {title}
            </h1>
            <p className="mt-2 text-xs text-gray-400">{subtitle}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-5" role="radiogroup" aria-labelledby="choice-title">
                {options.map((option, index) => {
                    const selected = picked === option.value;
                    const Icon = option.icon;
                    return (
                        <motion.button
                            key={option.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => choose(option.value)}
                            initial={{ opacity: 0, y: 16, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: selected ? 1.05 : 1 }}
                            transition={{ delay: 0.06 * index, type: 'spring', stiffness: 260, damping: 20 }}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex h-[104px] w-[136px] flex-col items-center justify-center gap-3 rounded-md border px-2 text-center shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED] focus-visible:ring-offset-2 ${
                                selected
                                    ? 'border-[#2F6FED] bg-[#2F6FED] text-white'
                                    : 'border-gray-200 bg-white text-black hover:border-[#2F6FED]/60'
                            }`}
                        >
                            <motion.span
                                animate={selected ? { scale: [1, 1.25, 1], rotate: [0, -8, 0] } : { scale: 1 }}
                                transition={{ duration: 0.35 }}
                            >
                                <Icon className={`h-9 w-9 ${selected ? 'text-white' : 'text-[#2F6FED]'}`} strokeWidth={1.6} />
                            </motion.span>
                            <span className="leading-tight">
                                <span className="block text-[11px] font-medium">{option.label}</span>
                                {option.hint && (
                                    <span className={`block text-[8px] ${selected ? 'text-white/80' : 'text-gray-500'}`}>{option.hint}</span>
                                )}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}
