import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ZoomableImage from '../common/ZoomableImage';

export default function SlideScorePrediction() {
    const [activeTab, setActiveTab] = useState('performance');

    const tabs = [
        { id: 'performance', label: 'Regression Performance' },
        { id: 'visuals', label: 'Prediction Analysis' },
    ];

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-wine-gold uppercase tracking-widest text-sm font-semibold mb-2">Part IV</h3>
                    <h2 className="text-5xl md:text-6xl font-serif text-white">Exact Quality Score Prediction</h2>
                </div>
                <div className="flex gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-wine-gold text-black font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
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
                            <div className="bg-gradient-to-br from-wine-gold/10 to-black p-8 rounded-2xl border border-wine-gold/30">
                                <h4 className="text-wine-gold font-bold uppercase tracking-wider mb-4">Regression Model</h4>
                                <p className="text-4xl text-white font-serif mb-2">Random Forest Regressor</p>
                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div>
                                        <div className="text-3xl font-mono text-white">0.60</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">RMSE (Avg Error)</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-mono text-wine-gold">0.48</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">R2 Score</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300">
                                While binary classification is useful for filtering, a granular scoring system (0-10) allows for finer inventory grading.
                                <br /><br />
                                <span className="text-wine-gold font-bold">Key Insight:</span> A RMSE of ~0.6 means if a professional sommelier rates a wine 7.0, our AI predicts between 6.4 and 7.6. This is "Human-Expert Level" consistency.
                            </p>
                        </div>

                        <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                            <h4 className="text-gray-400 text-xs uppercase mb-4">Metric Definitions</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-wine-gold font-mono">RMSE</span>
                                    <span><strong>Root Mean Squared Error:</strong> The standard deviation of the prediction errors. Lower is better.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-wine-gold font-mono">R2</span>
                                    <span><strong>R-Squared:</strong> Represents the proportion of variance for the dependent variable that's explained by independent variables.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-wine-gold font-mono">MAE</span>
                                    <span><strong>Mean Absolute Error:</strong> 0.4287. On average, we are less than half a point away from the true score.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'visuals' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-8 h-full">
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">Actual vs Predicted Scores</h4>
                            <div className="bg-white p-2 rounded-xl h-[400px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/score_prediction/actual_vs_predicted.png"
                                    className="w-full h-full object-contain"
                                    alt="Actual vs Predicted"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500">Strong linear trend close to the diagonal ideal line.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-center text-gray-400 uppercase text-xs">Residuals Distribution</h4>
                            <div className="bg-white p-2 rounded-xl h-[400px]">
                                <ZoomableImage
                                    src="/assets/ml-project/images/score_prediction/residuals_distribution.png"
                                    className="w-full h-full object-contain"
                                    alt="Residuals"
                                    containerClassName="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-500">Normal distribution centered at 0, indicating an unbiased model.</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
