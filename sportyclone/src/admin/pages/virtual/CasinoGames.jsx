import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { 
  Download, 
  Eye, 
  Edit,
  Plus,
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  DollarSign,
  Target,
  Zap,
  Spade,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

const CasinoGames = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddGame, setShowAddGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  
  const { addToast } = useToast();
  const { isOpen: isGameModalOpen, openModal: openGameModal, closeModal: closeGameModal } = useModal();
  const { confirm } = useConfirm();
  
  const handleViewGame = (game) => { setSelectedGame(game); openGameModal(); };
  const handleDeleteGame = async () => {
    const confirmed = await confirm({ title: 'Delete Game', message: 'Delete this casino game?', confirmText: 'Delete', type: 'danger' });
    if (confirmed) addToast('success', 'Game Deleted', 'Casino game deleted successfully');
  };
  const handleExportGames = () => {
    downloadFile('name,category,provider,status\nBlackjack,cards,Evolution,active', 'casino-games.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Casino games exported successfully');
  };

  const casinoGames = [
    {
      id: 1,
      name: 'Blackjack Classic',
      category: 'table_games',
      provider: 'Evolution Gaming',
      status: 'active',
      players: 8950,
      totalBets: 156789,
      revenue: 234567,
      rtp: 99.28,
      minBet: 1,
      maxBet: 5000,
      popularity: 92.5,
      lastPlayed: '2024-01-21 16:45:12',
      featured: true
    },
    {
      id: 2,
      name: 'Mega Fortune Slots',
      category: 'slots',
      provider: 'NetEnt',
      status: 'active',
      players: 15420,
      totalBets: 345678,
      revenue: 456789,
      rtp: 96.6,
      minBet: 0.25,
      maxBet: 250,
      popularity: 88.7,
      lastPlayed: '2024-01-21 16:30:25',
      featured: true
    },
    {
      id: 3,
      name: 'European Roulette',
      category: 'table_games',
      provider: 'Microgaming',
      status: 'active',
      players: 6789,
      totalBets: 123456,
      revenue: 178901,
      rtp: 97.3,
      minBet: 1,
      maxBet: 1000,
      popularity: 75.3,
      lastPlayed: '2024-01-21 16:20:18',
      featured: false
    },
    {
      id: 4,
      name: 'Starburst',
      category: 'slots',
      provider: 'NetEnt',
      status: 'maintenance',
      players: 12345,
      totalBets: 234567,
      revenue: 345678,
      rtp: 96.09,
      minBet: 0.10,
      maxBet: 100,
      popularity: 85.1,
      lastPlayed: '2024-01-21 15:15:30',
      featured: true
    },
    {
      id: 5,
      name: 'Live Baccarat',
      category: 'live_casino',
      provider: 'Evolution Gaming',
      status: 'active',
      players: 4567,
      totalBets: 89012,
      revenue: 123456,
      rtp: 98.94,
      minBet: 5,
      maxBet: 10000,
      popularity: 68.9,
      lastPlayed: '2024-01-21 14:45:25',
      featured: false
    },
    {
      id: 6,
      name: 'Book of Dead',
      category: 'slots',
      provider: 'Play\'n GO',
      status: 'active',
      players: 9876,
      totalBets: 198765,
      revenue: 287654,
      rtp: 94.25,
      minBet: 0.01,
      maxBet: 100,
      popularity: 81.4,
      lastPlayed: '2024-01-21 14:30:12',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Games', count: casinoGames.length },
    { id: 'slots', name: 'Slots', count: casinoGames.filter(g => g.category === 'slots').length },
    { id: 'table_games', name: 'Table Games', count: casinoGames.filter(g => g.category === 'table_games').length },
    { id: 'live_casino', name: 'Live Casino', count: casinoGames.filter(g => g.category === 'live_casino').length },
    { id: 'jackpots', name: 'Jackpots', count: casinoGames.filter(g => g.category === 'jackpots').length }
  ];

  const gameStats = {
    totalGames: casinoGames.length,
    activeGames: casinoGames.filter(g => g.status === 'active').length,
    totalPlayers: casinoGames.reduce((sum, g) => sum + g.players, 0),
    totalRevenue: casinoGames.reduce((sum, g) => sum + g.revenue, 0),
    avgRTP: casinoGames.reduce((sum, g) => sum + g.rtp, 0) / casinoGames.length
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
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

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      slots: Zap,
      table_games: Spade,
      live_casino: Play,
      jackpots: Star
    };
    return categoryIcons[category] || Target;
  };

  const filteredGames = selectedCategory === 'all' 
    ? casinoGames 
    : casinoGames.filter(game => game.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Casino Games</h1>
          <p className="text-gray-600 mt-1">Manage casino games, slots, and live dealer games</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAddGame(true)}
            title="Add new casino game"
            aria-label="Add new casino game"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </button>
          <button 
            onClick={handleExportGames}
            title="Export casino games report"
            aria-label="Export casino games report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Games</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{gameStats.totalGames}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Games</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{gameStats.activeGames}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Players</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{gameStats.totalPlayers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {gameStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg RTP</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{gameStats.avgRTP.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <button 
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              title={`Filter by ${category.name}`}
              aria-label={`Filter by ${category.name}`}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGames.map((game) => {
          const IconComponent = getCategoryIcon(game.category);
          const popularityPercentage = game.popularity;
          
          return (
            <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                      {game.featured && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                      {getStatusBadge(game.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Provider: {game.provider}</span>
                      <span>RTP: {game.rtp}%</span>
                      <span>Category: {game.category.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewGame(game)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                    title="View details" 
                    aria-label="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit game" aria-label="Edit game">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                  {game.status === 'active' ? (
                    <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" title="Pause game" aria-label="Pause game">
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Activate game" aria-label="Activate game">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Players</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{game.players.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Revenue</span>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {game.revenue.toLocaleString()}</p>
                </div>
              </div>

              {/* Betting Limits */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Min Bet:</span>
                  <p className="font-medium text-gray-900">GH₵ {game.minBet}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Bet:</span>
                  <p className="font-medium text-gray-900">GH₵ {game.maxBet.toLocaleString()}</p>
                </div>
              </div>

              {/* Popularity Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Popularity Score</span>
                  <span>{popularityPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      popularityPercentage >= 80 ? 'bg-green-500' : 
                      popularityPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${popularityPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Game Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Last played: {game.lastPlayed}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Action button" aria-label="Action button">
                    Analytics
                  </button>
                  <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors" title="Action button" aria-label="Action button">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Game Modal */}
      {showAddGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Casino Game</h3>
              <button 
                onClick={() => setShowAddGame(false)}
                title="Close modal"
                aria-label="Close modal"
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game Name</label>
                  <input title="Input field" aria-label="Input field"
                    type="text"
                    placeholder="Enter game name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="slots">Slots</option>
                    <option value="table_games">Table Games</option>
                    <option value="live_casino">Live Casino</option>
                    <option value="jackpots">Jackpots</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <input title="Input field" aria-label="Input field" 
                    type="text"
                    placeholder="Enter provider name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RTP (%)</label>
                  <input title="Input field" aria-label="Input field" 
                    type="number"
                    step="0.01"
                    placeholder="96.50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Bet (GH₵)</label>
                  <input title="Input field" aria-label="Input field" 
                    type="number"
                    step="0.01"
                    placeholder="0.10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Bet (GH₵)</label>
                  <input title="Input field" aria-label="Input field" 
                    type="number"
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500"  title="Input field" aria-label="Input field" />
                  <span className="ml-2 text-sm text-gray-700">Featured Game</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500"  title="Input field" aria-label="Input field" />
                  <span className="ml-2 text-sm text-gray-700">Active on Launch</span>
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button" 
                  type="button"
                  // onClick={() => /* TODO: Add function */}
            
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button" 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Add Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Game Details Modal */}
      <Modal
        isOpen={isGameModalOpen}
        onClose={closeGameModal}
        title="Game Details"
        size="lg"
      >
        {selectedGame && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Game Information</h4>
                <p className="text-sm text-gray-600">Name: {selectedGame.name}</p>
                <p className="text-sm text-gray-600">Category: {selectedGame.category}</p>
                <p className="text-sm text-gray-600">Provider: {selectedGame.provider}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Game Stats</h4>
                <p className="text-sm text-gray-600">Status: {selectedGame.status}</p>
                <p className="text-sm text-gray-600">RTP: {selectedGame.rtp}%</p>
                <p className="text-sm text-gray-600">Players: {selectedGame.players}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Game Description</h4>
              <p className="text-sm text-gray-600">{selectedGame?.description || 'No description available for this game.'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Game Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedGame?.features?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {feature}
                  </span>
                )) || <p className="text-sm text-gray-500">No features listed</p>}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteGame}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Game
              </button>
              <button
                onClick={closeGameModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CasinoGames;
