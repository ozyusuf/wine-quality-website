import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth physics for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
            setIsVisible(true);
        };

        const handleMouseDown = () => document.body.classList.add('cursor-clicking');
        const handleMouseUp = () => document.body.classList.remove('cursor-clicking');

        // Only active on desktop (fine pointer)
        const isDesktop = matchMedia('(pointer: fine)').matches;

        if (isDesktop) {
            window.addEventListener('mousemove', moveCursor);
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);

            // Hide default cursor
            document.documentElement.style.cursor = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.style.cursor = 'auto'; // Restore
        };
    }, []);

    // Inject global styles to hide cursor everywhere
    useEffect(() => {
        if (!isVisible) return;

        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
            body, a, button, input, [role="button"] { cursor: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [isVisible]);

    // If not visible (e.g. initial render or mobile), render nothing
    if (!isVisible) return null;

    return (
        <>
            {/* The Trailing Ring (Laggy/Smooth) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full border border-red-500/50 rounded-full opacity-50"></div>
            </motion.div>

            {/* The Main Dot (Instant/No Lag) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                {/* Laser Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                {/* Glow Halo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500/20 rounded-full blur-md"></div>
            </motion.div>
        </>
    );
}
