import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SuccessModal from '../components/SuccessModal';
import WaitlistHeader from '../components/waitlist/WaitlistHeader';
import WaitlistForm from '../components/waitlist/WaitlistForm';
import WaitlistSuccessCard from '../components/waitlist/WaitlistSuccessCard';

const Waitlist = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');

    const handleSuccess = (email) => {
        setIsSuccess(true);
        setShowSuccessModal(true);
        setSubmittedEmail(email);
    };

    const handleCloseModal = () => setShowSuccessModal(false);

    return (
        <div className="min-h-screen relative flex flex-col bg-gray-50 overflow-hidden">
            <Navbar />

            {/* Background Image - Same as screenshot */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dc59hhvse/image/upload/v1768401091/685cc40648a523c6ae809c7e_bg-hero_nmuu2k.png')" }}
            ></div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0276FE] via-[#7CB8FE] to-[#FFFFFF] z-0"></div>

            <div className="relative z-10 w-full flex flex-1 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Container - Flex Row on Desktop */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 w-full my-20 lg:my-0">

                    <WaitlistHeader />

                    {/* Form Container - Animating from the left */}
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="flex-1 w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden"
                    >
                        {isSuccess ? (
                            <WaitlistSuccessCard submittedEmail={submittedEmail} />
                        ) : (
                            <WaitlistForm onSuccess={handleSuccess} />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleCloseModal}
                userEmail={submittedEmail}
            />
        </div>
    );
};

export default Waitlist;
