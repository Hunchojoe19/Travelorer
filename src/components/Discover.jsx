import React from 'react';

const Discover = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">

            {/* Header */}
            <div className="text-center mb-20 relative">
                <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold">How it works</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">Discover</h2>
                <p className="text-gray-400 mt-2">A Simple way to build your strategy faster</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">

                {/* Feature 1: Plan your trip */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Plan your trip in minutes,<br /> not weeks.</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Save hours of research and stops complicating data.
                            Use our app for automated visa results, you
                            can check anywhere in real-time.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="bg-gray-100 rounded-3xl p-6 md:p-10 relative z-10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Mockup UI */}
                            <img
                                src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80"
                                alt="Planning App UI"
                                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48">
                                <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                <div className="h-2 w-32 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Turn inspiration into actions */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Turn inspiration into <br />simplified actions.</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Get tailored recommendations and expert reviews
                            with clearly defined actions to help you
                            make better informed decisions.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="bg-blue-50 rounded-3xl p-8 relative z-10 transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Mockup UI */}
                            <div className="bg-white rounded-2xl shadow-xl p-4 flex gap-4 items-center mb-4">
                                <img src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=100&q=80" className="w-16 h-16 rounded-xl object-cover" />
                                <div>
                                    <div className="font-bold text-gray-800">Santorini Trip</div>
                                    <div className="text-green-500 text-sm font-semibold">Visa Free</div>
                                </div>
                            </div>
                            <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-semibold">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discover;
