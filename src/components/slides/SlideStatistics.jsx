import React from 'react';
import { motion } from 'framer-motion';

export default function SlideStatistics() {
    return (
        <div className="flex flex-col h-full justify-center max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-10 text-center"
            >
                <h3 className="text-wine-gold uppercase tracking-widest text-sm font-semibold mb-2">Dataset Statistics</h3>
                <h2 className="text-5xl font-serif text-white mb-4">Understanding the Chemical Fingerprint</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-4 space-y-4 flex flex-col justify-center"
                >
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-wine-gold/30 transition-colors">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Total Samples</h4>
                        <p className="text-5xl font-mono text-white">5,320</p>
                        <p className="text-xs text-gray-500 mt-2">After cleaning duplicates</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-wine-red/10 p-5 rounded-2xl border border-wine-red/20">
                            <h4 className="text-wine-red text-xs uppercase tracking-wider mb-1">Red Wine</h4>
                            <p className="text-2xl font-mono text-white">1,359</p>
                            <p className="text-[10px] text-gray-400 mt-1">~13.6% Good</p>
                        </div>
                        <div className="bg-wine-gold/10 p-5 rounded-2xl border border-wine-gold/20">
                            <h4 className="text-wine-gold text-xs uppercase tracking-wider mb-1">White Wine</h4>
                            <p className="text-2xl font-mono text-white">3,961</p>
                            <p className="text-[10px] text-gray-400 mt-1">~18.0% Good</p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Input Features</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Alcohol', 'Sulphates', 'Volatile Acidity', 'Density', 'pH', 'Chlorides'].map(f => (
                                <span key={f} className="text-xs bg-black/50 px-2 py-1 rounded text-gray-300 border border-white/5">{f}</span>
                            ))}
                            <span className="text-xs text-gray-500 self-center">+5 more</span>
                        </div>
                    </div>
                </motion.div>

                {/* Images Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-8 grid grid-cols-1 gap-8"
                >
                    <div className="space-y-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 h-[350px] flex flex-col items-center justify-center">
                            <img src="/assets/ml-project/images/red-wine/red_wine_distribution_v3.png" alt="Red Wine Dist" className="h-full w-auto max-w-full rounded object-contain" />
                        </div>
                        <p className="text-center text-xs text-gray-500 uppercase tracking-widest">Figure 1: Red Wine Quality Distribution</p>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 h-[350px] flex flex-col items-center justify-center">
                            <img src="/assets/ml-project/images/white-wine/07_class_distribution_v3.png" alt="White Wine Dist" className="h-full w-auto max-w-full rounded object-contain" />
                        </div>
                        <p className="text-center text-xs text-gray-500 uppercase tracking-widest">Figure 2: White Wine Quality Distribution</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
