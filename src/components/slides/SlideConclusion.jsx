import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ZoomableImage from '../common/ZoomableImage';

export default function SlideConclusion() {
    const [activeTab, setActiveTab] = useState('model_analysis');

    const tabs = [
        { id: 'model_analysis', label: 'Unified Model Analysis' },
        { id: 'visuals', label: 'Evaluation Visuals' },
    ];

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-tech-blue uppercase tracking-widest text-sm font-semibold mb-2">Final Recommendations</h3>
                    <h2 className="text-6xl font-serif text-white">The Unified Model</h2>
                </div>
                <div className="flex gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-tech-blue text-white font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === 'model_analysis' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-12 gap-12 h-full">
                        {/* Left: Metrics & Hero Info */}
                        <div className="md:col-span-5 flex flex-col justify-center">
                            <div className="bg-gradient-to-br from-tech-blue/20 to-black p-8 rounded-3xl border border-tech-blue/30 w-full mb-8">
                                <h4 className="text-tech-blue font-bold uppercase tracking-wider mb-2">Champion Model</h4>
                                <h2 className="text-4xl font-serif text-white mb-6">XGBoost Optimized</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Accuracy</span>
                                        <span className="text-white font-mono text-xl">81.0%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">F1-Score</span>
                                        <span className="text-wine-gold font-mono text-xl">0.584</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">ROC-AUC</span>
                                        <span className="text-tech-blue font-mono text-xl">0.85</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                                <p className="text-gray-300 text-sm italic">
                                    "Merging datasets acts as valid <span className="text-white font-bold">Data Augmentation</span>. The unified model handles the domain shift without loss of performance."
                                </p>
                            </div>
                        </div>

                        {/* Right: Comparison Table & Analysis */}
                        <div className="md:col-span-7 flex flex-col justify-center">
                            <h3 className="text-xl text-white font-serif mb-4">Benchmark: Random Forest vs XGBoost</h3>
                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden mb-6">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/5 text-gray-400 text-xs uppercase">
                                            <th className="p-4">Model</th>
                                            <th className="p-4 text-center">F1-Score</th>
                                            <th className="p-4">Stat. Significance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        <tr className="text-gray-500">
                                            <td className="p-4">Random Forest</td>
                                            <td className="p-4 text-center">0.4014</td>
                                            <td className="p-4">Baseline</td>
                                        </tr>
                                        <tr className="bg-tech-blue/10 text-white font-bold">
                                            <td className="p-4">XGBoost</td>
                                            <td className="p-4 text-center text-wine-gold">0.5844</td>
                                            <td className="p-4 text-tech-blue">Superior (p &lt; 0.05)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
                                <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">Why XGBoost Wins?</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Unlike Random Forest, XGBoost's gradient boosting mechanism better captures the <strong>complex non-linear interactions</strong> between the red/white domains and chemical features. Proper hyperparameter tuning allowed it to adapt to the combined distribution where Random Forest struggled to generalize (evidenced by the 18% F1-score gap).
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'visuals' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full overflow-y-auto pb-12">
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">ROC Curve (AUC = 0.85)</h4>
                            <div className="bg-white p-2 rounded-xl h-[350px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/combined/combined_xgb_roc_curve.png"
                                    className="w-full h-full object-contain"
                                    alt="Combined ROC"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500 pb-4">Demonstrates strong separation capability across the unified dataset.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">Confusion Matrix</h4>
                            <div className="bg-white p-2 rounded-xl h-[350px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/combined/combined_confusion_matrix.png"
                                    className="w-full h-full object-contain"
                                    alt="Combined CM"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500 pb-4">Consistent performance across both Red and White wine samples.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
