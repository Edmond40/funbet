import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui';
import styles from './PerformanceReports.module.css';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Eye,
  RefreshCw
} from 'lucide-react';

const PerformanceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [showCustomRange, setShowCustomRange] = useState(false);
  
  const { addToast } = useToast();
  const { isOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();
  // Removed unused variables, darkMode
  
  const handleViewReport = (report) => { setSelectedReport(report); openReportModal(); };
  // Export functionality moved to button handlers

  const performanceData = {
    overview: {
      totalRevenue: 4567890,
      revenueGrowth: 15.2,
      totalUsers: 125430,
      userGrowth: 8.7,
      totalBets: 456789,
      betGrowth: 12.3,
      avgBetSize: 125.50,
      betSizeGrowth: -2.1,
      conversionRate: 68.5,
      conversionGrowth: 3.4,
      customerLTV: 2456.78,
      ltvGrowth: 18.9
    },
    sportsPerformance: [
      {
        sport: 'Football',
        revenue: 2345678,
        bets: 234567,
        users: 89456,
        margin: 8.5,
        growth: 12.3,
        marketShare: 51.4
      },
      {
        sport: 'Basketball',
        revenue: 1234567,
        bets: 123456,
        users: 45678,
        margin: 7.2,
        growth: 8.7,
        marketShare: 27.0
      },
      {
        sport: 'Tennis',
        revenue: 567890,
        bets: 56789,
        users: 23456,
        margin: 6.8,
        growth: 15.6,
        marketShare: 12.4
      },
      {
        sport: 'Others',
        revenue: 419755,
        bets: 41987,
        users: 15678,
        margin: 5.9,
        growth: 5.2,
        marketShare: 9.2
      }
    ],
    marketPerformance: [
      {
        market: 'Match Winner',
        volume: 1234567,
        margin: 8.2,
        popularity: 45.6,
        growth: 10.5
      },
      {
        market: 'Over/Under',
        volume: 987654,
        margin: 7.8,
        popularity: 28.9,
        growth: 12.8
      },
      {
        market: 'Both Teams to Score',
        volume: 654321,
        margin: 6.5,
        popularity: 18.7,
        growth: 8.3
      },
      {
        market: 'Correct Score',
        volume: 234567,
        margin: 12.4,
        popularity: 6.8,
        growth: 15.2
      }
    ],
    timeSeriesData: [
      { date: '2024-01-01', revenue: 145678, users: 4567, bets: 12345 },
      { date: '2024-01-02', revenue: 156789, users: 4789, bets: 13456 },
      { date: '2024-01-03', revenue: 134567, users: 4234, bets: 11234 },
      { date: '2024-01-04', revenue: 167890, users: 5012, bets: 14567 },
      { date: '2024-01-05', revenue: 178901, users: 5234, bets: 15678 },
      { date: '2024-01-06', revenue: 189012, users: 5456, bets: 16789 },
      { date: '2024-01-07', revenue: 198765, users: 5678, bets: 17890 }
    ]
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `GH₵ ${performanceData.overview.totalRevenue.toLocaleString()}`,
      change: performanceData.overview.revenueGrowth,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: performanceData.overview.totalUsers.toLocaleString(),
      change: performanceData.overview.userGrowth,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Bets',
      value: performanceData.overview.totalBets.toLocaleString(),
      change: performanceData.overview.betGrowth,
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Avg Bet Size',
      value: `GH₵ ${performanceData.overview.avgBetSize}`,
      change: performanceData.overview.betSizeGrowth,
      icon: BarChart3,
      color: 'orange'
    },
    {
      title: 'Conversion Rate',
      value: `${performanceData.overview.conversionRate}%`,
      change: performanceData.overview.conversionGrowth,
      icon: Activity,
      color: 'indigo'
    },
    {
      title: 'Customer LTV',
      value: `GH₵ ${performanceData.overview.customerLTV}`,
      change: performanceData.overview.ltvGrowth,
      icon: Zap,
      color: 'pink'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive business performance analytics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Select time period"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button
            title="Action button"
            aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => {
              const csvData = 'metric,value,change\nRevenue,50000,+12%';
              const blob = new Blob([csvData], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'performance-report.csv';
              a.click();
              URL.revokeObjectURL(url);
              addToast('success', 'Export Complete', 'Performance report exported successfully');
            }}
            title="Export performance report"
            aria-label="Export performance report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports, metrics, or data..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              onChange={(e) => {
                // Search functionality implementation
                console.log('Searching for:', e.target.value);
              }}
            />
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            {/* Metric Selector */}
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              title="Select metric to analyze"
            >
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="bets">Bets</option>
              <option value="conversion">Conversion</option>
              <option value="retention">Retention</option>
            </select>
            
            {/* Filter Button */}
            <button
              onClick={() => {
                // Filter functionality implementation
                console.log('Opening filter modal');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              title="Open advanced filters"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Active Filters Display */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
              Period: {selectedPeriod}
              <button className="ml-1 hover:text-red-600">×</button>
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
              Metric: {selectedMetric}
              <button className="ml-1 hover:text-blue-600">×</button>
            </span>
          </div>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          const colorClasses = {
            green: 'bg-green-500',
            blue: 'bg-blue-500',
            purple: 'bg-purple-500',
            orange: 'bg-orange-500',
            indigo: 'bg-indigo-500',
            pink: 'bg-pink-500'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[kpi.color] || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center">
                  {kpi.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${kpi.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSelectedReportType('overview')}
            title="Overview report"
            aria-label="Overview report"
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedReportType === 'overview' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedReportType('sports')}
            title="Sports performance report"
            aria-label="Sports performance report"
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedReportType === 'sports' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Sports Performance
          </button>
          <button
            onClick={() => setSelectedReportType('markets')}
            title="Market analysis report"
            aria-label="Market analysis report"
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedReportType === 'markets' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Market Analysis
          </button>
          <button
            onClick={() => setSelectedReportType('trends')}
            title="Trends report"
            aria-label="Trends report"
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedReportType === 'trends' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Trends
          </button>
        </div>
      </div>

      {/* Sports Performance Report */}
      {selectedReportType === 'sports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sports Performance Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.sportsPerformance.map((sport, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sport.sport}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">GH₵ {sport.revenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sport.bets.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sport.users.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{sport.margin}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${sport.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {sport.growth >= 0 ? '+' : ''}{sport.growth}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`bg-blue-600 h-2 rounded-full ${styles.progressBar}`}
                            style={{ width: `${sport.marketShare}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{sport.marketShare}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Market Analysis Report */}
      {selectedReportType === 'markets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Performance Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {performanceData.marketPerformance.map((market, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{market.market}</h4>
                  <span className={`text-sm font-medium ${market.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {market.growth >= 0 ? '+' : ''}{market.growth}%
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Volume:</span>
                    <span className="text-sm font-medium text-gray-900">GH₵ {market.volume.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Margin:</span>
                    <span className="text-sm font-medium text-green-600">{market.margin}%</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Popularity:</span>
                      <span className="text-sm font-medium text-gray-900">{market.popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-purple-600 h-2 rounded-full ${styles.progressBar}`}
                        style={{ width: `${market.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trends Report */}
      {selectedReportType === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend (Last 7 Days)</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {performanceData.timeSeriesData.map((data, index) => {
                const maxRevenue = Math.max(...performanceData.timeSeriesData.map(d => d.revenue));
                const height = (data.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-600 mb-2">
                      GH₵ {(data.revenue / 1000).toFixed(0)}k
                    </div>
                    <div 
                      className={`w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer ${styles.chartBar}`}
                      style={{ height: `${height}%` }}
                      title={`GH₵ ${data.revenue.toLocaleString()}`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth Trend</h3>
              <div className="h-48 flex items-end justify-between space-x-2">
                {performanceData.timeSeriesData.map((data, index) => {
                  const maxUsers = Math.max(...performanceData.timeSeriesData.map(d => d.users));
                  const height = (data.users / maxUsers) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">
                        {(data.users / 1000).toFixed(1)}k
                      </div>
                      <div 
                        className={`w-full bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer ${styles.chartBar}`}
                        style={{ height: `${height}%` }}
                        title={`${data.users.toLocaleString()} users`}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Betting Activity Trend</h3>
              <div className="h-48 flex items-end justify-between space-x-2">
                {performanceData.timeSeriesData.map((data, index) => {
                  const maxBets = Math.max(...performanceData.timeSeriesData.map(d => d.bets));
                  const height = (data.bets / maxBets) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="text-xs text-gray-600 mb-2">
                        {(data.bets / 1000).toFixed(0)}k
                      </div>
                      <div 
                        className={`w-full bg-purple-500 rounded-t hover:bg-purple-600 transition-colors cursor-pointer ${styles.chartBar}`}
                        style={{ height: `${height}%` }}
                        title={`${data.bets.toLocaleString()} bets`}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Report (Default) */}
      {selectedReportType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Sport</h3>
            <div className="space-y-4">
              {performanceData.sportsPerformance.map((sport, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{sport.sport}</span>
                      <span className="text-sm text-gray-500">{sport.marketShare}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-red-600 h-2 rounded-full ${styles.progressBar}`}
                        style={{ width: `${sport.marketShare}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    GH₵ {(sport.revenue / 1000000).toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Performance Indicators</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Revenue Growth</span>
                <span className="text-sm font-bold text-green-600">+{performanceData.overview.revenueGrowth}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">User Growth</span>
                <span className="text-sm font-bold text-green-600">+{performanceData.overview.userGrowth}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Betting Activity</span>
                <span className="text-sm font-bold text-green-600">+{performanceData.overview.betGrowth}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                <span className="text-sm font-bold text-blue-600">{performanceData.overview.conversionRate}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Customer LTV</span>
                <span className="text-sm font-bold text-purple-600">GH₵ {performanceData.overview.customerLTV}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Analytics Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Real-time Activity Monitor
          </h3>
          <button
            onClick={() => {
              console.log('Refreshing real-time data');
              addToast('success', 'Data Refreshed', 'Real-time data has been updated');
            }}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Live
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Active Users</p>
                <p className="text-2xl font-bold text-green-900">1,247</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Live Bets</p>
                <p className="text-2xl font-bold text-blue-900">89</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Revenue/Hour</p>
                <p className="text-2xl font-bold text-purple-900">GH₵ 12.4K</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Time-based Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Time-based Performance Analysis
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                console.log('Viewing hourly breakdown');
                addToast('info', 'View Updated', 'Showing hourly performance breakdown');
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Clock className="w-4 h-4 mr-1" />
              Hourly
            </button>
            <button
              onClick={() => {
                console.log('Viewing daily breakdown');
                addToast('info', 'View Updated', 'Showing daily performance breakdown');
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Daily
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Peak Performance Hours</h4>
            {[
              { time: '20:00 - 22:00', revenue: 45600, percentage: 18.2 },
              { time: '18:00 - 20:00', revenue: 38900, percentage: 15.5 },
              { time: '14:00 - 16:00', revenue: 32100, percentage: 12.8 },
              { time: '22:00 - 00:00', revenue: 28700, percentage: 11.4 }
            ].map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium">{slot.time}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">GH₵ {slot.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{slot.percentage}% of daily</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Weekly Trends</h4>
            {[
              { day: 'Saturday', revenue: 89600, growth: 12.3 },
              { day: 'Sunday', revenue: 76800, growth: 8.7 },
              { day: 'Friday', revenue: 71200, growth: 15.2 },
              { day: 'Wednesday', revenue: 45600, growth: -2.1 }
            ].map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium">{day.day}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">GH₵ {day.revenue.toLocaleString()}</div>
                  <div className={`text-xs ${day.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {day.growth >= 0 ? '+' : ''}{day.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Share Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-green-600" />
            Market Share Distribution
          </h3>
          <button
            onClick={() => handleViewReport({ 
              period: selectedPeriod, 
              metric: selectedMetric, 
              generated: new Date().toLocaleDateString(),
              revenue: 4567890,
              growth: 15.2,
              status: 'Active'
            })}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Sports Categories</h4>
            {[
              { category: 'Football', share: 51.4, revenue: 2345678, color: 'bg-blue-500' },
              { category: 'Basketball', share: 23.8, revenue: 1087432, color: 'bg-green-500' },
              { category: 'Tennis', share: 12.6, revenue: 574829, color: 'bg-yellow-500' },
              { category: 'Cricket', share: 8.9, revenue: 405673, color: 'bg-purple-500' },
              { category: 'Others', share: 3.3, revenue: 150388, color: 'bg-gray-500' }
            ].map((sport, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${sport.color} mr-3`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{sport.category}</div>
                    <div className="text-xs text-gray-500">GH₵ {sport.revenue.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{sport.share}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${sport.color} ${styles.progressBar}`}
                      style={{ width: `${sport.share * 2}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Regional Performance</h4>
            {[
              { region: 'Greater Accra', share: 42.1, users: 52847, color: 'bg-red-500' },
              { region: 'Ashanti', share: 28.6, users: 35924, color: 'bg-blue-500' },
              { region: 'Western', share: 15.3, users: 19205, color: 'bg-green-500' },
              { region: 'Central', share: 8.7, users: 10923, color: 'bg-yellow-500' },
              { region: 'Others', share: 5.3, users: 6531, color: 'bg-gray-500' }
            ].map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${region.color} mr-3`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{region.region}</div>
                    <div className="text-xs text-gray-500">{region.users.toLocaleString()} users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{region.share}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${region.color} ${styles.progressBar}`}
                      style={{ width: `${region.share * 2}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Analytics Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Analytics & Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => {
              console.log('Generating detailed report');
              addToast('info', 'Report Generating', 'Detailed performance report is being generated...');
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <PieChart className="w-6 h-6 text-blue-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Generate Report</div>
            <div className="text-xs text-gray-500">Create comprehensive analytics</div>
          </button>
          
          <button
            onClick={() => {
              console.log('Scheduling report');
              addToast('success', 'Report Scheduled', 'Weekly performance report has been scheduled');
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-green-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Schedule Reports</div>
            <div className="text-xs text-gray-500">Automate report generation</div>
          </button>
          
          <button
            onClick={() => {
              console.log('Setting up monitoring');
              addToast('info', 'Monitor Setup', 'Real-time monitoring alerts configured');
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Eye className="w-6 h-6 text-purple-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Monitor KPIs</div>
            <div className="text-xs text-gray-500">Set up real-time alerts</div>
          </button>
          
          <button
            onClick={() => {
              console.log('Analyzing trends');
              addToast('info', 'Analysis Started', 'Historical trend analysis is running...');
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Activity className="w-6 h-6 text-orange-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Trend Analysis</div>
            <div className="text-xs text-gray-500">Analyze historical patterns</div>
          </button>
        </div>
      </div>

      {/* Custom Date Range Modal */}
      {showCustomRange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Custom Date Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  title="Start date"
                  aria-label="Start date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  title="End date"
                  aria-label="End date"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowCustomRange(false)}
                title="Cancel custom date range"
                aria-label="Cancel custom date range"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
            title="Action button"
            aria-label="Action button"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        title="Performance Report Details"
        size="lg"
      >
        {selectedReport && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Report Information</h4>
                <p className="text-sm text-gray-600">Period: {selectedReport?.period || 'N/A'}</p>
                <p className="text-sm text-gray-600">Metric: {selectedReport?.metric || 'N/A'}</p>
                <p className="text-sm text-gray-600">Generated: {selectedReport?.generated || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Performance Summary</h4>
                <p className="text-sm text-gray-600">Revenue: GH₵ {selectedReport?.revenue?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-600">Growth: {selectedReport?.growth || '0'}%</p>
                <p className="text-sm text-gray-600">Status: {selectedReport?.status || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Detailed Analysis</h4>
              <p className="text-sm text-gray-600">This report provides comprehensive insights into platform performance metrics including user engagement, revenue trends, and operational efficiency.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PerformanceReports;
