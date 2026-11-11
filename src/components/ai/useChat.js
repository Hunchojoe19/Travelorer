import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { friendlyAiError, loadConversation, saveConversation, streamReply } from '../../lib/ai';

let nextId = 0;
const newId = () => `${Date.now().toString(36)}-${(nextId += 1)}`;

/**
 * Conversation state for one chat ("assistant" = floating Tourain AI,
 * "discover" = Ama on the Discover page). Saved per user in this browser.
 * `greeting` is a local opening message (not sent to the AI).
 */
export default function useChat(mode, greeting) {
    const { user } = useAuth();
    const userId = user?.id;
    const [messages, setMessages] = useState(() => loadConversation(mode, userId));
    const [busy, setBusy] = useState(false);
    const abortRef = useRef(null);
    const messagesRef = useRef(messages);
    messagesRef.current = messages;

    // Reload when the signed-in user changes.
    useEffect(() => {
        setMessages(loadConversation(mode, userId));
    }, [mode, userId]);

    useEffect(() => {
        if (!busy) saveConversation(mode, userId, messages.filter((m) => !m.pending));
    }, [busy, messages, mode, userId]);

    useEffect(() => () => abortRef.current?.abort(), []);

    const send = useCallback(
        async (rawText) => {
            const text = rawText.trim();
            if (!text || busy) return;
            const history = messagesRef.current.filter((m) => !m.error && !m.local && !m.pending).map(({ role, text: t }) => ({ role, text: t }));
            const userMsg = { id: newId(), role: 'user', text };
            const replyId = newId();
            setMessages((prev) => [...prev, userMsg, { id: replyId, role: 'model', text: '', pending: true }]);
            setBusy(true);
            const controller = new AbortController();
            abortRef.current = controller;
            const update = (patch) => setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, ...patch } : m)));
            try {
                const full = await streamReply({ mode, user, history, text, signal: controller.signal, onText: (t) => update({ text: t }) });
                if (controller.signal.aborted) return;
                update({ pending: false, text: full || "Sorry, I couldn't come up with an answer. Could you rephrase that?" });
            } catch (error) {
                if (controller.signal.aborted) return;
                if (import.meta.env.DEV) console.error('[Tourain AI]', error);
                update({ pending: false, error: true, text: friendlyAiError(error), retryText: text });
            } finally {
                if (abortRef.current === controller) abortRef.current = null;
                setBusy(false);
            }
        },
        [busy, mode, user],
    );

    /** Removes a failed reply (and the question behind it) and asks again. */
    const retry = useCallback(
        (message) => {
            if (!message?.retryText) return;
            setMessages((prev) => {
                const index = prev.findIndex((m) => m.id === message.id);
                return index > 0 ? prev.slice(0, index - 1) : prev;
            });
            setTimeout(() => send(message.retryText), 0);
        },
        [send],
    );

    const reset = useCallback(() => {
        abortRef.current?.abort();
        setBusy(false);
        setMessages([]);
    }, []);

    const shown = greeting ? [{ id: 'greeting', role: 'model', text: greeting, local: true }, ...messages] : messages;
    return { messages: shown, send, retry, reset, busy, hasConversation: messages.length > 0 };
}
