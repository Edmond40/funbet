import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchModal from "@/components/SearchModal";
import AuthModal from './AuthModal';

const GamesHeader = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const handleAuthAction = (action) => {
        setAuthMode(action === 'join' ? 'register' : 'login');
        setShowAuthModal(true);
    };

    return (
        <>
            <header className="bg-red-600 px-4 py-3 lg:hidden">
                <div className="flex items-center justify-between">
                    <Link to="/games">
                        <div className="flex items-center">
                            <span className="text-white font-bold text-xl">Sporty</span>
                            <span className="bg-white text-red-600 px-2 py-1 rounded ml-1 font-bold text-sm">GAMES</span>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-3">
                        <Search className="w-5 h-5 cursor-pointer" onClick={() => setShowSearchModal(true)} />
                        <button 
                            className="bg-white text-red-600 hover:bg-gray-100 text-xs px-3 py-2 rounded font-medium"
                            onClick={() => handleAuthAction('join')}
                        >
                            Join Now
                        </button>
                        <button 
                            className="border border-white text-white hover:bg-white hover:text-red-600 text-xs px-4 py-2 rounded font-medium transition-colors"
                            onClick={() => handleAuthAction('login')}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </header>

            {/* Modals */}
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

export default GamesHeader;
