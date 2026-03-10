import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useMutation } from '@tanstack/react-query';
import { registerWaitlist } from '../../api/waitlistApi';

const WaitlistForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        nationality: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get the list of all countries
    const countries = useMemo(() => countryList().getData(), []);

    const waitlistMutation = useMutation({
        mutationFn: registerWaitlist,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const apiPayload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phoneNumber,
                nationality: formData.nationality
            };

            await waitlistMutation.mutateAsync(apiPayload);

            // Trigger success callback
            onSuccess(formData.email);

            // Reset form
            setFormData({
                firstName: '', lastName: '', email: '', phoneNumber: '', nationality: ''
            });
        } catch (error) {
            console.error('Error saving to waitlist:', error);
            toast.error(`Failed to join waitlist: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all" required disabled={isSubmitting} />
            </motion.div>

            {/* Last Name */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name*</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all" required disabled={isSubmitting} />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all" required disabled={isSubmitting} />
            </motion.div>

            {/* Phone Number */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number*</label>
                <PhoneInput international defaultCountry="US" value={formData.phoneNumber} onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value || '' }))} className="phone-input-custom" disabled={isSubmitting} required />
            </motion.div>

            {/* Nationality */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality*</label>
                <select name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all bg-white" required disabled={isSubmitting}>
                    <option value="">Select your nationality</option>
                    {countries.map((country) => (
                        <option key={country.value} value={country.label}>{country.label}</option>
                    ))}
                </select>
            </motion.div>

            {/* Submit Button */}
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }} type="submit" disabled={isSubmitting || waitlistMutation.isPending} className={`w-[180px] flex justify-self-center justify-center items-center mt-8 px-4 py-3 text-white rounded-full font-semibold transition-all shadow-xl ${(isSubmitting || waitlistMutation.isPending) ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900 hover:scale-105'}`}>
                {(isSubmitting || waitlistMutation.isPending) ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Joining...</span>
                    </div>
                ) : ('Join waitlist')}
            </motion.button>
        </form>
    );
};

export default WaitlistForm;
