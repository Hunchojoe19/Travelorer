import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import countryList from 'react-select-country-list';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/15';

function Field({ label, htmlFor, error, children, className = '' }) {
    return (
        <div className={className}>
            <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-gray-800">
                {label}
                <span className="text-red-500">*</span>
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

/** Step 1: personal details "as written on your passport". */
export default function PersonalProfileStep({ initial = {}, onNext }) {
    const countries = useMemo(() => countryList().getData(), []);
    const today = new Date().toISOString().slice(0, 10);
    const [form, setForm] = useState({
        givenName: initial.givenName || '',
        surname: initial.surname || '',
        gender: initial.gender || '',
        dateOfBirth: initial.dateOfBirth || '',
        residentialAddress: initial.residentialAddress || '',
        country: initial.country || '',
        phoneNumber: initial.phoneNumber || '',
    });
    const [errors, setErrors] = useState({});

    const set = (name) => (e) => {
        setForm((prev) => ({ ...prev, [name]: e?.target ? e.target.value : e || '' }));
        // Clear that field's error as soon as the user corrects it.
        setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    };

    const validate = () => {
        const next = {};
        if (!form.givenName.trim()) next.givenName = 'Enter your given name';
        if (!form.surname.trim()) next.surname = 'Enter your surname';
        if (!form.gender) next.gender = 'Select your gender';
        if (!form.dateOfBirth) next.dateOfBirth = 'Enter your date of birth';
        else if (form.dateOfBirth >= today) next.dateOfBirth = 'Date of birth must be in the past';
        if (!form.residentialAddress.trim()) next.residentialAddress = 'Enter your residential address';
        if (!form.country) next.country = 'Select your country';
        if (!form.phoneNumber || !isPossiblePhoneNumber(form.phoneNumber)) next.phoneNumber = 'Enter a valid phone number';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onNext({
            ...form,
            givenName: form.givenName.trim(),
            surname: form.surname.trim(),
            residentialAddress: form.residentialAddress.trim(),
        });
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-[460px]"
            aria-labelledby="personal-title"
        >
            <h1 id="personal-title" className="text-2xl font-semibold text-black">
                Personal Profile
            </h1>
            <p className="mt-1 text-[11px] text-gray-400">*As written on your passport</p>

            <form onSubmit={submit} noValidate className="mt-8 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
                <Field label="Given name" htmlFor="givenName" error={errors.givenName}>
                    <input id="givenName" autoComplete="given-name" className={inputClass} value={form.givenName} onChange={set('givenName')} />
                </Field>
                <Field label="Surname" htmlFor="surname" error={errors.surname}>
                    <input id="surname" autoComplete="family-name" className={inputClass} value={form.surname} onChange={set('surname')} />
                </Field>
                <Field label="Gender" htmlFor="gender" error={errors.gender}>
                    <select id="gender" className={inputClass} value={form.gender} onChange={set('gender')}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </Field>
                <Field label="Date of Birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
                    <input id="dateOfBirth" type="date" max={today} autoComplete="bday" className={inputClass} value={form.dateOfBirth} onChange={set('dateOfBirth')} />
                </Field>
                <Field label="Residential Address" htmlFor="residentialAddress" error={errors.residentialAddress} className="sm:col-span-2">
                    <textarea
                        id="residentialAddress"
                        rows={3}
                        autoComplete="street-address"
                        className={`${inputClass} resize-none`}
                        value={form.residentialAddress}
                        onChange={set('residentialAddress')}
                    />
                </Field>
                <Field label="Country" htmlFor="country" error={errors.country}>
                    <select id="country" className={inputClass} value={form.country} onChange={set('country')}>
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Phone Number" htmlFor="phoneNumber" error={errors.phoneNumber}>
                    <PhoneInput
                        id="phoneNumber"
                        international
                        defaultCountry={form.country || 'NG'}
                        value={form.phoneNumber}
                        onChange={set('phoneNumber')}
                        className="phone-input-custom"
                    />
                </Field>

                <div className="mt-4 flex justify-center sm:col-span-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-[#2F6FED] px-14 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#245ad0]"
                    >
                        Next
                    </button>
                </div>
            </form>
        </motion.section>
    );
}
