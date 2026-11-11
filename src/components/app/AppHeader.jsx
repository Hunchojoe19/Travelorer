import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineGlobeAlt, HiOutlineViewGrid } from 'react-icons/hi';
import { useAuth } from '../../auth/AuthContext';

const LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png';

/** Top bar for signed-in screens: logo / Website (landing page), Dashboard, and sign out. */
export default function AppHeader() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const { pathname } = useLocation();
    return (
        <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <button type="button" onClick={() => navigate('/')} aria-label="Go to the Tourain website" title="Tourain website">
                    <img src={LOGO} alt="Tourain" className="h-[24px] w-[122px]" />
                </button>
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 sm:px-4"
                        aria-label="Tourain website"
                    >
                        <HiOutlineGlobeAlt className="h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Website</span>
                    </button>
                    {pathname !== '/dashboard' && (
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-[#1E3F94] transition-colors hover:bg-[#1E3F94]/5 sm:px-4"
                            aria-label="Dashboard"
                        >
                            <HiOutlineViewGrid className="h-4 w-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </button>
                    )}
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
            </div>
        </motion.header>
    );
}
