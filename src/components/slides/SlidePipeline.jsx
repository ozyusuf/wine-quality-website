import React from 'react';
import { motion } from 'framer-motion';

export default function SlidePipeline() {
    const steps = [
        { icon: "💾", title: "Load Data", desc: "Raw CSV" },
        { icon: "✂️", title: "Split (80/20)", desc: "Stratified" },
        { icon: "🧹", title: "Clean", desc: "Train Only (No Leakage)" },
        { icon: "⚖️", title: "Scale", desc: "Fit Train / Transform All" },
        { icon: "🧠", title: "Train Model", desc: "RF / XGBoost" }
    ];

    return (
        <div className="flex flex-col h-full justify-center max-w-7xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <h3 className="text-wine-gold uppercase tracking-widest text-sm font-semibold mb-4">Pipeline & Methodology</h3>
                <h2 className="text-5xl font-serif text-white mb-6">Building a Bulletproof Pipeline</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Strict adherence to scientific protocols to prevent data leakage and ensure reproducibility.
                </p>
            </motion.div>

            {/* Pipeline Visual */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-20 relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-wine-red/0 via-wine-gold/30 to-wine-red/0 hidden md:block" />

                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center relative z-10 w-32 group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-black border border-white/20 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-wine-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all mb-4">
                            {step.icon}
                        </div>
                        <h4 className="text-white font-semibold text-sm mb-1">{step.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Technical Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl"
                >
                    <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">🛡️</span> Leakage Prevention
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        The test set acts as a "Vault". It is <strong>never touched</strong> during outlier removal or scaling fitting. This ensures our evaluation metrics reflect true generalization performance on unseen, noisy data.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-xl"
                >
                    <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">⚖️</span> Fighting Imbalance
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-wine-red font-bold">• Red Wine:</span>
                            <span>Used <strong>SMOTE</strong> (Synthetic Minority Over-sampling) because the dataset was too small (~1.5k).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-wine-gold font-bold">• White Wine:</span>
                            <span>Used <strong>Class Weighting</strong> because the dataset was large enough (~4.9k) for penalty-based learning.</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
