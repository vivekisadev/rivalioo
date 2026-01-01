import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell, Smartphone, LogOut, Save } from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = React.useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'connections', label: 'Connections', icon: Smartphone },
    ];

    return (
        <div className="pt-24 min-h-screen bg-[#0B0E14] pb-20 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FE9A9]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="mb-10">
                    <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wide mb-2">Settings</h1>
                    <p className="text-gray-400 text-sm">Manage your account preferences and settings.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-[#13161C] rounded-2xl border border-white/5 p-2 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                                        ${activeTab === tab.id
                                            ? 'bg-[#2FE9A9] text-[#0B0E14] shadow-lg'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                    `}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <button className="mt-8 w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm uppercase py-3 rounded-xl hover:bg-red-500/10 transition-colors border border-dashed border-red-500/30">
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#13161C] border border-white/5 rounded-2xl p-8"
                        >
                            {activeTab === 'general' && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full border-2 border-[#2FE9A9] p-1">
                                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&h=150" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <button className="absolute bottom-0 right-0 bg-[#2FE9A9] text-black p-1.5 rounded-full border border-[#0B0E14] shadow-lg">
                                                <Settings size={14} />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">Change Avatar</h3>
                                            <p className="text-gray-500 text-xs mb-3">PNG, JPG or GIF. Max 2MB.</p>
                                            <button className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs text-white font-bold uppercase transition-colors">Upload New</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold uppercase">Display Name</label>
                                            <input type="text" defaultValue="Vivek Gamer" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#2FE9A9] focus:outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold uppercase">Username</label>
                                            <input type="text" defaultValue="@vivek_g" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#2FE9A9] focus:outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold uppercase">Email Address</label>
                                            <input type="email" defaultValue="vivek@example.com" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#2FE9A9] focus:outline-none transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-gray-500 font-bold uppercase">Bio</label>
                                            <input type="text" defaultValue="Pro Gamer & Tournament Winner" className="w-full bg-[#0B0E14] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-[#2FE9A9] focus:outline-none transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Placeholders for other tabs for brevity, but structure implies they go here */}
                            {activeTab !== 'general' && (
                                <div className="text-center py-20 text-gray-500">
                                    <Settings size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Settings for {activeTab} coming soon.</p>
                                </div>
                            )}

                            {/* Save Button Footer */}
                            {activeTab === 'general' && (
                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                                    <button className="flex items-center gap-2 px-6 py-2 bg-[#2FE9A9] text-[#0B0E14] font-bold uppercase text-sm rounded hover:bg-[#25C48D] transition-colors shadow-lg">
                                        <Save size={16} /> Save Changes
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
