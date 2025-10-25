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
  Edit,
  Plus,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Square,
  Settings,
  Trophy,
  Zap,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react';


const MatchesEvents = () => {
  const [filterSport, setFilterSport] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMatch, setShowAddMatch] = useState(false);

  const { addToast } = useToast();
  const { isOpen: isMatchModalOpen, openModal: openMatchModal, closeModal: closeMatchModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();

  const handleViewMatch = (match) => {
    setSelectedMatch(match);
    openMatchModal();
  };

  const handleUpdateMatch = async (match) => {
    const confirmed = await confirm({ title: 'Update Match', message: `Update ${match.homeTeam} vs ${match.awayTeam}?`, confirmText: 'Update', type: 'info' });
    if (confirmed) addToast('success', 'Match Updated', 'Match has been updated successfully');
  };

  const handleExportMatches = () => {
    const csvContent = matches
      .map(match => `${match.homeTeam},${match.awayTeam},${match.sport},${match.league},${match.status},${match.date},${match.time}`)
      .join('\n');
    downloadFile('home,away,sport,league,status,date,time\n' + csvContent, 'matches.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Matches exported successfully');
  };

  const matches = useMemo(() => [
      {
        id: 1,
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        sport: 'Football',
        league: 'Premier League',
        status: 'scheduled',
        date: '2024-01-20',
        time: '15:00',
        venue: 'Emirates Stadium',
        odds: { home: 1.85, draw: 3.4, away: 4.2 },
        betsCount: 12456,
        totalVolume: 345678,
        totalBets: 38456,
        featured: true,
        priority: 'high'
      },
      {
        id: 2,
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        sport: 'Football',
        league: 'Premier League',
        status: 'live',
        date: '2024-01-19',
        time: '17:30',
        venue: 'Old Trafford',
        odds: { home: 2.05, draw: 3.6, away: 3.2 },
        liveScore: { home: 1, away: 1, quarter: '2nd Half' },
        betsCount: 23456,
        totalVolume: 567890,
        totalBets: 56432,
        featured: true,
        priority: 'high'
      },
      {
        id: 3,
        homeTeam: 'LA Lakers',
        awayTeam: 'Boston Celtics',
        sport: 'Basketball',
        league: 'NBA',
        status: 'scheduled',
        date: '2024-01-22',
        time: '20:00',
        venue: 'Crypto.com Arena',
        odds: { home: 1.9, away: 1.9 },
        betsCount: 8456,
        totalVolume: 245678,
        totalBets: 29876,
        featured: false,
        priority: 'medium'
      },
      {
        id: 4,
        homeTeam: 'Rafael Nadal',
        awayTeam: 'Novak Djokovic',
        sport: 'Tennis',
        league: 'Australian Open',
        status: 'postponed',
        date: '2024-01-25',
        time: '09:00',
        venue: 'Rod Laver Arena',
        odds: { home: 2.4, away: 1.6 },
        betsCount: 5623,
        totalVolume: 198450,
        totalBets: 16789,
        featured: false,
        priority: 'medium'
      },
      {
        id: 5,
        homeTeam: 'New York Yankees',
        awayTeam: 'Boston Red Sox',
        sport: 'Baseball',
        league: 'MLB',
        status: 'finished',
        date: '2024-01-15',
        time: '19:30',
        venue: 'Yankee Stadium',
        odds: { home: 1.75, away: 2.2 },
        betsCount: 6789,
        totalVolume: 154320,
        totalBets: 20987,
        featured: false,
        priority: 'low'
      }
    ], []);

  const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey'];
  const statuses= ['scheduled', 'live', 'finished', 'postponed', 'cancelled'];

    const getStatusBadge = (status) => {
      const statusConfig = {
        scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
        live: { bg: 'bg-green-100', text: 'text-green-800', icon: Activity },
        finished: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
        postponed: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
        cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
      };

      const config = statusConfig[status] || statusConfig.scheduled;
      const IconComponent = config.icon;

      return (
        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
          <IconComponent className="w-3 h-3 mr-1" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    };

    const getPriorityBadge = (priority) => {
      const priorityConfig = {
        high: { bg: 'bg-red-100', text: 'text-red-800' },
        medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        low: { bg: 'bg-gray-100', text: 'text-gray-800' }
      };

      const config = priorityConfig[priority] || priorityConfig.medium;

      return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
          {priority.toUpperCase()}
        </span>
      );
    };

    const filteredMatches = useMemo(() => {
      return matches.filter(match => {
        const matchesSearch = match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.league.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = filterSport === 'all' || match.sport === filterSport;
        const matchesStatus = filterStatus === 'all' || match.status === filterStatus;
        return matchesSearch && matchesSport && matchesStatus;
      });
    }, [matches, searchTerm, filterSport, filterStatus]);

    const stats = useMemo(() => ({
      totalMatches: matches.length,
      liveMatches: matches.filter(m => m.status === 'live').length,
      scheduledMatches: matches.filter(m => m.status === 'scheduled').length,
      totalVolume: matches.reduce((sum, m) => sum + m.totalVolume, 0)
    }), [matches]);

    const handleMatchAction = async (match, action) => {
      if (action === 'edit') {
        await handleUpdateMatch(match);
        return;
      }

      if (action === 'settings') {
        addToast('info', 'Match Settings', 'Match settings panel coming soon');
        return;
      }

      const actionText = action === 'start' ? 'Start Match' : 'Finish Match';
      const confirmed = await confirm({
        title: actionText,
        message: `${actionText} for ${match.homeTeam} vs ${match.awayTeam}?`,
        confirmText: actionText.split(' ')[0],
        type: action === 'start' ? 'info' : 'warning'
      });

      if (confirmed) {
        addToast('success', `Match ${action === 'start' ? 'Started' : 'Finished'}`, `${match.homeTeam} vs ${match.awayTeam} has been ${action === 'start' ? 'started' : 'completed'}.`);
      }
    };

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Matches & Events</h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage sports matches and live events</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddMatch(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              title="Add new match"
              aria-label="Add new match"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Match
            </button>
            <button
              onClick={handleExportMatches}
              className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'border border-gray-300 text-gray-700'
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Schedule
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Matches</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalMatches}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Live Matches</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.liveMatches}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Scheduled</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.scheduledMatches}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Volume</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>GH₵ {stats.totalVolume.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              <select
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
                className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                title="Filter by sport"
              >
                <option value="all">All Sports</option>
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300'
                }`}
                title="Filter by status"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>

            <button className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`} title="Apply more filters" aria-label="Apply more filters">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <div key={match.id} className={`rounded-xl shadow-sm border p-6 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    {match.featured && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <Zap className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                    {getStatusBadge(match.status)}
                    {getPriorityBadge(match.priority)}
                  </div>

                  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      {match.sport} - {match.league}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {match.date} at {match.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.venue}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {match.betsCount} bets
                    </div>
                  </div>

                  {/* Live Score */}
                  {match.liveScore && (
                    <div className={`border rounded-lg p-3 mb-3 ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{match.homeTeam}</div>
                            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{match.liveScore.home}</div>
                          </div>
                          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>-</div>
                          <div className="text-center">
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{match.awayTeam}</div>
                            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{match.liveScore.away}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>LIVE</div>
                          <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {match.liveScore.quarter || match.liveScore.sets}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Odds Display */}
                  <div className={`rounded-lg p-3 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Current Odds</span>
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Volume: GH₵ {match.totalVolume.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className={`text-center p-2 rounded border ${
                        darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'
                      }`}>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{match.homeTeam}</div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{match.odds.home}</div>
                      </div>
                      {match.odds.draw && (
                        <div className={`text-center p-2 rounded border ${
                          darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'
                        }`}>
                          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Draw</div>
                          <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{match.odds.draw}</div>
                        </div>
                      )}
                      <div className={`text-center p-2 rounded border ${
                        darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white'
                      }`}>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{match.awayTeam}</div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{match.odds.away}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleViewMatch(match)}
                    className={`p-2 transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'
                    }`}
                    title="View details"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleMatchAction(match, 'edit')}
                    className={`p-2 transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-600'
                    }`}
                    title="Edit match"
                  >
                    <Edit className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleMatchAction(match, 'settings')}
                    className={`p-2 transition-colors ${
                      darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-400 hover:text-purple-600'
                    }`}
                    title="Match settings"
                  >
                    <Settings className="w-4 h-4" aria-hidden="true" />
                  </button>
                  {match.status === 'scheduled' && (
                    <button
                      onClick={() => handleMatchAction(match, 'start')}
                      className={`p-2 transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-600'
                      }`}
                      title="Start match"
                    >
                      <Play className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                  {match.status === 'live' && (
                    <button
                      onClick={() => handleMatchAction(match, 'finish')}
                      className={`p-2 transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                      }`}
                      title="Finish match"
                    >
                      <Square className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Match Modal */}
        {showAddMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Match</h3>
                <button
                  onClick={() => setShowAddMatch(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Close add match dialog"
                  aria-label="Close add match dialog"
                >
                  <XCircle className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                    <select title="Select option" aria-label="Select option"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {sports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">League</label>
                    <input
                      type="text"
                      title="Input field" aria-label="Input field"
                      placeholder="Enter league name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Team</label>
                    <input
                      type="text"
                      title="Input field" aria-label="Input field"
                      placeholder="Enter home team"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Away Team</label>
                    <input
                      type="text"
                      title="Input field" aria-label="Input field"
                      placeholder="Enter away team"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      title="Input field" aria-label="Input field"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      title="Input field" aria-label="Input field"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select title="Input field" aria-label="Input field"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="Enter venue name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-700">Featured Match</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-700">Enable Live Betting</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMatch(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Cancel match creation" aria-label="Cancel match creation"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    title="Add new match" aria-label="Add new match"
                  >
                    Add Match
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Match Details Modal */}
        {isMatchModalOpen && selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                </h3>
                <button
                  onClick={() => {
                    setSelectedMatch(null);
                    closeMatchModal();
                  }}
                  title="Close match details"
                  aria-label="Close match details"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Match Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sport:</span>
                      <span className="font-medium">{selectedMatch.sport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">League:</span>
                      <span className="font-medium">{selectedMatch.league}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{selectedMatch.date} at {selectedMatch.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue:</span>
                      <span className="font-medium">{selectedMatch.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      {getStatusBadge(selectedMatch.status)}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Betting Statistics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bets:</span>
                      <span className="font-medium">{selectedMatch.betsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Volume:</span>
                      <span className="font-medium">GH₵ {selectedMatch.totalVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      {getPriorityBadge(selectedMatch.priority)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Featured:</span>
                      <span className="font-medium">{selectedMatch.featured ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setSelectedMatch(null);
                      closeMatchModal();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    title="Edit match details"
                    aria-label="Edit match details"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Edit Match
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default MatchesEvents;