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

/** Answer options for the profile questions (shared by the steps and the summary). */
export const MARITAL_OPTIONS = [
    { value: 'single', label: 'Single', icon: TbUser },
    { value: 'married', label: 'Married', icon: TbUsers },
    { value: 'divorced', label: 'Divorced', icon: TbUserX },
    { value: 'widowed', label: 'Widowed', icon: TbUserOff },
];

export const EMPLOYMENT_OPTIONS = [
    { value: 'student', label: 'Student', icon: TbSchool },
    { value: 'self-employed', label: 'Self-employed', icon: TbBuildingStore },
    { value: 'employed', label: 'Employed', icon: TbBriefcase },
    { value: 'unemployed', label: 'Unemployed', icon: TbUserOff },
    { value: 'retired', label: 'Retired', icon: TbArmchair },
];

export const PROFESSION_OPTIONS = [
    { value: 'freelancer', label: 'Freelancer', icon: TbDeviceLaptop },
    { value: 'business-owner', label: 'Business-Owner', icon: TbBuildingStore },
    { value: 'professional', label: 'Professional', hint: '(Doctor, Lawyer, etc.)', icon: TbStethoscope },
];

/** The profession question only applies to people who work. */
export const needsProfession = (employment) => employment === 'self-employed' || employment === 'employed';

export const GENDER_LABELS = { male: 'Male', female: 'Female' };

export const labelFor = (options, value) => options.find((o) => o.value === value)?.label || '—';
