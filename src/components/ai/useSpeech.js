import { useCallback, useEffect, useRef, useState } from 'react';

/** Voice typing with the browser's speech recognition, where available (Chrome, Edge, Safari). */
export default function useSpeech(onText) {
    const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
    const [listening, setListening] = useState(false);
    const recRef = useRef(null);
    const onTextRef = useRef(onText);
    onTextRef.current = onText;

    useEffect(() => () => recRef.current?.abort(), []);

    const toggle = useCallback(() => {
        if (!Recognition) return;
        if (listening) {
            recRef.current?.stop();
            return;
        }
        const rec = new Recognition();
        rec.lang = navigator.language || 'en-US';
        rec.interimResults = true;
        rec.continuous = false;
        rec.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((r) => r[0].transcript)
                .join('');
            onTextRef.current(transcript);
        };
        rec.onend = () => setListening(false);
        rec.onerror = () => setListening(false);
        recRef.current = rec;
        setListening(true);
        rec.start();
    }, [Recognition, listening]);

    return { supported: Boolean(Recognition), listening, toggle };
}
