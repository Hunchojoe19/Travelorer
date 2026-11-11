import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../auth/AuthContext';
import { loadProfile, saveProfile } from '../lib/profileStore';
import ProfileLayout from '../components/profile/ProfileLayout';
import PersonalProfileStep from '../components/profile/PersonalProfileStep';
import ChoiceStep from '../components/profile/ChoiceStep';
import ProfileComplete from '../components/profile/ProfileComplete';
import ProfileSummary from '../components/profile/ProfileSummary';
import {
    EMPLOYMENT_OPTIONS,
    MARITAL_OPTIONS,
    PROFESSION_OPTIONS,
    needsProfession,
} from '../components/profile/options';

function stepsFor(profile) {
    return [
        'personal',
        'marital',
        'employment',
        ...(needsProfession(profile.employmentStatus) ? ['profession'] : []),
        'complete',
    ];
}

export default function ProfileWizard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    // `saved` is what's stored; `profile` is the working copy the steps edit.
    const [saved, setSaved] = useState(() => loadProfile(user?.id));
    const isComplete = Boolean(saved.completedAt);
    const [mode, setMode] = useState(isComplete ? 'summary' : 'edit');
    const [profile, setProfile] = useState(saved);
    const [step, setStep] = useState('personal');
    const steps = useMemo(() => stepsFor(profile), [profile]);

    const update = (patch) => {
        const next = { ...profile, ...patch };
        if (patch.employmentStatus && !needsProfession(patch.employmentStatus)) delete next.profession;
        setProfile(next);
        // First time through: save progress so the user can resume later.
        // Updating a completed profile: nothing is saved until they finish.
        if (!isComplete) {
            saveProfile(user?.id, next);
            setSaved(next);
        }
        return next;
    };

    const startEditing = () => {
        setProfile(saved);
        setStep('personal');
        setMode('edit');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditing = () => {
        setProfile(saved);
        setMode('summary');
    };

    const goNext = (nextProfile) => {
        const order = stepsFor(nextProfile);
        const index = order.indexOf(step);
        setStep(order[Math.min(index + 1, order.length - 1)]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        const index = steps.indexOf(step);
        if (index > 0) setStep(steps[index - 1]);
        else if (isComplete) cancelEditing();
        else navigate('/evaluate');
    };

    const finish = () => {
        const now = new Date().toISOString();
        const final = { ...profile, completedAt: saved.completedAt || now, updatedAt: now };
        saveProfile(user?.id, final);
        setSaved(final);
        setProfile(final);
        setMode('summary');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success(isComplete ? 'Profile updated.' : 'Profile saved. Travel details are coming next.');
    };

    if (mode === 'summary') {
        return (
            <ProfileLayout activeSection="personal" completed={['personal']}>
                <ProfileSummary profile={saved} onEdit={startEditing} />
            </ProfileLayout>
        );
    }

    const content = {
        personal: <PersonalProfileStep initial={profile} onNext={(data) => goNext(update(data))} />,
        marital: (
            <ChoiceStep
                title="What is your marital status?"
                options={MARITAL_OPTIONS}
                value={profile.maritalStatus}
                onSelect={(value) => goNext(update({ maritalStatus: value }))}
            />
        ),
        employment: (
            <ChoiceStep
                title="What is your employment status?"
                options={EMPLOYMENT_OPTIONS}
                value={profile.employmentStatus}
                onSelect={(value) => goNext(update({ employmentStatus: value }))}
            />
        ),
        profession: (
            <ChoiceStep
                title="Which of these best describes your profession?"
                options={PROFESSION_OPTIONS}
                value={profile.profession}
                onSelect={(value) => goNext(update({ profession: value }))}
            />
        ),
        complete: <ProfileComplete onNext={finish} />,
    }[step];

    const stepNumber = steps.indexOf(step) + 1;

    return (
        <ProfileLayout activeSection="personal" completed={isComplete || step === 'complete' ? ['personal'] : []}>
            <div className="mx-auto mb-4 h-1 max-w-2xl overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#003B95] to-[#2F6FED]"
                    initial={false}
                    animate={{ width: `${(Math.max(stepNumber - 1, 0) / Math.max(steps.length - 1, 1)) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
            </div>
            {step !== 'complete' && (
                <div className="mx-auto mb-6 flex max-w-2xl items-center justify-between text-xs text-gray-500">
                    <button type="button" onClick={goBack} className="inline-flex items-center gap-1 rounded px-1 py-1 hover:text-gray-800">
                        <HiArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <span className="flex items-center gap-3">
                        {isComplete && (
                            <button type="button" onClick={cancelEditing} className="rounded px-2 py-1 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                Cancel update
                            </button>
                        )}
                        <span aria-live="polite">Step {stepNumber}</span>
                    </span>
                </div>
            )}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        </ProfileLayout>
    );
}
