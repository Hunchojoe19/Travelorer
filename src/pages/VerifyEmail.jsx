import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authErrorMessage, needsEmailVerification, useAuth } from '../auth/AuthContext';

const BACKGROUND = "https://res.cloudinary.com/dc59hhvse/image/upload/v1769295772/Background_Image_tlbwuj.png";
const LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png';
const RESEND_COOLDOWN = 60;
const CHECK_EVERY_MS = 5000;

/**
 * Shown after email/password sign-up (and to anyone who signs in before
 * confirming). Firebase emails a verification link; this page checks for it
 * automatically and moves on as soon as the email is confirmed.
 */
export default function VerifyEmail() {
    const navigate = useNavigate();
    const { user, initializing, isSignedIn, refreshUser, resendVerificationEmail, signOut } = useAuth();
    const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
    const [checking, setChecking] = useState(false);
    const done = useRef(false);

    const check = useCallback(
        async ({ manual = false } = {}) => {
            if (done.current) return;
            if (manual) setChecking(true);
            try {
                const fresh = await refreshUser();
                if (fresh?.emailVerified) {
                    done.current = true;
                    toast.success('Email verified!');
                    navigate('/login-success', { replace: true });
                } else if (manual) {
                    toast('Not verified yet. Open the link in the email we sent you.', { icon: '📬' });
                }
            } catch (error) {
                if (manual) toast.error(authErrorMessage(error) || 'Could not check right now.');
            } finally {
                if (manual) setChecking(false);
            }
        },
        [refreshUser, navigate],
    );

    // Check automatically while the page is open, and when the user comes back to this tab.
    useEffect(() => {
        const id = setInterval(() => {
            if (document.visibilityState === 'visible') check();
        }, CHECK_EVERY_MS);
        const onFocus = () => check();
        window.addEventListener('focus', onFocus);
        return () => {
            clearInterval(id);
            window.removeEventListener('focus', onFocus);
        };
    }, [check]);

    useEffect(() => {
        if (cooldown <= 0) return undefined;
        const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    const resend = async () => {
        if (cooldown > 0) return;
        try {
            await resendVerificationEmail();
            toast.success('A new verification email is on its way.');
            setCooldown(RESEND_COOLDOWN);
        } catch (error) {
            toast.error(authErrorMessage(error) || 'Could not resend right now.');
        }
    };

    const useDifferentEmail = async () => {
        await signOut();
        navigate('/signup?mode=signup', { replace: true });
    };

    if (initializing) return null;
    if (!isSignedIn) return <Navigate to="/signup?mode=login" replace />;
    if (!needsEmailVerification(user)) return <Navigate to="/dashboard" replace />;

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#EAF4FF]">
            <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('${BACKGROUND}')` }} aria-hidden="true" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#E6F0FF]/60 to-white/30" aria-hidden="true" />

            <header className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-12">
                <img src={LOGO} alt="Tourain" className="h-[28px] w-[142px]" />
            </header>

            <main className="relative z-10 flex flex-1 items-start justify-center px-4 pb-16 pt-8">
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex w-full max-w-[560px] flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-xl sm:px-12"
                    aria-labelledby="verify-title"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#0276FE]/10 text-[#0276FE]"
                        aria-hidden="true"
                    >
                        <motion.span animate={{ y: [0, -5, 0], rotate: [0, -6, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
                            <HiOutlineMail className="h-10 w-10" />
                        </motion.span>
                        <motion.span
                            className="absolute inset-0 rounded-full border-2 border-[#0276FE]/30"
                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        />
                    </motion.div>

                    <h1 id="verify-title" className="mt-8 text-2xl font-bold text-[#003B95]">
                        Verify your email
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        We sent a verification link to
                        <br />
                        <span className="font-semibold text-gray-900">{user.email}</span>
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                        Open the email and tap <span className="font-medium text-gray-700">the verification link</span> to
                        confirm it&apos;s you. This page continues automatically once you have.
                    </p>

                    <div className="mt-6 flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-xs text-gray-500" aria-live="polite">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#0276FE] border-t-transparent" aria-hidden="true" />
                        Waiting for verification…
                    </div>

                    <motion.button
                        type="button"
                        onClick={() => check({ manual: true })}
                        disabled={checking}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-8 w-full max-w-xs rounded-xl bg-gradient-to-r from-[#003B95] to-[#0276FE] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0276FE]/25 disabled:opacity-70"
                    >
                        {checking ? 'Checking…' : "I've verified my email"}
                    </motion.button>

                    <p className="mt-6 text-sm text-gray-500">
                        Didn&apos;t get it? Check your spam folder or{' '}
                        <button
                            type="button"
                            onClick={resend}
                            disabled={cooldown > 0}
                            className="font-semibold text-[#0276FE] hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline"
                        >
                            {cooldown > 0 ? `resend in ${cooldown}s` : 'resend the email'}
                        </button>
                    </p>
                    <button type="button" onClick={useDifferentEmail} className="mt-3 text-xs text-gray-400 hover:text-gray-600">
                        Wrong email? Sign up with a different one
                    </button>
                </motion.section>
            </main>
        </div>
    );
}
