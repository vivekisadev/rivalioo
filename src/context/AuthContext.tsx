import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { UserProfile, RegistrationData } from '../types/user';
import { getCurrentUserProfile, registerUser, updateUserStatus } from '../services/userService';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    userProfile: UserProfile | null;
    login: () => void;
    logout: () => Promise<void>;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<{ data: any; error: any }>;
    signUpWithEmail: (registrationData: RegistrationData) => Promise<{ data: any; error: any }>;
    verifyOtp: (email: string, token: string) => Promise<{ data: any; error: any }>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    userProfile: null,
    login: () => { },
    logout: async () => { },
    loading: true,
    signInWithEmail: async () => ({ data: null, error: null }),
    signUpWithEmail: async () => ({ data: null, error: null }),
    verifyOtp: async () => ({ data: null, error: null }),
    refreshProfile: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch user profile
    const fetchUserProfile = async (userId: string) => {
        const profile = await getCurrentUserProfile();
        if (profile) {
            setUserProfile(profile);
            // Update status to online when profile is loaded
            await updateUserStatus(userId, 'online');
        }
    };

    // Refresh profile manually
    const refreshProfile = async () => {
        if (user) {
            await fetchUserProfile(user.id);
        }
    };

    useEffect(() => {
        if (!supabase) {
            console.warn("Supabase client not initialized. Setting loading to false.");
            setLoading(false);
            return;
        }

        let mounted = true;

        // Force loading false after 3 seconds timeout to prevent blank screen
        const timeout = setTimeout(() => {
            if (mounted && loading) {
                console.warn("Auth check timed out. Forcing loading false.");
                setLoading(false);
            }
        }, 3000);

        const initAuth = async () => {
            try {
                // Check active session
                const { data: { session }, error } = await supabase!.auth.getSession();
                if (error) throw error;

                if (mounted) {
                    setUser(session?.user ?? null);
                    setIsAuthenticated(!!session);

                    // Fetch user profile if session exists
                    if (session?.user) {
                        await fetchUserProfile(session.user.id);
                    }
                }
            } catch (err) {
                console.error("Error checking auth session:", err);
            } finally {
                if (mounted) {
                    setLoading(false);
                    clearTimeout(timeout);
                }
            }
        };

        initAuth();

        // Listen for changes
        const { data: { subscription } } = supabase!.auth.onAuthStateChange(async (_event, session) => {
            if (mounted) {
                setUser(session?.user ?? null);
                setIsAuthenticated(!!session);

                // Fetch profile on login
                if (session?.user) {
                    await fetchUserProfile(session.user.id);
                } else {
                    setUserProfile(null);
                }

                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            clearTimeout(timeout);
            subscription?.unsubscribe();

            // Set status to offline on unmount
            if (user) {
                updateUserStatus(user.id, 'offline');
            }
        };
    }, []);

    // Update status to offline when user leaves
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (user) {
                updateUserStatus(user.id, 'offline');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [user]);

    const login = async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error("Login error:", error.message);
    };

    const signInWithEmail = async (email: string, password: string) => {
        if (!supabase) return { data: null, error: { message: "Supabase not initialized" } };

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        // Fetch profile after successful login
        if (data.user && !error) {
            await fetchUserProfile(data.user.id);
        }

        return { data, error };
    };

    const signUpWithEmail = async (registrationData: RegistrationData) => {
        if (!supabase) return { data: null, error: { message: "Supabase not initialized" } };

        // Use the userService registerUser function
        const result = await registerUser(registrationData);

        if (result.success && result.userId) {
            // Sign in the user after registration
            const { data, error } = await supabase.auth.signInWithPassword({
                email: registrationData.email,
                password: registrationData.password
            });

            if (data.user && !error) {
                await fetchUserProfile(data.user.id);
                return { data, error };
            }

            // If sign in fails because email is not confirmed, we treat it as a "success" (account created)
            // but return a specific error code that the UI can recognize to show the "Verify Email" screen.
            if (error && (error.message.includes("Email not confirmed") || error.message.includes("confirm"))) {
                return {
                    data: { user: { email: registrationData.email }, session: null },
                    error: { message: "Email not confirmed", code: "email_not_confirmed" }
                };
            }

            return { data, error };
        } else {
            return { data: null, error: { message: result.error || 'Registration failed' } };
        }
    };

    const verifyOtp = async (email: string, token: string) => {
        if (!supabase) return { data: null, error: { message: "Supabase not initialized" } };

        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'signup'
        });

        if (data.user && !error) {
            await fetchUserProfile(data.user.id);
        }

        return { data, error };
    };

    const logout = async () => {
        // 1. Immediate UI cleanup (Optimistic)
        const currentUserId = user?.id;
        setUser(null);
        setIsAuthenticated(false);
        setUserProfile(null);

        if (!supabase) return;

        try {
            // 2. Background cleanup
            // Fire-and-forget status update (don't await)
            if (currentUserId) {
                updateUserStatus(currentUserId, 'offline').catch(err => console.warn("Background status update failed:", err));
            }

            // 3. Clear session (await this to ensure token cleanup)
            await supabase.auth.signOut();
        } catch (e) {
            console.warn("Logout cleanup error:", e);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            userProfile,
            login,
            logout,
            loading,
            signInWithEmail,
            signUpWithEmail,
            verifyOtp,
            refreshProfile
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
