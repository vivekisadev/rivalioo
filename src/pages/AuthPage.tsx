import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoFull from '../assets/images/logo_full.png';
import { Tabs, TabsList, TabsTrigger, TabsHighlight, TabsHighlightItem, TabsHighlightProvider } from '../components/ui/animatetabs';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const AuthPage = () => {
    const location = useLocation();
    const isSignupInitial = location.pathname === '/signup';
    const [isSignup, setIsSignup] = useState(isSignupInitial);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [needsConfirmation, setNeedsConfirmation] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const { signInWithEmail, signUpWithEmail, verifyOtp, isAuthenticated, login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [dotLottie, setDotLottie] = useState<any>(null);

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            setIsRedirecting(true);
        }
    }, [isAuthenticated]);

    // Navigate only after animation completes
    React.useEffect(() => {
        if (dotLottie) {
            dotLottie.addEventListener('complete', () => {
                navigate('/home');
            });
        }
    }, [dotLottie, navigate]);


    // Sync state with URL if user navigates directly
    React.useEffect(() => {
        setIsSignup(location.pathname === '/signup');
        setAuthError(null); // Clear errors on switch
        setNeedsConfirmation(false);
    }, [location.pathname]);

    React.useEffect(() => {
        let interval: any;
        if (needsConfirmation && password) {
            interval = setInterval(async () => {
                try {
                    // Try to sign in silently
                    const { error } = await signInWithEmail(email, password);
                    if (!error) {
                        // Success! User is verified and logged in.
                        setNeedsConfirmation(false);
                        // Redirect logic in main useEffect will handle the rest
                    }
                } catch (e) {
                    // Ignore errors (like "Email not confirmed")
                }
            }, 3000); // Check every 3 seconds
        }
        return () => clearInterval(interval);
    }, [needsConfirmation, email, password, signInWithEmail]);

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

                // Handle special "success" case where verification is needed
                if (error && error.code === 'email_not_confirmed') {
                    setNeedsConfirmation(true);
                    return;
                }

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
            if (err.message.includes("Invalid login")) setAuthError("Invalid email or password.");
            else if (err.message.includes("already registered")) {
                setIsSignup(false);
                setAuthError("Email already registered. Please login.");
            }
            else if (err.message === "Supabase not initialized") setAuthError("Setup Required: Update .env with Supabase credentials.");
            else if (err.message.includes("Email not confirmed") || err.message.includes("confirm")) {
                setNeedsConfirmation(true);
                return;
            }
            else setAuthError(err.message || "Authentication failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtp = async () => {
        if (!otp) return;
        setIsLoading(true);
        try {
            const { error } = await verifyOtp(email, otp);
            if (error) throw error;
        } catch (err: any) {
            setAuthError(err.message || "Invalid Code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-500 ${isRedirecting ? 'p-0' : 'pt-24 pb-32'}`}>
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2FE9A9]/10 to-transparent opacity-30"></div>
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#2FE9A9]/20 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-[#FF5E3A]/10 blur-[150px] rounded-full"></div>
            </div>

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md">
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    className="bg-[#13161C]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {isRedirecting ? (
                        <div className="p-12 flex flex-col items-center justify-center min-h-[400px]">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative mb-8 w-48 h-48"
                            >
                                <DotLottieReact
                                    src="https://lottie.host/1899fb93-bd8e-46cf-857b-b9a473f7e760/IlG59jCH1s.lottie"
                                    loop={false}
                                    autoplay
                                    dotLottieRefCallback={setDotLottie}
                                />

                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <h2 className="text-3xl font-bold font-display uppercase tracking-wider text-white mb-3 text-center text-shadow-glow">
                                    Access Granted
                                </h2>
                                <p className="text-[#2FE9A9] text-sm font-medium tracking-wide animate-pulse text-center">
                                    Welcome to Rivalioo
                                </p>
                            </motion.div>
                        </div>
                    ) : needsConfirmation ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-[#2FE9A9]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2FE9A9]">
                                <Mail size={32} />
                            </div>
                            <h2 className="text-2xl font-bold font-oswald uppercase tracking-wide text-white mb-2">
                                Verify Your Email
                            </h2>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                We've sent a verification link to <span className="text-white font-bold">{email}</span>.
                                <br />Please check your inbox to confirm your account.
                            </p>

                            <div className="mb-6">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2">Or enter code</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="123456"
                                        className="flex-1 bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 text-center text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all font-mono text-lg tracking-widest"
                                    />
                                    <button
                                        onClick={handleOtp}
                                        disabled={isLoading || otp.length < 6}
                                        className="bg-[#2FE9A9] text-black font-bold uppercase tracking-wide px-6 rounded-xl hover:bg-[#25C48D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader className="animate-spin" size={20} /> : "Verify"}
                                    </button>
                                </div>
                                {authError && <p className="text-red-500 text-xs mt-2">{authError}</p>}
                            </div>

                            <div className="space-y-3">
                                <button
                                    disabled={true}
                                    className="w-full py-4 font-bold uppercase tracking-widest text-sm rounded-xl bg-white/5 text-gray-400 border border-white/5 flex items-center justify-center gap-3 cursor-wait"
                                >
                                    <Loader className="animate-spin text-[#2FE9A9]" size={18} />
                                    Waiting for confirmation...
                                </button>

                                <button
                                    onClick={() => {
                                        setNeedsConfirmation(false);
                                        setIsSignup(false);
                                        navigate('/login');
                                    }}
                                    className="text-xs text-gray-500 hover:text-white transition-colors"
                                >
                                    ← Back to Login
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="p-8 pb-0 text-center">
                                <Link to="/" className="inline-block mb-6 hover:scale-105 transition-transform">
                                    <img src={logoFull} alt="RIVALLIO" className="h-12 mx-auto" />
                                </Link>

                                <div className="relative h-[80px] overflow-hidden flex flex-col items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isSignup ? 'signup-head' : 'login-head'}
                                            initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                            exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute"
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

                            {/* Animated Tabs - Premium */}
                            <div className="px-6 mt-6">
                                <TabsHighlightProvider value={isSignup ? 'signup' : 'login'} defaultValue={isSignup ? 'signup' : 'login'}>
                                    <Tabs
                                        value={isSignup ? 'signup' : 'login'}
                                        onValueChange={(value: string) => {
                                            const newIsSignup = value === 'signup';
                                            setIsSignup(newIsSignup);
                                            navigate(newIsSignup ? '/signup' : '/login');
                                        }}
                                        className="w-full"
                                    >
                                        <TabsHighlight className="relative">
                                            <TabsList className="h-14 inline-flex p-1.5 bg-[#0B0E14]/60 backdrop-blur-xl w-full rounded-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                                                <TabsHighlightItem value="login" className="flex-1">
                                                    <TabsTrigger
                                                        value="login"
                                                        className="h-full px-6 py-3 w-full text-sm font-extrabold"
                                                    >
                                                        Log In
                                                    </TabsTrigger>
                                                </TabsHighlightItem>
                                                <TabsHighlightItem
                                                    value="signup"
                                                    className="flex-1"
                                                    highlightColor="from-[#FF5E3A] to-[#FF8C3A]"
                                                    shadowColor="rgba(255,94,58,0.3)"
                                                >
                                                    <TabsTrigger
                                                        value="signup"
                                                        className="h-full px-6 py-3 w-full text-sm font-extrabold"
                                                    >
                                                        Sign Up
                                                    </TabsTrigger>
                                                </TabsHighlightItem>
                                            </TabsList>
                                        </TabsHighlight>
                                    </Tabs>
                                </TabsHighlightProvider>
                            </div>

                            {/* Error Box */}
                            <AnimatePresence mode="popLayout">
                                {authError && (
                                    <motion.div
                                        layout
                                        initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
                                        exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                                        transition={{ type: "spring", stiffness: 250, damping: 30 }}
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
                            <form onSubmit={handleSubmit} className="p-8 pt-4 flex flex-col">
                                <AnimatePresence>
                                    {isSignup && (
                                        <motion.div
                                            key="signup-username"
                                            initial={{ opacity: 0, height: 0, marginBottom: 0, y: -10 }}
                                            animate={{ opacity: 1, height: 'auto', marginBottom: 20, y: 0 }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0, y: -10 }}
                                            transition={{ type: "spring", stiffness: 250, damping: 30 }}
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
                                                        autoComplete="username"
                                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div layout className="space-y-1 mb-5">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#2FE9A9] transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            autoComplete="email"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div layout className="space-y-1 mb-5">
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
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            placeholder={isSignup ? "Min 8 chars, 1 Special, 1 Cap" : "••••••••"}
                                            autoComplete="current-password"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-[#2FE9A9] focus:ring-1 focus:ring-[#2FE9A9] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors focus:outline-none"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
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
                                    layout
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
                                            <span className="transition-transform duration-300 group-hover:-translate-x-1 relative h-5 overflow-hidden block">
                                                <AnimatePresence mode="wait" initial={false}>
                                                    <motion.span
                                                        key={isSignup ? "signup-btn" : "login-btn"}
                                                        initial={{ y: 15, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -15, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="block"
                                                    >
                                                        {isSignup ? 'Create Secure Account' : 'Authenticate'}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </span>
                                            <ArrowRight className="w-0 opacity-0 group-hover:w-[18px] group-hover:opacity-100 transition-all duration-300" size={18} />
                                        </div>
                                    )}
                                </motion.button>

                                <div className="relative my-6 flex items-center justify-center">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative z-10 bg-[#13161C] px-4">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                            Or Continue With
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    layout
                                    type="button"
                                    onClick={() => login()}
                                    className="w-full py-4 font-bold uppercase tracking-widest text-sm rounded-xl bg-white text-black hover:bg-gray-100 transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    <span>Google</span>
                                </motion.button>
                            </form>

                            {/* Footer */}
                            <div className="bg-white/5 p-1.5 text-center border-t border-white/5">
                                <p className="text-xs text-gray-400">
                                    By continuing, you agree to our <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
