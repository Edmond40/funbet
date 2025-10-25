import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, Plus, Zap } from 'lucide-react';

const MultiMaker = () => {
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [availableMatches] = useState([
    {
      id: 1,
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      league: "Premier League",
      time: "Today 15:00",
      markets: [
        { name: "1X2", options: [{ label: "Home", odds: 1.85 }, { label: "Draw", odds: 3.20 }, { label: "Away", odds: 4.50 }] },
        { name: "Over/Under 2.5", options: [{ label: "Over 2.5", odds: 1.75 }, { label: "Under 2.5", odds: 2.10 }] },
        { name: "Both Teams to Score", options: [{ label: "Yes", odds: 1.90 }, { label: "No", odds: 1.85 }] }
      ]
    },
    {
      id: 2,
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      league: "Premier League",
      time: "Today 17:30",
      markets: [
        { name: "1X2", options: [{ label: "Home", odds: 2.10 }, { label: "Draw", odds: 3.40 }, { label: "Away", odds: 3.20 }] },
        { name: "Over/Under 2.5", options: [{ label: "Over 2.5", odds: 1.80 }, { label: "Under 2.5", odds: 2.00 }] }
      ]
    },
    {
      id: 3,
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      league: "La Liga",
      time: "Tomorrow 20:00",
      markets: [
        { name: "1X2", options: [{ label: "Home", odds: 2.50 }, { label: "Draw", odds: 3.10 }, { label: "Away", odds: 2.80 }] },
        { name: "Over/Under 2.5", options: [{ label: "Over 2.5", odds: 1.65 }, { label: "Under 2.5", odds: 2.25 }] }
      ]
    }
  ]);

  const addSelection = (match, market, option) => {
    const selection = {
      id: `${match.id}-${market.name}-${option.label}`,
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      league: match.league,
      time: match.time,
      market: market.name,
      selection: option.label,
      odds: option.odds.toString()
    };

    // Remove existing selection for same match/market
    const filtered = selectedMatches.filter(
      s => !(s.matchId === match.id && s.market === market.name)
    );
    
    setSelectedMatches([...filtered, selection]);
  };

  const removeSelection = (selectionId) => {
    setSelectedMatches(selectedMatches.filter(s => s.id !== selectionId));
  };

  const calculateTotalOdds = () => {
    return selectedMatches.reduce((total, selection) => total * parseFloat(selection.odds), 1).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.history.back()}
            className="text-white"
            title="Go back"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Multi Maker</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white text-sm">Register</button>
          <button className="text-white text-sm">Login</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Available Matches */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Create Your Multi Bet</h2>
            <p className="text-gray-600">Select outcomes from different matches to build your accumulator</p>
          </div>

          <div className="space-y-4">
            {availableMatches.map((match) => (
              <div key={match.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    <span className="text-sm text-gray-500">{match.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{match.league}</p>
                </div>

                <div className="space-y-3">
                  {match.markets.map((market, marketIndex) => (
                    <div key={marketIndex}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{market.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {market.options.map((option, optionIndex) => {
                          const isSelected = selectedMatches.some(
                            s => s.matchId === match.id && s.market === market.name && s.selection === option.label
                          );
                          
                          return (
                            <button
                              key={optionIndex}
                              onClick={() => addSelection(match, market, option)}
                              className={`p-2 rounded border text-sm font-medium transition-colors ${
                                isSelected
                                  ? 'bg-green-600 text-white border-green-600'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-600'
                              }`}
                            >
                              <div>{option.label}</div>
                              <div className="text-xs">{option.odds}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Betslip */}
        <div className="lg:w-80 bg-white border-l">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Multi Bet Slip</h3>
            </div>
          </div>

          <div className="p-4">
            {selectedMatches.length === 0 ? (
              <div className="text-center py-8">
                <Plus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">Select outcomes to build your multi bet</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {selectedMatches.map((selection) => (
                    <div key={selection.id} className="bg-gray-50 rounded p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {selection.homeTeam} vs {selection.awayTeam}
                          </p>
                          <p className="text-xs text-gray-600">{selection.league}</p>
                        </div>
                        <button
                          onClick={() => removeSelection(selection.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Remove selection"
                          aria-label="Remove selection"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          {selection.market}: {selection.selection}
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          {selection.odds}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Total Odds:</span>
                    <span className="font-bold text-green-600 text-lg">
                      {calculateTotalOdds()}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stake Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                    />
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Place Multi Bet
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiMaker;
