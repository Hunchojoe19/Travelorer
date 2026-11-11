import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COLORS = ['#0276FE', '#4CD964', '#FBBF24', '#F27A2B', '#38bdf8', '#003B95'];

/** A one-off burst of confetti from the centre of its (relative) parent. */
export default function Confetti({ count = 28, spread = 220 }) {
    const reduce = useReducedMotion();
    const pieces = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => {
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
                const distance = spread * (0.55 + Math.random() * 0.45);
                return {
                    id: i,
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance * 0.7 + 60,
                    rotate: Math.random() * 540 - 270,
                    color: COLORS[i % COLORS.length],
                    size: 6 + Math.random() * 6,
                    round: Math.random() > 0.5,
                    delay: Math.random() * 0.15,
                };
            }),
        [count, spread],
    );
    if (reduce) return null;
    return (
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
            {pieces.map((p) => (
                <motion.span
                    key={p.id}
                    className="absolute block"
                    style={{
                        width: p.size,
                        height: p.round ? p.size : p.size * 0.45,
                        background: p.color,
                        borderRadius: p.round ? '9999px' : '2px',
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 1 }}
                    transition={{ duration: 1.4, delay: 0.25 + p.delay, ease: [0.16, 1, 0.3, 1] }}
                />
            ))}
        </div>
    );
}
