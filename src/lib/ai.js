import { getAI, getGenerativeModel, GoogleAIBackend, ThinkingLevel } from 'firebase/ai';
import countryList from 'react-select-country-list';
import { getToken as getAppCheckToken } from 'firebase/app-check';
import { app, appCheck } from '../firebase';
import { displayName, loadProfile, loadTravel } from './profileStore';
import { EMPLOYMENT_OPTIONS, GENDER_LABELS, MARITAL_OPTIONS, PROFESSION_OPTIONS } from '../components/profile/options';
import {
    FUNDING_OPTIONS,
    PURPOSE_OPTIONS,
    RESERVATION_OPTIONS,
    STAY_UNITS,
    VISA_TYPE_OPTIONS,
    YES_NO,
} from '../components/travel/options';

/**
 * Tourain AI runs on Gemini through Firebase AI Logic (Gemini Developer API,
 * free on the Spark plan). No API key lives in this code: Firebase handles it,
 * and App Check (see firebase.js) makes sure only this site can call it.
 */
// gemini-3.5-flash-lite starts answering in ~1s on this project; gemini-3.8-flash hung (Nov 2026).
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite';

let model;
function getModel() {
    if (!model) {
        const ai = getAI(app, { backend: new GoogleAIBackend() });
        // The SDK's own limit (App Check + waiting for the first words); ours below is shorter.
        model = getGenerativeModel(ai, { model: MODEL }, { timeout: 90000 });
    }
    return model;
}

/* ------------------------------------------------------------------ */
/* What the AI knows about the user (only what helps with travel advice) */
/* ------------------------------------------------------------------ */

const countries = countryList();
export const countryName = (code) => (code ? countries.getLabel(code) || code : '');
const label = (options, value) => options.find((o) => o.value === value)?.label;

function ageFrom(dateOfBirth) {
    if (!dateOfBirth) return null;
    const dob = new Date(dateOfBirth);
    if (Number.isNaN(dob.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) age -= 1;
    return age;
}

export function formatMoney(budget) {
    if (!budget?.amount) return '';
    try {
        return new Intl.NumberFormat('en', { style: 'currency', currency: budget.currency || 'NGN', maximumFractionDigits: 0 }).format(budget.amount);
    } catch {
        return `${budget.currency || ''} ${budget.amount}`;
    }
}

/** Plain summary of the user's saved answers, used by the AI and the Discover dashboard. */
export function getTravellerSnapshot(user) {
    const profile = loadProfile(user?.id);
    const travel = loadTravel(user?.id);
    const stay = travel.stay ? `${travel.stay.amount} ${label(STAY_UNITS, travel.stay.unit)?.toLowerCase() || ''}`.trim() : '';
    return {
        name: displayName(user, profile),
        profileDone: Boolean(profile.completedAt),
        travelDone: Boolean(travel.completedAt),
        travelStarted: Object.keys(travel).length > 0,
        profile: {
            age: ageFrom(profile.dateOfBirth),
            gender: GENDER_LABELS[profile.gender],
            countryOfResidence: countryName(profile.country),
            maritalStatus: label(MARITAL_OPTIONS, profile.maritalStatus),
            employment: label(EMPLOYMENT_OPTIONS, profile.employmentStatus),
            profession: label(PROFESSION_OPTIONS, profile.profession),
        },
        travel: {
            passport: countryName(travel.passport),
            destination: countryName(travel.destination),
            destinationCode: travel.destination || '',
            purpose: label(PURPOSE_OPTIONS, travel.purpose),
            visaType: label(VISA_TYPE_OPTIONS, travel.visaType),
            fundedBy: label(FUNDING_OPTIONS, travel.funding),
            hadVisaForDestination: label(YES_NO, travel.previousVisa),
            formalInvitation: label(YES_NO, travel.invitation),
            lengthOfStay: stay,
            visaCountriesLast5Years: Array.isArray(travel.visited) ? (travel.visited.length ? travel.visited.map(countryName) : ['None']) : undefined,
            budget: formatMoney(travel.budget),
            budgetCurrency: travel.budget?.currency || '',
            flightOrHotelBooked: label(RESERVATION_OPTIONS, travel.reservation),
            refusedBefore: label(YES_NO, travel.refusal?.answer),
            refusedBy: travel.refusal?.countries?.map(countryName),
            refusalReason: travel.refusal?.reason,
            timeSensitive: label(YES_NO, travel.timeSensitive),
        },
    };
}

const compact = (obj) =>
    Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length)),
    );

