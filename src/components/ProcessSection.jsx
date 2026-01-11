import React from 'react';
import { FaGlobeAmericas, FaWifi, FaUserShield, FaCheckCircle, FaRobot } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const ProcessSection = () => {
    const steps = [
        { icon: <FaGlobeAmericas />, label: "Anytime, Anywhere", color: "text-blue-500" },
        { icon: <FaWifi />, label: "Real-time Intelligence", color: "text-indigo-500" },
        { icon: <FaUserShield />, label: "Data Privacy", color: "text-cyan-500" },
        { icon: <FaCheckCircle />, label: "Full Transparency", color: "text-sky-500" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-8">
                    <HiSparkles className="text-blue-500" />
                    AI-powered Intelligence
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
                    Got a Destination? <br />
                    <span className="text-brand-blue">We'll handle the Details</span>
                </h2>

                <p className="text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
                    Experience text identification with Tourain for visa options.
                    We use real-time data, documents, and secure verification.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center group cursor-pointer">
                            <div className={`w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl ${step.color} mb-6 transition-transform group-hover:scale-110 shadow-sm border border-blue-100`}>
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm">{step.label}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
