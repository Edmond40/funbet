import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import SportsSidebar from "@/components/SportsSidebar";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import SportPageLayout from "@/components/SportPageLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronDown, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useBets } from "@/hooks/useBets";

const EBasketball = () => {
  const { addBet } = useBets();
  const [activeSection, setActiveSection] = useState("Today Games");
  const [expandedCountries, setExpandedCountries] = useState(["Virtual Leagues"]);
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 35, checked: true },
    { id: "enba", name: "eNBA", count: 15, checked: true },
    { id: "euroleague", name: "eEuroLeague", count: 10, checked: true },
    { id: "ncaa", name: "eNCAA", count: 8, checked: true },
    { id: "fiba", name: "eFIBA", count: 2, checked: true }
  ]);
  
  const [countries, setCountries] = useState([
    { id: "virtual", name: "Virtual Leagues", count: 20, checked: true },
    { id: "usa", name: "United States", count: 8, checked: true },
    { id: "europe", name: "Europe", count: 5, checked: true },
    { id: "asia", name: "Asia", count: 2, checked: true }
  ]);
  
  const navigate = useNavigate();

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/ebasketball/${encodedLeague}`);
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
    // Navigate to filtered results or update view
  };

  const todayMatches = [
    {
      league: "eNBA Championship",
      date: "Today - 14:00",
      homeTeam: "eLakers",
      awayTeam: "eCeltics",
      odds: { home: "1.90", away: "1.90" }
    },
    {
      league: "eEuroLeague",
      date: "Today - 16:30",
      homeTeam: "eReal Madrid",
      awayTeam: "eBarcelona",
      odds: { home: "1.85", away: "1.95" }
    }
  ];

  const upcomingMatches = [
    {
      league: "eWorld Championship",
      date: "Tomorrow - 18:00",
      homeTeam: "eUSA",
      awayTeam: "eSpain",
      odds: { home: "1.75", away: "2.05" }
    }
  ];

  const outrightLeagues = {
    "Virtual Leagues": [
      { name: "eNBA Championship 2024", count: 30 },
      { name: "eEuroLeague Championship 2024", count: 18 },
      { name: "eWorld Basketball Championship 2024", count: 24 },
      { name: "eCollege Basketball Tournament 2024", count: 68 }
    ]
  };

  const toggleCountry = (country) => {
    setExpandedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const getCurrentMatches = () => {
    switch (activeSection) {
      case "Today Games": return todayMatches;
      case "Upcoming Games": return upcomingMatches;
      case "Outrights": return [];
      default: return todayMatches;
    }
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
                <h1 className="text-xl font-semibold">eBasketball</h1>
                <RotateCcw size={16} className="text-gray-500" />
              </div>
            </div>

            <div className="bg-gray-800 text-white mx-4 mt-4 rounded p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Live Betting</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">15</span>
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
                        {activeSection === "Today Games" ? "Today's eBasketball Matches" : "Upcoming eBasketball Games"}
                      </div>
                      {getCurrentMatches().map((match, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600">Every 8 mins</div>
                            <div className="font-medium text-sm">{match.homeTeam}</div>
                            <div className="font-medium text-sm">{match.awayTeam}</div>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                              onClick={() => addBet({ id: `${index}-1`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Match Winner', pick: match.homeTeam, odds: match.odds.home })}>
                              {match.odds.home}
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                              onClick={() => addBet({ id: `${index}-2`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Match Winner', pick: match.awayTeam, odds: match.odds.away })}>
                              {match.odds.away}
                            </Button>
                            <span className="text-gray-400 text-xs">+18</span>
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
          sportName="EBasketball"
          sportIcon={<span className="text-2xl">🏀</span>}
          leagues={leagues}
          countries={countries}
          onLeagueToggle={handleLeagueToggle}
          onCountryToggle={handleCountryToggle}
          onClearFilters={handleClearFilters}
          onViewResults={handleViewResults}
        >
          {/* EBasketball specific content */}
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
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">15</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">All Live</span>
                  <span className="text-green-400 font-medium">24/7</span>
                  <ChevronRight className="w-4 h-4 text-green-400" />
                </div>
              </button>
            </div>

            {/* Today's Matches */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Today's Games</h3>
              {todayMatches.map((match, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">{match.league} • {match.date}</div>
                    <div className="text-xs text-green-400">Every 8 mins</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white font-medium">{match.homeTeam}</div>
                      <div className="text-white font-medium">{match.awayTeam}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${index}-home`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: 'Moneyline', 
                          pick: match.homeTeam, 
                          odds: match.odds.home 
                        })}
                      >
                        {match.odds.home}
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${index}-away`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: 'Moneyline', 
                          pick: match.awayTeam, 
                          odds: match.odds.away 
                        })}
                      >
                        {match.odds.away}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+18</span>
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

export default EBasketball;
