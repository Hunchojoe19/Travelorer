import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    HiOutlineArrowLeft,
    HiOutlineCash,
    HiOutlineChartBar,
    HiOutlineChatAlt2,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineLockClosed,
    HiOutlineMail,
} from 'react-icons/hi';
import { TbPlane } from 'react-icons/tb';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import GoogleIcon from '../assets/Google.png';
import { authErrorMessage, needsEmailVerification, useAuth } from '../auth/AuthContext';

const WHITE_LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401091/Tourain_logo_u9puuh.png';
const BLUE_LOGO = 'https://res.cloudinary.com/dc59hhvse/image/upload/v1768401090/Tourain_Logo_Blue_unuaup.png';

const FEATURES = [
    { icon: HiOutlineChatAlt2, title: 'Ask AI anything', text: 'Travel requirements and answers in seconds.' },
    { icon: HiOutlineChartBar, title: 'Predict your visa outcome', text: 'A score based on the facts of your case.' },
    { icon: HiOutlineCash, title: 'Earn as you travel', text: 'Share travel info and build referrals.' },
];

/** Left-hand brand panel with a gently animated flight path. */
function BrandPanel() {
    return (
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#003B95] via-[#0A4FC4] to-[#0276FE] p-12 text-white lg:flex lg:flex-col">
            {/* soft moving glows */}
            <motion.div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#38bdf8]/30 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#FBBF24]/20 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* dashed flight path with a plane travelling along it */}
            <svg aria-hidden="true" className="absolute inset-x-0 top-[16%] h-40 w-full" viewBox="0 0 600 160" fill="none" preserveAspectRatio="none">
                <motion.path
                    d="M-20 140 C 140 20, 320 160, 620 30"
                    stroke="white"
                    strokeOpacity="0.35"
                    strokeWidth="2"
                    strokeDasharray="6 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
            </svg>
            <motion.div
                aria-hidden="true"
                className="absolute top-[16%] text-white/90"
                initial={{ left: '-5%', y: 110, rotate: -25, opacity: 0 }}
                animate={{ left: ['-5%', '45%', '100%'], y: [110, 70, 10], rotate: [-25, 5, -20], opacity: [0, 1, 0] }}
                transition={{ duration: 9, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
            >
                <TbPlane className="h-8 w-8 rotate-45" />
            </motion.div>

            <Link to="/" className="relative z-10 inline-block w-fit" aria-label="Tourain home">
                <img src={WHITE_LOGO} alt="Tourain" className="h-[28px] w-[142px]" />
            </Link>

            <div className="relative z-10 mt-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-4xl font-bold leading-tight xl:text-5xl"
                >
                    Your AI visa assistant,
                    <br />
                    <span className="text-[#FBBF24]">from first question to approval.</span>
                </motion.h2>
                <ul className="mt-10 space-y-5">
                    {FEATURES.map(({ icon: Icon, title, text }, i) => (
                        <motion.li
                            key={title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 + i * 0.12, duration: 0.5 }}
                            className="flex items-start gap-4"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                                <Icon className="h-5 w-5" />
                            </span>
                            <span>
                                <span className="block font-semibold">{title}</span>
                                <span className="block text-sm text-white/75">{text}</span>
                            </span>
                        </motion.li>
                    ))}
                </ul>
                <p className="mt-12 text-xs text-white/60">© {new Date().getFullYear()} Tourain Inc</p>
            </div>
        </div>
    );
}

const inputWrap =
    'flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 px-4 transition-all focus-within:border-[#0276FE] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0276FE]/10';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, isSignedIn, user } = useAuth();

    const initialLogin = searchParams.get('mode') ? searchParams.get('mode') === 'login' : Boolean(location.state?.login);
    const [isLogin, setIsLogin] = useState(initialLogin);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Already signed in (e.g. came back to this page): go straight to the app.
    useEffect(() => {
        if (isSignedIn && !submitting) navigate(needsEmailVerification(user) ? '/verify-email' : '/dashboard', { replace: true });
    }, [isSignedIn, submitting, navigate, user]);

    const setMode = (login) => {
        setIsLogin(login);
        setPassword('');
        setSearchParams({ mode: login ? 'login' : 'signup' }, { replace: true });
    };

    const finishSignIn = () => navigate('/login-success', { replace: true });

    const showError = (error) => {
        const message = authErrorMessage(error);
        if (message) toast.error(message);
    };

    const handleGoogle = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            await signInWithGoogle();
            finishSignIn();
        } catch (error) {
            showError(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        if (!email.trim()) {
            toast.error('Enter your email address.');
            return;
        }
        if (!isLogin && password.length < 6) {
            toast.error('Use a password with at least 6 characters.');
            return;
        }
        setSubmitting(true);
        try {
            if (isLogin) {
                const signedIn = await signInWithEmail(email, password);
                if (needsEmailVerification(signedIn)) navigate('/verify-email', { replace: true });
                else finishSignIn();
            } else {
                await signUpWithEmail(email, password);
                navigate('/verify-email', { replace: true });
            }
        } catch (error) {
            showError(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            toast.error('Enter your email address first.');
            return;
        }
        try {
            await resetPassword(email);
        } catch (error) {
            if (error?.code === 'auth/invalid-email') {
                showError(error);
                return;
            }
            // Don't reveal whether an account exists for this email.
        }
        toast.success(`If an account exists for ${email.trim()}, a reset link is on its way.`);
    };

    return (
        <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_1fr]">
            <BrandPanel />

            <div className="relative flex flex-col overflow-hidden">
                {/* subtle background accents for the form side */}
                <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#0276FE]/10 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#38bdf8]/10 blur-3xl" />

                <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900">
                        <HiOutlineArrowLeft className="h-4 w-4" /> Back to home
                    </Link>
                    <img src={BLUE_LOGO} alt="Tourain" className="h-[22px] w-[112px] lg:hidden" />
                </header>

                <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="w-full max-w-[420px]"
                    >
                        {/* Sign in / Sign up switch */}
                        <div className="relative mb-8 grid grid-cols-2 rounded-full bg-gray-100 p-1 text-sm font-medium" role="tablist">
                            <motion.span
                                aria-hidden="true"
                                layout
                                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow"
                                style={{ left: isLogin ? 4 : 'calc(50%)' }}
                            />
                            {[
                                { login: true, label: 'Log in' },
                                { login: false, label: 'Sign up' },
                            ].map((tab) => (
                                <button
                                    key={tab.label}
                                    type="button"
                                    role="tab"
                                    aria-selected={isLogin === tab.login}
                                    onClick={() => setMode(tab.login)}
                                    className={`relative z-10 rounded-full py-2.5 transition-colors ${isLogin === tab.login ? 'text-[#003B95]' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'signup'}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h1 className="text-3xl font-bold text-[#003B95] sm:text-4xl">
                                    {isLogin ? 'Welcome back' : 'Start your journey'}
                                </h1>
                                <p className="mt-2 text-sm text-gray-500">
                                    {isLogin
                                        ? 'Log in to continue with your Tourain AI Visa Assistant.'
                                        : 'Create your free account in less than a minute.'}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <motion.button
                            type="button"
                            onClick={handleGoogle}
                            disabled={submitting}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-800 shadow-sm transition-shadow hover:shadow-md disabled:opacity-60"
                        >
                            <img src={GoogleIcon} alt="" className="h-5 w-5" />
                            {isLogin ? 'Continue with Google' : 'Sign up with Google'}
                        </motion.button>

                        <div className="my-6 flex items-center gap-4 text-xs text-gray-400">
                            <span className="h-px flex-1 bg-gray-200" />
                            or with email
                            <span className="h-px flex-1 bg-gray-200" />
                        </div>

                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className={inputWrap}>
                                    <HiOutlineMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                                        Password
                                    </label>
                                    {isLogin && (
                                        <button type="button" onClick={handleForgotPassword} className="text-xs font-medium text-[#0276FE] hover:underline">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className={inputWrap}>
                                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                                        placeholder={isLogin ? 'Your password' : 'At least 6 characters'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="text-gray-400 transition-colors hover:text-gray-700"
                                    >
                                        {showPassword ? <HiOutlineEyeOff className="h-5 w-5" /> : <HiOutlineEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={submitting}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#003B95] to-[#0276FE] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0276FE]/25 disabled:opacity-70"
                            >
                                {submitting ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-label="Please wait" />
                                ) : isLogin ? (
                                    'Log in'
                                ) : (
                                    'Create account'
                                )}
                            </motion.button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button type="button" onClick={() => setMode(!isLogin)} className="font-semibold text-[#0276FE] hover:underline">
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Signup;
