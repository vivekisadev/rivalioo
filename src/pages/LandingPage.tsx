import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Swords, Crown, Gamepad2 } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import ActiveMatches from '../components/ActiveMatches';
import SubscriptionPlans from '../components/SubscriptionPlans';
import { marketplaceItems } from '../constants';

const MotionLink = motion(Link);

import roadmapChar from '../assets/images/roadmap-character.png';
import roadmapRing from '../assets/images/roadmap-ring.png';
import heroChar from '../assets/images/hero-character.png';
import bgImage from '../assets/images/hero-bg-2.png';
import bgLayer from '../assets/images/hero-bg-layer.png';
import { LEADERBOARD_DATA, fetchLeaderboard } from '../data/leaderboardData';
import type { Player } from '../data/leaderboardData';
import { RotatingTextContainer } from '../components/ui/rotating';

// Premium Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [leaderboardIndex, setLeaderboardIndex] = useState(0);
    const [leaderboardData, setLeaderboardData] = useState<Player[]>(LEADERBOARD_DATA);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchLeaderboard();
            setLeaderboardData(data);
        };
        loadData();
    }, []);

    const handleNextPlayer = () => {
        setLeaderboardIndex((prev) => (prev + 1) % leaderboardData.length);
    };

    const goToProfile = (player: Player) => {
        navigate('/leaderboard', { state: { player } });
    };

    return (
        <div className="bg-transparent min-h-screen font-sans text-white overflow-x-hidden selection:bg-[#2FE9A9] selection:text-black">

            {/* 1. HERO SECTION */}
            <section className="relative h-screen pt-20 flex items-center justify-center overflow-hidden">
                {/* Background Details */}
                <div className="absolute inset-0 z-0">
                    <img src={bgImage} alt="Hero Bg" className="absolute inset-0 w-full h-full object-cover opacity-100" />
                    <img src={bgLayer} alt="Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14]/80 via-transparent to-[#0B0E14]/80"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 h-full items-center">

                    {/* Left: Headline & Text (Cols 1-7, overlapping right) */}
                    <div className="lg:col-span-7 flex flex-col justify-center relative z-30 pt-20 lg:pt-0 items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-oswald font-bold leading-[0.9] lg:leading-[0.85] tracking-tight text-white uppercase whitespace-nowrap drop-shadow-2xl">
                                BE THE KING <br />
                                WIN ALL <br />
                                <RotatingTextContainer
                                    text={['CASH.', 'GLORY.', 'SKINS.']}
                                    className="text-[#2FE9A9]"
                                    duration={2500}
                                />
                            </motion.h1>

                            {/* Slider Indicators */}
                            <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-2 mt-8 lg:mt-12 mb-6">
                                <div className="w-12 h-3 bg-[#2FE9A9]"></div>
                                <div className="w-3 h-3 bg-gray-600"></div>
                                <div className="w-3 h-3 bg-gray-600"></div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Center: Character (Cols 5-9, Absolute Center Overlap) */}
                    <div className="lg:col-span-5 absolute left-1/2 -translate-x-1/2 top-32 lg:top-40 bottom-0 z-20 pointer-events-none flex items-end justify-center w-full lg:w-auto overflow-hidden lg:overflow-visible">
                        <motion.img
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            src={heroChar}
                            className="h-[80%] lg:h-full w-auto object-contain max-w-none drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)] opacity-40 lg:opacity-100"
                            alt="Hero Character"
                        />
                    </div>

                    {/* Right: Leaderboard Cards (Cols 8-12) */}
                    <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 items-center justify-end z-30 perspective-1000 relative h-[500px]">

                        {/* Green Geometric Accents */}
                        <div className="absolute top-[10%] right-[20%] w-32 h-32 bg-[#2FE9A9] rotate-45 blur-[2px] opacity-80 z-0"></div>
                        <div className="absolute bottom-[20%] left-[10%] w-24 h-24 bg-[#2FE9A9] rotate-45 blur-[40px] opacity-40 z-0"></div>
                        <div className="absolute top-[30%] right-[-5%] w-16 h-16 bg-[#2FE9A9] rotate-[15deg] opacity-20 z-0"></div>

                        <div className="relative h-[450px] w-full max-w-[600px] flex items-center justify-center perspective-1000">

                            <AnimatePresence mode="popLayout" initial={false}>
                                {[-1, 0, 1].map((offset) => {
                                    const length = leaderboardData.length;
                                    // Handle negative modulo correctly
                                    const playerIndex = (leaderboardIndex + offset + length) % length;
                                    const player = leaderboardData[playerIndex];

                                    if (!player) return null; // Safety check

                                    // Determine visual state
                                    let variant = "center";
                                    if (offset === -1) variant = "left";
                                    if (offset === 1) variant = "right";

                                    return (
                                        <motion.div
                                            key={player.rank}
                                            initial={{ opacity: 0, scale: 0.5, x: offset * 200 }}
                                            animate={variant}
                                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                            variants={{
                                                left: { x: -160, y: 20, scale: 0.85, zIndex: 10, opacity: 0.6, rotateY: 15, rotateX: 5 },
                                                center: { x: 0, y: 0, scale: 1, zIndex: 30, opacity: 1, rotateY: 0, rotateX: 0 },
                                                right: { x: 160, y: 20, scale: 0.85, zIndex: 10, opacity: 0.6, rotateY: -15, rotateX: 5 }
                                            }}
                                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                            className={`absolute w-56 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center 
                                                ${variant === 'center' ? 'bg-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white/5 grayscale-[0.5]'}`}
                                            style={{
                                                backdropFilter: 'blur(12px)',
                                                WebkitBackdropFilter: 'blur(12px)',
                                            }}
                                            onClick={() => offset !== 0 && setLeaderboardIndex(playerIndex)}
                                        >
                                            {/* Rank Badge - Neutral now */}
                                            <div className="absolute -top-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white font-black text-sm flex items-center justify-center shadow-lg backdrop-blur-md z-40">
                                                #{player.rank}
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col items-center mt-4 w-full">
                                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">{player.region}</span>

                                                <div className="w-16 h-16 rounded-full p-1 mb-3 bg-white/5 border border-white/10 relative overflow-hidden">
                                                    <img src={player.img} className="w-full h-full rounded-full object-cover" />
                                                </div>

                                                <h3 className="font-bold text-white text-base mb-1 truncate w-full text-center">{player.name}</h3>
                                                <p className="font-oswald text-gray-300 text-lg tracking-wide">{player.score}</p>
                                            </div>

                                            {/* Footer Button - The ONLY colored element */}
                                            <motion.div
                                                whileHover={variant === 'center' ? { scale: 1.05 } : {}}
                                                whileTap={variant === 'center' ? { scale: 0.95 } : {}}
                                                onClick={(e) => {
                                                    if (variant === 'center') {
                                                        e.stopPropagation();
                                                        goToProfile(player);
                                                    }
                                                }}
                                                className={`mt-5 w-full py-2 rounded-lg text-center cursor-pointer transition-all duration-300 shadow-lg
                                                    ${variant === 'center'
                                                        ? 'bg-[#2FE9A9] text-black hover:bg-[#25D99B] hover:shadow-[#2FE9A9]/20'
                                                        : 'bg-white/5 text-gray-500 pointer-events-none'}`}
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest">
                                                    View Profile
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <div className="absolute -bottom-16 flex gap-4">
                                <button onClick={() => setLeaderboardIndex((prev) => (prev - 1 + leaderboardData.length) % leaderboardData.length)} className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                                    <ArrowRight className="text-white w-5 h-5 rotate-180" />
                                </button>
                                <button onClick={handleNextPlayer} className="p-3 rounded-full border border-white/10 bg-[#2FE9A9] text-black hover:bg-[#25D99B] transition-colors shadow-lg shadow-[#2FE9A9]/20">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* 2. ACTIVE MATCHES SECTION (Component) */}
            <ActiveMatches />





            {/* 3. ROADMAP (Redesigned) */}
            <section className="pb-32 pt-0 bg-transparent relative overflow-hidden">
                {/* Fade In Transition */}
                <div className="w-full h-32 bg-gradient-to-b from-transparent via-[#0B0E14]/80 to-[#0B0E14] -mt-16 relative z-10 pointer-events-none"></div>

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20 mt-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative z-10"
                    >
                        <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-oswald font-bold uppercase text-white mb-6 leading-tight tracking-tight">
                            Your Roadmap <br /> To Rewards.
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-gray-400 mb-12 text-lg max-w-lg leading-relaxed">
                            Compete daily, earn Tickets, climb the ranks, and turn your Coins into real rewards.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Gamepad2,
                                    title: "REGISTER",
                                    desc: "Create your Rivalioo account, set up your squad, and enter daily tournaments.",
                                    color: "text-[#2FE9A9]",
                                    border: "border-[#2FE9A9]"
                                },
                                {
                                    icon: Swords,
                                    title: "COMPETE",
                                    desc: "Play Battle Royale or 5v5 matches, earn Tickets daily, and win Coins on the weekends.",
                                    color: "text-white",
                                    border: "border-white/20"
                                },
                                {
                                    icon: Crown,
                                    title: "REDEEM",
                                    desc: "Use the Coins in the Rivalioo Marketplace to unlock game gear, vouchers, and exclusive items.",
                                    color: "text-[#00D2FF]",
                                    border: "border-[#00D2FF]"
                                }
                            ].map((step, i) => (
                                <div key={i} className="glass-panel p-6 rounded-xl relative group hover:-translate-y-2 transition-transform duration-300">
                                    {/* Accent Line */}
                                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${step.color.replace('text-', '')} to-transparent opacity-0 group-hover:opacity-50 transition-opacity`}></div>

                                    <div className="mb-4 relative">
                                        <step.icon className={`w-8 h-8 ${step.color}`} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-oswald font-bold uppercase text-white text-lg mb-3">{step.title}</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{step.desc}</p>

                                    {/* Corner Accents */}
                                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${step.border} opacity-50`}></div>
                                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${step.border} opacity-50`}></div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex gap-6">
                            <MotionLink
                                to="/signup"
                                initial="initial"
                                whileHover="hover"
                                className="px-8 py-4 bg-[#FF5E3A] text-black font-oswald font-bold uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2 text-center shadow-[0_0_20px_rgba(255,94,58,0.4)]"
                                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>JOIN NOW</motion.span>
                                <motion.span
                                    variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                                    style={{ overflow: "hidden", display: "inline-block" }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </MotionLink>
                            <motion.button
                                initial="initial"
                                whileHover="hover"
                                className="flex items-center gap-2 text-white font-oswald font-bold uppercase tracking-widest text-sm hover:text-[#2FE9A9] transition-colors border border-white/20 px-8 py-4 hover:border-[#2FE9A9] hover:bg-[#2FE9A9]/5"
                                style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
                            >
                                <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>LEARN MORE</motion.span>
                                <motion.span
                                    variants={{ initial: { x: 0 }, hover: { x: 3 } }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Character & Hexagon */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-[500px] h-[600px] flex items-center justify-center">

                            {/* Ring Image */}
                            <img
                                src={roadmapRing}
                                className="absolute z-0 w-[550px] h-auto object-contain opacity-100 scale-110"
                                alt=""
                            />

                            {/* Character Image */}
                            <img
                                src={roadmapChar}
                                className="relative z-10 w-[90%] h-[90%] object-contain mt-10 filter contrast-110 brightness-110"
                                style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
                                alt="Character"
                            />

                            {/* Glow Behind Character */}
                            <div className="absolute inset-0 bg-[#2FE9A9] opacity-5 blur-[100px] rounded-full z-0"></div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. MARKETPLACE */}
            <section className="py-24 bg-transparent overflow-hidden">
                <div className="container mx-auto px-6 mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-2">The Marketplace</h2>
                            <p className="text-gray-400 text-base">Redeem your hard earned coins for premium gaming gear.</p>
                        </div>
                        <Link
                            to="/shop"
                            className="hidden md:flex group px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#2FE9A9] hover:bg-white/10 rounded-full text-white font-bold uppercase text-sm tracking-widest transition-all duration-300 items-center gap-3 hover:shadow-[0_0_20px_rgba(47,233,169,0.2)]"
                        >
                            View All Items
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Infinite Horizontal Scrolling Products */}
                <div className="relative">
                    <motion.div
                        key="marketplace-carousel"
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, repeatType: "loop", ease: "linear", duration: 60 }}
                        className="flex gap-6"
                        style={{ x: 0 }}
                    >
                        {/* Duplicate items for seamless loop */}
                        {[...marketplaceItems, ...marketplaceItems].map((item, index) => (
                            <Link
                                key={`${item.id}-${index}`}
                                to="/shop"
                                state={{ selectedProduct: item }}
                                className="group relative cursor-pointer flex-shrink-0 w-[280px]"
                            >
                                <div className="relative aspect-[3/4] glass-panel rounded-xl overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(0.0.0.0.4)]">
                                    {/* Product Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-3 z-20">
                                        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col gap-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[#2FE9A9] font-bold text-sm">₹{item.priceMoney?.toLocaleString()}</span>
                                                <span className="text-white/90 font-bold text-[10px] bg-white/15 backdrop-blur-sm px-2 py-1 rounded-md">
                                                    {item.priceCredits?.toLocaleString()} RC
                                                </span>
                                            </div>
                                            <button className="w-full py-2 bg-[#2FE9A9] text-black font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#25C890] transition-all duration-300 shadow-lg">
                                                View Item
                                            </button>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    {item.subtitle && (
                                        <div className="absolute top-2 left-2 z-20">
                                            <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-lg">
                                                {item.subtitle}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Title Below */}
                                <div className="mt-3 text-center">
                                    <h4 className="font-semibold text-xs text-gray-300 group-hover:text-white transition-colors truncate">{item.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {/* Mobile View All Button */}
                <div className="flex justify-center mt-12 md:hidden px-6">
                    <Link
                        to="/shop"
                        className="group px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#2FE9A9] hover:bg-white/10 rounded-full text-white font-bold uppercase text-sm tracking-widest transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(47,233,169,0.2)]"
                    >
                        View All Items
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </section>


            {/* 5. JOIN SQUAD */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="relative bg-[#0B0E14] border border-white/10 rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1500" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />

                        <div className="relative z-20 max-w-lg">
                            <h2 className="text-4xl font-black uppercase text-white mb-4">Join The Squad</h2>
                            <p className="text-gray-400 mb-8">Get exclusive access to premium tournaments, community events, and mentorship from pro players.</p>
                            <MotionLink
                                to="/signup"
                                initial="initial"
                                whileHover="hover"
                                className="px-6 py-2 bg-[#FF5E3A] hover:bg-[#FF4520] text-black font-black uppercase tracking-wider text-xs transition-transform inline-flex items-center justify-center gap-2 text-center"
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>Register Now</motion.span>
                                <motion.span
                                    variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                                    style={{ overflow: "hidden", display: "inline-block" }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </MotionLink>
                        </div>
                    </div>
                </div>
            </section>



            {/* 6. SUBSCRIPTION PLANS */}
            <SubscriptionPlans />


            {/* 7. SQUAD UP & EARN */}
            <section className="py-24 bg-transparent">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-black uppercase text-white mb-4">Squad Up & Earn</h2>
                        <p className="text-gray-400 mb-6">Earn bonuses for every friend you invite to the platform.</p>
                        <div className="flex gap-4">
                            <div className="bg-[#0B0E14] px-6 py-4 rounded-xl border border-white/10 text-center">
                                <div className="text-2xl font-black text-[#2FE9A9]">100</div>
                                <div className="text-xs uppercase font-bold text-gray-500">Coins / Friend</div>
                            </div>
                            <div className="bg-[#0B0E14] px-6 py-4 rounded-xl border border-white/10 text-center">
                                <div className="text-2xl font-black text-[#FF5E3A]">Bonus</div>
                                <div className="text-xs uppercase font-bold text-gray-500">Rewards</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="group px-10 py-4 bg-[#FF5E3A] text-black font-black uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center justify-center gap-2" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                            <span className="transition-transform duration-300 group-hover:-translate-x-1">Invite Now</span>
                            <ArrowRight className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300" />
                        </button>
                    </div>
                </div>
            </section>

            {/* 8. FOOTER CTA */}
            <div className="py-20 text-center bg-transparent bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                <h2 className="text-3xl font-black uppercase text-white mb-8">Ready To Start Winning?</h2>
                <div className="flex justify-center gap-6">
                    <MotionLink
                        to="/signup"
                        initial="initial"
                        whileHover="hover"
                        className="px-6 py-2 bg-[#2FE9A9] text-black font-black uppercase tracking-wider shadow-[0_0_20px_rgba(47,233,169,0.4)] inline-flex items-center justify-center gap-2 text-center"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>Start My Journey</motion.span>
                        <motion.span
                            variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                            style={{ overflow: "hidden", display: "inline-block" }}
                        >
                            <ArrowRight size={16} />
                        </motion.span>
                    </MotionLink>
                    <button className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>Learn More</button>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
