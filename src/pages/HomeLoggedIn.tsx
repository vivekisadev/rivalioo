import ActiveMatches from '../components/ActiveMatches';
import FeaturedTournaments from '../components/FeaturedTournaments';
import CreatorLive from '../components/CreatorLive';
import UpgradeSection from '../components/UpgradeSection';
import DashboardHero from '../components/DashboardHero'; // Import the new component

const HomeLoggedIn = () => {
    return (
        <div className="min-h-screen bg-[#0B0E14]">
            {/* New Dashboard Hero Section (Trending + Recent Activity) */}
            <DashboardHero />

            {/* Section 1: Active Matches */}
            <ActiveMatches showFilters={true} />

            {/* Section 2: Featured Tournaments */}
            <FeaturedTournaments />

            {/* Section 3: Creator Live */}
            <CreatorLive />

            {/* Section 4: Upgrade */}
            <UpgradeSection />
        </div>
    );
};

export default HomeLoggedIn;
