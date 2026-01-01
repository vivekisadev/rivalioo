import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Trophy, Timer, ArrowRight, Sword, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ticketIcon from '../assets/images/ticket-f.png';
import coinsIcon from '../assets/images/coins.png';
import TiltCard from '../components/ui/TiltCard';

const EventsListPage = () => {
    const { gameId, categoryId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming'>('ongoing');

    // Mock Ticket Balances for demo
    const balances: Record<string, string> = {
        daily: "3/3",
        storm: "1/2",
        rush: "0/1"
    };

    const currentTicketBalance = balances[categoryId || ''] || "0";

    // Mock Data based on category
    const matches = [
        {
            id: 101,
            name: "Mid-Day Madness",
            time: "Ends in 2h",
            prize: "500",
            prizeType: "credits",
            status: 'ongoing',
            players: "82/100",
            entry: "Free",
            map: "Erangel",
            mode: "Squad"
        },
        {
            id: 102,
            name: "Evening Skirmish",
            time: "Starts in 45m",
            prize: "200",
            prizeType: "credits",
            status: 'upcoming',
            players: "45/100",
            entry: "Free",
            map: "Miramar",
            mode: "Duo"
        },
        {
            id: 103,
            name: "Night Owl Solo",
            time: "Starts in 3h",
            prize: "1000",
            prizeType: "credits",
            status: 'upcoming',
            players: "12/100",
            entry: "50 Credits",
            map: "Sanhok",
            mode: "Solo"
        },
        {
            id: 104,
            name: "Pro League Qualifier",
            time: "Live Now",
            prize: "5000",
            prizeType: "credits",
            status: 'ongoing',
            players: "98/100",
            entry: "Ticket",
            map: "Erangel",
            mode: "Squad"
        },
    ];

    const filteredMatches = matches.filter(m => m.status === activeTab);

    return (
        <div className="pt-28 pb-20 min-h-screen px-6 max-w-7xl mx-auto flex flex-col items-center relative">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2FE9A9]/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF5E3A]/5 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* Header */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                <div className="flex flex-col items-start gap-4">
                    {/* Breadcrumb / Back */}
                    <button
                        onClick={() => navigate(`/tournaments/${gameId}`)}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all backdrop-blur-md"
                    >
                        <ArrowLeft size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">Back to Categories</span>
                    </button>

                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 italic uppercase tracking-tighter"
                        >
                            {categoryId} <span className="text-[#2FE9A9]">EVENTS</span>
                        </motion.h1>

                        <div className="flex items-center gap-4 mt-3">
                            <span className="px-3 py-1 rounded bg-[#2FE9A9]/10 text-[#2FE9A9] text-[10px] font-bold uppercase tracking-widest border border-[#2FE9A9]/20">
                                {gameId}
                            </span>
                            {/* Contextual Ticket Display */}
                            {(categoryId === 'daily' || categoryId === 'storm' || categoryId === 'rush') && (
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#1A1D26] border border-white/10">
                                    <img src={ticketIcon} className="w-3.5 h-3.5 object-contain opacity-80" alt="Ticket" />
                                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                                        Balance: <span className="text-white ml-1">{currentTicketBalance}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1.5 bg-[#0B0E14]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
                    <button
                        onClick={() => setActiveTab('ongoing')}
                        className={`relative px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all overflow-hidden ${activeTab === 'ongoing' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        {activeTab === 'ongoing' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.4)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'ongoing' ? 'bg-black animate-pulse' : 'bg-red-500'}`} />
                            Live Events
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`relative px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all overflow-hidden ${activeTab === 'upcoming' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        {activeTab === 'upcoming' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.4)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Calendar size={14} />
                            Upcoming
                        </span>
                    </button>
                </div>
            </div>

            {/* Grid List */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                <AnimatePresence mode="popLayout">
                    {filteredMatches.map((match, idx) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                delay: idx * 0.1,
                                type: "spring",
                                stiffness: 50,
                                damping: 15
                            }}
                        >
                            <TiltCard className="group h-[320px] rounded-2xl bg-[#13161C] border border-white/5 backdrop-blur-md">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                                {/* Card Graphic / Map Image Placeholder */}
                                <div className="h-40 w-full bg-gradient-to-br from-[#1A1D26] to-[#0F1218] rounded-t-2xl relative overflow-hidden p-6 flex items-center justify-center">
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${match.status === 'ongoing' ? 'bg-red-500/20 border-red-500/20 text-red-500' : 'bg-blue-500/20 border-blue-500/20 text-blue-500'}`}>
                                            {match.status === 'ongoing' ? 'Live' : 'Upcoming'}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className={`p-4 rounded-full border-2 transition-transform duration-500 group-hover:scale-110 ${match.status === 'ongoing' ? 'border-red-500/30 bg-red-500/10 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-[#2FE9A9]/30 bg-[#2FE9A9]/10 text-[#2FE9A9] shadow-[0_0_30px_rgba(47,233,169,0.2)]'}`}>
                                        {match.status === 'ongoing' ? <Sword size={32} /> : <Timer size={32} />}
                                    </div>

                                    {/* Map Patterns Overlay */}
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-xs font-mono text-gray-500">{match.time}</div>
                                        <div className="flex items-center gap-1">
                                            <Users size={12} className="text-gray-500" />
                                            <span className="text-xs font-bold text-gray-400">{match.players}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black italic uppercase text-white mb-4 group-hover:text-[#2FE9A9] transition-colors">{match.name}</h3>

                                    {/* Prize Info (Slides out on hover) */}
                                    <div className="transform transition-all duration-300 group-hover:translate-y-[-10px] group-hover:opacity-0 pointer-events-none">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-[#2FE9A9]/10 flex items-center justify-center border border-[#2FE9A9]/20">
                                                <img src={coinsIcon} className="w-4 h-4 object-contain" alt="Credits" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-500 uppercase">Prize Pool</div>
                                                <div className="text-base font-bold text-white tracking-tight">{match.prize} Credits</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Register Button (Slides in on hover) */}
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // prevent tilt card click if we add one later
                                                navigate(`/tournaments/match/${match.id}`);
                                            }}
                                            className="w-full py-3 bg-white hover:bg-[#2FE9A9] text-black font-bold uppercase text-xs tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
                                        >
                                            Register Now <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredMatches.length === 0 && (
                    <div className="col-span-full text-center py-24">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-600 border border-white/5">
                            <Trophy size={40} />
                        </div>
                        <h3 className="text-white font-black italic text-2xl mb-2 uppercase">No Events Found</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">There are no matches scheduled for this category right now.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsListPage;
