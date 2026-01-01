import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeLoggedIn from './pages/HomeLoggedIn';
import LandingPage from './pages/LandingPage';
import Tournaments from './pages/Tournaments';
import Leaderboard from './pages/Leaderboard';
import Shop from './pages/Shop';
import TopUp from './pages/TopUp';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import AuthPage from './pages/AuthPage';
import Community from './pages/Community';
import Live from './pages/Live';
import About from './pages/About';
import Join from './pages/Join';
import ComingSoon from './pages/ComingSoon';
import Subscription from './pages/Subscription';
import GamePage from './pages/GamePage';
import EventsListPage from './pages/EventsListPage';
import MatchDetailPage from './pages/MatchDetailPage';
import { Footer } from './components/Footer';
import MinimalFooter from './components/MinimalFooter';
import SecureCheckout from './pages/SecureCheckout';

import { AuthProvider } from './context/AuthContext';
import SmoothCursor from './components/SmoothCursor';
import SmoothScroll from './components/SmoothScroll';
import ProtectedRoute from './components/ProtectedRoute';

import logoFull from './assets/images/logo_full.png';

// Animation imports
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

import { isRouteLocked } from './constants/lockedRoutes';
import FeatureGuard from './components/FeatureGuard';

import PremiumLoader from './components/PremiumLoader';
import { useState } from 'react';

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isLockedPage = isRouteLocked(location.pathname);

  const isCheckoutPage = location.pathname === '/checkout';

  return (
    <div className="min-h-screen bg-rival-dark text-white selection:bg-rival-teal selection:text-rival-dark font-sans flex flex-col relative cursor-none">
      <SmoothCursor />
      {/* Global Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <img
          src={logoFull}
          alt=""
          className="w-[800px] opacity-40 blur-3xl filter drop-shadow-[0_0_150px_rgba(0,217,255,0.15)]"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        {!isCheckoutPage && <Navbar />}
        <main className="flex-grow">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={isAuthPage ? 'auth' : location.pathname}>
              <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<PageTransition><HomeLoggedIn /></PageTransition>} />

                {/* Protected Routes - Require Authentication */}
                <Route path="/topup" element={<PageTransition><TopUp /></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><SecureCheckout /></PageTransition>} />

                {/* Profile Routes */}
                <Route path="/profile/:userId" element={<PageTransition><FeatureGuard title="PROFILE" subtitle="Profile is under construction and we'll let you know when done with it."><Profile /></FeatureGuard></PageTransition>} />
                <Route path="/profile/:userId/:attribute" element={<PageTransition><FeatureGuard title="PROFILE" subtitle="Profile is under construction and we'll let you know when done with it."><Profile /></FeatureGuard></PageTransition>} />
                <Route path="/profile" element={<PageTransition><FeatureGuard title="PROFILE" subtitle="Profile is under construction and we'll let you know when done with it."><Profile /></FeatureGuard></PageTransition>} />
                <Route path="/settings" element={<PageTransition><FeatureGuard title="SETTINGS" subtitle="Settings is under construction and we'll let you know when done with it."><SettingsPage /></FeatureGuard></PageTransition>} />
              </Route>

              {/* Public Routes */}
              <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />

              {/* Tournaments - Public for viewing, auth required for registration */}
              <Route path="/tournaments" element={<PageTransition><FeatureGuard title="TOURNAMENTS" subtitle="Tournaments is under construction and we'll let you know when done with it."><Tournaments /></FeatureGuard></PageTransition>} />

              {/* New Tournament Flow */}
              <Route path="/tournaments/match/:matchId" element={<PageTransition><MatchDetailPage /></PageTransition>} />
              <Route path="/tournaments/:gameId" element={<PageTransition><GamePage /></PageTransition>} />
              <Route path="/tournaments/:gameId/:categoryId" element={<PageTransition><EventsListPage /></PageTransition>} />
              <Route path="/leaderboard" element={<PageTransition><FeatureGuard title="LEADERBOARD" subtitle="Leaderboard is under construction and we'll let you know when done with it."><Leaderboard /></FeatureGuard></PageTransition>} />
              <Route path="/community" element={<PageTransition><FeatureGuard title="COMMUNITY" subtitle="Community is under construction and we'll let you know when done with it."><Community /></FeatureGuard></PageTransition>} />
              <Route path="/streams" element={<PageTransition><FeatureGuard title="LIVE STREAMS" subtitle="Live Streams is under construction and we'll let you know when done with it."><Live /></FeatureGuard></PageTransition>} />
              <Route path="/join" element={<PageTransition><FeatureGuard title="JOIN US" subtitle="Join Us is under construction and we'll let you know when done with it."><Join /></FeatureGuard></PageTransition>} />
              <Route path="/about" element={<PageTransition><FeatureGuard title="ABOUT US" subtitle="About Us is under construction and we'll let you know when done with it."><About /></FeatureGuard></PageTransition>} />
              <Route path="/login" element={<PageTransition><AuthPage /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><AuthPage /></PageTransition>} />
              <Route path="/live" element={<PageTransition><FeatureGuard title="LIVE" subtitle="Live is under construction and we'll let you know when done with it."><Live /></FeatureGuard></PageTransition>} />
              <Route path="/subscription" element={<PageTransition><Subscription /></PageTransition>} />
              <Route path="/coming-soon" element={<PageTransition><ComingSoon /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        {!isLockedPage && ((isAuthPage || isCheckoutPage || location.pathname === '/leaderboard') ? <MinimalFooter /> : <Footer />)}
      </div>
    </div>
  );
};

import { CartProvider } from './context/CartContext';
import ShoppingCart from './components/shop/ShoppingCart';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AnimatePresence mode="wait">
            {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} key="loader" />}
          </AnimatePresence>
          {!isLoading && (
            <SmoothScroll>
              <ShoppingCart />
              <MainLayout />
            </SmoothScroll>
          )}
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
