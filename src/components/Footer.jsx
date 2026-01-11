import React from 'react';
import { motion } from 'framer-motion';
import { FaFingerprint, FaChartLine, FaRobot, FaMobileAlt, FaComments } from 'react-icons/fa';

/**
 * Merging Earn content visually with Footer to achieve the overlap effect perfectly.
 */
const CombinedFooter = () => {
    const evaluate_Image = "https://res.cloudinary.com/dc59hhvse/image/upload/v1768155133/Evaluate_Predict_g1s5tw.png"

    // Feature grid items
    const gridItems = [
        { icon: <FaFingerprint className="text-pink-500" />, title: "Fraud Defense", desc: "Protect your data with advanced encryption." },
        { icon: <FaChartLine className="text-green-500" />, title: "Growth Credits", desc: "Earn rewards as you travel more." },
        { icon: <FaRobot className="text-blue-500" />, title: "Intelligent Score", desc: "AI-driven success probability." },
        { icon: <FaMobileAlt className="text-blue-400" />, title: "Affordable Pricing", desc: "Smart tools to fit your budget." },
        { icon: <FaComments className="text-red-400" />, title: "Real-Time Intel", desc: "Up-to-the-minute travel alerts." },
        { icon: <FaChartLine className="text-cyan-400" />, title: "Pre-Built Portfolio", desc: "Ready-made itineraries." },
    ];

    return (
        <>
            {/* Earn Section Portion */}
            <section className="pt-24 bg-white relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-2">Earn</h2>
                    <p className="text-gray-400 text-sm sentence tracking-wide font-medium">A smart way to turn your passion into profits</p>
                </div>

                <div className="max-w-9xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-20">
                    <div className="w-full md:w-5/12">
                        <h3 className="text-4xl font-bold text-brand-text mb-6">Become a Creator,<br /> Maximize Returns.</h3>
                        <p className="text-gray-500 leading-relaxed text-lg lg:max-w-lg">
                            With Earn, you get to list your own
                            experiences and tours, connecting
                            with other avid travelers like you.
                        </p>
                    </div>
                    {/* Phone Mockup that will overlap */}
                    {/* <div className="w-full md:w-fit flex justify-center relative -mb-48 z-20">
                        <div className="relative w-72 bg-white rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
                            <div className="bg-sky-50 h-[500px] pt-10 px-5 pb-4">
                                <div className="bg-blue-500 h-36 rounded-2xl mb-4 w-full shadow-lg"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                                <div className="h-3 w-48 bg-gray-100 rounded mb-8"></div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-24 bg-white rounded-2xl shadow-sm border border-blue-50"></div>
                                    <div className="h-24 bg-white rounded-2xl shadow-sm border border-blue-50"></div>
                                </div>
                            </div>
                        </div>
                       
                        <div className="absolute top-1/2 left-1/2 w-full h-full bg-blue-400 rounded-full filter blur-[100px] opacity-20 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
                    </div> */}
                      <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 h-80 md:h-96"
                >
                    {/* Image container with fixed height */}
                    <div className="h-full w-full flex items-center justify-center p-4">
                        <motion.img
                            src={evaluate_Image}
                            alt="Planning App UI"
                            className="max-h-full max-w-full object-contain"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>
                </div>
            </section>

            {/* Footer / Transparency Section */}
            <div className="relative bg-[#050505] text-white pt-64 pb-16 overflow-hidden -mt-20">
                {/* Top Wave (Flipped) masking the transition */}
                <div className="absolute top-0 left-0 w-full">
                    <svg viewBox="0 0 1440 320" className="w-full h-auto block rotate-180 text-white fill-current">
                        <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-20 text-gray-100">
                        Built for <span className="text-brand-cyan">Transparency</span>, Automated for <span className="text-brand-cyan">Confidence</span>
                    </h2>

                    {/* Feature Grid with Hover Glow */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32 max-w-6xl mx-auto">
                        {gridItems.map((item, idx) => (
                            <div key={idx} className="group relative bg-[#0F0F10] border border-white/5 p-8 rounded-2xl text-left transition-all duration-300 hover:border-brand-blue/30 overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                                {/* Enhanced Splash Gradient - Multi-layer effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    {/* Base gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-purple-500/10"></div>
                                    {/* Radial splash burst from center */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/30 via-transparent to-transparent transform scale-0 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                                    {/* Subtle shimmer effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r(from-transparent via-brand-blue/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                </div>

                                {/* Border glow on hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 p-[1px]">
                                    <div className="h-full w-full rounded-2xl bg-gradient-to-r from-brand-blue/50 via-brand-blue/20 to-brand-blue/50"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="text-3xl mb-5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-3">{item.icon}</div>
                                    <h3 className="font-bold text-xl mb-3 text-gray-100 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA with Gradient Fade */}
                    <div className="relative py-24">
                        {/* Complex gradient background matching description */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-blue-900/5 to-transparent rounded-3xl -z-10"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-3xl -z-10"></div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            We're getting everything <br /> ready for launch. <span className="text-[#FBBF24]">Join our <br /> waitlist for early access.</span>
                        </h2>
                        <p className="text-blue-200/60 mb-10 max-w-lg mx-auto">You'll be assigned a number in order that founders access when we open the doors.</p>

                        <button href="#join" className="cursor-pointer inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Join waitlist
                        </button>
                    </div>

                    <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                        <p>Tourain Inc © 2026</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">TikTok</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CombinedFooter;
