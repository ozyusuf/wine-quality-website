import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ZoomableImage from '../common/ZoomableImage';

export default function SlideRedWine() {
    const [activeTab, setActiveTab] = useState('performance');

    const tabs = [
        { id: 'performance', label: 'Model Performance' },
        { id: 'shap', label: 'SHAP Analysis' },
        { id: 'visuals', label: 'Confusion Matrix & ROC' },
    ];

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-wine-red uppercase tracking-widest text-sm font-semibold mb-2">Case Study 1</h3>
                    <h2 className="text-6xl font-serif text-white">The Red Wine Analysis</h2>
                </div>
                <div className="flex gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-wine-red text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === 'performance' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start h-full overflow-y-auto pr-2 pb-4">
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-wine-red/20 to-black p-8 rounded-2xl border border-wine-red/30">
                                <h4 className="text-wine-red font-bold uppercase tracking-wider mb-4">Champion Model</h4>
                                <p className="text-4xl text-white font-serif mb-2">Random Forest (Tuned)</p>
                                <div className="grid grid-cols-3 gap-6 mt-8">
                                    <div>
                                        <div className="text-3xl font-mono text-white">83.8%</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">Accuracy</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-mono text-wine-gold">0.55</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">F1-Score</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-mono text-tech-blue">0.87</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">ROC-AUC</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300">
                                Tuned via GridSearchCV. Optimized for <span className="text-wine-red font-bold">Precision</span> to act as a "Gatekeeper" for premium labeling.
                            </p>
                            <div className="bg-white p-2 rounded-xl h-48 border border-white/10">
                                <ZoomableImage
                                    src="/assets/ml-project/images/red-wine/red_cv_distribution.png"
                                    className="w-full h-full object-contain"
                                    alt="CV Dist"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mt-1">Figure: Cross-Validation Score Distribution</p>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                            <h4 className="text-gray-400 text-xs uppercase mb-4">Model Benchmark</h4>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-gray-500">
                                        <th className="text-left pb-2">Model</th>
                                        <th className="pb-2">Accuracy</th>
                                        <th className="pb-2 text-wine-gold">F1-Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="py-3 text-gray-400">Baseline</td>
                                        <td className="py-3 text-center text-gray-400">86.4%</td>
                                        <td className="py-3 text-center text-gray-400">0.00</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-gray-300">Logistic Reg</td>
                                        <td className="py-3 text-center text-gray-300">73.9%</td>
                                        <td className="py-3 text-center text-gray-300">0.49</td>
                                    </tr>
                                    <tr className="bg-wine-red/10">
                                        <td className="py-3 font-bold text-white">Random Forest</td>
                                        <td className="py-3 text-center font-bold text-white">83.8%</td>
                                        <td className="py-3 text-center font-bold text-wine-gold">0.55</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 text-gray-300">XGBoost</td>
                                        <td className="py-3 text-center text-gray-300">86.0%</td>
                                        <td className="py-3 text-center text-gray-300">0.54</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'shap' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-4 overflow-y-auto pb-6">
                        <div className="flex-1 bg-white p-2 rounded-xl relative min-h-[400px]">
                            <ZoomableImage
                                src="/assets/ml-project/images/red-wine/red_shap_summary_dot.png"
                                className="w-full h-full object-contain"
                                alt="SHAP Summary"
                                containerClassName="w-full h-full"
                            />
                        </div>
                        <p className="text-center text-xs text-gray-500 uppercase tracking-widest">Figure: SHAP Summary Plot (Feature Importance & Impact)</p>

                        <div className="grid grid-cols-2 gap-6 shrink-0">
                            <div className="bg-white/5 p-4 rounded-lg border-l-2 border-wine-gold">
                                <h5 className="font-bold text-wine-gold mb-1">Alcohol (Top Driver)</h5>
                                <p className="text-xs text-gray-300">Higher alcohol content strongly pushes quality prediction to 'Good' (Right).</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border-l-2 border-red-500">
                                <h5 className="font-bold text-red-500 mb-1">Volatile Acidity (Fault)</h5>
                                <p className="text-xs text-gray-300">Acts as the "Fault Detector". High acidity strongly pushes prediction to 'Bad' (Left).</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'visuals' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-8 h-full">
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">Confusion Matrix</h4>
                            <div className="bg-white p-2 rounded-xl h-[400px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/red-wine/red_rf_confusion_matrix_v3.png"
                                    className="w-full h-full object-contain"
                                    alt="Confusion Matrix"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500">210 True Negatives vs 25 False Negatives</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">ROC Curve (AUC = 0.87)</h4>
                            <div className="bg-white p-2 rounded-xl h-[400px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/red-wine/red_rf_roc_curve.png"
                                    className="w-full h-full object-contain"
                                    alt="ROC Curve"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
