import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Bell, Users as UsersIcon, ArrowRight,
    HelpCircle, Settings, Globe, Gamepad2, Trophy,
    Wallet, RefreshCw, LogOut, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

import SlidingTabs from './ui/sliding-tabs';
const MotionLink = motion(Link);
import logoFull from '../assets/images/logo_full.png';
import coinsIcon from '../assets/images/coins.png';
import ticketIcon from '../assets/images/ticket-f.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
const Navbar = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


    // Use Auth Context
    const { isAuthenticated, user, logout } = useAuth();
    const { items, openCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    // Context Logic for Tickets
    const pathParts = location.pathname.split('/');
    const currentCategory = pathParts[1] === 'tournaments' && ['daily', 'storm', 'rush'].includes(pathParts[3]) ? pathParts[3] : null;
    const mockTicketCounts: Record<string, string> = { daily: "3/3", storm: "1/2", rush: "0/1" };

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    // Navigation Links Config
    const guestLinks = [
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Shop', path: '/shop' },
        { name: 'Community', path: '/community' },
        { name: 'Live', path: '/live' },
        { name: 'Join Us', path: '/join' },
        { name: 'About Us', path: '/about' },
    ];

    const userLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Shop', path: '/shop' },
        { name: 'Community', path: '/community' },
        { name: 'Live', path: '/live' },
    ];

    const currentLinks = isAuthenticated && !isAuthPage ? userLinks : guestLinks;

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const userId = user?.id || 'guest';

    const dropdownSections = [
        {
            items: [
                { name: 'Help Center', path: `/profile/${userId}/help`, icon: HelpCircle },
            ]
        },
        {
            items: [
                { name: 'Profile', path: `/profile/${userId}`, icon: User },
                { name: 'Settings', path: `/profile/${userId}/settings`, icon: Settings },
                { name: 'Language', path: `/profile/${userId}/language`, icon: Globe },
            ]
        },
        {
            items: [
                { name: 'Game Accounts', path: `/profile/${userId}/game-accounts`, icon: Gamepad2 },
                { name: 'Teams', path: `/profile/${userId}/teams`, icon: UsersIcon },
                { name: 'Tournaments', path: `/profile/${userId}/tournaments`, icon: Trophy },
                { name: 'Wallet', path: `/profile/${userId}/wallet`, icon: Wallet },
                { name: 'Transactions', path: `/profile/${userId}/transactions`, icon: RefreshCw },
            ]
        }
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-[#0B0E14]/20 backdrop-blur-lg'
                    : 'bg-transparent'
                    }`}
                style={{ height: '74px' }}
            >
                {/* ... Container ... */}
                <div
                    className="mx-auto flex items-center justify-between px-3 h-full"
                    style={{
                        maxWidth: '1800px',
                    }}
                >
                    {/* Left Side: Logo */}
                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img
                            src={logoFull}
                            alt="RIVALLIO"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden xl:flex items-center gap-5 ml-6 mr-auto">
                        {currentLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-colors ${link.name === 'Live'
                                    ? 'text-[#FF0000] font-bold hover:text-red-400'
                                    : location.pathname === link.path
                                        ? 'text-[#2FE9A9] font-bold'
                                        : 'text-gray-300 hover:text-[#2FE9A9] font-medium'
                                    }`}
                            >
                                {link.name === 'Live' && (
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Control Panel (Logged In) */}
                    {isAuthenticated && !isAuthPage ? (
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Currency Display */}
                            <div className="flex items-center gap-2">

                                {/* Credits */}
                                <div
                                    onClick={() => navigate('/topup?type=credits')}
                                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 h-[36px] transition-all cursor-pointer group relative overflow-hidden border border-[#2FE9A9]/20 hover:border-[#2FE9A9] bg-gradient-to-r from-[#2FE9A9]/10 to-transparent backdrop-blur-md shadow-[0_0_15px_rgba(47,233,169,0.05)] hover:shadow-[0_0_20px_rgba(47,233,169,0.2)]"
                                >
                                    <div className="w-7 h-7 rounded-full bg-[#122329]/80 flex items-center justify-center border border-[#2FE9A9]/30 group-hover:border-[#2FE9A9] transition-colors z-10">
                                        <img src={coinsIcon} alt="Credits" className="w-4 h-4 object-contain" />
                                    </div>
                                    <div className="flex flex-col leading-none z-10">
                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider group-hover:text-[#2FE9A9] transition-colors">Credits</span>
                                        <span className="text-white font-bold text-xs tabular-nums text-shadow-sm">150</span>
                                    </div>
                                    {/* Liquid Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                                </div>

                                {/* Tickets (Dropdown) */}
                                <div className="relative group/tickets z-50">
                                    {/* Wrapper for click handling */}
                                    <div
                                        onClick={() => navigate('/topup?type=tickets')}
                                        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 h-[36px] transition-all cursor-pointer group relative overflow-hidden border border-[#FF5E3A]/20 hover:border-[#FF5E3A] bg-gradient-to-r from-[#FF5E3A]/10 to-transparent backdrop-blur-md shadow-[0_0_15px_rgba(255,94,58,0.05)] hover:shadow-[0_0_20px_rgba(255,94,58,0.2)]"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-[#0F2620]/80 flex items-center justify-center border border-[#FF5E3A]/30 group-hover:border-[#FF5E3A] transition-colors z-10">
                                            <img src={ticketIcon} alt="Tickets" className="w-4 h-4 object-contain" />
                                        </div>

                                        {currentCategory ? (
                                            <div className="flex flex-col leading-none z-10">
                                                <span className="text-[9px] text-[#2FE9A9] font-bold uppercase tracking-wider group-hover:text-[#FF5E3A] transition-colors">{currentCategory}</span>
                                                <span className="text-white font-bold text-xs tabular-nums text-shadow-sm">{mockTicketCounts[currentCategory]}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col leading-none z-10">
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider group-hover:text-[#FF5E3A] transition-colors">Tickets</span>
                                                <span className="text-white font-bold text-xs">View</span>
                                            </div>
                                        )}
                                        {/* Liquid Shine */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                                    </div>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-[#0B0E14] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/tickets:opacity-100 group-hover/tickets:visible transition-all duration-300 transform translate-y-2 group-hover/tickets:translate-y-0 overflow-hidden">
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between items-center bg-[#1A2C26]/50 p-2 rounded border border-[#2FE9A9]/20">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-[#2FE9A9]">Daily</span>
                                                    <span className="text-[10px] text-gray-500">Refreshes daily</span>
                                                </div>
                                                <span className="text-sm font-mono text-white font-bold">3/3</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-[#2C211A]/50 p-2 rounded border border-[#FF5E3A]/20">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-[#FF5E3A]">Storm</span>
                                                    <span className="text-[10px] text-gray-500">Elite access</span>
                                                </div>
                                                <span className="text-sm font-mono text-white font-bold">1/2</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-[#2C2A1A]/50 p-2 rounded border border-[#FFD700]/20">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-[#FFD700]">Rush</span>
                                                    <span className="text-[10px] text-gray-500">Premium only</span>
                                                </div>
                                                <span className="text-sm font-mono text-white font-bold">0/1</span>
                                            </div>
                                        </div>
                                        <Link to="/shop?category=tickets" className="block p-3 bg-[#2FE9A9]/10 hover:bg-[#2FE9A9]/20 border-t border-white/5 text-center transition-colors">
                                            <span className="text-xs text-[#2FE9A9] font-bold uppercase tracking-wider">Redeem Tickets</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Upgrade */}
                            <Tooltip text="Get Premium Status" position="bottom">
                                <button
                                    onClick={() => navigate('/subscription')}
                                    className="px-6 py-2 bg-[#FF5E3A] hover:bg-[#FF4520] text-black font-bold text-xs uppercase tracking-wider transition-all clip-path-polygon"
                                    style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                >
                                    Upgrade
                                </button>
                            </Tooltip>

                            {/* Icons: Friends & Notifications */}
                            <div className="flex items-center gap-4">
                                {items.length > 0 && (
                                    <Tooltip text="View Cart" position="bottom">
                                        <button
                                            onClick={openCart}
                                            className="relative text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ShoppingBag size={24} />
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2FE9A9] text-[10px] text-black font-bold">
                                                {items.length}
                                            </span>
                                        </button>
                                    </Tooltip>
                                )}

                                {/* Friends Dropdown */}
                                <div className="relative group/friends">
                                    <button className="relative text-gray-400 hover:text-white transition-colors">
                                        <UsersIcon size={24} />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#2FE9A9] rounded-full"></span>
                                    </button>

                                    {/* Dropdown Content */}
                                    <div className="absolute right-0 top-full mt-4 w-80 bg-[#13161C] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover/friends:opacity-100 group-hover/friends:visible transition-all duration-300 transform translate-y-2 group-hover/friends:translate-y-0 z-50 overflow-hidden">
                                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                                            <h3 className="text-white font-bold text-sm">Friends</h3>
                                            <span className="text-xs text-[#2FE9A9] font-bold uppercase cursor-pointer hover:underline">Find Friends</span>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {/* Mock Friend List - In real app, map from friendService */}
                                            {[
                                                { name: 'AlexPro', status: 'online', game: 'Playing Valorant' },
                                                { name: 'KillerQueen', status: 'offline', game: 'Last seen 2h ago' },
                                                { name: 'NoobMaster', status: 'online', game: 'In Menu' }
                                            ].map((friend, i) => (
                                                <div key={i} className="p-3 hover:bg-white/5 transition-colors flex items-center gap-3 cursor-pointer">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`} alt={friend.name} />
                                                        </div>
                                                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#13161C] ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white font-bold text-sm">{friend.name}</div>
                                                        <div className="text-gray-500 text-xs">{friend.game}</div>
                                                    </div>
                                                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 border-t border-white/5 bg-[#0B0E14] text-center">
                                            <button className="text-xs text-gray-400 hover:text-white font-bold uppercase transition-colors">View All Requests</button>
                                        </div>
                                    </div>
                                </div>

                                <Tooltip text="Notifications" position="bottom">
                                    <button className="relative text-gray-400 hover:text-white transition-colors">
                                        <Bell size={24} />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF5E3A] rounded-full"></span>
                                    </button>
                                </Tooltip>
                            </div>

                            {/* Profile Avatar */}
                            <div className="relative group">
                                <div className="p-0.5 rounded-full border-2 border-[#00FFB2] cursor-pointer">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&h=150"
                                        alt="User"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>
                                {/* Dropdown (Hover) */}
                                <div className="absolute right-0 top-full mt-2 w-64 bg-[#0B0E14] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden z-[60]">
                                    <div className="px-4 py-4">
                                        <h3 className="text-xl font-bold text-white mb-2 leading-none">My Account</h3>
                                    </div>

                                    {dropdownSections.map((section, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="py-1 border-t border-white/5">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/5 hover:text-white transition-colors group/item"
                                                    >
                                                        <item.icon size={18} className="text-gray-400 group-hover/item:text-[#2FE9A9] transition-colors" />
                                                        <span className="text-sm font-medium">{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    ))}

                                    <div className="py-1 border-t border-white/5 bg-[#0B0E14]">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-[#FF5E3A] hover:bg-[#FF5E3A]/5 transition-colors group/logout"
                                        >
                                            <LogOut size={18} className="group-hover/logout:translate-x-0.5 transition-transform" />
                                            <span className="text-sm font-bold">Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Logged Out View (Landing Page) - Styled to Match Image */
                        <div className="hidden lg:flex items-center gap-4">
                            {items.length > 0 && (
                                <Tooltip text="View Cart" position="bottom">
                                    <button
                                        onClick={openCart}
                                        className="relative text-gray-400 hover:text-white transition-colors mr-2"
                                    >
                                        <ShoppingBag size={24} />
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2FE9A9] text-[10px] text-black font-bold">
                                            {items.length}
                                        </span>
                                    </button>
                                </Tooltip>
                            )}
                            <MotionLink
                                to="/signup"
                                initial="initial"
                                whileHover="hover"
                                whileTap="initial"
                                className="px-6 py-2 bg-[#FF5E3A] hover:bg-[#FF4520] text-black font-bold text-sm uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>Sign Up</motion.span>
                                <motion.span
                                    variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                                    style={{ overflow: "hidden", display: "inline-block" }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </MotionLink>
                            <MotionLink
                                to="/login"
                                initial="initial"
                                whileHover="hover"
                                whileTap="initial"
                                className="px-6 py-2 bg-[#1A1D26] hover:bg-[#252830] text-white font-bold text-sm uppercase tracking-wider transition-all border border-gray-600 hover:border-gray-400 inline-flex items-center justify-center gap-2"
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <motion.span variants={{ initial: { x: 0 }, hover: { x: -3 } }}>Sign In</motion.span>
                                <motion.span
                                    variants={{ initial: { width: 0, opacity: 0, x: -5 }, hover: { width: 16, opacity: 1, x: 0 } }}
                                    style={{ overflow: "hidden", display: "inline-block" }}
                                >
                                    <ArrowRight size={16} />
                                </motion.span>
                            </MotionLink>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        className="xl:hidden text-white ml-auto p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg viewBox="0 0 142 142" className="w-8 h-8 overflow-visible">
                            <path
                                d="M43,50.28h70c9,0,18.79-2,18.79-11.81c0-6.9-7.25-12.84-17.41-9.08C106,32.49,97.7,44.3,91.72,50.28L50.28,91.72"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-500 ease-in-out"
                                style={{
                                    strokeDasharray: isMobileMenuOpen ? "58.61 149.41" : "56 152.02",
                                    strokeDashoffset: isMobileMenuOpen ? "58.61" : "208.02"
                                }}
                            />
                            <path
                                d="M113,83v-42c0-6.627417-5.372583-12-12-12h-60c-6.627417,0-12,5.372583-12,12v60c0,6.627417,5.372583,12,12,12h60c6.627417,0,12-5.372583,12-12v-18c0-6.627417-5.372583-12-12-12h-58"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-500 ease-in-out"
                                style={{
                                    strokeDasharray: isMobileMenuOpen ? "315.41 76.85" : "56 336.26",
                                    strokeDashoffset: isMobileMenuOpen ? "392.26" : "56"
                                }}
                            />
                            <path
                                d="M99,91.72h-56c-24.45,0-37.24-12.28-37.24-28.13c0-19.66,24.08-33.75,44.52-13.31L91.72,91.72"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-500 ease-in-out"
                                style={{
                                    strokeDasharray: isMobileMenuOpen ? "58.61 169.16" : "56 171.77",
                                    strokeDashoffset: isMobileMenuOpen ? "58.61" : "227.77"
                                }}
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        {/* Backdrop with Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full md:w-[400px] h-full bg-[#0B0E14] border-l border-white/10 shadow-2xl flex flex-col pt-20 px-6 pb-6 overflow-y-auto"
                        >
                            {/* Close Button (SVG in 'Open' State) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors p-2"
                            >
                                <svg viewBox="0 0 142 142" className="w-8 h-8 overflow-visible">
                                    <path
                                        d="M43,50.28h70c9,0,18.79-2,18.79-11.81c0-6.9-7.25-12.84-17.41-9.08C106,32.49,97.7,44.3,91.72,50.28L50.28,91.72"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ strokeDasharray: "58.61 149.41", strokeDashoffset: "58.61" }}
                                    />
                                    <path
                                        d="M113,83v-42c0-6.627417-5.372583-12-12-12h-60c-6.627417,0-12,5.372583-12,12v60c0,6.627417,5.372583,12,12,12h60c6.627417,0,12-5.372583,12-12v-18c0-6.627417-5.372583-12-12-12h-58"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ strokeDasharray: "315.41 76.85", strokeDashoffset: "392.26" }}
                                    />
                                    <path
                                        d="M99,91.72h-56c-24.45,0-37.24-12.28-37.24-28.13c0-19.66,24.08-33.75,44.52-13.31L91.72,91.72"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ strokeDasharray: "58.61 169.16", strokeDashoffset: "58.61" }}
                                    />
                                    ```
                                </svg>
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-display font-bold text-white mb-1">Menu</h2>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Navigate & Explore</p>
                            </div>

                            <SlidingTabs
                                tabs={[
                                    {
                                        id: 'menu',
                                        label: 'Discover',
                                        content: (
                                            <div className="flex flex-col gap-2 mt-2">
                                                {currentLinks.map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        to={link.path}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#2FE9A9]/50 transition-all group ${link.name === 'Live' ? 'text-[#FF0000]' : 'text-gray-300'
                                                            }`}
                                                    >
                                                        <span className={`font-bold ${link.name === 'Live' ? 'text-red-500' : 'text-gray-200'} group-hover:text-white`}>
                                                            {link.name}
                                                        </span>
                                                        {link.name === 'Live' && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#2FE9A9]" />
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'account',
                                        label: isAuthenticated ? 'My Profile' : 'Join Us',
                                        content: isAuthenticated ? (
                                            <div className="flex flex-col gap-4 mt-2">
                                                {/* Authenticated User Content */}
                                                <div className="bg-[#151921] rounded-2xl p-4 border border-white/5">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&h=150" className="w-12 h-12 rounded-full object-cover border-2 border-[#2FE9A9]" />
                                                        <div>
                                                            <div className="text-white font-bold text-lg">{user?.user_metadata?.username || 'Player'}</div>
                                                            <div className="text-[#2FE9A9] text-xs font-bold uppercase">Pro Member</div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                        <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                                                            <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Coins</div>
                                                            <div className="text-[#FFD700] font-bold">1,250</div>
                                                        </div>
                                                        <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                                                            <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Credits</div>
                                                            <div className="text-white font-bold">450</div>
                                                        </div>
                                                    </div>

                                                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 bg-[#2FE9A9] text-black font-bold uppercase rounded-xl flex items-center justify-center text-sm hover:bg-[#2FE9A9]/90 transition-colors">
                                                        View Full Profile
                                                    </Link>
                                                </div>

                                                <div className="space-y-1">
                                                    {[
                                                        { name: 'Game Accounts', icon: Gamepad2, path: '/profile/games' },
                                                        { name: 'My Teams', icon: UsersIcon, path: '/profile/teams' },
                                                        { name: 'Wallet', icon: Wallet, path: '/profile/wallet' },
                                                        { name: 'Settings', icon: Settings, path: '/profile/settings' }
                                                    ].map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                        >
                                                            <item.icon size={18} />
                                                            <span className="font-medium text-sm">{item.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full mt-4 py-3 border border-[#FF5E3A]/30 text-[#FF5E3A] font-bold uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-[#FF5E3A]/10 transition-colors"
                                                >
                                                    <LogOut size={16} /> Log Out
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4 mt-2">
                                                {/* Guest Content */}
                                                <div className="bg-[#151921] rounded-2xl p-6 border border-white/5 text-center">
                                                    <h3 className="text-white font-bold text-xl mb-2">Join the Action</h3>
                                                    <p className="text-gray-400 text-sm mb-6">Create an account to join tournaments, earn rewards, and climb the leaderboard.</p>

                                                    <div className="flex flex-col gap-3">
                                                        <Link
                                                            to="/signup"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="w-full py-3 bg-[#2FE9A9] text-black font-bold uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-[#2FE9A9]/90 transition-colors"
                                                        >
                                                            Sign Up Now <ArrowRight size={16} />
                                                        </Link>
                                                        <Link
                                                            to="/login"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="w-full py-3 bg-[#0B0E14] border border-white/10 text-white font-bold uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                                                        >
                                                            Log In
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
