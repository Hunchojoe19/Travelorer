import React from 'react';
import { FaGlobeAmericas, FaCheckCircle, FaUserShield } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import GroupPeople from '../assets/Group_People.svg';
import SafeGuard from '../assets/SafeGuard.svg';
import Instant from '../assets/Instant.svg';

const ProcessSection = () => {
    const steps = [
        { icon: <FaGlobeAmericas />, label: "Anytime, Anywhere", color: "text-blue-500" },
        { icon: <img src={GroupPeople} alt="Real-time Intelligence" className="w-7 h-7" />, label: "Real-time Intelligence", color: "text-indigo-500" },
        { icon: <img src={Instant} alt="Instant & Intuitive" className="w-7 h-7" />, label: "Instant, Intuitive", color: "text-cyan-500" },
        { icon: <img src={SafeGuard} alt="Safe & Secure" className="w-7 h-7" />, label: "Safe, Secure", color: "text-sky-500" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex border border-[#0276FE] items-center gap-2 px-4 py-2 bg-blue-50 text-[#0276FE] rounded-xl text-sm font-semibold mb-8">
                    <HiSparkles className="text-[#0276FE]" />
                    AI-powered Intelligence
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-[#0276FE] mb-6">
                    Got a Destination? <br />
                    <span className="text-[#0276FE]">We'll handle the Details</span>
                </h2>

                {/* <p className="text-gray-500 max-w-lg mx-auto mb-16 leading-relaxed">
                    Experience text identification with Tourain for visa options.
                    We use real-time data, documents, and secure verification.
                </p> */}
                <p className="text-gray-500 max-w-xl mx-auto mb-16 leading-relaxed">
                Experience next-level efficiency with Tourain’s AI-driven platform
                with smart tools that save time, reduce friction, and enhance collaboration.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            <div className="flex flex-col items-center group cursor-pointer">
                                <div className={`w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-3xl ${step.color} mb-6 transition-transform group-hover:scale-110 shadow-sm border border-blue-100`}>
                                    {step.icon}
                                </div>
                                <h3 className="font-bold text-[#0276FE] text-sm">{step.label}</h3>
                            </div>

                            {/* splash underneath the card (behind) */}
                            <div className="absolute inset-0 -z-10 flex items-end justify-center pointer-events-none">
                                {/* blurred radial splash */}
                                <div className="w-44 md:w-52 h-10 md:h-12 rounded-full bg-[#0276FE]/20 blur-3xl opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1" />

                                {/* subtle spark element */}
                                <div className="absolute -right-2 -top-3 w-3 h-3 bg-[#0276FE] rounded-full opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 animate-pulse" />
                            </div>

                            {/* faint outer ring for structure (still outside) */}
                            <div className="absolute -inset-2 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="w-full h-full rounded-xl ring-8 ring-[#0276FE]/10"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
