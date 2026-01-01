import { useSearchParams } from 'react-router-dom';
import SubscriptionPlans from '../components/SubscriptionPlans';

const Subscription = () => {
    const [searchParams] = useSearchParams();
    const isUpgradeMode = searchParams.get('mode') === 'upgrade';

    return (
        <div className="pt-20 min-h-screen bg-transparent">
            {/* Plans Component with Dynamic Title */}
            <SubscriptionPlans
                title={isUpgradeMode ? "Upgrade Your Plan" : "Simple Pricing"}
                subtitle="Simple pricing with powerful features, cancel anytime."
            />

            {/* FAQ or Extra Info could go here */}
        </div>
    );
};



export default Subscription;
