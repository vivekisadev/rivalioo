import { supabase } from '../lib/supabase';
import type {
    UserProfile,
    UpdateProfileData,
    RegistrationData,
    LinkedGameAccount,
    UserRole,
    Transaction,
    BalanceInfo
} from '../types/user';

// =====================================================
// USER PROFILE OPERATIONS
// =====================================================

/**
 * Get complete user profile with roles
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    // MOCK DATA for Leaderboard Demo
    if (userId.startsWith('mock-user-') || !userId.includes('-')) {
        // Generate a deterministic mock profile based on the ID string
        const name = userId.replace('mock-user-', '');
        return {
            id: userId,
            username: name.toLowerCase(),
            name: name,
            email: `${name}@example.com`,
            role: 'user',
            status: 'online',
            created_at: new Date().toISOString(),
            coin_balance: Math.floor(Math.random() * 10000),
            credit_balance: Math.floor(Math.random() * 5000),
            profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            bio: `This is the public profile of ${name}. I am a top 100 player!`,
            phone: '',
            address: '',
            date_of_birth: '',
            gender: 'other',
            two_factor_enabled: false,
            referral_code: name.toUpperCase(),
            referred_by: null,
            daily_entries_remaining: 3,
            current_plan: 'pro',
            plan_expiry_date: null,
            plan_multiplier: 1.5,
            bronze_trophies: 5,
            silver_trophies: 3,
            gold_trophies: 1,
            social_links: { twitter: '', discord: '' },
            is_email_verified: true,
            updated_at: new Date().toISOString()
        } as unknown as UserProfile;
    }

    if (!supabase) return null;

    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data;
};

/**
 * Get current authenticated user's profile
 */
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
    if (!supabase) return null;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    return getUserProfile(user.id);
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: UpdateProfileData
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

    if (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Update user status (online/offline)
 */
export const updateUserStatus = async (
    userId: string,
    status: 'online' | 'offline'
): Promise<boolean> => {
    if (!supabase) return false;

    const { error } = await supabase
        .from('users')
        .update({ status })
        .eq('id', userId);

    return !error;
};

/**
 * Check if username is available
 */
export const isUsernameAvailable = async (username: string): Promise<boolean> => {
    if (!supabase) return false;

    const { data } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();

    return !data;
};

/**
 * Check if email is available
 */
export const isEmailAvailable = async (email: string): Promise<boolean> => {
    if (!supabase) return false;

    const { data } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

    return !data;
};

// =====================================================
// USER REGISTRATION
// =====================================================

/**
 * Register a new user
 */
export const registerUser = async (
    registrationData: RegistrationData
): Promise<{ success: boolean; userId?: string; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    // Validate terms acceptance
    if (!registrationData.terms_accepted) {
        return { success: false, error: 'You must accept the terms and conditions' };
    }

    // Check username availability
    const usernameAvailable = await isUsernameAvailable(registrationData.username);
    if (!usernameAvailable) {
        return { success: false, error: 'Username already taken' };
    }

    // Check email availability
    const emailAvailable = await isEmailAvailable(registrationData.email);
    if (!emailAvailable) {
        return { success: false, error: 'Email already registered' };
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password,
        options: {
            data: {
                username: registrationData.username,
                terms_accepted: registrationData.terms_accepted,
                name: registrationData.name,
            }
        }
    });

    if (authError || !authData.user) {
        console.error('Error creating auth user:', authError);
        return { success: false, error: authError?.message || 'Registration failed' };
    }

    // Update additional profile fields if provided
    if (registrationData.phone || registrationData.address ||
        registrationData.date_of_birth || registrationData.gender) {
        await updateUserProfile(authData.user.id, {
            phone: registrationData.phone,
            address: registrationData.address,
            date_of_birth: registrationData.date_of_birth,
            gender: registrationData.gender,
        });
    }

    return { success: true, userId: authData.user.id };
};

// =====================================================
// USER ROLES
// =====================================================

/**
 * Get user roles
 */
