import { Twitch, Youtube, Play, Users } from 'lucide-react';
import { BackgroundGradient } from '../components/ui/background-gradient';

const Live = () => {
    const streams = [
        { id: 1, user: "Ninja", game: "Fortnite", viewers: "125K", title: "FNCS Finals Watch Party", Platform: Twitch, color: "text-[#9146FF]" },
        { id: 2, user: "Shroud", game: "Valorant", viewers: "45K", title: "Radiant Ranked Gameplay", Platform: Twitch, color: "text-[#9146FF]" },
        { id: 3, user: "DrDisrespect", game: "Call of Duty", viewers: "32K", title: "Triple Threat Challenge", Platform: Youtube, color: "text-[#FF0000]" },
        { id: 4, user: "Tenz", game: "Valorant", viewers: "28K", title: "Aim Training & Scrims", Platform: Twitch, color: "text-[#9146FF]" },
    ];

    return (
        <div className="min-h-screen bg-[#0B0E14] pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wide">Live Channels</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feature Stream */}
                    <div className="lg:col-span-3 aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border border-white/20">
                                <Play size={32} className="text-white fill-white ml-2" />
                            </div>
                        </div>
                        <div className="absolute top-6 left-6 flex gap-3">
                            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded uppercase flex items-center gap-2 animate-pulse">
                                Live Now
                            </div>
                            <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded uppercase border border-white/10">
                                Official Tournament Broadcast
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-transparent">
                            <h2 className="text-3xl font-display font-bold text-white uppercase mb-2">Rivalioo seasonal championship Finals</h2>
                            <p className="text-gray-300 flex items-center gap-2">
                                <Users size={16} /> 245K Watching
                            </p>
                        </div>
                    </div>

                    {/* Stream Grid */}
                    {streams.map((stream) => (
                        <BackgroundGradient key={stream.id} className="bg-[#13161C] rounded-2xl overflow-hidden" containerClassName="rounded-2xl p-[1px]">
                            <div className="h-full hover:bg-[#1A1E26] transition-colors cursor-pointer group rounded-2xl">
                                <div className="aspect-video bg-black relative">
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                                        LIVE
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {stream.viewers}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-white font-bold text-sm truncate pr-2">{stream.title}</h3>
                                        <stream.Platform size={16} className={stream.color} />
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-[#2FE9A9] font-bold hover:underline">{stream.user}</span>
                                        <span className="text-gray-500">{stream.game}</span>
                                    </div>
                                </div>
                            </div>
                        </BackgroundGradient>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Live;
