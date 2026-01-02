import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ZoomableImage from '../common/ZoomableImage';

export default function SlideTypePrediction() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Classification Overview' },
        { id: 'analysis', label: 'Chemical Differentiators' },
    ];

    return (
        <div className="flex flex-col h-full max-w-7xl mx-auto px-6 py-12">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h3 className="text-tech-purple uppercase tracking-widest text-sm font-semibold mb-2">Part V</h3>
                    <h2 className="text-5xl md:text-6xl font-serif text-white">Blind Type Identification</h2>
                </div>
                <div className="flex gap-4">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-tech-purple text-white font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-tech-purple/20 to-black p-8 rounded-2xl border border-tech-purple/30">
                                <h4 className="text-tech-purple font-bold uppercase tracking-wider mb-4">XGBoost Classifier</h4>
                                <p className="text-3xl text-white font-serif mb-2">Can AI distinguish Red vs White?</p>
                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div>
                                        <div className="text-5xl font-mono text-white">99.6%</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">Accuracy</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-mono text-tech-purple">0.999</div>
                                        <div className="text-xs text-gray-400 uppercase mt-1">ROC-AUC</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300 text-lg">
                                By dropping the color and quality labels, we tested if the <strong>chemical signature</strong> alone is enough to identify the wine type.
                                <br /><br />
                                <span className="text-tech-purple font-bold">Verdict:</span> Red and White wines are chemically distinct universes.
                            </p>
                        </div>
                        <div className="bg-white p-2 rounded-xl h-[400px] border border-white/10">
                            <ZoomableImage
                                src="/assets/ml-project/images/type_prediction/confusion_matrix.png"
                                className="w-full h-full object-contain"
                                alt="Type Confusion Matrix"
                                containerClassName="w-full h-full"
                            />
                            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mt-2">Figure: Only ~5 misclassifications out of thousands.</p>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'analysis' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-6">
                        <div className="flex-1 bg-white p-2 rounded-xl relative min-h-[300px]">
                            <ZoomableImage
                                src="/assets/ml-project/images/type_prediction/feature_importance.png"
                                className="w-full h-full object-contain"
                                alt="Feature Importance Type"
                                containerClassName="w-full h-full"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white/5 p-4 rounded-lg border-t-2 border-tech-purple">
                                <h5 className="font-bold text-tech-purple mb-1">Total SO2 (#1)</h5>
                                <p className="text-xs text-gray-300">White wines require significantly higher SO2 for preservation due to lack of tannins.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border-t-2 border-red-500">
                                <h5 className="font-bold text-red-500 mb-1">Volatile Acidity</h5>
                                <p className="text-xs text-gray-300">Red wines naturally allow for higher volatile acidity boundaries.</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg border-t-2 border-blue-400">
                                <h5 className="font-bold text-blue-400 mb-1">Chlorides</h5>
                                <p className="text-xs text-gray-300">Structural differences in salt content also play a differentiating role.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