export const getUserRoles = async (userId: string): Promise<UserRole[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching user roles:', error);
        return [];
    }

    return data || [];
};

/**
 * Check if user has a specific role
 */
export const userHasRole = async (
    userId: string,
    role: UserRole
): Promise<boolean> => {
    if (!supabase) return false;

    const { data } = await supabase
        .rpc('user_has_role', {
            check_user_id: userId,
            check_role: role
        });

    return data || false;
};

/**
 * Assign role to user (admin only)
 */
export const assignRole = async (
    userId: string,
    role: UserRole,
    assignedBy: string
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('user_roles')
        .insert({
            user_id: userId,
            role,
            assigned_by: assignedBy
        });

    if (error) {
        console.error('Error assigning role:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Remove role from user (admin only)
 */
export const removeRole = async (
    userId: string,
    role: UserRole
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

    if (error) {
        console.error('Error removing role:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// =====================================================
// LINKED GAME ACCOUNTS
// =====================================================

/**
 * Get user's linked game accounts
 */
export const getLinkedGameAccounts = async (userId: string): Promise<LinkedGameAccount[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('linked_game_accounts')
        .select('*, game:games(*)')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching linked accounts:', error);
        return [];
    }

    return data || [];
};

/**
 * Link a game account
 */
export const linkGameAccount = async (
    userId: string,
    gameId: number,
    inGameId: string,
    inGameUsername: string
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('linked_game_accounts')
        .upsert({
            user_id: userId,
            game_id: gameId,
            in_game_id: inGameId,
            in_game_username: inGameUsername
        }, {
            onConflict: 'user_id,game_id'
        });

    if (error) {
        console.error('Error linking game account:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Unlink a game account
 */
export const unlinkGameAccount = async (
    userId: string,
    gameId: number
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('linked_game_accounts')
        .delete()
        .eq('user_id', userId)
        .eq('game_id', gameId);

    if (error) {
        console.error('Error unlinking game account:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// =====================================================
// BALANCE OPERATIONS
// =====================================================

/**
 * Get user balance information
 */
export const getUserBalance = async (userId: string): Promise<BalanceInfo | null> => {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('users')
        .select('coin_balance, credit_balance')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching balance:', error);
        return null;
    }

    return {
        coins: data.coin_balance,
        credits: data.credit_balance
    };
};

/**
 * Convert coins to credits
 */
export const convertCoinsToCredits = async (
    userId: string,
    coinAmount: number,
    conversionRate: number = 0.1
): Promise<{ success: boolean; error?: string; creditsReceived?: number }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .rpc('convert_coins_to_credits', {
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

/**
 * Get user transaction history
 */
export const getUserTransactions = async (
    userId: string,
    limit: number = 50
): Promise<Transaction[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('transaction_date', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }

    return data || [];
};

// =====================================================
// TROPHIES
// =====================================================

/**
 * Award trophy to user
 */
export const awardTrophy = async (
    userId: string,
    trophyType: 'bronze' | 'silver' | 'gold'
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const column = `${trophyType}_trophies`;

    // Get current trophy count
    const { data: userData } = await supabase
        .from('users')
        .select(column)
        .eq('id', userId)
        .single();

    const currentCount = (userData as any)?.[column] || 0;

    const { error } = await supabase
        .from('users')
        .update({ [column]: currentCount + 1 })
        .eq('id', userId);

    if (error) {
        console.error('Error awarding trophy:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

// =====================================================
// PASSWORD & SECURITY
// =====================================================

/**
 * Change user password
 */
export const changePassword = async (
    newPassword: string
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        console.error('Error changing password:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};

/**
 * Enable/disable 2FA
 */
export const toggle2FA = async (
    userId: string,
    enabled: boolean
): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Database not initialized' };

    const { error } = await supabase
        .from('users')
        .update({ two_factor_enabled: enabled })
        .eq('id', userId);

    if (error) {
        console.error('Error toggling 2FA:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
};
