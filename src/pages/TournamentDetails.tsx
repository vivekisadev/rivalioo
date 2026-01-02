import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Clock, Users, Loader2, Shield, Target, MapPin, ArrowRight, Trophy,
    Calendar, Award, TrendingUp, ExternalLink, Facebook, Twitter, Link as LinkIcon,
    Check, ArrowLeft
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getTournamentById, joinTournament, type Tournament } from '../services/tournamentService';
import coinsIcon from '../assets/images/coins.png';
import JoinTournamentModal from '../components/JoinTournamentModal';
import Tooltip from '../components/Tooltip';

// Game Assets
import codImage from '../assets/images/cod.png';
import game1Image from '../assets/images/game1.png';
import bgmiTournamentImage from '../assets/images/bgmi-tournament.jpg';
import apexCharacterPNG from '../assets/images/apex-character.png';
import ffTournamentImage from '../assets/images/freefire-tournament.jpg';

const TournamentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, refreshProfile } = useAuth();

    const [tournament, setTournament] = useState<Tournament | null>(
        (location.state as any)?.tournament || null
    );
    const [loading, setLoading] = useState(!tournament);
    const [activeTab, setActiveTab] = useState('Overview');
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    // Parallax & Scroll Effects
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 800], [0, 200]);
    const y2 = useTransform(scrollY, [0, 800], [0, -100]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    // Smooth Spring for Mouse
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 25;
            const moveY = (clientY - window.innerHeight / 2) / 25;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Dynamic Asset Mapping
    const getGameAsset = (gameName: string) => {
        const normalized = gameName?.toLowerCase() || '';
        if (normalized.includes('bgmi')) return bgmiTournamentImage;
        if (normalized.includes('free fire')) return ffTournamentImage;
        if (normalized.includes('cod') || normalized.includes('call of duty')) return codImage;
        if (normalized.includes('apex')) return apexCharacterPNG;
        return game1Image;
    };

    // Dynamic Color Theming
    const getGameColors = (gameName: string) => {
        const normalized = gameName?.toLowerCase() || '';

        if (normalized.includes('apex')) {
            return {
                primary: '#E63946',
                secondary: '#1D1D1D',
                accent: '#FF5E3A',
                gradient: 'from-[#1D1D1D] via-[#2D1517] to-[#E63946]/20'
            };
        }

        if (normalized.includes('bgmi')) {
            return {
                primary: '#8B7355',
                secondary: '#2C2416',
                accent: '#D4A574',
                gradient: 'from-[#1A1410] via-[#2C2416] to-[#8B7355]/20'
            };
        }

        return {
            primary: '#2FE9A9',
            secondary: '#0B0E14',
            accent: '#FF5E3A',
            gradient: 'from-[#0B0E14] via-[#0B0E14] to-[#2FE9A9]/10'
        };
    };

    useEffect(() => {
        if (id && !tournament) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await getTournamentById(id);
                    if (data) setTournament(data);
                } catch (error) {
                    console.error('Error fetching tournament:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [id, tournament]);

    const handleJoinClick = () => {
        if (!user) {
            navigate('/auth');
            return;
        }
        setIsJoinModalOpen(true);
    };

    const handleConfirmJoin = async (ingameId: string, ingameName: string) => {
        if (!tournament || !user) return { success: false, error: 'Missing data' };

        const result = await joinTournament(
            user.id,
            tournament.id,
            tournament.entry_fee,
            ingameId,
            ingameName
        );

        if (result.success) {
            await refreshProfile();
            return { success: true };
        } else {
            return { success: false, error: result.error };
        }
    };

    const tabs = ['Overview', 'Rules', 'Prize Pool', 'Participants', 'Leaderboard'];

    const TechCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <div className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] ${className}`}>
            <div className="relative z-10 p-5">
                {children}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center gap-4">
                <Loader2 size={40} className="animate-spin text-[#2FE9A9]" />
                <p className="text-gray-400 font-medium">Loading Tournament...</p>
            </div>
        );
    }

    if (!tournament) return null;

    const gameHeroImage = getGameAsset(tournament.game);
    const gameColors = getGameColors(tournament.game);

    return (
        <div
            className="min-h-screen text-white relative overflow-x-hidden"
            style={{ background: `linear-gradient(135deg, ${gameColors.secondary} 0%, #0B0E14 100%)` }}
        >

            {/* MINIMAL HERO SECTION */}
            <motion.div
                layoutId={`tournament-card-${id}`}
                style={{ opacity: opacityHero }}
                className="relative h-[55vh] flex items-end overflow-hidden"
            >
                {/* Back Button */}
                <div className="absolute top-8 left-8 z-50">
                    <button
                        onClick={() => navigate('/tournaments')}
                        className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Back to Tournaments</span>
                    </button>
                </div>

                {/* Character Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 0.25, scale: 1.02 }}
                        transition={{ duration: 1.2 }}
                        src={gameHeroImage}
                        alt="Tournament Hero"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />

                    {/* Clean Gradient overlays */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-transparent"></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B0E14]/60 via-transparent to-[#0B0E14]/60"></div>
                </div>

                {/* Hero Content - Bottom Positioned */}
                <div className="container mx-auto px-6 relative z-10 pb-12">
                    <div className="max-w-2xl space-y-4">

                        {/* Game Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
                        >
                            <div className="w-1.5 h-1.5 bg-[#2FE9A9] rounded-full opacity-60"></div>
                            <span className="text-white/80 font-bold text-xs uppercase tracking-wider">{tournament.game}</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-500 text-xs">{tournament.map}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-oswald font-black text-white uppercase leading-tight tracking-tight"
                        >
                            {tournament.title}
                        </motion.h1>

                        {/* Quick Stats Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <Tooltip text="Total Prize Pool" position="top">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                                    <img src={coinsIcon} className="w-4 h-4 opacity-70" />
                                    <span className="text-white font-bold text-base">₹{tournament.prize_pool.toLocaleString()}</span>
                                </div>
                            </Tooltip>
                            <Tooltip text="Player Slots (Current / Max)" position="top">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                                    <Users size={14} className="text-gray-400" />
                                    <span className="text-white font-semibold text-sm">{tournament.current_participants}/{tournament.max_participants}</span>
                                </div>
                            </Tooltip>
                            <Tooltip text="Tournament Start Date" position="top">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                                    <Clock size={14} className="text-gray-400" />
                                    <span className="text-white font-semibold text-sm">{tournament.start_date}</span>
                                </div>
                            </Tooltip>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {tournament.status === 'Registration Open' ? (
                                <button
                                    onClick={handleJoinClick}
                                    className="group relative px-6 py-3 bg-white hover:bg-white/90 text-black font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2 rounded-lg overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-black/[0.05] to-transparent -skew-x-20"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                    />
                                    <Shield size={18} className="relative z-10 text-gray-700" />
                                    <span className="relative z-10">Register Now</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10 text-gray-700" />
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="px-6 py-3 bg-white/10 text-gray-500 font-bold text-sm uppercase tracking-wider cursor-not-allowed border border-white/10 rounded-lg"
                                >
                                    {tournament.status}
                                </button>
                            )}
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* CONTENT SECTION */}
            <div className="relative">
                {/* Sticky Tabs */}
                <div className="sticky top-16 z-40 backdrop-blur-xl border-b border-white/10" style={{ backgroundColor: `${gameColors.secondary}F0` }}>
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative py-3.5 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-white/80'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="container mx-auto px-6 py-12 relative overflow-hidden">
                    {/* DYNAMIC SPOTSIGHT - Follows mouse in content area */}
                    <motion.div
                        style={{ x: mouseX, y: mouseY }}
                        className="absolute inset-x-[-50%] inset-y-[-50%] z-0 pointer-events-none opacity-20 blur-[100px]"
                        animate={{
                            background: `radial-gradient(circle at center, ${gameColors.primary} 0%, transparent 60%)`
                        }}
                    />

                    {/* Faded Background Image - Parallax enabled */}
                    <motion.div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                            y: y2,
                            backgroundImage: `url(${gameHeroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                            maskComposite: 'intersect',
                            WebkitMaskComposite: 'source-in'
                        }}
                    ></motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                        {/* Main Content - 2 columns */}
                        <div className="lg:col-span-2 space-y-6">

                            {activeTab === 'Overview' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* About */}
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                        <h2 className="text-[#2FE9A9] font-bold text-xl uppercase mb-4 flex items-center gap-2">
                                            <Target size={20} />
                                            About This Tournament
                                        </h2>
                                        <p className="text-gray-300 leading-relaxed">
                                            {tournament.description}
                                        </p>
                                    </div>

                                    {/* Tournament Details Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Entry Fee', value: tournament.entry_fee === 0 ? 'FREE' : `₹${tournament.entry_fee}` },
                                            { label: 'Format', value: 'Squad' },
                                            { label: 'Start Time', value: tournament.start_time || 'TBA' },
                                            { label: 'Organizer', value: tournament.organizer_name }
                                        ].map((card, idx) => (
                                            <TechCard key={idx} className="!p-0">
                                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">{card.label}</div>
                                                <div className="text-white font-oswald font-bold text-xl truncate">{card.value}</div>
                                            </TechCard>
                                        ))}
                                    </div>

                                    {/* Tournament Timeline */}
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                        <h2 className="text-white font-bold text-lg uppercase mb-6 flex items-center gap-2">
                                            <Calendar size={18} className="text-[#2FE9A9] opacity-70" />
                                            Tournament Schedule
                                        </h2>
                                        <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                                            {[
                                                { title: 'Registration Open', info: 'Join the battle now!', date: 'Live', active: true },
                                                { title: 'Registration Close', info: tournament.start_date, date: 'TBA', active: false },
                                                { title: 'Tournament Start', info: 'Matches go live!', date: `${tournament.start_date} • ${tournament.start_time || 'TBA'}`, active: false }
                                            ].map((step, idx) => (
                                                <div key={idx} className={`relative pl-10 ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                                                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-lg flex items-center justify-center border ${step.active ? 'bg-[#2FE9A9] border-[#2FE9A9]' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                                                        {step.active ? <Check size={14} className="text-black font-bold" /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                                                    </div>
                                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                                                        <div>
                                                            <div className={`${step.active ? 'text-[#2FE9A9]' : 'text-gray-400'} font-bold text-[10px] uppercase tracking-widest`}>{step.title}</div>
                                                            <div className="text-white font-semibold text-sm">{step.info}</div>
                                                        </div>
                                                        <div className="text-gray-500 font-oswald font-bold text-xs">
                                                            {step.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Map Pool Section */}
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                        <h2 className="text-white font-bold text-lg uppercase mb-6 flex items-center gap-2">
                                            <MapPin size={18} className="text-[#2FE9A9] opacity-70" />
                                            Map Pool
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {['Erangel', 'Miramar', 'Sanhok'].map((map) => (
                                                <TechCard key={map} className="!p-0 relative group aspect-video">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-60"></div>
                                                    <div className="absolute bottom-4 left-4 z-20">
                                                        <div className="text-white font-oswald font-black text-lg uppercase tracking-wider group-hover:text-[#2FE9A9] transition-colors">{map}</div>
                                                        <div className="text-[#2FE9A9]/60 text-[10px] font-black uppercase tracking-[0.2em]">Map Confirmed</div>
                                                    </div>
                                                    {/* Placeholder for actual map image - keeping bg-white/5 but adding zoom */}
                                                    <div className="w-full h-full bg-white/5 transition-transform duration-700 group-hover:scale-110"></div>
                                                </TechCard>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Rules' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <TechCard>
                                        <h2 className="text-white font-bold text-lg uppercase mb-8 flex items-center gap-2">
                                            <Shield size={18} className="text-[#2FE9A9] opacity-70" />
                                            Tournament Rules
                                        </h2>
                                        <div className="space-y-4 text-gray-300">
                                            {[
                                                'All participants must follow fair play guidelines and maintain sportsmanship',
                                                'Use of cheats, hacks, or exploits will result in immediate disqualification',
                                                'Respect all participants, organizers, and spectators at all times',
                                                'Check in 15 minutes before your scheduled match time',
                                                'Record your gameplay or take screenshots of match results for verification'
                                            ].map((rule, idx) => (
                                                <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:border-[#2FE9A9]/20 hover:bg-[#2FE9A9]/5 transition-all duration-300 group">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-white font-bold font-oswald text-sm border border-white/10 group-hover:bg-[#2FE9A9] group-hover:text-black transition-all group-hover:border-[#2FE9A9]">
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </div>
                                                    <p className="text-sm leading-relaxed group-hover:text-white transition-colors">{rule}</p>
                                                </div>
                                            ))}

                                            <div className="mt-6 p-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                                <Shield size={18} className="text-blue-400" />
                                                <div>
                                                    <div className="text-blue-400 font-bold text-xs uppercase tracking-wider">Anti-Cheat Enabled</div>
                                                    <div className="text-gray-500 text-[10px]">Advanced fair-match monitoring active</div>
                                                </div>
                                            </div>
                                        </div>
                                    </TechCard>
                                </motion.div>
                            )}

                            {activeTab === 'Prize Pool' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Total Prize Pool Banner */}
                                    <div className="relative group overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 hover:border-white/20">
                                        <div className="relative z-10">
                                            <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-2 flex items-center justify-center gap-2">
                                                <Trophy size={14} className="text-[#2FE9A9] opacity-70" />
                                                Prize Pool
                                            </div>
                                            <div className="text-white font-oswald font-black text-5xl md:text-6xl mb-2 tracking-tight">
                                                ₹{tournament.prize_pool.toLocaleString()}
                                            </div>
                                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                                                Total Tournament Fund
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prize Breakdown */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { rank: '1st Place', color: 'text-yellow-500', split: 0.5 },
                                            { rank: '2nd Place', color: 'text-gray-400', split: 0.3 },
                                            { rank: '3rd Place', color: 'text-orange-600', split: 0.2 }
                                        ].map((prize, idx) => (
                                            <TechCard key={idx} className="text-center">
                                                <Award size={24} className={`${prize.color} mx-auto mb-2`} />
                                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">{prize.rank}</div>
                                                <div className="text-white font-oswald font-bold text-2xl truncate">
                                                    ₹{Math.floor(tournament.prize_pool * prize.split).toLocaleString()}
                                                </div>
                                            </TechCard>
                                        ))}
                                    </div>

                                    {/* Additional Info */}
                                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                            <TrendingUp size={18} className="text-[#2FE9A9]" />
                                            Prize Distribution Details
                                        </h3>
                                        <div className="space-y-2 text-gray-300 text-sm">
                                            <p>• Prizes will be distributed within 7 days after tournament completion</p>
                                            <p>• Winners must verify their identity before prize distribution</p>
                                            <p>• All prizes are subject to applicable taxes</p>
                                            <p>• In case of ties, prizes will be split equally</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Participants' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                                >
                                    <h2 className="text-[#2FE9A9] font-bold text-xl uppercase mb-4">Registered Teams</h2>
                                    <div className="text-center py-8">
                                        <Users size={48} className="mx-auto text-gray-600 mb-4" />
                                        <p className="text-gray-400 text-lg font-semibold">
                                            {tournament.current_participants} / {tournament.max_participants} Teams Registered
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Leaderboard' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                                >
                                    <h2 className="text-[#2FE9A9] font-bold text-xl uppercase mb-4">Leaderboard</h2>
                                    <div className="text-center py-8">
                                        <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
                                        <p className="text-gray-400">Leaderboard will be available once the tournament begins</p>
                                    </div>
                                </motion.div>
                            )}

                        </div>

                        {/* Sidebar - 1 column */}
                        <div className="space-y-6">

                            {/* Prize Pool Card */}
                            <TechCard>
                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">Total Prize Pool</div>
                                <div className="text-white font-oswald font-bold text-3xl mb-4">
                                    ₹{tournament.prize_pool.toLocaleString()}
                                </div>
                                <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2FE9A9] opacity-60"></div>
                                        <span className="text-white/80">{tournament.entry_fee === 0 ? 'Free Entry' : `₹${tournament.entry_fee} Entry`}</span>
                                    </div>
                                    <span className="text-gray-500/80">Starts {tournament.start_date}</span>
                                </div>
                            </TechCard>

                            {/* Countdown Timer */}
                            <TechCard>
                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Starts In</div>
                                <div className="flex justify-between gap-2">
                                    {[
                                        { label: 'D', value: '00' },
                                        { label: 'H', value: '00' },
                                        { label: 'M', value: '00' },
                                        { label: 'S', value: '00' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex-1 text-center">
                                            <div className="text-white font-oswald font-bold text-lg leading-none">{item.value}</div>
                                            <span className="text-[8px] text-gray-500 uppercase font-black">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </TechCard>

                            {/* Registration Status */}
                            <TechCard>
                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Registration</div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-500 text-[10px] uppercase font-bold">Slots Filled</span>
                                        <span className="text-white font-bold text-sm tracking-tight">{tournament.current_participants} / {tournament.max_participants}</span>
                                    </div>
                                    <div className="relative w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(tournament.current_participants / tournament.max_participants) * 100}%` }}
                                            className="h-full bg-white opacity-90"
                                        />
                                    </div>
                                    <div className={`py-2 rounded-lg text-center text-[10px] font-bold uppercase tracking-widest border ${tournament.status === 'Registration Open'
                                        ? 'bg-white/5 text-white/90 border-white/20'
                                        : 'bg-white/5 text-gray-500 border-white/10'
                                        }`}>
                                        {tournament.status}
                                    </div>
                                </div>
                            </TechCard>

                            {/* Share Section */}
                            <TechCard>
                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Share</div>
                                <div className="flex gap-2">
                                    {[
                                        { icon: Facebook, color: 'blue-500', url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}` },
                                        { icon: Twitter, color: 'sky-400', url: `https://twitter.com/intent/tweet?url=${window.location.href}` },
                                        { icon: LinkIcon, color: 'gray-400', action: () => navigator.clipboard.writeText(window.location.href) }
                                    ].map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={item.action || (() => window.open(item.url, '_blank'))}
                                            className="flex-1 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
                                        >
                                            <item.icon size={16} className={`text-gray-400 group-hover:text-white transition-colors`} />
                                        </button>
                                    ))}
                                </div>
                            </TechCard>

                            {/* Utility Buttons */}
                            <div className="space-y-3">
                                <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-xs uppercase tracking-[3px] transition-all flex items-center justify-center gap-2 rounded-xl group overflow-hidden relative">
                                    <motion.div
                                        className="absolute inset-0 bg-white/[0.03]"
                                        initial={false}
                                        whileHover={{ scale: 1.5 }}
                                    />
                                    <Award size={16} className="text-[#2FE9A9] relative z-10" />
                                    <span className="relative z-10">Download Bracket</span>
                                </button>
                                <button className="w-full py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400 font-black text-xs uppercase tracking-[3px] transition-all flex items-center justify-center gap-2 rounded-xl group overflow-hidden relative">
                                    <ExternalLink size={16} className="relative z-10" />
                                    <span className="relative z-10">Report Issue</span>
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <JoinTournamentModal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                onJoin={handleConfirmJoin}
                tournamentId={tournament.id}
                gameName={tournament.game}
                tournamentTitle={tournament.title}
            />
        </div>
    );
};

export default TournamentDetails;
