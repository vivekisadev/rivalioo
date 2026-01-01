import { ArrowRight, Users, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

// Import local assets
import ffImage from '../assets/images/ff.png';
import bgmiImage from '../assets/images/bgmi.png';
import codImage from '../assets/images/cod.png';
import valorantImage from '../assets/images/valorant-omen.png';

// Container variants
const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.1, ease: "easeOut" } as any
    }
};

// Card variants
const matchCardVariant = {
    hidden: {
        opacity: 1,
        clipPath: "inset(0 100% 0 0)",
    },
    visible: {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        transition: {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1] as any,
        }
    }
};

const ActiveMatches = ({ showFilters = false }: { showFilters?: boolean }) => {
    const filters = ["All", "Free Fire", "BGMI", "COD", "Valorant"];
    const [activeFilter, setActiveFilter] = useState("All");

    const matches = [
        {
            id: 'free-fire',
            title: "Blaze Ops Arena",
            subtitle: "Free Fire",
            image: ffImage,
            color: "bg-[#00D2FF]",
            textColor: "text-[#1A1A1A]",
            prize: "500",
            mode: "1 V 1",
            entry: "Free",
            players: "78/100",
            isLocked: false
        },
        {
            id: 'bgmi',
            title: "Last Squad Standing",
            subtitle: "BGMI",
            image: bgmiImage,
            color: "bg-[#7CFFCB]",
            textColor: "text-[#1A1A1A]",
            prize: "200",
            mode: "2 V 2",
            entry: "Free",
            players: "78/100",
            isLocked: false
        },
        {
            id: 'cod',
            title: "Call Of Duty : Warzone",
            subtitle: "COD",
            image: codImage,
            color: "bg-[#50E3C2]",
            textColor: "text-[#1A1A1A]",
            prize: "700",
            mode: "2 V 2",
            entry: "Free",
            players: "78/100",
            isLocked: true
        },
        {
            id: 'valorant',
            title: "Valorant Protocol",
            subtitle: "Valorant",
            image: valorantImage,
            color: "bg-[#5B46E8]",
            textColor: "text-white",
            prize: "$30",
            mode: "5 V 5",
            entry: "Free",
            players: "78/100",
            isLocked: true
        }
    ];

    const filteredMatches = activeFilter === "All"
        ? matches
        : matches.filter(match => match.subtitle.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section className="pt-20 pb-0 relative z-20 overflow-hidden">
            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
                {/* Header Text */}
                {!showFilters ? (
                    <div className="flex items-center justify-between mb-12 pl-4 pr-4">
                        <h2 className="text-4xl font-bold uppercase text-white font-oswald tracking-tight">Active Matches</h2>
                        <Link to="/tournaments" className="text-sm font-bold uppercase tracking-widest text-[#2FE9A9] border-b border-[#2FE9A9] pb-0.5 hover:text-white hover:border-white transition-colors">
                            View All
                        </Link>
                    </div>
                ) : (
                    <div className="mb-12 pl-4">
                        <div className="flex flex-col gap-8 mb-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-4 font-oswald tracking-tight">Active Matches</h2>
                                <p className="text-gray-400 text-sm md:text-base max-w-2xl font-medium tracking-wide">
                                    Select a game to view available tournaments and events.
                                </p>
                                <div className="w-10 h-1 bg-[#7CFFCB] mt-4 shadow-[0_0_10px_#7CFFCB] rounded-full"></div>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border whitespace-nowrap ${activeFilter === filter
                                            ? 'bg-[#2FE9A9] border-[#2FE9A9] text-black shadow-[0_0_15px_rgba(47,233,169,0.4)]'
                                            : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-wrap lg:flex-nowrap gap-0 items-start lg:items-center justify-center lg:justify-start group px-2 lg:px-0"
                    >
                        {filteredMatches.map((match) => (
                            <motion.div
                                key={match.id}
                                variants={matchCardVariant}
                                whileHover={!match.isLocked ? {
                                    zIndex: 50,
                                    transition: { duration: 0.3 }
                                } : {}}
                                className={`relative flex-shrink-0 ${match.color} h-[280px] lg:h-[500px] w-full md:w-1/2 lg:w-1/4 rounded-tl-[24px] rounded-tr-none rounded-bl-none rounded-br-none lg:rounded-tl-[32px] overflow-hidden ${!match.isLocked ? 'cursor-pointer' : 'cursor-default'} shadow-[inset_-60px_0_60px_-10px_rgba(0,0,0,0.25),25px_0_40px_-15px_rgba(0,0,0,0.6)] mb-0 group/card`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute inset-0 rounded-tl-[24px] lg:rounded-tl-[32px] pointer-events-none z-[5] transition-shadow duration-300 ${!match.isLocked ? 'group-hover/card:shadow-[0_0_0_2px_rgba(255,255,255,0.3),0_0_20px_rgba(255,255,255,0.15)]' : ''}`} style={{
                                    clipPath: 'polygon(0 0, 100% 0, 100% 65px, calc(100% - 65px) 65px, 100% 100%, 0 100%)'
                                }} />

                                {/* Lock Overlay */}
                                {match.isLocked && (
                                    <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                            <Lock size={32} className="text-white/90" />
                                        </div>
                                        <span className="text-white/80 font-bold uppercase tracking-[0.2em] text-sm">Coming Soon</span>
                                    </div>
                                )}

                                {/* Chamfer */}
                                <div className="hidden lg:block absolute -top-[65px] -right-[65px] w-[130px] h-[130px] bg-[#0B0E14] transform rotate-45 z-20"></div>

                                {/* Title */}
                                <div className="absolute top-5 left-4 lg:top-10 lg:left-8 z-10 w-[85%] lg:w-[80%]">
                                    <h3 className={`text-xl lg:text-4xl font-oswald font-normal ${match.textColor} leading-[0.9] mb-1 lg:mb-2 tracking-tight`}>
                                        {match.title.split(' ').slice(0, 2).join(' ')} <br />
                                        <span className="font-bold">{match.title.split(' ').slice(2).join(' ')}</span>
                                    </h3>
                                    <p className={`${match.textColor} opacity-70 text-[10px] lg:text-sm font-medium tracking-wide`}>{match.subtitle}</p>
                                </div>

                                {/* Image */}
                                <img
                                    src={match.image}
                                    alt={match.subtitle}
                                    className={`absolute right-[-15%] top-[10%] lg:right-[-10%] lg:top-[15%] h-[80%] lg:h-[75%] w-auto object-cover object-center z-10 drop-shadow-2xl transition-transform duration-500 pointer-events-none scale-90 lg:scale-100 ${match.subtitle === 'BGMI' ? 'scale-x-[1] lg:scale-x-[-1]' : ''}`}
                                />

                                {/* Players */}
                                <div className={`absolute top-5 right-4 lg:top-auto lg:bottom-[100px] lg:left-8 ${match.textColor} font-bold text-[10px] lg:text-sm flex items-center gap-1 lg:gap-2 z-10 bg-white/20 lg:bg-transparent px-2 py-1 rounded-full lg:p-0`}>
                                    <Users size={14} className="lg:w-5 lg:h-5" strokeWidth={2} /> {match.players}
                                </div>

                                {/* Bottom Info Bar (Button Only) */}
                                <div className="absolute bottom-0 left-0 w-full h-[70px] lg:h-[95px] z-20">
                                    {!match.isLocked && (
                                        <MotionLink
                                            to={`/tournaments/${match.id}`}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="clicked"
                                            className="w-full h-full bg-[#001F29]/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-center gap-3 group/btn hover:bg-[#FF5E3A] transition-colors duration-300"
                                        >
                                            <motion.span
                                                className="text-white group-hover/btn:text-black font-black text-xl italic uppercase tracking-widest"
                                                variants={{ initial: { x: 0 }, hover: { x: -5 } }}
                                            >
                                                LET'S GO
                                            </motion.span>

                                            {/* Animated Arrow */}
                                            <motion.span
                                                className="flex items-center justify-center text-white group-hover/btn:text-black"
                                                variants={{ initial: { width: 0, opacity: 0, x: -10 }, hover: { width: 'auto', opacity: 1, x: 0 } }}
                                            >
                                                <ArrowRight size={24} strokeWidth={3} />
                                            </motion.span>
                                        </MotionLink>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ActiveMatches;
