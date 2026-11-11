import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineLockClosed, HiOutlinePencilAlt } from 'react-icons/hi';
import countryList from 'react-select-country-list';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { EMPLOYMENT_OPTIONS, GENDER_LABELS, MARITAL_OPTIONS, PROFESSION_OPTIONS, labelFor, needsProfession } from './options';

function formatDate(value, withTime = false) {
    if (!value) return '—';
    const d = new Date(withTime ? value : `${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
    });
}

function Row({ label, value }) {
    return (
        <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
            <dd className="text-sm font-medium text-gray-900 sm:max-w-[60%] sm:text-right">{value || '—'}</dd>
        </div>
    );
}

/**
 * Read-only view of a completed profile. Changing anything requires clicking
 * "Update profile" first.
 */
export default function ProfileSummary({ profile, onEdit }) {
    const country = useMemo(() => (profile.country ? countryList().getLabel(profile.country) : ''), [profile.country]);
    const updated = profile.updatedAt || profile.completedAt;

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl"
            aria-labelledby="summary-title"
        >
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 id="summary-title" className="text-2xl font-semibold text-black">
                            Your profile
                        </h1>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8E5] px-2.5 py-1 text-[11px] font-semibold text-[#2E9E2C]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3CC13B]" aria-hidden="true" />
                            Completed
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">Last updated {formatDate(updated, true)}</p>
                </div>
                <motion.button
                    type="button"
                    onClick={onEdit}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#2F6FED] px-4 py-2 text-sm font-semibold text-[#2F6FED] transition-colors hover:bg-[#2F6FED]/5"
                >
                    <HiOutlinePencilAlt className="h-4 w-4" /> Update profile
                </motion.button>
            </div>

            <div className="mt-8 grid gap-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm">
                    <h2 className="pt-4 text-sm font-semibold text-[#003B95]">Personal details</h2>
                    <dl className="divide-y divide-gray-100">
                        <Row label="Given name" value={profile.givenName} />
                        <Row label="Surname" value={profile.surname} />
                        <Row label="Gender" value={GENDER_LABELS[profile.gender]} />
                        <Row label="Date of birth" value={formatDate(profile.dateOfBirth)} />
                        <Row label="Residential address" value={profile.residentialAddress} />
                        <Row label="Country" value={country} />
                        <Row label="Phone number" value={profile.phoneNumber ? formatPhoneNumberIntl(profile.phoneNumber) || profile.phoneNumber : ''} />
                    </dl>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm">
                    <h2 className="pt-4 text-sm font-semibold text-[#003B95]">Background</h2>
                    <dl className="divide-y divide-gray-100">
                        <Row label="Marital status" value={labelFor(MARITAL_OPTIONS, profile.maritalStatus)} />
                        <Row label="Employment status" value={labelFor(EMPLOYMENT_OPTIONS, profile.employmentStatus)} />
                        {needsProfession(profile.employmentStatus) && (
                            <Row label="Profession" value={labelFor(PROFESSION_OPTIONS, profile.profession)} />
                        )}
                    </dl>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <button
                    type="button"
                    aria-disabled="true"
                    title="Travel details are coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#2F6FED]/50 px-8 py-3 text-sm font-semibold text-white"
                >
                    <HiOutlineLockClosed className="h-4 w-4" /> Continue to travel details <HiOutlineArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-gray-400">Travel details are coming soon.</p>
            </div>
        </motion.section>
    );
}
