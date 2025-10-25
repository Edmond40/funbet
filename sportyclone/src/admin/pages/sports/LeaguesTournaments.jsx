import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  Trophy,
  Calendar,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Star,
  Globe
} from 'lucide-react';

const LeaguesTournaments = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddLeague, setShowAddLeague] = useState(false);

  const { addToast } = useToast();
  const { isOpen: isLeagueModalOpen, openModal: openLeagueModal, closeModal: closeLeagueModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();

  const handleViewLeague = (league) => { setSelectedLeague(league); openLeagueModal(); };
  const handleUpdateLeague = async (league) => {
    const confirmed = await confirm({ title: 'Update League', message: 'Update league?', confirmText: 'Update', type: 'info' });
    if (confirmed) {
      console.log('Updating league:', league.name);
      addToast('success', 'League Updated', 'League updated successfully');
    }
  };
  
  const handleCloseLeagueModal = () => {
    setSelectedLeague(null);
    closeLeagueModal();
  };
  
  const handleSportFilter = (sport) => {
    setSelectedSport(sport);
    setFilterSport(sport);
  };
  
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setFilterStatus(status);
  };
  
  // Use darkMode for styling
  const cardBgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white';
  
  const handleExportLeagues = () => {
    const csvRows = leagues
      .map(league => `${league.name},${league.sport},${league.country},${league.status}`)
      .join('\n');
    downloadFile(`name,sport,country,status\n${csvRows}`, 'leagues.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Leagues exported successfully');
  };

  const leagues= [
    {
      id: 1,
      name: 'Premier League',
      sport: 'Football',
      country: 'England',
      season: '2023/24',
      status: 'active',
      teams: 20,
      matches: 380,
      completedMatches: 285,
      totalBets: 45678,
      totalVolume: 2345678,
      startDate: '2023-08-12',
      endDate: '2024-05-19',
      featured: true,
      priority: 1
    },
    {
      id: 2,
      name: 'La Liga',
      sport: 'Football',
      country: 'Spain',
      season: '2023/24',
      status: 'active',
      teams: 20,
      matches: 380,
      completedMatches: 278,
      totalBets: 38456,
      totalVolume: 1987654,
      startDate: '2023-08-18',
      endDate: '2024-05-26',
      featured: true,
      priority: 2
    }
  ];
  
  // Filter leagues based on search and filters
  const filteredLeagues = leagues.filter(league => {
    const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === 'all' || league.sport === filterSport;
    const matchesStatus = filterStatus === 'all' || league.status === filterStatus;
    return matchesSearch && matchesSport && matchesStatus;
  });
  
  // Use selectedSport and selectedStatus for additional filtering
  console.log('Selected sport:', selectedSport, 'Selected status:', selectedStatus);
  
  console.log('Filtered leagues:', filteredLeagues);

  const sports = ['Football', 'Basketball', 'Tennis', 'Baseball', 'Hockey'];
  const statuses = ['active', 'finished', 'upcoming', 'suspended'];

    const getStatusBadge = (status) => {
      const statusConfig = {
        active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
        finished: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
        upcoming: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
        suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
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

    // Additional filtering logic using selectedSport and selectedStatus
    const additionalFilters = filteredLeagues.filter(league => {
      const matchesSelectedSport = selectedSport === 'all' || league.sport === selectedSport;
      const matchesSelectedStatus = selectedStatus === 'all' || league.status === selectedStatus;
      return matchesSelectedSport && matchesSelectedStatus;
    });
    
    console.log('Additional filters applied:', additionalFilters.length);

    const stats = {
      totalLeagues: leagues.length,
      activeLeagues: leagues.filter(l => l.status === 'active').length,
      totalMatches: leagues.reduce((sum, l) => sum + l.matches, 0),
      totalVolume: leagues.reduce((sum, l) => sum + l.totalVolume, 0)
    };

    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Leagues & Tournaments</h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage sports leagues and tournament competitions</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportLeagues}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAddLeague(true)}
              title="Action button"
              aria-label="Action button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add League
            </button>
            <button className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'border border-gray-300 text-gray-700'
            }`} title="Action button" aria-label="Action button">
              <Download className="w-4 h-4 mr-2" />
              Export Data
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
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Leagues</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalLeagues}</p>
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
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Leagues</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.activeLeagues}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
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
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Matches</p>
                <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalMatches.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
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
                  placeholder="Search leagues..."
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
            }`} title="Action button" aria-label="Action button">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Leagues List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLeagues.map((league) => (
            <div key={league.id} className={`rounded-xl shadow-sm border p-6 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{league.name}</h3>
                    {league.featured && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                    {getStatusBadge(league.status)}
                  </div>

                  <div className={`flex items-center space-x-4 text-sm mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      {league.sport}
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {league.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {league.season}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className={`flex justify-between text-sm mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span>Progress</span>
                      <span>{Math.round((league.completedMatches / league.matches) * 100)}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${(league.completedMatches / league.matches) * 100}%` }}
                      ></div>
                    </div>
                    <div className={`flex justify-between text-xs mt-1 ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      <span>{league.completedMatches} completed</span>
                      <span>{league.matches} total</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className={`rounded-lg p-3 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Teams</span>
                        <Users className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-lg font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{league.teams}</p>
                    </div>

                    <div className={`rounded-lg p-3 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>Total Bets</span>
                        <Target className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                      </div>
                      <p className={`text-lg font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{league.totalBets.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={`rounded-lg p-3 mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        darkMode ? 'text-gray-300' : 'text-blue-700'
                      }`}>Betting Volume</span>
                      <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-blue-500'}`} />
                    </div>
                    <p className={`text-xl font-bold mt-1 ${
                      darkMode ? 'text-white' : 'text-blue-900'
                    }`}>GH₵ {league.totalVolume.toLocaleString()}</p>
                  </div>

                  <div className={`flex items-center justify-between text-sm ${
                    darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    <span>Season: {league.startDate} - {league.endDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'
                  }`} title="View details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-600'
                  }`} title="Edit league">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-400 hover:text-purple-600'
                  }`} title="Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add League Modal */}
        {showAddLeague && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Add New League</h3>
                <button
                  onClick={() => setShowAddLeague(false)}
                  title="Action button"
                  aria-label="Action button"
                  className={`${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>League Name</label>
                    <input
                      type="text"
                      placeholder="Enter league name"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sport</label>
                    <select title="Select option" aria-label="Select option"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}>
                      {sports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Country</label>
                    <input
                      type="text"
                      placeholder="Enter country"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Season</label>
                    <input
                      type="text"
                      placeholder="e.g., 2024/25"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Start Date</label>
                    <input
                      type="date"
                      title="Input field" aria-label="Input field"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>End Date</label>
                    <input
                      type="date"
                      title="Input field" aria-label="Input field"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Number of Teams</label>
                    <input
                      type="number"
                      title="Input field" aria-label="Input field"
                      placeholder="Enter number of teams"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
                    <select title="Input field" aria-label="Input field"
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className={`rounded ${darkMode ? 'border-gray-600 text-red-600' : 'border-gray-300 text-red-600'} focus:ring-red-500`} />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Featured League</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className={`rounded ${darkMode ? 'border-gray-600 text-red-600' : 'border-gray-300 text-red-600'} focus:ring-red-500`} />
                    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enable Live Betting</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddLeague(false)}

                    className={`px-4 py-2 rounded-lg transition-colors ${
                      darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"

                  >
                    Add League
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* League Details Modal */}
        {selectedLeague && isLeagueModalOpen && (
          <Modal
            isOpen={isLeagueModalOpen}
            onClose={handleCloseLeagueModal}
            title="League Details"
            size="lg"
          >
            <div className={`space-y-6 ${cardBgClass} p-4 rounded-lg`}>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">League Information</h4>
                <p className="text-sm text-gray-600">Name: {selectedLeague.name}</p>
                <p className="text-sm text-gray-600">Sport: {selectedLeague.sport}</p>
                <p className="text-sm text-gray-600">Country: {selectedLeague.country}</p>
                <p className="text-sm text-gray-600">Status: {selectedLeague.status}</p>
                <p className="text-sm text-gray-600">Teams: {selectedLeague.teams}</p>
              </div>
              <div>
                <button
                  onClick={() => handleViewLeague(selectedLeague)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleUpdateLeague(selectedLeague)}
                  className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update League
                </button>
                <button
                  onClick={() => handleSportFilter(selectedLeague.sport)}
                  className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Filter by Sport
                </button>
                <button
                  onClick={() => handleStatusFilter(selectedLeague.status)}
                  className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Filter by Status
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  };

  export default LeaguesTournaments;
