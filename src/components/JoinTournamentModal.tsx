import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface JoinTournamentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onJoin?: (ingameId: string, ingameName: string) => Promise<{ success: boolean; error?: string }>;
    tournamentId: number; // In real DB this might be UUID
    gameName: string; // e.g. "BGMI", "Free-Fire"
    tournamentTitle: string;
}

const JoinTournamentModal = ({ isOpen, onClose, onJoin, gameName, tournamentTitle }: JoinTournamentModalProps) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [checkingProfile, setCheckingProfile] = useState(false);

    // Form State
    const [ingameId, setIngameId] = useState('');
    const [ingameName, setIngameName] = useState('');

    // Status
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Fetch existing profile when modal opens
    useEffect(() => {
        if (isOpen && user) {
            fetchLinkedProfile();
        }
    }, [isOpen, user, gameName]);

    const fetchLinkedProfile = async () => {
        setCheckingProfile(true);
        if (!supabase) {
            setCheckingProfile(false);
            return;
        }
        try {
            // 1. Find the game ID from our DB based on the passed gameName
            // Note: In a real app, tournamentId would linked to a game_id directly
            // For this mock, we try to match the string

            // Normalize game name for search
            let searchName = gameName.toLowerCase();
            if (searchName === 'free-fire') searchName = 'free_fire';

            const { data: gameData } = await supabase
                .from('games')
                .select('id')
                .ilike('short_name', `%${searchName}%`)
                .single();

            if (gameData && user) {
                // 2. Fetch linked account
                const { data: linkedData } = await supabase
                    .from('linked_game_accounts')
                    .select('in_game_id, in_game_username')
                    .eq('user_id', user.id)
                    .eq('game_id', gameData.id)
                    .single();

                if (linkedData) {
                    setIngameId(linkedData.in_game_id);
                    setIngameName(linkedData.in_game_username);
                }
            }
        } catch (error) {
            console.error("Error fetching profile", error);
        } finally {
            setCheckingProfile(false);
        }
    };

    const handleJoin = async () => {
        if (!user) {
            setStatus('error');
            setMessage('You must be logged in to join.');
            return;
        }

        if (!supabase) {
            setStatus('error');
            setMessage('Database not initialized');
            return;
        }

        if (!ingameId || !ingameName) {
            setStatus('error');
            setMessage('Please fill in your In-Game details.');
            return;
        }

        setLoading(true);
        setStatus('idle');

        try {
            // In a real implementation, we would insert into 'event_registrations'
            // For this demo with mock tournaments, we'll simulate the DB call or 
            // insert into a real table if we had a real event ID.

            // However, your request specifically asked to SAVE these details for the tournament.
            // Since our tournament IDs are mocks (1, 2, 3), we can't key constraint them to a real UUID event table.

            // PLAN: We will:
            // 1. Upsert the "Linked Account" so it serves as a "Save for later" feature.
            // 2. Show a success message.

            // First, find the game ID again
            let searchName = gameName.toLowerCase();
            if (searchName === 'free-fire') searchName = 'free_fire';

            const { data: gameData } = await supabase
                .from('games')
                .select('id')
                .ilike('short_name', `%${searchName}%`)
                .single();

            if (gameData) {
                // Update the "Saved" profile for future
                const { error: upsertError } = await supabase
                    .from('linked_game_accounts')
                    .upsert({
                        user_id: user.id,
                        game_id: gameData.id,
                        in_game_id: ingameId,
                        in_game_username: ingameName
                    }, { onConflict: 'user_id, game_id' }); // Correct syntax for Supabase upsert constraints

                if (upsertError) throw upsertError;
            }



            // Real Join logic via parent callback
            if (onJoin) {
                const result = await onJoin(ingameId, ingameName);
                if (!result.success) {
                    throw new Error(result.error);
                }
            } else {
                // Determine if we need to simulate
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            setStatus('success');
            setMessage(`Successfully joined ${tournamentTitle}!`);

            // Close after delay
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 2000);

        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Failed to join tournament');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[#151921] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-[#1A1D26]">
                            <h3 className="text-xl font-bold text-white mb-1">Join Tournament</h3>
                            <p className="text-sm text-gray-400">Enter your details for <span className="text-[#2FE9A9]">{gameName}</span></p>
                            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-6">
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-[#2FE9A9]/20 rounded-full flex items-center justify-center text-[#2FE9A9] mb-2">
                                        <Check size={32} strokeWidth={3} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white">Joined Successfully!</h4>
                                    <p className="text-gray-400 text-sm">You are now registered for this tournament.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Game ID Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">In-Game ID (UID)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={ingameId}
                                                onChange={(e) => setIngameId(e.target.value)}
                                                placeholder="e.g. 512345678"
                                                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2FE9A9] transition-colors font-mono"
                                            />
                                            {checkingProfile && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <Loader2 size={16} className="text-[#2FE9A9] animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Username Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">In-Game Username (IGN)</label>
                                        <input
                                            type="text"
                                            value={ingameName}
                                            onChange={(e) => setIngameName(e.target.value)}
                                            placeholder="e.g. Killer_007"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#2FE9A9] transition-colors"
                                        />
                                    </div>

                                    {/* Info Note */}
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3">
                                        <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-blue-200 leading-relaxed">
                                            These details will be used for this tournament. Verifying incorrect details may lead to disqualification.
                                        </p>
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <div className="text-red-400 text-sm text-center font-medium bg-red-500/10 p-2 rounded">
                                            {message}
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        onClick={handleJoin}
                                        disabled={loading}
                                        className="w-full py-4 bg-[#2FE9A9] hover:bg-[#25C48D] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0E14] font-black uppercase tracking-widest text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Confirm Joining'}
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default JoinTournamentModal;
