import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Small, safe markdown renderer for AI replies: paragraphs, bullet/numbered
 * lists, **bold**, *italic*, `code` and links. Links with the app: scheme
 * (e.g. app:/evaluate/travel) open pages inside Tourain; http(s) links open in a
 * new tab; anything else is shown as plain text. No HTML is ever injected.
 */
const APP_PATHS = ['/dashboard', '/evaluate', '/evaluate/profile', '/evaluate/travel', '/discover'];

function renderInline(text, keyPrefix, linkClass, onNavigate) {
    const out = [];
    const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;
    let last = 0;
    let match;
    let i = 0;
    while ((match = pattern.exec(text))) {
        if (match.index > last) out.push(text.slice(last, match.index));
        const token = match[0];
        const key = `${keyPrefix}-${(i += 1)}`;
        if (token.startsWith('**')) {
            out.push(<strong key={key} className="font-semibold">{token.slice(2, -2)}</strong>);
        } else if (token.startsWith('`')) {
            out.push(<code key={key} className="rounded bg-black/10 px-1 py-0.5 text-[0.9em]">{token.slice(1, -1)}</code>);
        } else if (token.startsWith('[')) {
            const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/) || [];
            if (href?.startsWith('app:')) {
                const path = href.slice(4) || '/dashboard';
                if (APP_PATHS.includes(path)) {
                    out.push(
                        <Link key={key} to={path} onClick={onNavigate} className={linkClass}>
                            {label}
                        </Link>,
                    );
                } else out.push(label);
            } else if (/^https?:\/\//i.test(href || '')) {
                out.push(
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {label}
                    </a>,
                );
            } else out.push(label);
        } else {
            out.push(<em key={key}>{token.slice(1, -1)}</em>);
        }
        last = match.index + token.length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

export default function Markdown({ text, linkClass = 'font-medium underline underline-offset-2', onNavigate }) {
    const lines = text.replace(/\r/g, '').split('\n');
    const blocks = [];
    let list = null;
    let para = [];
    const flushPara = () => {
        if (para.length) blocks.push({ type: 'p', text: para.join(' ') });
        para = [];
    };
    const flushList = () => {
        if (list) blocks.push(list);
        list = null;
    };
    for (const line of lines) {
        const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
        const numbered = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
        if (bullet || numbered) {
            flushPara();
            const type = bullet ? 'ul' : 'ol';
            if (!list || list.type !== type) {
                flushList();
                list = { type, items: [] };
            }
            list.items.push(bullet ? bullet[1] : numbered[2]);
        } else if (!line.trim()) {
            flushPara();
            flushList();
        } else {
            flushList();
            para.push(line.replace(/^#{1,6}\s+/, ''));
        }
    }
    flushPara();
    flushList();

    return (
        <div className="space-y-2.5">
            {blocks.map((block, b) => {
                if (block.type === 'p') return <p key={b}>{renderInline(block.text, b, linkClass, onNavigate)}</p>;
                const Tag = block.type;
                return (
                    <Tag key={b} className={`space-y-1 pl-5 ${Tag === 'ul' ? 'list-disc' : 'list-decimal'}`}>
                        {block.items.map((item, i) => (
                            <li key={i}>{renderInline(item, `${b}-${i}`, linkClass, onNavigate)}</li>
                        ))}
                    </Tag>
                );
            })}
        </div>
    );
}
