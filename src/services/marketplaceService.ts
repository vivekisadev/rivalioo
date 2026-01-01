import { supabase } from '../lib/supabase';

export interface RedeemablePackage {
    id: string;
    game_ref_id: string;
    package_id: string;
    amount_name: string;
    credits_cost: number;
    bonus_text?: string;
}

export interface RedeemableGame {
    id: string;
    game_id: string;
    name: string;
    cover_image: string;
    icon_image: string;
    color: string;
    language: string;
    region: string;
    currency_name: string;
    packages?: RedeemablePackage[];
}

export const marketplaceService = {
    // Fetch all redeemable games with their packages
    getGames: async (): Promise<RedeemableGame[]> => {
        if (!supabase) return [];

        // 1. Fetch Games
        const { data: games, error: gamesError } = await supabase
            .from('redeemable_games')
            .select('*');

        if (gamesError) {
            console.error('Error fetching games:', gamesError);
            return [];
        }

        if (!games) return [];

        // 2. Fetch Packages for these games
        const { data: packages, error: packagesError } = await supabase
            .from('redeemable_packages')
            .select('*');

        if (packagesError) {
            console.error('Error fetching packages:', packagesError);
            return games; // Return games without packages if packages fail
        }

        // 3. Map packages to games and transform to UI-friendly format (camelCase)
        const gamesWithPackages = games.map(game => ({
            id: game.game_id,
            name: game.name,
            coverImage: game.cover_image,
            iconImage: game.icon_image,
            color: game.color,
            language: game.language,
            region: game.region,
            currency: game.currency_name,
            packages: (packages?.filter(pkg => pkg.game_ref_id === game.game_id) || []).map(p => ({
                id: p.package_id,
                amount: p.amount_name,
                credits: p.credits_cost,
                bonus: p.bonus_text
            }))
        }));

        return gamesWithPackages as unknown as RedeemableGame[]; // Casting for now to avoid strict type mismatch with raw interface vs mapped object
    },

    // Create a new redemption order
    createRedemptionOrder: async (orderData: {
        userId: string;
        playerId: string;
        gameId: string;
        packageId: string;
        amountName: string;
        creditsCost: number;
    }) => {
        if (!supabase) throw new Error("Supabase client not initialized");

        const { data, error } = await supabase
            .from('redemption_orders')
            .insert({
                user_id: orderData.userId,
                player_id: orderData.playerId,
                game_id: orderData.gameId,
                package_id: orderData.packageId,
                amount_name: orderData.amountName,
                credits_cost: orderData.creditsCost,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    }
};
