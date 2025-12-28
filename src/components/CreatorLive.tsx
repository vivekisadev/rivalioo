import { motion } from 'framer-motion';
import { Radio, Check } from 'lucide-react';

interface Stream {
    id: number;
    title: string;
    creator: string;
    game: string;
    viewers: string;
    thumbnail: string;
    avatar: string;
    isVerified: boolean;
    isLive: boolean;
}

const streams: Stream[] = [
    {
        id: 1,
        title: '2022 world champs gaming warzone',
        creator: 'Guy Hawkins',
        game: 'Call of duty',
        viewers: '4.2K',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isVerified: true,
        isLive: true
    },
    {
        id: 2,
        title: 'Valorant Champions Tour Finals',
        creator: 'Sarah Chen',
        game: 'Valorant',
        viewers: '8.1K',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
        avatar: 'https://i.pravatar.cc/150?img=5',
        isVerified: true,
        isLive: true
    },
    {
        id: 3,
        title: 'PUBG Mobile Tournament Highlights',
        creator: 'Mike Johnson',
        game: 'PUBG Mobile',
        viewers: '3.5K',
        thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop',
        avatar: 'https://i.pravatar.cc/150?img=8',
        isVerified: false,
        isLive: true
    },
    {
        id: 4,
        title: 'Fortnite Battle Royale Pro Gameplay',
        creator: 'Alex Rivera',
        game: 'Fortnite',
        viewers: '6.7K',
        thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&h=400&fit=crop',
        avatar: 'https://i.pravatar.cc/150?img=15',
        isVerified: true,
        isLive: true
    }
];

const CreatorLive = () => {
    return (
        <section className="py-20 relative px-4 md:px-0 bg-[#0B0E14]">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-tight mb-2">
                            Creator Live
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl">
                            Watch your favorite pros dominate the arena in real-time.
                        </p>
                    </div>
                    <button className="text-[#2FE9A9] hover:text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors group">
                        View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                {/* Streams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {streams.map((stream, index) => (
                        <motion.div
                            key={stream.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.6)] transition-all duration-300"
                        >
                            {/* Card Background (Glassmorphism) */}
                            <div className="absolute inset-0 bg-[#1A1D26] group-hover:bg-[#1f232e] transition-colors"></div>

                            {/* Image Container (Top Half) */}
                            <div className="relative h-56 w-full overflow-hidden">
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Bottom Fade for seamless blend */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D26] via-transparent to-transparent opacity-90"></div>
                            </div>

                            {/* Content Container */}
                            <div className="relative p-6 pt-0 -mt-10 z-10">
                                {/* Title */}
                                <h3 className="text-white font-bold text-xl leading-tight mb-6 line-clamp-2 drop-shadow-md">
                                    {stream.title}
                                </h3>

                                {/* Creator Row */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="relative">
                                        <img
                                            src={stream.avatar}
                                            alt={stream.creator}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#2FE9A9] transition-colors"
                                        />
                                        {stream.isLive && (
                                            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#1A1D26]"></span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-white font-bold text-sm">{stream.creator}</span>
                                            {stream.isVerified && (
                                                <div className="bg-[#2FE9A9] rounded-full p-[2px]">
                                                    <Check size={8} className="text-black stroke-[4]" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-gray-500 text-xs font-medium">{stream.game}</span>
                                    </div>
                                </div>

                                {/* Bottom Action Row */}
                                <div className="flex items-center justify-between">
                                    <button className="px-5 py-2 bg-[#FF5E3A] hover:bg-[#ff451f] text-white text-xs font-bold uppercase tracking-wide rounded-full flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all active:scale-95">
                                        <Radio size={14} className="animate-pulse" />
                                        <span>Live</span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></div>
                                        <span className="text-gray-400 text-xs font-medium tracking-wide">
                                            {stream.viewers} watching
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CreatorLive;
