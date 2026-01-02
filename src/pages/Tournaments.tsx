import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, Users, Filter, Layout, Check, Gamepad2, Crosshair, Zap, Shield, Target, List, Clock, Star, MoreHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import TournamentCard from '../components/TournamentCard';
import Tooltip from '../components/Tooltip';

import { getAllTournaments } from '../services/tournamentService';

// Images
import bgmiImage from '../assets/images/bgmi.png';
import bgmiTournamentImage from '../assets/images/bgmi-tournament.jpg';
import apexTournamentImage from '../assets/images/apex-tournament.jpg';

// Skeleton Component
const TournamentCardSkeleton = () => (
    <div className="relative flex flex-col w-full h-[410px] bg-[#13161C] rounded-[24px] overflow-hidden border border-white/5 shadow-xl animate-pulse">
        {/* Image Placeholder */}
        <div className="h-[200px] bg-white/5 relative">
            <div className="absolute top-0 left-0 w-24 h-8 bg-white/10 rounded-br-2xl" />
            <div className="absolute bottom-4 left-5 space-y-2">
                <div className="h-6 bg-white/10 rounded-md w-32" />
                <div className="h-4 bg-white/5 rounded-md w-20" />
            </div>
        </div>
        {/* Content Placeholder */}
        <div className="p-5 flex flex-col gap-6 flex-1">
            <div className="grid grid-cols-2 gap-3">
                <div className="h-[70px] bg-white/5 rounded-xl border border-white/5" />
                <div className="h-[70px] bg-white/5 rounded-xl border border-white/5" />
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-3 bg-white/5 rounded w-1/4" />
                </div>
                <div className="h-1.5 bg-white/5 rounded-full w-full" />
            </div>

            <div className="mt-auto h-12 bg-white/5 rounded-xl" />
        </div>
    </div>
);

