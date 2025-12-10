import { motion } from 'framer-motion';
import { FaDatabase, FaFilter, FaBalanceScale, FaBrain } from 'react-icons/fa';

export default function SlideMethodology() {
    const steps = [
        { icon: FaDatabase, title: "Load & Drop Duplicates", desc: "Removed specific chemical duplicates to prevent 'Memorization' (Data Leakage)." },
        { icon: FaFilter, title: "Stratified Split (80/20)", desc: "Essential due to 17% imbalance. Ensures Good wines are present in Test set." },
        { icon: FaBalanceScale, title: "Clean (Train Only)", desc: "Outlier removal (IQR) applied ONLY to Train. Test set must remain 'Noisy'." },
        { icon: FaBrain, title: "Model Training", desc: "Trained on Clean Data -> Tested on Real-World (Dirty) Data." },
    ]

    return (
        <div className="max-w-6xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl font-serif text-white mb-4">Rigorous Scientific Protocols</h2>
                <p className="text-xl text-wine-red font-semibold uppercase tracking-widest">Zero Tolerance for Data Leakage</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-xl relative group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-serif group-hover:opacity-20 transition-opacity">
                            {i + 1}
                        </div>
                        <step.icon className="text-4xl text-wine-gold mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 bg-red-900/20 border border-red-500/30 p-6 rounded-lg text-center max-w-3xl mx-auto"
            >
                <h4 className="text-red-400 font-bold mb-1">🛡️ The Golden Rule</h4>
                <p className="text-gray-300">The Test Set was never touched during cleaning or scaling. It remains "noisy" to simulate real-world production conditions.</p>
            </motion.div>
        </div>
    )
}
