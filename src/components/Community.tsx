import { ArrowRight, Plus, Trophy } from 'lucide-react';

const Community = () => {
    return (
        <section className="bg-[#0B0E14] py-20 pb-0">
            {/* Join The Squad Banner */}
            <div className="container mx-auto px-6 mb-24">
                <div className="relative bg-[#151921] overflow-hidden flex flex-col md:flex-row items-center border-l-4 border-[#2FE9A9]">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 h-64 md:h-80 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#151921] z-10"></div>
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover grayscale opacity-50 contrast-125" />
                    </div>

                    {/* Text Side */}
                    <div className="flex-1 p-10 z-10">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white uppercase mb-4 tracking-wide">Join The Squad</h2>
                        <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
                            We are recruiting elite operatives to engineer the future of esports. Frontend Engineers, Backend Architects, and Visual Ops—Report for duty.
                        </p>
                        <button className="px-8 py-3 bg-[#FF5E3A] hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 w-fit shadow-lg shadow-orange-900/20 clip-path-polygon">
                            Register Now <ArrowRight size={16} />
                        </button>
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

                            <div className="space-y-2 mb-8">
                                <p className="text-sm text-gray-400">
                                    <span className="font-bold text-white">How It Works:</span>
                                </p>
                                <p className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="text-white">1.</span>
                                    Share your code with a friend.
                                </p>
                                <p className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="text-white">2.</span>
                                    They sign up and finish their first match.
                                </p>
                                <p className="flex items-start gap-3 text-sm text-gray-400">
                                    <span className="text-white">3.</span>
                                    You earn 100 Coins instantly in your wallet.
                                </p>
                            </div>
                        </div>

                        {/* Rewards Graphics */}
                        <div className="flex items-center gap-8 md:gap-16 bg-[#151921] px-12 py-10 rounded-xl border border-gray-800 relative">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#2FE9A9]/5 blur-xl"></div>

                            <div className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-3 bg-[#0B0E14] rounded-full flex items-center justify-center border border-gray-700 text-white group-hover:scale-110 transition-transform">
                                    <div className="w-8 h-8 rounded-full border-4 border-[#FF5E3A]"></div>
                                </div>
                                <div className="text-2xl font-bold text-white">100 Coins</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Per Refer</div>
                            </div>

                            <Plus className="text-gray-700" size={32} />

                            <div className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-3 bg-[#0B0E14] rounded-full flex items-center justify-center border border-gray-700 text-[#2FE9A9] group-hover:scale-110 transition-transform">
                                    <Trophy size={24} />
                                </div>
                                <div className="text-2xl font-bold text-white">Bonus Rewards</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Top Referrer</div>
                            </div>
                        </div>

                        <button className="bg-[#FF5E3A] hover:bg-orange-600 px-8 py-3 text-white font-bold uppercase text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20 clip-path-polygon">
                            Copy Code <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export { Community };
