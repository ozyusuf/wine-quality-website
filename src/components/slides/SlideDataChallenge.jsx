import { motion } from 'framer-motion';

export default function SlideDataChallenge() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto w-full">
            {/* Left: Text Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-5xl font-serif text-white mb-8">Engineering the Dataset</h2>

                <div className="space-y-6 text-lg text-gray-300">
                    <div className="flex items-start gap-4">
                        <span className="text-wine-gold text-2xl">01</span>
                        <div>
                            <strong className="text-white block">Source</strong>
                            Kaggle / UCI Machine Learning Repository (Cortez et al., 2009).
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <span className="text-wine-gold text-2xl">02</span>
                        <div>
                            <strong className="text-white block">The Critical Decision</strong>
                            Converted 0-10 scale into Binary Classification.
                            <ul className="list-disc ml-5 mt-2 text-base text-gray-400">
                                <li><strong>Good (1):</strong> Quality ≥ 7 (Premium/Reserve)</li>
                                <li><strong>Bad/Average (0):</strong> Quality &lt; 7</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right: The Challenge Visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-tech-surface p-10 rounded-2xl border border-white/5"
            >
                <h3 className="text-3xl font-serif text-white mb-6 border-b border-white/10 pb-4">The Challenge</h3>

                <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Standard Wines</span>
                        <span>Premium (Target)</span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-gray-600 w-[83%]"></div>
                        <div className="h-full bg-wine-gold w-[17%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between mt-2 font-mono text-xs">
                        <span className="text-gray-500">83%</span>
                        <span className="text-wine-gold">17%</span>
                    </div>
                </div>

                <div className="bg-black/30 p-6 rounded-lg text-sm text-gray-300 leading-relaxed border-l-2 border-wine-red">
                    <strong className="text-white block mb-2 text-base">Key Insight: "Needle in a Haystack"</strong>
                    The chart reveals the stark reality: <span className="text-wine-gold font-bold">~83% of wines are average</span> (Blue).
                    Only <span className="text-wine-red font-bold">~17% reach "Premium" status</span> (Red).
                    <br /><br />
                    <div className="text-xs border-t border-white/10 pt-2 mt-2">
                        <strong>Threshold Sensitivity Analysis:</strong>
                        <ul className="list-disc ml-4 space-y-1 mt-1 text-gray-400">
                            <li>Threshold ≥ 6: Too Easy (~50% Good) - Trivial task.</li>
                            <li>Threshold ≥ 8: Too Hard (~4% Good) - Unstable training.</li>
                            <li><span className="text-white">Threshold ≥ 7: Optimal</span> (Realistic imbalance).</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
