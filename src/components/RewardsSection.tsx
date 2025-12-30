import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
    'Exclusive tournament access',
    'Premium gear discounts up to 50%',
    'Priority matchmaking queue',
    'Custom profile badges & themes',
    'Monthly bonus coin rewards',
    'VIP community Discord access',
    'Early access to new features',
    'Dedicated 24/7 support team'
];

const RewardsSection = () => {
    return (
        <section className="space-y-4">
            {/* Header */}
            <div className="border-b border-gray-800 pb-3">
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-1">
                    Rewards
                </h2>
                <p className="text-gray-500 text-xs">
                    Unlock premium benefits and exclusive perks
                </p>
            </div>

            {/* Rewards Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-[#1a1f2e] via-[#1f2433] to-[#1a1f2e] rounded-xl overflow-hidden border border-gray-800/50 p-8 md:p-10"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>

                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Side - Pricing */}
                    <div className="space-y-6">
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-[#00D9FF] text-xs font-bold uppercase tracking-wider mb-4">
                                Premium Membership
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-6xl font-display font-bold text-white">$99</span>
                                <span className="text-2xl text-gray-400">/mo</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Get access to all premium features, exclusive tournaments, and special rewards
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full md:w-auto px-10 py-3.5 bg-gradient-to-r from-[#00D9FF] to-[#00B8D4] hover:from-[#00B8D4] hover:to-[#00D9FF] text-[#0B0E14] font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#00D9FF]/20 hover:shadow-[#00D9FF]/40 rounded-lg relative overflow-hidden group">
                            <span className="relative z-10">Choose Plan</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                        </button>

                        {/* Trust Badge */}
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <Check size={16} className="text-green-500" />
                                <span>Cancel anytime</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                                <Check size={16} className="text-green-500" />
                                <span>No hidden fees</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Features */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide mb-5">
                            What's Included
                        </h3>
                        <div className="grid gap-2.5">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-3 bg-[#0B0E14]/40 backdrop-blur-sm border border-gray-800/50 rounded-lg hover:border-[#00D9FF]/30 transition-colors group"
                                >
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center group-hover:bg-[#00D9FF]/20 transition-colors">
                                        <Check size={12} className="text-[#00D9FF]" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-300 text-sm font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default RewardsSection;
