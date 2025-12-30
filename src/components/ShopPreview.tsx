import { motion } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    subtitle: string;
    price: string;
    image: string;
}

const products: Product[] = [
    {
        id: 1,
        name: 'Gamer Mouse',
        subtitle: 'Mouse',
        price: '22.69',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: '2022 world champs keyboard',
        subtitle: 'keyboard',
        price: '20.88',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'gaming warzone headset',
        subtitle: 'headset',
        price: '21.00',
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop'
    }
];

const ShopPreview = () => {
    return (
        <section className="space-y-4">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-gray-800 pb-3">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-1">
                        Shop
                    </h2>
                    <p className="text-gray-500 text-xs">
                        Fastest routes to victory
                    </p>
                </div>
                <button className="text-[#00D9FF] hover:text-[#00B8D4] font-medium text-xs uppercase tracking-wide transition-colors">
                    View All
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#1a1f2e] rounded-lg overflow-hidden border border-gray-800/50 hover:border-[#00D9FF]/30 transition-all group"
                    >
                        {/* Product Image */}
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="text-white font-semibold text-base capitalize leading-tight">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-xs mt-0.5 capitalize">
                                    {product.subtitle}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <div className="text-xl font-bold text-white">
                                    ${product.price}
                                </div>
                                <button className="px-5 py-2 bg-[#FF5E3A] hover:bg-[#FF4520] text-white font-bold text-xs uppercase tracking-wide transition-all rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ShopPreview;
