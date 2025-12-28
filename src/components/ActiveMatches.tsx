import { ArrowRight, Users, Diamond } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

// Import local assets
import ffImage from '../assets/images/ff.png';
import bgmiImage from '../assets/images/bgmi.png';
import codImage from '../assets/images/cod.png';
import apexImage from '../assets/images/apex.png';

// Container variants for the "Strict Sequencing" logic
const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12, // Rhythmic delay
            delayChildren: 0.05,
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.1, ease: "easeOut" } as any // Instant removal
    }
};

// Refined "Sharp Wipe" Reveal
// Removed blur completely. Card is opaque behind the mask.
const matchCardVariant = {
    hidden: {
        opacity: 1, // Fully opaque (content exists, just masked)
        clipPath: "inset(0 100% 0 0)", // Fully Masked
    },
    visible: {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)", // Unmask to reveal
        transition: {
            duration: 1.4, // Luxurious slow wipe
            ease: [0.16, 1, 0.3, 1] as any, // Expo curve
        }
    }
};

const ActiveMatches = ({ showFilters = false }: { showFilters?: boolean }) => {
    const filters = ["All", "Free Fire", "BGMI", "COD", "Apex Legends"];
    const [activeFilter, setActiveFilter] = useState("All");
    const [isNavigating, setIsNavigating] = useState(false);

    const matches = [
        {
            id: 1,
            title: "Blaze Ops Arena",
            subtitle: "Free Fire",
            image: ffImage,
            color: "bg-[#00D2FF]",
            prize: "500",
            mode: "1 V 1",
            entry: "Free",
            players: "78/100"
        },
        {
            id: 2,
            title: "Last Squad Standing",
            subtitle: "BGMI",
            image: bgmiImage,
            color: "bg-[#7CFFCB]",
            prize: "200",
            mode: "2 V 2",
            entry: "Free",
            players: "78/100"
        },
        {
            id: 3,
            title: "Call Of Duty : Warzone",
            subtitle: "COD",
            image: codImage,
            color: "bg-[#50E3C2]",
            prize: "700",
            mode: "2 V 2",
            entry: "Free",
            players: "78/100"
        },
        {
            id: 4,
            title: "Legends Arena Clash",
            subtitle: "Apex Legends",
            image: apexImage,
            color: "bg-[#AEEEEE]",
            prize: "$30",
            mode: "5 V 5",
            entry: "Free",
            players: "78/100"
        }
    ];

    const filteredMatches = activeFilter === "All"
        ? matches
        : matches.filter(match => match.subtitle.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section className="py-20 relative z-20 overflow-hidden">
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
                                    Earn tickets to join tournaments and win real cash prices!
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
                                whileHover={{
                                    zIndex: 50,
                                    scale: 1,
                                    transition: { duration: 0.3 }
                                }}
                                // Verified Layout: 25% width on desktop, 0 gap
                                className={`relative flex-shrink-0 ${match.color} h-[280px] lg:h-[500px] w-full md:w-1/2 lg:w-1/4 rounded-tl-[24px] rounded-tr-none rounded-bl-none rounded-br-none lg:rounded-tl-[32px] overflow-hidden lg:group-hover:blur-[2px] transition-[filter] duration-300 hover:!blur-none shadow-[20px_0_50px_-10px_rgba(0,0,0,0.5)] cursor-pointer mb-0`}
                            >
                                {/* Top Right Chamfer Effect (Black Bg) - Desktop Only */}
                                <div className="hidden lg:block absolute -top-[65px] -right-[65px] w-[130px] h-[130px] bg-[#0B0E14] transform rotate-45 z-20"></div>

                                {/* Title & Subtitle */}
                                <div className="absolute top-5 left-4 lg:top-10 lg:left-8 z-10 w-[85%] lg:w-[80%]">
                                    <h3 className="text-xl lg:text-4xl font-oswald font-normal text-[#1A1A1A] leading-[0.9] mb-1 lg:mb-2 tracking-tight">
                                        {match.title.split(' ').slice(0, 2).join(' ')} <br />
                                        <span className="font-bold">{match.title.split(' ').slice(2).join(' ')}</span>
                                    </h3>
                                    <p className="text-[#1A1A1A]/70 text-[10px] lg:text-sm font-medium tracking-wide">{match.subtitle}</p>
                                </div>

                                {/* Character Image */}
                                <img
                                    src={match.image}
                                    alt={match.subtitle}
                                    className={`absolute right-[-15%] top-[10%] lg:right-[-10%] lg:top-[15%] h-[80%] lg:h-[75%] w-auto object-cover object-center z-10 drop-shadow-2xl transition-transform duration-500 pointer-events-none scale-90 lg:scale-100 ${match.subtitle === 'BGMI' ? 'scale-x-[1] lg:scale-x-[-1]' : ''}`}
                                />

                                {/* Player Count */}
                                <div className="absolute top-5 right-4 lg:top-auto lg:bottom-[100px] lg:left-8 text-[#1A1A1A] font-bold text-[10px] lg:text-sm flex items-center gap-1 lg:gap-2 z-10 bg-white/20 lg:bg-transparent px-2 py-1 rounded-full lg:p-0">
                                    <Users size={14} className="lg:w-5 lg:h-5" strokeWidth={2} /> {match.players}
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="absolute -bottom-[1px] lg:-bottom-[2px] -left-[1px] w-[101%] h-[70px] lg:h-[95px] bg-[#003B46] backdrop-blur-md flex items-center justify-between px-4 lg:px-10 z-20">
                                    <div className="flex gap-2 lg:gap-8 overflow-hidden">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] lg:text-[11px] text-[#8aaeb5] font-medium uppercase tracking-wide mb-0.5">Mode</span>
                                            <span className="text-white font-bold text-xs lg:text-base tracking-wide whitespace-nowrap">{match.mode}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] lg:text-[11px] text-[#8aaeb5] font-medium uppercase tracking-wide mb-0.5">Prize</span>
                                            <span className="text-white font-bold text-xs lg:text-base flex items-center gap-1">{match.prize} <Diamond size={10} className="text-[#2FE9A9] fill-current lg:w-3 lg:h-3" /></span>
                                        </div>
                                    </div>

                                    <MotionLink
                                        to="/tournaments"
                                        initial="initial"
                                        whileHover={isNavigating ? "initial" : "hover"}
                                        whileTap="initial"
                                        onClick={() => setIsNavigating(true)}
                                        onHoverEnd={() => setIsNavigating(false)}
                                        className="w-10 h-10 lg:w-auto lg:h-auto lg:px-6 lg:py-2 bg-[#FF5E3A] hover:bg-[#FF4520] text-black font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 rounded-full lg:rounded-none lg:[clip-path:polygon(10px_0,100%_0,100%_calc(100%_-_10px),calc(100%_-_10px)_100%,0_100%,0_10px)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <motion.span
                                            className="hidden lg:inline"
                                            variants={{ initial: { x: 0 }, hover: { x: -3 } }}
                                        >
                                            JOIN
                                        </motion.span>

                                        {/* Animated Arrow (Desktop) */}
                                        <motion.span
                                            className="hidden lg:inline-flex"
                                            variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                                            style={{ overflow: "hidden" }}
                                        >
                                            <ArrowRight size={16} strokeWidth={2.5} />
                                        </motion.span>

                                        {/* Static Arrow (Mobile) */}
                                        <span className="lg:hidden">
                                            <ArrowRight size={16} strokeWidth={2.5} />
                                        </span>
                                    </MotionLink>
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