function contextBlock(snapshot) {
    const lines = [
        `First name: ${snapshot.name}`,
        `Today's date: ${new Date().toDateString()}`,
        `Assessment progress: personal profile ${snapshot.profileDone ? 'complete' : 'not complete'}; travel history ${
            snapshot.travelDone ? 'complete' : snapshot.travelStarted ? 'started, not finished' : 'not started'
        }; trip details not available yet (coming soon).`,
    ];
    const profile = compact(snapshot.profile);
    const travel = compact(snapshot.travel);
    delete travel.destinationCode;
    delete travel.budgetCurrency;
    if (Object.keys(profile).length) lines.push(`Profile: ${JSON.stringify(profile)}`);
    if (Object.keys(travel).length) lines.push(`Travel answers: ${JSON.stringify(travel)}`);
    return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* Instructions                                                        */
/* ------------------------------------------------------------------ */

const APP_MAP = `Tourain app pages you can link to. Use markdown links with the app: scheme, exactly as written, and only these:
- [Dashboard](app:/dashboard): home, choose Discover / Evaluate / Earn
- [Visa evaluation](app:/evaluate): start or continue the visa assessment
- [Personal profile](app:/evaluate/profile): view or update personal details
- [Travel history](app:/evaluate/travel): view, update or continue the travel history questions
- [Discover](app:/discover): full chat with Ama plus the intelligence dashboard
Coming soon (mention them as coming soon, never link them): trip details, Earn, Flight Intel, Creator Hub, booking a human assistant, making an application.`;

const RULES = `Rules:
- Be accurate and practical. Visa rules change: for requirements, fees and processing times, give typical guidance and tell the user to confirm on the official government or embassy site.
- Never promise a visa outcome. Do not invent live data (exact prices, flight times, approval rates, exchange rates). If you don't know, say so.
- Use the user's saved answers when they help; don't repeat them back needlessly. Don't ask for things already in the answers.
- Write in plain, friendly English. Short paragraphs, markdown bullets when listing, **bold** sparingly. No headings.
- When it would help the user reply, end your message with quick replies on their own last line in exactly this format: [[options: First option | Second option | Third option]] (2-4 short options, max 5 words each).`;

const PERSONAS = {
    assistant: `You are Tourain AI, the in-app assistant of Tourain, a travel and visa platform.
Work like an agent: first understand what the user wants by asking short questions, ONE question at a time, usually with quick-reply options. Once you understand, give a clear answer or the concrete next step and link to the right page in the app.
If their assessment isn't complete and it's relevant, guide them to finish it. For long research-style questions, answer briefly and suggest continuing in [Discover](app:/discover).
Keep each reply under about 120 words.`,
    discover: `You are Ama, Tourain's travel co-pilot inside Discover.
Help the user research and plan their travel: visa requirements and documents, timelines, budgeting, itineraries, accommodation areas, culture, safety and what to expect on arrival. Tailor everything to their saved answers (destination, purpose, budget, length of stay, history).
Give thorough but scannable answers (usually under about 250 words) and point to app pages when there's a next step there.`,
};

function systemInstruction(mode, user) {
    return [PERSONAS[mode], RULES, APP_MAP, `What you know about the user:\n${contextBlock(getTravellerSnapshot(user))}`].join('\n\n');
}

/* ------------------------------------------------------------------ */
/* Chat                                                                */
/* ------------------------------------------------------------------ */

const MAX_HISTORY = 20;

/**
 * Gemini needs turns to alternate user → model → user. A question whose reply
 * failed (or was stopped) leaves two user turns in a row, so keep only answered
 * questions, and make sure the history ends with a model turn because the new
 * question is sent after it.
 */
function cleanHistory(history) {
    const out = [];
    for (const m of history) {
        const text = (m.text || '').trim();
        if (!text || (m.role !== 'user' && m.role !== 'model')) continue;
        const prev = out[out.length - 1];
        if (prev && prev.role === m.role) {
            if (m.role === 'user') out[out.length - 1] = { role: 'user', text }; // unanswered question: keep the latest
            else prev.text = `${prev.text}\n\n${text}`;
        } else out.push({ role: m.role, text });
    }
    while (out.length && out[out.length - 1].role !== 'model') out.pop();
    return out;
}

const FIRST_WORD_TIMEOUT = 30000; // no text at all after this long → give up
const STALL_TIMEOUT = 30000; // reply stops mid-way for this long → give up

class AiTimeoutError extends Error {
    constructor(message = 'Tourain AI timed out', code = 'timeout') {
        super(message);
        this.code = code;
    }
}

const withinMs = (promise, ms, makeError) => {
    let timer;
    return Promise.race([
        promise.finally(() => clearTimeout(timer)),
        new Promise((_, reject) => {
            timer = setTimeout(() => reject(makeError()), ms);
        }),
    ]);
};

/**
 * Gets the App Check token first (Firebase caches it, so the AI request reuses it).
 * Doing it separately tells us whether a slow reply is App Check or the model.
 */
async function checkAppCheck() {
    if (!appCheck) return;
    const t0 = Date.now();
    const result = await withinMs(
        getAppCheckToken(appCheck, false),
        15000,
        () => new AiTimeoutError('App Check did not respond within 15s', 'appcheck-timeout'),
    );
    if (import.meta.env.DEV) {
        console.info(`[Tourain AI] App Check token in ${Date.now() - t0}ms`);
        if (result?.error) console.warn('[Tourain AI] App Check problem:', result.error.message);
    }
    return result;
}

/** Resolves the next stream chunk, or rejects if it takes longer than `ms`. */
function nextWithin(iterator, ms) {
    let timer;
    return Promise.race([
        iterator.next().finally(() => clearTimeout(timer)),
        new Promise((_, reject) => {
            timer = setTimeout(() => reject(new AiTimeoutError()), ms);
        }),
    ]);
}

function chunkText(chunk) {
    try {
        return chunk.text() || '';
    } catch {
        return '';
    }
}

/**
 * Sends `text` with the earlier conversation and streams the reply.
 * `history` is [{ role: 'user' | 'model', text }]. Calls onText(fullTextSoFar).
 */
export async function streamReply({ mode, user, history, text, onText, signal }) {
    const turns = cleanHistory(history).slice(-MAX_HISTORY);
    // Gemini expects the history to start with a user turn.
    while (turns.length && turns[0].role !== 'user') turns.shift();
    const started = Date.now();

    const open = (withThinkingLimit) =>
        getModel()
            .startChat({
                systemInstruction: systemInstruction(mode, user),
                history: turns.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
                generationConfig: {
                    temperature: 0.6,
                    // Thinking tokens count towards this limit, so leave room for them.
                    maxOutputTokens: mode === 'discover' ? 4096 : 2048,
                    // Gemini 3 models "think" before answering; keep that short so replies start quickly.
                    ...(withThinkingLimit && {
                        thinkingConfig: { thinkingLevel: mode === 'discover' ? ThinkingLevel.LOW : ThinkingLevel.MINIMAL },
                    }),
                },
            })
            .sendMessageStream(text);

    try {
        await checkAppCheck();
    } catch (error) {
        if (error?.code === 'appcheck-timeout') throw error;
        throw new AiTimeoutError(`App Check failed: ${error?.message || error}`, 'appcheck-failed');
    }

    const t1 = Date.now();
    // sendMessageStream resolves once the model starts answering.
    const start = (withThinkingLimit) =>
        withinMs(open(withThinkingLimit), FIRST_WORD_TIMEOUT, () => new AiTimeoutError(`Gemini (${MODEL}) did not start answering within ${FIRST_WORD_TIMEOUT / 1000}s`));
    let result;
    try {
        result = await start(true);
    } catch (error) {
        // Models without thinking levels (e.g. if VITE_GEMINI_MODEL is changed) reject the setting.
        if (!/thinking/i.test(String(error?.message))) throw error;
        result = await start(false);
    }
    if (import.meta.env.DEV) console.info(`[Tourain AI] ${MODEL} started answering after ${Date.now() - t1}ms`);

    const iterator = result.stream[Symbol.asyncIterator]();
    let full = '';
    for (;;) {
        if (signal?.aborted) return full;
        const { value, done } = await nextWithin(iterator, full ? STALL_TIMEOUT : FIRST_WORD_TIMEOUT);
        if (done) break;
        const piece = chunkText(value);
        if (piece) {
            if (!full && import.meta.env.DEV) console.info(`[Tourain AI] first words after ${Date.now() - started}ms`);
            full += piece;
            onText(full);
        }
    }
    if (!full.trim()) {
        const response = await result.response;
        full = chunkText(response);
        if (full) onText(full);
        else if (import.meta.env.DEV) console.warn('[Tourain AI] empty reply', response?.candidates?.[0]?.finishReason, response);
    }
    return full;
}

/** Turns an SDK error into something the user can act on (with the server's own message in development). */
export function friendlyAiError(error) {
    const message = describeAiError(error);
    if (!import.meta.env.DEV) return message;
    const detail = String(error?.message || error || '').replace(/^.*?:\s*(?=\[\d{3})/, '').slice(0, 400);
    return detail ? `${message}\n\n\`Details (only shown on localhost): ${detail.replace(/`/g, "'")}\`` : message;
}

