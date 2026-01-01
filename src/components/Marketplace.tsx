import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { marketplaceItems } from '../constants';
import { Search, Eye, ArrowRight, Coins, Check, AlertCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductQuickView from './shop/ProductQuickView';
import { Expandable, ExpandableCard, ExpandableCardContent, ExpandableTrigger } from './ui/expandablecard';
import { gsap } from 'gsap';
import { marketplaceService } from '../services/marketplaceService';

// Game Cards Data (Fallback or Initial)
interface GamePackage {
    id: string;
    amount: string;
    credits: number;
    bonus?: string;
}

interface GameCard {
    id: string;
    name: string;
    coverImage: string;
    iconImage: string;
    color: string;
    language: string;
    region: string;
    currency: string;
    packages: GamePackage[];
}

const INITIAL_GAME_CARDS: GameCard[] = [
    {
        id: 'bgmi',
        name: 'Battlegrounds Mobile (India)',
        coverImage: new URL('../assets/images/bgmi-cover.jpg', import.meta.url).href,
        iconImage: new URL('../assets/images/bgmi.png', import.meta.url).href,
        color: '#60A5FA',
        language: 'English',
        region: 'India',
        currency: 'UC',
        packages: [
            { id: 'bgmi1', amount: '60 UC', credits: 100 },
            { id: 'bgmi2', amount: '325 UC', credits: 500, bonus: '+25 Free' },
            { id: 'bgmi3', amount: '660 UC', credits: 1000, bonus: '+60 Free' },
            { id: 'bgmi4', amount: '1800 UC', credits: 2700, bonus: '+300 Free' },
            { id: 'bgmi5', amount: '3850 UC', credits: 5500, bonus: '+850 Free' },
            { id: 'bgmi6', amount: '8100 UC', credits: 11000, bonus: '+2100 Free' },
        ]
    },
    // Keep other hardcoded cards as fallback if DB is empty or during loading
];

const Marketplace = () => {
    const filters = ['All Items', 'Bundle', 'Skins', 'Gear', 'Redeem'];
    const [activeFilter, setActiveFilter] = useState('All Items');
    const [redeemCategory, setRedeemCategory] = useState("All Games");

    const redeemSubCategories = ["All Games", "Free Fire", "BGMI", "COD"];

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // Game Card Expansion State
    const [expandedGame, setExpandedGame] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [playerId, setPlayerId] = useState('');
    const [error, setError] = useState('');
    const userCredits = 5000;

    // DB Data
    const [gameCards, setGameCards] = useState<GameCard[]>(INITIAL_GAME_CARDS); // Use fallback initially

    // Fetch from DB
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const games = await marketplaceService.getGames();
                if (games && games.length > 0) {
                    setGameCards(games as unknown as GameCard[]);
                }
            } catch (err) {
                console.error("Failed to fetch games", err);
            }
        };
        fetchGames();
    }, []);

    const { addItem } = useCart();
    const gridRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);

    // Handle URL Params and Shared State
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');

        if (category) {
            if (category.toLowerCase() !== 'credits' && category.toLowerCase() !== 'tickets') {
                // Only scroll/filter if it's a valid shop category
            }

            setTimeout(() => {
                gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        const state = location.state as { selectedProduct?: any };
        if (state?.selectedProduct) {
            setSelectedProduct(state.selectedProduct);
            setIsModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Initial Hero Animation
    useEffect(() => {
        if (heroTextRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(heroTextRef.current.children,
                { y: 100, opacity: 0, skewY: 7 },
                { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
            );
        }
    }, []);

    // Grid Stagger Animation on Filter Change
    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
            );
        }
    }, [activeFilter, searchQuery]);

    const handleQuickAdd = (e: React.MouseEvent, product: any) => {
        e.stopPropagation();
        addItem({
            id: product.id.toString(),
            name: product.title,
            image: product.image,
            price: product.priceCredits || 0, // Use Credits Price
            quantity: 1,
            currency: 'Credits',
            type: 'product'
        });
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleRedeem = (game: GameCard) => {
        if (!playerId.trim()) {
            setError('Please enter your Player ID');
            return;
        }
        if (!selectedPackage) {
            setError('Please select a package');
            return;
        }

        const pkg = game.packages.find((p) => p.id === selectedPackage);
        if (pkg && userCredits >= pkg.credits) {
            // Add to Cart Logic for Redemption
            addItem({
                id: `${game.id}-${pkg.id}-${Date.now()}`, // Unique ID for cart entry
                name: `${game.name} - ${pkg.amount}`,
                image: game.iconImage,
                price: pkg.credits,
                quantity: 1,
                currency: 'Credits',
                type: 'redemption',
                metadata: {
                    playerId: playerId,
                    gameId: game.id,
                    packageId: pkg.id,
                    amountName: pkg.amount,
                    creditsCost: pkg.credits
                }
            });

            // Reset UI
            alert(`Added ${pkg.amount} to cart! Go to cart to checkout.`);
            setSelectedPackage(null);
            setPlayerId('');
            setError('');
        } else {
            setError('Insufficient credits');
        }
    };

    // Filter Logic
    const filteredItems = useMemo(() => {
        return marketplaceItems.filter(item => {
            // Exclude Credits/Tickets (Wallet Items)
            if (item.type === 'Credits' || item.type === 'Tickets') return false;

            // Redeem Logic - SKIP, we'll show game cards instead
            if (activeFilter === 'Redeem') {
                return false; // Don't show regular items in Redeem filter
            }

            // Normal Logic (Exclude Redemption from standard lists)
            if (item.type === 'Redemption') return false;

            const matchesCategory = activeFilter === 'All Items' || item.type === activeFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeFilter, searchQuery, redeemCategory]);

    // Filter game cards based on subcategory
    const filteredGameCards = useMemo(() => {
        if (redeemCategory === "All Games") return gameCards;
        return gameCards.filter(game => {
            if (redeemCategory === "Free Fire") return game.id === 'free-fire';
            if (redeemCategory === "BGMI") return game.id === 'bgmi';
            if (redeemCategory === "COD") return game.id === 'cod';
            return true;
        });
    }, [redeemCategory, gameCards]);

    const featuredBundle = {
        image: "https://assets.goal.com/images/v3/blt56597257d07d6a52/GOAL%20-%20Blank%20WEB%20-%20Facebook%20(2).jpg?auto=webp&format=pjpg&width=3840&quality=60",
        title: "CYBERPUNK LEGENDS PACK",
        subtitle: "Season 5 Exclusive"
    };

    return (
        <section className="min-h-screen bg-transparent text-white">

            {/* 1. Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={featuredBundle.image}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-90"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 flex flex-col items-start max-w-4xl" ref={heroTextRef}>
                    <div>
                        <span
                            className="px-3 py-1 bg-[#FFD700] text-black font-bold uppercase text-xs tracking-widest mb-4 inline-block"
                        >
                            {featuredBundle.subtitle}
                        </span>
                    </div>
                    <h1
                        className="text-5xl md:text-7xl font-black uppercase text-white leading-none mb-6 font-oswald"
                    >
                        {featuredBundle.title}
                    </h1>
                    <button
                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#2FE9A9] transition-colors"
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            {/* 2. Ticker / Marquee */}
            <div className="bg-[#2FE9A9] text-[#0B0E14] py-3 overflow-hidden whitespace-nowrap border-y border-black relative z-20">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, repeatType: "loop", ease: "linear", duration: 40 }}
                    className="inline-flex items-center gap-12 font-bold uppercase tracking-widest text-sm"
                >
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span>New Season Drops</span>
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                            <span>20% Discount Bundles</span>
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                            <span>Limited Time Skins</span>
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-16">

                {/* Header & Controls */}
                <div className="flex flex-col gap-6 mb-12">
                    {/* Title Row */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                            {activeFilter === 'Redeem' ? 'Game Top-Ups' : 'Latest Products'}
                        </h2>

                        {/* Desktop Search */}
                        {activeFilter !== 'Redeem' && (
                            <div className="relative hidden md:block w-72">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-[#2FE9A9] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                                />
                                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0 w-full sm:w-auto">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all whitespace-nowrap border ${activeFilter === filter
                                        ? 'bg-[#2FE9A9] text-black border-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.3)]'
                                        : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Search */}
                        {activeFilter !== 'Redeem' && (
                            <div className="relative w-full sm:hidden">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-[#2FE9A9] focus:bg-white/10 transition-all text-white placeholder-gray-500"
                                />
                                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Redeem Subcategories */}
                <AnimatePresence>
                    {activeFilter === 'Redeem' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-8 overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-3">
                                {redeemSubCategories.map(sub => (
                                    <button
                                        key={sub}
                                        onClick={() => setRedeemCategory(sub)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${redeemCategory === sub
                                            ? 'bg-[#2FE9A9]/10 border-[#2FE9A9] text-[#2FE9A9]'
                                            : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Game Cards (Redeem Filter) */}
                {activeFilter === 'Redeem' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4">
                        {filteredGameCards.map((game) => (
                            <Expandable
                                key={game.id}
                                expanded={expandedGame === game.id}
                                onToggle={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                                className={`transition-all duration-300 ${expandedGame === game.id ? 'md:col-span-2' : ''}`}
                            >
                                <ExpandableCard
                                    className="w-full bg-[#1A1D26] border border-white/5 shadow-2xl"
                                    collapsedSize={{ width: undefined, height: 220 }}
                                    expandedSize={{ width: undefined, height: undefined }}
                                    expandDelay={200}
                                    collapseDelay={200}
                                >
                                    {expandedGame === game.id && (
                                        <div className="absolute top-4 right-4 z-50">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedGame(null);
                                                }}
                                                className="p-2 bg-black/40 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    )}
                                    <ExpandableTrigger className="w-full">
                                        <div className="flex flex-row gap-4 p-4 h-[220px]">
                                            {/* OPTIMIZED IMAGE CONTAINER: Takes only necessary space */}
                                            <div className="h-full w-auto shrink-0 relative overflow-hidden rounded-xl bg-black/40">
                                                <img
                                                    src={game.coverImage}
                                                    alt={game.name}
                                                    className="h-full w-auto object-contain max-w-[180px]"
                                                />
                                                {/* Gradient overlay only on the image for depth */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none"></div>
                                            </div>

                                            {/* Right: Info */}
                                            <div className="flex-1 flex flex-col justify-center py-2 pr-4 text-left">
                                                <div>
                                                    <h3
                                                        className="text-white font-bold text-2xl mb-2 leading-tight"
                                                        style={{ textShadow: `0 0 20px ${game.color}40` }}
                                                    >
                                                        {game.name}
                                                    </h3>
                                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                                                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{game.language}</span>
                                                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{game.region}</span>
                                                    </div>

                                                    <div
                                                        className="flex items-center gap-2 text-sm font-bold transition-all group"
                                                        style={{ color: game.color }}
                                                    >
                                                        <span>Tap to Redeem</span>
                                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ExpandableTrigger>

                                    <ExpandableCardContent className="border-t border-white/5 bg-[#0B0E14]/50">
                                        <div className="p-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                                {/* Left: Player Info input */}
                                                <div className="space-y-4">
                                                    <div className="bg-[#151921] rounded-xl p-4 border border-white/5">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-gray-400 uppercase">Your Credits</span>
                                                            <Coins size={14} className="text-[#2FE9A9]" />
                                                        </div>
                                                        <div className="text-2xl font-black text-[#2FE9A9]">{userCredits.toLocaleString()}</div>
                                                    </div>

                                                    <div>
                                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Player ID</label>
                                                        <input
                                                            type="text"
                                                            value={playerId}
                                                            onChange={(e) => {
                                                                setPlayerId(e.target.value);
                                                                setError('');
                                                            }}
                                                            placeholder="Enter Player ID"
                                                            className="w-full bg-[#151921] border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-[#2FE9A9] focus:ring-0 transition-colors placeholder-gray-600"
                                                        />
                                                    </div>

                                                    {error && (
                                                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
                                                            <AlertCircle size={14} className="text-red-500" />
                                                            <span className="text-xs font-bold text-red-500">{error}</span>
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={() => handleRedeem(game)}
                                                        disabled={!selectedPackage}
                                                        className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${selectedPackage
                                                            ? 'bg-[#2FE9A9] text-black hover:bg-[#00C6FF]'
                                                            : 'bg-white/5 text-gray-500 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        Redeem Now
                                                    </button>
                                                </div>

                                                {/* Right: Package Grid */}
                                                <div className="lg:col-span-2">
                                                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Select Package</h4>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                        {game.packages.map((pkg) => {
                                                            const isSelected = selectedPackage === pkg.id;
                                                            const affordable = userCredits >= pkg.credits;

                                                            return (
                                                                <div
                                                                    key={pkg.id}
                                                                    onClick={() => affordable && setSelectedPackage(pkg.id)}
                                                                    className={`relative cursor-pointer rounded-xl border transition-all p-3 ${isSelected
                                                                        ? 'bg-[#151921] border-[#2FE9A9] shadow-[0_0_0_1px_#2FE9A9]'
                                                                        : affordable
                                                                            ? 'bg-[#0B0E14] border-white/10 hover:border-white/20'
                                                                            : 'bg-[#0B0E14] border-white/5 opacity-40 cursor-not-allowed'
                                                                        }`}
                                                                >
                                                                    {pkg.bonus && (
                                                                        <div className="absolute top-2 right-2 bg-[#2FE9A9] text-black text-[8px] font-black uppercase px-1.5 py-0.5 rounded">
                                                                            {pkg.bonus}
                                                                        </div>
                                                                    )}

                                                                    <div className="flex items-center justify-between mb-2 mt-1">
                                                                        <span className="text-sm font-bold text-white">{pkg.amount}</span>
                                                                        {isSelected && <Check size={14} className="text-[#2FE9A9]" />}
                                                                    </div>

                                                                    <div className="flex items-center gap-1 text-[10px]">
                                                                        <Coins size={10} className={affordable ? 'text-[#2FE9A9]' : 'text-red-500'} />
                                                                        <span className={`font-bold ${affordable ? 'text-gray-400' : 'text-red-500'}`}>
                                                                            {pkg.credits} CR
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ExpandableCardContent>
                                </ExpandableCard>
                            </Expandable>
                        ))
                        }
                    </div>
                ) : (
                    /* 3. Product Grid (Regular Items) */
                    <div className="max-w-7xl mx-auto">
                        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-16">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative cursor-pointer"
                                    onClick={() => handleProductClick(item)}
                                    onMouseMove={(e) => {
                                        const card = e.currentTarget;
                                        const rect = card.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;

                                        const glare = card.querySelector('.glare-effect');
                                        if (glare) {
                                            gsap.to(glare, {
                                                x: x,
                                                y: y,
                                                duration: 0.1,
                                                opacity: 1
                                            });
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        const card = e.currentTarget;
                                        const glare = card.querySelector('.glare-effect');
                                        if (glare) {
                                            gsap.to(glare, { opacity: 0, duration: 0.5 });
                                        }
                                    }}
                                >
                                    {/* Card Container */}
                                    <div className={`relative bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] ${item.type === 'Currency' ? 'aspect-square' : 'aspect-[3/4]'}`}>


                                        {/* Mouse Spotlight/Glare Effect */}
                                        <div className="glare-effect absolute w-[300px] h-[300px] bg-white/10 blur-[50px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 z-10 mix-blend-overlay"></div>

                                        {/* Product Image */}
                                        {item.type === 'Currency' ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#151921] to-[#0B0E14] relative group-hover:bg-[#0B0E14] transition-colors duration-500">
                                                {/* Currency Glow Background */}
                                                <div className="absolute inset-0 bg-[#2FE9A9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-24 h-24 object-contain mb-4 drop-shadow-[0_0_15px_rgba(47,233,169,0.3)] transition-transform duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(47,233,169,0.5)]"
                                                />
                                                <div className="text-3xl font-black text-white uppercase tracking-tighter text-shadow-glow flex items-baseline gap-1">
                                                    <span>{item.title.replace(/\D/g, '')}</span>
                                                    <span className="text-[#2FE9A9] text-[10px] font-bold tracking-widest uppercase mb-1">Coins</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}


                                        {/* Liquid Glass Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-3 md:p-4 z-20">

                                            {/* Actions Slide Up */}
                                            <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col gap-2">

                                                {/* Price Display - ONLY CREDITS */}
                                                <div className="flex flex-col mb-1">
                                                    <div className="flex items-center justify-end">
                                                        <span className="text-white/90 font-bold text-sm md:text-base bg-[#2FE9A9]/20 backdrop-blur-sm px-3 py-1.5 rounded-md border border-[#2FE9A9]/30">
                                                            {item.priceCredits?.toLocaleString()} CR
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleProductClick(item);
                                                    }}
                                                    className="w-full py-2 md:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:border-white text-white font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                                                >
                                                    <Eye size={14} /> Preview
                                                </button>
                                                <button
                                                    onClick={(e) => handleQuickAdd(e, item)}
                                                    className="w-full py-2 md:py-2.5 bg-[#2FE9A9] text-black font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-lg hover:bg-[#25C890] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(47,233,169,0.4)] focus:outline-none focus:ring-2 focus:ring-[#2FE9A9]/50"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        {item.subtitle && (
                                            <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
                                                <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[9px] md:text-[10px] font-bold uppercase px-2 py-1 rounded-lg">
                                                    {item.subtitle}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Minimal Info Below */}
                                    <div className="mt-3 text-center px-1">
                                        <h3 className="font-semibold text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors truncate">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {filteredItems.length === 0 && activeFilter !== 'Redeem' && (
                    <div className="text-center py-20 px-4">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <Search size={32} className="text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                            <p className="text-gray-400 mb-6">
                                {searchQuery
                                    ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search.`
                                    : `No items available in this category right now.`
                                }
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveFilter('All Items');
                                }}
                                className="px-6 py-2.5 bg-[#2FE9A9] text-black font-bold text-sm uppercase tracking-wide rounded-lg hover:bg-[#25C890] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(47,233,169,0.4)]"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Action */}
                {filteredItems.length > 0 && activeFilter !== 'Redeem' && (
                    <div className="flex justify-center">
                        <button className="group px-8 py-3.5 bg-white/5 border border-white/10 hover:border-[#2FE9A9] hover:bg-white/10 rounded-full text-white font-bold uppercase text-sm tracking-widest transition-all duration-300 flex items-center gap-3 hover:shadow-[0_0_20px_rgba(47,233,169,0.2)]">
                            View Full Catalog
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                )}
            </div>

            <ProductQuickView
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section >
    );
};

export default Marketplace;
