import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number; // Maximum tilt angle in degrees, default 15
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = "",
    maxTilt = 15
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

    // Gloss effect position (moves opposite to tilt)
    const glossX = useTransform(rotateY, [maxTilt, -maxTilt], ["0%", "100%"]);
    const glossY = useTransform(rotateX, [-maxTilt, maxTilt], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXClient = e.clientX - rect.left;
        const mouseYClient = e.clientY - rect.top;

        const xPct = mouseXClient / width - 0.5;
        const yPct = mouseYClient / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            {/* Gloss Overlay */}
            <div
                className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ transform: "translateZ(1px)" }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent"
                    style={{
                        left: glossX,
                        top: glossY,
                        width: '200%',
                        height: '200%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>

            <div style={{ transform: "translateZ(0px)" }} className="relative h-full w-full">
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
