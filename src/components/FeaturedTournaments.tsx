import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Import tournament images
import bgmiVictorRush from '../assets/images/bgmivictorrush.jpg';
import codm1 from '../assets/images/codm1.png';
import valorant1 from '../assets/images/valorant1.png';
import logoFull from '../assets/images/logo_full.png';

interface Tournament {
    id: number;
    title: string;
    description: string;
    dateRange: string;
    year: string;
    image: string;
    game: string;
}

const tournaments: Tournament[] = [
    {
        id: 1,
        title: 'BGMI Victory Rush',
        game: 'BGMI',
        description: 'Drop In. Dominate. Win Your Share of the ₹5k Prize Pool!',
        dateRange: 'Aug 12 - Aug 29',
        year: '2025',
        image: bgmiVictorRush
    },
    {
        id: 2,
        title: 'Call of Duty: Combat Challenge',
        game: 'COD',
        description: 'Deploy and Conquer for ₹3K in Cash & Gear!',
        dateRange: 'Jul 20 - Aug 10',
        year: '2025',
        image: codm1
    },
    {
        id: 3,
        title: 'Valorant: Champions Quest',
        game: 'Valorant',
        description: 'Outlast the Agents to Win ₹2K + Exclusive Items!',
        dateRange: 'Sep 5 - Sep 25',
        year: '2025',
        image: valorant1
    }
];

const FeaturedTournaments = () => {
    const navigate = useNavigate();

    const handleCardClick = (tournament: Tournament) => {
        // Map common fields expected by TournamentDetails
        const mappedTournament = {
            id: tournament.id.toString(),
            title: tournament.title,
            game: tournament.game,
            description: tournament.description,
            image_url: tournament.image,
            prize_pool: 5000,
            max_participants: 100,
            current_participants: 45,
            start_date: tournament.dateRange + ' ' + tournament.year,
            status: 'Registration Open',
            type: 'Featured'
        };
        navigate(`/tournaments/${tournament.id}`, { state: { tournament: mappedTournament, fromFeatured: true } });
    };

    const handleViewAll = () => {
        navigate('/tournaments', { state: { initialType: 'Featured' } });
    };

    const layoutTransition = {
        type: "spring" as const,
        stiffness: 250,
        damping: 35,
        mass: 1
    };

    return (
        <section className="py-20 bg-[#0B0E14] relative overflow-hidden">
            {/* Background Neon Glow Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-40">
                <img
                    src={logoFull}
                    alt=""
                    className="w-[600px] blur-3xl filter drop-shadow-[0_0_150px_#00D9FF]"
                />
            </div>

            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="mb-12 pl-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
                        <div className="flex flex-col">
                            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-4 font-oswald tracking-tight">
                                Featured Tournaments
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base max-w-2xl font-medium tracking-wide">
                                Hop into the lobby and make your mark!
                            </p>
                            <div className="w-10 h-1 bg-[#2FE9A9] mt-4 shadow-[0_0_10px_#2FE9A9] rounded-full"></div>
                        </div>
                        <button
                            onClick={handleViewAll}
                            className="text-sm font-bold uppercase tracking-widest text-[#2FE9A9] border-b border-[#2FE9A9] pb-0.5 hover:text-white hover:border-white transition-colors"
                        >
                            VIEW ALL
                        </button>
                    </div>
                </div>

                {/* Tournaments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 min-h-[420px]">
                    <AnimatePresence>
                        {tournaments.map((tournament) => (
                            <motion.div
                                layout
                                key={tournament.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                viewport={{ once: true }}
                                transition={layoutTransition}
                                onClick={() => handleCardClick(tournament)}
                                className="group relative rounded-[28px] overflow-hidden cursor-pointer h-[420px] shadow-2xl transition-all duration-500 hover:-translate-y-2 will-change-transform hover:shadow-[0_0_40px_rgba(0,217,255,0.1)] border border-transparent hover:border-white/10"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={tournament.image}
                                        alt={tournament.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    {/* Bottom-focused Dark Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    {/* Top-focused subtle overlay for readability */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-between p-6">
                                    {/* Date Badge */}
                                    <div className="flex items-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-60 animate-pulse"></div>
                                            <span className="text-white text-[11px] font-semibold tracking-wide">
                                                {tournament.dateRange}
                                            </span>
                                            <span className="text-white/60 text-[11px] font-medium ml-1">
                                                {tournament.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-[22px] font-bold text-white leading-tight group-hover:text-[#2FE9A9] transition-colors drop-shadow-md">
                                            {tournament.title}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed max-w-[90%] opacity-90">
                                            {tournament.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Inner Glow/Border */}
                                <div className="absolute inset-0 border-t border-l border-white/10 group-hover:border-white/20 rounded-[28px] transition-colors pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTournaments;
