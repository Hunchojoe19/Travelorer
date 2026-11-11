import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    sendEmailVerification,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { sendWelcomeEmail } from '../lib/welcomeEmail';

/** Login session backed by Firebase Authentication (Google + email/password). */
const AuthContext = createContext(null);

function toUser(firebaseUser) {
    if (!firebaseUser) return null;
    return {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        emailVerified: Boolean(firebaseUser.emailVerified),
        providers: (firebaseUser.providerData || []).map((p) => p.providerId),
    };
}

/** Email/password accounts must confirm their email before using the app. */
export function needsEmailVerification(user) {
    if (!user) return false;
    const usesPassword = user.providers.includes('password');
    const hasGoogle = user.providers.includes('google.com');
    return usesPassword && !hasGoogle && !user.emailVerified;
}

const verificationSettings = () => ({ url: `${window.location.origin}/verify-email` });

/** Friendly messages for the Firebase errors users actually hit. */
export function authErrorMessage(error) {
    switch (error?.code) {
        case 'auth/invalid-email':
            return 'That email address doesn’t look right.';
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'Incorrect email or password.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists. Sign in instead.';
        case 'auth/weak-password':
            return 'Use a password with at least 6 characters.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please wait a moment and try again.';
        case 'auth/network-request-failed':
            return 'Network error. Check your connection and try again.';
        case 'auth/popup-blocked':
            return 'Your browser blocked the sign-in popup. Allow popups for this site and try again.';
        case 'auth/popup-closed-by-user':
        case 'auth/cancelled-popup-request':
            return null; // user closed it: no error needed
        case 'auth/operation-not-allowed':
            return 'This sign-in method is not enabled yet.';
        case 'auth/unauthorized-continue-uri':
        case 'auth/unauthorized-domain':
            return 'This website is not authorised for sign-in yet.';
        default:
            return 'Something went wrong. Please try again.';
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => toUser(auth.currentUser));
    // True until Firebase has restored any saved session on page load.
    const [initializing, setInitializing] = useState(true);

    useEffect(
        () =>
            onAuthStateChanged(auth, (firebaseUser) => {
                setUser(toUser(firebaseUser));
                setInitializing(false);
            }),
        [],
    );

    const signInWithGoogle = useCallback(async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const signedIn = toUser(result.user);
        // First time with Google = new Tourain account: send the welcome email.
        if (getAdditionalUserInfo(result)?.isNewUser) void sendWelcomeEmail(signedIn);
        return signedIn;
    }, []);

    const signInWithEmail = useCallback(async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email.trim(), password);
        return toUser(result.user);
    }, []);

    const signUpWithEmail = useCallback(async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // Firebase emails a verification link (free on the Spark plan).
        await sendEmailVerification(result.user, verificationSettings());
        return toUser(result.user);
    }, []);

    const resendVerificationEmail = useCallback(async () => {
        if (!auth.currentUser) throw new Error('Not signed in');
        await sendEmailVerification(auth.currentUser, verificationSettings());
    }, []);

    /** Re-reads the account from Firebase (e.g. after the user clicks the email link). */
    const refreshUser = useCallback(async () => {
        if (!auth.currentUser) return null;
        await auth.currentUser.reload();
        const fresh = toUser(auth.currentUser);
        setUser(fresh);
        // Email/password users get their welcome email once they've verified.
        if (fresh?.emailVerified && fresh.providers.includes('password')) void sendWelcomeEmail(fresh);
        return fresh;
    }, []);

    const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email.trim()), []);

    const signOut = useCallback(() => firebaseSignOut(auth), []);

    const value = useMemo(
        () => ({
            user,
            initializing,
            isSignedIn: !!user,
            signInWithGoogle,
            signInWithEmail,
            signUpWithEmail,
            resendVerificationEmail,
            refreshUser,
            resetPassword,
            signOut,
        }),
        [user, initializing, signInWithGoogle, signInWithEmail, signUpWithEmail, resendVerificationEmail, refreshUser, resetPassword, signOut],
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
