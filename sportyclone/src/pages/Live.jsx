import { useState } from "react";
import { Search, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";

const Live = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const liveMatches = [
    { 
      id: 1, 
      home: "Manchester United", 
      away: "Liverpool", 
      score: "2-1", 
      time: "78'", 
      league: "Premier League",
      odds: { home: "2.10", draw: "3.20", away: "3.50" }
    },
    { 
      id: 2, 
      home: "Barcelona", 
      away: "Real Madrid", 
      score: "1-0", 
      time: "45'", 
      league: "La Liga",
      odds: { home: "1.80", draw: "3.60", away: "4.20" }
    },
    { 
      id: 3, 
      home: "Bayern Munich", 
      away: "Dortmund", 
      score: "3-2", 
      time: "90+2'", 
      league: "Bundesliga",
      odds: { home: "1.50", draw: "4.00", away: "6.50" }
    },
    { 
      id: 4, 
      home: "PSG", 
      away: "Marseille", 
      score: "0-0", 
      time: "23'", 
      league: "Ligue 1",
      odds: { home: "1.40", draw: "4.50", away: "7.00" }
    },
    { 
      id: 5, 
      home: "Juventus", 
      away: "AC Milan", 
      score: "1-1", 
      time: "67'", 
      league: "Serie A",
      odds: { home: "2.30", draw: "3.10", away: "3.20" }
    }
  ];

  const filteredMatches = liveMatches.filter(match =>
    match.home.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.away.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMatchClick = (matchId) => {
    navigate(`/live-betting?match=${matchId}`);
  };

  const handleBetClick = (matchId, betType, odds) => {
    // Add bet to context or handle betting logic
    console.log(`Bet placed: Match ${matchId}, ${betType}, Odds: ${odds}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Search Bar */}
      <div className="bg-red-600 px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search live matches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-lg bg-white text-gray-900 placeholder-gray-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Live Indicator */}
      <div className="bg-green-600 px-4 py-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-white font-semibold">LIVE - {filteredMatches.length} matches in progress</span>
        </div>
      </div>

      {/* Live Matches */}
      <div className="p-4 space-y-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Match Header */}
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{match.league}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-red-600">{match.time}</span>
                  <Play className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Match Content */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-800">{match.home}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-2xl font-bold text-green-600">{match.score}</div>
                </div>
                <div className="text-center flex-1">
                  <div className="font-semibold text-gray-800">{match.away}</div>
                </div>
              </div>

              {/* Betting Options */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => handleBetClick(match.id, "Home", match.odds.home)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  <div className="text-center">
                    <div className="text-xs">1</div>
                    <div className="font-bold">{match.odds.home}</div>
                  </div>
                </Button>
                <Button
                  onClick={() => handleBetClick(match.id, "Draw", match.odds.draw)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  <div className="text-center">
                    <div className="text-xs">X</div>
                    <div className="font-bold">{match.odds.draw}</div>
                  </div>
                </Button>
                <Button
                  onClick={() => handleBetClick(match.id, "Away", match.odds.away)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
                  variant="outline"
                >
                  <div className="text-center">
                    <div className="text-xs">2</div>
                    <div className="font-bold">{match.odds.away}</div>
                  </div>
                </Button>
              </div>

              {/* View More Button */}
              <Button
                onClick={() => handleMatchClick(match.id)}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
              >
                View All Markets
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation onOpenBetslip={() => {}} />
    </div>
  );
};

export default Live;
