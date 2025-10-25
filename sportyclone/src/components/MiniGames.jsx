import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MiniGames = () => {
  const navigate = useNavigate();
  const [hoveredGame, setHoveredGame] = useState(null);

  const miniGames = [
    {
      id: "spin-da-bottle",
      title: "Spin da Bottle",
      subtitle: "Win up to ₵1,000,000",
      background: "bg-gradient-to-br from-green-600 to-green-800",
      icon: "🍾",
      isNew: true,
      onClick: () => navigate("/games/spin-da-bottle")
    },
    {
      id: "sporty-hero",
      title: "Sporty Hero",
      subtitle: "Become a Legend",
      background: "bg-gradient-to-br from-red-600 to-red-800",
      icon: "🦸‍♂️",
      isNew: true,
      onClick: () => navigate("/sporty-hero")
    },
    {
      id: "ninja-crash",
      title: "Ninja Crash",
      subtitle: "Fast-paced Action",
      background: "bg-gradient-to-br from-purple-600 to-purple-800",
      icon: "🥷",
      isNew: true,
      onClick: () => navigate("/games/ninja-crash")
    },
    {
      id: "color-game",
      title: "Color Game",
      subtitle: "Guess the Color",
      background: "bg-gradient-to-br from-blue-600 to-blue-800",
      icon: "🎨",
      isNew: true,
      onClick: () => navigate("/games/color-game")
    }
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🎮</span>
          </div>
          <h3 className="font-semibold text-lg">Mini Games</h3>
          <span className="bg-red-500 text-white text-xs">HOT</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sporty-red hover:text-sporty-red-dark"
          onClick={() => navigate("/games")}
        >
          View All →
        </Button>
      </div>

      {/* Games Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {miniGames.map((game) => (
            <div
              key={game.id}
              className={`relative ${game.background} rounded-lg p-4 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}
              onClick={game.onClick}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {/* New Badge */}
              {game.isNew && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
              )}

              {/* Game Icon */}
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{game.icon}</div>
                <h4 className="text-white font-bold text-sm">{game.title}</h4>
                <p className="text-white/80 text-xs">{game.subtitle}</p>
              </div>

              {/* Play Button - Shows on hover */}
              <div className={`text-center transition-opacity duration-200 ${
                hoveredGame === game.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <Button 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs px-4"
                >
                  PLAY NOW
                </Button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/10 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Featured Game Banner */}
        <div className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">🎰 Lucky Slots</h4>
                <p className="text-sm opacity-90">Jackpot: ₵5,000,000</p>
              </div>
              <Button 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-6"
                onClick={() => navigate("/games/lucky-slots")}
              >
                SPIN
              </Button>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-green-600">1,247</div>
            <div className="text-xs text-gray-600">Players Online</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-600">₵2.5M</div>
            <div className="text-xs text-gray-600">Total Winnings</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-purple-600">156</div>
            <div className="text-xs text-gray-600">Games Played</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;
