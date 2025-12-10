import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SlideBusinessValue() {
    return (
        <div className="flex flex-col h-full justify-center max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <h3 className="text-wine-gold uppercase tracking-widest text-sm font-semibold mb-4">Future Outlook</h3>
                <h2 className="text-5xl font-serif text-white mb-6">Optimizing for Business Value</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Moving from academic F1-Scores to real-world Cost-Sensitive Learning.
                </p>
            </motion.div>

            {/* The Balance Scale Visual - Massively increased height and margins for safety */}
            <div className="relative h-[450px] mb-8 max-w-5xl mx-auto w-full">
                {/* Fulcrum */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[60px] border-b-gray-600 z-10"></div>

                {/* Beam - Tilted to show cost weight */}
                <motion.div
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: -5 }}
                    transition={{ type: "spring", stiffness: 40, delay: 0.5 }}
                    className="absolute bottom-[130px] left-0 w-full h-4 bg-gray-500 rounded-full origin-center"
                >
                    {/* Left Plate (False Positive) - HEAVY */}
                    <div className="absolute left-0 -top-12 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-red-900/40 to-black border-2 border-red-500/50 flex flex-col items-center justify-center p-6 text-center shadow-[0_0_60px_rgba(220,38,38,0.4)] backdrop-blur-sm animate-pulse-slow">
                            <h4 className="text-red-400 font-bold uppercase text-sm mb-2">False Positive</h4>
                            <p className="text-xs text-white/80 leading-tight">Selling Bad Wine as Premium</p>
                            <div className="mt-3 text-red-500 font-bold text-lg bg-black/50 px-3 py-1 rounded-full border border-red-500/30">COST: $$$$</div>
                        </div>
                        <div className="h-16 w-1 bg-gray-400/50"></div>
                    </div>

                    {/* Right Plate (False Negative) - LIGHT */}
                    <div className="absolute right-0 -top-12 translate-x-1/2 flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-900/40 to-black border-2 border-blue-500/50 flex flex-col items-center justify-center p-4 text-center shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-sm">
                            <h4 className="text-blue-400 font-bold uppercase text-xs mb-2">False Negative</h4>
                            <p className="text-[10px] text-white/80 leading-tight">Missed Opportunity</p>
                            <div className="mt-2 text-blue-400 font-bold text-sm">COST: $</div>
                        </div>
                        <div className="h-16 w-1 bg-gray-400/50"></div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 border-l-4 border-wine-gold p-6 rounded-r-xl max-w-3xl mx-auto mb-12"
            >
                <p className="text-lg text-gray-200 italic">
                    "In a real winery, brand damage from a bad bottle is far more costly than missing a sale. Future models will optimize a <strong>Cost Matrix</strong> rather than just Accuracy."
                </p>
            </motion.div>


        </div>
    );
}
