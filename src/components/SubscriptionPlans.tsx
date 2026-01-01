import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';
import { getSubscriptionTiers } from '../services/subscriptionService';

// Icon mapping for different plan types
const iconMap: Record<string, any> = {
    'starter-plan': Star,
    'bronze-plan': Shield,
    'silver-plan': Zap,
    'gold-plan': Crown
};

// Gradient mapping for different plan types
const gradientMap: Record<string, string> = {
    'starter-plan': 'none',
    'bronze-plan': 'bg-gradient-to-r from-[#CD7F32] to-[#A0522D]',
    'silver-plan': 'bg-gradient-to-r from-[#E0E0E0] to-[#B0B0B0]',
    'gold-plan': 'bg-gradient-to-r from-[#FFD700] to-[#DAA520]'
};

// Fallback plans (used if database fetch fails)
const fallbackPlans = [
    {
        id: 'fallback-starter',
        name: "Starter Plan",
        slug: "starter-plan",
        description: "Free Player Pack",
        weekly_price_inr: 0,
        monthly_price_inr: 0,
        coin_multiplier: "0.5x Coins",
        theme_color: "#00D9FF",
        features: [
            "2 match entries per day",
            "Base coin rewards — slower but steady progression",
            "Weekday events only",
            "Convert your coins to credits for marketplace items"
        ]
    },
    {
        id: 'fallback-bronze',
        name: "Bronze Plan",
        slug: "bronze-plan",
        description: "Daily Progress Pack",
        weekly_price_inr: 49,
        monthly_price_inr: 149,
        coin_multiplier: "1x Coins",
        theme_color: "#CD7F32",
        features: [
            "5 match entries per day",
            "Standard 1x coin rewards",
            "Access to Sunday tournaments",
            "Convert your coins to credits for marketplace items"
        ]
    },
    {
        id: 'fallback-silver',
        name: "Silver Plan",
        slug: "silver-plan",
        description: "Competitive Boost Pack",
        weekly_price_inr: 99,
        monthly_price_inr: 249,
        coin_multiplier: "1.5x Coins",
        theme_color: "#E0E0E0",
        features: [
            "10 match entries per day",
            "1.5x coin multiplier — 50% more coins every match",
            "Priority entry to tournaments",
            "Exclusive Sunday event access",
            "Faster Marketplace progression"
        ]
    },
    {
        id: 'fallback-gold',
        name: "Gold Plan",
        slug: "gold-plan",
        description: "Apocalypse Conqueror Bundle",
        weekly_price_inr: 149,
        monthly_price_inr: 349,
        coin_multiplier: "2x Coins",
        theme_color: "#FFD700",
        features: [
            "Unlimited match entries per day",
            "2x coin multiplier — double rewards every match",
            "Early + priority access to all tournaments",
            "Premium Sunday events",
            "Fastest route to Marketplace items & Credits"
        ]
    }
];

