import { useState } from 'react';
import { motion } from 'framer-motion';
import { marketplaceItems } from '../constants';
import { Search, ArrowRight, ShoppingBag, Zap } from 'lucide-react';

const Marketplace = () => {
    const filters = ['All Items', 'Bundles', 'Skins', 'Currency', 'Gift Cards'];
    const [activeFilter, setActiveFilter] = useState('All Items');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    return (
        <section className="py-32 bg-[#0B0E14] text-white relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#FF5E3A]/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2FE9A9]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 bg-[#FF5E3A]/10 rounded text-[#FF5E3A]"><ShoppingBag size={16} /></span>
                            <span className="text-xs font-bold text-[#FF5E3A] uppercase tracking-widest">Premium Store</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-display font-black uppercase text-white leading-none mb-4">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Marketplace</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                            Exchange your <span className="text-[#2FE9A9] font-bold">Rival Points</span> for exclusive skins, real-world vouchers, and gaming gear. New drops every Friday.
                        </p>
                    </div>

                    {/* Search & Filter Group */}
                    <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                        <div className="relative w-full md:w-72 group">
                            <input
                                type="text"
                                placeholder="Search Items..."
                                className="w-full bg-[#151921]/80 backdrop-blur-sm border border-white/10 py-3.5 px-5 pr-12 text-sm focus:outline-none focus:border-[#FF5E3A] text-white placeholder-gray-500 rounded-xl transition-all shadow-lg focus:shadow-[#FF5E3A]/20"
                            />
                            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[#FF5E3A] transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Categories / Filters */}
                <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 scrollbar-hide mask-fade-right">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border whitespace-nowrap overflow-hidden group ${activeFilter === filter
                                ? 'bg-[#FF5E3A] border-[#FF5E3A] text-black shadow-[0_0_20px_rgba(255,94,58,0.4)]'
                                : 'bg-[#151921] border-white/10 text-gray-400 hover:text-white hover:bg-[#1A1D26] hover:border-white/20'
                                }`}
                        >
                            <span className="relative z-10">{filter}</span>
                            {activeFilter === filter && <div className="absolute inset-0 bg-white/20 blur-md"></div>}
                        </button>
                    ))}
                </div>

                {/* Featured / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Featured Item (Large Span) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-2 row-span-2 bg-[#1A1D26] rounded-3xl relative overflow-hidden group border border-white/10 hover:border-[#FF5E3A]/50 transition-all cursor-pointer shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-6 z-20 flex flex-col items-end gap-2">
                            <span className="bg-[#FF5E3A] text-black text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">Featured Bundle</span>
                            <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                                <Zap size={12} className="text-[#FFD700]" fill="#FFD700" /> Legendary
                            </div>
                        </div>

                        {/* Background & Image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E3A]/20 to-[#0B0E14] z-0"></div>
                        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                            <img
                                src="https://assets.goal.com/images/v3/blt56597257d07d6a52/GOAL%20-%20Blank%20WEB%20-%20Facebook%20(2).jpg?auto=webp&format=pjpg&width=3840&quality=60"
                                alt="Featured"
                                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 mask-image-gradient"
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col items-start">
                            <h3 className="text-3xl font-display font-bold text-white uppercase mb-2">Cyberpunk 2077 Pack</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 max-w-md">Get the exclusive Cyberpunk outfit and weapon skins for a limited time. Includes 3 legendary items.</p>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-3 bg-[#FF5E3A] hover:bg-[#ff451a] text-black font-black uppercase text-xs tracking-widest rounded transition-all shadow-[0_0_20px_rgba(255,94,58,0.3)] hover:shadow-[0_0_30px_rgba(255,94,58,0.5)] flex items-center gap-2">
                                    Purchase <ArrowRight size={14} />
                                </button>
                                <span className="text-xl font-bold text-white">4,500 <span className="text-xs text-gray-500">RC</span></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Standard Items */}
                    {marketplaceItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="bg-[#151921] rounded-2xl relative group overflow-hidden border border-white/5 hover:border-[#FF5E3A]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-[#FF5E3A]/5 to-transparent transition-opacity duration-300 pointer-events-none ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}></div>

                            {/* Tag */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-[#1A1D26]/80 backdrop-blur border border-white/10 text-gray-400 text-[10px] font-bold uppercase px-2 py-1 rounded">
                                    {item.subtitle}
                                </span>
                            </div>

                            {/* Image Area */}
                            <div className="h-48 w-full p-6 flex items-center justify-center relative z-10">
                                <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 bg-[#11141A] border-t border-white/5 relative z-20 h-full flex flex-col justify-end">
                                <h4 className="font-bold text-sm text-white mb-1 truncate group-hover:text-[#FF5E3A] transition-colors">{item.title}</h4>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">Price</span>
                                        <span className="text-white font-bold text-sm">{item.price} <span className="text-[#2FE9A9]">RC</span></span>
                                    </div>
                                    <button className="w-8 h-8 bg-[#1A1D26] hover:bg-[#FF5E3A] rounded flex items-center justify-center text-gray-400 hover:text-black transition-colors">
                                        <ShoppingBag size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Action */}
                <div className="flex justify-center">
                    <button className="group px-8 py-3 bg-transparent border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-full text-white font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-3">
                        View Full Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Marketplace;
