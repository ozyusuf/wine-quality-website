import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PresentationLayout = ({ children }) => {
    return (
        <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {/* Global Read Report Button */}


            {/* Slides Container */}
            {children}

            {/* Simple Pagination/Progress Dots Removed per user request */}
        </div>
    );
};

export const Slide = ({ children, className = "" }) => {
    return (
        <section className={`h-screen w-full snap-start flex items-center justify-center relative overflow-hidden p-12 ${className}`}>
            {children}
        </section>
    );
};

export default PresentationLayout;
