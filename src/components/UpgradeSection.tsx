import { motion } from 'framer-motion';
import { Check, Star, Settings, Zap, Crown } from 'lucide-react';

interface PricingPlan {
    id: number;
    name: string;
    subtitle: string;
    price: string;
    multiplier: string;
    features: string[];
    icon: 'star' | 'settings' | 'zap' | 'crown';
    isPopular?: boolean;
}

const plans: PricingPlan[] = [
    {
        id: 1,
        name: 'Starter Plan',
        subtitle: 'Free Player Pack',
        price: '0',
        multiplier: '0.5x Coins',
        icon: 'star',
        features: [
            '2 match entries per day',
            'Base coin rewards — slower but steady progression',
            'Weekday events only',
            'Convert your coins to credits for marketplace items'
        ]
    },
    {
        id: 2,
        name: 'Rookie Plan',
        subtitle: 'Daily Progress Pack',
        price: '149',
        multiplier: '1x Coins',
        icon: 'settings',
        features: [
            '5 match entries per day',
            'Standard 1x coin rewards',
            'Access to Sunday tournaments',
            'Convert your coins to credits for marketplace items'
        ]
    },
    {
        id: 3,
        name: 'Pro Plan',
        subtitle: 'Competitive Boost Pack',
        price: '299',
        multiplier: '1.5x Coins',
        icon: 'zap',
        isPopular: true,
        features: [
            '10 match entries per day',
            '1.5x coin multiplier — 50% more coins every match',
            'Priority entry to tournaments',
            'Exclusive Sunday event access',
            'Faster Marketplace progression'
        ]
    },
    {
        id: 4,
        name: 'Legend Plan',
        subtitle: 'Apocalypse Conqueror Bundle',
        price: '499',
        multiplier: '2x Coins',
        icon: 'crown',
        features: [
            'Unlimited match entries per day',
            '2x coin multiplier — double rewards every match',
            'Early + priority access to all tournaments',
            'Premium Sunday events',
            'Fastest route to Marketplace items & Credits'
        ]
    }
];

const getIcon = (iconType: string) => {
    switch (iconType) {
        case 'star':
            return <Star size={20} className="text-white" />;
        case 'settings':
            return <Settings size={20} className="text-white" />;
        case 'zap':
            return <Zap size={20} className="text-white" fill="white" />;
        case 'crown':
            return <Crown size={20} className="text-white" />;
        default:
            return <Star size={20} className="text-white" />;
    }
};

const UpgradeSection = () => {
    return (
        <section className="py-24 bg-[#0B0E14] overflow-x-auto">
            <div className="container mx-auto px-6 min-w-[1000px] pb-24">
                {/* Header (Optional, keep if needed or remove if strictly matching image only showing cards) */}
                {/* <div className="mb-12 text-center"> ... </div> */}

                <div className="flex gap-6 justify-center items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative w-[280px] flex-shrink-0"
                            style={{
                                marginTop: `${index * 60}px` // Cascading effect: 0px, 60px, 120px, 180px
                            }}
                        >
                            {/* Card Container with custom clip-path */}
                            <div
                                className="relative bg-[#1a2228] h-full flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:-translate-y-2 transition-transform duration-300"
                                style={{
                                    // Looking at image: Top Right cut, Bottom Left cut.
                                    clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
                                }}
                            >
                                {/* Border Outline Simulation (since clip-path clips borders) 
                                    We can simulate border by using an inner div or box-shadow inset if not clipped. 
                                    With clip-path, standard border doesn't work well on the angled parts. 
                                    We'll use a pseudo-element approach or wrapper if possible, but for now simple background fits best.
                                    The image shows a thin cyan outline. 
                                */}
                                <div className="absolute inset-0 bg-[#00D9FF] -z-10" />
                                {/* Inner Card Content Background (slightly smaller to show border?) - Hard with clip-path parent.
                                    Instead, let's just use the dark bg and focus on content style. 
                                    The image has a border. Let's try to add a border via SVG or complex CSS, 
                                    but for now, a subtle border-top/bottom/right/left within the div might work visually.
                                */}
                                <div className="absolute inset-[1px] bg-[#12161C]" style={{
                                    clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
                                }}></div>

                                {/* Actual Content overlaying the background */}
                                <div className="relative z-10 px-6 pt-8 pb-10 flex flex-col h-full text-center">

                                    {/* Icon Top */}
                                    <div className="mx-auto mb-4">
                                        {getIcon(plan.icon)}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[#00D9FF] text-xl font-bold font-display uppercase tracking-wider mb-1">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-400 text-[10px] mb-6 font-medium">
                                        {plan.subtitle}
                                    </p>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-[#00D9FF]/20 mb-6"></div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <span className="text-2xl font-bold text-white">₹{plan.price}</span>
                                        <span className="text-gray-500 text-xs ml-1">/mo</span>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-[#00D9FF]/20 mb-6"></div>

                                    {/* Multiplier */}
                                    <div className="mb-6">
                                        <p className="text-white text-xs font-medium">Reward Multiplier: {plan.multiplier}</p>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-8 text-left pl-2">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <Check size={12} className="text-[#00D9FF] mt-1 flex-shrink-0" />
                                                <span className="text-gray-400 text-[10px] leading-relaxed">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Button */}
                                    <button
                                        className="mt-auto w-full py-3 bg-gradient-to-r from-[#FF5E3A] to-[#FF8C61] text-[#0B0E14] font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,94,58,0.4)]"
                                        style={{
                                            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                                        }}
                                    >
                                        Buy Plan
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpgradeSection;
