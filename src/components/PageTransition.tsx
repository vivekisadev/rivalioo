import { motion } from 'framer-motion';
import React, { type ReactNode } from 'react';
import logoFull from '../assets/images/logo_full.png';

interface PageTransitionProps {
    children: ReactNode;
}

// "Framer-like" Ultra-Smooth Fluid Ease
const fluidEase = [0.25, 0.1, 0.25, 1.0] as const;

const PageTransition = ({ children }: PageTransitionProps) => {
    // Optimized Scroll Restoration
    React.useLayoutEffect(() => {
        // Delay scrolling slightly to ensure it happens strictly behind the curtain
        // and doesn't compete with the initial render frame
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Top Shutter */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-[9999] bg-[#0B0E14] border-b border-[#2FE9A9]/20"
                initial={{ y: "-100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                animate={{ y: "-100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                exit={{ y: "0%", borderColor: "rgba(47, 233, 169, 0)" }}
                transition={{ duration: 0.75, ease: fluidEase }}
                style={{
                    height: "50vh",
                    willChange: "transform"
                }}
            />

            {/* Bottom Shutter */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#0B0E14] border-t border-[#2FE9A9]/20"
                initial={{ y: "100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                animate={{ y: "100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                exit={{ y: "0%", borderColor: "rgba(47, 233, 169, 0)" }}
                transition={{ duration: 0.75, ease: fluidEase }}
                style={{ height: "50vh", willChange: "transform" }}
            />

            {/* Logo Overlay */}
            <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.95 }}
                exit={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <img src={logoFull} alt="Rivalioo" className="w-48 h-auto object-contain drop-shadow-[0_0_15px_rgba(47,233,169,0.3)]" />
            </motion.div>

            {/* REVEAL Shutters (New Page Enter) */}
            <motion.div
                className="fixed top-0 left-0 right-0 z-[9999] bg-[#0B0E14] border-b border-[#2FE9A9]/20 pointer-events-none"
                initial={{ y: "0%", borderColor: "rgba(47, 233, 169, 0)" }}
                animate={{ y: "-100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                exit={{ y: "-100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                transition={{ duration: 0.85, ease: fluidEase, delay: 0.05 }} // Slight overlap
                style={{
                    height: "50vh",
                    willChange: "transform"
                }}
            />
            <motion.div
                className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#0B0E14] border-t border-[#2FE9A9]/20 pointer-events-none"
                initial={{ y: "0%", borderColor: "rgba(47, 233, 169, 0)" }}
                animate={{ y: "100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                exit={{ y: "100%", borderColor: "rgba(47, 233, 169, 0.2)" }}
                transition={{ duration: 0.85, ease: fluidEase, delay: 0.05 }}
                style={{ height: "50vh", willChange: "transform" }}
            />

            {/* Content Reveal - Minimal for Performance */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                className="w-full h-full"
                style={{ willChange: "opacity" }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default PageTransition;
