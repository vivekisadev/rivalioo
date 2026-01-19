
import DashboardHero from '../components/DashboardHero';
import ActiveMatches from '../components/ActiveMatches';
import Marketplace from '../components/Marketplace';
import { Community } from '../components/Community';

const Home = () => {
    return (
        <>
            <DashboardHero />
            <ActiveMatches />
            <Marketplace />
            <Community />
        </>
    );
};

export default Home;
