import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as onnx from 'onnxruntime-web';

// Feature configuration matching the model input order (CRITICAL)
// Order: fixed_acidity, volatile_acidity, citric_acid, residual_sugar, chlorides, 
// free_sulfur_dioxide, total_sulfur_dioxide, density, pH, sulphates, alcohol
const FEATURES = [
    { name: 'alcohol', label: 'Alcohol %', min: 8.0, max: 15.0, step: 0.1, default: 11.0, unit: '%' },
    { name: 'volatile_acidity', label: 'Volatile Acidity', min: 0.1, max: 1.6, step: 0.01, default: 0.3, unit: '' },
    { name: 'sulphates', label: 'Sulphates', min: 0.2, max: 2.0, step: 0.01, default: 0.6, unit: '' },
    { name: 'citric_acid', label: 'Citric Acid', min: 0.0, max: 1.0, step: 0.01, default: 0.3, unit: '' },

    { name: 'chlorides', label: 'Chlorides', min: 0.01, max: 0.6, step: 0.001, default: 0.04, unit: '' },
    { name: 'residual_sugar', label: 'Residual Sugar', min: 0.5, max: 20.0, step: 0.1, default: 2.0, unit: '' },
    { name: 'pH', label: 'pH Level', min: 2.7, max: 4.0, step: 0.01, default: 3.3, unit: '' },
    { name: 'density', label: 'Density', min: 0.98, max: 1.04, step: 0.001, default: 0.996, unit: '' },

    // Hidden/Less important features default values (still passed to model)
    { name: 'fixed_acidity', label: 'Fixed Acidity', min: 4.0, max: 16.0, step: 0.1, default: 7.0, unit: '', hidden: false },
    { name: 'free_sulfur_dioxide', label: 'Free SO2', min: 1.0, max: 100.0, step: 1.0, default: 30.0, unit: '', hidden: false },
    { name: 'total_sulfur_dioxide', label: 'Total SO2', min: 6.0, max: 200.0, step: 1.0, default: 100.0, unit: '', hidden: false },
];

