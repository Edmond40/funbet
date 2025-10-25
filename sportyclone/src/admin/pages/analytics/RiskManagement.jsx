import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Clock,
  Eye,
  Settings,
  Ban,
  CheckCircle,
  XCircle,
  Activity,
  Zap
} from 'lucide-react';

const RiskManagement = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('24h');
  const [filterRisk, setFilterRisk] = useState('all');
  
  const { addToast } = useToast();
  const { isOpen: isRiskModalOpen, openModal: openRiskModal, closeModal: closeRiskModal } = useModal();
  const { confirm } = useConfirm();
  // Removed unused variable: darkMode
  
  const handleViewAlert = (alert) => { setSelectedAlert(alert); openRiskModal(); };
  const handleResolveAlert = async (alert) => {
    const confirmed = await confirm({ title: 'Resolve Alert', message: 'Mark this alert?', confirmText: 'Resolve', type: 'info' });
    if (confirmed) {
      console.log('Resolving alert:', alert.id);
      addToast('success', 'Alert Resolved', 'Risk alert resolved successfully');
    }
  };
  // Export functionality moved to button handlers

  const riskMetrics = {
    overview: {
      totalAlerts: 47,
      highRiskUsers: 12,
      suspiciousTransactions: 23,
      blockedAccounts: 8,
      potentialLoss: 45678,
      riskScore: 6.8
    },
    alerts: [
      {
        id: 1,
        type: 'unusual_betting_pattern',
        severity: 'high',
        user: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          userId: 'USR001'
        },
        description: 'User placed 15 bets in 10 minutes with increasing stakes',
        amount: 5678,
        timestamp: '2024-01-21 16:45:12',
        status: 'pending',
        riskScore: 8.5,
        details: {
          totalBets: 15,
          timeFrame: '10 minutes',
          avgStake: 378.53,
          pattern: 'Progressive betting'
        }
      },
      {
        id: 2,
        type: 'multiple_accounts',
        severity: 'critical',
        user: {
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          userId: 'USR002'
        },
        description: 'Same device/IP detected across 3 different accounts',
        amount: 12345,
        timestamp: '2024-01-21 15:30:25',
        status: 'investigating',
        riskScore: 9.2,
        details: {
          accountsDetected: 3,
          sharedIP: '192.168.1.100',
          deviceFingerprint: 'ABC123XYZ',
          totalDeposits: 12345
        }
      },
      {
        id: 3,
        type: 'large_withdrawal',
        severity: 'medium',
        user: {
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com',
          userId: 'USR003'
        },
        description: 'Withdrawal request exceeds 5x average withdrawal amount',
        amount: 25000,
        timestamp: '2024-01-21 14:20:18',
        status: 'resolved',
        riskScore: 6.3,
        details: {
          requestedAmount: 25000,
          avgWithdrawal: 4500,
          accountAge: '6 months',
          verificationStatus: 'Verified'
        }
      },
      {
        id: 4,
        type: 'bonus_abuse',
        severity: 'high',
        user: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@email.com',
          userId: 'USR004'
        },
        description: 'Pattern suggests bonus hunting behavior across campaigns',
        amount: 3456,
        timestamp: '2024-01-21 13:15:30',
        status: 'pending',
        riskScore: 7.8,
        details: {
          campaignsUsed: 5,
          bonusAmount: 3456,
          wagering: 'Minimal',
          withdrawalAttempts: 3
        }
      }
    ],
    riskFactors: [
      { factor: 'Unusual Betting Patterns', count: 15, trend: 'up' },
      { factor: 'Multiple Accounts', count: 8, trend: 'down' },
      { factor: 'Large Transactions', count: 12, trend: 'up' },
      { factor: 'Bonus Abuse', count: 7, trend: 'stable' },
      { factor: 'Suspicious IPs', count: 5, trend: 'down' },
      { factor: 'Underage Attempts', count: 3, trend: 'stable' }
    ]
  };

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      high: { bg: 'bg-orange-100', text: 'text-orange-800', icon: AlertTriangle },
      critical: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    
    const config = severityConfig[severity] || severityConfig.medium;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {severity.toUpperCase()}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      investigating: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      blocked: { bg: 'bg-red-100', text: 'text-red-800', icon: Ban }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRiskTypeIcon = (type) => {
    const typeIcons = {
      unusual_betting_pattern: Activity,
      multiple_accounts: Users,
      large_withdrawal: DollarSign,
      bonus_abuse: Target,
      suspicious_ip: Shield,
      underage_attempt: AlertTriangle
    };
    return typeIcons[type] || AlertTriangle;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage platform security risks and alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <select title="Select option" aria-label="Select option"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button 
            onClick={() => {
              const csvData = 'alert,level,user,amount\nHigh Stakes,High,user123,5000';
              const blob = new Blob([csvData], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'risk-alerts.csv';
              a.click();
              URL.revokeObjectURL(url);
              addToast('success', 'Export Complete', 'Risk data exported successfully');
            }}
            title="Export risk report"
            aria-label="Export risk report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{riskMetrics.overview.totalAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Users</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{riskMetrics.overview.highRiskUsers}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suspicious Transactions</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{riskMetrics.overview.suspiciousTransactions}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blocked Accounts</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{riskMetrics.overview.blockedAccounts}</p>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <Ban className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potential Loss</p>
              <p className="text-2xl font-bold text-red-600 mt-2">GH₵ {riskMetrics.overview.potentialLoss.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <p className={`text-2xl font-bold mt-2 ${riskMetrics.overview.riskScore >= 8 ? 'text-red-600' : riskMetrics.overview.riskScore >= 6 ? 'text-yellow-600' : 'text-green-600'}`}>
                {riskMetrics.overview.riskScore}/10
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${riskMetrics.overview.riskScore >= 8 ? 'bg-red-500' : riskMetrics.overview.riskScore >= 6 ? 'bg-yellow-500' : 'bg-green-500'}`}>
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Factors Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskMetrics.riskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{factor.factor}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{factor.count}</div>
              </div>
              <div className="flex items-center">
                {factor.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-red-500" />
                ) : factor.trend === 'down' ? (
                  <TrendingDown className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="text"
    
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
             
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <button title="Action button" aria-label="Action button"
            
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Risk Alerts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {riskMetrics.alerts.map((alert) => {
            const IconComponent = getRiskTypeIcon(alert.type);
            return (
              <div key={alert.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      alert.severity === 'critical' ? 'bg-red-100' :
                      alert.severity === 'high' ? 'bg-orange-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{alert.description}</h4>
                        {getSeverityBadge(alert.severity)}
                        {getStatusBadge(alert.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-gray-600">User: </span>
                          <span className="text-sm font-medium text-gray-900">{alert.user.name}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Amount: </span>
                          <span className="text-sm font-medium text-gray-900">GH₵ {alert.amount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Risk Score: </span>
                          <span className={`text-sm font-medium ${alert.riskScore >= 8 ? 'text-red-600' : alert.riskScore >= 6 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {alert.riskScore}/10
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Time: </span>
                          <span className="text-sm font-medium text-gray-900">{alert.timestamp}</span>
                        </div>
                      </div>
                      
                      {/* Alert Details */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <h5 className="text-sm font-semibold text-gray-900 mb-2">Alert Details</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(alert.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
                              <span className="font-medium text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewAlert(alert)}
                      title="View alert details"
                      aria-label="View alert details"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleResolveAlert(alert)}
                      title="Resolve alert"
                      aria-label="Resolve alert"
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button 
                      title="Block user"
                      aria-label="Block user"
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button 
                      title="Alert settings"
                      aria-label="Alert settings"
                      className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Risk Alert Details</h3>
              <button aria-label="Close modal"
                onClick={() => setSelectedAlert(null)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Alert Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alert ID:</span>
                    <span className="font-medium">RISK-{selectedAlert.id.toString().padStart(6, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedAlert.type.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Severity:</span>
                    {getSeverityBadge(selectedAlert.severity)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(selectedAlert.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Score:</span>
                    <span className={`font-medium ${selectedAlert.riskScore >= 8 ? 'text-red-600' : selectedAlert.riskScore >= 6 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {selectedAlert.riskScore}/10
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">User Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedAlert.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedAlert.user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-medium">{selectedAlert.user.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Involved:</span>
                    <span className="font-medium">GH₵ {selectedAlert.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analysis</h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{selectedAlert.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(selectedAlert.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-white rounded border">
                    <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button aria-label="Close"
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button aria-label="Action button"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Mark
              </button>
              <button aria-label="Action button"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Block User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Alert Details Modal */}
      <Modal
        isOpen={isRiskModalOpen}
        onClose={closeRiskModal}
        title="Risk Alert Details"
        size="lg"
      >
        {selectedAlert && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Alert Information</h4>
                <p className="text-sm text-gray-600">Type: {selectedAlert?.type || 'N/A'}</p>
                <p className="text-sm text-gray-600">Severity: {selectedAlert?.severity || 'N/A'}</p>
                <p className="text-sm text-gray-600">Detected: {selectedAlert?.timestamp || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Risk Details</h4>
                <p className="text-sm text-gray-600">User: {selectedAlert?.user?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">Amount: GH₵ {selectedAlert?.amount?.toLocaleString() || '0'}</p>
                <p className="text-sm text-gray-600">Status: {selectedAlert?.status || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedAlert?.description || 'No description available for this risk alert.'}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => selectedAlert && handleResolveAlert(selectedAlert)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Resolve Alert
              </button>
              <button
                onClick={closeRiskModal}
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

export default RiskManagement;
