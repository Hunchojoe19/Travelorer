import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineLockClosed, HiOutlinePencilAlt } from 'react-icons/hi';
import countryList from 'react-select-country-list';
import { labelFor } from '../profile/options';
import { FUNDING_OPTIONS, PURPOSE_OPTIONS, RESERVATION_OPTIONS, STAY_UNITS, VISA_TYPE_OPTIONS, YES_NO } from './options';

const countries = countryList();
const countryName = (code) => (code ? countries.getLabel(code) || code : '—');
const countryNames = (codes) => (codes?.length ? codes.map(countryName).join(', ') : 'None');

function Row({ label, value }) {
    return (
        <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</dt>
            <dd className="text-sm font-medium text-gray-900 sm:max-w-[60%] sm:text-right">{value || '—'}</dd>
        </div>
    );
}

function formatUpdated(value) {
    if (!value) return '—';
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? value
        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

/** Read-only view of completed travel history. Changing it needs "Update travel history". */
export default function TravelSummary({ travel, onEdit }) {
    const stay = travel.stay ? `${travel.stay.amount} ${labelFor(STAY_UNITS, travel.stay.unit).toLowerCase()}` : '';
    const budget = travel.budget
        ? new Intl.NumberFormat('en', { style: 'currency', currency: travel.budget.currency, maximumFractionDigits: 0 }).format(travel.budget.amount)
        : '';
    const refusal = travel.refusal;

    return (
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl" aria-labelledby="travel-summary-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 id="travel-summary-title" className="text-2xl font-semibold text-black">
                            Your travel history
                        </h1>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8E5] px-2.5 py-1 text-[11px] font-semibold text-[#2E9E2C]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3CC13B]" aria-hidden="true" />
                            Completed
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">Last updated {formatUpdated(travel.updatedAt || travel.completedAt)}</p>
                </div>
                <motion.button
                    type="button"
                    onClick={onEdit}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#2F6FED] px-4 py-2 text-sm font-semibold text-[#2F6FED] transition-colors hover:bg-[#2F6FED]/5"
                >
                    <HiOutlinePencilAlt className="h-4 w-4" /> Update travel history
                </motion.button>
            </div>

            <div className="mt-8 grid gap-5">
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm">
                    <h2 className="pt-4 text-sm font-semibold text-[#003B95]">Your trip</h2>
                    <dl className="divide-y divide-gray-100">
                        <Row label="Passport" value={countryName(travel.passport)} />
                        <Row label="Destination" value={countryName(travel.destination)} />
                        <Row label="Main purpose" value={labelFor(PURPOSE_OPTIONS, travel.purpose)} />
                        <Row label="Visa type" value={labelFor(VISA_TYPE_OPTIONS, travel.visaType)} />
                        <Row label="Funded by" value={labelFor(FUNDING_OPTIONS, travel.funding)} />
                        <Row label="Length of stay" value={stay} />
                        <Row label="Budget" value={budget} />
                        <Row label="Flight / accommodation booked" value={labelFor(RESERVATION_OPTIONS, travel.reservation)} />
                        <Row label="Formal invitation" value={labelFor(YES_NO, travel.invitation)} />
                        <Row label="Time-sensitive" value={labelFor(YES_NO, travel.timeSensitive)} />
                    </dl>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm">
                    <h2 className="pt-4 text-sm font-semibold text-[#003B95]">Visa history</h2>
                    <dl className="divide-y divide-gray-100">
                        <Row label="Previous visa for destination" value={labelFor(YES_NO, travel.previousVisa)} />
                        <Row label="Visa countries visited (last 5 years)" value={countryNames(travel.visited)} />
                        <Row label="Refused a visa before" value={labelFor(YES_NO, refusal?.answer)} />
                        {refusal?.answer === 'yes' && (
                            <>
                                <Row label="Refused by" value={countryNames(refusal.countries)} />
                                <Row label="Reason" value={refusal.reason} />
                            </>
                        )}
                    </dl>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <button
                    type="button"
                    aria-disabled="true"
                    title="Trip details are coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#2F6FED]/50 px-8 py-3 text-sm font-semibold text-white"
                >
                    <HiOutlineLockClosed className="h-4 w-4" /> Continue to trip details <HiOutlineArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-gray-400">Trip details are coming soon.</p>
            </div>
        </motion.section>
    );
}
