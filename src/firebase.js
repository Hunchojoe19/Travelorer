import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { CustomProvider, initializeAppCheck, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider } from 'firebase/app-check';

/**
 * Firebase (free Spark plan): Authentication, plus Firebase AI Logic (Gemini) for Tourain AI.
 *
 * All values come from environment variables: .env locally (never committed) and
 * the hosting provider's environment settings (Vercel) for deploys. Nothing is
 * hard-coded here, so no keys end up in the repository.
 * Both spellings are accepted, e.g. VITE_FIREBASE_API_KEY or VITE_FIREBASE_API_.
 */
const env = import.meta.env;
const read = (...names) => names.map((name) => env[name]).find((value) => value) || '';

const firebaseConfig = {
    apiKey: read('VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_API_'),
    authDomain: read('VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTH_DOMAIN_'),
    projectId: read('VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECT_ID_'),
    storageBucket: read('VITE_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGE_BUCKET_'),
    messagingSenderId: read('VITE_FIREBASE_MESSAGING_SENDER_ID', 'VITE_FIREBASE_MESSAGING_SENDER_ID_'),
    appId: read('VITE_FIREBASE_APP_ID', 'VITE_FIREBASE_APP_ID_'),
    measurementId: read('VITE_FIREBASE_MEASUREMENT_ID', 'VITE_FIREBASE_MEASUREMENT_ID_'),
};

const missing = ['apiKey', 'authDomain', 'projectId', 'appId'].filter((key) => !firebaseConfig[key]);
if (missing.length) {
    // Shows up in the browser console (and the Vercel build logs) instead of a vague Firebase error.
    console.error(
        `[Tourain] Firebase is not configured: missing ${missing.join(', ')}. ` +
            'Add the VITE_FIREBASE_* values to .env locally, or to Project Settings > Environment Variables on Vercel.',
    );
}

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
    const enterpriseKey = read('VITE_RECAPTCHA_ENTERPRISE_SITE_KEY', 'VITE_RECAPTCHA_ENTERPRISE_SITE_');
    const siteKey = enterpriseKey || read('VITE_RECAPTCHA_SITE_KEY', 'VITE_RECAPTCHA_SITE_');
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
        .catch(() => { });
}
