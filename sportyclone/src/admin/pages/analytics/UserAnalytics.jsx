import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
// import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import {
  Download,
  Users,
  TrendingUp,
  Target,
  Clock,
  Smartphone,
  Monitor,
  Eye,
  UserPlus,
  UserMinus,
  Activity
} from 'lucide-react';

const UserAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const { addToast } = useToast();
  const { openModal: openAnalyticsModal } = useModal();

  const handleViewUser = (user) => { console.log('Viewing user:', user); openAnalyticsModal(); };
  const handleExportAnalytics = () => {
    downloadFile('user,bets,deposits,winnings\nuser1,50,1000,800', 'user-analytics.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Analytics data exported successfully');
  };

  const analyticsData = {
    overview: {
      totalUsers: 125430,
      activeUsers: 89245,
      newUsers: 5678,
      newRegistrations: 5678,
      avgSessionDuration: '24m 35s',
      retentionRate: 68.5,
      churnRate: 12.3
    },
    demographics: {
      ageGroups: [
        { range: '18-24', count: 28456, percentage: 22.7 },
        { range: '25-34', count: 45123, percentage: 36.0 },
        { range: '35-44', count: 31245, percentage: 24.9 },
        { range: '45-54', count: 15678, percentage: 12.5 },
        { range: '55+', count: 4928, percentage: 3.9 }
      ],
      locations: [
        { region: 'Greater Accra', users: 45678, percentage: 36.4 },
        { region: 'Ashanti', users: 28456, percentage: 22.7 },
        { region: 'Western', users: 15234, percentage: 12.1 },
        { region: 'Central', users: 12345, percentage: 9.8 },
        { region: 'Eastern', users: 10987, percentage: 8.8 },
        { region: 'Others', users: 12730, percentage: 10.2 }
      ]
    },
    behavior: {
      avgDeposit: 156.78,
      avgBetSize: 25.50,
      avgSessionsPerWeek: 4.2,
      favoriteMarkets: [
        { market: 'Football Match Winner', usage: 45.2 },
        { market: 'Over/Under Goals', usage: 28.7 },
        { market: 'Both Teams to Score', usage: 18.9 },
        { market: 'Correct Score', usage: 7.2 }
      ]
    },
    devices: [
      { type: 'Mobile', users: 89456, percentage: 71.3 },
      { type: 'Desktop', users: 28974, percentage: 23.1 },
      { type: 'Tablet', users: 7000, percentage: 5.6 }
    ]
  };

  const cohortData = [
    { month: 'Jan 2024', newUsers: 3456, retention30: 65, retention60: 45, retention90: 32 },
    { month: 'Feb 2024', newUsers: 4123, retention30: 68, retention60: 48, retention90: 35 },
    { month: 'Mar 2024', newUsers: 3789, retention30: 62, retention60: 42, retention90: 28 },
    { month: 'Apr 2024', newUsers: 4567, retention30: 70, retention60: 52, retention90: 38 },
    { month: 'May 2024', newUsers: 3234, retention30: 64, retention60: 44, retention90: 31 }
  ];

  const topUsers = [
    {
      id: 1,
      name: 'Kwame Asante',
      email: 'kwame.asante@gmail.com',
      totalDeposits: 15678,
      totalBets: 234,
      winRate: 58.5,
      lastActive: '2024-01-21 16:45:12',
      lifetimeValue: 2456.78,
      riskScore: 'Low'
    },
    {
      id: 2,
      name: 'Ama Osei',
      email: 'ama.osei@yahoo.com',
      totalDeposits: 12345,
      totalBets: 189,
      winRate: 62.1,
      lastActive: '2024-01-21 15:30:25',
      lifetimeValue: 1987.65,
      riskScore: 'Low'
    },
    {
      id: 3,
      name: 'Kofi Mensah',
      email: 'kofi.mensah@hotmail.com',
      totalDeposits: 9876,
      totalBets: 156,
      winRate: 45.2,
      lastActive: '2024-01-21 14:20:18',
      lifetimeValue: 1654.32,
      riskScore: 'Medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Analytics</h1>
          <p className="text-gray-600 mt-1">Analyze user behavior, demographics, and engagement patterns</p>
        </div>
        <div className="flex items-center space-x-3">
          <select title="Select time period for analytics" aria-label="Select time period for analytics"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button title="Export user analytics report" aria-label="Export user analytics report"
            onClick={handleExportAnalytics}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.overview.totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.overview.activeUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Registrations</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.overview.newRegistrations.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{analyticsData.overview.churnRate}%</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <UserMinus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{analyticsData.overview.avgSessionDuration}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{analyticsData.overview.retentionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Demographics & Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Age Demographics</h3>
          <div className="space-y-4">
            {analyticsData.demographics.ageGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{group.range} years</span>
                    <span className="text-sm text-gray-500">{group.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${group.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  {group.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
          <div className="space-y-4">
            {analyticsData.demographics.locations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{location.region}</span>
                    <span className="text-sm text-gray-500">{location.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  {location.users.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Usage & Betting Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Usage</h3>
          <div className="space-y-4">
            {analyticsData.devices.map((device, index) => {
              const IconComponent = device.type === 'Mobile' ? Smartphone : device.type === 'Desktop' ? Monitor : Target;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{device.type}</div>
                      <div className="text-sm text-gray-500">{device.percentage}% of users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{device.users.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">users</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Betting Behavior</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">GH₵ {analyticsData.behavior.avgDeposit}</div>
              <div className="text-sm text-green-700">Avg Deposit</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">GH₵ {analyticsData.behavior.avgBetSize}</div>
              <div className="text-sm text-blue-700">Avg Bet Size</div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-3">Popular Markets</h4>
          <div className="space-y-3">
            {analyticsData.behavior.favoriteMarkets.map((market, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{market.market}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${market.usage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{market.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">User Retention Cohort Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">30-Day Retention</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">60-Day Retention</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">90-Day Retention</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cohortData.map((cohort, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cohort.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cohort.newUsers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${cohort.retention30 >= 65 ? 'bg-green-100 text-green-800' :
                        cohort.retention30 >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {cohort.retention30}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${cohort.retention60 >= 45 ? 'bg-green-100 text-green-800' :
                        cohort.retention60 >= 35 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {cohort.retention60}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${cohort.retention90 >= 35 ? 'bg-green-100 text-green-800' :
                        cohort.retention90 >= 25 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {cohort.retention90}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">High-Value Users</h3>
          <button title="View all high-value users" aria-label="View all high-value users"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deposits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifetime Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewUser(user)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    GH₵ {user.totalDeposits.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.totalBets}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.winRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    GH₵ {user.lifetimeValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.riskScore === 'Low' ? 'bg-green-100 text-green-800' :
                        user.riskScore === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {user.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserAnalytics;
