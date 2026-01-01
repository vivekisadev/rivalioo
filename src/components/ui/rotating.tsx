import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RotatingTextContainerProps {
    text: string[];
    duration?: number;
    className?: string;
    delay?: number;
    y?: number;
    children?: React.ReactNode;
}

export const RotatingTextContainer = ({
    text,
    duration = 2000,
    className = "",
}: RotatingTextContainerProps) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % text.length);
        }, duration);
        return () => clearInterval(interval);
    }, [text.length, duration]);

    // Find longest text for width reservation
    const longestText = text.reduce((a, b) => a.length > b.length ? a : b, "");

    return (
        <span
            className={`inline-grid relative overflow-hidden align-top py-2 ${className}`}


        >
            <AnimatePresence initial={false}>
                <motion.span
                    key={text[index]}
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                    transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 20,
                        mass: 0.8
                    }}
                    className="col-start-1 row-start-1 block whitespace-nowrap text-left"
                >
                    {text[index]}
                </motion.span>
            </AnimatePresence>

            {/* Placeholder to reserve space for the longest text to prevent layout jumps */}
            <span className="col-start-1 row-start-1 invisible opacity-0 pointer-events-none select-none text-left">
                {longestText}
            </span>
        </span>
    );
};

// Export a dummy component if the pattern requires it, or just use Container
export const RotatingText = () => null;
