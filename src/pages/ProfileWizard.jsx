import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import {
    TbArmchair,
    TbBuildingStore,
    TbDeviceLaptop,
    TbSchool,
    TbStethoscope,
    TbUser,
    TbUserOff,
    TbUsers,
    TbUserX,
    TbBriefcase,
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../auth/AuthContext';
import { loadProfile, saveProfile } from '../lib/profileStore';
import ProfileLayout from '../components/profile/ProfileLayout';
import PersonalProfileStep from '../components/profile/PersonalProfileStep';
import ChoiceStep from '../components/profile/ChoiceStep';
import ProfileComplete from '../components/profile/ProfileComplete';

const MARITAL_OPTIONS = [
    { value: 'single', label: 'Single', icon: TbUser },
    { value: 'married', label: 'Married', icon: TbUsers },
    { value: 'divorced', label: 'Divorced', icon: TbUserX },
    { value: 'widowed', label: 'Widowed', icon: TbUserOff },
];

const EMPLOYMENT_OPTIONS = [
    { value: 'student', label: 'Student', icon: TbSchool },
    { value: 'self-employed', label: 'Self-employed', icon: TbBuildingStore },
    { value: 'employed', label: 'Employed', icon: TbBriefcase },
    { value: 'unemployed', label: 'Unemployed', icon: TbUserOff },
    { value: 'retired', label: 'Retired', icon: TbArmchair },
];

const PROFESSION_OPTIONS = [
    { value: 'freelancer', label: 'Freelancer', icon: TbDeviceLaptop },
    { value: 'business-owner', label: 'Business-Owner', icon: TbBuildingStore },
    { value: 'professional', label: 'Professional', hint: '(Doctor, Lawyer, etc.)', icon: TbStethoscope },
];

/** The profession question only applies to people who work. */
const needsProfession = (employment) => employment === 'self-employed' || employment === 'employed';

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
    const [profile, setProfile] = useState(() => loadProfile(user?.id));
    const [step, setStep] = useState('personal');
    const steps = useMemo(() => stepsFor(profile), [profile]);

    const update = (patch) => {
        const next = { ...profile, ...patch };
        if (patch.employmentStatus && !needsProfession(patch.employmentStatus)) delete next.profession;
        setProfile(next);
        saveProfile(user?.id, next);
        return next;
    };

    const goNext = (nextProfile) => {
        const order = stepsFor(nextProfile);
        const index = order.indexOf(step);
        setStep(order[Math.min(index + 1, order.length - 1)]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        const index = steps.indexOf(step);
        if (index <= 0) navigate('/evaluate');
        else setStep(steps[index - 1]);
    };

    const finish = () => {
        update({ completedAt: new Date().toISOString() });
        toast.success('Profile saved. Travel details are coming next.');
        navigate('/dashboard');
    };

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
        <ProfileLayout activeSection="personal" completed={step === 'complete' ? ['personal'] : []}>
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
                    <span aria-live="polite">Step {stepNumber}</span>
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
