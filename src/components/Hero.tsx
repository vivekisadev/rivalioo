import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/hero-character.png';
import bgImage from '../assets/images/hero-bg-2.png';
import ffImage from '../assets/images/ff.png';
import bgmiImage from '../assets/images/bgmi.png';
import codImage from '../assets/images/cod.png';

const Hero = () => {
    // Mock Data for Leaderboard
    const leaderboardData = [
        { id: 1, rank: "#1", region: "Asia", name: "Ayush b", rp: "2331 RP", img: ffImage },
        { id: 2, rank: "#2", region: "Africa", name: "Crazy x", rp: "2151 RP", img: bgmiImage },
        { id: 3, rank: "#3", region: "America", name: "gamer b", rp: "1131 RP", img: codImage },
        { id: 4, rank: "#4", region: "Europe", name: "Viper", rp: "1050 RP", img: ffImage },
        { id: 5, rank: "#5", region: "Oceania", name: "Ghost", rp: "980 RP", img: bgmiImage },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % leaderboardData.length);
    };

    // Determine the 3 visible cards based on currentIndex
    const visibleCards = [
        leaderboardData[currentIndex % leaderboardData.length],
        leaderboardData[(currentIndex + 1) % leaderboardData.length],
        leaderboardData[(currentIndex + 2) % leaderboardData.length],
    ];

    return (
        <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0B0E14] pt-20">
            {/* Main Background Image */}
            {/* Main Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 h-full items-center">

                {/* LEFT: Text Content */}
                <div className="lg:col-span-7 flex flex-col justify-center z-20 pt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[5rem] md:text-[6rem] lg:text-[7rem] font-oswald font-bold leading-[0.85] tracking-tight text-white uppercase">
                            BE THE KING WIN ALL CASH.
                        </h1>
                    </motion.div>

                    {/* Slider Indicators */}
                    <div className="flex items-center gap-2 mt-8 mb-6">
                        <div className="w-12 h-2 bg-[#2FE9A9]"></div>
                        <div className="w-2 h-2 bg-gray-600"></div>
                        <div className="w-2 h-2 bg-gray-600"></div>
                    </div>

                    <p className="text-gray-400 text-sm font-sans mb-10 leading-relaxed tracking-wide">
                        Join the grand tournaments today. Compete and secure your reward.
                    </p>
                </div>

                {/* CENTER: Character Image */}
                <div className="lg:col-span-5 relative h-[600px] flex items-end justify-center z-10 pointer-events-none min-w-[500px]">
                    <motion.img
                        src={heroImg}
                        alt="Hero Character"
                        className="absolute bottom-[-50px] scale-125 lg:scale-150 object-contain max-h-[110%]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                </div>

                {/* RIGHT: Leaderboard Cards */}
                <div className="lg:col-span-4 relative flex items-center justify-end h-full z-20 pl-10 lg:pl-0 min-h-[400px]">
                    {/* Geometric Decorations */}
                    <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-[#2FE9A9] rotate-45 blur-[40px] opacity-20 animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#2FE9A9] rotate-45 z-0"></div>
                    <div className="absolute bottom-20 left-0 w-16 h-16 bg-[#2FE9A9] rotate-45 z-0"></div>

                    <div className="relative w-full flex items-center justify-center lg:justify-end gap-4 overflow-visible pr-10 perspective-[1000px]">
                        <AnimatePresence mode='popLayout'>
                            {visibleCards.map((card, index) => {
                                // Middle card is active (index 1)
                                const active = index === 1;
                                return (
                                    <LeaderboardCard
                                        key={card.id}
                                        data={card}
                                        active={active}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Arrow Navigation */}
                    <motion.button
                        whileHover={{ scale: 1.1, color: "#2FE9A9" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white transition-colors translate-x-1/2 lg:translate-x-0 bg-black/20 backdrop-blur-sm p-2 rounded-full border border-white/10 z-30"
                    >
                        <ArrowRight size={32} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

const LeaderboardCard = ({ data, active }: { data: any, active: boolean }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{
                opacity: active ? 1 : 0.6,
                scale: active ? 1.1 : 0.9,
                zIndex: active ? 20 : 10,
                x: 0,
                filter: active ? 'blur(0px)' : 'blur(0px)'
            }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            whileHover={{
                scale: active ? 1.15 : 0.95,
                opacity: 1,
                zIndex: 30,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
                relative w-40 flex-shrink-0 bg-[#1A1D26]/90 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden flex flex-col items-center pt-6
                ${active ? 'shadow-[0_0_30px_rgba(47,233,169,0.2)] border-[#2FE9A9]/30' : ''}
            `}
        >
            <span className="text-gray-400 text-xs font-bold mb-2">{data.rank}</span>
            <span className="text-gray-300 text-xs font-medium mb-3">{data.region}</span>

            <div className={`w-12 h-12 rounded-full p-0.5 mb-3 transition-colors duration-300 ${active ? 'bg-gradient-to-tr from-[#2FE9A9] to-blue-500' : 'bg-gray-700'}`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
                </div>
            </div>

            <h4 className="text-white text-sm font-bold mb-1">{data.name}</h4>
            <p className="text-white font-bold text-xs mb-4">{data.rp}</p>

            <div className="w-full bg-[#13161C] py-2 text-center border-t border-white/5">
                <span className="text-[10px] text-gray-400 uppercase font-medium">Leader board</span>
            </div>
        </motion.div>
    );
};

export default Hero;
