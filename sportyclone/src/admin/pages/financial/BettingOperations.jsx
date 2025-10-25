import { useMemo, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  Trophy
} from 'lucide-react';

const BettingOperations = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedBet, setSelectedBet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { addToast } = useToast();
  const { isOpen: isBetModalOpen, openModal: openBetModal, closeModal: closeBetModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();

  const bettingData = useMemo(() => [
    {
      id: 1,
      betId: 'BET001234567',
      user: {
        name: 'Kwame Asante',
        userId: 'USR001',
        email: 'kwame.asante@gmail.com'
      },
      match: 'Manchester United vs Arsenal',
      sport: 'Football',
      betType: 'Match Winner',
      selection: 'Manchester United',
      odds: 2.10,
      stake: 100,
      potentialWin: 210,
      status: 'won',
      placedAt: '2024-01-21 14:30:25',
      settledAt: '2024-01-21 16:45:12',
      profit: -110,
      commission: 5.5
    },
    {
      id: 2,
      betId: 'BET001234568',
      user: {
        name: 'Ama Osei',
        userId: 'USR002',
        email: 'ama.osei@yahoo.com'
      },
      match: 'Lakers vs Warriors',
      sport: 'Basketball',
      betType: 'Point Spread',
      selection: 'Lakers -5.5',
      odds: 1.91,
      stake: 250,
      potentialWin: 477.5,
      status: 'lost',
      placedAt: '2024-01-21 14:25:10',
      settledAt: '2024-01-21 22:30:45',
      profit: 250,
      commission: 12.5
    },
    {
      id: 3,
      betId: 'BET001234569',
      user: {
        name: 'Kofi Mensah',
        userId: 'USR003',
        email: 'kofi.mensah@hotmail.com'
      },
      match: 'Hearts of Oak vs Asante Kotoko',
      sport: 'Football',
      betType: 'Both Teams to Score',
      selection: 'Yes',
      odds: 1.75,
      stake: 500,
      potentialWin: 875,
      status: 'pending',
      placedAt: '2024-01-21 15:45:30',
      settledAt: '-',
      profit: 0,
      commission: 0
    },
    {
      id: 4,
      betId: 'BET001234570',
      user: {
        name: 'Akosua Frimpong',
        userId: 'USR004',
        email: 'akosua.frimpong@gmail.com'
      },
      match: 'Djokovic vs Nadal',
      sport: 'Tennis',
      betType: 'Match Winner',
      selection: 'Djokovic',
      odds: 1.65,
      stake: 300,
      potentialWin: 495,
      status: 'won',
      placedAt: '2024-01-21 13:20:15',
      settledAt: '2024-01-21 16:15:30',
      profit: -195,
      commission: 9.75
    },
    {
      id: 5,
      betId: 'BET001234571',
      user: {
        name: 'Yaw Boateng',
        userId: 'USR005',
        email: 'yaw.boateng@gmail.com'
      },
      match: 'Chelsea vs Liverpool',
      sport: 'Football',
      betType: 'Over/Under 2.5',
      selection: 'Over 2.5',
      odds: 1.90,
      stake: 150,
      potentialWin: 285,
      status: 'cancelled',
      placedAt: '2024-01-21 12:10:45',
      settledAt: '2024-01-21 12:15:20',
      profit: 0,
      commission: 0
    }
  ], []);

  const betTypes = ['Match Winner', 'Over/Under', 'Point Spread', 'Both Teams to Score', 'Correct Score'];
  const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey'];
  const statuses = ['pending', 'won', 'lost', 'cancelled', 'void'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      won: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      lost: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
      void: { bg: 'bg-purple-100', text: 'text-purple-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredBets = useMemo(() => (
    bettingData.filter(bet => {
      const matchesSearch = bet.betId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bet.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bet.match.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || bet.betType === filterType;
      const matchesStatus = filterStatus === 'all' || bet.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
  ), [bettingData, searchTerm, filterType, filterStatus]);

  const stats = useMemo(() => {
    const settledBets = bettingData.filter(b => b.status !== 'pending');
    return {
      totalBets: bettingData.length,
      pendingBets: bettingData.filter(b => b.status === 'pending').length,
      totalStake: bettingData.reduce((sum, b) => sum + b.stake, 0),
      totalProfit: bettingData.reduce((sum, b) => sum + b.profit, 0),
      totalCommission: bettingData.reduce((sum, b) => sum + b.commission, 0),
      winRate: settledBets.length > 0 ? Math.round((bettingData.filter(b => b.status === 'won').length / settledBets.length) * 100) : 0
    };
  }, [bettingData]);

  const bettingStats= {
    totalBets: stats.totalBets,
    pendingBets: stats.pendingBets,
    totalStake: stats.totalStake,
    totalProfit: stats.totalProfit,
    totalCommission: stats.totalCommission,
    winRate: stats.winRate
  };

  const handleViewBet = (bet) => { 
    setSelectedBet(bet); 
    openBetModal(); 
  };
  
  const handleSettleBet = async (bet) => {
    const confirmed = await confirm({ title: 'Settle Bet', message: `Settle bet ${bet.betId}?`, confirmText: 'Settle', type: 'info' });
    if (confirmed) addToast('success', 'Bet Settled', `Bet ${bet.betId} has been settled`);
  };
  
  const handleCloseBetModal = () => {
    setSelectedBet(null);
    closeBetModal();
  };
  
  // Use darkMode for conditional styling
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  
  // Use sports array for filtering
  const availableSports = sports.filter(sport => 
    bettingData.some(bet => bet.sport === sport)
  );
  
  // Log stats for debugging
  console.log('Betting Stats:', bettingStats);
  console.log('Available Sports:', availableSports);

  const handleExportBets = () => {
    const csvContent = bettingData
      .map(bet => [
        bet.betId,
        bet.user.name,
        bet.user.userId,
        bet.match,
        bet.sport,
        bet.betType,
        bet.selection,
        bet.odds,
        bet.stake,
        bet.potentialWin,
        bet.status,
        bet.placedAt,
        bet.settledAt || '',
        bet.profit,
        bet.commission
      ].join(','))
      .join('\n');

    downloadFile(`betId,userName,userId,match,sport,betType,selection,odds,stake,potentialWin,status,placedAt,settledAt,profit,commission\n${csvContent}`, 'betting-operations.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Betting data exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Betting Operations</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all betting activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select title="Filter by status" aria-label="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Activity
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Users
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </button>
          <select title="Select time range" aria-label="Select time range"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={handleExportBets}
            title="Export Report"
            aria-label="Export Report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className={`${cardBgClass} rounded-xl shadow-sm border border-gray-200 p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalBets.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Bets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.pendingBets}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Stake</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalStake.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">House Profit</p>
              <p className={`text-2xl font-bold mt-2 ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                GH₵ {stats.totalProfit.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stats.totalProfit >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
              {stats.totalProfit >= 0 ? <TrendingUp className="w-6 h-6 text-white" /> : <TrendingDown className="w-6 h-6 text-white" />}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commission</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalCommission.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.winRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search bets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              
            >
              <option value="all">All Bet Types</option>
              {betTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select title="Select option" aria-label="Select option"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <button title="Action button" aria-label="Action button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Betting Operations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Betting Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stake</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Win</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBets.map((bet) => (
                <tr key={bet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bet.betId}</div>
                      <div className="text-sm text-gray-500">{bet.betType}</div>
                      <div className="text-xs text-gray-400">{bet.placedAt}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bet.user.name}</div>
                      <div className="text-sm text-gray-500">{bet.user.userId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bet.match}</div>
                      <div className="text-sm text-gray-500">{bet.sport}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bet.selection}</div>
                      <div className="text-sm text-gray-500">@ {bet.odds}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">GH₵ {bet.stake.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">GH₵ {bet.potentialWin.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(bet.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      bet.profit > 0 ? 'text-green-600' : bet.profit < 0 ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {bet.profit !== 0 ? `GH₵ ${bet.profit.toLocaleString()}` : '-'}
                    </div>
                    {bet.commission > 0 && (
                      <div className="text-xs text-gray-500">Commission: GH₵ {bet.commission}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewBet(bet)}
                      className="text-blue-600 hover:text-blue-900 mr-3" 
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {bet.status === 'pending' && (
                      <button 
                        onClick={() => handleSettleBet(bet)}
                        className="text-red-600 hover:text-red-900" 
                        title="Settle bet"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredBets.length} of {bettingData.length} bets
          </div>
          <div className="flex items-center space-x-2">
            <button title="Action button" aria-label="Action button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
            <button title="Action button" aria-label="Action button" className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</button>
            <button title="Action button" aria-label="Action button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button title="Action button" aria-label="Action button" className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Bet Details Modal */}
      {selectedBet && isBetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bet Details</h3>
              <button 
                onClick={handleCloseBetModal}
                className="text-gray-400 hover:text-gray-600"
                title="Close modal"
                aria-label="Close modal"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Bet ID: {selectedBet.betId}</p>
                <p className="text-sm text-gray-600">User: {selectedBet.user.name}</p>
                <p className="text-sm text-gray-600">Match: {selectedBet.match}</p>
                <p className="text-sm text-gray-600">Selection: {selectedBet.selection}</p>
                <p className="text-sm text-gray-600">Odds: {selectedBet.odds}</p>
                <p className="text-sm text-gray-600">Stake: GH₵ {selectedBet.stake}</p>
                <p className="text-sm text-gray-600">Status: {selectedBet.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingOperations;
