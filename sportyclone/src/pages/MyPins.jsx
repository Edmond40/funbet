import { useState } from "react";
import { ArrowLeft, Pin, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyPins = () => {
  const [pinnedCodes] = useState([
    {
      id: 1,
      code: "F2QM6T",
      folds: 46,
      odds: "63K",
      dateAdded: "2024-01-15",
      matches: [
        { team: "Home @1.19", match: "1X2 - 1UP", opponent: "Copenhagen vs Silkeborg IF", time: "Today 14:00" },
        { team: "Home @1.33", match: "1X2 - 1UP", opponent: "Bristol City vs Oxford United", time: "Today 14:00" },
      ]
    },
    {
      id: 2,
      code: "882VAC",
      folds: 11,
      odds: "489.23",
      dateAdded: "2024-01-14",
      matches: [
        { team: "Under 10.5 @1.81", match: "Corners - Over/Under", opponent: "Beijing Guoan vs Dalian Yingbo", time: "Today 11:35" },
        { team: "Over 9.5 @1.73", match: "Corners - Over/Under", opponent: "Shanghai Port vs Wuhan Three T", time: "Today 12:00" },
      ]
    }
  ]);

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
          <h1 className="text-lg font-semibold">My Pins</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white text-sm">Register</button>
          <button className="text-white text-sm">Login</button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pinned Betting Codes</h2>
          <p className="text-gray-600">Your saved betting codes for quick access</p>
        </div>

        {pinnedCodes.length === 0 ? (
          <div className="text-center py-12">
            <Pin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Pinned Codes</h3>
            <p className="text-gray-600 mb-4">You haven't pinned any betting codes yet.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Browse Codes
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {pinnedCodes.map((code) => (
              <div key={code.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900">{code.code}</span>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Folds: <strong>{code.folds}</strong></span>
                      <span>Odds: <strong>{code.odds}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Share code"
                      aria-label="Share code"
                    >
                      <Share className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Remove pin"
                      aria-label="Remove pin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {code.matches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs">⚽</span>
                        </div>
                        <div>
                          <p className="font-medium">{match.team}</p>
                          <p className="text-gray-600 text-xs">{match.opponent}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{match.match}</p>
                        <p className="text-xs text-gray-500">{match.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Pinned on {code.dateAdded}</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Add to Betslip
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPins;
