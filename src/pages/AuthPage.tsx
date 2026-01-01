import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoFull from '../assets/images/logo_full.png';

const AuthPage = () => {
    const location = useLocation();
    const isSignupInitial = location.pathname === '/signup';
    const [isSignup, setIsSignup] = useState(isSignupInitial);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const navigate = useNavigate();
    const { signInWithEmail, signUpWithEmail, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    // Sync state with URL if user navigates directly
    React.useEffect(() => {
        setIsSignup(location.pathname === '/signup');
        setAuthError(null); // Clear errors on switch
    }, [location.pathname]);

    // Password Strength Checker
    const checkPasswordStrength = (pass: string) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        setPasswordStrength(score);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPassword(val);
        checkPasswordStrength(val);
    };

    const validateForm = () => {
        setAuthError(null);

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAuthError("Please enter a valid email address.");
            return false;
        }

        // Signup Specific Validation
        if (isSignup) {
            if (!username.trim()) {
                setAuthError("Username is required.");
                return false;
            }
            if (password.length < 8) {
                setAuthError("Password must be at least 8 characters.");
                return false;
            }
            if (passwordStrength < 3) {
                setAuthError("Password is too weak. Include uppercase, numbers, and symbols.");
                return false;
            }
        } else {
            if (!password) {
                setAuthError("Please enter your password.");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            if (isSignup) {
                const { error } = await signUpWithEmail({ email, password, username, terms_accepted: true });
                if (error) throw error;
                // Navigation handled by useEffect
            } else {
                const { error } = await signInWithEmail(email, password);
                if (error) throw error;
                // Navigation handled by useEffect
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            // Translate Supabase errors to user friendly messages
            if (err.message.includes("Invalid login")) setAuthError("Invalid email or password.");
            else if (err.message.includes("already registered")) setAuthError("Email is already registered.");
            else if (err.message === "Supabase not initialized") setAuthError("Setup Required: Update .env with Supabase credentials.");
            else setAuthError(err.message || "Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center pt-32 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2FE9A9]/10 to-transparent opacity-30"></div>
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#2FE9A9]/20 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-[#FF5E3A]/10 blur-[150px] rounded-full"></div>
            </div>

            {/* Auth Card */}
            <motion.div
                layoutId="auth-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#13161C]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-8 pb-0 text-center">
                        <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
                            <img src={logoFull} alt="RIVALLIO" className="h-12 mx-auto" />
                        </Link>

                        <div className="relative h-[80px] overflow-hidden">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isSignup ? 'signup-head' : 'login-head'}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute inset-x-0 top-0 flex flex-col items-center"
                                    data-cursor={!isSignup ? "invert" : undefined}
                                >
                                    <h2 className="text-3xl font-bold font-oswald uppercase tracking-wide text-white mb-2">
                                        {isSignup ? 'Join the Arena' : 'Welcome Back'}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {isSignup ? 'Create account to pass security checks.' : 'Secure Login System'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-4 gap-2 mt-4">
                        <button
                            onClick={() => { setIsSignup(false); navigate('/login'); }}
                            data-cursor={!isSignup ? "invert" : undefined}
                            className={`flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${!isSignup ? 'bg-[#2FE9A9] text-black shadow-[0_0_20px_rgba(47,233,169,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => { setIsSignup(true); navigate('/signup'); }}
                            className={`flex-1 py-3 text-center text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${isSignup ? 'bg-[#FF5E3A] text-black shadow-[0_0_20px_rgba(255,94,58,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                            data-cursor={!isSignup ? "invert" : undefined}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error Box */}
                    <AnimatePresence mode="popLayout">
                        {authError && (
                            <motion.div
                                layout
                                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
                                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="overflow-hidden"
                                data-cursor={!isSignup ? "invert" : undefined}
                            >
                                <motion.div
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: 20 }}
                                    className="mx-8 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-xs font-bold text-center"
                                    data-cursor={!isSignup ? "invert" : undefined}
                                >
                                    {authError}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 pt-4 flex flex-col gap-5">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {isSignup && (
                                <motion.div
                                    key="signup-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 80 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ overflow: "hidden" }}
                                    data-cursor={!isSignup ? "invert" : undefined}
                                >
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2FE9A9] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Enter your username"
                                                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div layout="position" className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2FE9A9] transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                />
                            </div>
                        </motion.div>

                        <motion.div layout="position" className="space-y-1">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                                <AnimatePresence>
                                    {!isSignup && (
                                        <motion.a
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            href="#" className="text-xs text-[#2FE9A9] hover:underline"
                                            data-cursor={!isSignup ? "invert" : undefined}
                                        >
                                            Forgot?
                                        </motion.a>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2FE9A9] transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder={isSignup ? "Min 8 chars, 1 Special, 1 Cap" : "••••••••"}
                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                />
                            </div>

                            {/* Password Strength Meter (Only Signup) */}
                            <AnimatePresence>
                                {isSignup && password.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 space-y-1 overflow-hidden"
                                        data-cursor={!isSignup ? "invert" : undefined}
                                    >
                                        <div className="flex gap-1 h-1">
                                            {[1, 2, 3, 4, 5].map((lvl) => (
                                                <div
                                                    key={lvl}
                                                    className={`h-full flex-1 rounded-full transition-all duration-300
                                                        ${passwordStrength >= lvl
                                                            ? (passwordStrength < 3 ? 'bg-red-500' : passwordStrength < 5 ? 'bg-yellow-500' : 'bg-[#2FE9A9]')
                                                            : 'bg-white/10'
                                                        }`}
                                                    data-cursor={!isSignup ? "invert" : undefined}
                                                ></div>
                                            ))}
                                        </div>
                                        <p className={`text-[10px] uppercase font-bold text-right transition-colors
                                            ${passwordStrength < 3 ? 'text-red-500' : passwordStrength < 5 ? 'text-yellow-500' : 'text-[#2FE9A9]'}
                                        `}>
                                            {passwordStrength < 3 ? "Weak" : passwordStrength < 5 ? "Good" : "Strong"}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.button
                            layout="position"
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 mt-2 font-bold uppercase tracking-widest text-sm rounded-xl transition-all flex items-center justify-center gap-2 group relative overflow-hidden
                                ${isSignup
                                    ? 'bg-gradient-to-r from-[#FF5E3A] to-[#FF8C3A] text-black shadow-[0_0_30px_rgba(255,94,58,0.4)] hover:shadow-[0_0_40px_rgba(255,94,58,0.6)]'
                                    : 'bg-gradient-to-r from-[#2FE9A9] to-[#25C48D] text-black shadow-[0_0_30px_rgba(47,233,169,0.4)] hover:shadow-[0_0_40px_rgba(47,233,169,0.6)]'
                                }
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                            data-cursor={!isSignup ? "invert" : undefined}
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Verifying...</span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="transition-transform duration-300 group-hover:-translate-x-1">{isSignup ? 'Create Secure Account' : 'Authenticate'}</span>
                                    <ArrowRight className="w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100 transition-all duration-300" size={18} />
                                </div>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="bg-white/5 p-4 text-center border-t border-white/5">
                        <p className="text-xs text-gray-400">
                            By continuing, you agree to our <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;
