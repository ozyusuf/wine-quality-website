import React from 'react';
import { motion } from 'framer-motion';

export default function SlideDefiningTarget() {
    return (
        <div className="flex flex-col h-full justify-center max-w-6xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h3 className="text-wine-gold uppercase tracking-widest text-sm font-semibold mb-4">Defining the Target</h3>
                <h2 className="text-5xl font-serif text-white mb-6">Defining "Premium": The First Critical Decision</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Transforming a 0-10 quality score into a binary classification task requires balancing realism with feasibility.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Visual: Bar Charts mimicking threshold logic */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-wine-gold/30 transition-colors">
                        <h4 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Threshold Impact Analysis</h4>
                        <div className="flex h-56 gap-4 items-stretch">
                            {/* Threshold 6 */}
                            <div className="w-1/3 flex flex-col items-center gap-2">
                                <span className="text-lg text-gray-500 font-mono font-bold">Score ≥ 6</span>
                                <div className="w-full bg-white/5 rounded-t-lg relative flex-1 flex items-end group">
                                    <div className="w-full bg-blue-500/30 h-[49%] rounded-t-sm relative group-hover:bg-blue-500/50 transition-all duration-500">
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-blue-200 font-bold text-sm bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">49%</span>
                                    </div>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Too Easy</span>
                            </div>

                            {/* Threshold 7 - Highlighted */}
                            <div className="w-1/3 flex flex-col items-center gap-2">
                                <span className="text-2xl text-wine-gold font-bold font-mono">Score ≥ 7</span>
                                <div className="w-full bg-white/5 rounded-t-lg relative flex-1 flex items-end ring-1 ring-wine-gold/30 group shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                    <div className="w-full bg-wine-gold h-[17%] rounded-t-sm relative shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:bg-wine-gold/90 transition-all duration-500">
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-wine-gold font-bold text-xl drop-shadow-lg">17%</span>
                                    </div>
                                </div>
                                <span className="text-xs uppercase tracking-wider text-wine-gold font-bold">Optimal</span>
                            </div>

                            {/* Threshold 8 */}
                            <div className="w-1/3 flex flex-col items-center gap-2">
                                <span className="text-lg text-gray-500 font-mono font-bold">Score ≥ 8</span>
                                <div className="w-full bg-white/5 rounded-t-lg relative flex-1 flex items-end group">
                                    <div className="w-full bg-red-500/30 h-[4.5%] rounded-t-sm relative group-hover:bg-red-500/50 transition-all duration-500">
                                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-red-200 font-bold text-sm bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">4.5%</span>
                                    </div>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Too Sparse</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Data Table */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10"
                >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="pb-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Threshold</th>
                                <th className="pb-4 text-xs uppercase tracking-wider text-gray-500 font-medium text-center">Good Class %</th>
                                <th className="pb-4 text-xs uppercase tracking-wider text-gray-500 font-medium">Verdict</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-sm">
                            <tr className="group">
                                <td className="py-4 text-gray-300">Score ≥ 6</td>
                                <td className="py-4 text-gray-300 text-center">~49%</td>
                                <td className="py-4 text-red-400">Too Balanced / Trivial</td>
                            </tr>
                            <tr className="group bg-wine-gold/10">
                                <td className="py-4 text-wine-gold font-bold">Score ≥ 7</td>
                                <td className="py-4 text-wine-gold font-bold text-center">~17%</td>
                                <td className="py-4 text-wine-gold font-bold">Optimal ("Rare Event")</td>
                            </tr>
                            <tr className="group">
                                <td className="py-4 text-gray-300">Score ≥ 8</td>
                                <td className="py-4 text-gray-300 text-center">~4.5%</td>
                                <td className="py-4 text-red-400">Too Sparse / Unstable</td>
                            </tr>
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
}
