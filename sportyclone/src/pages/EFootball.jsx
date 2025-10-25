import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import SportsSidebar from "@/components/SportsSidebar";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import SportPageLayout from "@/components/SportPageLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useBets } from "@/hooks/useBets";

const EFootball = () => {
  const { addBet } = useBets();
  const [activeSection, setActiveSection] = useState("Today Games");
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 35, checked: true },
    { id: "fifa", name: "FIFA eWorld Cup", count: 8, checked: true },
    { id: "pro-clubs", name: "Pro Clubs", count: 12, checked: true },
    { id: "ultimate-team", name: "Ultimate Team", count: 15, checked: true }
  ]);
  
  const [countries, setCountries] = useState([
    { id: "global", name: "Global", count: 20, checked: true },
    { id: "europe", name: "Europe", count: 8, checked: true },
    { id: "asia", name: "Asia", count: 4, checked: true },
    { id: "americas", name: "Americas", count: 3, checked: true }
  ]);
  
  const navigate = useNavigate();

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

  const todayMatches = [
    {
      league: "eFootball Championship",
      homeTeam: "eReal Madrid",
      awayTeam: "eBarcelona",
      odds: { home: "1.90", draw: "3.20", away: "3.80" }
    },
    {
      league: "eChampions League",
      homeTeam: "ePSG",
      awayTeam: "eManchester City",
      odds: { home: "2.10", draw: "3.40", away: "3.20" }
    }
  ];

  const upcomingMatches = [
    {
      league: "eWorld Cup",
      homeTeam: "eBrazil",
      awayTeam: "eArgentina",
      odds: { home: "1.85", draw: "3.30", away: "4.00" }
    }
  ];

  // Removed toggleCountry function's not needed with new layout

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
                <h1 className="text-xl font-semibold">eFootball</h1>
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
                  {getCurrentMatches().map((match, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Every 5 mins</div>
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
                        <span className="text-gray-400 text-xs">+35</span>
                      </div>
                    </div>
                  ))}
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
          sportName="EFootball"
          sportIcon={<span className="text-2xl">⚡</span>}
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
                    <div className="text-sm text-gray-400">{match.league}</div>
                    <div className="text-xs text-green-400">Every 5 mins</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white font-medium">{match.homeTeam}</div>
                      <div className="text-white font-medium">{match.awayTeam}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                        onClick={() => addBet({ 
                          id: `${index}-home`, 
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
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                        onClick={() => addBet({ 
                          id: `${index}-draw`, 
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
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-xs"
                        onClick={() => addBet({ 
                          id: `${index}-away`, 
                          event: `${match.homeTeam} vs ${match.awayTeam}`, 
                          market: '1X2', 
                          pick: '2', 
                          odds: match.odds.away 
                        })}
                      >
                        {match.odds.away}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+35</span>
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

export default EFootball;
