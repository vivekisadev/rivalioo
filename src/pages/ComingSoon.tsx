import { useState } from 'react';
import { motion } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/Accordion';
import { Instagram, Twitter, Youtube, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import Tooltip from '../components/Tooltip';

// Assets
import bgImage from '../assets/images/hero-bg-2.png';
import logoFull from '../assets/images/logo_full.png';

interface ComingSoonProps {
    title?: string;
    subtitle?: string;
    showCountdown?: boolean;
    children?: React.ReactNode;
}

const ComingSoon = ({
    title = "COMING SOON",
    subtitle = "We're building something legendary. Get ready to dominate.",
    children
}: ComingSoonProps) => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setIsSubmitting(true);
            // Simulate brief processing for UX
            await new Promise(resolve => setTimeout(resolve, 800));

            // Navigate to register with email state
            // navigate('/register', { state: { email: email } });
            alert("Registration is currently closed for maintenance.");
            setIsSubmitting(false);
        }
    };

    const socials = [
        { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/rivalioo/', tooltip: 'Follow our Insta handle' },
        { name: 'Twitter', icon: Twitter, url: 'https://x.com/rivalioo', tooltip: 'Follow our Twitter handle' },
        { name: 'Discord', icon: MessageSquare, url: 'https://discord.gg/rivalioo', tooltip: 'Join the community server' },
        { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@Zephyrgaminglive', tooltip: 'Watch gameplay & tutorials' },
    ];

    return (
        <div className="relative min-h-screen w-full font-sans text-white">

            {/* Background Page Content (If Children Exist) */}
            {children && (
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden filter blur-sm">
                    {children}
                </div>
            )}

            {/* Main Overlay Container */}
            <div className={`relative z-10 min-h-screen w-full flex flex-col pt-24 lg:pt-20 ${children ? 'bg-black/60 backdrop-blur-md' : 'bg-[#0B0E14]'}`}>

                {/* Background Pattern (Only if no children) */}
                {!children && (
                    <div className="absolute inset-0 z-0">
                        <img src={bgImage} alt="Bg" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0E14_120%)]"></div>
                    </div>
                )}

                {/* MAIN CONTENT (Split Layout) */}
                <div className="flex-1 w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center">



                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start lg:items-center pb-20">

                        {/* LEFT COLUMN: Hero & Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="flex flex-col items-center lg:items-start text-center lg:text-left"
                        >
                            {/* Status Badge */}
                            <Tooltip text="System Status: Online & Stable" position="right">
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#13161C]/80 border border-white/5 mb-8 backdrop-blur-md shadow-2xl group cursor-default hover:border-[#2FE9A9]/30 transition-colors">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FE9A9] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2FE9A9]"></span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2FE9A9] text-shadow-sm group-hover:text-white transition-colors">{title}</span>
                                </div>
                            </Tooltip>

                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-oswald font-bold leading-[0.9] tracking-tight uppercase mb-6 drop-shadow-2xl">
                                <span className="text-white">{title} PAGE</span><br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#2FE9A9] via-emerald-400 to-emerald-900">IS LOCKED</span>
                            </h1>

                            <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed max-w-lg font-medium border-l-2 border-[#2FE9A9]/20 pl-4 lg:pl-0 lg:border-l-0">
                                {subtitle}
                            </p>

                            {/* Premium Email Form */}
                            <div className="w-full max-w-md relative group mb-8">
                                <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#2FE9A9]/30 to-blue-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000 ${focused ? 'opacity-100 duration-200' : ''}`}></div>

                                <form
                                    onSubmit={handleSubscribe}
                                    className={`relative flex items-center bg-[#0B0E14] backdrop-blur-xl rounded-xl border transition-all duration-300 ${focused
                                        ? 'border-[#2FE9A9] shadow-[0_0_20px_rgba(47,233,169,0.1)]'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <Mail
                                        className={`absolute left-5 transition-colors duration-300 ${focused ? 'text-[#2FE9A9]' : 'text-gray-600'}`}
                                        size={20}
                                    />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        disabled={isSubmitting}
                                        placeholder="ENTER YOUR EMAIL"
                                        className="w-full bg-transparent border-none py-5 pl-14 pr-32 text-sm font-bold text-white placeholder-gray-700/50 focus:ring-0 focus:outline-none uppercase tracking-wider disabled:opacity-50"
                                    />
                                    <div className="absolute right-0 top-0 bottom-0 flex h-full p-1">
                                        <Tooltip text="Join the priority waitlist" position="bottom">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`h-full px-8 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${isSubmitting
                                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                    : 'bg-[#2FE9A9] text-black hover:shadow-[0_0_20px_rgba(47,233,169,0.5)] hover:brightness-110'
                                                    }`}
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                ) : (
                                                    <>
                                                        <span className="hidden sm:inline">SEND</span>
                                                        <ArrowRight size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </Tooltip>
                                    </div>
                                </form>
                            </div>

                            {/* Discord Call-to-Action */}
                            <div className="flex items-center gap-6 mt-6">
                                <a
                                    href="https://discord.gg/rivalioo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex items-center gap-4 px-8 py-4 bg-[#5865F2]/10 border border-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] rounded-2xl transition-all duration-500 group overflow-hidden hover:shadow-[0_0_40px_rgba(88,101,242,0.4)] hover:-translate-y-1"
                                >
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

                                    <MessageSquare size={24} className="transition-transform group-hover:scale-110 group-hover:rotate-12" />
                                    <div className="flex flex-col items-start leading-none relative z-20">
                                        <span className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-0.5">Community</span>
                                        <span className="font-display text-xl tracking-wide">JOIN DISCORD</span>
                                    </div>
                                    <ArrowRight size={18} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </a>


                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: FAQ & Socials */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                            className="flex flex-col items-center lg:items-end w-full"
                        >
                            {/* FAQ ACCORDION */}
                            <div className="w-full max-w-md mb-10 text-left">
                                <h4 className="flex items-center gap-3 text-xs font-bold uppercase text-[#2FE9A9] mb-6 tracking-widest px-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2FE9A9] animate-pulse"></span>
                                    Platform Intel (FAQ)
                                </h4>
                                <Accordion type="single" collapsible className="w-full space-y-3">
                                    {[
                                        {
                                            title: 'What is Rivalioo?',
                                            content:
                                                'Rivalioo is the ultimate competitive platform for mobile gamers. We host daily automated tournaments for games like BGMI, Free Fire, and COD Mobile with real prize pools.',
                                        },
                                        {
                                            title: 'How do I win prizes?',
                                            content:
                                                'Simply join a tournament, compete in your favorite mobile games, and rank high on the leaderboard. Winnings are automatically credited to your secure wallet.',
                                        },
                                        {
                                            title: 'Is it free to play?',
                                            content:
                                                'Yes! We host free daily scrims and community cups. We also offer high-stakes premium tournaments for those looking to compete at a professional level.',
                                        },
                                    ].map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            value={`item-${index + 1}`}
                                            className="border border-white/5 bg-[#13161C]/50 rounded-xl overflow-hidden transition-all duration-300 data-[state=open]:border-[#2FE9A9]/30 data-[state=open]:shadow-[0_0_20px_rgba(47,233,169,0.05)]"
                                        >
                                            <AccordionTrigger className="px-5 py-4 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest hover:no-underline text-left transition-colors data-[state=open]:text-[#2FE9A9]">
                                                {item.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="px-5 pb-5 text-gray-400 text-xs leading-relaxed">
                                                {item.content}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>

                            {/* Social Icons (Aligned with Accordion) */}
                            <div className="w-full max-w-md flex justify-start gap-4">
                                {socials.map((social) => (
                                    <Tooltip key={social.name} text={social.tooltip} position="top">
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-[#2FE9A9] hover:scale-110 transition-all duration-300 bg-[#13161C]/80 p-3 rounded-full border border-white/5 hover:border-[#2FE9A9]/30 block"
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    </Tooltip>
                                ))}
                            </div>

                        </motion.div>

                    </div>
                </div>

                {/* Copyright Footer */}
                <div className="relative z-20 w-full py-6 flex flex-row items-center justify-center gap-4 text-gray-800 text-[10px] uppercase font-bold tracking-widest mt-auto mb-4">
                    <img src={logoFull} alt="RIVALIOO" className="h-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
                    <span>© 2026 Rivalioo. All rights reserved.</span>
                </div>

            </div>
        </div>
    );
};

export default ComingSoon;
