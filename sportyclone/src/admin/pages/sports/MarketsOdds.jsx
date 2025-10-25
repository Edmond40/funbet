import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { 
  Search,
  Filter,
  Download,
  Eye, 
  Edit,
  Plus,
  Activity,
  DollarSign,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  Settings,
  Zap,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Market } from '@/admin/services';

const MarketsOdds = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { addToast } = useToast();
  const { isOpen: isOddsModalOpen, openModal: openOddsModal, closeModal: closeOddsModal } = useModal();
  const { confirm } = useConfirm();

  const handleViewOdds = (market) => { 
    setSelectedMatch(market); 
    openOddsModal(); 
  };
  
  const handleUpdateOdds = async (market) => {
    const confirmed = await confirm({ title: 'Update Odds', message: 'Update odds?', confirmText: 'Update', type: 'info' });
    if (confirmed) {
      console.log('Updating market:', market.id);
      addToast('success', 'Odds Updated', 'Odds updated successfully');
    }
  };

  const handleExportOdds = () => {
    const csvData = markets.map(m => `${m.name},${m.odds.home?.value || 'N/A'},${m.status}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markets-odds.csv';
    a.click();
    addToast('success', 'Export Complete', 'Odds data exported successfully');
  };
  const [showAddMarket, setShowAddMarket] = useState(false);

  const markets = [
    {
      id: '1',
      name: 'Match Winner',
      sport: 'Football',
      type: '1X2',
      status: 'active',
      totalMatches: 245,
      avgMargin: 5.2,
      totalVolume: 125000,
      description: 'Bet on the outcome of the match',
      outcomes: ['Home', 'Draw', 'Away'],
      odds: {
        home: { value: 1.85, volume: 45000, percentage: 54.1 },
        draw: { value: 3.20, volume: 25000, percentage: 31.3 },
        away: { value: 4.50, volume: 55000, percentage: 22.2 }
      },
      lastUpdated: '2024-01-21 14:30',
      margin: 5.2,
      popularity: 'high'
    },
    {
      id: '2',
      name: 'Total Goals Over/Under',
      sport: 'Football',
      type: 'Over/Under',
      status: 'active',
      totalMatches: 198,
      avgMargin: 4.8,
      totalVolume: 89000,
      description: 'Bet on total goals scored in the match',
      outcomes: ['Over 2.5', 'Under 2.5'],
      odds: {
        over25: { value: 1.90, volume: 52000, percentage: 58.4 },
        under25: { value: 1.95, volume: 37000, percentage: 41.6 }
      },
      lastUpdated: '2024-01-21 14:25',
      margin: 4.8,
      popularity: 'high'
    },
    {
      id: '3',
      name: 'Both Teams to Score',
      sport: 'Football',
      type: 'Yes/No',
      status: 'active',
      totalMatches: 180,
      avgMargin: 6.1,
      totalVolume: 67000,
      description: 'Bet on whether both teams will score',
      outcomes: ['Yes', 'No'],
      odds: {
        yes: { value: 1.75, volume: 38000, percentage: 56.7 },
        no: { value: 2.10, volume: 29000, percentage: 43.3 }
      },
      lastUpdated: '2024-01-21 14:20',
      margin: 6.1,
      popularity: 'medium'
    },
    {
      id: '4',
      name: 'Point Spread',
      sport: 'Basketball',
      type: 'Handicap',
      status: 'active',
      totalMatches: 156,
      avgMargin: 5.5,
      totalVolume: 78000,
      description: 'Bet on the point spread',
      outcomes: ['Home -5.5', 'Away +5.5'],
      odds: {
        home: { value: 1.91, volume: 42000, percentage: 53.8 },
        away: { value: 1.91, volume: 36000, percentage: 46.2 }
      },
      lastUpdated: '2024-01-21 14:15',
      margin: 5.5,
      popularity: 'medium'
    },
    {
      id: '5',
      name: 'Set Winner',
      sport: 'Tennis',
      type: 'Set Betting',
      status: 'suspended',
      totalMatches: 89,
      avgMargin: 7.2,
      totalVolume: 34000,
      description: 'Bet on individual set winners',
      outcomes: ['Player 1', 'Player 2'],
      odds: {
        player1: { value: 1.65, volume: 22000, percentage: 64.7 },
        player2: { value: 2.25, volume: 12000, percentage: 35.3 }
      },
      lastUpdated: '2024-01-21 13:45',
      margin: 7.2,
      popularity: 'low'
    }
  ];

  const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey'];
  const marketTypes = ['1X2', 'Over/Under', 'Handicap', 'Yes/No', 'Set Betting', 'Correct Score'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      suspended: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      closed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPopularityBadge = (popularity) => {
    const popularityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      low: { bg: 'bg-gray-100', text: 'text-gray-800' }
    };
    
    const config = popularityConfig[popularity] || popularityConfig.medium;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {popularity.toUpperCase()}
      </span>
    );
  };

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === 'all' || market.sport === filterSport;
    const matchesStatus = filterStatus === 'all' || market.status === filterStatus;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const stats = {
    totalMarkets: markets.length,
    activeMarkets: markets.filter(m => m.status === 'active').length,
    totalVolume: markets.reduce((sum, m) => sum + m.totalVolume, 0),
    avgMargin: markets.reduce((sum, m) => sum + m.avgMargin, 0) / markets.length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Markets & Odds</h1>
          <p className="text-gray-600 mt-1">Manage betting markets and odds configuration</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Add new betting market" aria-label="Add new betting market"
            onClick={() => setShowAddMarket(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Market
          </button>
          <button title="Export markets and odds report" aria-label="Export markets and odds report"
            onClick={handleExportOdds}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Markets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalMarkets}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Markets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeMarkets}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalVolume.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Margin</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgMargin.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
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
              <input title="Search markets by name or sport" aria-label="Search markets by name or sport"
                type="text"
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Filter markets by sport" aria-label="Filter markets by sport"
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Sports</option>
              {sports.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>

            <select title="Filter markets by status" aria-label="Filter markets by status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <button title="Apply additional filters" aria-label="Apply additional filters"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Markets List */}
      <div className="space-y-4">
        {filteredMarkets.map((market) => (
          <div key={market.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{market.name}</h3>
                  {getStatusBadge(market.status)}
                  {getPopularityBadge(market.popularity)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="font-medium">{market.sport}</span>
                  <span>•</span>
                  <span>{market.type}</span>
                  <span>•</span>
                  <span>{market.totalMatches} matches</span>
                </div>
                <p className="text-sm text-gray-600">{market.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button onClick={() => handleViewOdds(market)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View market details" aria-label="View market details">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit market settings" aria-label="Edit market settings">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Market configuration" aria-label="Market configuration">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Total Volume</span>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {market.totalVolume.toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Margin</span>
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">{market.margin}%</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Matches</span>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">{market.totalMatches}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Updated</span>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 mt-1">{market.lastUpdated}</p>
              </div>
            </div>

            {/* Odds Display */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Current Odds</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(market.odds).map(([key, odd]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <button title="Update odds for this outcome" aria-label="Update odds for this outcome"
                        onClick={() => handleUpdateOdds(market)}
                        className="text-xs text-blue-600 hover:text-blue-800">
                        <Zap className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Odds:</span>
                        <span className="text-sm font-bold text-gray-900">{odd.value}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Volume:</span>
                        <span className="text-xs text-gray-700">GH₵ {odd.volume.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Share:</span>
                        <span className="text-xs text-gray-700">{odd.percentage}%</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`bg-red-600 h-1 rounded-full transition-all duration-300 ${
                            odd.percentage >= 75 ? 'w-3/4' :
                            odd.percentage >= 50 ? 'w-1/2' :
                            odd.percentage >= 25 ? 'w-1/4' : 'w-1/12'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Market Modal */}
      {showAddMarket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New Market</h3>
              <button title="Close add market modal" aria-label="Close add market modal"
                onClick={() => setShowAddMarket(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market Name</label>
                  <input title="Enter market name" aria-label="Enter market name"
                    type="text"
                    placeholder="Enter market name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                  <select title="Select sport for the market" aria-label="Select sport for the market" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Market Type</label>
                  <select title="Select market type" aria-label="Select market type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    {marketTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Margin (%)</label>
                  <div className="flex items-center space-x-2">
                    <input title="Enter default margin percentage" aria-label="Enter default margin percentage"
                      type="number"
                      step="0.1"
                      placeholder="5.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <span className="text-sm font-medium text-gray-700">%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the market"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Cancel market creation" aria-label="Cancel market creation"
                  type="button"
                  onClick={() => setShowAddMarket(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Create new market" aria-label="Create new market"
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Market
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Market Details Modal */}
      {isOddsModalOpen && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Market Details</h3>
              <button onClick={closeOddsModal} title="Close modal" className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{selectedMatch.name}</h4>
                <p className="text-sm text-gray-600">{selectedMatch?.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Sport:</span>
                  <span className="ml-2 font-medium">{selectedMatch?.sport}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className="ml-2 font-medium">{selectedMatch.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MarketsOdds;
