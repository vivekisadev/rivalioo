import { useState, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutsideClick } from '../hooks/use-outside-click';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { fetchLeaderboard, LEADERBOARD_DATA } from '../data/leaderboardData';
import type { Player } from '../data/leaderboardData';
import { useAuth } from '../context/AuthContext';
import PublicProfile from '../components/PublicProfile';
import GameFilterSlider from '../components/GameFilterSlider';

// Game Icons/Images (Reused for consistency)


const Leaderboard = () => {
    const location = useLocation();
    const { } = useAuth();
    const [selectedGame, setSelectedGame] = useState('All Games');
    const [selectedPeriod] = useState('This Week');
    const [selectedRegion] = useState('Global Rankings');
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [players, setPlayers] = useState<Player[]>(LEADERBOARD_DATA);

    // Animation refs
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useOutsideClick(ref, () => setSelectedPlayer(null));

    useEffect(() => {
        const load = async () => {
            const data = await fetchLeaderboard();
            if (data && data.length > 0) {
                setPlayers(data);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (location.state?.player) {
            setSelectedPlayer(location.state.player);
        }
    }, [location.state]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedPlayer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedPlayer]);




    const games = ['All Games', 'BGMI', 'COD', 'Free Fire', 'Valorant'];

    // Construct Podium view (Left=2nd, Center=1st, Right=3rd)
    const podium = [
        players[1] || LEADERBOARD_DATA[1], // Rank 2
        players[0] || LEADERBOARD_DATA[0], // Rank 1
        players[2] || LEADERBOARD_DATA[2]  // Rank 3
    ];

    // The rest of the list
    const listPlayers = players.length > 3 ? players.slice(3) : [];

    const filteredPlayers = listPlayers.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="pt-28 min-h-screen bg-transparent font-sans pb-40 relative">

            {/* Background Atmosphere - Enhanced */}
            {/* <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#13161C] to-transparent pointer-events-none"></div> */}
            {/* Subtle Grid Texture */}
            {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div> */}

            {/* <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#2FE9A9]/5 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#00C6FF]/5 blur-[150px] rounded-full pointer-events-none"></div> */}

            {/* MAIN LEADERBOARD CONTENT - Always Rendered Underneath */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-2 tracking-tight drop-shadow-xl">Leaderboard</h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#1A1D26] px-3 py-1 rounded-full border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-[#2FE9A9] animate-pulse"></div>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Season 5 Live</p>
                            </div>
                            <p className="text-gray-500 text-xs">Ends in <span className="text-[#FF5E3A] font-bold">3 Days</span></p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[#2FE9A9] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find Player..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#151921] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9]/20 transition-all placeholder-gray-600 shadow-inner"
                        />
                    </div>
                </div>

                {/* Horizontal Game Filters */}
                <GameFilterSlider
                    games={games}
                    selectedGame={selectedGame}
                    onSelectGame={setSelectedGame}
                />

                {/* Dropdowns Row */}
                <div className="flex items-center justify-start gap-4 mb-12">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase mr-2">
                        <Filter size={14} /> Filters:
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#151921]/50 rounded-lg border border-white/5 text-xs font-bold text-white hover:border-white/20 transition-colors">
                        {selectedRegion}
                        <ChevronDown size={14} className="text-gray-500" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#151921]/50 rounded-lg border border-white/5 text-xs font-bold text-gray-400 hover:border-white/20 transition-colors">
                        {selectedPeriod}
                        <ChevronDown size={14} className="text-gray-500" />
                    </button>
                </div>


                <div className="flex items-end justify-center gap-4 md:gap-8 mb-20 px-4 mt-8">
                    {/* 2nd Place */}
                    <motion.div
                        onClick={() => setSelectedPlayer(podium[0])}
                        className="flex flex-col items-center cursor-pointer group relative z-10"
                        whileHover={{ y: -8 }}
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="relative w-28 md:w-36">
                            {/* Avatar */}
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-[#00C6FF]/30 group-hover:border-[#00C6FF] transition-all shadow-[0_0_20px_rgba(0,198,255,0.15)] relative z-20 bg-[#151921]">
                                <img src={podium[0].img} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00C6FF]/20 to-transparent opacity-50"></div>
                            </div>
                            {/* Rank Badge */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#151921] text-[#00C6FF] border border-[#00C6FF] w-8 h-8 flex items-center justify-center rounded-lg rotate-45 z-30 shadow-lg group-hover:rotate-0 transition-all duration-300">
                                <span className="-rotate-45 font-black text-sm group-hover:rotate-0 transition-all duration-300">2</span>
                            </div>
                        </div>

                        {/* Pedestal Info */}
                        <div className="mt-8 text-center relative">
                            <div className="absolute -inset-4 bg-[#00C6FF]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#00C6FF] transition-colors font-display tracking-tight">{podium[0].name}</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">{podium[0].score} PTS</p>
                        </div>
                    </motion.div>

                    {/* 1st Place (Center) */}
                    <motion.div
                        onClick={() => setSelectedPlayer(podium[1])}
                        className="flex flex-col items-center cursor-pointer group relative z-20 pb-8"
                        whileHover={{ y: -10 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Glow Behind */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#2FE9A9]/20 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="relative w-36 md:w-48">
                            {/* Crown/Special Element */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#2FE9A9] animate-bounce duration-1000">
                                <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(47,233,169,0.5)]" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" /></svg>
                            </div>

                            {/* Avatar */}
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-[#2FE9A9]/50 group-hover:border-[#2FE9A9] transition-all shadow-[0_0_40px_rgba(47,233,169,0.25)] relative z-20 bg-[#151921]">
                                <img src={podium[1].img} className="w-full h-full object-cover scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2FE9A9]/20 to-transparent opacity-30"></div>
                            </div>

                            {/* Rank Badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#2FE9A9] text-black w-10 h-10 flex items-center justify-center rounded-full z-30 shadow-[0_0_20px_rgba(47,233,169,0.4)] border-4 border-[#0B0E14]">
                                <span className="font-black text-lg">1</span>
                            </div>
                        </div>

                        {/* Pedestal Info - Larger for 1st */}
                        <div className="mt-8 text-center relative z-20">
                            <h3 className="text-white font-black text-2xl md:text-3xl leading-tight group-hover:text-[#2FE9A9] transition-colors font-display tracking-wide">{podium[1].name}</h3>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <span className="px-2 py-0.5 rounded bg-[#2FE9A9]/10 text-[#2FE9A9] text-[10px] font-bold uppercase border border-[#2FE9A9]/20">Champion</span>
                                <p className="text-gray-400 text-sm font-bold uppercase">{podium[1].score} PTS</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        onClick={() => setSelectedPlayer(podium[2])}
                        className="flex flex-col items-center cursor-pointer group relative z-10"
                        whileHover={{ y: -8 }}
                        initial={{ opacity: 0, y: 50, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="relative w-28 md:w-36">
                            {/* Avatar */}
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-[#FF5E3A]/30 group-hover:border-[#FF5E3A] transition-all shadow-[0_0_20px_rgba(255,94,58,0.15)] relative z-20 bg-[#151921]">
                                <img src={podium[2].img} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FF5E3A]/20 to-transparent opacity-50"></div>
                            </div>
                            {/* Rank Badge */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#151921] text-[#FF5E3A] border border-[#FF5E3A] w-8 h-8 flex items-center justify-center rounded-lg rotate-45 z-30 shadow-lg group-hover:rotate-0 transition-all duration-300">
                                <span className="-rotate-45 font-black text-sm group-hover:rotate-0 transition-all duration-300">3</span>
                            </div>
                        </div>

                        {/* Pedestal Info */}
                        <div className="mt-8 text-center relative">
                            <div className="absolute -inset-4 bg-[#FF5E3A]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#FF5E3A] transition-colors font-display tracking-tight">{podium[2].name}</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">{podium[2].score} PTS</p>
                        </div>
                    </motion.div>
                </div>

                {/* PLAYERS LIST - Vertical Tiles (Restored) */}
                <div className="flex flex-col gap-4 max-w-5xl mx-auto pb-32">
                    <AnimatePresence>
                        {filteredPlayers.map((p) => (
                            <motion.div
                                key={`card-${p.name}-${id}`}
                                onClick={() => setSelectedPlayer(p)}
                                className="relative bg-[#151921] p-0 rounded-2xl border border-white/5 cursor-pointer group hover:border-[#2FE9A9]/50 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="flex items-center p-3 sm:p-4 gap-4 sm:gap-6">
                                    {/* Rank */}
                                    <div className="text-gray-500 font-bold text-lg w-8 text-center">#{p.rank}</div>

                                    {/* Avatar */}
                                    <motion.div
                                        layoutId={`image-${p.name}-${id}`}
                                        className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0"
                                    >
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-full h-full object-cover rounded-full sm:rounded-xl bg-gray-800"
                                        />
                                        {/* Status Dot */}
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#151921] flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#2FE9A9] border border-[#151921]"></div>
                                        </div>
                                    </motion.div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-2">
                                            <motion.h3
                                                layoutId={`title-${p.name}-${id}`}
                                                className="font-bold text-white text-base sm:text-lg truncate font-display tracking-tight"
                                            >
                                                {p.name}
                                            </motion.h3>
                                            <div className="px-1.5 py-0.5 rounded bg-[#2FE9A9]/10 border border-[#2FE9A9]/30 text-[#2FE9A9] text-[10px] font-bold uppercase hidden sm:block">Pro</div>
                                        </div>
                                        <p className="text-gray-400 text-xs font-medium truncate">Score: <span className="text-white">{p.score}</span> • Win Rate: 64%</p>
                                    </div>

                                    {/* Stats (Desktop Only) */}
                                    <div className="hidden md:flex items-center gap-6 mr-6">
                                        <div className="text-right">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold">Matches</div>
                                            <div className="text-white font-bold text-sm">1,240</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-gray-500 uppercase font-bold">K/D</div>
                                            <div className="text-[#2FE9A9] font-bold text-sm">4.2</div>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <button
                                        className="h-10 px-5 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black font-bold text-sm transition-all border border-white/5"
                                    >
                                        View
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* FANTASY PROFILE MODAL (Viewing Other Users) */}
                {createPortal(
                    <AnimatePresence>
                        {selectedPlayer && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                    onClick={() => setSelectedPlayer(null)}
                                />

                                {/* Mobile Close Button */}
                                <motion.button
                                    key={`button-${selectedPlayer.name}-${id}`}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                                    className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 z-50 text-black pointer-events-auto"
                                    onClick={() => setSelectedPlayer(null)}
                                >
                                    <X size={18} />
                                </motion.button>

                                {/* Card Container - Using PublicProfile Component */}
                                <motion.div
                                    layoutId={`card-${selectedPlayer.name}-${id}`}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    ref={ref}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="relative z-20 w-full max-w-5xl flex items-center justify-center p-4 max-h-[90vh]"
                                >
                                    <div className="w-full max-h-full overflow-y-auto custom-scrollbar">
                                        <PublicProfile profile={{
                                            id: `mock-user-${selectedPlayer.name}`,
                                            username: selectedPlayer.name.toLowerCase().replace(/\s+/g, ''),
                                            name: selectedPlayer.name,
                                            email: `${selectedPlayer.name.replace(/\s+/g, '')}@example.com`,
                                            status: 'online', // Mock status
                                            created_at: new Date().toISOString(),
                                            coin_balance: 1000,
                                            credit_balance: 500,
                                            profile_picture_url: selectedPlayer.img,
                                            bio: `Top player in ${selectedPlayer.region} region currently ranked #${selectedPlayer.rank}.`,
                                            // Required fields for type safety
                                            phone: '',
                                            address: '',
                                            date_of_birth: '',
                                            gender: 'other',
                                            two_factor_enabled: false,
                                            daily_entries_remaining: 3,
                                            current_plan: 'gold', // valid type
                                            plan_multiplier: 1.5,
                                            bronze_trophies: Math.floor(Math.random() * 10),
                                            silver_trophies: Math.floor(Math.random() * 5),
                                            gold_trophies: Math.floor(Math.random() * 2),
                                            social_links: { twitter: '', discord: '' },
                                            plan_expiry_date: undefined,
                                            updated_at: new Date().toISOString(),
                                            is_admin: false,
                                            terms_accepted: true
                                        }}
                                            onClose={() => setSelectedPlayer(null)}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
