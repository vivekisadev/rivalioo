import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, Heart, Minus, Plus,
    Facebook, Twitter, Link as LinkIcon,
    Loader2, Check, AlertCircle, CreditCard, Coins
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceMoney?: number;
    priceCredits?: number | null;
    image: string;
    type: string;
    features?: string[];
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
    const { user, userProfile } = useAuth();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Purchase Flow State
    const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [processingMethod, setProcessingMethod] = useState<'money' | 'credit' | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setPurchaseStatus('idle');
            setErrorMessage('');
            setQuantity(1);
            setProcessingMethod(null);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const handleClose = () => {
        onClose();
    };

    // Images logic
    const images = [
        product.image,
        product.image,
        product.image,
        product.image
    ];

    const features = product.features || [
        "Premium quality digital asset",
        "Instant delivery to inventory",
        "24/7 Support included"
    ];

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handlePurchase = async (method: 'money' | 'credit') => {
        if (!user) {
            navigate('/auth'); // Redirect to login
            return;
        }

        setProcessingMethod(method);
        setPurchaseStatus('processing');
        setErrorMessage('');

        try {
            // 1. Simulate Network Delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            const totalQuantity = quantity;

            if (method === 'credit') {
                const unitPrice = product.priceCredits || 0;
                const totalPrice = unitPrice * totalQuantity;
                const currentBalance = userProfile?.coin_balance || 0;

                // Check Balance
                if (currentBalance < totalPrice) {
                    throw new Error(`Insufficient Rival Coins (${totalPrice - currentBalance} more needed)`);
                }

                // Deduct balance logic would go here in a real app
            } else {
                // Cash transaction simulation
                // const unitPrice = product.priceMoney || 0;
                // const totalPrice = unitPrice * totalQuantity;
                // Simulate card processing...
            }

            // 4. Success
            setPurchaseStatus('success');

        } catch (error: any) {
            setPurchaseStatus('error');
            setErrorMessage(error.message || "Transaction Failed");
            setProcessingMethod(null);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f1219] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative flex flex-col md:flex-row my-auto max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Images */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 bg-[#13161c] flex flex-col gap-4 relative">
                                {/* Main Image */}
                                <div className="aspect-square w-full bg-[#1a1d26] rounded-xl flex items-center justify-center p-8 relative overflow-hidden group border border-white/5">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.title}
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Thumbnails */}
                                <div className="flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`w-16 h-16 shrink-0 bg-[#1a1d26] rounded-lg flex items-center justify-center p-2 border transition-all ${selectedImage === idx ? 'border-[#FF5E3A]' : 'border-transparent hover:border-white/20'}`}
                                        >
                                            <img src={img} alt={`View ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col text-left overflow-y-auto custom-scrollbar">
                                {/* Title - Simple yet impressive font style */}
                                <h2 className="text-3xl md:text-5xl font-sans font-black text-white mb-2 tracking-tight leading-none">
                                    {product.title}
                                </h2>
                                <p className="text-gray-400 font-medium text-sm uppercase tracking-widest mb-6">
                                    {product.subtitle}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={14} className="text-yellow-500 fill-yellow-500" />
                                    ))}
                                    <span className="text-gray-400 text-xs ml-2 font-bold uppercase tracking-wider">(128 Reviews)</span>
                                </div>

                                {/* Features */}
                                <div className="mb-8">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Item Features</h3>
                                    <ul className="space-y-3">
                                        {features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2FE9A9] shrink-0 shadow-[0_0_10px_#2FE9A9]"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* SUCCESS STATE OVERLAY */}
                                {purchaseStatus === 'success' ? (
                                    <div className="bg-[#2FE9A9]/10 border border-[#2FE9A9]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 mt-auto">
                                        <div className="w-16 h-16 bg-[#2FE9A9] rounded-full flex items-center justify-center text-black mb-4 shadow-[0_0_30px_rgba(47,233,169,0.4)]">
                                            <Check size={32} strokeWidth={3} />
                                        </div>
                                        <h3 className="text-2xl font-black text-white uppercase mb-2">Acquired!</h3>
                                        <p className="text-gray-300 text-sm max-w-xs mb-6">
                                            Successfully added to your inventory.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="px-8 py-3 bg-[#2FE9A9] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#25C48D] transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    /* PURCHASE ACTIONS */
                                    <div className="space-y-6 mt-auto">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center justify-between bg-[#151921] p-4 rounded-xl border border-white/5">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quantity</span>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleQuantityChange(-1)}
                                                    className="w-8 h-8 rounded bg-[#1A1D26] hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                                    disabled={purchaseStatus === 'processing'}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-lg font-black text-white w-4 text-center">{quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(1)}
                                                    className="w-8 h-8 rounded bg-[#1A1D26] hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                                                    disabled={purchaseStatus === 'processing'}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Dual Buy Buttons */}
                                        <div className="flex flex-col gap-3">
                                            {/* Cash Option */}
                                            {product.priceMoney && (
                                                <button
                                                    onClick={() => handlePurchase('money')}
                                                    disabled={purchaseStatus === 'processing'}
                                                    className={`w-full h-14 bg-[#2FE9A9] hover:bg-[#25C08C] disabled:opacity-70 disabled:cursor-not-allowed text-black font-black text-sm uppercase tracking-[0.15em] rounded-xl transition-all shadow-lg shadow-[#2FE9A9]/20 flex items-center justify-between px-6 group`}
                                                >
                                                    {processingMethod === 'money' ? (
                                                        <div className="mx-auto"><Loader2 size={24} className="animate-spin text-black" /></div>
                                                    ) : (
                                                        <>
                                                            <span className="flex items-center gap-2"><CreditCard size={18} /> Buy with Cash</span>
                                                            <span className="text-lg">₹{(product.priceMoney * quantity).toLocaleString('en-IN')}</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}

                                            {/* Credit/RC Option */}
                                            {(product.priceCredits !== undefined && product.priceCredits !== null) && (
                                                <button
                                                    onClick={() => handlePurchase('credit')}
                                                    disabled={purchaseStatus === 'processing'}
                                                    className={`w-full h-14 bg-[#1A1D26] border border-white/10 hover:border-[#FF5E3A] hover:bg-[#1A1D26] disabled:opacity-70 disabled:cursor-not-allowed text-white hover:text-[#FF5E3A] font-black text-sm uppercase tracking-[0.15em] rounded-xl transition-all flex items-center justify-between px-6 group`}
                                                >
                                                    {processingMethod === 'credit' ? (
                                                        <div className="mx-auto"><Loader2 size={24} className="animate-spin text-white" /></div>
                                                    ) : (
                                                        <>
                                                            <span className="flex items-center gap-2"><Coins size={18} /> Redeem with RC</span>
                                                            <span className="text-lg text-[#FF5E3A] group-hover:text-[#FF5E3A]">{(product.priceCredits * quantity).toLocaleString()} RC</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {/* Error Message */}
                                        {purchaseStatus === 'error' && (
                                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-sm font-bold">
                                                <AlertCircle size={18} className="shrink-0" />
                                                {errorMessage}
                                            </div>
                                        )}

                                        {/* Social Links */}
                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-gray-500">
                                                <button className="flex items-center gap-2 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">
                                                    <Heart size={14} /> Wishlist
                                                </button>
                                            </div>
                                            <div className="flex bg-[#151921] rounded-lg p-1">
                                                {[Facebook, Twitter, LinkIcon].map((Icon, i) => (
                                                    <button key={i} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 rounded transition-all">
                                                        <Icon size={14} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