const SubscriptionPlans = ({ title = "Subscription Plans", subtitle = "Choose your tier and unlock your potential. Upgrade for more matches, higher multipliers, and exclusive access." }: { title?: React.ReactNode, subtitle?: string }) => {
    const [billingCycle, setBillingCycle] = useState<'weekly' | 'monthly'>('monthly');
    const [plans, setPlans] = useState<any[]>(fallbackPlans);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const tiers = await getSubscriptionTiers();
                if (tiers && tiers.length > 0) {
                    setPlans(tiers);
                } else {
                    console.log('No tiers from database, using fallback plans');
                    setPlans(fallbackPlans);
                }
            } catch (error) {
                console.error('Error fetching subscription tiers:', error);
                setPlans(fallbackPlans);
            }
        };

        fetchPlans();
    }, []);

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Glows similar to Landing Page */}
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#2FE9A9]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#FF5E3A]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase text-white mb-4 font-oswald tracking-wide"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* Billing Toggle - Smooth Sliding */}


                {/* Re-implementing Toggle with proper framer-motion shared layout */}
                <div className="flex justify-center mb-16">
                    <div className="bg-[#151921] p-1.5 rounded-full flex items-center border border-white/5 relative isolate">
                        <button
                            onClick={() => setBillingCycle('weekly')}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors z-10 ${billingCycle === 'weekly' ? 'text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {billingCycle === 'weekly' && (
                                <motion.div
                                    layoutId="billingIndicator"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg -z-10"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            Weekly
                        </button>
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors z-10 flex items-center gap-2 ${billingCycle === 'monthly' ? 'text-black' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {billingCycle === 'monthly' && (
                                <motion.div
                                    layoutId="billingIndicator"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg -z-10"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            Monthly <span className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${billingCycle === 'monthly' ? 'bg-[#2FE9A9] text-black' : 'bg-[#2FE9A9]/20 text-[#2FE9A9]'}`}>save 20%</span>
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
                    {plans && Array.isArray(plans) && plans.map((plan: any, index: number) => {
                        // Safety checks for plan properties
                        if (!plan) return null;

                        const currentPrice = billingCycle === 'monthly'
                            ? (plan.monthly_price_inr ?? 0)
                            : (plan.weekly_price_inr ?? 0);
                        const period = billingCycle === 'monthly' ? '/mo' : '/wk';
                        const isFree = currentPrice === 0;
                        const PlanIcon = (plan.slug && iconMap[plan.slug]) || Star;
                        const buttonGradient = (plan.slug && gradientMap[plan.slug]) || 'bg-gradient-to-r from-gray-600 to-gray-800';
                        const borderColor = plan.theme_color ? `group-hover:border-[${plan.theme_color}]` : 'group-hover:border-white/20';

                        return (
                            <motion.div
                                key={plan.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group bg-[#151921] border border-white/5 p-1 transition-all duration-300 ${borderColor}`}
                                style={{
                                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                                }}
                            >
                                {/* Inner Card Content */}
                                <div
                                    className="bg-[#0B0E14] w-full p-6 flex flex-col items-center relative z-10"
                                    style={{
                                        clipPath: 'polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)'
                                    }}
                                >
                                    {/* Header Icon & Title */}
                                    <div className="mb-6 flex flex-col items-center text-center">
                                        <PlanIcon className={`w-8 h-8 mb-3`} strokeWidth={1.5} style={{ color: plan.theme_color }} />
                                        <h3 className="font-oswald font-bold uppercase tracking-wider text-xl mb-1 text-white">
                                            {plan.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{plan.description}</p>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-white/10 mb-6" />

                                    {/* Price */}
                                    <div className="flex items-baseline justify-center mb-2 h-10">
                                        {isFree ? (
                                            <span className="text-4xl font-black font-oswald uppercase tracking-wide" style={{ color: plan.theme_color }}>FREE</span>
                                        ) : (
                                            <>
                                                <span className="text-xl font-bold text-white mr-1">₹</span>
                                                <span className="text-4xl font-black text-white font-oswald">
                                                    {currentPrice}
                                                </span>
                                                <span className="text-sm text-gray-500 font-medium">{period}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Multiplier */}
                                    <p className="text-sm font-semibold mb-6" style={{ color: plan.theme_color }}>
                                        {plan.coin_multiplier}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 w-full">
                                        {plan.features && Array.isArray(plan.features) && plan.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-left">
                                                <Check className="w-4 h-4 text-[#2FE9A9] mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-400 leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Button */}
                                    {!isFree ? (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-3 rounded text-black font-oswald font-bold uppercase tracking-widest text-sm ${buttonGradient}`}
                                            style={{
                                                boxShadow: `0 0 20px ${plan.theme_color}40`
                                            }}
                                        >
                                            Buy Plan
                                        </motion.button>
                                    ) : null}
                                </div>

                                {/* Glow Effect (Always Visible slightly, brighter on hover) */}
                                <div
                                    className="absolute inset-0 bg-transparent transition-shadow duration-300 pointer-events-none"
                                    style={{
                                        zIndex: -1,
                                        opacity: 0.3,
                                        boxShadow: plan.theme_color ? `0 0 40px ${plan.theme_color}20` : 'none'
                                    }}
                                />
                                {/* Stronger hover glow */}
                                <div
                                    className="absolute inset-0 bg-transparent transition-shadow duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                                    style={{
                                        zIndex: -1,
                                        boxShadow: plan.theme_color ? `0 0 60px ${plan.theme_color}40` : 'none'
                                    }}
                                />

                                {/* Decorative Lines similar to image details if needed */}
                                <div
                                    className="absolute top-0 left-0 w-8 h-8 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: plan.theme_color || 'rgba(255,255,255,0.2)' }}
                                />
                                <div
                                    className="absolute bottom-0 right-0 w-8 h-8 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ borderColor: plan.theme_color || 'rgba(255,255,255,0.2)' }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SubscriptionPlans;
