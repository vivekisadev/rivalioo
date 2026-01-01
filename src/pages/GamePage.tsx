import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Trophy, Timer, ArrowRight } from 'lucide-react';
import useMeasure from 'react-use-measure';
import { cn } from '../lib/utils'; // Assuming cn exists, if not I'll standard join

// App layout handles Navbar.

const GamePage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [containerRef, { width }] = useMeasure();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Mock Data
    const gameNames: Record<string, string> = {
        'bgmi': 'BGMI',
        'free-fire': 'Free Fire',
        'valorant': 'Valorant',
        'cod': 'Call of Duty'
    };

    const title = gameNames[gameId || ''] || 'Game';

    const categories = [
        {
            id: 'daily',
            title: "Daily Event",
            subtitle: "Regular Matches",
            icon: Timer,
            gradient: "from-[#2FE9A9]/20 via-[#2FE9A9]/5 to-transparent",
            border: "border-[#2FE9A9]/30",
            glow: "shadow-[0_0_30px_rgba(47,233,169,0.15)]",
            text: "text-[#2FE9A9]",
            desc: "Join our daily scrims and practice matches. Perfect for squads looking to improve their coordination.",
            ticket: "Daily Ticket"
        },
        {
            id: 'storm',
            title: "Credit Storm",
            subtitle: "High Stakes",
            icon: Zap,
            gradient: "from-[#EF4444]/20 via-[#EF4444]/5 to-transparent",
            border: "border-[#EF4444]/30",
            glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]",
            text: "text-[#EF4444]",
            desc: "Fast-paced tournaments with credit rewards. High risk, high reward gameplay for adrenaline junkies.",
            ticket: "Storm Ticket"
        },
        {
            id: 'rush',
            title: "Premium Rush",
            subtitle: "Elite Tier",
            icon: Trophy,
            gradient: "from-[#FACC15]/20 via-[#FACC15]/5 to-transparent",
            border: "border-[#FACC15]/30",
            glow: "shadow-[0_0_30px_rgba(250,204,21,0.15)]",
            text: "text-[#FACC15]",
            desc: "Exclusive championships for top-tier teams. Massive prize pools, verified slots, and professional casting.",
            ticket: "Premium Ticket"
        }
    ];

    const springTransition = {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1
    } as const;

    return (
        <div className="pt-32 pb-20 min-h-screen px-6 max-w-7xl mx-auto flex flex-col items-center">

            {/* Header Area */}
            <div className="w-full mb-8 flex flex-col items-center text-center space-y-4">
                {/* Premium Breadcrumb Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <span className="cursor-pointer hover:text-white text-gray-400 text-xs font-bold uppercase tracking-wider transition-colors" onClick={() => navigate('/')}>Home</span>
                    <span className="text-white/20 text-[10px]">•</span>
                    <span className="cursor-pointer hover:text-white text-gray-400 text-xs font-bold uppercase tracking-wider transition-colors" onClick={() => navigate('/tournaments')}>Tournaments</span>
                    <span className="text-white/20 text-[10px]">•</span>
                    <span className="text-white text-xs font-bold uppercase tracking-wider text-shadow-sm">{title}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 italic uppercase tracking-tighter">
                    CHOOSE <span className="text-[#2FE9A9]">EVENT</span>
                </h1>

                <p className="text-gray-400 max-w-lg text-sm md:text-base">
                    Select a tournament category to view available matches.
                </p>
            </div>


            {/* Expanding Cards Container */}
            <div ref={containerRef} className="w-full relative h-[400px] flex items-center justify-center">
                <div
                    className="flex gap-4 w-full h-[350px]"
                    onMouseLeave={() => setExpandedId(null)}
                >
                    {width > 0 && categories.map((cat) => {
                        const isExpanded = expandedId === cat.id;


                        return (
                            <motion.div
                                key={cat.id}
                                layout
                                transition={springTransition}
                                onMouseEnter={() => setExpandedId(cat.id)}
                                className={cn(
                                    "relative h-full rounded-[24px] overflow-hidden cursor-pointer border backdrop-blur-3xl group transition-all duration-300",
                                    cat.border,
                                    "bg-[#0F1218]" // Base dark card
                                )}
                                style={{
                                    // Flex based sizing for smoothness
                                    flex: isExpanded ? 1.5 : 1,
                                    minWidth: 0 // Allow shrinking
                                }}
                            >
                                {/* Background Gradient */}
                                <div className={cn("absolute inset-0 opacity-20 bg-gradient-to-b", cat.gradient)} />

                                {/* Content Wrapper */}
                                <motion.div layout className="relative h-full w-full p-6 flex flex-col justify-between z-10">

                                    {/* Top Section */}
                                    <div className="flex justify-between items-start">
                                        <div className={cn("p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10", cat.text)}>
                                            <cat.icon size={24} strokeWidth={1.5} />
                                        </div>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="px-2.5 py-1 rounded-full border border-white/10 bg-black/20 text-[10px] font-bold text-white/70 uppercase tracking-wider"
                                            >
                                                Requires: {cat.ticket}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Middle / Bottom Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <motion.h3 layout className="text-3xl font-black italic uppercase text-white leading-none">
                                                {cat.title}
                                            </motion.h3>
                                            <motion.p layout className={cn("text-sm font-bold uppercase tracking-wider mt-1", cat.text)}>
                                                {cat.subtitle}
                                            </motion.p>
                                        </div>

                                        {/* Expanded Description & Button */}
                                        <AnimatePresence mode="popLayout">
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-6 pt-4 border-t border-white/10"
                                                >
                                                    <p className="text-gray-400 text-sm leading-relaxed">
                                                        {cat.desc}
                                                    </p>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/tournaments/${gameId}/${cat.id}`);
                                                        }}
                                                        className={cn(
                                                            "w-full py-4 rounded-xl font-bold uppercase tracking-wider text-black text-sm transition-transform active:scale-95 flex items-center justify-center gap-2",
                                                            "bg-white hover:bg-gray-100" // Simple white button
                                                        )}
                                                    >
                                                        View Events <ArrowRight size={16} />
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {!isExpanded && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-white/40 text-xs mt-2"
                                            >
                                                Hover to expand
                                            </motion.p>
                                        )}
                                    </div>

                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Back Button Footer */}
            <div className="mt-12">
                <button
                    onClick={() => navigate('/tournaments')}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-white/20"
                >
                    <ArrowLeft size={16} /> Back to Games
                </button>
            </div>

        </div>
    );
};

export default GamePage;
