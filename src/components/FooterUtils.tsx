
import { Twitter, Instagram, Twitch, Youtube, ArrowRight, Copy, Trophy, Plus } from 'lucide-react';

const Community = () => {
    return (
        <section className="bg-[#0B0E14] py-20 pb-0">
            {/* Join The Squad Banner */}
            <div className="container mx-auto px-6 mb-24">
                <div className="relative bg-[#151921] overflow-hidden rounded-none flex flex-col md:flex-row items-center border-l-4 border-rival-cyan">
                    {/* Text Side */}
                    <div className="flex-1 p-10 z-10">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white uppercase mb-4 tracking-wide">Join The Squad</h2>
                        <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
                            We are recruiting elite operatives and engineers. Future of esports, Frontend Sharpshooters, Backend Architects - Report to duty.
                        </p>
                        <button className="px-8 py-3 bg-[#FF5E3A] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm rounded transition-all flex items-center gap-2 w-fit">
                            Register Now <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Image Side (Represented by team photo) */}
                    <div className="w-full md:w-1/2 h-64 md:h-80 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#151921] to-transparent z-10"></div>
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover grayscale opacity-50 contrast-125" />
                    </div>
                </div>
            </div>

            {/* Squad Up & Earn */}
            <div className="bg-[#0E1117] border-y border-gray-800 py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-display font-bold text-white uppercase mb-4">Squad Up & Earn</h2>
                            <p className="text-gray-400 mb-6 text-sm">Grow the squad. Earn coins every time someone joins through you.</p>

                            <div className="space-y-2">
                                <p className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-rival-cyan rounded-full"></span>
                                    Share your code with a friend.
                                </p>
                                <p className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-rival-cyan rounded-full"></span>
                                    They sign up and finish their first match.
                                </p>
                                <p className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="w-1.5 h-1.5 bg-rival-cyan rounded-full"></span>
                                    You earn 100 Coins instantly in your wallet.
                                </p>
                            </div>
                        </div>

                        {/* Rewards Graphics */}
                        <div className="flex items-center gap-8 md:gap-16 bg-[#151921] px-12 py-8 rounded-xl border border-gray-800 relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-rival-cyan/5 blur-xl"></div>

                            <div className="text-center group">
                                <div className="w-12 h-12 mx-auto mb-3 bg-[#0B0E14] rounded-full flex items-center justify-center border border-gray-700 text-rival-cyan group-hover:scale-110 transition-transform">
                                    {/* Coin Icon approximation */}
                                    <div className="w-6 h-6 rounded-full border-4 border-current"></div>
                                </div>
                                <div className="text-2xl font-bold text-white">100 Coins</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Per Refer</div>
                            </div>

                            <Plus className="text-gray-700" size={32} />

                            <div className="text-center group">
                                <div className="w-12 h-12 mx-auto mb-3 bg-[#0B0E14] rounded-full flex items-center justify-center border border-gray-700 text-white group-hover:scale-110 transition-transform">
                                    <Trophy size={20} />
                                </div>
                                <div className="text-2xl font-bold text-white">Bonus</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Top Referrer</div>
                            </div>
                        </div>

                        <button className="bg-[#FF5E3A] hover:bg-orange-600 px-8 py-3 rounded text-white font-bold uppercase text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20">
                            Copy Code <Copy size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Footer = () => {
    return (
        <footer className="bg-[#0B0E14] pt-24 pb-12 text-white">
            <div className="container mx-auto px-6">

                {/* CTA */}
                <div className="text-center mb-20 border-b border-gray-800 pb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-4 tracking-wide">Ready To Start Winning?</h2>
                    <p className="text-gray-500 mb-10 text-sm">Join thousands of gamers earning real rewards through competitive matches.</p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="px-8 py-3 bg-[#2FE9A9] text-[#0B0E14] font-bold uppercase tracking-wider text-sm rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(47,233,169,0.3)]">
                            Create Free Account
                        </button>
                        <button className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold uppercase tracking-wider text-sm rounded hover:border-white transition-colors flex items-center gap-2">
                            Learn More <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded bg-gradient-to-tr from-rival-cyan to-blue-600 flex items-center justify-center text-rival-dark font-bold font-display text-sm">R</div>
                            <span className="text-xl font-display font-bold tracking-wider text-white">RIVALIO</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed mb-8 max-w-xs">
                            Esports starts here. Compete in tournaments, earn rewards, and rise to the top of the leaderboard.
                        </p>
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Join Our Newsletter</span>
                            <div className="flex items-center border-b border-gray-700 py-2 max-w-xs">
                                <input type="email" placeholder="Email" className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-700" />
                                <button className="text-gray-500 hover:text-white transition-colors"><ArrowRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8 md:pl-20">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-6 tracking-widest">About</h4>
                            <ul className="space-y-4 text-xs text-gray-500 font-medium">
                                <li><a href="#" className="hover:text-white transition-colors">Tournaments</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-6 tracking-widest">Social</h4>
                            <ul className="space-y-4 text-xs text-gray-500 font-medium">
                                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Twitch size={14} /> Twitch</a></li>
                                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={14} /> Instagram</a></li>
                                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Twitter size={14} /> Twitter</a></li>
                                <li><a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Youtube size={14} /> Youtube</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-6 tracking-widest">Legal</h4>
                            <ul className="space-y-4 text-xs text-gray-500 font-medium">
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-gray-900 text-[10px] text-gray-700 flex justify-between items-center">
                    <p>&copy; 2025 Rivalio Inc. All rights reserved.</p>
                    <p>Designed for Gamers.</p>
                </div>
            </div>
        </footer>
    );
};

export { Community, Footer };
