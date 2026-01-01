import { TrendingUp } from 'lucide-react';
import heroImage from '../assets/images/hero.png';

const DashboardHero = () => {
    // Recent Activity Data
    const activities = [
        { id: 1, name: 'Phoenix', game: 'Bgmi', rank: '1st', rankColor: 'text-[#00FFB2]', coins: '+500', date: 'Nov 12', image: "https://i.pravatar.cc/150?img=11" },
        { id: 2, name: 'Brimstone', game: 'FreeFire', rank: '2nd', rankColor: 'text-blue-400', coins: '+200', date: 'Nov 12', image: "https://i.pravatar.cc/150?img=12" },
        { id: 3, name: 'Reyna', game: 'Bgmi', rank: '3rd', rankColor: 'text-orange-400', coins: '+130', date: 'Nov 12', image: "https://i.pravatar.cc/150?img=5" },
        { id: 4, name: 'Sage', game: 'COD', rank: '5th', rankColor: 'text-gray-400', coins: '+0', date: 'Nov 12', image: "https://i.pravatar.cc/150?img=9" },
    ];

    return (
        <section className="relative pt-24 pb-12 px-4 md:px-8">
            <div className={`mx-auto max-w-7xl flex flex-col lg:flex-row gap-6 lg:h-[422px]`}>
                {/* Left Banner - Trending Tournaments */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2FE9A9] to-[#00C6FF] w-full lg:flex-1 h-[400px] lg:h-auto shadow-2xl group">
                    <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12">
                        {/* Trending Badge */}
                        <div className="flex items-center gap-2 mb-4 lg:mb-6">
                            <div className="bg-black/10 p-1 rounded">
                                <TrendingUp size={16} className="text-black lg:w-5 lg:h-5" />
                            </div>
                            <span className="text-black font-bold uppercase tracking-wider text-xs lg:text-sm">Trending</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl lg:text-5xl font-display font-bold text-black uppercase leading-tight mb-4 max-w-md">
                            EPIC TOURNAMENTS FOR TRUE GAMERS
                        </h2>

                        {/* Description */}
                        <p className="text-black/80 font-medium text-sm lg:text-lg max-w-[300px] lg:max-w-sm mb-6 lg:mb-8">
                            Join the grand tournaments today. Compete and secure your reward.
                        </p>
                    </div>

                    {/* Character Image overlay */}
                    <div className="absolute top-0 right-0 h-full w-[60%] lg:w-[55%]">
                        <img
                            src={heroImage}
                            alt="Characters"
                            className="w-full h-full object-cover object-left lg:object-center lg:translate-x-10 scale-110 lg:scale-100"
                            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%)' }}
                        />
                    </div>
                </div>

                {/* Right Panel - Recent Activity */}
                <div className="bg-[#D9D9D9] rounded-3xl overflow-hidden flex flex-col w-full lg:w-[450px] lg:h-full shadow-2xl h-[500px]">
                    {/* Header */}
                    <div className="p-6 pb-2 bg-[#D9D9D9] z-10">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">Recent Activity</h3>
                        <p className="text-gray-500 text-[10px] lg:text-xs leading-relaxed">
                            Discover which Agents perform best with win rates, pick rates, average scores, and other helpful statistics.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto px-6 custom-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="text-center text-gray-500 text-[10px] lg:text-xs border-b border-gray-300">
                                    <th className="pb-3 px-2 font-bold text-left">Match</th>
                                    <th className="pb-3 px-2 font-bold">Game</th>
                                    <th className="pb-3 px-2 font-bold">Rank</th>
                                    <th className="pb-3 px-2 font-bold">Coins</th>
                                    <th className="pb-3 px-2 font-bold text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-300/50 last:border-0 hover:bg-black/5 transition-colors">
                                        <td className="py-3 px-2 text-left">
                                            <div className="flex items-center gap-2 lg:gap-3">
                                                <img src={item.image} alt={item.name} className="w-6 h-6 lg:w-8 lg:h-8 rounded object-cover shadow-sm" />
                                                <span className="font-bold text-gray-800 text-xs lg:text-sm">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-center text-gray-500 text-xs lg:text-sm font-medium">{item.game}</td>
                                        <td className={`py-3 px-2 text-center ${item.rankColor} font-bold text-xs lg:text-sm`}>{item.rank}</td>
                                        <td className="py-3 px-2 text-center font-bold text-xs lg:text-sm text-[#00C6FF]">{item.coins}</td>
                                        <td className="py-3 px-2 text-right text-gray-400 text-[10px] lg:text-xs">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Button - Sticky at bottom */}
                    <div className="bg-[#1A1D26] p-4 flex items-center justify-center cursor-pointer hover:bg-black transition-colors shrink-0">
                        <span className="text-white font-bold text-xs lg:text-sm uppercase tracking-wider">View All Statistics</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardHero;
