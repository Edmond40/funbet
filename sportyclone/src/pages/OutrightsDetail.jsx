import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ArrowLeft, Home, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const OutrightsDetail = () => {
  const { league } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Outrights");
  const [timeFilter, setTimeFilter] = useState("All");
  const [showBetslip, setShowBetslip] = useState(false);
  const [betCount, setBetCount] = useState(0);
  const [selectedMarket] = useState("WNBA - Winner");

  // Listen for bet additions to update count
  useEffect(() => {
    const handleBetAdded = () => {
      setBetCount(prev => prev + 1);
    };

    window.addEventListener('add-bet', handleBetAdded);
    return () => window.removeEventListener('add-bet', handleBetAdded);
  }, []);
  
  const addBet = (detail) => {
    window.dispatchEvent(new CustomEvent('add-bet', { detail }));
  };

  // Sample data based on the league
  const getLeagueData = () => {
    const leagueName = decodeURIComponent(league || "");
    
    if (leagueName.includes("Premier League")) {
      return {
        title: "England Premier League",
        markets: [
          {
            name: "Premier League - Winner",
            options: [
              { team: "Liverpool FC", odds: "2.20" },
              { team: "Arsenal FC", odds: "7.00" },
              { team: "Manchester City", odds: "8.00" },
              { team: "Chelsea FC", odds: "13.00" },
              { team: "Tottenham Hotspur", odds: "50.00" },
              { team: "Manchester United", odds: "67.00" },
              { team: "Newcastle United", odds: "68.00" },
              { team: "AFC Bournemouth", odds: "251.00" }
            ]
          }
        ]
      };
    }
    
    if (leagueName.includes("Champions League")) {
      return {
        title: "UEFA Champions League",
        markets: [
          {
            name: "Champions League - Winner",
            options: [
              { team: "Manchester City", odds: "3.50" },
              { team: "Bayern Munich", odds: "5.00" },
              { team: "Real Madrid", odds: "6.00" },
              { team: "Barcelona", odds: "8.00" },
              { team: "Liverpool", odds: "9.00" },
              { team: "Arsenal", odds: "12.00" }
            ]
          }
        ]
      };
    }

    if (leagueName.includes("NBA") || leagueName.includes("WNBA")) {
      return {
        title: "WNBA 2025",
        markets: [
          {
            name: "WNBA - Winner",
            options: [
              { team: "Minnesota Lynx", odds: "1.63", locked: false },
              { team: "Las Vegas Aces", odds: "3.10", locked: false },
              { team: "Phoenix Mercury", odds: "9.05", locked: false },
              { team: "Indiana Fever", odds: "28.10", locked: false },
              { team: "Atlanta Dream", odds: "0.00", locked: true },
              { team: "New York Liberty", odds: "0.00", locked: true },
              { team: "Seattle Storm", odds: "0.00", locked: true },
              { team: "Golden State Valkyries", odds: "0.00", locked: true },
              { team: "Los Angeles Sparks", odds: "0.00", locked: true }
            ]
          }
        ]
      };
    }

    // Default data
    return {
      title: "Default League",
      markets: [
        {
          name: `${leagueName} - Winner`,
          options: [
            { team: "Team A", odds: "2.50" },
            { team: "Team B", odds: "3.00" },
            { team: "Team C", odds: "4.50" },
            { team: "Team D", odds: "8.00" }
          ]
        }
      ]
    };
  };

  const leagueData = getLeagueData();
  const timeFilters = ["1h", "3h", "6h", "24h", "All"];

  const sidebarLeagues = [
    { name: "Top Leagues", count: 356 },
    { name: "International", count: 7 },
    { name: "International Clubs", count: 57 },
    { name: "England", count: 107 },
    { name: "Spain", count: 91 },
    { name: "Germany", count: 59 },
    { name: "Italy", count: 85 },
    { name: "France", count: 48 },
    { name: "A-Z", count: 0 },
    { name: "Albania", count: 2 },
    { name: "Algeria", count: 9 }
  ];

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-100">
        <Header />
        <SportsNavigation />
        
        <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Outrights</h3>
            </div>
            
            {/* Filter by start time */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Filter by start time</h4>
              <div className="flex flex-wrap gap-1">
                {timeFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-2 py-1 text-xs rounded ${
                      timeFilter === filter
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Odds Filter */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-600">Odds Filter</h4>
                <button className="text-gray-400" title="Toggle odds filter">
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Leagues List */}
            <div className="space-y-1">
              {sidebarLeagues.map((league, index) => (
                <div key={index} className="flex items-center justify-between py-1 px-2 hover:bg-gray-50 cursor-pointer text-sm">
                  <span className={league.name === "Top Leagues" ? "font-medium" : ""}>{league.name}</span>
                  {league.count && <span className="text-gray-500">{league.count}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {/* Header with close button */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronDown size={16} className="text-gray-500" />
                <h1 className="text-lg font-semibold">{leagueData.title}</h1>
              </div>
              <button 
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-gray-100 rounded"
                title="Close and go back"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("Matches")}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "Matches"
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab("Outrights")}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === "Outrights"
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Outrights
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === "Outrights" && (
              <div className="space-y-6">
                {leagueData.markets.map((market, marketIndex) => (
                  <div key={marketIndex} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{market.name}</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Change ▼
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="space-y-2">
                        {market.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
                            <span className="font-medium text-sm">{option.team}</span>
                            {option.locked === true ? (
                              <div className="w-16 h-8 flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                                </svg>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm min-w-16"
                                onClick={() => addBet({
                                  id: `${marketIndex}-${optionIndex}`,
                                  event: market.name,
                                  market: 'Outright',
                                  pick: option.team,
                                  odds: option.odds
                                })}
                              >
                                {option.odds}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Matches" && (
              <div className="text-center py-8 text-gray-500">
                <p>No matches available for this league at the moment.</p>
              </div>
            )}
          </div>
        </div>

          {/* Right Sidebar - Betslip */}
          <UnifiedBetslip />
        </div>
        
        <Footer />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-gray-900 text-white min-h-screen">
        {/* Mobile Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} title="Go back">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">Outrights</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-white" />
            <button onClick={() => navigate('/')} title="Go home">
              <Home className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* League Header */}
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
          <button className="flex items-center space-x-2 text-white">
            <span className="font-medium">{leagueData.title}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Market Selection */}
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="mb-2">
            <span className="text-gray-400 text-sm">Select a Market Type</span>
          </div>
          <button className="w-full bg-gray-700 text-white px-4 py-3 rounded flex items-center justify-between">
            <span>{selectedMarket}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Teams List */}
        <div className="px-4 py-2">
          {leagueData.markets[0].options.map((option, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
              <span className="text-white font-medium">{option.team}</span>
              <div className="flex items-center">
                {option.locked === true ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                ) : (
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium min-w-16"
                    onClick={() => addBet({
                      id: `mobile-${index}`,
                      event: leagueData.markets[0].name,
                      market: 'Outright',
                      pick: option.team,
                      odds: option.odds
                    })}
                  >
                    {option.odds}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation 
          onOpenBetslip={() => setShowBetslip(true)}
        />
      </div>

      {/* Mobile Betslip Modal */}
      {showBetslip && (
        <UnifiedBetslip
          isOpen={showBetslip}
          onClose={() => setShowBetslip(false)}
          isMobile={true}
        />
      )}

      {/* Floating Betslip Button */}
      {!showBetslip && (
        <button
          className="lg:hidden fixed bottom-20 right-4 z-40 bg-white/10 backdrop-blur-md rounded-l-2xl px-3 py-2 flex flex-col items-center shadow-lg"
          onClick={() => setShowBetslip(true)}
          title="Open betslip"
        >
          <span className="bg-red-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-bold mb-1">
            {betCount}
          </span>
          <span className="text-xs font-semibold text-white">Betslip</span>
        </button>
      )}
    </>
  );
};

export default OutrightsDetail;