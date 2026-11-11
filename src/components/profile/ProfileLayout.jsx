import React from 'react';
import AppHeader from '../app/AppHeader';
import AiFab from '../app/AiFab';

const SECTIONS = [{ id: 'personal', label: 'Personal Profile' }];

/** Page frame for the profile steps: header, left step list, content area. */
export default function ProfileLayout({ activeSection = 'personal', completed = [], children }) {
    return (
        <div className="min-h-screen bg-white">
            <AppHeader />
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
                <aside className="hidden w-48 shrink-0 border-r border-gray-200 px-6 pt-20 md:block" aria-label="Profile sections">
                    <ol className="space-y-4">
                        {SECTIONS.map((section) => {
                            const done = completed.includes(section.id);
                            const active = section.id === activeSection;
                            return (
                                <li key={section.id} className="flex items-center gap-2 text-sm">
                                    <span
                                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${
                                            done || active ? 'bg-black' : 'bg-gray-300'
                                        }`}
                                        aria-hidden="true"
                                    >
                                        ✓
                                    </span>
                                    <span className={active ? 'font-medium text-black' : 'text-gray-600'}>{section.label}</span>
                                </li>
                            );
                        })}
                    </ol>
                </aside>
                <main className="flex-1 px-4 pb-24 pt-14 sm:px-10 md:pt-20">{children}</main>
            </div>
            <AiFab />
        </div>
    );
}
