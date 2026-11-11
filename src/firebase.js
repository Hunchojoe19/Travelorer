import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { CustomProvider, initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } from 'firebase/app-check';

/**
 * Firebase (project: travelorer-paddy, free Spark plan).
 * Uses Authentication, plus Firebase AI Logic (Gemini) for Tourain AI. Values come from .env (VITE_FIREBASE_*); the
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

/**
 * App Check proves requests come from this site; Firebase AI Logic rejects
 * requests without it. Production uses reCAPTCHA Enterprise
 * (VITE_RECAPTCHA_ENTERPRISE_SITE_KEY) or, alternatively, reCAPTCHA v3 (VITE_RECAPTCHA_SITE_KEY).
 * Firebase checks the tokens itself, so no server code is needed.
 * On localhost, a debug token is used instead: set VITE_APPCHECK_DEBUG_TOKEN to
 * the token registered in Firebase console > App Check > Manage debug tokens
 * (or leave it empty and copy the one printed in the browser console).
 */
export let appCheck = null;
export const appCheckReady = (() => {
    if (typeof window === 'undefined') return false;
    const enterpriseKey = env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY;
    const siteKey = enterpriseKey || env.VITE_RECAPTCHA_SITE_KEY;
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocal) {
        // eslint-disable-next-line no-restricted-globals
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = env.VITE_APPCHECK_DEBUG_TOKEN || true;
    }
    if (!siteKey && !isLocal) return false;
    try {
        // On localhost the debug token is used instead of the provider, so without a
        // site key a placeholder provider avoids loading reCAPTCHA for nothing.
        let provider;
        if (enterpriseKey) provider = new ReCaptchaEnterpriseProvider(enterpriseKey);
        else if (siteKey) provider = new ReCaptchaV3Provider(siteKey);
        else provider = new CustomProvider({ getToken: () => Promise.reject(new Error('App Check debug token only')) });
        appCheck = initializeAppCheck(app, {
            provider,
            isTokenAutoRefreshEnabled: true,
        });
        return true;
    } catch {
        return false;
    }
})();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Analytics: production only, and only where the browser supports it.
if (import.meta.env.PROD && typeof window !== 'undefined') {
    import('firebase/analytics')
        .then(({ getAnalytics, isSupported }) => isSupported().then((ok) => ok && getAnalytics(app)))
        .catch(() => {});
}
