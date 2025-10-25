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
import { addBetToGlobal } from "@/utils/betUtils";

const Volleyball = () => {
  const [activeSection, setActiveSection] = useState("Today Games");
  const [leagues, setLeagues] = useState([
    { id: "all", name: "All", count: 24, checked: true },
    { id: "vnl", name: "Volleyball Nations League", count: 16, checked: true },
    { id: "cev-cl", name: "CEV Champions League", count: 20, checked: true },
    { id: "world-champ", name: "World Championship", count: 24, checked: true }
  ]);
  
  const [countries, setCountries] = useState([
    { id: "brazil", name: "Brazil", count: 8, checked: true },
    { id: "italy", name: "Italy", count: 6, checked: true },
    { id: "poland", name: "Poland", count: 4, checked: true },
    { id: "usa", name: "United States", count: 6, checked: true }
  ]);
  
  const navigate = useNavigate();

  const addBet = addBetToGlobal;

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
      league: "FIVB Volleyball Nations League",
      homeTeam: "Brazil",
      awayTeam: "Italy",
      odds: { home: "1.80", away: "2.00" }
    },
    {
      league: "CEV Champions League",
      homeTeam: "Zenit Kazan",
      awayTeam: "Perugia",
      odds: { home: "1.95", away: "1.85" }
    }
  ];

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
                <h1 className="text-xl font-semibold">Volleyball</h1>
                <RotateCcw size={16} className="text-gray-500" />
              </div>
            </div>

            <div className="bg-gray-800 text-white mx-4 mt-4 rounded p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Live Betting</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">9</span>
              </div>
            </div>

            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium text-base">{activeSection}</span>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-3">Today's Matches</div>
                  {todayMatches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">17:00</div>
                        <div className="font-medium text-sm">{match.homeTeam}</div>
                        <div className="font-medium text-sm">{match.awayTeam}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                          onClick={() => addBet({ id: `${index}-1`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Match Winner', pick: match.homeTeam, odds: match.odds?.home || '1.00' })}>
                          {match.odds.home}
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs min-w-12"
                          onClick={() => addBet({ id: `${index}-2`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: 'Match Winner', pick: match.awayTeam, odds: match.odds?.away || '1.00' })}>
                          {match.odds.away}
                        </Button>
                        <span className="text-gray-400 text-xs">+14</span>
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
          sportName="Volleyball"
          sportIcon={<span className="text-2xl">🏐</span>}
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
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">9</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">All Live</span>
                  <span className="text-green-400 font-medium">24</span>
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
                    <div className="text-sm text-gray-400">{match.league} • 17:00</div>
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
                          market: 'Match Winner', 
                          pick: match.homeTeam, 
                          odds: match.odds?.home || '1.00' 
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
                          market: 'Match Winner', 
                          pick: match.awayTeam, 
                          odds: match.odds?.away || '1.00' 
                        })}
                      >
                        {match.odds.away}
                      </Button>
                      <span className="text-gray-400 text-sm self-center">+14</span>
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

export default Volleyball;
