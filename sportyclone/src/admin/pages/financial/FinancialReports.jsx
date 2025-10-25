import { useMemo, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  BarChart3,
  PieChart,
  FileText,
  RefreshCw,
  Eye,
  Clock,
  Activity,
  MapPin
} from 'lucide-react';

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedReportData, setSelectedReportData] = useState(null);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();
  const { darkMode } = useAdmin();

  // Action functions
  const handleGenerateReport = (reportType) => {
    addToast('success', 'Report Generated', `${reportType || 'Financial'} report has been generated successfully`);
  };

  const reportTypes= [
    { id: 'revenue', name: 'Revenue Report', icon: DollarSign, type: 'financial' },
    { id: 'profit_loss', name: 'Profit & Loss', icon: TrendingUp, type: 'financial' },
    { id: 'user_activity', name: 'User Activity', icon: Users, type: 'analytics' },
    { id: 'betting_summary', name: 'Betting Summary', icon: Activity, type: 'betting' },
    { id: 'payment_methods', name: 'Payment Methods', icon: BarChart3, type: 'financial' },
    { id: 'geographic', name: 'Geographic Analysis', icon: MapPin, type: 'analytics' }
  ];

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setSelectedReportData({
      reportId: report.id,
      summary: `Summary for ${report.name}`,
      data: []
    });
    openReportModal();
  };
  
  const handleCloseReportModal = () => {
    setSelectedReport(null);
    setSelectedReportData(null);
    closeReportModal();
  };
  
  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
    console.log('Date range changed:', { start, end });
  };

  const handleExportReport = () => {
    const reportDetails = {
      reportType: selectedReport?.name ?? 'Financial Summary',
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      totalRevenue: 2456789,
      totalExpenses: 1234567,
      netProfit: 1222222
    };

    const csvContent = Object.entries(reportDetails)
      .map(([key, value]) => `${key},${value}`)
      .join('\n');

    downloadFile(csvContent, 'financial-report.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Financial report exported successfully');
  };
  
  // Use darkMode for styling
  const cardBgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white';
  
  // Use search and filter functionality
  const filteredReports = reportTypes.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesFilter;
  });
  
  console.log('Filtered reports:', filteredReports);

  const handleViewReportData = (reportData) => {
    setSelectedReportData(reportData);
    openReportModal();
  };

  const financialData = useMemo(() => ({
    revenue: {
      total: 4567890,
      growth: 12.5,
      breakdown: [
        { category: 'Sports Betting', amount: 3456780, percentage: 75.7 },
        { category: 'Casino Games', amount: 789012, percentage: 17.3 },
        { category: 'Virtual Sports', amount: 234567, percentage: 5.1 },
        { category: 'Other', amount: 87531, percentage: 1.9 }
      ]
    },
    expenses: {
      total: 2345678,
      growth: 8.3,
      breakdown: [
        { category: 'Payment Processing', amount: 567890, percentage: 24.2 },
        { category: 'Marketing', amount: 456789, percentage: 19.5 },
        { category: 'Operations', amount: 345678, percentage: 14.7 },
        { category: 'Technology', amount: 234567, percentage: 10.0 },
        { category: 'Compliance', amount: 123456, percentage: 5.3 },
        { category: 'Other', amount: 617298, percentage: 26.3 }
      ]
    },
    profit: {
      gross: 2222212,
      net: 1876543,
      margin: 41.1
    },
    kpis: [
      { name: 'Total Deposits', value: 5678901, change: 15.2, trend: 'up' },
      { name: 'Total Withdrawals', value: 4321098, change: 12.8, trend: 'up' },
      { name: 'Active Users', value: 45678, change: 8.5, trend: 'up' },
      { name: 'Avg Bet Size', value: 125.5, change: -2.1, trend: 'down' },
      { name: 'House Edge', value: 5.2, change: 0.3, trend: 'up' },
      { name: 'Customer LTV', value: 2456.78, change: 18.7, trend: 'up' }
    ]
  }), []);

  const recentReports = useMemo(() => [
    {
      id: 1,
      name: 'Monthly Revenue Report - December 2023',
      type: 'Revenue',
      generatedAt: '2024-01-01 09:00:00',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Q4 2023 Profit & Loss Statement',
      type: 'P&L',
      generatedAt: '2024-01-01 08:30:00',
      size: '1.8 MB',
      format: 'Excel',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Weekly User Activity Report',
      type: 'User Activity',
      generatedAt: '2024-01-01 07:15:00',
      size: '956 KB',
      format: 'PDF',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Payment Methods Analysis',
      type: 'Payment',
      generatedAt: '2024-01-01 06:45:00',
      size: '1.2 MB',
      format: 'PDF',
      status: 'processing'
    }
  ], []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Generate and analyze financial performance reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Filter by type"
          >
            <option value="all">All Types</option>
            <option value="financial">Financial</option>
            <option value="analytics">Analytics</option>
            <option value="betting">Betting</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={() => handleDateRangeChange(dateRange.start, dateRange.end)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
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
            onClick={handleExportReport}
            title="Export report"
            aria-label="Export report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowCustomRange(true)}
            title="Refresh data"
            aria-label="Refresh data"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {financialData.kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{kpi.name}</span>
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {kpi.name.includes('GH₵') || kpi.name.includes('LTV') || kpi.name.includes('Bet Size') 
                  ? `GH₵ ${kpi.value.toLocaleString()}` 
                  : kpi.name.includes('%') || kpi.name.includes('Edge')
                  ? `${kpi.value}%`
                  : kpi.value.toLocaleString()
                }
              </p>
              <p className={`text-sm ${kpi.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.change >= 0 ? '+' : ''}{kpi.change}% from last period
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Profit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">GH₵ {financialData.revenue.total.toLocaleString()}</span>
              <span className="text-sm text-green-600">+{financialData.revenue.growth}%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {financialData.revenue.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  GH₵ {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-red-600">GH₵ {financialData.expenses.total.toLocaleString()}</span>
              <span className="text-sm text-red-600">+{financialData.expenses.growth}%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {financialData.expenses.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  GH₵ {item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profit Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profit Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              GH₵ {financialData.profit.gross.toLocaleString()}
            </div>
            <div className="text-sm text-green-700">Gross Profit</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              GH₵ {financialData.profit.net.toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">Net Profit</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {financialData.profit.margin}%
            </div>
            <div className="text-sm text-purple-700">Profit Margin</div>
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => {
            const IconComponent = report.icon;
            return (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                  </div>
                </div>
                <button
                  title="Generate Report"
                  aria-label="Generate Report"
                  onClick={() => handleGenerateReport(report.type)}
                  className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate
                </button>
              </div>
            );
          })}

        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <button title="Action button" aria-label="Action button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.format}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.generatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status === 'processing' && <Clock className="w-3 h-3 mr-1" />}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {report.status === 'completed' && (
                      <button
                        onClick={() => handleViewReport({
                          id: report.id.toString(),
                          name: report.name,
                          icon: FileText,
                          type: 'financial'
                        })}
                        title="Download report"
                        aria-label="Download report"
                        className="text-red-600 hover:text-red-900 mr-3">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    <button title="Action button" aria-label="Action button" className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  title="Select start date for report"
                  placeholder="Select start date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                /> 
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  title="Select end date for report"
                  placeholder="Select end date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                /> 
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button title="Action button" aria-label="Action button" 
                onClick={() => { setShowCustomRange(false); }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button title="Action button" aria-label="Action button" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => { setShowCustomRange(false); }}
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReportData && isReportModalOpen && (
        <Modal
          isOpen={isReportModalOpen}
          onClose={handleCloseReportModal}
          title="Report Details"
          size="lg"
        >
          <div className={`space-y-6 ${cardBgClass} p-4 rounded-lg`}>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Report Summary</h4>
              <p className="text-sm text-gray-600">{selectedReportData.summary}</p>
            </div>
            <div>
              <button
                onClick={() => handleViewReportData(selectedReportData)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                View Full Report
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FinancialReports;