import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png';

/** Top bar for signed-in screens: logo (to dashboard) and sign out. */
export default function AppHeader() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    return (
        <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <button type="button" onClick={() => navigate('/dashboard')} aria-label="Go to dashboard">
                    <img src={LOGO} alt="Tourain" className="h-[24px] w-[122px]" />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        signOut();
                        navigate('/', { replace: true });
                    }}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                    Sign out
                </button>
            </div>
        </motion.header>
    );
}
