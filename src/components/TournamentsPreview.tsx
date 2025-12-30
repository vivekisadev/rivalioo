import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface Tournament {
    id: number;
    game: string;
    title: string;
    prize: string;
    entry: string;
    mode: string;
    players: string;
    image: string;
    bgColor: string;
}

const tournaments: Tournament[] = [
    {
        id: 1,
        game: 'VALORANT',
        title: 'Champions League',
        prize: '$5000',
        entry: '$10',
        mode: '5v5',
        players: '128/256',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop',
        bgColor: 'from-red-900/30 to-orange-900/30'
    },
    {
        id: 2,
        game: 'PUBG',
        title: 'Battle Royale Pro',
        prize: '$3500',
        entry: '$8',
        mode: 'Squad',
        players: '96/100',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
        bgColor: 'from-yellow-900/30 to-orange-900/30'
    },
    {
        id: 3,
        game: 'FORTNITE',
        title: 'Victory Royale',
        prize: '$4200',
        entry: '$12',
        mode: 'Duo',
        players: '84/128',
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=500&fit=crop',
        bgColor: 'from-purple-900/30 to-blue-900/30'
    }
];

const TournamentsPreview = () => {
    return (
        <section className="space-y-4">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-800 pb-3">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-1">
                        Tournaments
                    </h2>
                    <p className="text-gray-500 text-xs">
                        Watch your favorite streamers dominate in real time
                    </p>
                </div>
                <button className="text-[#00D9FF] hover:text-[#00B8D4] font-medium text-xs uppercase tracking-wide transition-colors">
                    View All
                </button>
            </div>

            {/* Tournaments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {tournaments.map((tournament, index) => (
                    <motion.div
                        key={tournament.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-[#1a1f2e] rounded-lg overflow-hidden border border-gray-800/50 hover:border-[#00D9FF]/30 transition-all group h-[420px] flex flex-col"
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={tournament.image}
                                alt={tournament.game}
                                className="w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-500"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${tournament.bgColor}`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-[#1a1f2e]/60 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative p-5 h-full flex flex-col">
                            {/* Top Section - Game Badge & Title */}
                            <div className="mb-auto">
                                <div className="inline-block px-3 py-1 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded text-[#00D9FF] text-xs font-bold uppercase tracking-wider mb-3">
                                    {tournament.game}
                                </div>
                                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide leading-tight">
                                    {tournament.title}
                                </h3>
                            </div>

                            {/* Bottom Section - Info & Join */}
                            <div className="space-y-3 mt-auto">
                                {/* Player Count */}
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Users size={14} />
                                    <span className="text-xs font-medium">{tournament.players} Players</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-[#0B0E14]/70 backdrop-blur-sm border border-gray-800/50 rounded p-2">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Entry</p>
                                        <p className="text-white font-bold text-xs">{tournament.entry}</p>
                                    </div>
                                    <div className="bg-[#0B0E14]/70 backdrop-blur-sm border border-gray-800/50 rounded p-2">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Mode</p>
                                        <p className="text-white font-bold text-xs">{tournament.mode}</p>
                                    </div>
                                    <div className="bg-[#0B0E14]/70 backdrop-blur-sm border border-gray-800/50 rounded p-2">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Prize</p>
                                        <p className="text-[#00D9FF] font-bold text-xs">{tournament.prize}</p>
                                    </div>
                                </div>

                                {/* Join Button */}
                                <button className="w-full py-2.5 bg-[#FF5E3A] hover:bg-[#FF4520] text-white font-bold text-xs uppercase tracking-wider transition-all rounded relative overflow-hidden group/btn">
                                    <span className="relative z-10">JOIN NOW</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default TournamentsPreview;
