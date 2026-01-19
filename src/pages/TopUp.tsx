import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, CreditCard, Zap } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsHighlight, TabsHighlightItem, TabsHighlightProvider } from '../components/ui/animatetabs';

const TopUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'credits' | 'tickets'>('credits');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [playerId, setPlayerId] = useState('');
    const region = 'Global';
    const [error, setError] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get('type');
        if (type === 'tickets') setActiveTab('tickets');
        else setActiveTab('credits');
    }, [location]);

    // Credits Packages (Bought with Real Money - INR)
    const creditPackages = [
        {
            id: 'c1',
            title: 'Starter Pack',
            price: '₹99',
            priceMoney: 99,
            type: 'Credits',
            image: new URL('../assets/images/coins.png', import.meta.url).href,
            value: '500 CR',
            credits: 500
        },
        {
            id: 'c2',
            title: 'Popular Pack',
            price: '₹449',
            priceMoney: 449,
            type: 'Credits',
            image: new URL('../assets/images/coins.png', import.meta.url).href,
            value: '2,500 CR',
            credits: 2500,
            bonus: '+100 Bonus'
        },
        {
            id: 'c3',
            title: 'Pro Gamer Pack',
            price: '₹899',
            priceMoney: 899,
            type: 'Credits',
            image: new URL('../assets/images/coins.png', import.meta.url).href,
            value: '5,500 CR',
            credits: 5500,
            bonus: '+300 Bonus'
        },
        {
            id: 'c4',
            title: 'Ultimate Vault',
            price: '₹1,799',
            priceMoney: 1799,
            type: 'Credits',
            image: new URL('../assets/images/coins.png', import.meta.url).href,
            value: '12,000 CR',
            credits: 12000,
            bonus: '+800 Bonus'
        },
    ];

    // Ticket Packages (Bought with Credits)
    const ticketPackages = [
        {
            id: 't1',
            title: 'Daily Ticket',
            price: '50 CR',
            priceCredits: 50,
            type: 'Tickets',
            image: new URL('../assets/images/ticket-f.png', import.meta.url).href,
            value: 'Daily Events',
            description: 'Access to Daily Tournaments'
        },
        {
            id: 't2',
            title: 'Credit Storm Ticket',
            price: '150 CR',
            priceCredits: 150,
            type: 'Tickets',
            image: new URL('../assets/images/ticket-f.png', import.meta.url).href,
            value: 'Storm Events',
            description: 'Access to Credit Storm Tournaments'
        },
        {
            id: 't3',
            title: 'Premium Rush Ticket',
            price: '300 CR',
            priceCredits: 300,
            type: 'Tickets',
            image: new URL('../assets/images/ticket-f.png', import.meta.url).href,
            value: 'Rush Events',
            description: 'Access to Premium Rush Tournaments'
        },
    ];

    const displayedItems = activeTab === 'credits' ? creditPackages : ticketPackages;

    const handleCheckout = () => {
        if (!selectedItem) return;
        if (!playerId.trim()) {
            setError('Please enter Player ID');
            const input = document.getElementById('playerIdInput');
            input?.focus();
            return;
        }
        setError('');
        navigate('/checkout', { state: { item: selectedItem } });
    };

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 md:px-8 font-sans overflow-x-hidden selection:bg-[#2FE9A9] selection:text-black">

            <div className="max-w-7xl mx-auto">

                {/* Header Title */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-[#2FE9A9]/10 p-1 rounded">
                                <Zap size={14} className="text-[#2FE9A9]" />
                            </div>
                            <span className="text-[#2FE9A9] font-bold uppercase tracking-wider text-xs">Instant Delivery</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold uppercase text-white italic tracking-tighter leading-none mb-2">
                            Top Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE9A9] to-[#00C6FF]">Centre</span>
                        </h1>
                        <p className="text-gray-400 font-medium max-w-lg">
                            Securely purchase credits and tickets. Delivered instantly to your in-game account.
                        </p>
                    </div>

                    {/* Animated Toggle - Matching AuthPage Style */}
                    <div className="w-full max-w-md">
                        <TabsHighlightProvider value={activeTab} defaultValue={activeTab}>
                            <Tabs
                                value={activeTab}
                                onValueChange={(value: string) => setActiveTab(value as 'credits' | 'tickets')}
                                className="w-full"
                            >
                                <TabsHighlight className="relative">
                                    <TabsList className="h-14 inline-flex p-1.5 bg-[#0B0E14]/60 backdrop-blur-xl w-full rounded-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                                        <TabsHighlightItem value="credits" className="flex-1">
                                            <TabsTrigger
                                                value="credits"
                                                className="h-full px-6 py-3 w-full text-sm font-extrabold"
                                            >
                                                Credits
                                            </TabsTrigger>
                                        </TabsHighlightItem>
                                        <TabsHighlightItem
                                            value="tickets"
                                            className="flex-1"
                                            highlightColor="from-[#FF5E3A] to-[#FF8C3A]"
                                            shadowColor="rgba(255,94,58,0.3)"
                                        >
                                            <TabsTrigger
                                                value="tickets"
                                                className="h-full px-6 py-3 w-full text-sm font-extrabold"
                                            >
                                                Tickets
                                            </TabsTrigger>
                                        </TabsHighlightItem>
                                    </TabsList>
                                </TabsHighlight>
                            </Tabs>
                        </TabsHighlightProvider>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Items Grid */}
                    <div className="lg:col-span-8">

                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            Select Top-Up Amount
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {displayedItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedItem(item)}
                                    className={`relative cursor-pointer rounded-xl border transition-all duration-200 flex items-center justify-between p-4 pl-6 group ${selectedItem?.id === item.id
                                        ? 'bg-[#151921] border-[#2FE9A9] shadow-[0_0_0_1px_#2FE9A9]'
                                        : 'bg-[#0B0E14] border-white/10 hover:border-white/20 hover:bg-[#111]'
                                        }`}
                                >

                                    <div className="flex items-center gap-4">
                                        {/* Simple Checkbox Indicator */}
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedItem?.id === item.id
                                            ? 'bg-[#2FE9A9] border-[#2FE9A9]'
                                            : 'border-white/20 group-hover:border-white/40'
                                            }`}>
                                            {selectedItem?.id === item.id && <Check size={12} className="text-black" strokeWidth={4} />}
                                        </div>

                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${selectedItem?.id === item.id ? 'text-white' : 'text-gray-300'}`}>
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-gray-500 font-bold">{item.value || '1 Unit'}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <div className={`text-lg font-bold italic tracking-tight ${selectedItem?.id === item.id ? 'text-[#2FE9A9]' : 'text-white'}`}>
                                            {item.price}
                                        </div>
                                        {/* Fake discount strikethrough for visual match */}
                                        <div className="text-[10px] text-gray-600 line-through font-medium">
                                            {/* Calculating a fake slightly higher price for effect */}
                                            {item.price.replace('$', '$ ')} USD
                                        </div>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Reference Style) */}
                    <div className="lg:col-span-4 relative h-full">
                        <div className="sticky top-28 space-y-6">

                            {/* 1. Order Information Card */}
                            <div className="bg-[#151921] rounded-2xl border border-white/10 p-6">
                                <h3 className="text-white font-bold text-sm mb-4">Order Information</h3>

                                <div className={`bg-[#0B0E14] rounded-xl border transition-colors relative ${error ? 'border-red-500' : 'border-white/10 focus-within:border-white/30'}`}>
                                    <label className="absolute left-4 top-3 text-[10px] uppercase font-bold text-gray-500 tracking-wider">Player ID</label>
                                    <input
                                        id="playerIdInput"
                                        type="text"
                                        value={playerId}
                                        onChange={(e) => {
                                            setPlayerId(e.target.value);
                                            if (e.target.value) setError('');
                                        }}
                                        className="w-full bg-transparent border-none px-4 pt-7 pb-3 text-white font-bold text-sm w-full focus:ring-0 placeholder-gray-600 font-mono"
                                        placeholder="Enter Player ID"
                                    />
                                </div>
                                {error && <p className="text-red-500 text-xs font-bold mt-2 pl-1 flex items-center gap-1"><Lock size={12} /> {error}</p>}

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
                                        Region: <span className="text-white">{region}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Total & Payment Card */}
                            <div className="bg-[#151921] rounded-2xl border border-white/10 p-6 relative overflow-hidden">
                                {selectedItem && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#2FE9A9]"></div>
                                )}

                                <div className="flex justify-between items-end mb-8">
                                    <h3 className="text-xl font-bold text-white">Total</h3>
                                    <div className="text-right">
                                        <div className="text-2xl font-black italic text-[#2FE9A9] tracking-tighter">
                                            {selectedItem?.price || '$0.00'}
                                        </div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Includes Tax</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm transition-all shadow-lg ${selectedItem
                                            ? 'bg-[#2FE9A9] text-black hover:bg-[#00C6FF] hover:shadow-[#00C6FF]/20'
                                            : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <CreditCard size={18} /> Buy Now
                                    </button>

                                    <button
                                        onClick={handleCheckout}
                                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm transition-all border ${selectedItem
                                            ? 'bg-[#0070BA] border-[#0070BA] text-white hover:bg-[#005ea6]'
                                            : 'bg-transparent border-white/10 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className="flex items-center gap-1">
                                            <span className="font-serif italic font-black text-lg leading-none">Pay</span>
                                            <span className="font-serif italic font-black text-lg leading-none text-[#00CF92]">Pal</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-2">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${false ? 'bg-white' : 'border-white/20'}`}>
                                        {/* Checkbox state mock */}
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-bold">Save for future Purchase</span>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopUp;
