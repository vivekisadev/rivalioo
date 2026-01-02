// =====================================================
// SUBSCRIPTION AND TOKEN TYPES
// =====================================================

export type PlanName = 'basic' | 'bronze' | 'silver' | 'gold';

export interface SubscriptionPlan {
    id: number;
    name: PlanName;
    description: string;
    multiplier: number;
    daily_entries: number;
    sunday_entry: boolean;
    price: number;
    price_inr: number;
    duration_days: number;
    is_active: boolean;
}

export interface UserSubscription {
    current_plan: PlanName;
    plan_expiry_date?: string;
    plan_multiplier: number;
    daily_entries_remaining: number;
    last_entry_reset_date?: string;
}

export interface SubscriptionHistory {
    id: number;
    user_id: string;
    plan_name: PlanName;
    start_date: string;
    end_date: string;
    amount_paid: number;
    payment_method?: string;
    payment_id?: string;
    status: 'active' | 'expired' | 'cancelled';
    created_at: string;
}

export interface CoinPurchase {
    id: number;
    user_id: string;
    coins_purchased: number;
    amount_paid: number;
    payment_method?: string;
    payment_id?: string;
    status: 'completed' | 'pending' | 'failed';
    purchased_at: string;
}

export interface CoinPackage {
    id: string;
    coins: number;
    price: number;
    price_inr: number;
    bonus_coins?: number;
    popular?: boolean;
    label?: string;
}

export interface TokenBalance {
    coins: number;
    credits: number;
}

export interface ConversionRate {
    coins_to_credits: number; // e.g., 10 coins = 1 credit (0.1)
    credits_to_coins?: number; // Optional reverse conversion
}

export interface DailyEntryInfo {
    remaining: number;
    total: number;
    resets_at: string;
    can_enter: boolean;
}

export interface PlanBenefits {
    multiplier: number;
    daily_entries: number;
    sunday_entry: boolean;
    features: string[];
}

export interface UpgradeSubscriptionData {
    plan_name: PlanName;
    payment_amount: number;
    payment_method?: string;
    payment_id?: string;
}
