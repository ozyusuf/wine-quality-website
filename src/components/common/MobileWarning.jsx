import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileWarning() {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Since we forced viewport to 1280px, window.innerWidth will report 1280 even on mobile.
            // We must rely on screen.width or userAgent.
            // Typically mobile screens are narrower than ~768px physically.
            const isMobileScreen = window.screen.width < 768;

            // Also check reliable user agent regex for mobile devices
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobileScreen || isMobileUA) {
                setShowWarning(true);
            }
        };

        checkMobile();
    }, []);

    const dismiss = () => {
        setShowWarning(false);
    };

    return (
        <AnimatePresence>
            {showWarning && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-12 left-8 right-8 z-[9999] pointer-events-none flex justify-center"
                >
                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[2rem] shadow-2xl w-full max-w-4xl pointer-events-auto flex items-start gap-8 ring-2 ring-white/10">
                        <div className="bg-yellow-500/20 p-4 rounded-2xl text-yellow-500 shrink-0 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="flex-1 pt-1">
                            <h4 className="text-white font-bold text-4xl mb-3">Optimum Experience</h4>
                            <p className="text-gray-300 text-3xl leading-relaxed">
                                This presentation is designed for desktop. On mobile, the experience may be scaled down.
                                <span className="block mt-2 text-yellow-400 font-medium">For the best view, please use a PC or Tablet.</span>
                            </p>
                        </div>
                        <button
                            onClick={dismiss}
                            className="text-gray-400 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors mt-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
