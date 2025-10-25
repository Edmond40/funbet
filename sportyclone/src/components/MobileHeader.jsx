import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchModal from "@/components/SearchModal";
import Logo from '../assets/logo-sportybet.webp';
import AuthModal from './AuthModal';

const MobileHeader = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const handleAuthAction = (action) => {
        setAuthMode(action === 'join' ? 'register' : 'login');
        setShowAuthModal(true);
    };

    return (
        <>
            <header className="bg-red-600 text-white px-4  lg:hidden">
                <div className="flex items-center justify-between">
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="SportyBet"
                            className="w-24 h-14 object-cover"
                        />
                    </Link>
                    <div className="flex items-center space-x-3">
                        <Search className="w-5 h-5 cursor-pointer" onClick={() => setShowSearchModal(true)} />
                        <button className="bg-white text-red-600 hover:bg-gray-100 text-xs px-3 py-1" onClick={() => handleAuthAction('join')}>
                            Join Now
                        </button>
                        <button type="submit" className="border px-4 py-1 rounded text-sm font-medium" onClick={() => handleAuthAction('login')}>
                            Log In
                        </button>
                    </div>
                </div>
            </header>

            {/* Modals - Shared between desktop and mobile */}
            <SearchModal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
            />

            <AuthModal
                open={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                mode={authMode}
                onSwitchMode={(mode) => setAuthMode(mode)}
            />
        </>
    );
};

export default MobileHeader;
