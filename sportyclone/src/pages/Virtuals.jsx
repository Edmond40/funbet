import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import SportsSidebar from "@/components/SportsSidebar";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import BottomNavigation from "@/components/BottomNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronRight, ChevronDown, ArrowLeft, Search, Home, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Virtuals = () => {
  const [activeSection, setActiveSection] = useState("Today Games");
  const navigate = useNavigate();

  const addBet = (detail) => {
    window.dispatchEvent(new CustomEvent('add-bet', { detail }));
  };

  const todayMatches = [
    {
      league: "Virtual Premier League",
      date: "Today - Every 3 mins",
      homeTeam: "Virtual Manchester United",
      awayTeam: "Virtual Liverpool",
      odds: { home: "2.10", draw: "3.40", away: "3.20" }
    },
    {
      league: "Virtual Champions League",
      date: "Today - Every 5 mins",
      homeTeam: "Virtual Real Madrid",
      awayTeam: "Virtual Barcelona",
      odds: { home: "1.85", draw: "3.60", away: "4.20" }
    }
  ];

  const upcomingMatches = [
    {
      league: "Virtual World Cup",
      date: "Next - 2 mins",
      homeTeam: "Virtual Brazil",
      awayTeam: "Virtual Argentina",
      odds: { home: "1.95", draw: "3.50", away: "3.80" }
    },
    {
      league: "Virtual Europa League",
      date: "Next - 4 mins",
      homeTeam: "Virtual Arsenal",
      awayTeam: "Virtual Chelsea",
      odds: { home: "2.40", draw: "3.20", away: "2.90" }
    }
  ];

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
                <h1 className="text-xl font-semibold">vFootball</h1>
                <RotateCcw size={16} className="text-gray-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 text-white mx-4 mt-4 rounded p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-base">Live Betting</span>
                <span className="bg-green-600 text-xs px-2 py-1 rounded">24/7</span>
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
                        <div className="text-sm text-gray-600">{match.date}</div>
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
                        <span className="text-gray-400 text-xs">+45</span>
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
      <div className="lg:hidden bg-gray-900 text-white min-h-screen">
        {/* Mobile Header */}
        <div className="bg-red-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate(-1)} title="Go back">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">vFootball</h1>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-white" />
            <button onClick={() => navigate('/')} title="Go home">
              <Home className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Live Betting Section */}
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
          <button 
            onClick={() => navigate('/live-betting')}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">Live Betting</span>
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">24/7</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 font-medium">All Live</span>
              <span className="text-green-400 font-medium">∞</span>
              <ChevronRight className="w-4 h-4 text-green-400" />
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="px-4 py-3">
          <div className="space-y-4">
            {/* Match Cards */}
            {getCurrentMatches().map((match, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-400">{match.league}</div>
                  <div className="text-xs text-green-400">{match.date}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-white font-medium mb-1">{match.homeTeam}</div>
                  <div className="text-white font-medium">{match.awayTeam}</div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white py-2 text-xs font-medium"
                    onClick={() => addBet({ id: `${index}-1`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '1', odds: match.odds.home })}
                  >
                    1: {match.odds.home}
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white py-2 text-xs font-medium"
                    onClick={() => addBet({ id: `${index}-X`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: 'X', odds: match.odds.draw })}
                  >
                    X: {match.odds.draw}
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700 text-white py-2 text-xs font-medium"
                    onClick={() => addBet({ id: `${index}-2`, event: `${match.homeTeam} vs ${match.awayTeam}`, market: '1X2', pick: '2', odds: match.odds.away })}
                  >
                    2: {match.odds.away}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <BottomNavigation />
      </div>
    </>
  );
};

export default Virtuals;