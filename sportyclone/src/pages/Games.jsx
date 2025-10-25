import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GamesHeader from "@/components/GamesHeader";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid2X2, Sparkles, Zap, SquareStack, RefreshCw, LayoutGrid, Gamepad2, Ticket, Users, Play, Star, Target, Dices, Calculator, Scissors, Building, Joystick, Tv, DollarSign, Search } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// CSS for vertical scrolling animation
const scrollUpStyle = `
  @keyframes scroll-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  
  .animate-scroll-up {
    animation: scroll-up 12s linear infinite;
  }
`;

const Games = () => {
  const games = useMemo(() => [
    { name: "Sporty Hero", image: "/api/placeholder/280/180", tag: "EXCLUSIVE", players: 810, cats: ["All Games", "Arcade", "Popular"] },
    { name: "Red Black", image: "/api/placeholder/280/180", tag: "POPULAR", players: 600, cats: ["All Games", "Card Games", "Popular"] },
    { name: "Sugar Dash", image: "/api/placeholder/280/180", tag: "NEW", players: 825, cats: ["All Games", "New", "Quick"] },
    { name: "Punch", image: "/api/placeholder/280/180", players: 1170, cats: ["All Games", "Crash", "Arcade"] },
    { name: "Rush", image: "/api/placeholder/280/180", players: 317, cats: ["All Games", "Crash"] },
    { name: "Sporty Kick", image: "/api/placeholder/280/180", players: 136, cats: ["All Games", "Quick", "Arcade"] },
    { name: "Spin da' Bottle", image: "/api/placeholder/280/180", tag: "NEW", players: 425, cats: ["All Games", "Quick", "Wheel"] },
    { name: "Flip Da' Coin", image: "/api/placeholder/280/180", players: 298, cats: ["All Games", "Quick"] },
    { name: "Fire Strike", image: "/api/placeholder/280/180", players: 567, cats: ["All Games", "Popular", "Slots"] },
    { name: "Roulette", image: "/api/placeholder/280/180", players: 234, cats: ["All Games", "Popular", "Table"] },
  ], []);

  const banners = [
    { text: "2***3 won GHS 1,052.00 in Sporty Jet", action: "Play" },
    { text: "0***7 won GHS 1,080.00 in Spin2Win", action: "Play" },
    { text: "5***1 won GHS 2,340.00 in Aviator", action: "Play" }
  ];

  // Auto-scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const { toast } = useToast();
  const [q, setQ] = useState("");
  const [showBetslip, setShowBetslip] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const categories = useMemo(() => [
    "All Games",
    "Popular", 
    "New",
    "Crash",
    "Quick",
    "Card Games",
    "Wheel",
    "Slots",
    "Dice",
    "Numbers",
    "Scratch",
    "Live Casino",
    "Table",
    "Arcade",
    "Lottery",
    "Multiplayer",
    "Virtuals",
    "Kash Drops",
  ], []);
  const [activeCat, setActiveCat] = useState(categories[0]);
  const iconMap = {
    "All Games": <Grid2X2 className="w-4 h-4" />,
    "Popular": <Star className="w-4 h-4" />,
    "New": <Sparkles className="w-4 h-4" />,
    "Crash": <Target className="w-4 h-4" />,
    "Quick": <Zap className="w-4 h-4" />,
    "Card Games": <SquareStack className="w-4 h-4" />,
    "Wheel": <RefreshCw className="w-4 h-4" />,
    "Slots": <Gamepad2 className="w-4 h-4" />,
    "Dice": <Dices className="w-4 h-4" />,
    "Numbers": <Calculator className="w-4 h-4" />,
    "Scratch": <Scissors className="w-4 h-4" />,
    "Live Casino": <Building className="w-4 h-4" />,
    "Table": <LayoutGrid className="w-4 h-4" />,
    "Arcade": <Joystick className="w-4 h-4" />,
    "Lottery": <Ticket className="w-4 h-4" />,
    "Multiplayer": <Users className="w-4 h-4" />,
    "Virtuals": <Tv className="w-4 h-4" />,
    "Kash Drops": <DollarSign className="w-4 h-4" />,
  };

  // Handle click outside for mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMobileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = games.filter(g => activeCat === "All Games" || g.cats.includes(activeCat));
    if (term) list = list.filter(g => g.name.toLowerCase().includes(term));
    return list;
  }, [q, games, activeCat]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Inject CSS for vertical scrolling animation */}
      <style>{scrollUpStyle}</style>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <Header />
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="w-64 bg-gray-800 min-h-screen">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4 text-green-400">Game Categories</h2>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCat(category)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCat === category
                        ? "bg-green-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {iconMap[category]}
                    <span className="text-sm font-medium">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Main Content */}
          <div className="flex-1">
            {/* Top Banner */}
            <div className="bg-green-600 px-6 py-3 flex items-center space-x-4">
              <Play className="w-5 h-5 text-white" />
              <div className="text-white text-sm">
                {banners[currentBannerIndex].text}
                <span className="bg-yellow-400 text-black px-2 py-1 rounded ml-2 text-xs font-bold">
                  {banners[currentBannerIndex].action}
                </span>
              </div>
            </div>

            {/* Search and Title */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{activeCat}</h1>
                <div className="w-80 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search for your favourite game"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Games Grid */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4">
                {filtered.map((game, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => toast({ title: "Launching game", description: game.name })}
                  >
                    <div className="relative">
                      <img src={game.image} alt={game.name} className="w-full h-40 object-cover" />
                      {game.tag && (
                        <span className="absolute top-2 left-2 text-xs bg-red-600 px-2 py-1 rounded text-white font-bold">
                          {game.tag}
                        </span>
                      )}
                      <span className="absolute top-2 right-2 text-xs bg-black/60 px-2 py-1 rounded text-white">
                        {game.players} players
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-white mb-2">{game.name}</h3>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Play
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Games Header with Authentication */}
        <GamesHeader />

        {/* Mobile Winner Banner - Vertical Carousel */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-4 py-3 relative overflow-hidden h-12">
          <div className="absolute inset-0 flex flex-col animate-scroll-up">
            {banners.map((banner, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm h-12 px-4 flex-shrink-0">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">🏆</span>
                </div>
                <div className="text-white">
                  <span className="font-medium">{banner.text}</span>
                  <span className="bg-yellow-400 text-black px-2 py-0.5 rounded ml-2 text-xs font-bold">
                    {banner.action} ▶
                  </span>
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {banners.map((banner, index) => (
              <div key={`duplicate-${index}`} className="flex items-center space-x-2 text-sm h-12 px-4 flex-shrink-0">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-bold">🏆</span>
                </div>
                <div className="text-white">
                  <span className="font-medium">{banner.text}</span>
                  <span className="bg-yellow-400 text-black px-2 py-0.5 rounded ml-2 text-xs font-bold">
                    {banner.action} ▶
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search and Home Dropdown */}
        <div className="px-4 py-4 flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search games"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-lg"
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <Button 
              size="sm" 
              className="bg-gray-800 text-white hover:bg-gray-700 flex items-center space-x-2"
              onClick={() => setShowMobileDropdown(!showMobileDropdown)}
            >
              {iconMap[activeCat]}
              <span>{activeCat}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            
            {/* Mobile Dropdown */}
            {showMobileDropdown && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCat(category);
                        setShowMobileDropdown(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCat === category
                          ? "bg-green-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {iconMap[category]}
                      <span className="text-sm">{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Games of the Week */}
        <div className="px-4 mb-6">
          <div className="bg-green-600 text-white px-3 py-1 rounded-t-lg inline-block">
            <span className="text-sm font-bold">GAMES OF THE WEEK</span>
          </div>
          <div className="bg-gray-800 rounded-b-lg rounded-tr-lg p-4 relative">
            <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
            </div>
            <div className="flex justify-center mt-3 space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile Top 6 Games in Ghana */}
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold mb-4">Top 6 Games in Ghana</h2>
          <div className="grid grid-cols-3 gap-3">
            {games.slice(0, 6).map((game, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img src={game.image} alt={game.name} className="w-full h-20 object-cover" />
                    <div className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index === 0 ? 'bg-red-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-bold text-white">{game.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Category Games */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{activeCat}</h2>
            <button className="text-green-400 text-sm">Show All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {filtered.slice(0, 6).map((game, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
                onClick={() => toast({ title: "Launching game", description: game.name })}
              >
                <div className="relative">
                  <img src={game.image} alt={game.name} className="w-full h-24 object-cover" />
                  {game.tag && (
                    <span className="absolute top-1 left-1 text-xs bg-red-600 px-2 py-0.5 rounded text-white font-bold">
                      {game.tag}
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-bold text-white">{game.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Betslip Modal */}
        {showBetslip && (
          <UnifiedBetslip
            isOpen={showBetslip}
            onClose={() => setShowBetslip(false)}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default Games;