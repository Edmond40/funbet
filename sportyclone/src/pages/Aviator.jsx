import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Plane, TrendingUp, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedBetslip from "@/components/UnifiedBetslip";

const Aviator = () => {
  const navigate = useNavigate();
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [betAmount, setBetAmount] = useState("100");
  const [autoCashOut, setAutoCashOut] = useState("");
  const [gameHistory, setGameHistory] = useState([2.45, 1.23, 5.67, 1.89, 3.21]);
  const [showBetslip, setShowBetslip] = useState(false);

  const recentWins = [
    { player: "Player123", amount: "₵2,450", multiplier: "2.45x" },
    { player: "Winner456", amount: "₵5,670", multiplier: "5.67x" },
    { player: "Lucky789", amount: "₵1,230", multiplier: "1.23x" },
    { player: "Pro Player", amount: "₵3,210", multiplier: "3.21x" }
  ];

  const statistics = {
    totalPlayers: 1247,
    totalBets: "₵45,678,900",
    biggestWin: "₵123,456",
    averageMultiplier: "2.34x"
  };

  useEffect(() => {
    let interval;
    if (isFlying) {
      interval = setInterval(() => {
        setMultiplier(prev => prev + 0.01);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFlying]);

  const startGame = () => {
    setIsFlying(true);
    setMultiplier(1.00);
  };

  const cashOut = () => {
    setIsFlying(false);
    const winAmount = parseFloat(betAmount) * multiplier;
    alert(`Cashed out at ${multiplier.toFixed(2)}x! You won ₵${winAmount.toFixed(2)}`);
  };

  const crashed = useCallback(() => {
    setIsFlying(false);
    setGameHistory(prev => [multiplier, ...prev.slice(0, 4)]);
    setTimeout(startGame, 3000);
  }, [multiplier]);

  useEffect(() => {
    if (multiplier > 10) {
      crashed();
    }
  }, [multiplier, crashed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate(-1)}
            aria-label="Go back"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Plane className="w-6 h-6 text-orange-400" />
            <h1 className="text-lg font-bold">Aviator</h1>
          </div>
        </div>
        <Badge className="bg-orange-500 text-white">
          Live Game
        </Badge>
      </header>

      {/* Game Area */}
      <div className="p-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mb-4">
          <div className="text-center mb-6">
            <div className="relative h-40 flex items-center justify-center">
              <div className={`transition-transform duration-1000 ${isFlying ? 'translate-x-20 -translate-y-10 rotate-12' : ''}`}>
                <Plane className="w-16 h-16 text-orange-400" />
              </div>
            </div>
            <div className="text-6xl font-bold text-orange-400 mb-2">
              {multiplier.toFixed(2)}x
            </div>
            <div className="text-gray-300">
              {isFlying ? "Flying..." : "Waiting for next round..."}
            </div>
          </div>

          {/* Game Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Bet Amount</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-600 text-white"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Auto Cash Out</label>
                <input
                  type="number"
                  value={autoCashOut}
                  onChange={(e) => setAutoCashOut(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-600 text-white"
                  placeholder="2.00x"
                />
              </div>
            </div>
            <div className="flex flex-col justify-end space-y-2">
              {!isFlying ? (
                <Button 
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                >
                  Place Bet (₵{betAmount})
                </Button>
              ) : (
                <Button 
                  onClick={cashOut}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
                >
                  Cash Out (₵{(parseFloat(betAmount) * multiplier).toFixed(2)})
                </Button>
              )}
              <div className="text-center text-sm text-gray-400">
                Potential Win: ₵{(parseFloat(betAmount) * multiplier).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Game History */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Recent Results
          </h3>
          <div className="flex space-x-2 overflow-x-auto">
            {gameHistory.map((result, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-3 py-2 rounded text-sm font-medium ${
                  result >= 2 ? 'bg-green-600' : result >= 1.5 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
              >
                {result.toFixed(2)}x
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Players Online</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{statistics.totalPlayers}</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">Total Bets</span>
            </div>
            <div className="text-lg font-bold text-green-400">{statistics.totalBets}</div>
          </div>
        </div>

        {/* Recent Winners */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
            Recent Big Wins
          </h3>
          <div className="space-y-2">
            {recentWins.map((win, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                <div>
                  <div className="font-medium">{win.player}</div>
                  <div className="text-sm text-gray-400">{win.multiplier}</div>
                </div>
                <div className="text-green-400 font-bold">{win.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Rules */}
      <div className="p-4 bg-black/30 border-t border-gray-700">
        <div className="text-center text-sm text-gray-400">
          <p>🎯 Place your bet and watch the plane fly!</p>
          <p>💰 Cash out before it crashes to win!</p>
          <p>⚡ The longer you wait, the higher the multiplier!</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        onOpenBetslip={() => setShowBetslip(true)}
      />

      {/* Betslip Modal */}
      {showBetslip && (
        <UnifiedBetslip
          isOpen={showBetslip}
          onClose={() => setShowBetslip(false)}
          isMobile={true}
        />
      )}
    </div>
  );
};

export default Aviator;