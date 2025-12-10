import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SlideIntro() {
    return (
        <div className="text-center max-w-5xl mx-auto z-10 flex flex-col h-full justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 leading-tight">
                    Wine Quality <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-wine-red to-wine-gold">
                        Prediction
                    </span>
                </h1>
                <h3 className="text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed mb-12">
                    Building a Robust, Interpretable, and Scientifically-Validated Machine Learning Pipeline
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-16"
            >
                <Link
                    to="/report"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300"
                >
                    Read Full Project Report
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-3 gap-8 text-left border-t border-white/10 pt-10"
            >
                <div>
                    <h4 className="text-wine-red font-bold mb-2">Team</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                        <li>Yusuf Öz</li>
                        <li>Serdar Dedebaş</li>
                        <li>Furkan Efe Yüksel</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-wine-red font-bold mb-2">Core Challenge</h4>
                    <p className="text-gray-400 text-sm">
                        Classifying rare <strong>'Premium'</strong> wines from highly imbalanced data (Simulating Fraud Detection).
                    </p>
                </div>
                <div>
                    <h4 className="text-wine-red font-bold mb-2">Goal</h4>
                    <p className="text-gray-400 text-sm">
                        Achieve production-ready performance with full explainability.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
