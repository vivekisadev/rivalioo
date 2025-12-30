import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    hoverDelay?: number; // Delay before tooltip appears (in ms)
}

const Tooltip: React.FC<TooltipProps> = ({
    text,
    children,
    position = 'top',
    hoverDelay = 800 // Default 800ms delay before showing
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const handleMouseEnter = () => {
        setIsVisible(true);
        // Set a timeout to show the tooltip after the delay
        timeoutRef.current = setTimeout(() => {
            setShouldShow(true);
        }, hoverDelay);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
        setShouldShow(false);
        // Clear the timeout if user leaves before tooltip appears
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <AnimatePresence>
                {isVisible && shouldShow && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: position === 'left' || position === 'right' ? 0 : '-50%',
                            y: position === 'top' || position === 'bottom' ? 0 : '-50%'
                        }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{
                            duration: 0.25,
                            ease: [0.16, 1, 0.3, 1] // Custom easing for smooth appearance
                        }}
                        className={`absolute z-[100] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap bg-[#12161D]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl pointer-events-none ${positionClasses[position]}`}
                        style={{
                            left: position === 'top' || position === 'bottom' ? '50%' : undefined,
                            top: position === 'left' || position === 'right' ? '50%' : undefined,
                            transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)'
                        }}
                    >
                        {text}
                        {/* Subtle arrow */}
                        <div
                            className={`absolute border-4 border-transparent ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-[#12161D]' :
                                position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-[#12161D]' :
                                    position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-[#12161D]' :
                                        'right-full top-1/2 -translate-y-1/2 border-r-[#12161D]'
                                }`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
