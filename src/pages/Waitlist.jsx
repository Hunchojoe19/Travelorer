import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import SuccessModal from '../components/SuccessModal';
import countryList from 'react-select-country-list';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Waitlist = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        nationality: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Get the list of all countries
    const countries = useMemo(() => countryList().getData(), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Save to Firestore
            await addDoc(collection(db, 'waitlist'), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                nationality: formData.nationality,
                createdAt: serverTimestamp()
            });

            // Show success modal
            setShowSuccessModal(true);

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                nationality: ''
            });
        } catch (error) {
            console.error('Error saving to waitlist:', error);
            toast.error('Failed to join waitlist. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        // Optionally navigate to home after closing modal
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    // Typewriter text
    const subtextContent = "Sign up below to join the Beta group waitlist and get our latest updates straight to your inbox.";

    return (
        <div className="min-h-screen relative flex flex-col bg-gray-50 overflow-hidden">
            <Navbar />

            {/* Background Image - Same as screenshot */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dc59hhvse/image/upload/v1768401091/685cc40648a523c6ae809c7e_bg-hero_nmuu2k.png')" }}
            ></div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6F0FF]/40 to-white/20 z-0"></div>

            <div className="relative z-10 w-full flex flex-1 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Container - Flex Row on Desktop */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 w-full my-20 lg:my-0">

                    {/* Header Text - Animating from the left */}
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center lg:text-left lg:max-w-md py-12 relative"
                    >
                        {/* Animated Plane flying in a circular path */}
                        <motion.div
                            className="absolute text-4xl z-10"
                            animate={{
                                x: [0, 120, 120, 0, 0],
                                y: [0, 0, 100, 100, 0],
                                rotate: [0, 90, 180, 270, 360]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                top: '-30px',
                                left: '50%',
                                marginLeft: '-20px'
                            }}
                        >
                            ✈️
                        </motion.div>

                        <h1 className="text-7xl md:text-[96px] font-bold text-white mb-4 lg:mb-6">
                            JOIN THE WAITLIST
                        </h1>
                        <p className="text-gray-600 font-light text-sm md:text-base lg:text-lg leading-relaxed">
                            {Array.from(subtextContent).map((char, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.05,
                                        delay: 0.8 + index * 0.02
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </p>
                    </motion.div>

                    {/* Form Container - Animating from the left */}
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name*
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                                    required
                                    disabled={isSubmitting}
                                />
                            </motion.div>

                            {/* Last Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name*
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                                    required
                                    disabled={isSubmitting}
                                />
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all"
                                    required
                                    disabled={isSubmitting}
                                />
                            </motion.div>

                            {/* Phone Number */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number*
                                </label>
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={formData.phoneNumber}
                                    onChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value || '' }))}
                                    className="phone-input-custom"
                                    disabled={isSubmitting}
                                    required
                                />
                            </motion.div>

                            {/* Nationality */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nationality*
                                </label>
                                <select
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none transition-all bg-white"
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select your nationality</option>
                                    {countries.map((country) => (
                                        <option key={country.value} value={country.label}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-[180px] flex justify-self-center justify-center items-center mt-8 px-4 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-all hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Joining...</span>
                                    </div>
                                ) : (
                                    'Join waitlist'
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseModal}
                userEmail={formData.email}
            />
        </div>
    );
};

export default Waitlist;
