import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import logoSvg from '../assets/images/logo-svg.svg';

const PremiumLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const start = performance.now();
        const duration = 2500; // Total duration in ms

        const tick = (now: number) => {
            const elapsed = now - start;
            // Easing function: easeInQuad (Starts slow, finishes fast)
            // t = current time, b = start value, c = change in value, d = duration
            const t = Math.min(elapsed / duration, 1);
            const easeInQuad = t * t;

            const currentProgress = easeInQuad * 100;
            setProgress(currentProgress);

            if (t < 1) {
                animationFrameId.current = requestAnimationFrame(tick);
            }
        };

        animationFrameId.current = requestAnimationFrame(tick);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const exitTimeout = setTimeout(() => setIsExiting(true), 1000);
            const completeTimeout = setTimeout(onComplete, 1600);
            return () => {
                clearTimeout(exitTimeout);
                clearTimeout(completeTimeout);
            };
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#07090D] flex flex-col items-center justify-center cursor-wait overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className="flex flex-col items-center gap-12">
                {/* Logo Container */}
                <div className="relative w-[400px] h-[100px] md:w-[800px] md:h-[200px]">
                    {/* 1. Base Layer (Ghost) */}
                    <img
                        src={logoSvg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain opacity-[0.03] grayscale brightness-50 select-none pointer-events-none"
                    />

                    {/* 2. Fill Layer: True Color revealed via inset */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden select-none pointer-events-none"
                        style={{
                            clipPath: `inset(${100 - progress}% 0 0 0)`,
                            willChange: "clip-path"
                        }}
                    >
                        <img
                            src={logoSvg}
                            alt="Rivalioo"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </div>

                {/* Synchronized Progress Bar */}
                <div className="w-48 h-[1px] bg-white/5 overflow-hidden">
                    <div
                        className="h-full bg-white/20 transition-all duration-[16ms] ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default PremiumLoader;
