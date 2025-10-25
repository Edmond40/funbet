import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  User,
  Activity,
  Shield,
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Lock,
  Unlock,
  DollarSign
} from 'lucide-react';

const AuditTrails = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  
  const { addToast } = useToast();
  const { isOpen: isAuditModalOpen, openModal: openAuditModal, closeModal: closeAuditModal } = useModal();
  const { confirm } = useConfirm();
  
  const handleViewAudit = (audit) => { setSelectedAudit(audit); openAuditModal(); };
  
  const handleDeleteAudit = async (auditId) => {
    const confirmed = await confirm({
      title: 'Delete Audit Trail',
      message: 'Are you sure you want to delete this audit trail? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'danger'
    });
    if (confirmed) {
      console.log('Deleting audit:', auditId);
      addToast('success', 'Audit Deleted', 'Audit trail deleted successfully');
    }
  };
  
  const handleFilterByAction = (action) => {
    setSelectedAction(action);
    setFilterAction(action);
  };
  const handleExportAudit = () => {
    downloadFile('timestamp,user,action,details\n2024-01-01,admin,login,successful', 'audit-trails.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Audit trails exported successfully');
  };

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-01-21 16:45:12',
      user: {
        name: 'John Doe',
        role: 'Admin',
        id: 'ADM001'
      },
      action: 'user_login',
      category: 'authentication',
      resource: 'Admin Dashboard',
      details: 'Successful login from IP: 192.168.1.100',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'low'
    },
    {
      id: 2,
      timestamp: '2024-01-21 16:30:25',
      user: {
        name: 'Jane Smith',
        role: 'Support Agent',
        id: 'SUP002'
      },
      action: 'user_account_update',
      category: 'user_management',
      resource: 'User Profile - USR12345',
      details: 'Updated user verification status from pending to verified',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium'
    },
    {
      id: 3,
      timestamp: '2024-01-21 16:15:18',
      user: {
        name: 'Mike Johnson',
        role: 'Finance Manager',
        id: 'FIN003'
      },
      action: 'withdrawal_approval',
      category: 'financial',
      resource: 'Withdrawal Request - WD789012',
      details: 'Approved withdrawal of GH₵ 5,000 for user USR67890',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'high'
    },
    {
      id: 4,
      timestamp: '2024-01-21 15:45:30',
      user: {
        name: 'System',
        role: 'System',
        id: 'SYS000'
      },
      action: 'failed_login_attempt',
      category: 'security',
      resource: 'Admin Dashboard',
      details: 'Failed login attempt for user admin@example.com from suspicious IP',
      ipAddress: '203.0.113.1',
      userAgent: 'curl/7.68.0',
      status: 'failed',
      severity: 'high'
    },
    {
      id: 5,
      timestamp: '2024-01-21 15:30:45',
      user: {
        name: 'Sarah Wilson',
        role: 'Risk Manager',
        id: 'RSK004'
      },
      action: 'user_account_suspension',
      category: 'risk_management',
      resource: 'User Account - USR54321',
      details: 'Suspended user account due to suspicious betting patterns',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'high'
    },
    {
      id: 6,
      timestamp: '2024-01-21 15:15:22',
      user: {
        name: 'Tom Brown',
        role: 'Sports Manager',
        id: 'SPT005'
      },
      action: 'odds_update',
      category: 'sports_management',
      resource: 'Match - MAN vs ARS',
      details: 'Updated match odds: Manchester United 2.10 -> 2.05',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      severity: 'medium'
    }
  ];

  const actionTypes = [
    'user_login', 'user_logout', 'user_account_update', 'user_account_suspension',
    'withdrawal_approval', 'deposit_processing', 'odds_update', 'match_settlement',
    'failed_login_attempt', 'password_reset', 'permission_change', 'system_backup'
  ];

  const categories = [
    'authentication', 'user_management', 'financial', 'sports_management',
    'risk_management', 'security', 'system', 'compliance'
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock }
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

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      low: { bg: 'bg-gray-100', text: 'text-gray-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = severityConfig[severity] || severityConfig.low;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {severity.toUpperCase()}
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      authentication: Lock,
      user_management: User,
      financial: DollarSign,
      sports_management: Activity,
      risk_management: Shield,
      security: Lock,
      system: Database,
      compliance: FileText
    };
    return categoryIcons[category] || Activity;
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesUser = filterUser === 'all' || log.user.id === filterUser;
    return matchesAction && matchesUser;
  });

  const stats = {
    totalLogs: auditLogs.length,
    successfulActions: auditLogs.filter(l => l.status === 'success').length,
    failedActions: auditLogs.filter(l => l.status === 'failed').length,
    highSeverity: auditLogs.filter(l => l.severity === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Trails</h1>
          <p className="text-gray-600 mt-1">Monitor and track all system activities and user actions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select title="Select action type for audit logs" aria-label="Select action type for audit logs"
            value={selectedAction}
            onChange={(e) => handleFilterByAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
          <select title="Select time period for audit logs" aria-label="Select time period for audit logs"
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
            title="Open calendar for date selection" 
            aria-label="Open calendar for date selection"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </button>
          <button title="Export audit trails data" aria-label="Export audit trails data"
            onClick={handleExportAudit}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalLogs.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.successfulActions}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.failedActions}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Severity</p>
              <p className="text-2xl font-bold text-orange-600 mt-2">{stats.highSeverity}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input title="Search audit logs by user, action, or details" aria-label="Search audit logs by user, action, or details"
                type="text"
                placeholder="Search audit logs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Filter audit logs by action type" aria-label="Filter audit logs by action type"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              {actionTypes.map(action => (
                <option key={action} value={action}>
                  {action.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>

            <select title="Filter audit logs by user" aria-label="Filter audit logs by user"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Users</option>
              {Array.from(new Set(auditLogs.map(log => log.user.id))).map(userId => {
                const user = auditLogs.find(log => log.user.id === userId)?.user;
                return (
                  <option key={userId} value={userId}>
                    {user?.name} ({user?.role})
                  </option>
                );
              })}
            </select>
          </div>
          
          <button title="Apply advanced filters to audit logs" aria-label="Apply advanced filters to audit logs"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Audit Log Entries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const IconComponent = getCategoryIcon(log.category);
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{log.timestamp}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.user.name}</div>
                          <div className="text-sm text-gray-500">{log.user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {log.action.replace('_', ' ').toUpperCase()}
                          </div>
                          <div className="text-sm text-gray-500">{log.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.resource}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{log.details}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(log.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getSeverityBadge(log.severity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewAudit(log)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="View audit log details" 
                          aria-label="View audit log details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAudit(log.id.toString())}
                          className="text-red-600 hover:text-red-900" 
                          title="Delete audit log" 
                          aria-label="Delete audit log"
                        >
                          <Unlock className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredLogs.length} of {auditLogs.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button title="Go to previous page of audit logs" aria-label="Go to previous page of audit logs"
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
            <button title="Go to page 1 of audit logs" aria-label="Go to page 1 of audit logs"
              className="px-3 py-1 bg-red-600 text-white rounded text-sm">1</button>
            <button title="Go to page 2 of audit logs" aria-label="Go to page 2 of audit logs"
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button title="Go to next page of audit logs" aria-label="Go to next page of audit logs"
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity by Category</h3>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const categoryLogs = auditLogs.filter(log => log.category === category);
              const percentage = (categoryLogs.length / auditLogs.length) * 100;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{categoryLogs.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent High Severity Events</h3>
          <div className="space-y-4">
            {auditLogs
              .filter(log => log.severity === 'high')
              .slice(0, 5)
              .map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{log.action.replace('_', ' ')}</div>
                    <div className="text-sm text-gray-600">{log.details}</div>
                    <div className="text-xs text-gray-500 mt-1">{log.timestamp}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Audit Trail Details Modal */}
      <Modal
        isOpen={isAuditModalOpen}
        onClose={closeAuditModal}
        title="Audit Trail Details"
        size="lg"
      >
        {selectedAudit && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Audit Information</h4>
                <p className="text-sm text-gray-600">ID: {selectedAudit.id}</p>
                <p className="text-sm text-gray-600">Action: {selectedAudit.action}</p>
                <p className="text-sm text-gray-600">Timestamp: {selectedAudit.timestamp}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">User Details</h4>
                <p className="text-sm text-gray-600">User: {selectedAudit.user.name} ({selectedAudit.user.role})</p>
                <p className="text-sm text-gray-600">IP Address: {selectedAudit.ipAddress}</p>
                <p className="text-sm text-gray-600">Status: {selectedAudit.status}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
              <p className="text-sm text-gray-600">{selectedAudit.details}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AuditTrails;