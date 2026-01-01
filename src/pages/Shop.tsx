
import Marketplace from '../components/Marketplace';

const Shop = () => {
    return (
        <div className="min-h-screen bg-rival-dark">
            {/* Reusing the marketplace component for now, but in a full page context */}
            <Marketplace />
        </div>
    );
};

export default Shop;
