import { useState, useEffect } from "react";
import { Search, X, Clock, TrendingUp, Star } from "lucide-react";

const SearchModal = ({ isOpen, onClose  }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([
    "Arsenal vs Chelsea",
    "Premier League",
    "Basketball",
    "Live Football"
  ]);

  const trendingSearches = [
    "Champions League",
    "Manchester United",
    "NBA Finals",
    "Tennis Wimbledon",
    "World Cup",
    "La Liga"
  ];

  const quickCategories = [
    { name: "Football", icon: "⚽", path: "/football" },
    { name: "Basketball", icon: "🏀", path: "/basketball" },
    { name: "Tennis", icon: "🎾", path: "/tennis" },
    { name: "Live Betting", icon: "🔴", path: "/live" },
    { name: "Virtual Sports", icon: "🎮", path: "/virtuals" },
    { name: "Casino Games", icon: "🎰", path: "/games" }
  ];

  const searchResults = [
    {
      type: "match",
      title: "Arsenal vs Chelsea",
      subtitle: "Premier League • Today 15:30",
      odds: "2.10 - 3.40 - 3.20"
    },
    {
      type: "league",
      title: "Premier League",
      subtitle: "English Football • 20 teams",
      matches: "15 live matches"
    },
    {
      type: "team",
      title: "Arsenal FC",
      subtitle: "Premier League • England",
      info: "Next match: vs Chelsea"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (term) => {
    if (term.trim()) {
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [term, ...prev.filter(item => item !== term)].slice(0, 5);
        return newHistory;
      });
      
      console.log(`Searching for: ${term}`);
      // Add search logic here
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                placeholder="Search sports, teams, leagues..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sporty-red"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close search"
              title="Close search"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Search Results */}
          {searchTerm && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Search Results</h3>
              <div className="space-y-3">
                {searchResults
                  .filter(result => 
                    result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    result.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(result.title)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{result.title}</div>
                          <div className="text-sm text-gray-600">{result.subtitle}</div>
                        </div>
                        <div className="text-sm text-sporty-red font-medium">
                          {result.odds || result.matches || result.info}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Quick Categories */}
          {!searchTerm && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Access</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log(`Navigate to ${category.path}`);
                      onClose();
                    }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {!searchTerm && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(trend);
                      handleSearch(trend);
                    }}
                    className="px-3 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search History */}
          {!searchTerm && searchHistory.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  Recent Searches
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-sm text-sporty-red hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(item);
                      handleSearch(item);
                    }}
                    className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800">{item}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchHistory(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                      aria-label={`Remove ${item} from search history`}
                      title={`Remove ${item} from search history`}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Teams */}
          {!searchTerm && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Popular Teams
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Manchester United", league: "Premier League", logo: "🔴" },
                  { name: "Real Madrid", league: "La Liga", logo: "⚪" },
                  { name: "Barcelona", league: "La Liga", logo: "🔵" },
                  { name: "Bayern Munich", league: "Bundesliga", logo: "🔴" },
                  { name: "Liverpool", league: "Premier League", logo: "🔴" }
                ].map((team, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(team.name)}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-xl">{team.logo}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{team.name}</div>
                      <div className="text-sm text-gray-600">{team.league}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
