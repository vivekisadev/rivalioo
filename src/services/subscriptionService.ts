import { supabase } from '../lib/supabase';
import type {
    SubscriptionPlan,
    UserSubscription,
    SubscriptionHistory,
    CoinPurchase,
    CoinPackage,
    DailyEntryInfo,
    UpgradeSubscriptionData,
    PlanName
} from '../types/subscription';

// =====================================================
// SUBSCRIPTION PLANS
// =====================================================

/**
 * Get all available subscription plans
 */
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('multiplier', { ascending: true });

    if (error) {
        console.error('Error fetching subscription plans:', error);
        return [];
    }

    return data || [];
};

/**
 * Get specific plan details
 */
export const getPlanDetails = async (planName: PlanName): Promise<SubscriptionPlan | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('name', planName)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching plan details:', error);
        return null;
    }

    return data;
};

// =====================================================
// USER SUBSCRIPTION MANAGEMENT
// =====================================================

/**
 * Get user's current subscription info
 */
export const getUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('users')
        .select('current_plan, plan_expiry_date, plan_multiplier, daily_entries_remaining, last_entry_reset_date')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user subscription:', error);
        return null;
    }

    return data;
};

/**
 * Upgrade user subscription
 */
export const upgradeSubscription = async (
    userId: string,
    upgradeData: UpgradeSubscriptionData
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase.rpc('upgrade_user_subscription', {
        target_user_id: userId,
        new_plan: upgradeData.plan_name,
        payment_amount: upgradeData.payment_amount,
        payment_method_name: upgradeData.payment_method,
        payment_transaction_id: upgradeData.payment_id
    });

    if (error) {
        console.error('Error upgrading subscription:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Check and handle subscription expiry
 */
export const checkSubscriptionExpiry = async (userId: string): Promise<boolean> => {
    if (!supabase) return false;

    const { data, error } = await supabase.rpc('check_subscription_expiry', {
        target_user_id: userId
    });

    if (error) {
        console.error('Error checking subscription expiry:', error);
        return false;
    }

    return data || false;
};

/**
 * Get subscription history
 */
export const getSubscriptionHistory = async (
    userId: string,
    limit: number = 10
): Promise<SubscriptionHistory[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('subscription_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching subscription history:', error);
        return [];
    }

    return data || [];
};

// =====================================================
// DAILY ENTRIES
// =====================================================

/**
 * Get daily entry information
 */
export const getDailyEntryInfo = async (userId: string): Promise<DailyEntryInfo | null> => {
    if (!supabase) return null;

    // First reset if needed
    await supabase.rpc('reset_daily_entries', { target_user_id: userId });

    const { data, error } = await supabase
        .from('users')
        .select('daily_entries_remaining, current_plan')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching daily entry info:', error);
        return null;
    }

    // Get plan's total entries
    const { data: planData } = await supabase
        .from('subscription_plans')
        .select('daily_entries')
        .eq('name', data.current_plan)
        .single();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return {
        remaining: data.daily_entries_remaining,
        total: planData?.daily_entries || 3,
        resets_at: tomorrow.toISOString(),
        can_enter: data.daily_entries_remaining > 0
    };
};

/**
 * Use a daily entry
 */
export const useDailyEntry = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase.rpc('use_daily_entry', {
        target_user_id: userId
    });

    if (error) {
        console.error('Error using daily entry:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// =====================================================
// COIN MANAGEMENT
// =====================================================

/**
 * Predefined coin packages
 */
export const COIN_PACKAGES: CoinPackage[] = [
    {
        id: 'starter',
        coins: 100,
        price: 1.99,
        price_inr: 99,
        label: 'Starter'
    },
    {
        id: 'popular',
        coins: 500,
        price: 4.99,
        price_inr: 399,
        bonus_coins: 50,
        popular: true,
        label: 'Popular'
    },
    {
        id: 'pro',
        coins: 1000,
        price: 9.99,
        price_inr: 799,
        bonus_coins: 150,
        label: 'Pro'
    },
    {
        id: 'ultimate',
        coins: 5000,
        price: 39.99,
        price_inr: 3199,
        bonus_coins: 1000,
        label: 'Ultimate'
    }
];

/**
 * Purchase coins
 */
export const purchaseCoins = async (
    userId: string,
    coinsAmount: number,
    paymentAmount: number,
    paymentMethod?: string,
    paymentId?: string
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase.rpc('purchase_coins', {
        target_user_id: userId,
        coins_amount: coinsAmount,
        payment_amount: paymentAmount,
        payment_method_name: paymentMethod,
        payment_transaction_id: paymentId
    });

    if (error) {
        console.error('Error purchasing coins:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Award coins with multiplier (for tournament rewards)
 */
export const awardCoinsWithMultiplier = async (
    userId: string,
    baseCoins: number,
    description?: string
): Promise<{ success: boolean; finalCoins?: number; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { data, error } = await supabase.rpc('award_coins_with_multiplier', {
        target_user_id: userId,
        base_coins: baseCoins,
        event_description: description
    });

    if (error) {
        console.error('Error awarding coins:', error);
        return { success: false, error: error.message };
    }

    return { success: true, finalCoins: data };
};

/**
 * Get coin purchase history
 */
export const getCoinPurchaseHistory = async (
    userId: string,
    limit: number = 10
): Promise<CoinPurchase[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('coin_purchases')
        .select('*')
        .eq('user_id', userId)
        .order('purchased_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching coin purchase history:', error);
        return [];
    }

    return data || [];
};

// =====================================================
// CONVERSION
// =====================================================

/**
 * Convert coins to credits
 * Default rate: 10 coins = 1 credit (0.1)
 */
export const convertCoinsToCredits = async (
    userId: string,
    coinAmount: number,
    conversionRate: number = 0.1
): Promise<{ success: boolean; creditsReceived?: number; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase.rpc('convert_coins_to_credits', {
        target_user_id: userId,
        coin_amount: coinAmount,
        conversion_rate: conversionRate
    });

    if (error) {
        console.error('Error converting coins:', error);
        return { success: false, error: error.message };
    }

    return {
        success: true,
        creditsReceived: coinAmount * conversionRate
    };
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Calculate days until subscription expires
 */
export const getDaysUntilExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
};

/**
 * Check if subscription needs renewal reminder
 */
export const needsRenewalReminder = (expiryDate: string): boolean => {
    const daysLeft = getDaysUntilExpiry(expiryDate);
    return daysLeft <= 2 && daysLeft > 0;
};

/**
 * Format plan name for display
 */
export const formatPlanName = (planName: PlanName): string => {
    return planName.charAt(0).toUpperCase() + planName.slice(1);
};

/**
 * Get plan badge color
 */
export const getPlanBadgeColor = (planName: PlanName): string => {
    const colors = {
        basic: '#6B7280',
        bronze: '#CD7F32',
        silver: '#C0C0C0',
        gold: '#FFD700'
    };
    return colors[planName] || colors.basic;
};
