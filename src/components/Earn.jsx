import React from 'react';

const Earn = () => {
    return (
        <section className="py-24 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">Earn</h2>
                <p className="text-gray-400 text-sm mt-2 uppercase tracking-wide">A smart way to turn your passion into profits</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="w-full md:w-5/12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Become a Creator,<br /> Maximize Returns.</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">
                        With Earn, you get to list your own
                        experiences and tours, connecting
                        with other avid travelers like you.
                    </p>
                </div>
                <div className="w-full md:w-fit flex justify-center relative">
                    {/* Phone Mockup repeating similar style */}
                    <div className="relative w-64 md:w-72 bg-white rounded-[2.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden z-10">
                        <div className="bg-sky-50 h-full pt-8 px-4 pb-4">
                            <div className="bg-blue-500 h-32 rounded-2xl mb-4 w-full"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-48 bg-gray-100 rounded mb-6"></div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-20 bg-white rounded-xl shadow-sm"></div>
                                <div className="h-20 bg-white rounded-xl shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 -z-0"></div>
                </div>
            </div>
        </section>
    );
};

export default Earn;
