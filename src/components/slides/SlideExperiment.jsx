import React from 'react';
import { motion } from 'framer-motion';
import ZoomableImage from '../common/ZoomableImage';

export default function SlideExperiment() {
    return (
        <div className="flex flex-col h-full justify-center max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h3 className="text-tech-blue uppercase tracking-widest text-sm font-semibold mb-2">Scientific Investigation</h3>
                <h2 className="text-5xl font-serif text-white mb-6">An Investigation into Simpson's Paradox</h2>
                <div className="bg-blue-900/20 border border-blue-500/30 inline-block px-8 py-4 rounded-full">
                    <p className="text-blue-200 text-lg">
                        <span className="font-bold">Hypothesis:</span> Do chemical rules for quality <em>flip</em> between Red and White wines?
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Visual Evidence */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-4 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] h-[600px] flex flex-col"
                >
                    <p className="text-black text-center text-xs font-bold uppercase mb-4">Combined Feature Importance</p>
                    <ZoomableImage
                        src="/assets/ml-project/images/combined/combined_feature_importance.png"
                        className="w-full flex-1 object-contain rounded"
                        alt="Feature Importance"
                        containerClassName="h-full flex flex-col"
                    />
                    <div className="mt-4 text-center shrink-0">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full border border-red-300">
                            Result: 'type' is ranked LAST (Importance ≈ 0)
                        </span>
                    </div>
                </motion.div>

                {/* Conclusion Text */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                >
                    <div className="border-l-4 border-green-500 pl-6">
                        <h4 className="text-green-400 font-bold text-2xl mb-2">Conclusion: No Paradox</h4>
                        <p className="text-gray-300 leading-relaxed">
                            The model ignored the <code className="text-wine-gold">type</code> feature (Red vs White). This proves that <strong>Quality is Universal</strong>.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h5 className="text-white font-bold mb-3">Universal Chemical Balance:</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✔</span> High Alcohol is always Good.
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">✔</span> High Volatile Acidity is always Bad (Fault).
                            </li>
                        </ul>
                    </div>

                    {/* NEW: Benchmark Table per Report Section 5.3 */}
                    <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                        <h5 className="text-tech-blue font-bold text-xs uppercase mb-3 text-center tracking-widest">Combined Performance Benchmark</h5>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-gray-500 border-b border-white/10">
                                    <th className="text-left pb-1">Model</th>
                                    <th className="pb-1 text-center">Accuracy</th>
                                    <th className="pb-1 text-center text-wine-gold">F1-Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-400">
                                <tr>
                                    <td className="py-2">Random Forest</td>
                                    <td className="text-center">84.3%</td>
                                    <td className="text-center">0.40</td>
                                </tr>
                                <tr className="bg-tech-blue/10">
                                    <td className="py-2 font-bold text-white">XGBoost (SOTA)</td>
                                    <td className="text-center font-bold text-white">81.0%</td>
                                    <td className="text-center font-bold text-wine-gold">0.58</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-[10px] text-center text-gray-500 mt-2 italic">*XGBoost handles domain shift significantly better (p &lt; 0.05)</p>
                    </div>

                    <p className="text-sm text-gray-500 italic">
                        "A good wine is a good wine, regardless of its color."
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
