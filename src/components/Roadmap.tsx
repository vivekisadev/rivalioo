
import { motion } from 'framer-motion';
import roadmapImg from '../assets/images/roadmap.png';
import { UserPlus, Swords, Gift, ArrowRight } from 'lucide-react';

const Roadmap = () => {
    const steps = [
        {
            icon: <UserPlus size={24} className="text-[#2FE9A9]" />,
            title: "REGISTER",
            desc: "Create your Rivalio account, set up your squad, and enter daily tournaments."
        },
        {
            icon: <Swords size={24} className="text-[#2FE9A9]" />,
            title: "COMPETE",
            desc: "Play Battle Royale or TDM matches. Aim for kills, earn Tickets daily, climb up Coins on the weekends."
        },
        {
            icon: <Gift size={24} className="text-[#2FE9A9]" />,
            title: "REDEEM",
            desc: "Use the Coins in the Rivalio Marketplace to unlock game gear, vouchers, and exclusive items."
        }
    ];

    return (
        <section className="py-32 bg-[#0E1117] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Text Content (Left) */}
                    <div>
                        <motion.h2
                            className="text-5xl lg:text-6xl font-display font-bold text-white uppercase mb-4 leading-[0.9]"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Your Roadmap<br />
                            To Rewards.
                        </motion.h2>
                        <p className="text-gray-400 mb-12 max-w-md text-sm leading-relaxed">
                            Compete daily, earn Tickets, climb the ranks, and turn your Coins into real rewards.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="bg-[#151921] border border-[#2FE9A9]/20 p-5 rounded hover:border-[#2FE9A9]/50 transition-all group flex flex-col items-start h-full"
                                >
                                    <div className="mb-4 bg-[#0B0E14] w-12 h-12 rounded flex items-center justify-center border border-[#2FE9A9]/30 group-hover:bg-[#2FE9A9]/10 transition-colors">
                                        {step.icon}
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">{step.title}</h4>
                                    <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="px-10 py-3 bg-[#FF5E3A] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-orange-900/20 clip-path-polygon">
                                Join Now
                            </button>
                            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-[#0B0E14] transition-all flex items-center gap-2 clip-path-polygon">
                                Learn More <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Character Image with Hexagon BG (Right) */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-[450px] h-[500px] flex items-center justify-center">
                            {/* The Blue Hexagon Glow */}
                            <div className="absolute w-[380px] h-[420px] border-4 border-[#00F0FF] shadow-[0_0_80px_rgba(0,240,255,0.15)] z-0"
                                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                            </div>

                            <motion.img
                                src={roadmapImg}
                                alt="Soldier"
                                className="relative z-10 w-full h-full object-contain grayscale-[20%] contrast-110"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Roadmap;
