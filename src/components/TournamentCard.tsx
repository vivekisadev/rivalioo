import { Users, Diamond, ArrowRight, Calendar } from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';
import { motion } from 'framer-motion';

interface TournamentCardProps {
    id: string;
    game: string;
    gameImage: string;
    type: string;
    prizePool: number;
    date: string;
    entryFee: number; // 0 for free
    maxPlayers?: number;
    currentPlayers?: number;
    status?: 'upcoming' | 'live' | 'completed';
    onViewClick?: () => void;
    index?: number;
}

const cardVariant = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.05,
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1] as any
        }
    }),
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};

const TournamentCard = ({
    game,
    gameImage,
    type,
    prizePool,
    date,
    entryFee,
    maxPlayers,
    currentPlayers,
    status = 'upcoming',
    onViewClick,
    index = 0
}: TournamentCardProps) => {

    const slotsLeft = (maxPlayers || 0) - (currentPlayers || 0);
    const isFree = entryFee === 0;

    return (
        <motion.div
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
            onClick={onViewClick}
            className="h-full cursor-pointer hover:-translate-y-2 transition-transform duration-300"
        >
            <BackgroundGradient className="flex flex-col w-full h-full bg-[#13161C] rounded-[24px] overflow-hidden" containerClassName="h-full p-[1px] rounded-[25px]">
                {/* Image Section (Standard Height) */}
                <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#0B0E14]">
                    <img
                        src={gameImage}
                        alt={game}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13161C] via-[#13161C]/20 to-transparent"></div>

                    {/* Date Badge */}
                    <div className="absolute top-0 left-0 bg-[#0B0E14]/90 backdrop-blur-md px-4 py-2 rounded-br-2xl border-r border-b border-white/10 flex items-center gap-2 z-10">
                        <Calendar size={12} className="text-[#2FE9A9]" />
                        <span className="text-white text-[10px] font-black tracking-widest uppercase">{date}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        {status === 'live' ? (
                            <div className="px-3 py-1 bg-[#EF4444] text-white text-[9px] font-black uppercase tracking-[0.1em] rounded-lg flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                LIVE
                            </div>
                        ) : (
                            <div className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.1em] rounded-lg border border-white/10">
                                {status}
                            </div>
                        )}
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-5 right-5 z-10">
                        <h3 className="text-xl font-oswald font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-[#2FE9A9] transition-colors">
                            {game}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#2FE9A9] font-black uppercase tracking-widest px-2 py-0.5 bg-[#2FE9A9]/10 rounded border border-[#2FE9A9]/20">
                                {type}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Section (Standard Structure) */}
                <div className="p-5 flex flex-col flex-1 gap-5 bg-[#13161C]">
                    {/* Stats Grid - Fixed Height row */}
                    <div className="grid grid-cols-2 gap-3 h-[70px]">
                        <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/5 flex flex-col justify-center gap-1 transition-all group-hover:bg-[#1A1E26] group-hover:border-[#2FE9A9]/10 h-full">
                            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Prize Pool</span>
                            <div className="flex items-center gap-1.5">
                                <Diamond size={12} className="text-[#2FE9A9] fill-[#2FE9A9]/20" />
                                <span className="text-base font-black text-white tracking-tight">{prizePool.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/5 flex flex-col justify-center gap-1 transition-all group-hover:bg-[#1A1E26] group-hover:border-[#2FE9A9]/10 h-full">
                            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">Entry Fee</span>
                            <span className={`text-base font-black tracking-tight ${isFree ? 'text-[#2FE9A9]' : 'text-white'}`}>
                                {isFree ? 'FREE' : `₹${entryFee}`}
                            </span>
                        </div>
                    </div>

                    {/* Players Bar */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest px-1">
                            <div className="flex items-center gap-2">
                                <Users size={12} className="text-gray-500" />
                                <span className="text-white">{currentPlayers}</span>
                                <span className="text-gray-600">/</span>
                                <span className="text-gray-400">{maxPlayers}</span>
                            </div>
                            {slotsLeft > 0 && slotsLeft <= 10 ? (
                                <span className="text-[#FF5E3A] animate-pulse">Hurry! {slotsLeft} Left</span>
                            ) : slotsLeft === 0 ? (
                                <span className="text-[#EF4444]">Full House</span>
                            ) : (
                                <span className="text-gray-500">{slotsLeft} Slots</span>
                            )}
                        </div>
                        <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentPlayers! / maxPlayers!) * 100}%` }}
                                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                                className="h-full bg-gradient-to-r from-[#2FE9A9] to-[#00C6FF] rounded-full shadow-[0_0_10px_rgba(47,233,169,0.2)]"
                            ></motion.div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            className="w-full py-3.5 bg-white/5 hover:bg-[#2FE9A9] text-white hover:text-black font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-xl border border-white/10 hover:border-[#2FE9A9] group/btn shadow-lg"
                        >
                            <span>View Details</span>
                            <ArrowRight size={14} strokeWidth={3} className="transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </div>
                </div>
            </BackgroundGradient>
        </motion.div>
    );
};

export default TournamentCard;
