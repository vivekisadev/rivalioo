import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

export const HoverEffect = ({
    items,
    className,
    onItemClick,
}: {
    items: {
        title: string;
        description?: string;
        image: string;
        link?: string;
        isActive?: boolean;
    }[];
    className?: string;
    onItemClick?: (item: any) => void;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                className
            )}
        >
            {items.map((item, idx) => {
                const isActive = item.isActive !== false;

                return (
                    <div
                        key={idx}
                        className="relative group block h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Aceternity Hover Background Effect */}
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-2xl -z-10"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="relative z-20"
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <Card>
                                <CardImage src={item.image} alt={item.title} />

                                {/* Hover Overlay */}
                                <AnimatePresence>
                                    {hoveredIndex === idx && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-2xl"
                                        >
                                            {!isActive && (
                                                <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center rounded-2xl">
                                                    <Lock size={48} className="text-white/60 mb-4" />
                                                    <div className="text-white font-bold text-xl uppercase tracking-wider">Coming Soon</div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>

                        {/* Animated Button - Slides out from underneath */}
                        <AnimatePresence>
                            {hoveredIndex === idx && isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute bottom-0 left-0 right-0 translate-y-full overflow-hidden z-30 rounded-b-2xl"
                                >
                                    <motion.button
                                        initial={{ y: -20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20 }}
                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                                        onClick={() => onItemClick?.(item)}
                                        className="w-full px-6 py-4 bg-[#2FE9A9] text-black font-bold uppercase tracking-wider hover:bg-[#00C6FF] transition-colors shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <span>Let's Go</span>
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full overflow-hidden bg-black border border-white/10 relative",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardImage = ({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) => {
    return (
        <div className={cn("w-full h-[400px] overflow-hidden", className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};

export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
