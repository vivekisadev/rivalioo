import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRef } from 'react';
import { ImageZoom, Image } from '../ui/imagezoom';


// --- MAIN COMPONENT ---

interface Product {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    priceMoney?: number; // INR
    priceCredits?: number | null; // Credits
    image: string;
    type: string;
    features?: string[];
    description?: string;
}

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {

    const { addItem } = useCart();

    // State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState('default');




    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isOpen]);

    if (!product) return null;

    // Derived Images
    const images = [
        product.image,
        product.image,
        product.image
    ];

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleAddToCart = () => {
        addItem({
            id: product.id.toString(),
            name: product.title,
            image: product.image,
            price: product.priceCredits || 0,
            quantity: 1,
            currency: 'Credits',
            type: 'product'
        });
        onClose();
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center cursor-default" data-lenis-prevent>

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto relative w-full h-[85vh] md:h-[75vh] max-w-4xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row mx-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-white/10 text-white rounded-full backdrop-blur-md transition-all border border-white/5"
                        >
                            <X size={18} />
                        </button>

                        {/* Left: Image Carousel */}
                        <div className="w-full md:w-1/2 h-[40%] md:h-full bg-black/40 relative group border-b md:border-b-0 md:border-r border-white/5">
                            {product.type === 'Currency' ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-b from-[#151921] to-[#0B0E14]">
                                    <div className="absolute inset-0 bg-[#2FE9A9]/5"></div>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-32 h-32 object-contain mb-6 drop-shadow-[0_0_25px_rgba(47,233,169,0.3)] animate-pulse"
                                        style={{ animationDuration: '3s' }}
                                    />
                                    <div className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-shadow-glow flex items-baseline gap-2">
                                        <span>{product.title.replace(/\D/g, '')}</span>
                                        <span className="text-[#2FE9A9] text-sm font-bold tracking-widest uppercase mb-1">Coins</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentImageIndex}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full h-full flex items-center justify-center"
                                            >
                                                <ImageZoom
                                                    zoomScale={2}
                                                    className="rounded-lg" // Optional styling
                                                    width="100%"
                                                    height="100%"
                                                >
                                                    <Image
                                                        src={images[currentImageIndex]}
                                                        alt={product.title}
                                                        objectFit="contain"
                                                        className="filter drop-shadow-2xl"
                                                    />
                                                </ImageZoom>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/30 hover:bg-white/50'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right: Details Form */}
                        <div className="w-full md:w-1/2 h-[60%] md:h-full flex flex-col bg-transparent">
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                                {/* Header */}
                                <div className="mb-6">
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 leading-tight">{product.title}</h2>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{product.subtitle}</p>
                                </div>

                                {/* Price - ONLY CREDITS */}
                                <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3 text-xl font-bold">
                                        <span className="text-[#2FE9A9] text-2xl bg-[#2FE9A9]/10 px-3 py-2 rounded-md border border-[#2FE9A9]/30">{product.priceCredits?.toLocaleString()} CR</span>
                                    </div>
                                </div>

                                {/* Options */}
                                <div className="space-y-6 mb-8">
                                    {/* Variant Selection */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Variant</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Default', 'Premium', 'Gold'].map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setSelectedColor(opt)}
                                                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${selectedColor === opt
                                                        ? 'bg-white text-black border-white'
                                                        : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-2">
                                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Includes</h3>
                                        <ul className="space-y-1.5">
                                            {(product.features || ['Instant Delivery', 'Global Key', '24/7 Support']).map((feat, i) => (
                                                <li key={i} className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                                                    <Check size={12} className="text-[#2FE9A9]" /> {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 h-10 bg-[#2FE9A9] hover:bg-[#25C48D] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2FE9A9]/20"
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="h-10 w-10 border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                                        <Heart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ProductQuickView;
