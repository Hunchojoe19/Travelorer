import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../app/AppHeader';
import { useAuth } from '../../auth/AuthContext';
import { loadProfile, loadTravel } from '../../lib/profileStore';
import AiFab from '../app/AiFab';

const SECTIONS = [
    { id: 'personal', label: 'Personal Profile', to: '/evaluate/profile' },
    { id: 'travel', label: 'Travel History', to: '/evaluate/travel' },
];

/**
 * Which sections are done / reachable, read from saved answers so the menu is the
 * same on every page (the page's own `completed` list is merged in for the moment
 * a section is finished but not yet saved).
 */
function useSectionState(activeSection, completed) {
    const { user } = useAuth();
    const profile = loadProfile(user?.id);
    const travel = loadTravel(user?.id);
    const done = new Set(completed);
    if (profile.completedAt) done.add('personal');
    if (travel.completedAt) done.add('travel');
    const travelStarted = Object.keys(travel).length > 0;
    return {
        isDone: (id) => done.has(id),
        // Personal is always reachable; travel once the profile is complete.
        isReachable: (id) => id === 'personal' || done.has('personal'),
        // Later sections appear once the user reaches them (as in the design).
        isVisible: (id) => id === 'personal' || id === activeSection || done.has(id) || (id === 'travel' && travelStarted),
    };
}

function SectionItem({ section, active, done, reachable }) {
    const dot = (
        <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-white ${
                done || active ? 'bg-black' : 'bg-gray-300'
            }`}
            aria-hidden="true"
        >
            ✓
        </span>
    );
    if (!reachable) {
        return (
            <span className="flex shrink-0 cursor-not-allowed items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-gray-400" title="Complete your personal profile first">
                {dot}
                {section.label}
            </span>
        );
    }
    return (
        <Link
            to={section.to}
            aria-current={active ? 'page' : undefined}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]/40 ${
                active ? 'font-medium text-black' : 'text-gray-600 hover:text-black'
            }`}
        >
            {dot}
            {section.label}
        </Link>
    );
}

const CONTENT_ID = 'profile-content';

/** Scrolls the content pane (not the window, which no longer scrolls) back to the top. */
export function scrollContentToTop() {
    const el = document.getElementById(CONTENT_ID);
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Page frame for the profile steps: header, left step list, content area.
 * The window itself never scrolls: the header stays put, and the side menu and
 * the content each scroll on their own.
 */
export default function ProfileLayout({ activeSection = 'personal', completed = [], children }) {
    const state = useSectionState(activeSection, completed);
    const visible = SECTIONS.filter((section) => state.isVisible(section.id));
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-white">
            <AppHeader />
            <div className="flex min-h-0 flex-1">
                {/* Grows with the window so the menu lines up with the centred header content. */}
                <aside
                    className="hidden w-[calc(12rem+max(0px,(100vw-80rem)/2))] shrink-0 overflow-y-auto overscroll-contain border-r border-gray-200 md:flex md:justify-end"
                    aria-label="Profile sections"
                >
                    <ol className="w-48 space-y-2 px-4 pb-10 pt-20">
                        {visible.map((section) => (
                            <li key={section.id} className="text-sm">
                                <SectionItem
                                    section={section}
                                    active={section.id === activeSection}
                                    done={state.isDone(section.id)}
                                    reachable={state.isReachable(section.id)}
                                />
                            </li>
                        ))}
                    </ol>
                </aside>
                <main id={CONTENT_ID} className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
                    {visible.length > 1 && (
                        <nav className="flex gap-2 overflow-x-auto text-sm border-b border-gray-200 px-4 py-3 md:hidden" aria-label="Profile sections">
                            {visible.map((section) => (
                                <SectionItem
                                    key={section.id}
                                    section={section}
                                    active={section.id === activeSection}
                                    done={state.isDone(section.id)}
                                    reachable={state.isReachable(section.id)}
                                />
                            ))}
                        </nav>
                    )}
                    <div className="max-w-[68rem] px-4 pb-24 pt-10 sm:px-10 md:pt-20">{children}</div>
                </main>
            </div>
            <AiFab />
        </div>
    );
}
