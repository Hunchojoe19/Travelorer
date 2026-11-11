import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import Waitlist from './pages/Waitlist';
import LoginSuccess from './pages/LoginSuccess';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import EvaluateIntro from './pages/EvaluateIntro';
import ProfileWizard from './pages/ProfileWizard';
import RequireAuth from './auth/RequireAuth';
import { AuthProvider } from './auth/AuthContext';
import { Toaster } from 'react-hot-toast';
import { MotionConfig } from 'framer-motion';

function App() {
    return (
        <MotionConfig reducedMotion="user">
        <AuthProvider>
            <Router>
                <Toaster />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/waitlist" element={<Waitlist />} />

                    {/* Email/password sign-ups confirm their email here */}
                    <Route path="/verify-email" element={<VerifyEmail />} />

                    {/* Signed-in flow */}
                    <Route path="/login-success" element={<RequireAuth><LoginSuccess /></RequireAuth>} />
                    <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                    <Route path="/evaluate" element={<RequireAuth><EvaluateIntro /></RequireAuth>} />
                    <Route path="/evaluate/profile" element={<RequireAuth><ProfileWizard /></RequireAuth>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
        </MotionConfig>
    );
}

export default App;