function describeAiError(error) {
    // Drop the request URL (it contains words like "models" and "generate") before matching.
    const raw = `${error?.code || ''} ${error?.message || error || ''}`.replace(/https?:\/\/\S+/g, '');
    const status = Number(error?.customErrorData?.status || raw.match(/\[(\d{3})/)?.[1] || 0);
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return "You're offline. Check your connection and try again.";
    if (error?.code === 'appcheck-timeout' || error?.code === 'appcheck-failed') {
        return 'Tourain AI could not verify this browser (App Check didn\'t respond). Check the App Check debug token in .env and that it is registered in the Firebase console.';
    }
    if (error?.code === 'timeout' || /timed? ?out|timeout has expired|deadline|aborted/i.test(raw)) return 'Tourain AI took too long to answer. Please try again.';
    if (/app.?check|attestation|recaptcha/i.test(raw)) {
        return 'Tourain AI could not verify this browser (App Check). If you run this site, add the App Check debug token or reCAPTCHA key described in the setup notes.';
    }
    if (/API_KEY_SERVICE_BLOCKED|are blocked|API key not valid|API_KEY_INVALID|REFERRER_BLOCKED|referer/i.test(raw)) {
        return "The site's Firebase API key isn't allowed to use Firebase AI Logic. In Google Cloud console > APIs & Services > Credentials, open the Browser key and add \"Firebase AI Logic API\" to its API restrictions (and make sure this site's address is allowed).";
    }
    if (/api-not-enabled|has not been used|SERVICE_DISABLED|is disabled/i.test(raw)) {
        return 'Tourain AI is not switched on for this Firebase project yet. Enable Firebase AI Logic (Gemini Developer API) in the Firebase console.';
    }
    if (/PERMISSION_DENIED/i.test(raw) || status === 403) {
        return 'Firebase refused the request (permission denied). Check that Firebase AI Logic is set up with the Gemini Developer API and that App Check is configured for this site.';
    }
    if (/quota|RESOURCE_EXHAUSTED|rate.?limit/i.test(raw) || status === 429) return 'Tourain AI is busy right now. Please try again in a minute.';
    if (status === 404) return 'The AI model is unavailable. Check VITE_GEMINI_MODEL in your .env.';
    if (/SAFETY|blocked/i.test(raw)) return "I can't help with that one. Try asking in a different way.";
    if (/failed to fetch|network|fetch-error/i.test(raw) && !status) return "Couldn't reach Tourain AI. Check your connection and try again.";
    return 'Something went wrong reaching Tourain AI. Please try again.';
}

/* ------------------------------------------------------------------ */
/* Saved conversations (this browser, per user and per chat)           */
/* ------------------------------------------------------------------ */

const chatKey = (mode, userId) => `tourain.chat.${mode}.${userId}`;

export function loadConversation(mode, userId) {
    if (!userId) return [];
    try {
        const list = JSON.parse(localStorage.getItem(chatKey(mode, userId)) || '[]');
        return Array.isArray(list) ? list : [];
    } catch {
        return [];
    }
}

export function saveConversation(mode, userId, messages) {
    if (!userId) return;
    try {
        localStorage.setItem(chatKey(mode, userId), JSON.stringify(messages.slice(-40)));
    } catch {
        /* storage unavailable */
    }
}

/** Splits the trailing "[[options: a | b]]" line off a reply. Hides a half-streamed one. */
export function splitOptions(text = '') {
    const match = text.match(/\[\[\s*options\s*:\s*([^\]]*)\]\]\s*$/i);
    if (match) {
        const options = match[1]
            .split('|')
            .map((o) => o.trim())
            .filter(Boolean)
            .slice(0, 4);
        return { body: text.slice(0, match.index).trimEnd(), options };
    }
    const open = text.lastIndexOf('[[');
    if (open !== -1 && !text.slice(open).includes(']]')) return { body: text.slice(0, open).trimEnd(), options: [] };
    return { body: text, options: [] };
}
