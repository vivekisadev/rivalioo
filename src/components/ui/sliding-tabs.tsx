import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = {
    id: string;
    label: string;
    content: React.ReactNode;
};

interface SlidingTabsProps {
    tabs: Tab[];
    defaultTab?: string;
    className?: string;
}

export default function SlidingTabs({ tabs, defaultTab, className = "" }: SlidingTabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

    return (
        <div className={`flex flex-col w-full ${className}`}>
            <div className="flex space-x-1 rounded-xl bg-white/10 p-1 border border-white/5 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${activeTab === tab.id ? "" : "hover:text-white"
                            } relative rounded-lg px-3 py-2.5 text-sm font-medium outline-sky-400 transition focus-visible:outline-2 flex-1 text-center`}
                        style={{
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="bubble"
                                className="absolute inset-0 z-10 bg-[#2FE9A9] rounded-lg shadow-sm"
                                style={{ borderRadius: 8 }}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {/* Ensure text is above the background */}
                        <span className={`relative z-20 ${activeTab === tab.id ? "text-black font-bold" : "text-gray-300"}`}>
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="relative w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        {tabs.find(t => t.id === activeTab)?.content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
