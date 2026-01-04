import { motion } from 'framer-motion';
import SubscriptionPlans from '../components/SubscriptionPlans';

const Subscription = () => {
    return (
        <div className="pt-20 min-h-screen bg-[#0B0E14]">
            {/* Header Section */}
            <section className="relative py-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#2FE9A9]/5 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase mb-6 tracking-tight">
                        Upgrade Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E3A] to-[#FF8C69]">Legacy</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Get the edge you need to dominate the competition. Choose a plan that fits your ambition and start earning more today.
                    </p>
                </motion.div>
            </section>

            {/* Plans Component */}
            <SubscriptionPlans />

            {/* FAQ or Extra Info could go here */}
        </div>
    );
};

export default Subscription;
