import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WaitlistSuccessCard = ({ submittedEmail }) => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center py-6 h-full space-y-6"
        >
            <img
                src="https://fonts.gstatic.com/s/e/notoemoji/latest/2705/512.gif"
                alt="Success Checkmark"
                width="120"
                height="120"
            />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                You have been added to the shortlist!
            </h3>
            <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                You can check your email, <br />
                <span className="font-semibold text-gray-800 break-all">{submittedEmail}</span> <br />
                for more updates.
            </p>
            <button onClick={navigateHome} className='w-28 h-10 rounded-full hover:bg-gray-400 bg-black text-white '>Home</button>
        </motion.div>
    );
};

export default WaitlistSuccessCard;
