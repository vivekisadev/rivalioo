import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, Calendar, Award, Lock, ArrowRight } from 'lucide-react';
import useMeasure from "react-use-measure";

// Import game cover images
import bgmiCover from '../assets/images/bgmi-cover.jpg';
import ffCover from '../assets/images/ff-cover.jpg';
import codCover from '../assets/images/cod-mobile-cover.jpg';
import valorantCover from '../assets/images/valorant-cover.jpg';

const Tournaments = () => {
    const navigate = useNavigate();
    const [containerRef, { width }] = useMeasure();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const games = [
        {
            title: "Battlegrounds Mobile India",
            image: bgmiCover,
            isActive: true,
            route: '/tournaments/bgmi',
            description: "Join the ultimate battle royale experience. Compete in high-stakes squads and solo playlists.",
            tags: ["Daily", "Credit Storm", "Premium Rush"]
        },
        {
            title: "Garena Free Fire",
            image: ffCover,
            isActive: true,
            route: '/tournaments/free-fire',
            description: "Fast-paced survival matches. Prove your dominance in daily scrims and weekend championships.",
            tags: ["Daily", "Credit Storm", "Premium Rush"]
        },
        {
            title: "Call of Duty Mobile",
            image: codCover,
            isActive: false,
            route: '',
            description: "Experience tactical combat and strategic gameplay in our upcoming seasonal majors.",
            tags: ["Multiplayer", "S&D", "Major"]
        },
        {
            title: "Valorant",
            image: valorantCover,
            isActive: false,
            route: '',
            description: "5v5 character-based tactical shooter. Prepare for the global competitive stage.",
            tags: ["Premier", "5v5", "Championship"]
        }
    ];

    const handleCardClick = (game: any) => {
        if (game.isActive && game.route) {
            navigate(game.route);
        }
    };

    const getTagStyle = (tag: string) => {
        const t = tag.trim();
        if (t === "Daily" || t.includes("Daily")) return "bg-emerald-500/30 text-white border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md";
        if (t === "Credit Storm" || t.includes("Credit")) return "bg-red-500/30 text-white border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md";
        if (t === "Premium Rush" || t.includes("Premium")) return "bg-yellow-500/30 text-white border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md";
        return "bg-white/5 text-gray-300 border-white/10"; // Default
    };

    return (
        <div className="pt-24 min-h-screen bg-transparent relative overflow-hidden">
            {/* Background Texture */}
            {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div> */}

            {/* Background gradient glow */}
            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#2FE9A9]/10 rounded-full blur-[120px] pointer-events-none"></div> */}

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
                            <Trophy size={16} className="text-[#2FE9A9]" />
                            <span className="text-[#2FE9A9] text-sm font-bold uppercase tracking-wider">Live Tournaments</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-6 font-oswald tracking-tight">
                            Compete & Conquer
                        </h1>

                        <p className="text-gray-400 text-lg max-w-2xl mb-8">
                            Join premium tournaments across your favorite mobile games. Compete with the best, win amazing prizes, and rise to the top of the leaderboard.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl w-full">
                            <div className="flex flex-col items-center p-4 rounded-xl">
                                <Users size={24} className="text-[#2FE9A9] mb-2" />
                                <div className="text-2xl font-bold text-white">576</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Active Teams</div>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl">
                                <Award size={24} className="text-[#2FE9A9] mb-2" />
                                <div className="text-2xl font-bold text-white">₹1.25L</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Total Prizes</div>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-xl">
                                <Calendar size={24} className="text-[#2FE9A9] mb-2" />
                                <div className="text-2xl font-bold text-white">4</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider">Live Games</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Cards with Expandable Effect + Hover Glow */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight">Featured Games</h2>

                    <div ref={containerRef} className="flex flex-wrap gap-6 items-start rounded-xl justify-center md:justify-start">
                        {width > 0 && games.map((game, idx) => {
                            const gap = 24;
                            const columns = width >= 1024 ? 4 : width >= 640 ? 2 : 1;
                            const singleCardWidth = Math.floor((width - ((columns - 1) * gap)) / columns);

                            const expandedCardWidth = columns > 1
                                ? (singleCardWidth * 2) + gap
                                : singleCardWidth;

                            const isExpanded = expandedId === idx;

                            return (
                                <motion.div
                                    layout
                                    transformTemplate={(_, generated) => `translateZ(0) ${generated}`}
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 20,
                                        mass: 1
                                    }}
                                    key={idx}
                                    className={`relative group rounded-3xl ${game.isActive ? 'cursor-pointer' : 'cursor-default'}`}
                                    style={{
                                        width: isExpanded ? expandedCardWidth : singleCardWidth,
                                        height: 400,
                                        marginBottom: 24,
                                    }}
                                    onClick={() => game.isActive && setExpandedId(isExpanded ? null : idx)}
                                    onMouseEnter={() => setHoveredIndex(idx)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Aceternity Hover Background Effect */}
                                    <AnimatePresence>
                                        {hoveredIndex === idx && !isExpanded && (
                                            <motion.span
                                                className="absolute inset-0 -inset-x-4 -inset-y-4 bg-slate-800/[0.8] block rounded-3xl -z-10"
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

                                    {/* Card Container */}
                                    <motion.div
                                        className="w-full h-full overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-row"
                                        layout
                                    >
                                        {/* Image Section */}
                                        {/* Image Section */}
                                        <motion.div
                                            layout
                                            className="relative h-full shrink-0 overflow-hidden"
                                            style={{
                                                width: singleCardWidth,
                                                minWidth: singleCardWidth,
                                                borderTopLeftRadius: '1.5rem',
                                                borderBottomLeftRadius: '1.5rem',
                                            }}
                                        >
                                            <img
                                                src={game.image}
                                                alt={game.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                            {!game.isActive && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                                    <div className="p-3 rounded-full bg-white/10 mb-3">
                                                        <Lock size={24} className="text-white/60" />
                                                    </div>
                                                    <span className="text-white font-bold uppercase tracking-wider text-sm">Coming Soon</span>
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">{game.title}</h3>
                                            </div>
                                        </motion.div>

                                        {/* Content Section */}
                                        <AnimatePresence mode="popLayout">
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                    className="flex-1 h-full overflow-hidden flex flex-col justify-center gap-6 p-6 min-w-[300px]"
                                                >
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        <h4 className="text-[#2FE9A9] text-sm font-bold uppercase tracking-wider mb-2">Tournament Info</h4>
                                                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                                            {game.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2">
                                                            {game.tags.map((tag, i) => (
                                                                <span key={i} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getTagStyle(tag)}`}>
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </motion.div>

                                                    {game.isActive && (
                                                        <motion.button
                                                            layout
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCardClick(game);
                                                            }}
                                                            className="w-full mt-auto bg-white/5 border border-white/10 text-[#2FE9A9] font-bold py-4 rounded-xl uppercase tracking-wider hover:bg-[#2FE9A9] hover:text-black transition-all duration-300 flex items-center justify-center group/btn backdrop-blur-md"
                                                        >
                                                            <span>Join Tournament</span>
                                                            <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                        </motion.button>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-24 text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl">
                        <Trophy size={32} className="text-[#2FE9A9]" />
                        <h3 className="text-xl font-bold text-white">More tournaments coming soon!</h3>
                        <p className="text-gray-400 text-sm max-w-md">
                            Stay tuned for more exciting tournaments across different games. Follow us on social media to get notified when registration opens.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tournaments;
