import { motion } from 'framer-motion';
import { Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: "Starter Plan",
            subtitle: "Free Player Pack",
            price: "₹0",
            period: "/mo",
            icon: <Star size={20} />,
            features: [
                "Reward Multiplier: 0.5x Coins",
                "2 match entries per day",
                "Base coin rewards — slower but steady progression",
                "Weekday events only",
                "Convert your coins to credits for marketplace items"
            ],
            accent: "border-gray-700",
            btnColor: "bg-transparent border-2 border-gray-600 hover:bg-gray-800 text-white"
        },
        {
            name: "Rookie Plan",
            subtitle: "Daily Progress Pack",
            price: "₹149",
            period: "/mo",
            icon: <Zap size={20} />,
            features: [
                "Reward Multiplier: 1x Coins",
                "5 match entries per day",
                "Standard coin rewards",
                "Access to Sunday tournaments",
                "Convert your coins to credits for marketplace items"
            ],
            accent: "border-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.1)]",
            btnColor: "bg-[#FF5E3A] hover:bg-orange-600 text-white"
        },
        {
            name: "Pro Plan",
            subtitle: "Emerald Boost Pack",
            price: "₹299",
            period: "/mo",
            icon: <Zap size={20} />,
            features: [
                "Reward Multiplier: 1.5x Coins",
                "10 match entries per day",
                "1.5x coin multiplier — more coins every match",
                "Priority entry to tournaments",
                "Exclusive Sunday event access",
                "Faster Marketplace progression"
            ],
            accent: "border-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.1)]",
            btnColor: "bg-[#FF5E3A] hover:bg-orange-600 text-white"
        },
        {
            name: "Legend Plan",
            subtitle: "Apocalypse Conquest Bundle",
            price: "₹499",
            period: "/mo",
            icon: <Crown size={20} />,
            features: [
                "Reward Multiplier: 2x Coins",
                "Unlimited match entries per day",
                "2x coin multiplier — double rewards every match",
                "Early + priority access to all tournaments",
                "Premium Sunday events",
                "Fastest route to Marketplace items & Credits"
            ],
            accent: "border-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.1)]",
            btnColor: "bg-[#FF5E3A] hover:bg-orange-600 text-white"
        }
    ];

    return (
        <section className="py-24 bg-[#0E1117] relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-4">Subscription Plans</h2>
                    <p className="text-gray-400 text-sm">Explore Our Pricing Options Tailored to Your Gameplay Goals and Preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-[#0B0E14] p-6 relative border ${plan.accent} border-l-4 hover:transform hover:-translate-y-2 transition-all duration-300`}
                            style={{ clipPath: 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}
                        >
                            {/* Icon */}
                            <div className="mb-4 flex justify-center">
                                <div className="text-gray-400">
                                    {plan.icon}
                                </div>
                            </div>

                            {/* Plan Name */}
                            <div className="mb-6 text-center border-b border-gray-800 pb-4">
                                <h3 className="text-xl font-bold text-[#2FE9A9] mb-1">{plan.name}</h3>
                                <p className="text-xs text-gray-500">{plan.subtitle}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6 text-center">
                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                <span className="text-gray-400 text-sm">{plan.period}</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 text-left min-h-[180px]">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                                        <svg className="w-4 h-4 text-[#2FE9A9] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            <button
                                className={`w-full py-3 font-bold uppercase text-xs tracking-widest transition-all ${plan.btnColor}`}
                                style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
                            >
                                Buy Plan
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
