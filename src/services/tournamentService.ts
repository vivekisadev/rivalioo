import { supabase } from '../lib/supabase';

export interface Tournament {
    id: number;
    title: string;
    game: string;
    map: string;
    description: string;
    image_url: string;
    entry_fee: number;
    prize_pool: number;
    status: string;
    max_participants: number;
    current_participants: number;
    start_date: string;
    start_time: string;
    organizer_name: string;
}

/**
 * Fetch a single tournament by ID
 */
export const getTournamentById = async (id: string | number): Promise<Tournament | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching tournament:', error);
        return null;
    }

    return data;
};

/**
 * Join a tournament safely using atomic DB transaction
 */
export const joinTournament = async (
    userId: string,
    tournamentId: number,
    entryFee: number,
    inGameId: string,
    inGameName: string
): Promise<{ success: boolean; newBalance?: number; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { data, error } = await supabase
        .rpc('join_tournament_atomic', {
            p_user_id: userId,
            p_tournament_id: tournamentId,
            p_entry_fee: entryFee,
            p_in_game_id: inGameId,
            p_in_game_name: inGameName
        });

    if (error) {
        console.error('Error joining tournament:', error);
        return { success: false, error: error.message };
    }

    if (data && !data.success) {
        return { success: false, error: data.error };
    }

    return { success: true, newBalance: data.new_balance };
};

/**
 * Get all tournaments - Using direct REST API to bypass client timeout issues
 */
export const getAllTournaments = async (): Promise<Tournament[]> => {
    console.log('🔍 getAllTournaments called');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Missing Supabase credentials');
        return [];
    }

    try {
        console.log('📤 Making direct REST API call...');
        const url = `${supabaseUrl}/rest/v1/tournaments?select=*&order=start_date.asc`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            return [];
        }

        const data = await response.json();
        console.log('✅ Data received successfully:', {
            count: data?.length || 0,
            sample: data?.[0]?.title || 'No data'
        });

        return data || [];
    } catch (err: any) {
        console.error('❌ Unexpected error in getAllTournaments:', err);
        console.error('Error message:', err?.message);
        return [];
    }
};
