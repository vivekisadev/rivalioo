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
        { name: 'Careers', path: '/join' } // Added Careers explicitly
    ];

    return (
        <footer className="bg-[#0B0E14] py-20 text-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-28">

                    {/* LEFT SIDE: Logo & Input & FAQ */}
                    <div className="flex flex-col gap-16 lg:w-1/3 pt-4">
                        {/* Logo */}
                        <div className="w-64">
                            <img src={logoFull} alt="RIVALIO" className="w-full h-auto object-contain" />
                        </div>

                        {/* Email Input */}
                        <div className="w-full max-w-sm">
                            <div className="flex items-center border-b border-gray-800 pb-2">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-transparent w-full outline-none text-[#2FE9A9] placeholder-[#2FE9A9]/50 font-medium tracking-wide text-lg"
                                />
                                <button className="bg-[#FF5E3A] hover:bg-[#FF4520] transition-colors text-black text-sm font-bold uppercase px-6 py-3 flex items-center gap-2 rounded-sm">
                                    Send <ArrowRight size={18} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="w-full max-w-md">
                            <h4 className="text-sm font-bold uppercase text-gray-500 mb-4 tracking-widest">FAQ</h4>
                            <Accordion type="single" collapsible className="w-full">
                                {[
                                    {
                                        title: 'What is Rivalioo?',
                                        content:
                                            'Rivalioo is a platform for competitive mobile game tournaments.',
                                    },
                                    {
                                        title: 'How is it different from other tournament platforms?',
                                        content:
                                            'Rivalioo provides a unique experience by allowing players to create and join tournaments, and by providing a platform for players to showcase their skills.',
                                    },
                                    {
                                        title: 'Is Rivalioo free to use?',
                                        content:
                                            'Yes! Rivalioo does have a free tier.',
                                    },
                                ].map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index + 1}`} className="border-white/5">
                                        <AccordionTrigger className="text-white hover:text-[#2FE9A9] py-4 text-base">{item.title}</AccordionTrigger>
                                        <AccordionContent className="text-gray-400 text-sm leading-relaxed">
                                            {item.content}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Navigation Panel */}
                    <div className="lg:w-2/3 w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl relative p-16 pr-24 overflow-hidden">
                        {/* Green Corner Glow */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#2FE9A9] blur-[60px] opacity-40 pointer-events-none"></div>

                        {/* Top Right Corner Dark Cut/Shadow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#1A1D24] to-transparent opacity-50 pointer-events-none"></div>

                        <div className="grid grid-cols-2 gap-12 relative z-10">

                            {/* Column 1: Main Links */}
                            <div className="flex flex-col gap-2 pr-12">
                                {footerLinks.map((item) => (
                                    <Link key={item.name} to={item.path} className="text-gray-300 hover:text-[#2FE9A9] hover:pl-2 transition-all duration-300 text-lg font-medium py-2">
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Column 2: Socials & Private */}
                            <div className="flex flex-col justify-between border-l border-white/5 pl-12 -my-2 py-2">
                                {/* Socials */}
                                <div className="flex flex-col gap-6">
                                    <a href="#" className="flex items-center gap-4 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Twitch size={24} /> <span className="text-base font-medium">Twitch</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Instagram size={24} /> <span className="text-base font-medium">Instagram</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 text-white hover:text-[#2FE9A9] transition-colors">
                                        <XIcon size={24} /> <span className="text-base font-medium">X (Twitter)</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-4 text-white hover:text-[#2FE9A9] transition-colors">
                                        <Youtube size={24} /> <span className="text-base font-medium">Youtube</span>
                                    </a>
                                </div>


                                {/* Legal & Copyright */}
                                <div className="flex flex-col gap-4 mt-12 md:mt-0">
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-base font-medium">Contact Us</a>
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-base font-medium">Privacy Policy</a>
                                    <a href="#" className="text-gray-400 hover:text-[#2FE9A9] transition-colors text-base font-medium">Terms & Conditions</a>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-row items-center gap-3">
                                        <img src={logoFull} alt="RIVALLIO" className="h-6 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                                        <p className="text-gray-500 text-sm font-medium">
                                            &copy; {new Date().getFullYear()} RIVALIO. All rights reserved.
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
