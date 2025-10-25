import Header from "@/components/Header";
import SportsNavigation from "@/components/SportsNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";
import { Button } from "@/components/ui/button";
import { RotateCcw, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useBets } from "@/hooks/useBets";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";

const Cricket = () => {
  const { addBet } = useBets();
  const [activeSection, setActiveSection] = useState("Today Games");
  const [expandedCountries, setExpandedCountries] = useState(["England", "India"]);
  
  const navigate = useNavigate();

  const handleLeagueClick = (leagueName) => {
    const encodedLeague = encodeURIComponent(leagueName);
    navigate(`/outrights/cricket/${encodedLeague}`);
  };

  const todayMatches = [
    {
      league: "IPL",
      homeTeam: "Mumbai Indians",
      awayTeam: "Chennai Super Kings",
      odds: { home: "1.80", away: "2.00" }
    },
    {
      league: "Test Series",
      homeTeam: "England",
      awayTeam: "Australia",
      odds: { home: "2.30", away: "1.60" }
    }
  ];

  const upcomingMatches = [
    {
      league: "T20 World Cup",
      homeTeam: "India",
      awayTeam: "Pakistan",
      odds: { home: "1.70", away: "2.15" }
    }
  ];

  const outrightLeagues = {
    "International": [
      { name: "ICC Cricket World Cup 2027", count: 10 },
      { name: "ICC T20 World Cup 2026", count: 16 },
      { name: "ICC Champions Trophy 2025", count: 8 },
      { name: "World Test Championship 2025", count: 9 }
    ],
    "Asia": [
      { name: "Indian Premier League 2025", count: 10 },
      { name: "Pakistan Super League 2025", count: 6 },
      { name: "Big Bash League 2024-25", count: 8 },
      { name: "Asia Cup 2025", count: 6 }
    ],
    "Europe": [
      { name: "The Hundred 2025", count: 8 },
      { name: "County Championship 2025", count: 18 },
      { name: "T20 Blast 2025", count: 18 }
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
    <div className="min-h-screen bg-gray-100 pb-16 lg:pb-0">
      <Header />
      <SportsNavigation />
      <div className="flex flex-col lg:flex-row">
        <div className="w-64 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg">Cricket</h2>
          </div>
          
          <div className="border-b">
            <div className="p-3">
              <div className="space-y-1">
                {["Today Games", "Upcoming Games", "Outrights"].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      activeSection === section 
                        ? "bg-green-100 text-green-700 font-medium" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeSection === "Outrights" && (
            <div className="p-3">
              <div className="space-y-2">
                {Object.entries(outrightLeagues).map(([country, leagues]) => (
                  <div key={country}>
                    <button
                      onClick={() => toggleCountry(country)}
                      className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
                    >
                      <span>{country}</span>
                      {expandedCountries.includes(country) ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    {expandedCountries.includes(country) && (
                      <div className="ml-4 space-y-1">
                        {leagues.map((league) => (
                          <button
                            key={league.name}
                            onClick={() => handleLeagueClick(league.name)}
                            className="flex items-center justify-between w-full p-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded"
                          >
                            <span>{league.name}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {league.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-xl font-semibold">
                {activeSection === "Outrights" ? "Cricket Outrights" : `Cricket - ${activeSection}`}
              </h1>
              <RotateCcw size={16} className="text-gray-500" />
            </div>
          </div>
          
          <div className="bg-gray-800 text-white mx-3 md:mx-4 mt-4 rounded p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm md:text-base">Live Betting</span>
              <span className="bg-green-600 text-xs px-2 py-1 rounded">12</span>
            </div>
          </div>

          {activeSection === "Outrights" ? (
            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium text-sm md:text-base">{activeSection}</span>
              </div>
              <div className="p-4">
                <div className="text-center text-gray-500 py-8">
                  <p>Select a competition from the sidebar to view outright betting markets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-4 mt-6 border rounded">
              <div className="bg-gray-50 p-3 border-b">
                <span className="font-medium">
                  {activeSection === "Today Games" ? "Today's Cricket Matches" : "Upcoming Cricket Matches"}
                </span>
              </div>
              <div className="p-3">
                <div className="space-y-3">
                  {getCurrentMatches().map((match, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">{match.league}</div>
                        <div className="text-sm text-gray-600">10:30</div>
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
                        <span className="text-gray-400 text-xs">+22</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <UnifiedBetslip />
      </div>
      <Footer />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Cricket;
