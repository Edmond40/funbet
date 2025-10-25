import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import SportsSidebar from "@/components/SportsSidebar";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import SportPageLayout from "@/components/SportPageLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronDown, ChevronRight, Play } from "lucide-react";
import Footer from "@/components/Footer";
import { addBetToGlobal } from "@/utils/betUtils";

const Tennis = () => {
  const [activeSection, setActiveSection] = useState("Today Games");
  const [expandedCountries, setExpandedCountries] = useState(["International"]);
  const [, setBetCount] = useState(0);
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 45, checked: true },
    { id: "atp", name: "ATP Tour", count: 20, checked: true },
    { id: "wta", name: "WTA Tour", count: 15, checked: true },
    { id: "grand-slam", name: "Grand Slam", count: 8, checked: true },
    { id: "masters", name: "ATP Masters 1000", count: 2, checked: true }
  ]);
  
  const [countries, setCountries] = useState([
    { id: "usa", name: "United States", count: 15, checked: true },
    { id: "france", name: "France", count: 8, checked: true },
    { id: "uk", name: "United Kingdom", count: 6, checked: true },
    { id: "spain", name: "Spain", count: 5, checked: true },
    { id: "australia", name: "Australia", count: 4, checked: true }
  ]);
  
  const navigate = useNavigate();
  
  // Listen for bet additions to update count
  useEffect(() => {
    const handleBetAdded = () => {
      setBetCount(prev => prev + 1);
    };

    window.addEventListener('add-bet', handleBetAdded);
    return () => window.removeEventListener('add-bet', handleBetAdded);
  }, []);
  
  const addBet = addBetToGlobal;

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/tennis/${encodedLeague}`);
  };

  const handleLeagueToggle = (leagueId) => {
    setLeagues(prev => prev.map(league => 
      league.id === leagueId 
        ? { ...league, checked: !league.checked }
        : league
    ));
  };

  const handleCountryToggle = (countryId) => {
    setCountries(prev => prev.map(country => 
      country.id === countryId 
        ? { ...country, checked: !country.checked }
        : country
    ));
  };

  const handleClearFilters = () => {
    setLeagues(prev => prev.map(league => ({ ...league, checked: true })));
    setCountries(prev => prev.map(country => ({ ...country, checked: true })));
  };

  const handleViewResults = () => {
    const selectedLeagues = leagues.filter(l => l.checked);
    const selectedCountries = countries.filter(c => c.checked);
    console.log('Viewing results for:', { selectedLeagues, selectedCountries });
  };

  const matches = [
    {
      tournament: "ATP Masters 1000",
      date: "Today - 14:00",
      player1: "Novak Djokovic",
      player2: "Rafael Nadal",
      odds: { player1: "1.85", player2: "1.95" }
    },
    {
      tournament: "WTA 1000",
      date: "Today - 16:30",
      player1: "Iga Swiatek",
      player2: "Aryna Sabalenka",
      odds: { player1: "1.70", player2: "2.10" }
    },
    {
      tournament: "ATP 250",
      date: "Today - 18:00",
      player1: "Carlos Alcaraz",
      player2: "Stefanos Tsitsipas",
      odds: { player1: "1.60", player2: "2.30" }
    }
  ];

  const outrightLeagues = {
    "International": [
      { name: "ATP Finals 2024", count: 8 },
      { name: "WTA Finals 2024", count: 8 },
      { name: "Davis Cup 2024", count: 16 },
      { name: "Fed Cup 2024", count: 12 }
    ],
    "Grand Slams": [
      { name: "Australian Open 2025", count: 128 },
      { name: "French Open 2025", count: 128 },
      { name: "Wimbledon 2025", count: 128 },
      { name: "US Open 2025", count: 128 }
    ]
  };

  const toggleCountry = (country) => {
    setExpandedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-gray-100">
        <Header />
        <SportsNavigation />
        <div className="flex flex-row">
          <SportsSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="flex-1 bg-white">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Tennis</h1>
                <RotateCcw size={16} className="text-gray-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 text-white mx-4 mt-4 rounded p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Live Betting</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">26</span>
              </div>
            </div>

            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium text-base">{activeSection}</span>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {activeSection === "Outrights" ? (
                    <div className="space-y-2">
                      {Object.entries(outrightLeagues).map(([country, leagues]) => (
                        <div key={country} className="border-b border-gray-100 last:border-b-0">
                          <div 
                            className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleCountry(country)}
                          >
                            <div className="flex items-center gap-2">
                              {expandedCountries.includes(country) ? 
                                <ChevronDown size={16} className="text-gray-500" /> : 
                                <ChevronRight size={16} className="text-gray-500" />
                              }
                              <span className="font-medium text-green-600">{country}</span>
                            </div>
                          </div>
                          {expandedCountries.includes(country) && (
                            <div className="ml-6 space-y-1 pb-2">
                              {leagues.map((league, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer text-sm"
                                  onClick={() => handleLeagueClick(league.name)}
                                >
                                  <span>{league.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">{league.count}</span>
                                    <ChevronRight size={14} className="text-gray-400" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600 mb-3">
                        {activeSection === "Today Games" ? "Today - Live Matches" : "Upcoming Tournaments"}
                      </div>

                      {matches.map((match, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600">14:00</div>
                            <div className="font-medium text-sm">{match.player1}</div>
                            <div className="font-medium text-sm">{match.player2}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                              onClick={() => addBet({ id: `${index}-1`, event: `${match.player1} vs ${match.player2}`, market: 'Match Winner', pick: match.player1, odds: match.odds.player1 })}>
                              {match.odds.player1}
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                              onClick={() => addBet({ id: `${index}-2`, event: `${match.player1} vs ${match.player2}`, market: 'Match Winner', pick: match.player2, odds: match.odds.player2 })}>
                              {match.odds.player2}
                            </Button>
                            <span className="text-gray-400 text-xs">+15</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <UnifiedBetslip />
        </div>
        <Footer />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <SportPageLayout
          sportName="Tennis"
          sportIcon={<span className="text-2xl">🎾</span>}
          leagues={leagues}
          countries={countries}
          onLeagueToggle={handleLeagueToggle}
          onCountryToggle={handleCountryToggle}
          onClearFilters={handleClearFilters}
          onViewResults={handleViewResults}
        >
          <div className="px-4 py-3">
            {/* Live Betting Section */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <button 
                onClick={() => navigate('/live-betting')}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Live Betting</span>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">All Live</span>
                  <span className="text-green-400 font-medium">26</span>
                  <ChevronRight className="w-4 h-4 text-green-400" />
                </div>
              </button>
            </div>

            {/* Today's Matches */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Today's Games</h3>
              {matches.map((match, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">{match.tournament} • {match.date}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white font-medium">{match.player1}</div>
                      <div className="text-white font-medium">{match.player2}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${index}-player1`, 
                          event: `${match.player1} vs ${match.player2}`, 
                          market: 'Winner', 
                          pick: match.player1, 
                          odds: match.odds.player1 
                        })}
                      >
                        {match.odds.player1}
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${index}-player2`, 
                          event: `${match.player1} vs ${match.player2}`, 
                          market: 'Winner', 
                          pick: match.player2, 
                          odds: match.odds.player2 
                        })}
                      >
                        {match.odds.player2}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+15</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SportPageLayout>
      </div>
    </>
  );
};

export default Tennis;
