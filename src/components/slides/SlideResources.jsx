import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SlideResources = () => {
    return (
        <div className="w-full relative z-10 font-sans h-screen flex flex-col items-center justify-center text-center p-8 bg-black/20">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter loading-text">
                    Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-wine-red to-wine-gold">Resources</span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                    Explore the complete analysis, methodology, and source code behind this project.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Report Button - Cleaned (No Emoji) */}
                    <Link
                        to="/report"
                        className="group relative px-10 py-5 bg-gradient-to-tr from-white/5 to-white/10 hover:from-wine-red/20 hover:to-wine-red/40 border border-white/20 hover:border-wine-red/50 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(163,22,33,0.3)] overflow-hidden"
                    >
                        <span className="relative z-10">Read Full Project Report</span>
                        <div className="absolute inset-0 bg-wine-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>

                    {/* GitHub Button */}
                    <a
                        href="https://github.com/ozyusuf/wine-quality-ml-project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-10 py-5 bg-gradient-to-tr from-white/5 to-white/10 hover:from-gray-800 hover:to-black border border-white/20 hover:border-white/50 text-gray-300 hover:text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-3 overflow-hidden"
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="relative z-10">GitHub Repository</span>
                    </a>
                </div>

            </motion.div>
        </div>
    );
};

export default SlideResources;
