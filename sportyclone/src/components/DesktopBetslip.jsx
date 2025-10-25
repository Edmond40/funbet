import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBets } from "@/hooks/useBets";

const DesktopBetslip = () => {
  const { bets, addBet, removeBet, removeAllBets, updateBetStake } = useBets();
  const [stake] = useState(100);
  const [betMode, setBetMode] = useState('real');
  const [activeTab, setActiveTab] = useState('betslip');
  const [bookingCode, setBookingCode] = useState('');

  // Function to add a sample bet for testing
  const addSampleBet = () => {
    const sampleBet = {
      id: `bet-${Date.now()}`,
      event: "Manchester City vs Liverpool",
      market: "Match Result",
      pick: "Manchester City",
      odds: "2.10",
      stake: 100
    };
    addBet(sampleBet);
  };

  const calculateTotalOdds = () => {
    if (bets.length === 0) return 0;
    return bets.reduce((total, bet) => total * parseFloat(bet.odds), 1);
  };

  const calculatePotentialWin = () => {
    return stake * calculateTotalOdds();
  };

  const placeBet = () => {
    if (bets.length === 0) return;
    
    // Simulate bet placement
    alert(`Bet placed successfully!\nStake: ₵${stake}\nPotential Win: ₵${calculatePotentialWin().toFixed(2)}`);
    removeAllBets();
  };

  return (
    <div className="w-full max-w-md bg-white flex flex-col h-full">
      {/* Header Tabs */}
      <div className="flex bg-gray-700">
        <button
          onClick={() => setActiveTab('betslip')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'betslip'
              ? 'bg-white text-gray-900'
              : 'bg-gray-700 text-gray-300 hover:text-white'
          }`}
        >
          Betslip
          {bets.length > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {bets.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('cashout')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'cashout'
              ? 'bg-white text-gray-900'
              : 'bg-gray-700 text-gray-300 hover:text-white'
          }`}
        >
          Cashout
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'betslip' ? (
        <div className="flex-1 flex flex-col">
          {/* Real/Sim Toggle */}
          <div className="p-3 border-b bg-gray-50">
            <div className="flex bg-white rounded-lg p-1 border">
              <button
                onClick={() => setBetMode('real')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                  betMode === 'real'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs mr-2">REAL</span>
                SIM
              </button>
              <button
                onClick={() => setBetMode('sim')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                  betMode === 'sim'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs mr-2">SIM</span>
                MODE
              </button>
            </div>
          </div>

          {/* Bets List */}
          <div className="flex-1 overflow-y-auto">
            {bets.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-gray-500">
                <p className="text-sm text-center mb-4">To place a bet, click on the odds. Or insert a booking code</p>
                <div className="w-full space-y-3">
                  <input
                    type="text"
                    placeholder="Booking Code"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <Button 
                    className="w-full bg-gray-300 text-gray-600 hover:bg-gray-400" 
                    disabled={!bookingCode}
                  >
                    Load
                  </Button>
                  <Button 
                    onClick={addSampleBet}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    Add Sample Bet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {bets.map((bet) => (
                  <div key={bet.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{bet.event}</p>
                        <p className="text-xs text-gray-600">{bet.market} - {bet.pick}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">{bet.odds}</span>
                        <button
                          onClick={() => removeBet(bet.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove bet"
                          title="Remove bet"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={bet.stake || stake}
                        onChange={(e) => {
                          const newStake = parseInt(e.target.value) || 0;
                          updateBetStake(bet.id, newStake);
                        }}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                        placeholder="Stake"
                      />
                      <span className="text-xs text-gray-600">
                        Win: ₵{((bet.stake || stake) * parseFloat(bet.odds)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Betting Summary */}
          {bets.length > 0 && (
            <div className="border-t p-4 space-y-3 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Odds:</span>
                  <span className="font-bold">{calculateTotalOdds().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stake:</span>
                  <span>₵{bets.reduce((sum, bet) => sum + (bet.stake || stake), 0)}</span>
                </div>
                <div className="flex justify-between font-bold text-green-600">
                  <span>Potential Win:</span>
                  <span>₵{calculatePotentialWin().toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={placeBet}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Place Bet
              </Button>
            </div>
          )}
        </div>
      ) : (
        // Cashout Tab Content
        <div className="flex-1 p-4">
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">Please Log In to see your Open Bets</p>
            <p className="text-sm">and Cashout Bets</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopBetslip;
