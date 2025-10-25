import { useState } from "react";
import { X, Grid3X3, Calendar, Gamepad2, Tv, Rocket, Plane, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Coins, Clock, Target, Zap, Trophy, Star, Users, MonitorPlay, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Shortcuts = ({ isOpen, onClose  }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Sports");
  const [homeShortcuts] = useState([
    { icon: Grid3X3, name: "All Sports", path: "/sports" },
    { icon: Tv, name: "Live", path: "/live" },
    { icon: Tv, name: "Sporty Hero", path: "/sporty-hero" },
    { icon: Tv, name: "Aviator", path: "/aviator" },
    { icon: Tv, name: "Virtuals", path: "/virtuals" }
  ]);

  const recentItems = [
    { icon: Tv, name: "Sporty Hero", path: "/sporty-hero" },
    { icon: Grid3X3, name: "All Sports", path: "/sports" }
  ];

  const categories = {
    Sports: [
      { icon: Grid3X3, name: "All Sports", path: "/sports" },
      { icon: Tv, name: "Live", path: "/live" },
      { icon: Tv, name: "Jackpot", path: "/jackpot" },
      { icon: Gamepad2, name: "Basketball", path: "/basketball" },
      { icon: Tv, name: "Tennis", path: "/tennis" },
      { icon: Tv, name: "Table Tennis", path: "/table-tennis" },
      { icon: Tv, name: "American Football", path: "/american-football" },
      { icon: Tv, name: "Ice Hockey", path: "/ice-hockey" },
      { icon: Tv, name: "Volleyball", path: "/volleyball" },
      { icon: Tv, name: "Beach Volleyball", path: "/beach-volleyball" },
      { icon: Tv, name: "Handball", path: "/handball" },
      { icon: Gamepad2, name: "Baseball", path: "/baseball" },
      { icon: Tv, name: "Badminton", path: "/badminton" },
      { icon: Tv, name: "Rugby", path: "/rugby" },
      { icon: Tv, name: "Futsal", path: "/futsal" },
      { icon: Tv, name: "Cricket", path: "/cricket" },
      { icon: Tv, name: "Boxing", path: "/boxing" },
      { icon: Gamepad2, name: "Snooker", path: "/snooker" },
      { icon: Tv, name: "MMA", path: "/mma" },
      { icon: Tv, name: "Darts", path: "/darts" },
      { icon: Tv, name: "Basketball 3x3", path: "/basketball-3x3" },
      { icon: Tv, name: "eFootball", path: "/efootball" },
      { icon: Tv, name: "LoL", path: "/lol" },
      { icon: Tv, name: "Counter-Strike", path: "/counter-strike" },
      { icon: Gamepad2, name: "Dota2", path: "/dota2" },
      { icon: Tv, name: "SportySIM", path: "/sportysim" }
    ],
    Games: [
      { icon: Tv, name: "Sporty Hero", path: "/sporty-hero" },
      { icon: Tv, name: "Aviator", path: "/aviator" },
      { icon: Gamepad2, name: "Games", path: "/games" },
      { icon: Dice1, name: "Spin2Win", path: "/spin2win" },
      { icon: Dice2, name: "Even Odd", path: "/even-odd" },
      { icon: Dice3, name: "Blackjack", path: "/blackjack" },
      { icon: Dice4, name: "Fruit Hunt", path: "/fruit-hunt" },
      { icon: Dice5, name: "Sporty Jet", path: "/sporty-jet" },
      { icon: Dice6, name: "Galaxy GO", path: "/galaxy-go" },
      { icon: Tv, name: "Mayan Ancient", path: "/mayan-ancient" },
      { icon: Tv, name: "AstroX", path: "/astrox" },
      { icon: Tv, name: "Wheel and Deal", path: "/wheel-and-deal" },
      { icon: Tv, name: "Rush", path: "/rush" },
      { icon: Tv, name: "Flip Da Coin", path: "/flip-da-coin" },
      { icon: Tv, name: "Ping Pong", path: "/ping-pong" },
      { icon: Tv, name: "Pocket Rockets", path: "/pocket-rockets" },
      { icon: Tv, name: "Spin Da Bottle", path: "/spin-da-bottle" },
      { icon: Gamepad2, name: "Sporty Kick", path: "/sporty-kick" },
      { icon: Dice1, name: "Sugar Dash", path: "/sugar-dash" }
    ],
    Virtuals: [
      { icon: Tv, name: "Virtuals", path: "/virtuals" },
      { icon: Tv, name: "Instant Virtuals", path: "/instant-virtuals" },
      { icon: Tv, name: "Golden Virtuals", path: "/golden-virtuals" },
      { icon: Tv, name: "Scheduled Virtuals", path: "/scheduled-virtuals" },
      { icon: Gamepad2, name: "vFootball", path: "/vfootball" },
      { icon: Tv, name: "Instant Basketball", path: "/instant-basketball" },
      { icon: Tv, name: "Instant Dog Racing", path: "/instant-dog-racing" }
    ],
    Media: [
      { icon: Tv, name: "SportyTV 24/7", path: "/sportytv" },
      { icon: Tv, name: "Sporty News", path: "/sporty-news" }
    ],
    Others: []
  };

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleEditShortcuts = () => {
    console.log("Edit shortcuts");
    // Add edit functionality here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-800 h-full overflow-y-auto text-white">
        {/* Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold">Shortcuts</h1>
          <button 
            onClick={onClose} 
            className="p-1"
            aria-label="Close shortcuts"
            title="Close shortcuts"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          {/* Home Shortcuts */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-medium">Home Shortcuts</h2>
              <button 
                onClick={handleEditShortcuts}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {homeShortcuts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.path)}
                  className="flex flex-col items-center space-y-1 p-2 min-w-[60px]"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-300 text-center">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recents */}
          <div className="mb-6">
            <h2 className="text-white font-medium mb-3">Recents</h2>
            <div className="flex space-x-3">
              {recentItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.path)}
                  className="flex flex-col items-center space-y-1 p-2"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-300">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap ${
                  activeTab === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Content */}
          <div className="mb-6">
            <h2 className="text-white font-medium mb-3">{activeTab}</h2>
            <div className="grid grid-cols-5 gap-4">
              {categories[activeTab].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.path)}
                  className="flex flex-col items-center space-y-2 p-3 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-300 text-center leading-tight">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shortcuts;
