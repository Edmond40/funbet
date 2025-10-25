import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Trophy,
  Users,
  Calendar,
  TrendingUp,
  Globe,
  Star,
  Activity,
  BarChart3,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { useAdmin } from '../../hooks/useAdmin';

const SportsManagement = () => {
  const { darkMode } = useAdmin();
  const { isOpen: isGlobalSettingsOpen, openModal: openGlobalSettings, closeModal: closeGlobalSettings } = useModal();
  const { isOpen: isAddSportOpen, openModal: openAddSport, closeModal: closeAddSport } = useModal();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSports, setSelectedSports] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const handleFilterSports = () => {
    setFilterOpen(!filterOpen);
    console.log('Filter toggled:', !filterOpen);
  };
  
  const handleMoreActions = (sportId) => {
    console.log('More actions for sport:', sportId);
  };
  
  const handleManageUsers = () => {
    console.log('Managing users for sports');
  };
  
  const handleGlobalSettings = () => {
    openGlobalSettings();
    console.log('Opening global settings');
  };
  
  const handleStarSport = (sportId) => {
    console.log('Starring sport:', sportId);
  };
  
  const handleViewAnalytics = () => {
    console.log('Viewing sports analytics');
  };
  
  const handleUploadData = () => {
    console.log('Uploading sports data');
  };

  // Mock data - wrapped in useMemo to prevent recreation on every render
  const sports= useMemo(() => [
    {
      id: '1',
      name: 'Football',
      icon: '⚽',
      category: 'Popular',
      status: 'active',
      totalMatches: 1250,
      activeMatches: 45,
      totalBets: 125000,
      revenue: 2500000,
      popularity: 95,
      regions: ['Europe', 'Africa', 'South America'],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Basketball',
      icon: '🏀',
      category: 'Popular',
      status: 'active',
      totalMatches: 850,
      activeMatches: 28,
      totalBets: 85000,
      revenue: 1800000,
      popularity: 88,
      regions: ['North America', 'Europe'],
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Tennis',
      icon: '🎾',
      category: 'Popular',
      status: 'active',
      totalMatches: 650,
      activeMatches: 15,
      totalBets: 45000,
      revenue: 950000,
      popularity: 75,
      regions: ['Global'],
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      name: 'Ice Hockey',
      icon: '🏒',
      category: 'Seasonal',
      status: 'active',
      totalMatches: 420,
      activeMatches: 12,
      totalBets: 28000,
      revenue: 580000,
      popularity: 65,
      regions: ['North America', 'Europe'],
      lastUpdated: '2024-01-12'
    },
    {
      id: '5',
      name: 'Cricket',
      icon: '🏏',
      category: 'Regional',
      status: 'maintenance',
      totalMatches: 320,
      activeMatches: 0,
      totalBets: 22000,
      revenue: 450000,
      popularity: 70,
      regions: ['Asia', 'Australia'],
      lastUpdated: '2024-01-10'
    }
  ], []);

  const categories = ['all', 'Popular', 'Seasonal', 'Regional', 'Niche'];
  const statuses = ['all', 'active', 'inactive', 'maintenance'];

  // Filtered sports
  const filteredSports = useMemo(() => {
    return sports.filter(sport => {
      const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || sport.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || sport.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [sports, searchTerm, selectedCategory, selectedStatus]);

  const handleSelectSport = (sportId) => {
    setSelectedSports(prev =>
      prev.includes(sportId)
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSports(
      selectedSports.length === filteredSports.length
        ? []
        : filteredSports.map(sport => sport.id)
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Popular': 'bg-red-100 text-red-800',
      'Seasonal': 'bg-blue-100 text-blue-800',
      'Regional': 'bg-purple-100 text-purple-800',
      'Niche': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sports Management</h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage all sports, leagues, and betting markets
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleFilterSports}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button
                onClick={handleManageUsers}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </button>
              <button
                onClick={() => handleStarSport('global')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                Featured
              </button>
              <button
                onClick={handleViewAnalytics}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </button>
              <button
                onClick={handleUploadData}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>
              <button
                onClick={() => console.log('Global sports view')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Global
              </button>
              <button
                onClick={handleGlobalSettings}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Global Settings"
                aria-label="Global Settings"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={openAddSport}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                title="Add New Sport"
                aria-label="Add New Sport"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Sport
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Sports</p>
                <p className="text-2xl font-bold">{sports.length}</p>
              </div>
              <Trophy className={`w-8 h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Sports</p>
                <p className="text-2xl font-bold">{sports.filter(s => s.status === 'active').length}</p>
              </div>
              <Activity className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Matches</p>
                <p className="text-2xl font-bold">{sports.reduce((acc, s) => acc + s.totalMatches, 0)}</p>
              </div>
              <Calendar className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                <p className="text-2xl font-bold">GHS {sports.reduce((acc, s) => acc + s.revenue, 0).toLocaleString()}</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm mb-6`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search sports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                  title="Search sports"
                  aria-label="Search sports"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}
              title="Filter by category"
              aria-label="Filter by category"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
              }`}
              title="Filter by status"
              aria-label="Filter by status"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Bulk Actions */}
            {selectedSports.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                  title={`Activate ${selectedSports.length} sports`}
                  aria-label={`Activate ${selectedSports.length} sports`}
                >
                  Activate ({selectedSports.length})
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                  } text-white`}
                  title={`Deactivate ${selectedSports.length} sports`}
                  aria-label={`Deactivate ${selectedSports.length} sports`}
                >
                  Deactivate
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sports Table */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm overflow-hidden`}>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">All Sports ({filteredSports.length})</h3>
              <div className="flex items-center space-x-3">
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center ${
                    darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Export sports data"
                  aria-label="Export sports data"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center ${
                    darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Refresh data"
                  aria-label="Refresh data"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedSports.length === filteredSports.length}
                      onChange={handleSelectAll}
                      className="rounded"
                      title="Select all sports"
                      aria-label="Select all sports"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Matches
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Popularity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredSports.map((sport) => (
                  <tr key={sport.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSports.includes(sport.id)}
                        onChange={() => handleSelectSport(sport.id)}
                        className="rounded"
                        title={`Select ${sport.name}`}
                        aria-label={`Select ${sport.name}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{sport.icon}</span>
                        <div>
                          <div className="font-medium">{sport.name}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {sport.regions.join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(sport.category)}`}>
                        {sport.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(sport.status)}`}>
                        {sport.status.charAt(0).toUpperCase() + sport.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{sport.totalMatches}</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {sport.activeMatches} active
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">GHS {sport.revenue.toLocaleString()}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {sport.totalBets} bets
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`bg-blue-600 h-2 rounded-full`}
                            style={{ width: `${sport.popularity}%` }.CSSProperties}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{sport.popularity}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-600' : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'
                          }`}
                          title={`View ${sport.name} details`}
                          aria-label={`View ${sport.name} details`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-green-400 hover:bg-gray-600' : 'text-gray-400 hover:text-green-600 hover:bg-gray-100'
                          }`}
                          title={`Edit ${sport.name}`}
                          aria-label={`Edit ${sport.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600' : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                          }`}
                          title={`Delete ${sport.name}`}
                          aria-label={`Delete ${sport.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoreActions(sport.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                          }`}
                          title={`More actions for ${sport.name}`}
                          aria-label={`More actions for ${sport.name}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Global Settings Modal */}
      {isGlobalSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Global Settings</h3>
              <button
                onClick={closeGlobalSettings}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="Close settings"
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Default Odds Format
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    title="Default odds format"
                    aria-label="Default odds format"
                  >
                    <option value="decimal">Decimal (1.50)</option>
                    <option value="fractional">Fractional (1/2)</option>
                    <option value="american">American (+150)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Bet Amount (GHS)
                  </label>
                  <input
                    type="number"
                    defaultValue="10000"
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    title="Maximum bet amount"
                    aria-label="Maximum bet amount"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Auto-refresh Interval (seconds)
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    title="Auto-refresh interval"
                    aria-label="Auto-refresh interval"
                  >
                    <option value="30">30 seconds</option>
                    <option value="60">1 minute</option>
                    <option value="300">5 minutes</option>
                    <option value="0">Disabled</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Maintenance Mode
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenance"
                      className="rounded"
                      title="Enable maintenance mode"
                      aria-label="Enable maintenance mode"
                    />
                    <label htmlFor="maintenance" className="ml-2 text-sm">
                      Enable system-wide maintenance mode
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={closeGlobalSettings}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                title="Cancel changes"
                aria-label="Cancel changes"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Save settings"
                aria-label="Save settings"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sport Modal */}
      {isAddSportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add New Sport</h3>
              <button
                onClick={closeAddSport}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="Close add sport dialog"
                aria-label="Close add sport dialog"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Sport Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Baseball"
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                    }`}
                    title="Sport name"
                    aria-label="Sport name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Icon/Emoji
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ⚾"
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                    }`}
                    title="Sport icon"
                    aria-label="Sport icon"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    title="Sport category"
                    aria-label="Sport category"
                  >
                    <option value="Popular">Popular</option>
                    <option value="Seasonal">Seasonal</option>
                    <option value="Regional">Regional</option>
                    <option value="Niche">Niche</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Initial Status
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                    }`}
                    title="Initial status"
                    aria-label="Initial status"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Available Regions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Europe', 'North America', 'South America', 'Africa', 'Asia', 'Australia'].map(region => (
                    <label key={region} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded mr-2"
                        title={`Available in ${region}`}
                        aria-label={`Available in ${region}`}
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={closeAddSport}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                title="Cancel sport creation"
                aria-label="Cancel sport creation"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="Create new sport"
                aria-label="Create new sport"
              >
                Create Sport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsManagement;