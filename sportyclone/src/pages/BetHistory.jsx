import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, TrendingUp, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const BetHistory = () => {
  const navigate = useNavigate();
  const [activeHistoryTab, setActiveHistoryTab] = useState('sport-bets');
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [transactionSearchQuery, setTransactionSearchQuery] = useState('');

  // Sample bet history data
  const betHistory = [
    {
      id: 'BET001',
      type: 'Single Bet',
      match: 'Manchester United vs Arsenal',
      selection: 'Manchester United Win',
      odds: '2.15',
      stake: '50.00',
      potentialWin: '107.50',
      status: 'Won',
      date: '2024-01-15',
      time: '14:30'
    },
    {
      id: 'BET002',
      type: 'Accumulator',
      matches: ['Chelsea vs Liverpool', 'Real Madrid vs Barcelona'],
      selections: ['Over 2.5 Goals', 'Both Teams to Score'],
      odds: '4.25',
      stake: '25.00',
      potentialWin: '106.25',
      status: 'Lost',
      date: '2024-01-14',
      time: '16:45'
    },
    {
      id: 'BET003',
      type: 'Single Bet',
      match: 'Bayern Munich vs Dortmund',
      selection: 'Under 3.5 Goals',
      odds: '1.85',
      stake: '100.00',
      potentialWin: '185.00',
      status: 'Pending',
      date: '2024-01-16',
      time: '18:00'
    }
  ];

  const jackpotHistory = [
    {
      id: 'JP001',
      name: 'Mega Jackpot',
      matches: 15,
      correct: 12,
      prize: '0.00',
      status: 'Lost',
      date: '2024-01-10'
    },
    {
      id: 'JP002',
      name: 'Mini Jackpot',
      matches: 10,
      correct: 8,
      prize: '125.50',
      status: 'Won',
      date: '2024-01-08'
    }
  ];

  const filteredBets = betHistory.filter(bet => {
    const matchesSearch = bet.match?.toLowerCase().includes(transactionSearchQuery.toLowerCase()) ||
                         bet.id.toLowerCase().includes(transactionSearchQuery.toLowerCase());
    
    if (activeFilterTab === 'all') return matchesSearch;
    if (activeFilterTab === 'settled') return matchesSearch && (bet.status === 'Won' || bet.status === 'Lost');
    if (activeFilterTab === 'unsettled') return matchesSearch && bet.status === 'Pending';
    
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Won':
        return 'text-green-500 bg-green-50';
      case 'Lost':
        return 'text-red-500 bg-red-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-white mr-3"
          title="Back to dashboard"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-lg font-semibold">Bet History</h1>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      <div className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Desktop Breadcrumb */}
        <div className="hidden lg:block mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-blue-500 hover:text-blue-600"
            >
              Dashboard
            </button>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">Bet History</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Betting History
            </h2>

            {/* History Type Tabs */}
            <div className="flex border-b border-gray-600 mb-6">
              <button
                onClick={() => setActiveHistoryTab('sport-bets')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeHistoryTab === 'sport-bets'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Sport Bets
              </button>
              <button
                onClick={() => setActiveHistoryTab('jackpot')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeHistoryTab === 'jackpot'
                    ? 'border-green-500 text-green-500'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Jackpot
              </button>
            </div>

            {/* Sport Bets Tab */}
            {activeHistoryTab === 'sport-bets' && (
              <div className="space-y-4">
                {/* Filter Buttons */}
                <div className="flex gap-2 mb-6">
                  <Button
                    onClick={() => setActiveFilterTab('all')}
                    className={`text-sm px-4 py-2 ${
                      activeFilterTab === 'all'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setActiveFilterTab('settled')}
                    className={`text-sm px-4 py-2 ${
                      activeFilterTab === 'settled'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Settled
                  </Button>
                  <Button
                    onClick={() => setActiveFilterTab('unsettled')}
                    className={`text-sm px-4 py-2 ${
                      activeFilterTab === 'unsettled'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Unsettled
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search bets..."
                    value={transactionSearchQuery}
                    onChange={(e) => setTransactionSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                {/* Bet History List */}
                <div className="space-y-4">
                  {filteredBets.length > 0 ? (
                    filteredBets.map((bet) => (
                      <div
                        key={bet.id}
                        className="border border-gray-600 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/bet-details/${bet.id}`)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">
                                {bet.id}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(bet.status)}`}>
                                {bet.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-300">
                              {bet.type}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-white">
                              GHS {bet.stake}
                            </div>
                            <div className="text-xs text-gray-400">
                              Stake
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="font-medium mb-1 text-white">
                            {bet.match}
                          </div>
                          <div className="text-sm text-gray-300">
                            {bet.selection} @ {bet.odds}
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="text-gray-400">
                                {bet.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-gray-400">
                                {bet.time}
                              </span>
                            </div>
                          </div>
                          <div className="font-medium text-white">
                            Potential: GHS {bet.potentialWin}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-gray-300">
                        No bets found
                      </h3>
                      <p className="text-sm text-gray-400">
                        {transactionSearchQuery ? 'Try adjusting your search terms' : 'Start betting to see your history here'}
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => navigate('/sports')}
                      >
                        Place Your First Bet
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Jackpot Tab */}
            {activeHistoryTab === 'jackpot' && (
              <div className="space-y-4">
                {jackpotHistory.length > 0 ? (
                  jackpotHistory.map((jackpot) => (
                    <div
                      key={jackpot.id}
                      className="border border-gray-600 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/jackpot-details/${jackpot.id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              {jackpot.name}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(jackpot.status)}`}>
                              {jackpot.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-300">
                            {jackpot.correct}/{jackpot.matches} correct predictions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-white">
                            GHS {jackpot.prize}
                          </div>
                          <div className="text-xs text-gray-400">
                            Prize
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-gray-400">
                            {jackpot.date}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/jackpot');
                          }}
                        >
                          Play Again
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-medium mb-2 text-gray-300">
                      No jackpot history
                    </h3>
                    <p className="text-sm text-gray-400">
                      Try your luck with our exciting jackpot games
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => navigate('/jackpot')}
                    >
                      Play Jackpot
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default BetHistory;
