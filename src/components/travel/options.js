import {
    TbBeach,
    TbBriefcase,
    TbBuildingBank,
    TbCategory,
    TbFirstAidKit,
    TbId,
    TbSchool,
    TbUsers,
} from 'react-icons/tb';

/** Answer options for the Travel History questions (shared by the steps and the summary). */
export const PURPOSE_OPTIONS = [
    { value: 'tourism', label: 'Tourism', icon: TbBeach },
    { value: 'business', label: 'Business', icon: TbBriefcase },
    { value: 'study', label: 'Study', icon: TbSchool },
    { value: 'family', label: 'Visit family/friends', icon: TbUsers },
    { value: 'medical', label: 'Medical', icon: TbFirstAidKit },
    { value: 'other', label: 'Other', icon: TbCategory },
];

export const VISA_TYPE_OPTIONS = [
    { value: 'tourist', label: 'Tourist', icon: TbBeach },
    { value: 'work', label: 'Work', icon: TbBriefcase },
    { value: 'study', label: 'Study', icon: TbSchool },
    { value: 'other', label: 'Other', icon: TbCategory },
];

export const FUNDING_OPTIONS = [
    { value: 'self', label: 'Myself', icon: TbId },
    { value: 'employer', label: 'Employer', icon: TbBriefcase },
    { value: 'sponsor', label: 'Family/Friend', icon: TbUsers },
    { value: 'scholarship', label: 'Scholarship', icon: TbBuildingBank },
];

export const YES_NO = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

export const RESERVATION_OPTIONS = [
    { value: 'yes', label: 'Yes, I have one or both of them' },
    { value: 'no', label: 'No, not yet' },
];

export const STAY_UNITS = [
    { value: 'days', label: 'Days' },
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
];

export const CURRENCIES = ['NGN', 'USD', 'GBP', 'EUR', 'CAD'];
