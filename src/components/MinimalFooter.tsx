
import logoFull from '../assets/images/logo_full.png';

const MinimalFooter = () => {
    return (
        <footer className="w-full py-6 mt-32 text-center relative z-10 bg-transparent">
            <div className="container mx-auto px-6 flex items-center justify-center gap-6">
                <img src={logoFull} alt="RIVALLIO" className="h-5 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                <p className="text-gray-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} RIVALIO. All rights reserved.
                    <span className="mx-2 text-gray-700">|</span>
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <span className="mx-2 text-gray-700">|</span>
                    <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                    <span className="mx-2 text-gray-700">|</span>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default MinimalFooter;
