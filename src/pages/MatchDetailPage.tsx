import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, Coins, ScrollText } from 'lucide-react';

const MatchDetailPage = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="pt-24 pb-32 min-h-screen px-6 max-w-4xl mx-auto relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft className="text-white" />
                </button>
                <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                    MATCH <span className="text-[#FF5E3A]">#{matchId}</span>
                </h1>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Info Section */}
                <div className="space-y-8">
                    <div className="bg-[#0F1219] p-6 rounded-2xl border border-white/5">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <ScrollText size={18} className="text-[#2FE9A9]" /> Match Info
                        </h3>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p>Map: <span className="text-white">Bermuda</span></p>
                            <p>Mode: <span className="text-white">Solo</span></p>
                            <p>Perspective: <span className="text-white">TPP</span></p>
                            <p>Server: <span className="text-white">Asia</span></p>
                        </div>
                    </div>

                    <div className="bg-[#0F1219] p-6 rounded-2xl border border-white/5">
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Coins size={18} className="text-[#FFD700]" /> Entry & Prize
                        </h3>
                        <div className="flex justify-between items-center mb-4 p-3 bg-white/5 rounded-xl">
                            <span className="text-gray-400 text-sm">Entry Fee</span>
                            <span className="text-white font-bold">50 Credits</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#2FE9A9]/10 rounded-xl border border-[#2FE9A9]/20">
                            <span className="text-[#2FE9A9] text-sm font-bold">Prize Pool</span>
                            <span className="text-white font-black text-xl">1000 Credits</span>
                        </div>
                    </div>
                </div>

                {/* Rules & Conditions */}
                <div className="bg-[#0F1219] p-6 rounded-2xl border border-white/5 h-full">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                        <AlertCircle size={18} className="text-[#FF5E3A]" /> Rules & Conditions
                    </h3>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex gap-3">
                            <CheckCircle size={16} className="text-[#2FE9A9] shrink-0 mt-0.5" />
                            <span>Players must be level 20+ in-game to participate.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle size={16} className="text-[#2FE9A9] shrink-0 mt-0.5" />
                            <span>Emulators are strictly prohibited. Mobile only.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle size={16} className="text-[#2FE9A9] shrink-0 mt-0.5" />
                            <span>Teaming up with other participants will result in ban.</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle size={16} className="text-[#2FE9A9] shrink-0 mt-0.5" />
                            <span>Screenshots of final score are required for dispute resolution.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0B0E14]/90 backdrop-blur-lg border-t border-white/10 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-bold">Total Entry</span>
                        <span className="text-xl font-black text-white">50 CREDITS</span>
                    </div>
                    <button className="px-12 py-4 bg-[#FF5E3A] hover:bg-[#FF4520] text-black font-black uppercase tracking-wider clip-path-polygon hover:scale-105 transition-transform"
                        style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                    >
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailPage;
