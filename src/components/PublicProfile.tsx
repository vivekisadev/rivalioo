import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    UserPlus,
    MoreHorizontal,
    Gamepad2,
    Users,
    MessageSquare,
    Clock,
    X,
    Trophy
} from 'lucide-react';
import type { UserProfile } from '../types/user';
import { friendService } from '../services/friendService';
import { useAuth } from '../context/AuthContext';
import Tooltip from './Tooltip';

interface PublicProfileProps {
    profile: UserProfile;
    onClose?: () => void;
}

const PublicProfile = ({ profile, onClose }: PublicProfileProps) => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'board' | 'activity' | 'wishlist' | 'mutuals' | 'friends' | 'servers'>('board');
    const [friendStatus, setFriendStatus] = useState<'none' | 'pending' | 'friends'>('none');

    useEffect(() => {
        const checkStatus = async () => {
            if (user && profile) {
                const isFriend = await friendService.checkIfFriends(user.id, profile.id);
                if (isFriend) {
                    setFriendStatus('friends');
                } else {
                    const status = await friendService.checkRequestStatus(user.id, profile.id);
                    if (status === 'pending') setFriendStatus('pending');
                }
            }
        };
        checkStatus();
    }, [user, profile]);

    const handleSendRequest = async () => {
        if (!user) return;
        const sent = await friendService.sendRequest(user, profile.id);
        if (sent) setFriendStatus('pending');
    };


    const formattedDate = new Date(profile.created_at || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Extract banner color from profile (could be dynamic later)
    const bannerColor = "#A02020"; // Deep red from reference image

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[1000px] h-[600px] bg-[#111214]/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5 relative"
            >
                {/* Background ambient glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/10 to-transparent pointer-events-none" />

                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-white/10 text-gray-400 hover:text-white rounded-full backdrop-blur-md transition-all border border-white/5"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Left Sidebar */}
                <div className="w-full md:w-[340px] bg-[#0B0C0E]/40 relative flex-shrink-0 flex flex-col border-r border-white/5">
                    {/* Banner */}
                    <div
                        className="h-[140px] w-full bg-cover bg-center relative mask-linear-fade"
                        style={{ backgroundColor: bannerColor }}
                    />

                    {/* Content Container */}
                    <div className="px-5 pb-6 flex-1 flex flex-col relative">
                        {/* Avatar */}
                        <div className="relative -mt-[56px] mb-4 w-[100px] h-[100px] group">
                            <div className="w-full h-full rounded-full p-[6px] bg-[#0B0C0E] relative z-10">
                                <img
                                    src={profile.profile_picture_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                                    alt={profile.username}
                                    className="w-full h-full rounded-full object-cover"
                                />
                                {/* Status Dot */}
                                <div className="absolute bottom-1 right-1 w-7 h-7 bg-[#0B0C0E] rounded-full flex items-center justify-center">
                                    <div className={`w-5 h-5 rounded-full ${profile.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} border-4 border-[#0B0C0E]`} />
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-white leading-tight mb-0.5">{profile.name || profile.username}</h2>
                            <p className="text-gray-400 text-sm font-medium mb-3">{profile.username}</p>

                            {/* Badges/Tags */}
                            <div className="flex gap-1.5 mb-4 items-center">
                                <Tooltip text="Most Played: Valorant" position="bottom" hoverDelay={200}>
                                    <div className="px-2 py-0.5 rounded bg-[#2FE9A9]/10 border border-[#2FE9A9]/20 text-[#2FE9A9] text-[10px] uppercase font-bold cursor-default hover:bg-[#2FE9A9]/20 transition-colors">
                                        FPS Gamer
                                    </div>
                                </Tooltip>

                                <Tooltip text="Global Rank #42" position="bottom" hoverDelay={200}>
                                    <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase font-bold cursor-default hover:bg-blue-500/20 transition-colors">
                                        Top 100
                                    </div>
                                </Tooltip>

                                <Tooltip text="Total Wins: 1,842" position="bottom" hoverDelay={200}>
                                    <div className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase font-bold cursor-default hover:bg-orange-500/20 transition-colors flex items-center gap-1">
                                        <Trophy size={10} /> 1.8k
                                    </div>
                                </Tooltip>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mb-8">
                            {friendStatus === 'friends' ? (
                                <button className="flex-1 py-1.5 px-3 bg-[#248046] hover:bg-[#1A6334] text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors">
                                    <MessageSquare size={16} fill="currentColor" /> Message
                                </button>
                            ) : (
                                <button className="flex-1 py-1.5 px-3 bg-[#D92D20] hover:bg-[#B72418] text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20">
                                    <MessageSquare size={16} fill="currentColor" /> Message
                                </button>
                            )}

                            {friendStatus === 'none' && (
                                <button
                                    onClick={handleSendRequest}
                                    className="w-9 h-9 bg-[#2B2D31] hover:bg-[#313338] text-gray-200 rounded flex items-center justify-center transition-colors font-bold"
                                    title="Add Friend"
                                >
                                    <UserPlus size={18} />
                                </button>
                            )}

                            {friendStatus === 'pending' && (
                                <button
                                    className="w-9 h-9 bg-[#2B2D31] text-yellow-500 rounded flex items-center justify-center font-bold cursor-not-allowed"
                                    title="Request Sent"
                                >
                                    <Clock size={18} />
                                </button>
                            )}

                            <button className="w-9 h-9 bg-[#2B2D31] hover:bg-[#313338] text-gray-200 rounded flex items-center justify-center transition-colors font-bold">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Member Since */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 mb-1">Member Since</h4>
                                <p className="text-gray-300 text-sm font-medium">{formattedDate}</p>
                            </div>

                            {/* Note */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 mb-1">Note <span className="text-gray-500 font-normal text-[11px] ml-1">(only visible to you)</span></h4>
                                <div className="relative">
                                    <textarea
                                        placeholder="Click to add a note"
                                        className="w-full bg-transparent text-xs text-gray-400 resize-none focus:outline-none h-5 placeholder-gray-600"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-[#2B2D31]/10 flex flex-col min-h-[400px]">
                    {/* Tabs */}
                    <div className="flex items-center gap-8 px-6 pt-6 pb-2 border-b border-black/10">
                        {['Board', 'Activity', 'Wishlist', 'Mutuals'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                                className={`pb-4 text-sm font-bold transition-colors relative ${(activeTab === tab.toLowerCase() || (activeTab === 'friends' && tab === 'Mutuals'))
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                {tab}
                                {(activeTab === tab.toLowerCase() || (activeTab === 'friends' && tab === 'Mutuals')) && (
                                    <motion.div layoutId="activeTab2" className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                        {activeTab === 'board' && (
                            <div className="space-y-6">
                                {/* Favorite Game */}
                                <div className="bg-[#1E1F22]/40 rounded-lg p-4 border border-white/5 hover:bg-[#1E1F22]/60 transition-colors group cursor-default">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Favorite Game</h3>
                                        <MoreHorizontal size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-20 h-28 bg-gray-900 rounded-lg shadow-black/50 shadow-lg overflow-hidden shrink-0 border border-white/5">
                                            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-base mb-1">Rivalioo Arena</h4>
                                            <p className="text-gray-400 text-xs mb-3 leading-relaxed">Currently ranked #1 on the global leaderboard. The ultimate competitive experience.</p>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-0.5 bg-[#2FE9A9]/10 text-[#2FE9A9] text-[10px] font-bold rounded uppercase border border-[#2FE9A9]/20">Competitive</span>
                                                <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-[10px] font-bold rounded uppercase border border-white/10">Shooter</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Games in Rotation */}
                                <div className="bg-[#1E1F22]/40 rounded-lg p-4 border border-white/5 hover:bg-[#1E1F22]/60 transition-colors group cursor-default">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Games in Rotation</h3>
                                        <MoreHorizontal size={16} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs" />
                                    </div>
                                    <div className="flex items-center gap-3 bg-[#111214]/50 p-2 rounded-lg border border-white/5">
                                        <div className="w-10 h-10 bg-gray-800 rounded-md overflow-hidden shrink-0">
                                            <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&q=80" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-bold text-sm truncate">Valorant</div>
                                            <div className="text-gray-500 text-[10px]">Recently played 2h ago</div>
                                        </div>
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer">
                                            <Users size={14} className="text-gray-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Games I Like */}
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Games I like</h3>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {[
                                            { name: 'Hollow Knight', img: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=300&q=80' },
                                            { name: 'Cyberpunk', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&q=80' },
                                            { name: 'Elden Ring', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80' },
                                            { name: 'Skyrim', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80' }
                                        ].map((game, i) => (
                                            <div key={i} className="aspect-[3/4] bg-[#111214] rounded-lg overflow-hidden relative group cursor-pointer border border-white/5 hover:border-white/20 transition-all">
                                                <img src={game.img} alt={game.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <p className="text-[10px] font-bold text-white truncate text-shadow-sm">{game.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'friends' || activeTab === 'mutuals') && (
                            <div className="grid grid-cols-1 gap-2 h-full">
                                {friendStatus === 'friends' ? (
                                    <div className="bg-[#1E1F22]/40 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full border border-white/5">
                                        <Users size={32} className="text-[#2FE9A9] mb-3" />
                                        <h3 className="text-white font-bold mb-1">You are friends!</h3>
                                        <p className="text-gray-400 text-xs">Start a conversation and play together.</p>
                                    </div>
                                ) : (
                                    <div className="bg-[#1E1F22]/40 rounded-lg p-4 flex flex-col items-center justify-center text-center h-full border border-white/5">
                                        <Users size={32} className="text-gray-600 mb-3" />
                                        <h3 className="text-white font-bold mb-1">No Mutual Friends</h3>
                                        <p className="text-gray-400 text-xs">You don't have any mutual connections yet.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {(activeTab === 'activity' || activeTab === 'wishlist' || activeTab === 'servers') && (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 min-h-[200px]">
                                <Gamepad2 size={40} className="text-gray-600 mb-4" />
                                <h3 className="text-gray-300 font-bold mb-1">Nothing here yet</h3>
                                <p className="text-gray-500 text-xs">This section is currently empty.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PublicProfile;
