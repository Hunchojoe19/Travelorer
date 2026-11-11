/**
 * "Welcome to Tourain" email, sent once per new account.
 *
 * Firebase's free plan can't send custom emails, so this uses EmailJS
 * (https://www.emailjs.com, free tier) straight from the browser. Set these in .env:
 *   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 * The template receives {{to_email}}, {{to_name}} and {{app_url}}.
 * If they aren't set, nothing is sent and the app carries on normally.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isWelcomeEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const sentKey = (uid) => `tourain.welcomeSent.${uid}`;

function alreadySent(uid) {
    try {
        return localStorage.getItem(sentKey(uid)) === '1';
    } catch {
        return false;
    }
}

function markSent(uid) {
    try {
        localStorage.setItem(sentKey(uid), '1');
    } catch {
        /* ignore */
    }
}

/** Fire-and-forget: never throws, never blocks sign-in. */
export async function sendWelcomeEmail(user) {
    if (!user?.email || !user?.id) return false;
    if (!isWelcomeEmailConfigured) {
        if (import.meta.env.DEV) console.info('[welcome email] EmailJS not configured; skipping.');
        return false;
    }
    if (alreadySent(user.id)) return false;
    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                template_params: {
                    to_email: user.email,
                    to_name: (user.name || user.email.split('@')[0]).split(' ')[0],
                    app_url: window.location.origin,
                },
            }),
        });
        if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
        markSent(user.id);
        return true;
    } catch (err) {
        console.warn('[welcome email] failed to send', err);
        return false;
    }
}
