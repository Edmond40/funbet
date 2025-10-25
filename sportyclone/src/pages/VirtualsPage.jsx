import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, ChevronRight } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const VirtualsPage = () => {
  const navigate = useNavigate();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Winner notification carousel items
  const carouselItems = [
    { user: "ma*****124", amount: "GHS 41,743.84", game: "Instant Football" },
    { user: "jo*****567", amount: "GHS 28,456.92", game: "Instant Basketball" },
    { user: "sa*****890", amount: "GHS 15,234.67", game: "vFootball" },
    { user: "al*****345", amount: "GHS 52,891.23", game: "Instant Dog Racing" }
  ];

  // Virtual games data
  const virtualGames = {
    popular: [
      {
        id: 1,
        title: "Instant Football",
        image: "/api/placeholder/200/120",
        category: "POPULAR",
        bgColor: "from-red-800 to-red-900"
      },
      {
        id: 2,
        title: "vFootball",
        image: "/api/placeholder/200/120", 
        category: "POPULAR",
        bgColor: "from-blue-800 to-purple-900"
      }
    ],
    new: [
      {
        id: 3,
        title: "Instant Dog Racing",
        image: "/api/placeholder/200/120",
        category: "NEW", 
        bgColor: "from-blue-600 to-blue-800"
      },
      {
        id: 4,
        title: "Instant Basketball",
        image: "/api/placeholder/200/120",
        category: "NEW",
        bgColor: "from-orange-600 to-orange-800"
      }
    ],
    instant: [
      {
        id: 5,
        title: "SportySIM",
        image: "/api/placeholder/200/120",
        category: "INSTANT",
        bgColor: "from-yellow-600 to-yellow-800"
      },
      {
        id: 6,
        title: "Live Betting",
        image: "/api/placeholder/200/120",
        category: "INSTANT",
        bgColor: "from-red-600 to-red-800"
      }
    ]
  };

  const handleGameClick = (gameId, gameTitle) => {
    navigate(`/virtual-games/${gameId}`, { state: { gameTitle } });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(-1)} title="Go back">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Virtuals</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <button 
            onClick={() => navigate('/register')}
            className="text-white hover:text-gray-300"
          >
            Register
          </button>
          <span className="text-gray-400">|</span>
          <button 
            onClick={() => navigate('/login')}
            className="text-white hover:text-gray-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Winner Notification Carousel */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">
              {carouselItems[currentCarouselIndex].user} won {carouselItems[currentCarouselIndex].amount} in {carouselItems[currentCarouselIndex].game}.
            </span>
          </div>
          <button 
            onClick={() => navigate('/games')}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-1 rounded text-sm font-medium ml-2"
          >
            Play
          </button>
        </div>
      </div>

      {/* Play Now Section */}
      <div className="px-4 py-4">
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-white text-lg font-bold">PLAY NOW</h2>
          <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">?</span>
          </div>
        </div>

        {/* Popular Games */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">POPULAR</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {virtualGames.popular.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id, game.title)}
                className={`relative bg-gradient-to-br ${game.bgColor} rounded-lg overflow-hidden h-32 hover:opacity-90 transition-opacity`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative h-full flex flex-col justify-between p-3">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm mb-1">{game.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>Play</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* New Games */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">NEW</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {virtualGames.new.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id, game.title)}
                className={`relative bg-gradient-to-br ${game.bgColor} rounded-lg overflow-hidden h-32 hover:opacity-90 transition-opacity`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative h-full flex flex-col justify-between p-3">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm mb-1">{game.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>Play</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="space-y-4 mb-6">
          {/* Mobile App Promotion */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-4 flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm mb-1">Download SportyBet App</h3>
              <p className="text-white text-xs opacity-90">Get the best mobile experience</p>
            </div>
            <div className="w-16 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
          </div>

          {/* Dog Racing Promotion */}
          <div className="bg-gradient-to-r from-orange-600 to-red-700 rounded-lg p-4 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-white text-xs mb-1">INSTANT DOG RACING IS ON!</div>
              <div className="text-white font-bold text-sm mb-2">THE RACE NEVER STOPS</div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-xs font-medium">
                BET NOW
              </button>
            </div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Scheduled and Golden Virtuals */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/scheduled-virtuals')}
            className="relative bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg overflow-hidden h-24 hover:opacity-90 transition-opacity"
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex flex-col justify-between p-3">
              <div className="text-left">
                <h3 className="text-white font-bold text-xs mb-1">Scheduled Virtuals</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Play className="w-3 h-3" />
                  <span>Play</span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/golden-virtuals')}
            className="relative bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg overflow-hidden h-24 hover:opacity-90 transition-opacity"
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative h-full flex flex-col justify-between p-3">
              <div className="text-left">
                <h3 className="text-white font-bold text-xs mb-1">Golden Virtuals</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Play className="w-3 h-3" />
                  <span>Play</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Instant Games */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm font-medium">INSTANT</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {virtualGames.instant.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id, game.title)}
                className={`relative bg-gradient-to-br ${game.bgColor} rounded-lg overflow-hidden h-32 hover:opacity-90 transition-opacity`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative h-full flex flex-col justify-between p-3">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-sm mb-1">{game.title}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>Play</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onOpenBetslip={() => {}} />
    </div>
  );
};

export default VirtualsPage;