const Tournaments = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedGame, setSelectedGame] = useState('All Games');
    const [selectedType, setSelectedType] = useState((location.state as any)?.initialType || 'All Types');
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);

    // Filter states
    const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
    const gameMenuRef = useRef<HTMLDivElement>(null);
    const typeMenuRef = useRef<HTMLDivElement>(null);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (gameMenuRef.current && !gameMenuRef.current.contains(event.target as Node)) {
                setIsGameMenuOpen(false);
            }
            if (typeMenuRef.current && !typeMenuRef.current.contains(event.target as Node)) {
                setIsTypeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const games = [
        { name: 'All Games', icon: Gamepad2 },
        { name: 'CS2', icon: Target },
        { name: 'BGMI', icon: Crosshair },
        { name: 'Free Fire', icon: Zap },
        { name: 'COD', icon: Shield },
        { name: 'Apex Legends', icon: Trophy }
    ];

    const tournamentTypes = [
        { name: 'All Types', icon: List },
        { name: 'Daily', icon: Clock },
        { name: 'Featured', icon: Star },
        { name: 'Others', icon: MoreHorizontal }
    ];

    useEffect(() => {
        // Prevent double-fetch in React StrictMode (development only)
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchTournaments();

        // Clear state once used
        if ((location.state as any)?.initialType) {
            window.history.replaceState({}, document.title);
        }
    }, []);

    const fetchTournaments = async () => {
        setLoading(true);
        console.log('🔄 fetchTournaments: Starting...');
        try {
            console.log('🔄 Fetching tournaments from database...');
            let data = await getAllTournaments();
            console.log('📡 Data from database:', data);

            // Fallback to Mock Data if DB is empty (Requested behavior)
            if (!data || data.length === 0) {
                console.log('⚠️ Database empty or fetch failed, using mock data...');
                data = [
                    {
                        id: 1,
                        title: 'Pro League Season 5',
                        game: 'BGMI',
                        map: 'Erangel',
                        description: 'The ultimate battle royale showdown. Gather your squad and compete for the massive prize pool in this high-stakes tournament.',
                        image_url: bgmiImage,
                        entry_fee: 100,
                        prize_pool: 50000,
                        status: 'Registration Open',
                        max_participants: 100,
                        current_participants: 45,
                        start_date: '2025-01-20',
                        start_time: '18:00',
                        organizer_name: 'Rivalio Official',
                        type: 'Featured'
                    },
                    {
                        id: 2,
                        title: 'Free Fire Max Cup',
                        game: 'Free Fire',
                        map: 'Bermuda',
                        description: 'Survival of the fittest. Join the Free Fire Max Cup and dominate the battlefield.',
                        image_url: bgmiImage,
                        entry_fee: 50,
                        prize_pool: 25000,
                        status: 'Registration Open',
                        max_participants: 50,
                        current_participants: 12,
                        start_date: '2025-01-22',
                        start_time: '20:00',
                        organizer_name: 'Pro Gamers',
                        type: 'Daily'
                    },
                    {
                        id: 3,
                        title: 'COD Mobile Championship',
                        game: 'COD',
                        map: 'Crash',
                        description: 'Fast-paced action. Tactical warfare. Prove your skills in the COD Mobile Championship.',
                        image_url: bgmiImage,
                        entry_fee: 0,
                        prize_pool: 10000,
                        status: 'Completed',
                        max_participants: 32,
                        current_participants: 32,
                        start_date: '2025-01-15',
                        start_time: '21:00',
                        organizer_name: 'Activision Community',
                        type: 'Others'
                    }
                ] as any;
            }

            if (data) {
                const mappedTournaments = data.map((t: any) => ({
                    id: t.id.toString(),
                    game: t.title || 'Tournament',
                    gameSubtitle: t.game || 'Game',
                    gameImage: (t.game === 'BGMI' || t.game === 'bgmi') ? bgmiTournamentImage :
                        (t.game === 'Apex Legends' || t.game === 'apex') ? apexTournamentImage :
                            (t.image_url || bgmiImage),
                    type: t.map || 'Squad',
                    tournamentType: t.type || (t.id % 3 === 0 ? 'Daily' : t.id % 3 === 1 ? 'Featured' : 'Others'), // Mock type if not present
                    prizePool: Number(t.prize_pool) || 0,
                    date: t.start_date || 'TBA',
                    entryFee: Number(t.entry_fee) || 0,
                    maxPlayers: t.max_participants || 100,
                    currentPlayers: t.current_participants || 0,
                    status: (t.status === 'Registration Open' || t.status === 'upcoming') ? 'upcoming' : 'completed',
                    title: t.title,
                    subtitle: t.game,
                    description: t.description,
                    map: t.map,
                    start_time: t.start_time,
                    organizer_name: t.organizer_name,
                    image_url: t.image_url,
                    prize_pool: t.prize_pool,
                    start_date: t.start_date,
                    max_participants: t.max_participants,
                    current_participants: t.current_participants
                }));
                console.log('✅ Mapped tournaments:', mappedTournaments);
                setTournaments(mappedTournaments);
            }
        } catch (error) {
            console.error("❌ Failed to fetch tournaments:", error);
        } finally {
            console.log('🏁 fetchTournaments: Finished.');
            setLoading(false);
        }
    };

    const filteredTournaments = tournaments.filter(t => {
        const gameMatch = selectedGame === 'All Games' ||
            t.gameSubtitle?.toLowerCase().trim() === selectedGame.toLowerCase().trim();
        const typeMatch = selectedType === 'All Types' ||
            t.tournamentType?.toLowerCase().trim() === selectedType.toLowerCase().trim();
        return gameMatch && typeMatch;
    });

    const handleViewTournament = (tournament: any) => {
        navigate(`/tournaments/${tournament.id}`, { state: { tournament } });
    };

    return (
        <div className="pt-24 min-h-screen bg-[#0B0E14] relative overflow-x-hidden pb-20">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#2E236C]/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#2FE9A9]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* HERO SECTION */}
                <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#17153B] via-[#2E236C] to-[#433D8B] mb-16 shadow-2xl border border-white/5 p-8 md:p-12 min-h-[400px] flex items-center">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://wallpapers.com/images/high/gaming-background-h1ou3f4v1500h6s2.webp')] bg-cover bg-center mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#17153B] to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center w-full gap-12">
                        <div className="hidden md:block w-[220px] h-[320px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[4px] border-white/10 shrink-0 rotate-[-3deg] hover:rotate-0 transition-all duration-500 origin-bottom-left group">
                            <img src="https://i.pinimg.com/736x/88/44/45/884445564858e74e4934149fa596ce96.jpg" alt="Game Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>

                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                <Users size={14} className="text-[#2FE9A9]" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">345 Members Active</span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-oswald font-black text-white uppercase leading-[0.85] mb-2 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                    Compete in <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE9A9] to-[#00C6FF]">Battle Royale</span>
                                </h1>
                                <p className="text-indigo-100/70 text-sm md:text-base max-w-lg font-medium tracking-wide">
                                    Master your skills, rise through the global rankings, and win massive rewards in the arena.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-2">
                                <button className="px-8 py-3.5 bg-[#2FE9A9] text-black font-black text-xs uppercase tracking-[0.15em] rounded-xl hover:bg-[#25C08C] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(47,233,169,0.4)] active:scale-95 shadow-lg">
                                    Join A Tournament
                                </button>
                                <button className="px-8 py-3.5 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black text-xs uppercase tracking-[0.15em] rounded-xl hover:bg-white/10 transition-all active:scale-95">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block absolute right-[-20px] bottom-[-40px] h-[140%] z-0 pointer-events-none">
                            <img
                                src={bgmiImage}
                                alt="Character"
                                className="h-full w-auto object-contain drop-shadow-[-20px_0_50px_rgba(47,233,169,0.2)] hover:scale-105 transition-transform duration-1000"
                                style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                            />
                        </div>
                    </div>
                </div>

                {/* FILTERS & TITLE */}
                <div className="flex flex-col space-y-6 mb-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-1">Explore Tournaments</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500 font-medium">Join the battle and rise through the ranks</p>
                                <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                                <Tooltip text="Total tournaments matching your filters" position="top">
                                    <p className="text-sm font-bold text-[#2FE9A9] uppercase tracking-wider">{filteredTournaments.length} Results</p>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Game Filter Trigger */}
                        <div className="relative" ref={gameMenuRef}>
                            <Tooltip text="Filter by Game" position="top">
                                <button
                                    onClick={() => setIsGameMenuOpen(!isGameMenuOpen)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${isGameMenuOpen ? 'bg-[#2FE9A9] text-black border-[#2FE9A9]' : 'bg-[#151921] text-white border-white/10 hover:border-[#2FE9A9]/50'}`}
                                >
                                    <Layout size={20} strokeWidth={2.5} />
                                </button>
                            </Tooltip>

                            <AnimatePresence>
                                {isGameMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                        className="absolute top-14 left-0 w-64 bg-[#12161D]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[100] py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-white/5 mb-1">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Game</span>
                                        </div>
                                        {games.map(game => (
                                            <button
                                                key={game.name}
                                                onClick={() => {
                                                    setSelectedGame(game.name);
                                                    setIsGameMenuOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedGame === game.name ? 'bg-[#2FE9A9]/20 text-[#2FE9A9]' : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'}`}>
                                                        <game.icon size={16} />
                                                    </div>
                                                    <span className={`text-sm font-bold transition-colors ${selectedGame === game.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {game.name}
                                                    </span>
                                                </div>
                                                {selectedGame === game.name && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-5 h-5 rounded-full bg-[#2FE9A9] flex items-center justify-center"
                                                    >
                                                        <Check size={12} strokeWidth={4} className="text-black" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tournament Type Trigger */}
                        <div className="relative" ref={typeMenuRef}>
                            <Tooltip text="Tournament Type" position="top">
                                <button
                                    onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${isTypeMenuOpen ? 'bg-white text-black border-white' : 'bg-[#151921] text-white border-white/10 hover:border-white/50'}`}
                                >
                                    <Filter size={20} strokeWidth={2.5} />
                                </button>
                            </Tooltip>

                            <AnimatePresence>
                                {isTypeMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                        className="absolute top-14 left-0 w-64 bg-[#12161D]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[100] py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-white/5 mb-1">
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tournament Type</span>
                                        </div>
                                        {tournamentTypes.map(type => (
                                            <button
                                                key={type.name}
                                                onClick={() => {
                                                    setSelectedType(type.name);
                                                    setIsTypeMenuOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${selectedType === type.name ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'}`}>
                                                        <type.icon size={16} />
                                                    </div>
                                                    <span className={`text-sm font-bold transition-colors ${selectedType === type.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                                        {type.name}
                                                    </span>
                                                </div>
                                                {selectedType === type.name && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
                                                    >
                                                        <Check size={12} strokeWidth={4} className="text-black" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* TOURNAMENTS GRID */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <TournamentCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="relative mb-20">
                        <motion.div
                            layout="position"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {filteredTournaments.length > 0 ? (
                                    filteredTournaments.map((tournament, index) => (
                                        <motion.div
                                            key={tournament.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                                opacity: { duration: 0.2 }
                                            }}
                                            className="h-full"
                                        >
                                            <TournamentCard
                                                {...tournament}
                                                index={index}
                                                onViewClick={() => handleViewTournament(tournament)}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        key="no-results"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-[#13161C] border border-white/5 rounded-[32px] gap-6"
                                    >
                                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center shadow-inner">
                                            <Trophy size={40} className="text-gray-700" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Matches Found</h3>
                                            <p className="max-w-md text-gray-500 font-medium">
                                                We couldn't find any tournaments matching your current criteria.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedGame('All Games');
                                                setSelectedType('All Types');
                                            }}
                                            className="px-10 py-4 bg-[#2FE9A9] text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#25C08C] transition-all hover:scale-105 shadow-xl shadow-[#2FE9A9]/10"
                                        >
                                            Clear All Filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tournaments;
