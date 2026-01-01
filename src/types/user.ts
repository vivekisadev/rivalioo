// =====================================================
// USER TYPES AND INTERFACES
// =====================================================

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type UserStatus = 'online' | 'offline';
export type UserRole = 'player' | 'moderator' | 'admin' | 'influencer';

export interface SocialLinks {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    discord?: string;
    facebook?: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    name?: string;
    profile_picture_url?: string;
    coin_balance: number;
    credit_balance: number;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: Gender;
    bio?: string;
    status: UserStatus;
    bronze_trophies: number;
    silver_trophies: number;
    gold_trophies: number;
    social_links: SocialLinks;
    two_factor_enabled: boolean;
    is_admin: boolean;
    terms_accepted: boolean;
    terms_accepted_at?: string;
    // Subscription fields
    current_plan?: 'basic' | 'bronze' | 'silver' | 'gold';
    plan_expiry_date?: string;
    plan_multiplier?: number;
    daily_entries_remaining?: number;
    created_at: string;
    updated_at: string;
    roles?: UserRole[];
}

export interface UserRoleAssignment {
    id: number;
    user_id: string;
    role: UserRole;
    assigned_at: string;
    assigned_by?: string;
}

export interface LinkedGameAccount {
    id: number;
    user_id: string;
    game_id: number;
    in_game_id: string;
    in_game_username: string;
    verified: boolean;
    linked_at: string;
    updated_at: string;
    game?: Game;
}

export interface Game {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
}

export interface UpdateProfileData {
    username?: string;
    name?: string;
    profile_picture_url?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: Gender;
    bio?: string;
    social_links?: SocialLinks;
}

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
    terms_accepted: boolean;
    name?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    gender?: Gender;
}

export interface Transaction {
    id: number;
    user_id: string;
    type: 'coin_purchase' | 'coin_to_credit' | 'credit_spend' | 'reward' | 'refund';
    amount: number;
    currency: 'coin' | 'credit';
    related_id?: number;
    description?: string;
    transaction_date: string;
}

export interface BalanceInfo {
    coins: number;
    credits: number;
    total_earned_coins?: number;
    total_spent_credits?: number;
}
