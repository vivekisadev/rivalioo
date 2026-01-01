import { useState, useEffect, useMemo } from 'react';
import { Trophy, Gamepad2, CreditCard, Settings, LogOut, TrendingUp, Award, Target, Clock, User, Mail, Phone, MapPin, Save, X, ArrowRight, HelpCircle, Gamepad2 as GameIcon, RefreshCw, Users as UsersIcon, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserProfile, changePassword, getUserProfile } from '../services/userService';
import coinsIcon from '../assets/images/coins.png';
import ticketIcon from '../assets/images/ticket-f.png';
// import Tooltip from '../components/Tooltip'; // Unused - preserved for future use
import type { UserProfile } from '../types/user';
import PublicProfile from '../components/PublicProfile';

const Profile = () => {
    const { user: authUser, userProfile: currentUserProfile, logout, refreshProfile, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { userId: urlUserId, attribute } = useParams();

    const [fetchedProfile, setFetchedProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Determine which profile to show
    const isOwnProfile = useMemo(() => {
        if (!urlUserId || !authUser) return true;
        return urlUserId === authUser.id;
    }, [urlUserId, authUser]);

    const activeProfile = isOwnProfile ? currentUserProfile : fetchedProfile;

    // Map URL attribute to section name
    useEffect(() => {
        if (attribute) {
            const sectionMap: Record<string, string> = {
                'settings': 'Settings',
                'tournaments': 'Tournaments',
                'wallet': 'Wallets',
                'transactions': 'Wallets',
                'game-accounts': 'Game Accounts',
                'teams': 'Teams',
                'help': 'Help Center',
                'language': 'Settings',
                'statistics': 'Statistics'
            };
            const section = sectionMap[attribute] || 'Dashboard';
            setActiveSection(section);
        } else {
            setActiveSection('Dashboard');
        }
    }, [attribute]);

    // Fetch profile if not own
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isOwnProfile && urlUserId) {
                setIsLoading(true);
                const profile = await getUserProfile(urlUserId);
                setFetchedProfile(profile);
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [urlUserId, isOwnProfile]);

    // Settings form state
    const [settingsForm, setSettingsForm] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        bio: ''
    });

    // Update form when activeProfile changes
    useEffect(() => {
        if (activeProfile) {
            setSettingsForm({
                name: activeProfile.name || '',
                username: activeProfile.username || '',
                email: activeProfile.email || '',
                phone: activeProfile.phone || '',
                address: activeProfile.address || '',
                bio: activeProfile.bio || ''
            });
        }
    }, [activeProfile]);

    // Password change state
    const [passwordForm, setPasswordForm] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const user = {
        name: activeProfile?.name || activeProfile?.username || 'Player',
        username: activeProfile?.username || 'player',
        email: activeProfile?.email || 'player@rivallio.com',
        avatar: activeProfile?.profile_picture_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile?.username}`,
        coins: activeProfile?.coin_balance || 0,
        credits: activeProfile?.credit_balance || 0,
        plan: activeProfile?.current_plan || 'basic',
        planExpiry: activeProfile?.plan_expiry_date,
        multiplier: activeProfile?.plan_multiplier || 0.5,
        entriesLeft: activeProfile?.daily_entries_remaining || 3,
        stats: {
            tournaments: 42,
            winRate: 67,
            totalWins: 28,
            totalKills: 1847
        }
    };

    const menuItems = [
        { name: 'Dashboard', icon: Gamepad2, attr: '' },
        { name: 'Tournaments', icon: Trophy, attr: 'tournaments' },
        { name: 'Wallets', icon: CreditCard, attr: 'wallet' },
        { name: 'Statistics', icon: TrendingUp, attr: 'statistics' },
        { name: 'Teams', icon: UsersIcon, attr: 'teams' },
        { name: 'Game Accounts', icon: GameIcon, attr: 'game-accounts' },
        { name: 'Settings', icon: Settings, attr: 'settings', hidden: !isOwnProfile },
        { name: 'Help Center', icon: HelpCircle, attr: 'help' }
    ].filter(item => !item.hidden);

    const handleNav = (item: typeof menuItems[0]) => {
        const path = item.attr ? `/profile/${urlUserId || authUser?.id}/${item.attr}` : `/profile/${urlUserId || authUser?.id}`;
        navigate(path);
    };

    const recentMatches = [
        { game: 'BGMI Championship', time: '2:45 pm', place: '1st', reward: '+125' },
        { game: 'Free Fire Royale', time: '1:30 pm', place: '3rd', reward: '+40' },
        { game: 'COD Tournament', time: '11:20 am', place: '2nd', reward: '+75' }
    ];

    // Handle settings save
    const handleSaveSettings = async () => {
        if (!activeProfile?.id || !isOwnProfile) return;

        setIsSaving(true);
        setMessage(null);

        const result = await updateUserProfile(activeProfile.id, {
            name: settingsForm.name,
            phone: settingsForm.phone,
            address: settingsForm.address,
            bio: settingsForm.bio
        });

        setIsSaving(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            await refreshProfile();
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
        }
    };

    // Handle password change
    const handleChangePassword = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        const result = await changePassword(passwordForm.newPassword);

        setIsSaving(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordForm({ newPassword: '', confirmPassword: '' });
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to change password' });
        }
    };

    // Wait for auth to load before deciding "User not found"
    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#2FE9A9] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!activeProfile && !isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">User not found</h2>
                <button onClick={() => navigate('/home')} className="px-6 py-2 bg-[#2FE9A9] text-black rounded-lg">Back Home</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0E14] pt-28 pb-12 px-6 flex justify-center z-0 relative overflow-hidden text-white font-sans">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2FE9A9]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4F46E5]/5 rounded-full blur-[100px] pointer-events-none"></div>

            {!isOwnProfile && activeProfile ? (
                <PublicProfile profile={activeProfile} />
            ) : (
                <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 relative z-10">
                    {/* SIDEBAR */}
                    <div className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-28 space-y-6">
                            {/* User Card */}
                            <div className="bg-[#13161C] border border-white/5 rounded-3xl p-6 text-center shadow-xl">
                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    <motion.img
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-full h-full rounded-2xl object-cover border-2 border-[#2FE9A9]/20 shadow-[0_0_20px_rgba(47,233,169,0.1)]"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2FE9A9] rounded-full border-4 border-[#13161C] shadow-lg"></div>
                                </div>
                                <h2 className="text-white font-bold text-xl mb-1">{user.name}</h2>
                                <p className="text-gray-500 text-sm truncate mb-4">@{user.username}</p>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="px-3 py-1 bg-[#2FE9A9]/10 rounded-full text-[10px] text-[#2FE9A9] font-bold uppercase tracking-wider border border-[#2FE9A9]/10">
                                        {user.plan} member
                                    </span>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="bg-[#13161C] border border-white/5 rounded-3xl p-2 space-y-1 shadow-xl">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNav(item)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300
                                        ${activeSection === item.name
                                                ? 'bg-[#2FE9A9] text-[#0B0E14] shadow-lg shadow-[#2FE9A9]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                    `}
                                    >
                                        <item.icon size={18} />
                                        {item.name}
                                    </button>
                                ))}
                            </div>

                            {/* Logout Section */}
                            {isOwnProfile && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 text-red-500/70 font-bold text-xs uppercase py-4 rounded-3xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-dashed border-red-500/20 shadow-xl"
                                >
                                    <LogOut size={16} /> Log Out Account
                                </button>
                            )}
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="bg-[#13161C] border border-white/5 rounded-3xl p-8 md:p-10 min-h-[800px] shadow-2xl relative overflow-hidden"
                            >
                                {/* Decorative element */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#2FE9A9]/5 to-transparent pointer-events-none"></div>

                                {/* Section Header */}
                                <div className="mb-10 relative flex justify-between items-end">
                                    <div>
                                        <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wider mb-2">
                                            {activeSection}
                                        </h1>
                                        <div className="h-1 w-20 bg-[#2FE9A9] rounded-full"></div>
                                    </div>
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`px-4 py-2 rounded-xl border text-sm font-medium ${message.type === 'success'
                                                ? 'bg-[#2FE9A9]/10 border-[#2FE9A9]/30 text-[#2FE9A9]'
                                                : 'bg-red-500/10 border-red-500/30 text-red-400'
                                                } flex items-center gap-2`}
                                        >
                                            {message.text}
                                            <button onClick={() => setMessage(null)}><X size={14} /></button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Content Areas */}
                                {activeSection === 'Dashboard' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {[
                                                { label: 'Win Rate', value: `${user.stats.winRate}%`, icon: Target, color: '#2FE9A9' },
                                                { label: 'Total Wins', value: user.stats.totalWins, icon: Award, color: '#FF9F1C' },
                                                { label: 'Tournaments', value: user.stats.tournaments, icon: Trophy, color: '#4F46E5' },
                                                { label: 'Entries Left', value: `${user.entriesLeft}/3`, icon: Clock, color: '#94A3B8' }
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-[#1A1E26] border border-white/5 rounded-2xl p-5 group hover:border-[#2FE9A9]/30 transition-all duration-300">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="p-2.5 rounded-xl bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-[#2FE9A9]/20 transition-all">
                                                            <stat.icon size={18} />
                                                        </div>
                                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                                                    </div>
                                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Performance Grid */}
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                            <div className="xl:col-span-2 bg-[#1A1E26] border border-white/5 rounded-3xl p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-white font-bold text-lg">Performance Activity</h3>
                                                    <select className="bg-transparent text-gray-500 text-xs font-bold uppercase border-none focus:ring-0 cursor-pointer">
                                                        <option>Last 30 Days</option>
                                                    </select>
                                                </div>
                                                <div className="flex items-end justify-between h-48 gap-1.5 pt-4">
                                                    {[30, 45, 35, 60, 40, 55, 38, 65, 42, 58, 48, 70, 52, 75, 85, 65, 90, 75, 95, 80].map((height, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${height}%` }}
                                                            transition={{ delay: i * 0.02, duration: 0.5 }}
                                                            className={`flex-1 rounded-t-md transition-all ${i === 19 ? 'bg-[#2FE9A9]' : 'bg-[#2FE9A9]/10 group-hover:bg-[#2FE9A9]/20'}`}
                                                        ></motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-6">
                                                <h3 className="text-white font-bold text-lg mb-6">Match History</h3>
                                                <div className="space-y-4">
                                                    {recentMatches.map((match, i) => (
                                                        <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-transparent hover:border-[#2FE9A9]/20 transition-all cursor-pointer group">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-[#2FE9A9]/10 text-[#2FE9A9]' : 'bg-white/5 text-gray-500'}`}>
                                                                <Trophy size={18} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-white font-bold text-sm">{match.game}</div>
                                                                <div className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{match.time} • {match.place} Place</div>
                                                            </div>
                                                            <div className="text-[#2FE9A9] font-black">{match.reward}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => handleNav({ name: 'Tournaments', icon: Trophy, attr: 'tournaments' })}
                                                    className="w-full mt-6 py-3 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest border border-white/5 rounded-2xl hover:bg-white/5 transition-all"
                                                >
                                                    View All History
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'Wallets' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gradient-to-br from-[#FF9F1C] to-[#FF5E3A] rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl transition-transform hover:scale-[1.02]">
                                                <div className="flex justify-between items-start mb-10 relative z-10">
                                                    <div>
                                                        <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Total Earned</p>
                                                        <h3 className="text-5xl font-black">{user.coins.toLocaleString()}</h3>
                                                    </div>
                                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                                        <img src={coinsIcon} alt="Coins" className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-end relative z-10">
                                                    <div className="text-sm font-bold text-white/80">Rivalioo Coins</div>
                                                    <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold uppercase backdrop-blur-md transition-all">Redeem</button>
                                                </div>
                                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                                            </div>

                                            <div className="bg-gradient-to-br from-[#2FE9A9] to-[#00D9A3] rounded-3xl p-8 text-[#0B0E14] relative overflow-hidden group shadow-xl transition-transform hover:scale-[1.02]">
                                                <div className="flex justify-between items-start mb-10 relative z-10">
                                                    <div>
                                                        <p className="text-[#0B0E14]/70 text-sm font-bold uppercase tracking-widest mb-1">Credit Balance</p>
                                                        <h3 className="text-5xl font-black">₹{user.credits.toFixed(2)}</h3>
                                                    </div>
                                                    <div className="w-14 h-14 bg-[#0B0E14]/10 rounded-2xl flex items-center justify-center">
                                                        <img src={ticketIcon} alt="Credits" className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-end relative z-10">
                                                    <div className="text-sm font-bold text-[#0B0E14]/80">Available Credits</div>
                                                    <button className="px-4 py-2 bg-[#0B0E14]/10 hover:bg-[#0B0E14]/20 rounded-xl text-xs font-bold uppercase transition-all">Withdraw</button>
                                                </div>
                                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
                                            </div>
                                        </div>

                                        <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                            <div className="flex justify-between items-center mb-8">
                                                <h3 className="text-white font-bold text-lg">Transaction History</h3>
                                                <button className="text-[#2FE9A9] text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
                                            </div>
                                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-4 text-gray-600">
                                                    <RefreshCw size={32} />
                                                </div>
                                                <h4 className="text-white font-bold mb-1">No Transactions</h4>
                                                <p className="text-gray-500 text-sm max-w-xs">Your financial activity and prize redemptions will appear here.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'Statistics' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                                <h3 className="text-white font-bold text-lg mb-8">Performance Metrics</h3>
                                                <div className="space-y-6">
                                                    {[
                                                        { label: 'Total Matches', value: user.stats.tournaments, icon: Trophy, color: '#4F46E5' },
                                                        { label: 'Victory Rate', value: `${user.stats.winRate}%`, icon: Target, color: '#2FE9A9' },
                                                        { label: 'Top 3 Finishes', value: user.stats.totalWins, icon: Award, color: '#FF9F1C' },
                                                        { label: 'Total Eliminations', value: user.stats.totalKills.toLocaleString(), icon: Gamepad2, color: '#EF4444' }
                                                    ].map((stat, i) => (
                                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-3 rounded-xl bg-white/5 text-gray-400">
                                                                    <stat.icon size={20} />
                                                                </div>
                                                                <span className="text-gray-400 font-medium">{stat.label}</span>
                                                            </div>
                                                            <span className="text-white font-black text-xl">{stat.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                                <h3 className="text-white font-bold text-lg mb-8">Pro Membership</h3>
                                                <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1A1E26] to-[#0B0E14] border border-white/5 relative overflow-hidden mb-6">
                                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                                        <div>
                                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Active Plan</p>
                                                            <h4 className="text-2xl font-black text-[#2FE9A9] uppercase">{user.plan}</h4>
                                                        </div>
                                                        <div className="p-2 bg-[#2FE9A9]/20 text-[#2FE9A9] rounded-lg">
                                                            <Shield size={20} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4 relative z-10">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Winning Multiplier</span>
                                                            <span className="text-white font-bold">{user.multiplier}x</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Daily Free Entries</span>
                                                            <span className="text-white font-bold">{user.entriesLeft}/3 remaining</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(user.entriesLeft / 3) * 100}%` }}
                                                                className="h-full bg-[#2FE9A9]"
                                                            ></motion.div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none"></div>
                                                </div>
                                                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-2xl transition-all border border-white/5">
                                                    Upgrade Membership
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'Settings' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                                                <User size={20} className="text-[#2FE9A9]" /> Personal Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                        <input
                                                            type="text"
                                                            value={settingsForm.name}
                                                            onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                                                            className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#2FE9A9]/50 transition-all"
                                                            placeholder="Your full name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Username</label>
                                                    <div className="relative">
                                                        <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                        <input
                                                            type="text"
                                                            value={settingsForm.username}
                                                            disabled
                                                            className="w-full bg-[#0B0E14]/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                        <input
                                                            type="email"
                                                            value={settingsForm.email}
                                                            disabled
                                                            className="w-full bg-[#0B0E14]/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-gray-500 cursor-not-allowed"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Phone Number</label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                        <input
                                                            type="tel"
                                                            value={settingsForm.phone}
                                                            onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                                                            className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#2FE9A9]/50 transition-all"
                                                            placeholder="Mobile number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Home Address</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                                        <input
                                                            type="text"
                                                            value={settingsForm.address}
                                                            onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                                                            className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#2FE9A9]/50 transition-all"
                                                            placeholder="Full address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Bio / Status</label>
                                                    <textarea
                                                        value={settingsForm.bio}
                                                        onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                                                        className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#2FE9A9]/50 transition-all h-32 resize-none"
                                                        placeholder="A bit about yourself..."
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    onClick={handleSaveSettings}
                                                    disabled={isSaving}
                                                    className="px-10 py-4 bg-[#2FE9A9] text-[#0B0E14] font-black uppercase tracking-widest rounded-2xl hover:bg-[#2FE9A9]/90 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-[#2FE9A9]/20"
                                                >
                                                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                                                    Save Settings
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
                                                <Shield size={20} className="text-[#FF5E3A]" /> Security & Access
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">New Password</label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.newPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                        className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FF5E3A]/50 transition-all"
                                                        placeholder="Minimum 6 characters"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1">Confirm Password</label>
                                                    <input
                                                        type="password"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                        className="w-full bg-[#0B0E14] border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FF5E3A]/50 transition-all"
                                                        placeholder="Repeat new password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={handleChangePassword}
                                                    disabled={isSaving || !passwordForm.newPassword}
                                                    className="px-10 py-4 bg-[#FF5E3A] text-white font-black uppercase tracking-widest rounded-2xl hover:bg-[#FF5E3A]/90 hover:scale-105 transition-all shadow-lg shadow-[#FF5E3A]/20"
                                                >
                                                    Update Security
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'Tournaments' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex flex-col items-center justify-center py-32 text-center bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-700">
                                                <Trophy size={48} />
                                            </div>
                                            <h3 className="text-white font-bold text-2xl mb-2">No Activites Found</h3>
                                            <p className="text-gray-500 text-sm max-w-sm mb-10">You haven't participated in any tournaments yet. Your glory days are waiting!</p>
                                            <button
                                                onClick={() => navigate('/tournaments')}
                                                className="group px-8 py-4 bg-[#2FE9A9] text-[#0B0E14] font-black uppercase tracking-widest rounded-2xl hover:bg-[#2FE9A9]/90 transition-all inline-flex items-center gap-3 shadow-lg shadow-[#2FE9A9]/20"
                                            >
                                                Find Your First Game <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {(activeSection === 'Teams' || activeSection === 'Game Accounts' || activeSection === 'Help Center') && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex flex-col items-center justify-center py-32 text-center bg-[#1A1E26] border border-white/5 rounded-3xl p-8">
                                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-[#2FE9A9]/20">
                                                {activeSection === 'Teams' && <UsersIcon size={48} />}
                                                {activeSection === 'Game Accounts' && <GameIcon size={48} />}
                                                {activeSection === 'Help Center' && <HelpCircle size={48} />}
                                            </div>
                                            <h3 className="text-white font-bold text-2xl mb-2">{activeSection} Feature Available Soon</h3>
                                            <p className="text-gray-500 text-sm max-w-sm">We're working hard to bring this feature to Rivalioo. Stay tuned for the next update!</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
