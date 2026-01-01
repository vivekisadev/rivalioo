import { Shield, Target, Users, Globe, ChevronRight } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-transparent pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Hero */}
                <div className="text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-6">
                        The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FE9A9] to-[#00C4CC]">Competition</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Rivalioo is the premier destination for competitive gaming. We provide the infrastructure for players to compete, earn, and rise to glory.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {[
                        { label: "Active Players", value: "250K+", icon: Users },
                        { label: "Prize Pool Paid", value: "$2.5M+", icon: Target },
                        { label: "Countries", value: "45+", icon: Globe },
                        { label: "Tournaments", value: "10K+", icon: Shield }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#13161C] border border-white/5 p-8 rounded-3xl text-center group hover:border-[#2FE9A9]/30 transition-all">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#2FE9A9]">
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 rounded-full bg-[#2FE9A9]/10 text-[#2FE9A9] text-xs font-bold uppercase tracking-widest mb-4">
                            Our Mission
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase">
                            Empowering Gamers Worldwide
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            We believe every gamer deserves a chance to compete like a pro. Whether you're a casual player looking for a challenge or an aspiring professional, Rivalioo provides the stage for you to showcase your skills.
                        </p>
                        <ul className="space-y-4">
                            {['Fair Play Guarantee', 'Instant Payouts', 'Global Leaderboards'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-white font-medium">
                                    <div className="w-6 h-6 rounded-full bg-[#2FE9A9] flex items-center justify-center text-black">
                                        <ChevronRight size={14} strokeWidth={3} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#2FE9A9]/20 blur-3xl -z-10 rounded-full"></div>
                        <img
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                            className="rounded-3xl border border-white/10 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500 grayscale hover:grayscale-0"
                            alt="Mission"
                        />
                    </div>
                </div>

                {/* Values */}
                <div className="bg-[#13161C] border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FE9A9] to-transparent"></div>
                    <h2 className="text-3xl font-display font-bold text-white uppercase mb-8">Join The Revolution</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                        Start your journey today. Join thousands of players competing for glory and rewards.
                    </p>
                    <button className="px-10 py-4 bg-[#FF5E3A] hover:bg-orange-600 text-white font-bold uppercase tracking-wide rounded-xl shadow-lg shadow-orange-900/20 transition-all hover:scale-105">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;
