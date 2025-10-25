import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { 
  Download, 
  Eye, 
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  DollarSign,
  Flag,
  FileText,
  Settings,
  Shield
} from 'lucide-react';
import { useState } from 'react';

const AMLTools = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedTab, setSelectedTab] = useState('alerts');
  const [showAddCase, setShowAddCase] = useState(false);
  
  const { addToast } = useToast();
  const { isOpen: isAMLModalOpen, openModal: openAMLModal, closeModal: closeAMLModal } = useModal();
  const { confirm } = useConfirm();
  
  const handleViewCase = (amlCase) => { 
    setSelectedCase(amlCase); 
    openAMLModal(); 
  };

  const handleFlagCase = async (amlCase) => {
    const confirmed = await confirm({ title: 'Flag Case', message: 'Flag this case for review?', confirmText: 'Flag', type: 'warning' });
    if (confirmed) {
      console.log('Flagging case:', amlCase.id);
      addToast('success', 'Case Flagged', 'AML case flagged for review');
    }
  };
  const amlCases = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        userId: 'USR001',
        riskScore: 85
      },
      alertType: 'large_transaction',
      severity: 'high',
      status: 'investigating',
      amount: 25000,
      description: 'Single transaction exceeds threshold limit',
      triggeredAt: '2024-01-21 16:30:00',
      assignedTo: 'AML Officer 1',
      flags: ['Large Amount', 'New User'],
      relatedTransactions: 3
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        userId: 'USR002',
        riskScore: 72
      },
      alertType: 'suspicious_pattern',
      severity: 'medium',
      status: 'under_review',
      amount: 15000,
      description: 'Unusual betting pattern detected across multiple accounts',
      triggeredAt: '2024-01-21 15:45:30',
      assignedTo: 'AML Officer 2',
      flags: ['Pattern Match', 'Multiple Accounts'],
      relatedTransactions: 8
    },
    {
      id: 3,
      user: {
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        userId: 'USR003',
        riskScore: 95
      },
      alertType: 'pep_match',
      severity: 'critical',
      status: 'escalated',
      amount: 50000,
      description: 'Politically Exposed Person (PEP) match detected',
      triggeredAt: '2024-01-21 14:20:15',
      assignedTo: 'Senior AML Officer',
      flags: ['PEP Match', 'High Risk Country'],
      relatedTransactions: 12
    },
    {
      id: 4,
      user: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        userId: 'USR004',
        riskScore: 68
      },
      alertType: 'velocity_check',
      severity: 'medium',
      status: 'cleared',
      amount: 8000,
      description: 'High transaction velocity in short time period',
      triggeredAt: '2024-01-21 13:15:30',
      assignedTo: 'AML Officer 1',
      flags: ['High Velocity', 'Time Pattern'],
      relatedTransactions: 15
    }
  ];

  const sarReports = [
    {
      id: 1,
      reportId: 'SAR-2024-001',
      user: 'John Doe (USR001)',
      amount: 25000,
      status: 'submitted',
      submittedDate: '2024-01-20',
      dueDate: '2024-01-25',
      officer: 'AML Officer 1',
      description: 'Suspicious large cash transactions'
    },
    {
      id: 2,
      reportId: 'SAR-2024-002',
      user: 'Mike Johnson (USR003)',
      amount: 50000,
      status: 'draft',
      submittedDate: '-',
      dueDate: '2024-01-23',
      officer: 'Senior AML Officer',
      description: 'PEP involvement in high-value transactions'
    }
  ];

  const riskProfiles = [
    {
      id: 1,
      user: 'John Doe',
      userId: 'USR001',
      riskScore: 85,
      riskLevel: 'high',
      factors: ['Large Transactions', 'New Customer', 'High Frequency'],
      lastReview: '2024-01-21',
      nextReview: '2024-02-21'
    },
    {
      id: 2,
      user: 'Jane Smith',
      userId: 'USR002',
      riskScore: 72,
      riskLevel: 'medium',
      factors: ['Pattern Matching', 'Multiple Accounts'],
      lastReview: '2024-01-20',
      nextReview: '2024-02-20'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      userId: 'USR003',
      riskScore: 95,
      riskLevel: 'critical',
      factors: ['PEP Match', 'High Risk Country', 'Large Amounts'],
      lastReview: '2024-01-19',
      nextReview: '2024-01-26'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      investigating: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      under_review: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      escalated: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
      cleared: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      submitted: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FileText }
    };
    
    const config = statusConfig[status] || statusConfig.investigating;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" aria-hidden="true" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      low: { bg: 'bg-gray-100', text: 'text-gray-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-orange-100', text: 'text-orange-800' },
      critical: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = severityConfig[severity] || severityConfig.low;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const getRiskLevelBadge = (level) => {
    const levelConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-orange-100', text: 'text-orange-800' },
      critical: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = levelConfig[level] || levelConfig.low;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {level.toUpperCase()}
      </span>
    );
  };

  const stats = {
    activeAlerts: amlCases.filter(a => a.status !== 'cleared').length,
    highRiskUsers: riskProfiles.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length,
    pendingSARs: sarReports.filter(s => s.status === 'draft').length,
    totalAmount: amlCases.reduce((sum, a) => sum + a.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AML Tools</h1>
          <p className="text-gray-600 mt-1">Anti-Money Laundering monitoring and compliance tools</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Action button" aria-label="Action button" 
            onClick={() => setShowAddCase(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            New Case
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center" title="Action button" aria-label="Action button">
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.activeAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Users</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">{stats.highRiskUsers}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending SARs</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{stats.pendingSARs}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="View AML alerts and cases" aria-label="View AML alerts and cases"
            onClick={() => setSelectedTab('alerts')}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'alerts' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            AML Alerts
          </button>
          <button title="View SAR reports" aria-label="View SAR reports"
            onClick={() => setSelectedTab('reports')}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'reports' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            SAR Reports
          </button>
          <button title="View user risk profiles" aria-label="View user risk profiles"
            onClick={() => setSelectedTab('profiles')}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'profiles' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Risk Profiles
          </button>
        </div>
      </div>

      {/* AML Alerts Tab */}
      {selectedTab === 'alerts' && (
        <div className="space-y-4">
          {amlCases.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    alert.severity === 'critical' ? 'bg-red-100' :
                    alert.severity === 'high' ? 'bg-orange-100' :
                    alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <Flag className={`w-6 h-6 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'high' ? 'text-orange-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {alert.alertType.replace('_', ' ').toUpperCase()}
                      </h3>
                      {getStatusBadge(alert.status)}
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>User: {alert.user.name}</span>
                      <span>Amount: GH₵ {alert.amount.toLocaleString()}</span>
                      <span>Risk Score: {alert.user.riskScore}</span>
                      <span>Assigned: {alert.assignedTo}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleViewCase(alert)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View AML alert details" aria-label="View AML alert details">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit AML alert" aria-label="Edit AML alert">
                    <Edit className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Configure AML alert settings" aria-label="Configure AML alert settings">
                    <Settings className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Triggered:</span>
                  <p className="font-medium text-gray-900">{alert.triggeredAt}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Related Transactions:</span>
                  <p className="font-medium text-gray-900">{alert.relatedTransactions}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">User ID:</span>
                  <p className="font-medium text-gray-900">{alert.user.userId}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Alert Flags</h4>
                <div className="flex flex-wrap gap-2">
                  {alert.flags.map((flag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                      <Flag className="w-3 h-3 mr-1" aria-hidden="true" />
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAR Reports Tab */}
      {selectedTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Suspicious Activity Reports (SAR)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Officer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sarReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.reportId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{report.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">GH₵ {report.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.officer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" title="View SAR report details" aria-label="View SAR report details">
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-3" title="Edit SAR report" aria-label="Edit SAR report">
                        <Edit className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Download SAR report" aria-label="Download SAR report">
                        <Download className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Risk Profiles Tab */}
      {selectedTab === 'profiles' && (
        <div className="space-y-4">
          {riskProfiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{profile.user}</h3>
                      {getRiskLevelBadge(profile.riskLevel)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>User ID: {profile.userId}</span>
                      <span>Risk Score: {profile.riskScore}/100</span>
                      <span>Last Review: {profile.lastReview}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View risk profile details" aria-label="View risk profile details">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit risk profile" aria-label="Edit risk profile">
                    <Edit className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Risk Score</span>
                  <span>{profile.riskScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      profile.riskScore >= 80 ? 'bg-red-500 w-4/5' :
                      profile.riskScore >= 60 ? 'bg-orange-500 w-3/5' :
                      profile.riskScore >= 40 ? 'bg-yellow-500 w-2/5' : 'bg-green-500 w-1/5'
                    }`}
                  ></div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Factors: {profile.factors.join(', ')}</span>
                  <span>Next Review: {profile.nextReview}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Next Review:</span>
                  <p className="font-medium text-gray-900">{profile.nextReview}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <p className={`font-medium ${
                    profile.riskLevel === 'critical' ? 'text-red-600' :
                    profile.riskLevel === 'high' ? 'text-orange-600' :
                    profile.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {profile.riskLevel.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Risk Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.factors.map((factor, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>  
            </div>
          ))}
        </div>
      )}

      {/* Add Case Modal */}
      {showAddCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New AML Case</h3>
              <button
                title="Close create case modal"
                aria-label="Close create case modal"
                onClick={() => setShowAddCase(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select alert type" aria-label="Select alert type">
                    <option value="large_transaction">Large Transaction</option>
                    <option value="suspicious_pattern">Suspicious Pattern</option>
                    <option value="pep_match">PEP Match</option>
                    <option value="velocity_check">Velocity Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select alert severity level" aria-label="Select alert severity level">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  placeholder="Enter user ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  title="Enter user ID for the AML case"
                  aria-label="Enter user ID for the AML case"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the suspicious activity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  title="Describe the suspicious activity"
                  aria-label="Describe the suspicious activity"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  title="Cancel case creation"
                  aria-label="Cancel case creation"
                  type="button"
                  onClick={() => setShowAddCase(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Create new AML case"
                  aria-label="Create new AML case"
                >
                  Create Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AML Case Details Modal */}
      <Modal
        isOpen={isAMLModalOpen}
        onClose={closeAMLModal}
        title="AML Case Details"
        size="lg"
      >
        {selectedCase && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Case Information</h4>
                <p className="text-sm text-gray-600">Case ID: {selectedCase?.id || 'N/A'}</p>
                <p className="text-sm text-gray-600">Status: {selectedCase?.status || 'N/A'}</p>
                <p className="text-sm text-gray-600">Created: {selectedCase?.created || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">User Details</h4>
                <p className="text-sm text-gray-600">Name: {selectedCase?.user?.name || 'N/A'}</p>
                <p className="text-sm text-gray-600">Email: {selectedCase?.user?.email || 'N/A'}</p>
                <p className="text-sm text-gray-600">Risk Level: {selectedCase?.riskLevel || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Transaction Details</h4>
              <p className="text-sm text-gray-600">Amount: GH₵ {selectedCase?.amount?.toLocaleString() || '0'}</p>
              <p className="text-sm text-gray-600">Type: {selectedCase?.transactionType || 'N/A'}</p>
              <p className="text-sm text-gray-600">Description: {selectedCase?.description || 'No description available.'}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => handleFlagCase(selectedCase)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Flag Case
              </button>
              <button
                onClick={closeAMLModal}
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

export default AMLTools;