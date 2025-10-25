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
import BottomNavigation from "@/components/BottomNavigation";
import { useBets } from "@/hooks/useBets";

const Football = () => {
  const { addBet } = useBets();
  const [activeSection, setActiveSection] = useState("Today Games");
  const [expandedCountries, setExpandedCountries] = useState(["England"]);
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 125, checked: true },
    { id: "premier-league", name: "Premier League", count: 20, checked: true },
    { id: "champions-league", name: "Champions League", count: 32, checked: true },
    { id: "europa-league", name: "Europa League", count: 32, checked: true },
    { id: "laliga", name: "LaLiga", count: 20, checked: true },
    { id: "bundesliga", name: "Bundesliga", count: 18, checked: true }
  ]);
  
  const [countries, setCountries] = useState([
    { id: "england", name: "England", count: 45, checked: true },
    { id: "spain", name: "Spain", count: 25, checked: true },
    { id: "germany", name: "Germany", count: 22, checked: true },
    { id: "italy", name: "Italy", count: 18, checked: true },
    { id: "france", name: "France", count: 15, checked: true }
  ]);
  
  const navigate = useNavigate();

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/football/${encodedLeague}`);
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
      id: "36001",
      league: "Italy - Serie A",
      date: "21/09 Sunday",
      time: "10:30",
      homeTeam: "Lazio",
      awayTeam: "Roma",
      odds: { home: "3.05", draw: "3.19", away: "2.64" },
      matchId: "+1207",
      badges: ["BEST ODDS"],
      isLive: false
    },
    {
      id: "32997",
      league: "Spain - LaLiga",
      date: "21/09 Sunday",
      time: "12:00",
      homeTeam: "Rayo Vallecano",
      awayTeam: "Celta",
      odds: { home: "2.32", draw: "3.40", away: "3.39" },
      matchId: "+1254",
      badges: ["BEST ODDS"],
      isLive: false
    },
    {
      id: "21829",
      league: "England - Premier League",
      date: "21/09 Sunday",
      time: "13:00",
      homeTeam: "Bournemouth",
      awayTeam: "Newcastle",
      odds: { home: "2.44", draw: "3.59", away: "3.02" },
      matchId: "+1280",
      badges: ["HOT", "BEST ODDS"],
      isLive: false
    },
    {
      id: "36578",
      league: "England - Premier League",
      date: "21/09 Sunday",
      time: "13:00",
      homeTeam: "Sunderland AFC",
      awayTeam: "Aston Villa",
      odds: { home: "3.59", draw: "3.37", away: "2.25" },
      matchId: "+1213",
      badges: ["BEST ODDS"],
      isLive: false
    }
  ];

  const upcomingMatches = [
    {
      league: "Champions League",
      date: "Tomorrow - 20:00",
      homeTeam: "Bayern Munich",
      awayTeam: "Paris Saint-Germain",
      odds: { home: "1.95", draw: "3.50", away: "3.80" }
    },
    {
      league: "Premier League",
      date: "Sunday - 16:30",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      odds: { home: "2.40", draw: "3.20", away: "2.90" }
    },
    {
      league: "Bundesliga",
      date: "Saturday - 15:30",
      homeTeam: "Borussia Dortmund",
      awayTeam: "RB Leipzig",
      odds: { home: "2.05", draw: "3.40", away: "3.50" }
    }
  ];

  const outrightLeagues = {
    "England": [
      { name: "Premier League 25/26", count: 20 },
      { name: "EFL Cup 25/26", count: 92 },
      { name: "FA Cup 25/26", count: 124 },
      { name: "League One 25/26", count: 24 },
      { name: "League Two 25/26", count: 24 },
      { name: "National League 25/26", count: 24 },
      { name: "EFL Trophy 25/26", count: 64 }
    ],
    "Germany": [
      { name: "DFB Pokal 25/26", count: 64 }
    ],
    "International": [
      { name: "Africa Cup of Nations 2025", count: 24 },
      { name: "FIFA World Cup Qualification UEFA 2026", count: 55 },
      { name: "World Cup 2026", count: 48 },
      { name: "Ballon dor 2025", count: 30 }
    ],
    "International Clubs": [
      { name: "UEFA Champions League 25/26", count: 32 },
      { name: "UEFA Europa League 25/26", count: 32 },
      { name: "UEFA Conference League 25/26", count: 32 }
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
      case "Today Games":
        return todayMatches;
      case "Upcoming Games":
        return upcomingMatches;
      case "Outrights":
        return [];
      default:
        return todayMatches;
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
                <h1 className="text-xl font-semibold">Football</h1>
                <RotateCcw size={16} className="text-gray-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 text-white mx-4 mt-4 rounded p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Live Betting</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">34</span>
              </div>
            </div>

            {/* Desktop Dynamic Content Section */}
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
                              <span className="font-medium text-green-600 text-base">{country}</span>
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
                                  <span className="flex-1 pr-2">{league.name}</span>
                                  <div className="flex items-center gap-2 flex-shrink-0">
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
                        {activeSection === "Today Games" ? "20/09 Saturday" : "Upcoming Fixtures"}
                      </div>
                      {getCurrentMatches().map((match, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center justify-between py-2">
                            <div className="flex-1">
                              <div className="text-sm text-gray-600">11:30</div>
                              <div className="font-medium text-sm">{match.homeTeam}</div>
                              <div className="font-medium text-sm">{match.awayTeam}</div>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                                onClick={() => addBet({ id: `${index}-1`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '1', odds: match.odds.home })}>
                                {match.odds.home}
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                                onClick={() => addBet({ id: `${index}-X`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: 'X', odds: match.odds.draw })}>
                                {match.odds.draw}
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                                onClick={() => addBet({ id: `${index}-2`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '2', odds: match.odds.away })}>
                                {match.odds.away}
                              </Button>
                              <span className="text-gray-400 text-xs">+32</span>
                            </div>
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
          sportName="Football"
          sportIcon={<span className="text-2xl">⚽</span>}
          leagues={leagues}
          countries={countries}
          onLeagueToggle={handleLeagueToggle}
          onCountryToggle={handleCountryToggle}
          onClearFilters={handleClearFilters}
          onViewResults={handleViewResults}
        >
          {/* Football specific content */}
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
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">34</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">All Live</span>
                  <span className="text-green-400 font-medium">95</span>
                  <ChevronRight className="w-4 h-4 text-green-400" />
                </div>
              </button>
            </div>

            {/* Today's Matches */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Today's Games</h3>
              {todayMatches.map((match) => (
                <div key={match.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-400">{match.league} • {match.time}</div>
                    <div className="flex items-center space-x-1">
                      {match.badges.map((badge, badgeIndex) => (
                        <span 
                          key={badgeIndex}
                          className={`text-xs px-2 py-0.5 rounded ${
                            badge === "HOT" 
                              ? "bg-red-600 text-white" 
                              : "bg-green-600 text-white"
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
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
                          id: `${match.id}-home`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: '1X2', 
                          pick: '1', 
                          odds: match.odds.home 
                        })}
                      >
                        {match.odds.home}
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${match.id}-draw`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: '1X2', 
                          pick: 'X', 
                          odds: match.odds.draw 
                        })}
                      >
                        {match.odds.draw}
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                        onClick={() => addBet({ 
                          id: `${match.id}-away`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: '1X2', 
                          pick: '2', 
                          odds: match.odds.away 
                        })}
                      >
                        {match.odds.away}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+32</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SportPageLayout>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Football;