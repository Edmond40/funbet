import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Gamepad2, User, CircleDollarSign } from "lucide-react";
import { FaFutbol } from "react-icons/fa6";
import { useDarkMode } from '@/hooks/useDarkMode';
import { useBets } from "@/hooks/useBets";

const BottomNavigation = ({ onOpenBetslip  }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all-sports");
  const { isDarkMode } = useDarkMode();
  const { betCount } = useBets();

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/') {
      setActiveTab('all-sports');
    } else if (path === '/az-menu') {
      setActiveTab('az-menu');
    } else if (path === '/games') {
      setActiveTab('games');
    } else if (path === '/dashboard' || path === '/profile') {
      setActiveTab('me');
    } else {
      // For other pages, don't highlight any tab
      setActiveTab('');
    }
  }, [location.pathname]);

  const handleBottomNavigation = (tab) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'all-sports':
        navigate('/');
        break;
      case 'az-menu':
        navigate('/az-menu');
        break;
      case 'games':
        navigate('/games');
        break;
      case 'open-bets':
        if (onOpenBetslip) {
          onOpenBetslip();
        }
        break;
      case 'me':
        navigate('/dashboard');
        break;
    }
  };

  return (
    <div className={`lg:hidden fixed bg-black bottom-0 left-0 right-0 z-40 border-t`}>
      <div className="grid grid-cols-5 h-16">
        {/* All Sports */}
        <button
          className={`flex flex-col items-center justify-center text-gray-300 ${
            activeTab === 'all-sports' 
              ? 'text-white' 
              : isDarkMode ? 'text-gray-100' : 'text-gray-200'
          }`}
          onClick={() => handleBottomNavigation('all-sports')}
          title="All Sports"
        >
          <FaFutbol size={20}/>
          <span className={`text-xs font-medium transition-opacity duration-300 ${activeTab === 'all-sports' ? 'opacity-0' : 'opacity-100'}`}>All Sports</span>
          <hr className={`w-12 h-1 border-none  ${
            activeTab === 'all-sports' ? 'bg-red-500' : ''
          }`}/>
        </button>

        {/* AZ Menu */}
        <button
          className={`flex flex-col items-center justify-center text-gray-300 ${
            activeTab === 'az-menu' 
              ? 'text-white' 
              : isDarkMode ? 'text-gray-100' : 'text-gray-200'
          }`}
          onClick={() => handleBottomNavigation('az-menu')}
          title="A-Z Menu"
        >
          <Menu className="w-5 h-5" />
          <span className={`text-xs font-medium transition-opacity duration-300 ${activeTab === 'az-menu' ? 'opacity-0' : 'opacity-100'}`}>AZ Menu</span>
          <div className={`absolute bottom-0 w-12 h-1 rounded-full transition-colors duration-300 ${
            activeTab === 'az-menu' ? 'bg-red-500' : 'bg-transparent'
          }`} />
        </button>

        {/* Games */}
        <button
          className={`flex flex-col items-center justify-center text-gray-300  ${
            activeTab === 'games' 
              ? 'text-white' 
              : isDarkMode ? 'text-gray-100' : 'text-gray-200'
          }`}
          onClick={() => handleBottomNavigation('games')}
          title="Games"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className={`text-xs font-medium transition-opacity duration-300 ${activeTab === 'games' ? 'opacity-0' : 'opacity-100'}`}>Games</span>
          <hr className={`w-12 h-1 border-none  ${
            activeTab === 'games' ? 'bg-red-500' : ''
          }`}/>
        </button>

        {/* Open Bets */}
        <button
          className={`flex flex-col items-center justify-center text-gray-300  relative ${
            activeTab === 'open-bets' 
              ? 'text-white' 
              : isDarkMode ? 'text-gray-100' : 'text-gray-200'
          }`}
          onClick={() => handleBottomNavigation('open-bets')}
          title="Open Bets"
        >
          <div className="relative">
            <CircleDollarSign/>
            {betCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {betCount > 99 ? '99+' : betCount}
              </div>
            )}
          </div>
          <span className={`text-xs font-medium transition-opacity duration-300 ${activeTab === 'open-bets' ? 'opacity-0' : 'opacity-100'}`}>Open Bets</span>
          <hr className={`w-12 h-1 border-none  ${
            activeTab === 'open-bets' ? 'bg-red-500' : ''
          }`}/>
        </button>

        {/* Me */}
        <button
          className={`flex flex-col items-center justify-center text-gray-300  ${
            activeTab === 'me' 
              ? 'text-white' 
              : isDarkMode ? 'text-gray-100' : 'text-gray-200'
          }`}
          onClick={() => handleBottomNavigation('me')}
          title="Profile"
        >
          <User className="w-5 h-5" />
          <span className={`text-xs font-medium transition-opacity duration-300 ${activeTab === 'me' ? 'opacity-0' : 'opacity-100'}`}>Me</span>
          <hr className={`w-12 h-1 border-none  ${
            activeTab === 'me' ? 'bg-red-500' : ''
          }`}/>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
