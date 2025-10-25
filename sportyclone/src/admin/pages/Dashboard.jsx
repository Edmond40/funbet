import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  UserPlus,
  CreditCard,
  Trophy,
  RefreshCw,
  Download
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { useToast, useModal, useApi } from '../hooks';
import { formatCurrency, formatNumber, downloadFile } from '../utils';
import { userService, bettingService, financialService } from '../services';
import { LoadingSpinner, Modal } from '../components/ui';

const Dashboard = () => {
  const { stats, darkMode } = useAdmin();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { isOpen: isActivityModalOpen, openModal: openActivityModal, closeModal: closeActivityModal } = useModal();
  
  // API calls for dashboard data
  const { 
    data: userData, 
    loading: userLoading, 
    execute: fetchUserStats 
  } = useApi(userService.getUserStats);
  
  const { 
    data: bettingData, 
    loading: bettingLoading, 
    execute: fetchBettingStats 
  } = useApi(bettingService.getBettingStats);
  
  const { 
    data: financialData, 
    loading: financialLoading, 
    execute: fetchFinancialStats 
  } = useApi(financialService.getFinancialStats);

  // These will be populated from API calls or fallback to static data

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchUserStats(),
        fetchBettingStats(),
        fetchFinancialStats()
      ]);
      
      // Data fetched successfully
      addToast('success', 'Dashboard Updated', 'All data has been refreshed successfully');
    } catch {
      addToast('error', 'Update Failed', 'Failed to refresh dashboard data');
    } finally {
      setRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate dashboard report
  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    openActivityModal();
  };

  // Generate dashboard report
  const generateReport = () => {
    const reportData = {
      'Generated At': new Date().toISOString(),
      'Total Users': userData?.totalUsers || stats.totalUsers,
      'Active Users': userData?.activeUsers || stats.activeUsers,
      'Total Revenue': financialData?.netRevenue || stats.totalRevenue,
      'Total Bets': bettingData?.totalBets || stats.totalBets,
      'Pending Withdrawals': financialData?.pendingWithdrawals || stats.pendingWithdrawals,
      'Risk Alerts': stats.riskAlerts || 0
    };

    const reportContent = Object.entries(reportData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    downloadFile(reportContent, `dashboard-report-${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
    addToast('success', 'Report Generated', 'Dashboard report has been downloaded successfully');
  };

  // Generate stats cards from real data
  const dashboardStats = [
    {
      title: 'Total Users',
      value: formatNumber(userData?.totalUsers || stats.totalUsers),
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(financialData?.netRevenue || stats.totalRevenue),
      change: '+8.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Bets',
      value: formatNumber(bettingData?.totalBets || stats.totalBets),
      change: '-2.1%',
      changeType: 'decrease',
      icon: Activity,
      color: 'bg-yellow-500'
    },
    {
      title: 'Profit Margin',
      value: '18.4%',
      change: '+3.7%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user John Doe registered',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'high_bet',
      message: 'High value bet placed: $5,000',
      time: '5 minutes ago',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'withdrawal',
      message: 'Withdrawal request: $1,200',
      time: '10 minutes ago',
      icon: ArrowDownRight,
      color: 'text-red-600'
    },
    {
      id: 4,
      type: 'deposit',
      message: 'Large deposit received: $10,000',
      time: '15 minutes ago',
      icon: CreditCard,
      color: 'text-blue-600'
    }
  ];

  const topUsers = [
    { id: 1, name: 'Michael Johnson', bets: 247, winnings: '$12,450', status: 'VIP' },
    { id: 2, name: 'Sarah Williams', bets: 189, winnings: '$8,920', status: 'Premium' },
    { id: 3, name: 'David Brown', bets: 156, winnings: '$6,780', status: 'Regular' },
    { id: 4, name: 'Emma Davis', bets: 134, winnings: '$5,430', status: 'Regular' },
    { id: 5, name: 'James Wilson', bets: 98, winnings: '$4,210', status: 'New' }
  ];

  const popularSports = [
    { name: 'Football', bets: 1247, percentage: 45 },
    { name: 'Basketball', bets: 892, percentage: 32 },
    { name: 'Tennis', bets: 456, percentage: 16 },
    { name: 'Baseball', bets: 234, percentage: 8 },
    { name: 'Others', bets: 123, percentage: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={fetchDashboardData}
            disabled={refreshing}
            className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Refresh Dashboard"
            aria-label="Refresh Dashboard"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={generateReport}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            title="Generate Report"
            aria-label="Generate Report"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200'
          }`}>
            {(userLoading || bettingLoading || financialLoading) && index < 3 ? (
              <div className="flex items-center justify-center h-24">
                <LoadingSpinner size="sm" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.title}</p>
                  <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ml-1 ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className={`text-sm ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className={`lg:col-span-2 rounded-xl shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className={`flex items-center space-x-4 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.message}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                  </div>
                  <button
                    onClick={() => handleViewActivity(activity)}
                    className={`${
                      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="View Activity Details"
                    aria-label="View Activity Details"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className={`w-full text-center text-sm font-medium ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`} title="Action button" aria-label="Action button">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Popular Sports */}
        <div className={`rounded-xl shadow-sm border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className={`p-6 border-b ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Popular Sports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {popularSports.map((sport, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sport.name}</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sport.bets} bets</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-300"
                        style={sport.percentage > 0 ? { width: `${sport.percentage}%` } : undefined}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Users Table */}
      <div className={`rounded-xl shadow-sm border ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Users</h2>
            <button 
              onClick={() => navigate('/admin/users')}
              className={`text-sm font-medium ${
                darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`} 
              title="View All Users" 
              aria-label="View All Users"
            >
              View All Users
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Total Bets
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Total Winnings
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
            }`}>
              {topUsers.map((user) => (
                <tr key={user.id} className={
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-300'
                      }`}>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {user.bets}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    {user.winnings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                      user.status === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                      user.status === 'Regular' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => navigate(`/admin/users/activity?user=${user.id}`)}
                      className={`${
                        darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'
                      }`} 
                      title={`View details for ${user.name}`} 
                      aria-label={`View details for ${user.name}`}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedActivity.type === 'user_registration' ? 'bg-green-100' :
                selectedActivity.type === 'high_bet' ? 'bg-yellow-100' :
                selectedActivity.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                <selectedActivity.icon className={`w-6 h-6 ${
                  selectedActivity.type === 'user_registration' ? 'text-green-600' :
                  selectedActivity.type === 'high_bet' ? 'text-yellow-600' :
                  selectedActivity.type === 'withdrawal' ? 'text-red-600' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedActivity.message}</h3>
                <p className="text-sm text-gray-500">{selectedActivity.time}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Activity Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedActivity.type.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span className="font-medium">{selectedActivity.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeActivityModal}
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

export default Dashboard;