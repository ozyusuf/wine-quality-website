import { motion } from 'framer-motion';

export default function SlideXAI() {
    return (
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <h2 className="text-5xl font-serif text-white mb-6">Opening the Black Box</h2>
                <p className="text-xl text-gray-300 mb-8">
                    We don't just trust the prediction; we verify the <span className="text-white font-bold italic">why</span>.
                </p>

                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl text-wine-gold mb-2">SHAP (SHapley Additive exPlanations)</h3>
                        <p className="text-gray-400 text-sm">
                            Calculates the marginal contribution of each feature to the final prediction.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl text-white mb-2">Example Insight</h3>
                        <p className="text-gray-400 text-sm italic">
                            "This specific bottle was rejected because Volatile Acidity was 0.8g/L, despite having high Alcohol."
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Placeholder for SHAP visual or abstract representation */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 h-96 flex items-center justify-center relative overflow-hidden"
            >
                {/* Abstract Bar Chart Visualization */}
                <div className="space-y-4 w-full max-w-xs z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20 text-right">Alcohol</span>
                        <div className="h-4 bg-red-500 w-[80%] rounded-r"></div>
                        <span className="text-xs text-red-500 font-bold">+0.4</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20 text-right">Sulphates</span>
                        <div className="h-4 bg-red-500 w-[30%] rounded-r"></div>
                        <span className="text-xs text-red-500 font-bold">+0.1</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-20 text-right">Acidity</span>
                        <div className="h-4 bg-blue-500 w-[60%] rounded-l ml-auto"></div>
                        <span className="text-xs text-blue-500 font-bold text-right w-8">-0.3</span>
                    </div>
                    <div className="flex items-center gap-2 border-t border-gray-700 pt-4 mt-4">
                        <span className="text-sm text-white w-20 text-right font-bold">Prediction</span>
                        <span className="text-xl text-green-400 font-bold">Good (1)</span>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
            </motion.div>
        </div>
    )
}
