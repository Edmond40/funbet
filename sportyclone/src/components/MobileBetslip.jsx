import { useState } from "react";
import { X, ChevronDown, Download, Link as LinkIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBets } from "@/hooks/useBets";
import { Link } from "react-router-dom";

const MobileBetslip = ({ isOpen, onClose  }) => {
  const { bets, addBet, removeBet, removeAllBets, updateBetStake } = useBets();
  const [betMode, setBetMode] = useState('real');
  const [balance] = useState(0.00);
  const [showBetConfirmation, setShowBetConfirmation] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPeopleAlsoBet, setShowPeopleAlsoBet] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('1');
  const [betType, setBetType] = useState('single');

  // Function to add sample bets for testing
  const addSampleBets = () => {
    const sampleBets = [
      {
        id: `bet-${Date.now()}-1`,
        event: "Aston Villa vs Fulham",
        market: "Corners - Over/Under",
        pick: "Over 8.5",
        odds: "1.56"
      },
      {
        id: `bet-${Date.now()}-2`,
        event: "Heidenheim vs Augsburg",
        market: "Corners - Over/Under",
        pick: "Over 8.5",
        odds: "1.56"
      }
    ];
    sampleBets.forEach(bet => addBet(bet));
  };

  // Add sample bets for testing
  const handleAddSampleBets = () => {
    addSampleBets();
  };

  // Handle bet placement
  const handlePlaceBet = () => {
    setShowBetConfirmation(true);
    setTimeout(() => {
      setShowBetConfirmation(false);
      removeAllBets();
    }, 3000);
  };

  // Handle book bet - show booking modal
  const handleBookBet = () => {
    setShowBookingModal(true);
  };

  // Sample popular betting codes
  const popularBettingCodes = [
    {
      code: "882VAC",
      folds: 11,
      odds: "489.23",
      matches: [
        { team: "Under 10.5 @1.81", match: "Corners - Over/Under", opponent: "Beijing Guoan vs Dalian Yingbo", time: "Today 11:35" },
        { team: "Over 9.5 @1.73", match: "Corners - Over/Under", opponent: "Shanghai Port vs Wuhan Three T", time: "Today 12:00" },
        { team: "Over 9.5 @1.72", match: "Corners - Over/Under", opponent: "Zhejiang FC vs Chengdu Rong", time: "Today 12:00" }
      ]
    },
    {
      code: "F2QM6T",
      folds: 46,
      odds: "63K",
      matches: [
        { team: "Home @1.19", match: "1X2 - 1UP", opponent: "Copenhagen vs Silkeborg IF", time: "Today 14:00" },
        { team: "Home @1.33", match: "1X2 - 1UP", opponent: "Bristol City vs Oxford United", time: "Today 14:00" },
        { team: "Home @1.31", match: "1X2 - 1UP", opponent: "Tabor Sezana vs Ilirija Ljubljana", time: "Today 14:00" }
      ]
    },
    {
      code: "EQMXFR",
      folds: 25,
      odds: "140K",
      matches: [
        { team: "Over 1.5 @1.19", match: "Over/Under", opponent: "Team A vs Team B", time: "Today 15:00" },
        { team: "Under 2.5 @1.85", match: "Over/Under", opponent: "Team C vs Team D", time: "Today 16:00" },
        { team: "Both Teams to Score @1.90", match: "BTTS", opponent: "Team E vs Team F", time: "Today 17:00" }
      ]
    }
  ];

  // Handle loading a popular betting code
  const handleLoadPopularCode = () => {
    // Add the bets from the selected code
    addSampleBets();
    setShowPeopleAlsoBet(false);
  };

  // Calculate total stake and potential win
  const totalStake = bets.length * parseFloat(stakeAmount);
  const totalOdds = bets.reduce((acc, bet) => acc * parseFloat(bet.odds), 1);
  const potentialWin = totalStake * totalOdds;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-700 z-50 flex flex-col">
        {/* Compact Header */}
        <button
          onClick={onClose}
          className="text-white cursor-pointer flex justify-center items-center"
          title="Close betslip"
          aria-label="Close betslip"
        >
          <ChevronDown size={24} />
        </button>
        <div className="bg-gray-700 text-white px-4 py-2 flex items-center justify-between">
          <h2 className="text-lg font-bold">SportyBet</h2>
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1">
              Deposit
            </Link>
            <div className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
              GHS 0.00
            </div>
          </div>
        </div>

        {/* Bet Counter and Mode Toggle */}
        <div className="bg-gray-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`${bets.length > 0 ? 'bg-green-600' : 'bg-yellow-500'} text-${bets.length > 0 ? 'white' : 'black'} px-3 py-1 rounded-full text-sm font-medium`}>
              {bets.length}
            </span>
            <div className="flex bg-gray-600 rounded-full ml-2">
              <button
                onClick={() => setBetMode('real')}
                title="Real money betting"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${betMode === 'real'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300'
                  }`}
              >
                REAL MONEY
              </button>
              <button
                onClick={() => setBetMode('sim')}
                title="Simulation betting"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${betMode === 'sim'
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-300'
                  }`}
              >
                SIM
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 text-sm font-bold">GHS {balance.toFixed(2)}</span>
          <button
            onClick={removeAllBets}
            title="Remove all bets"
            className="text-white text-xs"
          >
            Remove All
          </button>
        </div>

        {/* SIM Mode Banner */}
        {betMode === 'sim' && (
          <div className="bg-yellow-500 text-black px-4 py-1 text-center">
            <span className="text-xs font-medium">Place bets on real fixtures with virtually simulated results</span>
          </div>
        )}

        {/* Bet Type Tabs */}
        <div className="bg-gray-700 px-4 py-1 flex space-x-1">
          <button
            onClick={() => setBetType('single')}
            title="Single bet type"
            className={`px-3 py-1 rounded text-xs font-medium ${betType === 'single' ? 'bg-gray-600 text-white' : 'text-gray-300'
              }`}
          >
            Single
          </button>
          <button
            onClick={() => setBetType('multiple')}
            title="Multiple bet type"
            className={`px-3 py-1 rounded text-xs font-medium ${betType === 'multiple' ? 'bg-gray-600 text-white' : 'text-gray-300'
              }`}
          >
            Multiple
          </button>
          <button
            onClick={() => setBetType('system')}
            title="System bet type"
            className={`px-3 py-1 rounded text-xs font-medium ${betType === 'system' ? 'bg-gray-600 text-white' : 'text-gray-300'
              }`}
          >
            System
          </button>
        </div>

        {/* Main Content Area - Much Larger Now */}
        <div className="flex-1 bg-gray-900 flex flex-col overflow-hidden min-h-0">
          {/* Bet List - Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 max-h-[600px]">
            {bets.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-lg">Please add at least one eligible outcome.</p>
                <button
                  onClick={handleAddSampleBets}
                  title="Add sample bets for testing"
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add Sample Bets (Test)
                </button>
              </div>
            ) : (
              <div className="space-y-3 pb-4 ">
                {bets.map((bet) => (
                  <div key={bet.id} className="bg-gray-700 rounded-lg">
                    {/* Bet Header with Collapse/Expand */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                      <div className="flex items-center space-x-2">
                        <ChevronDown className="w-4 h-4 text-white" />
                        <span className="text-white font-medium text-sm">{bet.event}</span>
                      </div>
                      <button
                        onClick={() => removeBet(bet.id)}
                        className="text-red-400 hover:text-red-300"
                        title="Remove bet"
                        aria-label="Remove bet"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bet Details */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-gray-400 text-xs">{bet.market}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-white text-sm">⏰ {bet.pick}</span>
                            <span className="text-white font-bold ml-auto text-lg">{bet.odds}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <input
                            type="number"
                            value="1"
                            onChange={(e) => updateBetStake(bet.id, parseFloat(e.target.value))}
                            className="w-16 bg-gray-600 text-white text-center rounded border border-gray-500 focus:border-green-500 focus:outline-none px-2 py-1"
                            title="Bet stake amount"
                            aria-label="Bet stake amount"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Fixed Bottom Sections - Always Visible */}
        {bets.length > 0 && (
          <div className="bg-gray-700">
            {/* People also bet on section */}
            <div className="px-4 py-2">
              <button
                onClick={() => setShowPeopleAlsoBet(!showPeopleAlsoBet)}
                title="Show popular betting codes"
                className="flex items-center justify-between w-full text-green-400 text-sm"
              >
                <span>🔥 People also bet on...</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showPeopleAlsoBet ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded betting codes */}
              {showPeopleAlsoBet && (
                <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                  {popularBettingCodes.map((betCode) => (
                    <div key={betCode.code} className="bg-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-bold text-sm">{betCode.code}</span>
                          <div className="flex items-center space-x-2 text-xs text-gray-300">
                            <span>Folds: <strong className="text-white">{betCode.folds}</strong></span>
                            <span>Odds: <strong className="text-white">{betCode.odds}</strong></span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLoadPopularCode()}
                          title="Add this betting code"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>

                      {/* Sample matches from the code */}
                      <div className="space-y-2 mb-3">
                        {betCode.matches.slice(0, 2).map((match, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">⚽</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white truncate">{match.team} | {match.match}</p>
                              <p className="text-gray-400 text-xs truncate">{match.opponent} • {match.time}</p>
                            </div>
                          </div>
                        ))}
                        {betCode.matches.length > 2 && (
                          <div className="text-gray-400 text-xs text-center">
                            +{betCode.matches.length - 2} more matches
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stake and Place Bet Section */}
            <div className="bg-gray-800 px-4 py-5 mb-14">
              <div className="flex items-center justify-between">
                <span className="text-white">Stake per bet ({bets.length} bets)</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white">GHS</span>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-16 bg-gray-700 text-white text-center rounded border border-red-500 focus:border-green-500 focus:outline-none px-2 py-1"
                    title="Stake amount per bet"
                    aria-label="Stake amount per bet"
                  />
                </div>
              </div>

              <div className="text-center text-red-400 text-sm">
                You need a balance of GHS {totalStake.toFixed(2)} to place this bet. Please deposit an additional GHS {totalStake.toFixed(2)}
              </div>

              <Link to="/dashboard" className="text-green-400 text-sm flex items-center justify-center">
                Go to Deposit →
              </Link>

              <div className="flex items-center justify-between">
                <span className="text-white">Total Stake</span>
                <span className="text-white font-bold">{totalStake.toFixed(2)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Insure</span>
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">i</span>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" title="Enable 2UP promotion" aria-label="Enable 2UP promotion" />
                  <span className="text-white text-sm">🔥 2UP</span>
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Potential Win</span>
                <span className="text-white font-bold">1.56 ~ {potentialWin.toFixed(2)}</span>
              </div>

            </div>

          </div>
        )}
        <div className="flex fixed bottom-0 left-0 right-0">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 font-medium"
            title="Book this bet"
            onClick={handleBookBet}
          >
            Book Bet
          </button>
          <button
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-4"
            title="Place this bet"
            onClick={handlePlaceBet}
          >
            <div className="text-center">
              <div className="font-medium">Place Bet</div>
              <div className="text-xs">About to pay {totalStake.toFixed(2)}</div>
            </div>
          </button>
        </div>

        {/* Bet Confirmation Modal */ }
        {
          showBetConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bet Placed Successfully!</h3>
                <p className="text-gray-600 text-sm mb-4">Your bet has been placed and is now active.</p>
                <div className="text-sm text-gray-500">
                  <p>Stake: GHS {totalStake.toFixed(2)}</p>
                  <p>Potential Win: GHS {potentialWin.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )
        }

        {/* Booking Code Modal */ }
        {
          showBookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-semibold">Booking Code</h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    title="Close booking modal"
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  {/* Booking Code Display */}
                  <div className="bg-gray-700 rounded-lg p-4 text-center mb-4">
                    <div className="text-white text-2xl font-bold mb-2">F5W7VR</div>
                    <div className="flex items-center justify-center space-x-2">
                      <button title="Load betting code" className="text-green-400 text-sm flex items-center space-x-2">
                        <span>Load Code</span>
                        <div className="w-4 h-4 bg-green-400 rounded flex items-center justify-center">
                          <Copy className="w-3 h-3 text-white" />
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-gray-400 text-sm mb-2">26/09/2025 03:43</div>
                  </div>

                  {/* Display user name toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white text-sm">Display user name in BookBet Image</span>
                    <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                  </div>

                  {/* Social sharing options */}
                  <div className="flex justify-between space-x-2 mb-6">
                    <button title="Save" className="flex-1 flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                      <Download className="w-6 h-6" />
                      <span className="text-xs">Save Image</span>
                    </button>
                    <button title="Copy link" className="flex-1 flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                      <LinkIcon className="w-6 h-6" />
                      <span className="text-xs">Copy Link</span>
                    </button>
                    <button title="Share on X (Twitter)" className="flex-1 flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                      <X className="w-6 h-6" />
                      <span className="text-xs">X</span>
                    </button>
                    <button title="Share on Telegram" className="flex-1 flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        T
                      </div>
                      <span className="text-xs">Telegram</span>
                    </button>
                    <button title="Share on WhatsApp" className="flex-1 flex flex-col items-center space-y-1 text-gray-400 hover:text-white">
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        W
                      </div>
                      <span className="text-xs">WhatsApp</span>
                    </button>
                  </div>

                  {/* Create SportySocial button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Create My SportySocial
                  </Button>
                  <p className="text-gray-400 text-xs text-center mt-2">Click to create and share to your SportySocial</p>
                </div>
              </div>
            </div>
          )
        }
       </div>
    </>
  );
};

export default MobileBetslip;
