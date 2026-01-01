import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ShieldCheck, Lock, CreditCard, Wallet,
    CheckCircle2, ArrowLeft, Loader2,
    Globe, Mail, User, Building, MapPin, Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SecureCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        email: user?.email || '',
        name: '',
        address: '',
        city: '',
        zip: '',
        country: 'United States'
    });

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'upi'>('card');
    const [upiId, setUpiId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Get item from navigation state or URL params
        if (location.state?.item) {
            setItem(location.state.item);
            setLoading(false);
        } else {
            // Fallback or redirect if no item selected
            // In a real app we'd fetch the item by ID here
            // For now, if no item, redirect back
            if (!location.state?.item) {
                navigate('/topup');
            }
        }
    }, [location, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        setProcessing(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mock Success
        setProcessing(false);
        setCompleted(true);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#2FE9A9]" size={40} />
        </div>
    );

    if (completed) {
        return (
            <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-md w-full bg-[#151921] border border-[#2FE9A9]/20 rounded-2xl p-8 text-center"
                >
                    <div className="w-20 h-20 bg-[#2FE9A9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-[#2FE9A9]" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-white italic uppercase mb-2">Payment Successful!</h2>
                    <p className="text-gray-400 mb-8">
                        Your purchase of <span className="text-white font-bold">{item?.title}</span> has been confirmed.
                        Credits have been added to your account.
                    </p>
                    <button
                        onClick={() => navigate('/topup')}
                        className="w-full py-4 bg-[#2FE9A9] hover:bg-[#25C08C] text-black font-black uppercase tracking-wider rounded-xl transition-all"
                    >
                        Return to Store
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12 px-4 md:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: BILLING & PAYMENT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Secure Checkout</h1>
                            <div className="flex items-center gap-2 text-[#2FE9A9] text-sm font-bold bg-[#2FE9A9]/10 inline-flex px-3 py-1 rounded-full border border-[#2FE9A9]/20">
                                <ShieldCheck size={16} />
                                256-Bit SSL Encrypted
                            </div>
                        </div>

                        {/* Billing Details Form */}
                        <section className="glass-panel rounded-2xl p-6 md:p-8">
                            <h3 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-xs">1</div>
                                Billing Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                    <div className="relative">
                                        <input
                                            name="email" value={formData.email} onChange={handleInputChange}
                                            type="email" placeholder="you@example.com"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none transition-colors"
                                        />
                                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                    <div className="relative">
                                        <input
                                            name="name" value={formData.name} onChange={handleInputChange}
                                            type="text" placeholder="John Doe"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none transition-colors"
                                        />
                                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                                    <div className="relative">
                                        <input
                                            name="address" value={formData.address} onChange={handleInputChange}
                                            type="text" placeholder="123 Street Name"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none transition-colors"
                                        />
                                        <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                                    <div className="relative">
                                        <input
                                            name="city" value={formData.city} onChange={handleInputChange}
                                            type="text" placeholder="City"
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none transition-colors"
                                        />
                                        <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Country</label>
                                    <div className="relative">
                                        <select
                                            name="country" value={formData.country} onChange={handleInputChange}
                                            className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option>United States</option>
                                            <option>India</option>
                                            <option>United Kingdom</option>
                                            <option>Canada</option>
                                            <option>Australia</option>
                                        </select>
                                        <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className="glass-panel rounded-2xl p-6 md:p-8">
                            <h3 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-[#2FE9A9] text-black flex items-center justify-center text-xs">2</div>
                                Payment Method
                            </h3>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card'
                                        ? 'bg-[#2FE9A9]/10 border-[#2FE9A9] text-white'
                                        : 'bg-black/20 border-white/10 text-gray-500 hover:border-white/30'}`}
                                >
                                    <CreditCard size={24} className={paymentMethod === 'card' ? 'text-[#2FE9A9]' : ''} />
                                    <span className="font-bold text-sm">Card</span>
                                    {paymentMethod === 'card' && <div className="absolute top-2 right-2 text-[#2FE9A9]"><CheckCircle2 size={16} /></div>}
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'upi'
                                        ? 'bg-[#5F259F]/10 border-[#5F259F] text-white'
                                        : 'bg-black/20 border-white/10 text-gray-500 hover:border-white/30'}`}
                                >
                                    <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-[#5F259F]' : ''} />
                                    <span className="font-bold text-sm">UPI</span>
                                    {paymentMethod === 'upi' && <div className="absolute top-2 right-2 text-[#5F259F]"><CheckCircle2 size={16} /></div>}
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('paypal')}
                                    className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'paypal'
                                        ? 'bg-[#0070BA]/10 border-[#0070BA] text-white'
                                        : 'bg-black/20 border-white/10 text-gray-500 hover:border-white/30'}`}
                                >
                                    <Wallet size={24} className={paymentMethod === 'paypal' ? 'text-[#0070BA]' : ''} />
                                    <span className="font-bold text-sm">PayPal</span>
                                    {paymentMethod === 'paypal' && <div className="absolute top-2 right-2 text-[#0070BA]"><CheckCircle2 size={16} /></div>}
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text" placeholder="0000 0000 0000 0000"
                                                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none"
                                            />
                                            <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                                            <input
                                                type="text" placeholder="MM/YY"
                                                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 text-white focus:border-[#2FE9A9] focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">CVC</label>
                                            <div className="relative">
                                                <input
                                                    type="text" placeholder="123"
                                                    className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#2FE9A9] focus:outline-none"
                                                />
                                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">UPI ID</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                placeholder="yourname@paytm"
                                                className="w-full bg-[#0B0E14] border border-white/10 rounded-xl py-3 px-4 pl-10 text-white focus:border-[#5F259F] focus:outline-none"
                                            />
                                            <Smartphone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        </div>
                                    </div>

                                    <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-4">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-3">Popular UPI Apps</p>
                                        <div className="grid grid-cols-4 gap-3">
                                            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="w-10 h-10 bg-[#5F259F] rounded-lg flex items-center justify-center text-white font-bold text-xs">PhonePe</div>
                                                <span className="text-[10px] text-gray-500">PhonePe</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xs">GPay</div>
                                                <span className="text-[10px] text-gray-500">Google Pay</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="w-10 h-10 bg-[#00BAF2] rounded-lg flex items-center justify-center text-white font-bold text-xs">Paytm</div>
                                                <span className="text-[10px] text-gray-500">Paytm</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                <div className="w-10 h-10 bg-[#F37E20] rounded-lg flex items-center justify-center text-white font-bold text-xs">BHIM</div>
                                                <span className="text-[10px] text-gray-500">BHIM</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-[#5F259F]/10 border border-[#5F259F]/20 rounded-xl p-3 text-center">
                                        <p className="text-xs text-gray-400">Scan QR code or enter UPI ID to complete payment</p>
                                    </div>
                                </div>
                            )}

                        </section>
                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY */}
                    <div className="lg:col-span-1">
                        <section className="glass-panel rounded-2xl p-6 sticky top-24">
                            <h3 className="text-white font-bold uppercase tracking-wider mb-6">Order Summary</h3>

                            {item && (
                                <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                                    <div className="w-16 h-16 bg-[#0B0E14] rounded-lg border border-white/10 p-2 shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.type}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3 text-sm mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">{item?.price}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (10%)</span>
                                    {/* Mock tax calc */}
                                    <span className="text-white">₹{(parseInt(item?.price?.replace(/[^0-9]/g, '') || 0) * 0.1).toLocaleString()}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-white font-bold text-lg">Total</span>
                                    <span className="text-[#2FE9A9] font-black text-2xl">
                                        {item?.price}
                                        {/* Note: In real app, calculate total properly */}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full py-4 bg-[#2FE9A9] hover:bg-[#25C08C] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(47,233,169,0.3)] hover:shadow-[0_0_30px_rgba(47,233,169,0.6)] flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} /> Pay Securely
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                                <ShieldCheck size={12} />
                                Payments are secure and encrypted.
                            </p>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SecureCheckout;
