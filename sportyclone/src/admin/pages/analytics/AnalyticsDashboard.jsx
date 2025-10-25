import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe,
  Activity,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const periods = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const revenueData = [
    { date: '2024-01-15', revenue: 45000, users: 1200, bets: 3400 },
    { date: '2024-01-16', revenue: 52000, users: 1350, bets: 3800 },
    { date: '2024-01-17', revenue: 48000, users: 1180, bets: 3200 },
    { date: '2024-01-18', revenue: 61000, users: 1450, bets: 4100 },
    { date: '2024-01-19', revenue: 55000, users: 1320, bets: 3700 },
    { date: '2024-01-20', revenue: 58000, users: 1380, bets: 3900 },
    { date: '2024-01-21', revenue: 63000, users: 1520, bets: 4300 }
  ];

  const topSports = [
    { name: 'Football', revenue: 234567, percentage: 45, bets: 12450, trend: '+12%' },
    { name: 'Basketball', revenue: 156789, percentage: 30, bets: 8920, trend: '+8%' },
    { name: 'Tennis', revenue: 89234, percentage: 17, bets: 5670, trend: '+15%' },
    { name: 'Baseball', revenue: 41567, percentage: 8, bets: 2340, trend: '-3%' }
  ];

  const userMetrics = [
    { metric: 'New Registrations', value: 1247, change: '+23%', trend: 'up' },
    { metric: 'Active Users', value: 8934, change: '+12%', trend: 'up' },
    { metric: 'Retention Rate', value: '78%', change: '+5%', trend: 'up' },
    { metric: 'Avg. Session Duration', value: '24m', change: '-2%', trend: 'down' }
  ];

  const riskAlerts = [
    {
      id: 1,
      type: 'high_value_bet',
      message: 'High value bet detected: $25,000 on Manchester vs Arsenal',
      severity: 'high',
      timestamp: '2 minutes ago',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'unusual_pattern',
      message: 'Unusual betting pattern detected for user ID: 12345',
      severity: 'medium',
      timestamp: '15 minutes ago',
      user: 'Jane Smith'
    },
    {
      id: 3,
      type: 'multiple_accounts',
      message: 'Potential multiple accounts from same IP address',
      severity: 'high',
      timestamp: '1 hour ago',
      user: 'Multiple Users'
    },
    {
      id: 4,
      type: 'rapid_deposits',
      message: 'Rapid successive deposits detected',
      severity: 'low',
      timestamp: '2 hours ago',
      user: 'Mike Johnson'
    }
  ];

  const geographicData = [
    { country: 'United States', users: 3245, revenue: '$145,670', percentage: 35 },
    { country: 'United Kingdom', users: 2156, revenue: '$98,450', percentage: 23 },
    { country: 'Germany', users: 1876, revenue: '$87,230', percentage: 20 },
    { country: 'Canada', users: 1234, revenue: '$56,780', percentage: 13 },
    { country: 'Australia', users: 987, revenue: '$43,210', percentage: 9 }
  ];

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      low: { bg: 'bg-blue-100', text: 'text-blue-800' }
    };
    
    const config = severityConfig[severity] || severityConfig.low;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor performance, user behavior, and business insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Select time period"
            aria-label="Select time period"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <button title="Action button" aria-label="Action button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
            Refresh
          </button>
          <button title="Action button" aria-label="Action button" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$2,847,392</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 ml-1">+18.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">12,847</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 ml-1">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bets</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">89,234</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 ml-1">+8.7%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">18.4%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600 ml-1">+3.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <select title="Select option" aria-label="Select option"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="bets">Bets</option>
            </select>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-red-500 rounded-t"
                  style={{ 
                    height: `${(data[selectedMetric] / Math.max(...revenueData.map(d => d[selectedMetric]))) * 200}px` 
                  }}
                ></div>
                <div className="text-xs text-gray-500 mt-2 transform -rotate-45">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Sports by Revenue</h2>
            <button title="Action button" aria-label="Action button" className="text-sm text-red-600 hover:text-red-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topSports.map((sport, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{sport.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">${sport.revenue.toLocaleString()}</span>
                      <span className={`text-xs font-medium ${
                        sport.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {sport.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={sport.percentage > 0 ? { width: `${sport.percentage}%` } : undefined}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{sport.bets.toLocaleString()} bets</span>
                    <span className="text-xs text-gray-500">{sport.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Metrics and Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">User Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {userMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{metric.metric}</span>
                  <div className={`flex items-center ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="text-xs ml-1">{metric.change}</span>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Geographic Distribution</h2>
            <Globe className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            {geographicData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{country.country.substring(0, 2)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{country.country}</div>
                    <div className="text-xs text-gray-500">{country.users.toLocaleString()} users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{country.revenue}</div>
                  <div className="text-xs text-gray-500">{country.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Risk Management Alerts</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{riskAlerts.length} active alerts</span>
              <button title="Action button" aria-label="Action button" className="text-sm text-red-600 hover:text-red-700 font-medium">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      User: {alert.user} • {alert.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getSeverityBadge(alert.severity)}
                  <button className="text-gray-400 hover:text-gray-600" title="View Details" aria-label="View Details">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
