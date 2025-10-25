import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

const SportPageLayout = ({ sportName,
  children,
  leagues = [],
  countries = [],
  onLeagueToggle,
  onCountryToggle,
  onClearFilters
 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab] = useState("Today games");
  const [activeFilter, setActiveFilter] = useState("Top Leagues");
  const [activeTimeFilter, setActiveTimeFilter] = useState("Daily");
  const [activeDayFilter, setActiveDayFilter] = useState("Tuesday");

  // Sports navigation data
  const sportsNav = [
    { name: "Football", icon: "⚽", path: "/football" },
    { name: "vFootball", icon: "🎮", path: "/efootball" },
    { name: "Basketball", icon: "🏀", path: "/basketball" },
    { name: "Tennis", icon: "🎾", path: "/tennis" },
    { name: "eFootball", icon: "⚡", path: "/efootball" }
  ];

  const getTotalCount = () => {
    if (activeFilter === "Top Leagues") {
      return leagues.reduce((sum, l) => sum + (l.checked ? l.count : 0), 0);
    } else if (activeFilter === "Top Countries") {
      return countries.reduce((sum, c) => sum + (c.checked ? c.count : 0), 0);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-red-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate(-1)}
              className="text-white hover:text-gray-200"
              title="Go back to previous page"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Sports</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-6 h-6 text-white" />
            <button onClick={() => navigate('/')} title="Go to home page" aria-label="Go to home page">
              <Home className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Sports Navigation */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex space-x-6 overflow-x-auto">
          {sportsNav.map((sport) => (
            <button
              key={sport.name}
              onClick={() => navigate(sport.path)}
              className={`flex flex-col items-center min-w-0 ${
                location.pathname === sport.path
                  ? 'text-green-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <div className="text-2xl mb-1">{sport.icon}</div>
              <span className="text-xs font-medium whitespace-nowrap">{sport.name}</span>
              {location.pathname === sport.path && (
                <div className="w-full h-0.5 bg-green-400 mt-1 rounded"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Today games", count: 23, action: () => {
              const sportPath = sportName.toLowerCase().replace(/\s+/g, '-');
              navigate(`/matches?sport=${sportPath}`);
            }},
            { name: "Live", count: 2, action: () => navigate('/live-betting') },
            { name: `All ${sportName}`, count: 93, action: () => {
              const sportPath = sportName.toLowerCase().replace(/\s+/g, '-');
              navigate(`/matches?sport=${sportPath}`);
            }},
            { name: "Outrights", count: 17, action: () => {
              const sportPath = sportName.toLowerCase().replace(/\s+/g, '-');
              navigate(`/outrights?sport=${sportPath}`);
            }}
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={tab.action}
              className={`p-3 rounded border text-left ${
                activeTab === tab.name
                  ? 'border-green-400 bg-gray-700'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <span className="font-medium">{tab.name} </span>
              <span className="text-gray-400">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex space-x-4 mb-3">
          {["Daily", "Range"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveTimeFilter(filter)}
              className={`pb-2 ${
                activeTimeFilter === filter
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {activeTimeFilter === "Daily" && (
          <div className="flex space-x-2">
            {["Tuesday", "Wednesday", "Weekend"].map((day) => (
              <button
                key={day}
                onClick={() => setActiveDayFilter(day)}
                className={`px-4 py-2 rounded border text-sm ${
                  activeDayFilter === day
                    ? 'border-green-400 text-green-400'
                    : 'border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex space-x-6 mb-4">
          {["My Favourites", "Top Leagues", "Top Countries"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`pb-2 ${
                activeFilter === filter
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Filter Content */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activeFilter === "Top Leagues" && leagues.map((league) => (
            <div key={league.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-gray-400">⭐</span>
                </div>
                <span className="text-sm">{league.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{league.count}</span>
                <button
                  onClick={() => onLeagueToggle?.(league.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    league.checked
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-500 hover:border-gray-400'
                  }`}
                >
                  {league.checked && <span className="text-white text-xs">✓</span>}
                </button>
              </div>
            </div>
          ))}

          {activeFilter === "Top Countries" && countries.map((country) => (
            <div key={country.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-gray-400">🌍</span>
                </div>
                <span className="text-sm">{country.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">{country.count}</span>
                <button
                  onClick={() => onCountryToggle?.(country.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    country.checked
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-500 hover:border-gray-400'
                  }`}
                >
                  {country.checked && <span className="text-white text-xs">✓</span>}
                </button>
              </div>
            </div>
          ))}

          {activeFilter === "My Favourites" && (
            <div className="text-center py-8 text-gray-400">
              <p>No favourites added yet</p>
              <p className="text-sm mt-2">Add leagues to your favourites by clicking the star icon</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4">
          <button
            onClick={onClearFilters}
            className="flex-1 py-3 rounded border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => {
              const sportPath = sportName.toLowerCase().replace(/\s+/g, '-');
              navigate(`/matches?sport=${sportPath}`);
            }}
            className="flex-1 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            View ({getTotalCount()})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default SportPageLayout;
