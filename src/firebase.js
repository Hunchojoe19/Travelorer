import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

/**
 * Firebase (project: travelorer-paddy, free Spark plan).
 * Only Authentication is used. Values come from .env (VITE_FIREBASE_*); the
 * defaults below are the same public web config, so deploys work even if the
 * host has no env vars set. Web config is not secret.
 */
const env = import.meta.env;
const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyCNrlMMcrQIbCOpokEMMxl5XsihcIWoX4U',
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'travelorer-paddy.firebaseapp.com',
    projectId: env.VITE_FIREBASE_PROJECT_ID || 'travelorer-paddy',
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'travelorer-paddy.firebasestorage.app',
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '387517938582',
    appId: env.VITE_FIREBASE_APP_ID || '1:387517938582:web:e5ecfc547c1c3769213bb7',
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-7HCYHLDR3E',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Analytics: production only, and only where the browser supports it.
if (import.meta.env.PROD && typeof window !== 'undefined') {
    import('firebase/analytics')
        .then(({ getAnalytics, isSupported }) => isSupported().then((ok) => ok && getAnalytics(app)))
        .catch(() => {});
}
