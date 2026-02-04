import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { sendSignInLinkToEmail } from 'firebase/auth';
import GoogleIcon from '../assets/Google.png';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            // Explicitly use signInWithPopup and ensure the provider is configured
            const result = await signInWithPopup(auth, googleProvider);
            console.log('User signed in:', result.user);
            toast.success('Successfully signed in with Google!');
            navigate('/'); // Redirect to home after success
        } catch (error) {
            console.error('Error signing in with Google:', error);
            // Handle common popup issues
            if (error.code === 'auth/popup-blocked') {
                toast.error('Sign-in popup was blocked by your browser. Please enable popups and try again.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                // Ignore if user closed the popup
            } else {
                toast.error('An error occurred during Google Sign-In. Please try again.');
            }
        }
    };

    const handleEmailContinue = async (e) => {
        e.preventDefault();

        const actionCodeSettings = {
            url: window.location.origin + '/', // Redirect back to home
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            toast.success(`Verification link sent to ${email}! Please check your inbox.`);
        } catch (error) {
            console.error('Error sending email link:', error);
            toast.error('Failed to send verification link. Please try again.');
        }
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
                    className="w-full max-w-[685px] h-[687px] bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden mt-20 md:mt-0"
                >
                    <div className="mt-4 px-10">
                        <h1 className="text-[48px] md:text-[70px] font-bold text-[#003B95] leading-tight text-center sm:text-left">
                            {isLogin ? 'You are welcome back' : 'Start your journey'}
                        </h1>
                        <div className='mt-20 flex items-center justify-center gap-3'>

                            <button
                                onClick={handleGoogleSignIn}
                                className="w-max flex items-center justify-center gap-3 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#0276FE] text-white rounded-[20px] font-semibold hover:bg-blue-600 transition-colors shadow-md whitespace-nowrap"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#55ACEE]">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
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
