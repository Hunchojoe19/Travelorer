import React from 'react';

const Evaluate = () => {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Evaluate</h2>
                <p className="text-gray-400 text-sm uppercase tracking-wide">A Transparent way to manage your travel reputation</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side Content */}
                <div className="order-2 md:order-1 px-8">
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full mb-4 uppercase">
                        Get Credit Score
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Test your eligibility,<br /> with confidence.</h3>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Check your immigration interest to determine
                        and verify financial range, job listings,
                        and our custom built smart AI detects
                        inaccurate data.
                    </p>
                </div>

                {/* Right Side Mockup */}
                <div className="order-1 md:order-2 flex justify-center">
                    <div className="relative w-64 md:w-72 bg-white rounded-[2.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
                        {/* Simulated Phone Screen */}
                        <div className="bg-gray-100 h-full pt-8 pb-4 flex flex-col items-center">
                            <div className="w-full bg-white p-4 mb-2 shadow-sm rounded-b-2xl">
                                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                            </div>
                            {/* Gauge/Score Visual */}
                            <div className="mt-8 relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                    <circle cx="50" cy="50" r="40" stroke="#22c55e" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" />
                                </svg>
                                <div className="absolute text-5xl font-bold text-gray-900">58</div>
                            </div>

                            {/* List items */}
                            <div className="px-4 w-full mt-8 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="h-2 w-full bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section (Rejections/Reviews) */}
            <div className="mt-24 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
                <div className="relative w-full md:w-1/2 h-64 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center group hover:shadow-xl transition-shadow">
                    <div className="text-8xl text-purple-600 opacity-20 group-hover:scale-110 transition-transform">
                        <FaShieldAlt /> {/* Just reusing an icon as placeholder for Magnifying glass */}
                    </div>
                    <div className="absolute bottom-6 left-6 flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Rejections, Reviews & <br /> Reapplications.</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Our professional and legal experts review your
                        records, appeals and administrative support that
                        measure the risks for complex complicated
                        travelers and data-driven users.
                    </p>
                </div>
            </div>
        </section>
    );
};
import { FaShieldAlt } from 'react-icons/fa';

export default Evaluate;
