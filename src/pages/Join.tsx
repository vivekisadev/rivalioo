import { ArrowRight, Briefcase } from 'lucide-react';

const Join = () => {
    const roles = [
        { title: "Senior Frontend Engineer", type: "Full-Time", location: "Remote", dept: "Engineering" },
        { title: "Product Designer", type: "Full-Time", location: "New York, NY", dept: "Design" },
        { title: "Marketing Specialist", type: "Contract", location: "Remote", dept: "Marketing" },
        { title: "Tournament Organizer", type: "Full-Time", location: "London, UK", dept: "Operations" },
    ];

    return (
        <div className="min-h-screen bg-[#0B0E14] pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
                        <Briefcase size={16} className="text-[#2FE9A9]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">We Are Hiring</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
                        Build The Future of <br className="hidden md:block" /> Esports With Us
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join a passionate team of gamers, engineers, and creators building the next generation of competitive gaming tools.
                    </p>
                </div>

                <div className="space-y-4">
                    {roles.map((role, i) => (
                        <div key={i} className="group bg-[#13161C] border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#2FE9A9]/50 transition-all cursor-pointer">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#2FE9A9] transition-colors">{role.title}</h3>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500 font-medium">
                                    <span>{role.dept}</span>
                                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                    <span>{role.location}</span>
                                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                    <span>{role.type}</span>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/5 transition-all group-hover:bg-[#2FE9A9] group-hover:text-[#0B0E14] group-hover:border-[#2FE9A9]">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-12 bg-gradient-to-br from-[#1A1E26] to-[#0B0E14] rounded-3xl border border-white/5 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Don't see your role?</h3>
                    <p className="text-gray-400 mb-8">We are always looking for talented individuals. Send us your resume.</p>
                    <a href="mailto:careers@rivalioo.com" className="inline-flex items-center gap-2 text-[#2FE9A9] font-bold uppercase tracking-wider hover:underline">
                        careers@rivalioo.com <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Join;
