import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const SmoothCursor = () => {
    const cursorX = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
    const cursorY = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
    const scale = useSpring(1, { damping: 35, stiffness: 500 });
    const rotation = useSpring(0, { damping: 60, stiffness: 300 });

    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastUpdateTime = useRef(Date.now());
    const velocity = useRef({ x: 0, y: 0 });
    const previousAngle = useRef(0);
    const accumulatedRotation = useRef(0);
    const rafId = useRef<number | null>(null);

    const [cursorColor, setCursorColor] = useState('#2FE9A9');

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (rafId.current) return;

            rafId.current = requestAnimationFrame(() => {
                const currentPos = { x: e.clientX, y: e.clientY };
                const currentTime = Date.now();
                const deltaTime = currentTime - lastUpdateTime.current;

                // Helper to parse RGB/RGBA string
                const parseRgb = (color: string) => {
                    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
                    if (!match) return null;
                    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
                };

                // Helper to handle transparent backgrounds
                const getVisibleBackgroundColor = (el: HTMLElement | null): { r: number, g: number, b: number } | null => {
                    let current = el;
                    let levels = 0;

                    while (current && levels < 5) {
                        const style = window.getComputedStyle(current);
                        const bgColor = style.backgroundColor;

                        // Check for explicit invert override first
                        if (current.getAttribute('data-cursor') === 'invert') return { r: 47, g: 233, b: 169 }; // return cursor color to force invert

                        // Ignore fully transparent or default
                        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                            const rgb = parseRgb(bgColor);
                            if (rgb) return rgb;
                        }

                        current = current.parentElement;
                        levels++;
                    }
                    return null; // Default to dark background assumption (no invert)
                };

                // Cursor Color RGB: #2FE9A9 -> (47, 233, 169)
                const cursorRgb = { r: 47, g: 233, b: 169 };
                const bgRgb = getVisibleBackgroundColor(document.elementFromPoint(currentPos.x, currentPos.y) as HTMLElement);
                let shouldInvert = false;

                if (bgRgb) {
                    // Calculate Euclidean distance
                    const distance = Math.sqrt(
                        Math.pow(bgRgb.r - cursorRgb.r, 2) +
                        Math.pow(bgRgb.g - cursorRgb.g, 2) +
                        Math.pow(bgRgb.b - cursorRgb.b, 2)
                    );

                    // Threshold: If colors are close (distance < 130), invert to Black
                    // Black distance is ~300. White distance is ~220. Similar greens will be < 100.
                    if (distance < 130) {
                        shouldInvert = true;
                    }
                }

                setCursorColor(shouldInvert ? '#000000' : '#2FE9A9');

                if (deltaTime > 0) {
                    velocity.current = {
                        x: (currentPos.x - lastMousePos.current.x) / deltaTime,
                        y: (currentPos.y - lastMousePos.current.y) / deltaTime,
                    };
                }

                cursorX.set(currentPos.x);
                cursorY.set(currentPos.y);

                const speed = Math.sqrt(Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2));

                if (speed > 0.1) {
                    const currentAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
                    let angleDiff = currentAngle - previousAngle.current;
                    if (angleDiff > 180) angleDiff -= 360;
                    if (angleDiff < -180) angleDiff += 360;

                    accumulatedRotation.current += angleDiff;
                    rotation.set(accumulatedRotation.current);
                    previousAngle.current = currentAngle;
                    scale.set(0.85);
                } else {
                    scale.set(1);
                }

                lastMousePos.current = currentPos;
                lastUpdateTime.current = currentTime;
                rafId.current = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [cursorX, cursorY, rotation, scale]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: cursorX,
                top: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                rotate: rotation,
                scale: scale,
                zIndex: 9999,
                pointerEvents: 'none',
                willChange: 'transform',
            }}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className=""
                animate={{ color: cursorColor }}
                transition={{ duration: 0.1 }}
            >
                <path
                    fill="currentColor"
                    d="M9.391 2.32C8.42 1.56 7 2.253 7 3.486V28.41c0 1.538 1.966 2.18 2.874.938l6.225-8.523a2 2 0 0 1 1.615-.82h9.69c1.512 0 2.17-1.912.978-2.844z"
                />
            </motion.svg>
        </motion.div>
    );
};

export default SmoothCursor;
