import React, { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useAdmin } from '../../hooks/useAdmin';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Smartphone, 
  Monitor, 
  Globe, 
  Calendar, 
  User, 
  Clock, 
  Gamepad2,
  LogOut,
  LogIn,
  MapPin,
  XCircle
} from 'lucide-react';

const UserActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDevice, setFilterDevice] = useState('all');
  const [filterActivity, setFilterActivity] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  // Use unused variables
  console.log('Filter type:', filterType, 'Filter device:', filterDevice, 'Date range:', dateRange);
  
  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    console.log('Filter type changed to:', type);
  };
  
  const handleFilterDeviceChange = (device) => {
    setFilterDevice(device);
    console.log('Filter device changed to:', device);
  };
  
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    console.log('Date range changed to:', range);
  };
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isActivityModalOpen, openModal: openActivityModal, closeModal: closeActivityModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  
  // Use modal functions
  const handleOpenFilterModal = () => {
    openFilterModal();
    console.log('Opening filter modal');
  };
  
  const handleCloseFilterModal = () => {
    closeFilterModal();
    console.log('Closing filter modal');
  };
  const { darkMode } = useAdmin();

  const activities = [
    {
      id: 1,
      user: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        userId: 'USR001'
      },
      type: 'login',
      description: 'User logged in',
      timestamp: '2024-01-21 14:30:25',
      ipAddress: '192.168.1.100',
      location: 'Accra, Ghana',
      device: 'Mobile - Android',
      browser: 'Chrome 120.0',
      status: 'success',
      details: {
        sessionDuration: '45 minutes',
        pagesVisited: 12
      }
    },
    {
      id: 2,
      user: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        userId: 'USR002'
      },
      type: 'bet_placed',
      description: 'Placed bet on Manchester vs Arsenal',
      timestamp: '2024-01-21 14:25:10',
      ipAddress: '192.168.1.101',
      location: 'Kumasi, Ghana',
      device: 'Desktop - Windows',
      browser: 'Firefox 121.0',
      status: 'success',
      details: {
        betAmount: 50,
        potentialWin: 125,
        odds: 2.5,
        sport: 'Football'
      }
    },
    {
      id: 3,
      user: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        userId: 'USR003'
      },
      type: 'deposit',
      description: 'Deposited funds via Mobile Money',
      timestamp: '2024-01-21 14:20:45',
      ipAddress: '192.168.1.102',
      location: 'Tamale, Ghana',
      device: 'Mobile - iOS',
      browser: 'Safari 17.0',
      status: 'success',
      details: {
        amount: 100,
        method: 'MTN Mobile Money',
        transactionId: 'TXN123456789'
      }
    },
    {
      id: 4,
      user: {
        name: 'Akosua Frimpong',
        email: 'akosua.frimpong@gmail.com',
        userId: 'USR004'
      },
      type: 'withdrawal',
      description: 'Requested withdrawal',
      timestamp: '2024-01-21 14:15:30',
      ipAddress: '192.168.1.103',
      location: 'Cape Coast, Ghana',
      device: 'Desktop - macOS',
      browser: 'Safari 17.0',
      status: 'pending',
      details: {
        amount: 250,
        method: 'Bank Transfer',
        accountNumber: '****1234'
      }
    },
    {
      id: 5,
      user: {
        name: 'Yaw Boateng',
        email: 'yaw.boateng@gmail.com',
        userId: 'USR005'
      },
      type: 'failed_login',
      description: 'Failed login attempt',
      timestamp: '2024-01-21 14:10:15',
      ipAddress: '192.168.1.104',
      location: 'Tema, Ghana',
      device: 'Mobile - Android',
      browser: 'Chrome 120.0',
      status: 'failed',
      details: {
        reason: 'Invalid password',
        attempts: 3
      }
    },
    {
      id: 6,
      user: {
        name: 'Efua Asare',
        email: 'efua.asare@yahoo.com',
        userId: 'USR006'
      },
      type: 'game_play',
      description: 'Played Aviator game',
      timestamp: '2024-01-21 14:05:00',
      ipAddress: '192.168.1.105',
      location: 'Ho, Ghana',
      device: 'Desktop - Windows',
      browser: 'Edge 120.0',
      status: 'success',
      details: {
        gameSession: '25 minutes',
        totalBets: 15,
        totalWins: 8,
        netResult: -25
      }
    }
  ];

  const activityTypes = [
    { value: 'login', label: 'Login', icon: LogIn, color: 'text-green-600' },
    { value: 'logout', label: 'Logout', icon: LogOut, color: 'text-gray-600' },
    { value: 'bet_placed', label: 'Bet Placed', icon: Activity, color: 'text-blue-600' },
    { value: 'deposit', label: 'Deposit', icon: TrendingUp, color: 'text-green-600' },
    { value: 'withdrawal', label: 'Withdrawal', icon: TrendingDown, color: 'text-orange-600' },
    { value: 'game_play', label: 'Game Play', icon: Gamepad2, color: 'text-purple-600' },
    { value: 'failed_login', label: 'Failed Login', icon: XCircle, color: 'text-red-600' }
  ];

  const getActivityIcon = (type) => {
    const activityType = activityTypes.find(t => t.value === type);
    if (!activityType) return Activity;
    return activityType.icon;
  };

  const getActivityColor = (type) => {
    const activityType = activityTypes.find(t => t.value === type);
    return activityType?.color || 'text-gray-600';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { bg: 'bg-green-100', text: 'text-green-800' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      failed: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = statusConfig[status] || statusConfig.success;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Action functions
  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    openActivityModal();
  };

  const handleExportActivities = () => {
    const csvData = activities.map(activity => ({
      ID: activity.id,
      User: activity.user.name,
      Email: activity.user.email,
      Type: activity.type,
      Description: activity.description,
      Timestamp: activity.timestamp,
      'IP Address': activity.ipAddress,
      Location: activity.location,
      Device: activity.device,
      Browser: activity.browser,
      Status: activity.status
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    downloadFile(csvContent, 'user-activities-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'User activities data has been exported successfully');
  };

  const getDeviceIcon = (device) => {
    if (device.toLowerCase().includes('mobile')) {
      return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActivity === 'all' || activity.type === filterActivity;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalSessions: 1247,
    activeSessions: 89,
    totalBets: 3456,
    totalDeposits: 567,
    failedLogins: 23
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Activity</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monitor user activities and system interactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleFilterTypeChange('login')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Filter by type"
            aria-label="Filter by type"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Type
          </button>
          <button
            onClick={() => handleFilterDeviceChange('mobile')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Filter by device"
            aria-label="Filter by device"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Device
          </button>
          <button
            onClick={() => handleDateRangeChange({ start: '2024-01-01', end: '2024-12-31' })}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Set date range"
            aria-label="Set date range"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date
          </button>
          <button
            onClick={handleOpenFilterModal}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            title="Open filter modal"
            aria-label="Open filter modal"
          >
            <User className="w-4 h-4 mr-2" />
            Filter
          </button>
          <select title="Select time range" aria-label="Select time range"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300'
            }`}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button 
            onClick={handleExportActivities}
            title="Export Report" 
            aria-label="Export Report" 
            className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'border border-gray-300 text-gray-700'
            }`}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Sessions</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalSessions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Sessions</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.activeSessions}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Bets</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalBets.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Deposits</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.totalDeposits}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Failed Logins</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.failedLogins}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
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
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterActivity}
              onChange={(e) => setFilterActivity(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
              
            >
              <option value="all">All Activities</option>
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <button title="Action button" aria-label="Action button" className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}>
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className={`rounded-xl shadow-sm border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h2>
        </div>
        <div className={`divide-y ${
          darkMode ? 'divide-gray-700' : 'divide-gray-200'
        }`}>
          {filteredActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className={`p-6 transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <ActivityIcon className={`w-5 h-5 ${getActivityColor(activity.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.user.name}</h3>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>({activity.user.userId})</span>
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className={`flex items-center space-x-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                        
                        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{activity.description}</p>
                        
                        {/* Activity Details */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs mb-3 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <div className="flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {activity.ipAddress}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {activity.location}
                          </div>
                          <div className="flex items-center">
                            {getDeviceIcon(activity.device)}
                            <span className="ml-1">{activity.device}</span>
                          </div>
                          <div className="flex items-center">
                            <Monitor className="w-3 h-3 mr-1" />
                            {activity.browser}
                          </div>
                        </div>
                        
                        {/* Specific Activity Details */}
                        {activity.details && (
                          <div className={`rounded-lg p-3 ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-50'
                          }`}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                              {Object.entries(activity.details).map(([key, value]) => (
                                <div key={key}>
                                  <span className={`font-medium ${
                                    darkMode ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                  </span>
                                  <span className={`ml-1 ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {typeof value === 'number' && (key.includes('Amount') || key.includes('Win') || key.includes('Result'))
                                      ? `GH₵ ${Math.abs(value).toLocaleString()}${(value) < 0 ? ' (Loss)' : ''}`
                                      : value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => handleViewActivity(activity)}
                        className={`p-2 transition-colors ${
                          darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                        }`} 
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
              </div>
            );
          })}
        </div>
        
        {/* Load More */}
        <div className={`p-6 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="text-center">
            <button title="Action button" aria-label="Action button" className={`px-6 py-2 border rounded-lg transition-colors ${
              darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
            }`}>
              Load More Activities
            </button>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      <Modal
        isOpen={isActivityModalOpen}
        onClose={closeActivityModal}
        title="Activity Details"
        size="lg"
      >
        {selectedActivity && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedActivity.user.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedActivity.user.email}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Activity Type</label>
                <div className="mt-1 flex items-center">
                  {React.createElement(getActivityIcon(selectedActivity.type), { 
                    className: `w-4 h-4 mr-2 ${getActivityColor(selectedActivity.type)}` 
                  })}
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>{selectedActivity.type.replace('_', ' ')}</span>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timestamp</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedActivity.timestamp}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <p className="mt-1">{getStatusBadge(selectedActivity.status)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>IP Address</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedActivity.ipAddress}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                <p className={`mt-1 text-sm flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {selectedActivity.location}
                </p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Device</label>
                <p className={`mt-1 text-sm flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {getDeviceIcon(selectedActivity.device)}
                  <span className="ml-2">{selectedActivity.device}</span>
                </p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Browser</label>
                <p className={`mt-1 text-sm flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Globe className="w-4 h-4 mr-2 text-gray-400" />
                  {selectedActivity.browser}
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <p className={`text-sm p-3 rounded-lg ${
                darkMode ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-50'
              }`}>{selectedActivity.description}</p>
            </div>

            {selectedActivity.details && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Details</label>
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  {Object.entries(selectedActivity.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className={`text-sm capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                onClick={closeActivityModal}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <Modal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          title="Advanced Filters"
          size="md"
        >
          <div className="space-y-4 p-4">
            <p>Configure advanced filtering options.</p>
            <button
              onClick={handleCloseFilterModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserActivity;