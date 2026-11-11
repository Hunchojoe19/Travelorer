import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import GoogleIcon from '../assets/Google.png';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { authErrorMessage, useAuth } from '../auth/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, isSignedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordStep, setShowPasswordStep] = useState(false);
    const [isLogin, setIsLogin] = useState(Boolean(location.state?.login));
    const [submitting, setSubmitting] = useState(false);

    // Already signed in (e.g. came back to this page): go straight to the app.
    useEffect(() => {
        if (isSignedIn && !submitting) navigate('/dashboard', { replace: true });
    }, [isSignedIn, submitting, navigate]);

    const finishSignIn = () => navigate('/login-success', { replace: true });

    const showError = (error) => {
        const message = authErrorMessage(error);
        if (message) toast.error(message);
    };

    const handleGoogleSignIn = async () => {
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

    const handleEmailContinue = async (e) => {
        e.preventDefault();
        if (submitting) return;
        // Step 1: email only (matches the design), then ask for the password.
        if (!showPasswordStep) {
            if (!email.trim()) return;
            setShowPasswordStep(true);
            return;
        }
        if (!isLogin && password.length < 6) {
            toast.error('Use a password with at least 6 characters.');
            return;
        }
        setSubmitting(true);
        try {
            if (isLogin) await signInWithEmail(email, password);
            else await signUpWithEmail(email, password);
            finishSignIn();
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

    const toggleMode = () => {
        setIsLogin((v) => !v);
        setPassword('');
    };

    return (
        <div className="min-h-screen relative flex flex-col bg-gray-50 overflow-hidden">
            <Navbar logoOnly={true} />

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: "url('https://res.cloudinary.com/dc59hhvse/image/upload/v1769295772/Background_Image_tlbwuj.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6F0FF]/40 to-white/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-1 items-center justify-center md:justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Form Container - Animating the entire card from the left */}
                <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-[685px] min-h-[687px] bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden mt-20 md:mt-0"
                >
                    <div className="mt-4 px-10">
                        <h1 className="text-[48px] md:text-[70px] font-bold text-[#003B95] leading-tight text-center sm:text-left">
                            {isLogin ? 'You are welcome back' : 'Start your journey'}
                        </h1>
                        <div className='mt-20 flex items-center justify-center gap-3'>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={submitting}
                                className="disabled:opacity-60 w-max flex items-center justify-center gap-3 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
                                <span className="text-[#0276FE] font-medium">
                                    {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-12">
                            <span className="text-[#55ACEE] text-sm">or</span>
                        </div>

                        <form onSubmit={handleEmailContinue}>
                            <div className="flex flex-col sm:flex-row gap-1 mt-12">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    required
                                />
                                {!showPasswordStep && (
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-[#0276FE] text-white rounded-[20px] font-semibold hover:bg-blue-600 transition-colors shadow-md whitespace-nowrap"
                                    >
                                        Continue
                                    </button>
                                )}
                            </div>
                            {showPasswordStep && (
                                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                                    <div className="flex flex-col sm:flex-row gap-1">
                                        <input
                                            type="password"
                                            placeholder={isLogin ? 'Password' : 'Create a password (6+ characters)'}
                                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                            autoFocus
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="px-8 py-3 bg-[#0276FE] text-white rounded-[20px] font-semibold hover:bg-blue-600 transition-colors shadow-md whitespace-nowrap disabled:opacity-60"
                                        >
                                            {submitting ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
                                        </button>
                                    </div>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            onClick={handleForgotPassword}
                                            className="mt-2 text-xs text-[#0276FE] hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </form>

                        <p className="mt-8 text-center text-sm text-[#55ACEE]">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-[#0276FE] font-semibold hover:underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
