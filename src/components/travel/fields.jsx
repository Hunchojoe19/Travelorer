import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TbPlus, TbX } from 'react-icons/tb';
import countryList from 'react-select-country-list';
import { STAY_UNITS, CURRENCIES, YES_NO } from './options';

export const selectClass =
    'w-full appearance-none rounded-md border border-gray-300 bg-white bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat px-3 py-2.5 pr-9 text-sm text-gray-900 outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/15';
const chevron =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")";
export const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/15';

export function useCountries() {
    return useMemo(() => countryList().getData(), []);
}

/** Native select styled like the design's dropdowns. */
export function Select({ id, value, onChange, placeholder = 'Select Option', options, className = '', ...rest }) {
    return (
        <select
            id={id}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${selectClass} ${className} ${value ? '' : 'text-gray-400'}`}
            style={{ backgroundImage: chevron }}
            {...rest}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((o) => (
                <option key={o.value} value={o.value} className="text-gray-900">
                    {o.label}
                </option>
            ))}
        </select>
    );
}

export function CountrySelect({ placeholder, options: _ignored, ...props }) {
    const countries = useCountries();
    // Always use the full country list, whatever else is passed in.
    return <Select {...props} placeholder={placeholder || 'Select Country'} options={countries} />;
}

/** Shared frame for one question: title, optional subtitle, field(s), Next button. */
export function QuestionShell({ title, subtitle, error, onNext, nextDisabled, children }) {
    return (
        <motion.form
            onSubmit={(e) => {
                e.preventDefault();
                onNext();
            }}
            noValidate
            className="mx-auto flex max-w-lg flex-col items-center text-center"
        >
            <h1 id="question-title" className="text-2xl font-semibold leading-snug text-black">
                {title}
            </h1>
            {subtitle && <p className="mt-2 max-w-md text-xs text-gray-400">{subtitle}</p>}
            <div className="mt-8 w-full max-w-sm text-left">{children}</div>
            {error && (
                <p className="mt-3 text-xs text-red-500" role="alert">
                    {error}
                </p>
            )}
            <motion.button
                type="submit"
                disabled={nextDisabled}
                whileHover={nextDisabled ? undefined : { scale: 1.03 }}
                whileTap={nextDisabled ? undefined : { scale: 0.97 }}
                className="mt-10 rounded-lg bg-[#2F6FED] px-14 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#245ad0] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </motion.button>
        </motion.form>
    );
}

/** One dropdown question (country, yes/no, etc.). */
export function SelectQuestion({ title, subtitle, value, options, country = false, placeholder, onNext }) {
    const [picked, setPicked] = useState(value || '');
    const [error, setError] = useState('');
    const Field = country ? CountrySelect : Select;
    return (
        <QuestionShell
            title={title}
            subtitle={subtitle}
            error={error}
            onNext={() => (picked ? onNext(picked) : setError('Please choose an option to continue.'))}
        >
            <Field
                id="answer"
                aria-labelledby="question-title"
                value={picked}
                options={options}
                placeholder={placeholder}
                onChange={(v) => {
                    setPicked(v);
                    setError('');
                }}
            />
        </QuestionShell>
    );
}

/** A list of countries with "+" to add more, e.g. countries visited. */
export function CountryList({ values, onChange, label }) {
    const list = values.length ? values : [''];
    const set = (i, v) => onChange(list.map((x, j) => (j === i ? v : x)));
    return (
        <div className="space-y-2">
            {list.map((country, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    <CountrySelect value={country} onChange={(v) => set(i, v)} aria-label={`${label} ${i + 1}`} />
                    {i === list.length - 1 ? (
                        <button
                            type="button"
                            onClick={() => onChange([...list, ''])}
                            disabled={!country}
                            aria-label="Add another country"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2F6FED] text-[#2F6FED] transition-colors hover:bg-[#2F6FED]/10 disabled:border-gray-300 disabled:text-gray-300"
                        >
                            <TbPlus className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onChange(list.filter((_, j) => j !== i))}
                            aria-label="Remove country"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                            <TbX className="h-4 w-4" />
                        </button>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

export function CountriesVisitedQuestion({ value, onNext }) {
    const [countries, setCountries] = useState(value?.length ? value : ['']);
    const [none, setNone] = useState(Array.isArray(value) && value.length === 0);
    const [error, setError] = useState('');
    const chosen = countries.filter(Boolean);
    return (
        <QuestionShell
            title="List countries you have visited in the last 5 years that require a visa."
            error={error}
            onNext={() => {
                if (none) return onNext([]);
                if (!chosen.length) return setError('Add at least one country, or tick "None".');
                return onNext([...new Set(chosen)]);
            }}
        >
            {!none && (
                <CountryList
                    values={countries}
                    label="Country visited"
                    onChange={(v) => {
                        setCountries(v);
                        setError('');
                    }}
                />
            )}
            <label className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <input
                    type="checkbox"
                    checked={none}
                    onChange={(e) => {
                        setNone(e.target.checked);
                        setError('');
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-[#2F6FED] focus:ring-[#2F6FED]"
                />
                None, I haven&apos;t visited any
            </label>
        </QuestionShell>
    );
}

export function LengthOfStayQuestion({ value, onNext }) {
    const [amount, setAmount] = useState(value?.amount ? String(value.amount) : '');
    const [unit, setUnit] = useState(value?.unit || '');
    const [error, setError] = useState('');
    return (
        <QuestionShell
            title="What is your intended length of stay?"
            error={error}
            onNext={() => {
                const n = Number(amount);
                if (!Number.isInteger(n) || n < 1) return setError('Enter how long you plan to stay.');
                if (!unit) return setError('Choose days, weeks or months.');
                return onNext({ amount: n, unit });
            }}
        >
            <div className="grid grid-cols-2 gap-3">
                <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="Type number"
                    aria-label="Length of stay"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value);
                        setError('');
                    }}
                    className={inputClass}
                />
                <Select
                    aria-label="Unit"
                    placeholder="Select a number"
                    value={unit}
                    options={STAY_UNITS}
                    onChange={(v) => {
                        setUnit(v);
                        setError('');
                    }}
                />
            </div>
        </QuestionShell>
    );
}

export function BudgetQuestion({ value, onNext }) {
    const [amount, setAmount] = useState(value?.amount ? String(value.amount) : '');
    const [currency, setCurrency] = useState(value?.currency || 'NGN');
    const [error, setError] = useState('');
    return (
        <QuestionShell
            title="How much do you intend to spend for the trip?"
            error={error}
            onNext={() => {
                const n = Number(String(amount).replace(/,/g, ''));
                if (!Number.isFinite(n) || n <= 0) return setError('Enter an amount.');
                return onNext({ amount: n, currency });
            }}
        >
            <div className="flex gap-2">
                <select
                    aria-label="Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    // Override selectClass's w-full so the amount box keeps its space.
                    className={`${selectClass.replace('w-full ', '')} w-28 shrink-0`}
                    style={{ backgroundImage: chevron }}
                >
                    {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Amount"
                    aria-label="Amount"
                    value={amount}
                    onChange={(e) => {
                        setAmount(e.target.value.replace(/[^\d.,]/g, ''));
                        setError('');
                    }}
                    className={`${inputClass} min-w-0 flex-1`}
                />
            </div>
        </QuestionShell>
    );
}

/** "Have you ever been refused a visa?" with countries + reason when the answer is Yes. */
export function RefusalQuestion({ value, onNext }) {
    const [answer, setAnswer] = useState(value?.answer || '');
    const [countries, setCountries] = useState(value?.countries?.length ? value.countries : ['']);
    const [reason, setReason] = useState(value?.reason || '');
    const [error, setError] = useState('');
    return (
        <QuestionShell
            title="Have you ever been refused a visa for any country?"
            error={error}
            onNext={() => {
                if (!answer) return setError('Please choose an option to continue.');
                if (answer === 'no') return onNext({ answer });
                const chosen = [...new Set(countries.filter(Boolean))];
                if (!chosen.length) return setError('Select the country that refused your visa.');
                if (!reason.trim()) return setError('Tell us briefly why you were refused.');
                return onNext({ answer, countries: chosen, reason: reason.trim() });
            }}
        >
            <Select
                aria-labelledby="question-title"
                value={answer}
                options={YES_NO}
                onChange={(v) => {
                    setAnswer(v);
                    setError('');
                }}
            />
            {answer === 'yes' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-5 space-y-5">
                    <div>
                        <p className="mb-1.5 text-xs font-medium text-gray-800">
                            Country<span className="text-red-500">*</span>
                        </p>
                        <CountryList values={countries} label="Refusing country" onChange={setCountries} />
                    </div>
                    <div>
                        <label htmlFor="refusal-reason" className="mb-1.5 block text-xs font-medium text-gray-800">
                            Please give reason why you were refused.{' '}
                            <span className="font-normal italic text-gray-400">(You can refer to the refusal notice if available)</span>
                        </label>
                        <textarea
                            id="refusal-reason"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className={`${inputClass} resize-none`}
                        />
                    </div>
                </motion.div>
            )}
        </QuestionShell>
    );
}
