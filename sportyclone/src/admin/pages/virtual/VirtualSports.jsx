import React from 'react';
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
  Clock,
  Target,
  Zap,
  Trophy,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const VirtualSports = () => {
  
  const virtualGames = [
    {
      id: 1,
      name: 'Virtual Football League',
      type: 'football',
      status: 'active',
      provider: 'SportyVirtual',
      players: 15420,
      totalBets: 234567,
      revenue: 456789,
      rtp: 94.5,
      frequency: '3 minutes',
      lastUpdate: '2024-01-21 16:45:12',
      popularity: 85.2
    },
    {
      id: 2,
      name: 'Virtual Horse Racing',
      type: 'horse_racing',
      status: 'active',
      provider: 'RaceVirtual',
      players: 8950,
      totalBets: 123456,
      revenue: 234567,
      rtp: 92.8,
      frequency: '2 minutes',
      lastUpdate: '2024-01-21 16:30:25',
      popularity: 72.1
    },
    {
      id: 3,
      name: 'Virtual Basketball',
      type: 'basketball',
      status: 'maintenance',
      provider: 'SportyVirtual',
      players: 5678,
      totalBets: 67890,
      revenue: 123456,
      rtp: 93.2,
      frequency: '5 minutes',
      lastUpdate: '2024-01-21 15:20:18',
      popularity: 58.7
    },
    {
      id: 4,
      name: 'Virtual Tennis',
      type: 'tennis',
      status: 'active',
      provider: 'TennisVirtual',
      players: 3456,
      totalBets: 45678,
      revenue: 89012,
      rtp: 95.1,
      frequency: '4 minutes',
      lastUpdate: '2024-01-21 14:15:30',
      popularity: 45.3
    }
  ];

  const gameStats = {
    totalGames: virtualGames.length,
    activeGames: virtualGames.filter(g => g.status === 'active').length,
    totalPlayers: virtualGames.reduce((sum, g) => sum + g.players, 0),
    totalRevenue: virtualGames.reduce((sum, g) => sum + g.revenue, 0),
    avgRTP: virtualGames.reduce((sum, g) => sum + g.rtp, 0) / virtualGames.length
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

  const getTypeIcon = (type) => {
    const typeIcons = {
      football: Target,
      horse_racing: Zap,
      basketball: Trophy,
      tennis: Play
    };
    return typeIcons[type] || Trophy;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Virtual Sports</h1>
          <p className="text-gray-600 mt-1">Manage virtual sports games and simulations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            title="Add new virtual game"
            aria-label="Add new virtual game"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Game
          </button>
          <button 
            title="Export virtual sports report"
            aria-label="Export virtual sports report"
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
              <Trophy className="w-6 h-6 text-white" />
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

      {/* Virtual Games List */}
      <div className="space-y-4">
        {virtualGames.map((game) => {
          const IconComponent = getTypeIcon(game.type);
          const popularityPercentage = game.popularity;

          return (
            <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                      {getStatusBadge(game.status)}
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {game.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Provider: {game.provider}</span>
                      <span>Frequency: {game.frequency}</span>
                      <span>RTP: {game.rtp}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details" aria-label="View details">
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
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Start game" aria-label="Start game">
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Game Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Players</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{game.players.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Total Bets</span>
                    <Target className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{game.totalBets.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Revenue</span>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {game.revenue.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Last Update</span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mt-1">{game.lastUpdate}</p>
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
                    className={`h-3 rounded-full ${popularityPercentage >= 80 ? 'bg-green-500' :
                        popularityPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${popularityPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Game Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Provider: {game.provider}</span>
                  <span>RTP: {game.rtp}%</span>
                  <span>Frequency: {game.frequency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors" title="Action button" aria-label="Action button">
                    View Analytics
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" title="Action button" aria-label="Action button">
                    Manage Game
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default VirtualSports;