export default function ModelDemo() {
    const [inputs, setInputs] = useState(
        FEATURES.reduce((acc, f) => ({ ...acc, [f.name]: f.default }), {})
    );
    const [prediction, setPrediction] = useState(null); // 0 or 1
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const [error, setError] = useState(null);

    // Initialize ONNX Session
    useEffect(() => {
        const initModel = async () => {
            try {
                // Configure WASM paths to use CDN to ensure correct files are loaded
                // Matching installed version 1.23.2
                onnx.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/';

                // Disable SIMD and Threading to avoid SharedArrayBuffer/Header requirements
                onnx.env.wasm.numThreads = 1;
                onnx.env.wasm.simd = false;
                onnx.env.wasm.proxy = false; // Disable proxy worker to simplify loading

                console.log("Loading ONNX model from /wine_quality_model.onnx...");
                const sess = await onnx.InferenceSession.create('/wine_quality_model.onnx', {
                    executionProviders: ['wasm'],
                });
                setSession(sess);
                setLoading(false);
                console.log("ONNX Model loaded successfully");

                // Run initial prediction silently
                runInference(sess, inputs, false);
            } catch (e) {
                console.error("Failed to load ONNX model:", e);
                setLoading(false);
                setError("Model Load Error: " + e.message);
            }
        };
        initModel();
    }, []);

    const runInference = async (sess, currentInputs, animate = true) => {
        if (!sess) return;

        if (animate) setIsAnimating(true);
        setError(null);

        try {
            const inputOrder = [
                'fixed_acidity', 'volatile_acidity', 'citric_acid', 'residual_sugar', 'chlorides',
                'free_sulfur_dioxide', 'total_sulfur_dioxide', 'density', 'pH', 'sulphates', 'alcohol'
            ];

            const data = inputOrder.map(name => parseFloat(currentInputs[name]));
            const tensor = new onnx.Tensor('float32', new Float32Array(data), [1, 11]);

            const feeds = { float_input: tensor };
            const results = await sess.run(feeds);
            console.log("Inference results:", results);

            let predictionValue = 0;

            // Prioritize 'probabilities' (Float32) for web safety
            if (results.probabilities) {
                const probs = results.probabilities.data;
                // probs is [p0, p1] for single batch
                predictionValue = probs[1] > 0.5 ? 1 : 0;
                console.log(`Probabilities: ${probs[0]}, ${probs[1]} -> Pred: ${predictionValue}`);
            }
            // Fallback to 'label' or 'output_label' (Int64)
            else {
                const labelKey = results.label ? 'label' : (results.output_label ? 'output_label' : Object.keys(results)[0]);
                if (results[labelKey]) {
                    // Handle BigInt64Array if needed by converting to Number
                    predictionValue = Number(results[labelKey].data[0]);
                }
            }

            if (animate) {
                setTimeout(() => {
                    setPrediction(predictionValue);
                    setIsAnimating(false);
                }, 800);
            } else {
                setPrediction(predictionValue);
            }

        } catch (e) {
            console.error("Inference failed:", e);
            setIsAnimating(false);
            setError("Inference Error: " + e.message);
        }
    };

    const handleRunClick = () => {
        runInference(session, inputs, true);
    };

    const handleSliderChange = (name, val) => {
        const newVal = parseFloat(val);
        setInputs(prev => ({ ...prev, [name]: newVal }));
        // Optional: Real-time update vs Button trigger
        // Setting debounce to run real-time but keeping button for UX 
        // runInference(session, { ...inputs, [name]: newVal }, false); 
    };

    return (
        <div className="w-full relative z-10 font-sans">

            {/* Section 1: Model Demo (Centered Full Screen) */}
            <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Error Display */}
                {error && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-900/90 border border-red-500 text-white px-6 py-4 rounded-xl z-50 shadow-2xl backdrop-blur-md max-w-2xl text-center">
                        <div className="font-bold text-red-200 mb-1">SYSTEM ERROR</div>
                        <code className="text-sm font-mono block mb-2">{error}</code>
                        <button onClick={() => setError(null)} className="text-xs text-red-300 hover:text-white underline">Dismiss</button>
                    </div>
                )}

                {/* Glass Container */}
                <div className="w-full relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 max-w-6xl mx-auto px-4 py-8">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-2 drop-shadow-lg">
                            Red Wine Quality Prediction <span className="font-light opacity-70">- Random Forest Model</span>
                        </h2>
                        <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-wine-red to-transparent mb-6"></div>

                        <div className="flex flex-wrap justify-center gap-3">
                            <a href="/wine_quality_model.onnx" download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-[10px] text-gray-400 hover:text-cyan-300 transition-all group">
                                <svg className="w-3 h-3 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                ONNX (Web)
                            </a>
                            <a href="/assets/ml-project/models/red_production_pipeline.pkl" download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-wine-red/20 border border-white/10 hover:border-wine-red/50 text-[10px] text-gray-400 hover:text-wine-red transition-all group">
                                <svg className="w-3 h-3 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <span className="font-mono">.pkl</span> Red Wine
                            </a>
                            <a href="/assets/ml-project/models/white_production_pipeline.pkl" download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-wine-gold/20 border border-white/10 hover:border-wine-gold/50 text-[10px] text-gray-400 hover:text-wine-gold transition-all group">
                                <svg className="w-3 h-3 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <span className="font-mono">.pkl</span> White Wine
                            </a>
                            <a href="/assets/ml-project/models/combined_production_pipeline.pkl" download className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 text-[10px] text-gray-400 hover:text-purple-400 transition-all group">
                                <svg className="w-3 h-3 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                <span className="font-mono">.pkl</span> Combined
                            </a>
                        </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {FEATURES.map(f => {
                            // Define optimal values for "Premium Quality" (Approx. Class 1 / Quality > 7)
                            const optimalValues = {
                                alcohol: 12.5,
                                volatile_acidity: 0.3,
                                sulphates: 0.8,
                                citric_acid: 0.45,
                                chlorides: 0.05,
                                residual_sugar: 2.2,
                                pH: 3.2,
                                density: 0.992,
                                fixed_acidity: 8.5,
                                free_sulfur_dioxide: 15,
                                total_sulfur_dioxide: 35
                            };
                            const optimal = optimalValues[f.name];
                            const optimalPos = optimal ? ((optimal - f.min) / (f.max - f.min)) * 100 : null;

                            return (
                                <div key={f.name} className="relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-gray-300 text-sm font-medium tracking-wide">{f.label}</label>
                                        <div className="bg-cyan-900/40 border border-cyan-500/30 rounded px-2 py-0.5 text-cyan-300 font-mono text-sm shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                            {inputs[f.name]} {f.unit}
                                        </div>
                                    </div>

                                    <div className="relative w-full h-1.5 bg-gray-700 rounded-lg">
                                        {/* Optimal Value Marker */}
                                        {optimalPos !== null && (
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-black z-10 cursor-help shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                                                style={{ left: `${optimalPos}%`, transform: 'translate(-50%, -50%)' }}
                                                title={`Optimal Value: ${optimal}`}
                                            >
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-yellow-900/90 text-yellow-200 text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-yellow-500/30">
                                                    ★ {optimal}
                                                </div>
                                            </div>
                                        )}

                                        <input
                                            type="range"
                                            min={f.min}
                                            max={f.max}
                                            step={f.step}
                                            value={inputs[f.name]}
                                            onChange={(e) => handleSliderChange(f.name, e.target.value)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
                                        {/* Custom Track Fill */}
                                        <div
                                            className="absolute top-0 left-0 h-full bg-cyan-500/50 rounded-l-lg pointer-events-none"
                                            style={{ width: `${((inputs[f.name] - f.min) / (f.max - f.min)) * 100}%` }}
                                        ></div>
                                        {/* Custom Thumb Visual (since input is hidden) */}
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] pointer-events-none transition-all group-hover:scale-110"
                                            style={{ left: `${((inputs[f.name] - f.min) / (f.max - f.min)) * 100}%`, transform: 'translate(-50%, -50%)' }}
                                        ></div>
                                    </div>

                                    <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
                                        <span>{f.min}</span>
                                        <span>{f.max}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center mb-12 relative">
                        <button
                            onClick={handleRunClick}
                            disabled={loading || isAnimating}
                            className={`
                                relative px-12 py-4 rounded-full font-bold text-lg tracking-widest transition-all duration-300
                                border border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]
                                ${isAnimating
                                    ? 'bg-pink-900/50 text-pink-200 cursor-wait'
                                    : 'bg-gradient-to-r from-pink-900/40 to-purple-900/40 hover:bg-pink-800/50 text-white hover:scale-105 hover:shadow-[0_0_50px_rgba(236,72,153,0.6)]'}
                            `}
                        >
                            <span className="relative z-10">
                                {loading ? "INITIALIZING..." : isAnimating ? "ANALYZING..." : "RUN PREDICTION MODEL"}
                            </span>
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-full blur-md bg-pink-500/20"></div>
                        </button>

                        {/* Explicit Status Indicator */}
                        {!loading && !isAnimating && (
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-[10px] text-green-400 font-mono opacity-80">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                MODEL READY
                            </div>
                        )}
                    </div>

                    {/* Results Panel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-xl overflow-hidden h-32 relative bg-black/50">

                        {/* GOOD Result (Left) */}
                        <div className={`relative flex items-center justify-center gap-4 transition-all duration-500 ${prediction === 1 ? 'bg-gradient-to-r from-yellow-900/40 to-transparent' : 'opacity-30 grayscale'}`}>
                            <div className={`text-5xl transition-all duration-500 ${prediction === 1 ? 'drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] scale-110' : ''}`} style={{ filter: 'grayscale(100%) sepia(100%) saturate(600%) hue-rotate(5deg) brightness(1.3) contrast(1.2)' }}>
                                🍇
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-yellow-500/80 uppercase tracking-widest mb-1">Prediction:</div>
                                <div className={`text-2xl font-bold ${prediction === 1 ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'text-gray-500'}`}>
                                    GOOD QUALITY
                                </div>
                                {prediction === 1 && <div className="text-yellow-500/60 text-xs mt-1">(Premium Reserve)</div>}
                            </div>
                            {prediction === 1 && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,1)]"></div>
                            )}
                        </div>

                        {/* BAD Result (Right) */}
                        <div className={`relative flex items-center justify-center gap-4 transition-all duration-500 border-l border-white/10 ${prediction === 0 ? 'bg-gradient-to-l from-red-900/40 to-transparent' : 'opacity-30 grayscale'}`}>
                            <div className={`text-5xl flex items-center justify-center ${prediction === 0 ? 'drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]' : ''}`}>
                                {/* Improved Broken Glass SVG */}
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={prediction === 0 ? "#ef4444" : "#6b7280"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 5h-14a1 1 0 0 0 1 1c0 1.5 .5 3 1.5 4.5" />
                                    <path d="M5 5c0 6 4 9 7 9s7 -3 7 -9" />
                                    <path d="M12 14v6" />
                                    <path d="M8 21h8" />
                                    {/* Jagged Crack */}
                                    <path d="M12 5l-2 3l3 2l-2 3" strokeWidth="2" className={prediction === 0 ? "animate-pulse" : ""} />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-red-500/80 uppercase tracking-widest mb-1">Prediction:</div>
                                <div className={`text-2xl font-bold ${prediction === 0 ? 'text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'text-gray-500'}`}>
                                    BAD QUALITY
                                </div>
                                {prediction === 0 && <div className="text-red-500/60 text-xs mt-1">(Table Wine)</div>}
                            </div>
                            {prediction === 0 && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
                            )}
                        </div>

                        {/* Loading Overlay */}
                        <AnimatePresence>
                            {isAnimating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <div className="text-cyan-400 font-mono tracking-widest animate-pulse">PROCESSING NEURAL NET...</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}
