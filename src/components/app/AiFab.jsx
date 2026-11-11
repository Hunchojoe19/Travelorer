import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

/** Floating Tourain AI button shown on the app screens (bottom-right in the design). */
export default function AiFab() {
    return (
        <button
            type="button"
            aria-label="Ask Tourain AI"
            onClick={() => toast('Tourain AI is coming soon.', { icon: '✨' })}
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
            <HiOutlineSparkles className="h-6 w-6" />
        </button>
    );
}
