import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Shield } from 'lucide-react';

const plans = [
    {
        name: "Starter Plan",
        subtext: "Free Player Pack",
        price: "0",
        period: "/mo",
        multiplier: "0.5x Coins",
        icon: Star,
        color: "text-[#00D9FF]",
        borderColor: "group-hover:border-[#00D9FF]",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]",
        buttonGradient: "none",
        features: [
            "2 match entries per day",
            "Base coin rewards — slower but steady progression",
            "Weekday events only",
            "Convert your coins to credits for marketplace items"
        ]
    },
    {
        name: "Rookie Plan",
        subtext: "Daily Progress Pack",
        price: "149",
        period: "/mo",
        multiplier: "1x Coins",
        icon: Shield,
        color: "text-[#2FE9A9]",
        borderColor: "group-hover:border-[#2FE9A9]",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(47,233,169,0.3)]",
        buttonGradient: "bg-gradient-to-r from-[#2FE9A9] to-[#25D99B]",
        features: [
            "5 match entries per day",
            "Standard 1x coin rewards",
            "Access to Sunday tournaments",
            "Convert your coins to credits for marketplace items"
        ]
    },
    {
        name: "Pro Plan",
        subtext: "Competitive Boost Pack",
        price: "299",
        period: "/mo",
        multiplier: "1.5x Coins",
        icon: Zap,
        color: "text-[#FF5E3A]",
        borderColor: "group-hover:border-[#FF5E3A]",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(255,94,58,0.3)]",
        buttonGradient: "bg-gradient-to-r from-[#FF5E3A] to-[#E04F2F]",
        features: [
            "10 match entries per day",
            "1.5x coin multiplier — 50% more coins every match",
            "Priority entry to tournaments",
            "Exclusive Sunday event access",
            "Faster Marketplace progression"
        ]
    },
    {
        name: "Legend Plan",
        subtext: "Apocalypse Conqueror Bundle",
        price: "499",
        period: "/mo",
        multiplier: "2x Coins",
        icon: Crown,
        color: "text-[#FFD700]",
        borderColor: "group-hover:border-[#FFD700]",
        glowColor: "group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
        buttonGradient: "bg-gradient-to-r from-[#FFD700] to-[#E6C200]",
        features: [
            "Unlimited match entries per day",
            "2x coin multiplier — double rewards every match",
            "Early + priority access to all tournaments",
            "Premium Sunday events",
            "Fastest route to Marketplace items & Credits"
        ]
    }
];

const SubscriptionPlans = () => {
    return (
        <section className="py-24 bg-[#0B0E14] relative overflow-hidden">
            {/* Background Glows similar to Landing Page */}
            <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#2FE9A9]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#FF5E3A]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black uppercase text-white mb-4 font-oswald tracking-wide"
                    >
                        Subscription <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE9A9] to-[#00D2FF]">Plans</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Choose your tier and unlock your potential. Upgrade for more matches, higher multipliers, and exclusive access.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group bg-[#151921] border border-white/5 p-1 transition-all duration-300 ${plan.borderColor}`}
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
                                    <plan.icon className={`w-8 h-8 mb-3 ${plan.color}`} strokeWidth={1.5} />
                                    <h3 className={`font-oswald font-bold uppercase tracking-wider text-xl mb-1 ${plan.color === 'text-cyan-400' ? 'text-cyan-400' : 'text-white'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{plan.subtext}</p>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-white/10 mb-6" />

                                {/* Price */}
                                <div className="flex items-baseline justify-center mb-2">
                                    <span className="text-xl font-bold text-white mr-1">₹</span>
                                    <span className="text-4xl font-black text-white font-oswald">{plan.price}</span>
                                    <span className="text-sm text-gray-500 font-medium">{plan.period}</span>
                                </div>

                                {/* Multiplier Highlight */}
                                <div className="text-sm font-bold text-white mb-8 text-center">
                                    Reward Multiplier: <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">{plan.multiplier}</span>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8 flex-grow w-full">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex gap-3 text-left">
                                            <Check className="w-4 h-4 text-[#2FE9A9] mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-gray-400 leading-tight">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                {plan.buttonGradient !== 'none' ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 rounded text-black font-oswald font-bold uppercase tracking-widest text-sm shadow-lg ${plan.buttonGradient}`}
                                        style={{
                                            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                                        }}
                                    >
                                        Buy Plan
                                    </motion.button>
                                ) : null}
                            </div>

                            {/* Glow Effect on Hover */}
                            <div className={`absolute inset-0 bg-transparent transition-shadow duration-300 pointer-events-none ${plan.glowColor}`} style={{ zIndex: -1 }} />

                            {/* Decorative Lines similar to image details if needed */}
                            <div className={`absolute top-0 left-0 w-8 h-8 border-t border-l ${plan.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b border-r ${plan.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SubscriptionPlans;
