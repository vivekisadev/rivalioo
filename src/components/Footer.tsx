import { Instagram, Youtube, Twitter as XIcon, Twitch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoFull from '../assets/images/logo_full.png';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion';

const Footer = () => {
    const footerLinks = [
        { name: 'About', path: '/about' },
        { name: 'Tournaments', path: '/tournaments' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Shop', path: '/shop' },
        { name: 'Community', path: '/community' },
        { name: 'Stream', path: '/live' },
        { name: 'Blog', path: '#' },
        { name: 'Help Center', path: '#' },
        { name: 'Careers', path: '/join' }
    ];

    return (
        <footer className="bg-transparent mt-32 py-8 md:py-12 text-white relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                {/* Mobile Layout (< 768px) */}
                <div className="md:hidden flex flex-col gap-6">
                    {/* Logo */}
                    <div className="w-32">
                        <img src={logoFull} alt="RIVALIO" className="w-full h-auto object-contain" />
                    </div>

                    {/* Email Input - Compact */}
                    <div className="w-full">
                        <div className="flex items-center gap-2 border border-white/10 rounded-lg p-2 bg-white/5">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                            />
                            <button className="bg-[#2FE9A9] hover:bg-[#25C890] transition-colors text-black text-xs font-bold uppercase px-3 py-2 rounded-md flex items-center gap-1 flex-shrink-0">
                                <ArrowRight size={14} className="stroke-[3px]" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links - Compact Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {footerLinks.slice(0, 6).map((item) => (
                            <Link key={item.name} to={item.path} className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-sm">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Socials - Horizontal */}
                    <div className="flex items-center gap-4 pt-2">
                        <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors">
                            <Twitch size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors">
                            <XIcon size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors">
                            <Youtube size={20} />
                        </a>
                    </div>

                    {/* Copyright - Compact */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} RIVALIO. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Tablet Layout (768px - 1023px) */}
                <div className="hidden md:flex lg:hidden flex-col gap-8">
                    {/* Logo */}
                    <div className="w-40">
                        <img src={logoFull} alt="RIVALIO" className="w-full h-auto object-contain" />
                    </div>

                    {/* Email + FAQ Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Email Input */}
                        <div className="w-full">
                            <div className="flex items-center border-b border-gray-800 pb-1">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-transparent w-full outline-none text-[#2FE9A9] placeholder-[#2FE9A9]/50 font-medium tracking-wide text-base"
                                />
                                <button className="bg-[#FF5E3A] hover:bg-[#FF4520] transition-colors text-black text-xs font-bold uppercase px-4 py-2 flex items-center gap-2 rounded-sm">
                                    Send <ArrowRight size={14} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="w-full">
                            <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">FAQ</h4>
                            <Accordion type="single" collapsible className="w-full">
                                {[
                                    {
                                        title: 'What is Rivalioo?',
                                        content: 'Rivalioo is a platform for competitive mobile game tournaments.',
                                    },
                                    {
                                        title: 'How is it different?',
                                        content: 'Rivalioo provides a unique experience by allowing players to create and join tournaments.',
                                    },
                                    {
                                        title: 'Is it free?',
                                        content: 'Yes! Rivalioo does have a free tier.',
                                    },
                                ].map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index + 1}`} className="border-white/5">
                                        <AccordionTrigger className="text-white hover:text-[#2FE9A9] py-2 text-sm">{item.title}</AccordionTrigger>
                                        <AccordionContent className="text-gray-400 text-xs leading-relaxed pb-2">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* Navigation Panel */}
                    <div className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl relative p-6 overflow-hidden">
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2FE9A9] blur-[50px] opacity-30 pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            {/* Column 1: Main Links */}
                            <div className="flex flex-col gap-1">
                                {footerLinks.map((item) => (
                                    <Link key={item.name} to={item.path} className="text-gray-300 hover:text-[#2FE9A9] hover:pl-2 transition-all duration-300 text-sm font-medium py-1.5">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Column 2: Socials & Legal */}
                            <div className="flex flex-col justify-between border-l border-white/5 pl-6">
                                {/* Socials */}
                                <div className="flex flex-col gap-3">
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Twitch size={18} /> <span className="text-sm font-medium">Twitch</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Instagram size={18} /> <span className="text-sm font-medium">Instagram</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <XIcon size={18} /> <span className="text-sm font-medium">X (Twitter)</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Youtube size={18} /> <span className="text-sm font-medium">Youtube</span>
                                    </a>
                                </div>

                                {/* Legal */}
                                <div className="flex flex-col gap-2 mt-6">
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-xs font-medium">Privacy Policy</a>
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-xs font-medium">Terms & Conditions</a>
                                    <p className="text-gray-500 text-[10px] mt-2 pt-2 border-t border-white/5">
                                        © {new Date().getFullYear()} RIVALIO.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (>= 1024px) - Original */}
                <div className="hidden lg:flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
                    {/* LEFT SIDE: Logo & Input & FAQ */}
                    <div className="flex flex-col gap-10 lg:w-1/3 pt-2">
                        {/* Logo */}
                        <div className="w-48">
                            <img src={logoFull} alt="RIVALIO" className="w-full h-auto object-contain" />
                        </div>

                        {/* Email Input */}
                        <div className="w-full max-w-sm">
                            <div className="flex items-center border-b border-gray-800 pb-1">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-transparent w-full outline-none text-[#2FE9A9] placeholder-[#2FE9A9]/50 font-medium tracking-wide text-base"
                                />
                                <button className="bg-[#FF5E3A] hover:bg-[#FF4520] transition-colors text-black text-xs font-bold uppercase px-4 py-2 flex items-center gap-2 rounded-sm">
                                    Send <ArrowRight size={14} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="w-full max-w-md">
                            <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">FAQ</h4>
                            <Accordion type="single" collapsible className="w-full">
                                {[
                                    {
                                        title: 'What is Rivalioo?',
                                        content: 'Rivalioo is a platform for competitive mobile game tournaments.',
                                    },
                                    {
                                        title: 'How is it different from other tournament platforms?',
                                        content: 'Rivalioo provides a unique experience by allowing players to create and join tournaments, and by providing a platform for players to showcase their skills.',
                                    },
                                    {
                                        title: 'Is Rivalioo free to use?',
                                        content: 'Yes! Rivalioo does have a free tier.',
                                    },
                                ].map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index + 1}`} className="border-white/5">
                                        <AccordionTrigger className="text-white hover:text-[#2FE9A9] py-2 text-sm">{item.title}</AccordionTrigger>
                                        <AccordionContent className="text-gray-400 text-xs leading-relaxed pb-2">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Navigation Panel */}
                    <div className="lg:w-2/3 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl relative p-8 pr-12 overflow-hidden">
                        {/* Green Corner Glow */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2FE9A9] blur-[50px] opacity-30 pointer-events-none"></div>

                        {/* Top Right Corner Dark Cut/Shadow Effect */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#1A1D24] to-transparent opacity-50 pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            {/* Column 1: Main Links */}
                            <div className="flex flex-col gap-1 pr-8">
                                {footerLinks.map((item) => (
                                    <Link key={item.name} to={item.path} className="text-gray-300 hover:text-[#2FE9A9] hover:pl-2 transition-all duration-300 text-sm font-medium py-1.5">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Column 2: Socials & Private */}
                            <div className="flex flex-col justify-between border-l border-white/5 pl-8 -my-2 py-2">
                                {/* Socials */}
                                <div className="flex flex-col gap-4">
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Twitch size={18} /> <span className="text-sm font-medium">Twitch</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Instagram size={18} /> <span className="text-sm font-medium">Instagram</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <XIcon size={18} /> <span className="text-sm font-medium">X (Twitter)</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-3 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Youtube size={18} /> <span className="text-sm font-medium">Youtube</span>
                                    </a>
                                </div>

                                {/* Legal & Copyright */}
                                <div className="flex flex-col gap-2 mt-8 md:mt-0">
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-xs font-medium">Contact Us</a>
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-xs font-medium">Privacy Policy</a>
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-xs font-medium">Terms & Conditions</a>

                                    <div className="mt-2 pt-2 border-t border-white/5 flex flex-row items-center gap-2">
                                        <img src={logoFull} alt="RIVALLIO" className="h-4 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                                        <p className="text-gray-500 text-[10px] font-medium">
                                            &copy; {new Date().getFullYear()} RIVALIO.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
