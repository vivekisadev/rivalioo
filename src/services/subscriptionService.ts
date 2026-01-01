import { supabase } from '../lib/supabase';

// Type definitions matching database schema
export interface SubscriptionTier {
    id: string;
    name: string;
    slug: string;
    description: string;
    weekly_price_inr: number;
    monthly_price_inr: number;
    coin_multiplier: string;
    features: string[];
    theme_color: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ShopItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Bundle' | 'Skins' | 'Currency' | 'Gear' | 'Bundles';
    price_inr: number;
    price_credits: number | null;
    image_url: string;
    features: string[];
    stock_quantity: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Fetch all active subscription tiers
 */
export const getSubscriptionTiers = async (): Promise<SubscriptionTier[]> => {
    try {
        if (!supabase) {
            console.error('Supabase client not initialized');
            return [];
        }

        const { data, error } = await supabase
            .from('subscription_tiers')
            .select('*')
            .eq('is_active', true)
            .order('weekly_price_inr', { ascending: true });

        if (error) {
            console.error('Error fetching subscription tiers:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getSubscriptionTiers:', error);
        return [];
    }
};

/**
 * Fetch a single subscription tier by slug
 */
export const getSubscriptionTierBySlug = async (slug: string): Promise<SubscriptionTier | null> => {
    try {
        if (!supabase) {
            console.error('Supabase client not initialized');
            return null;
        }

        const { data, error } = await supabase
            .from('subscription_tiers')
            .select('*')
            .eq('slug', slug)
            .eq('is_active', true)
            .single();

        if (error) {
            console.error('Error fetching subscription tier:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getSubscriptionTierBySlug:', error);
        return null;
    }
};

/**
 * Fetch all active shop items
 */
export const getShopItems = async (): Promise<ShopItem[]> => {
    try {
        if (!supabase) {
            console.error('Supabase client not initialized');
            return [];
        }

        const { data, error } = await supabase
            .from('shop_items')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching shop items:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getShopItems:', error);
        return [];
    }
};

/**
 * Fetch shop items by category
 */
export const getShopItemsByCategory = async (category: string): Promise<ShopItem[]> => {
    try {
        if (!supabase) {
            console.error('Supabase client not initialized');
            return [];
        }

        const { data, error } = await supabase
            .from('shop_items')
            .select('*')
            .eq('category', category)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching shop items by category:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getShopItemsByCategory:', error);
        return [];
    }
};

/**
 * Fetch a single shop item by ID
 */
export const getShopItemById = async (id: string): Promise<ShopItem | null> => {
    try {
        if (!supabase) {
            console.error('Supabase client not initialized');
            return null;
        }

        const { data, error } = await supabase
            .from('shop_items')
            .select('*')
            .eq('id', id)
            .eq('is_active', true)
            .single();

        if (error) {
            console.error('Error fetching shop item:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getShopItemById:', error);
        return null;
    }
};
