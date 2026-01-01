
import Hero from '../components/Hero';
import ActiveMatches from '../components/ActiveMatches';
import Roadmap from '../components/Roadmap';
import Marketplace from '../components/Marketplace';
import { Community } from '../components/Community';
import Pricing from '../components/Pricing';

const Home = () => {
    return (
        <>
            <Hero />
            <ActiveMatches />
            <Roadmap />
            <Marketplace />
            <Community />
            <Pricing />
        </>
    );
};

export default Home;
