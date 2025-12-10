import React from 'react';
import { motion } from 'framer-motion';

export default function SlideDeployment() {
    return (
        <div className="flex flex-col h-full justify-center max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12 text-center"
            >
                <h3 className="text-green-500 uppercase tracking-widest text-sm font-semibold mb-4">Production Strategy</h3>
                <h2 className="text-5xl font-serif text-white mb-6">Deployment Recommendations</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Matching the right model to the right business need.
                </p>
            </motion.div>

            {/* Deployment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-wine-red/20 border border-wine-red/50 p-8 rounded-2xl hover:bg-wine-red/30 transition-colors group flex flex-col"
                >
                    <div className="text-xs text-wine-red font-bold uppercase tracking-wider mb-4 border-b border-wine-red/30 pb-2">Use Case: Red Wine Line</div>
                    <div className="mb-6 flex-1">
                        <h4 className="text-white text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Random Forest</h4>
                        <span className="text-xs bg-wine-red text-white px-2 py-1 rounded">Tuned for Precision</span>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl">
                        <p className="text-sm text-gray-300 mb-2 font-bold">Why?</p>
                        <p className="text-sm text-gray-400">Highest safety factor. It minimizes False Positives effectively, acting as a strict gatekeeper for premium red wines where quality perception is critical.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-wine-gold/20 border border-wine-gold/50 p-8 rounded-2xl hover:bg-wine-gold/30 transition-colors group flex flex-col"
                >
                    <div className="text-xs text-wine-gold font-bold uppercase tracking-wider mb-4 border-b border-wine-gold/30 pb-2">Use Case: White Wine Line</div>
                    <div className="mb-6 flex-1">
                        <h4 className="text-white text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform">Random Forest</h4>
                        <span className="text-xs bg-wine-gold text-black font-bold px-2 py-1 rounded">Highest Accuracy</span>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl">
                        <p className="text-sm text-gray-300 mb-2 font-bold">Why?</p>
                        <p className="text-sm text-gray-400">Achieves the highest F1-Score (0.60) and Accuracy (81%). It captures the subtle balance of Density and Alcohol better than other models.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-tech-blue/20 border border-tech-blue/50 p-8 rounded-2xl hover:bg-tech-blue/30 transition-colors group shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-8xl">🚀</span>
                    </div>
                    <div className="text-xs text-tech-blue font-bold uppercase tracking-wider mb-4 border-b border-tech-blue/30 pb-2">Use Case: Unified System</div>
                    <div className="mb-6 flex-1">
                        <h4 className="text-white text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform">XGBoost</h4>
                        <span className="text-xs bg-tech-blue text-white px-2 py-1 rounded">Single AI Agent</span>
                    </div>

                    <div className="bg-black/30 p-4 rounded-xl z-10">
                        <p className="text-sm text-gray-300 mb-2 font-bold">Why?</p>
                        <p className="text-sm text-gray-400">Statistically superior handling of the Red/White domain shift. Offers <strong>98% of the performance</strong> of specialized models with <strong className="text-white">50% less engineering maintenance</strong>.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
