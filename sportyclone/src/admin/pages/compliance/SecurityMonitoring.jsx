import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Lock,
  Unlock,
  Globe,
  Server,
  Wifi,
  Database,
  Settings,
  RefreshCw
} from 'lucide-react';

const SecurityMonitoring = () => {
  const [selectedTab, setSelectedTab] = useState('threats');
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const securityThreats = [
    {
      id: 1,
      type: 'brute_force_attack',
      severity: 'high',
      status: 'active',
      source: '203.0.113.45',
      target: 'Admin Login',
      description: 'Multiple failed login attempts detected from suspicious IP',
      attempts: 127,
      firstDetected: '2024-01-21 16:30:00',
      lastActivity: '2024-01-21 16:45:12',
      blocked,
      location: 'Unknown'
    },
    {
      id: 2,
      type: 'sql_injection',
      severity: 'critical',
      status: 'blocked',
      source: '198.51.100.23',
      target: 'User Registration API',
      description: 'SQL injection attempt detected in registration form',
      attempts: 15,
      firstDetected: '2024-01-21 15:45:30',
      lastActivity: '2024-01-21 15:47:22',
      blocked,
      location: 'Nigeria'
    },
    {
      id: 3,
      type: 'ddos_attack',
      severity: 'high',
      status: 'mitigated',
      source: 'Multiple IPs',
      target: 'Main Website',
      description: 'Distributed denial of service attack targeting main website',
      attempts: 50000,
      firstDetected: '2024-01-21 14:20:15',
      lastActivity: '2024-01-21 14:35:45',
      blocked,
      location: 'Various'
    },
    {
      id: 4,
      type: 'suspicious_login',
      severity: 'medium',
      status: 'investigating',
      source: '192.0.2.100',
      target: 'User Account - USR12345',
      description: 'Login from unusual location detected',
      attempts: 1,
      firstDetected: '2024-01-21 13:15:30',
      lastActivity: '2024-01-21 13:15:30',
      blocked,
      location: 'Russia'
    }
  ];

  const systemHealth = {
    firewall: {
      status: 'active',
      blocked: 1247,
      allowed: 98753,
      lastUpdate: '2024-01-21 16:45:00'
    },
    antivirus: {
      status: 'active',
      threats: 0,
      scanned: 15420,
      lastScan: '2024-01-21 16:30:00'
    },
    intrusion: {
      status: 'active',
      alerts: 23,
      blocked: 45,
      lastCheck: '2024-01-21 16:44:30'
    },
    ssl: {
      status: 'valid',
      expiry: '2024-12-31',
      strength: 'A+',
      lastCheck: '2024-01-21 16:00:00'
    }
  };

  const accessLogs = [
    {
      id: 1,
      user: 'admin@sportybet.com',
      ip: '192.168.1.100',
      location: 'Ghana',
      device: 'Windows 10 - Chrome',
      action: 'Login Success',
      timestamp: '2024-01-21 16:45:12',
      risk: 'low'
    },
    {
      id: 2,
      user: 'support@sportybet.com',
      ip: '192.168.1.101',
      location: 'Ghana',
      device: 'Windows 10 - Firefox',
      action: 'Password Reset',
      timestamp: '2024-01-21 16:30:25',
      risk: 'low'
    },
    {
      id: 3,
      user: 'unknown',
      ip: '203.0.113.45',
      location: 'Unknown',
      device: 'Linux - curl',
      action: 'Failed Login',
      timestamp: '2024-01-21 16:15:18',
      risk: 'high'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
      blocked: { bg: 'bg-green-100', text: 'text-green-800', icon: Shield },
      mitigated: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      investigating: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      resolved: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
    };

    const config = statusConfig[status] || statusConfig.active;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
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

  const getRiskBadge = (risk) => {
    const riskConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = riskConfig[risk] || riskConfig.low;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {risk.toUpperCase()}
      </span>
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const stats = {
    activeThreats: securityThreats.filter(t => t.status === 'active').length,
    blockedAttacks: securityThreats.filter(t => t.blocked).length,
    totalAttempts: securityThreats.reduce((sum, t) => sum + t.attempts, 0),
    systemHealth: 98.5
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Monitoring</h1>
          <p className="text-gray-600 mt-1">Monitor security threats, system health, and access logs</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search threats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select
            title="Filter by threat status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="resolved">Resolved</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Unlock className="w-4 h-4 mr-2" />
            Unlock Account
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Server className="w-4 h-4 mr-2" />
            Server Status
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Wifi className="w-4 h-4 mr-2" />
            Network
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
          <button title="Action button" aria-label="Action button" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
           >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center" title="Action button" aria-label="Action button">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Threats</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.activeThreats}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blocked Attacks</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.blockedAttacks}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalAttempts.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.systemHealth}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['threats', 'logs', 'health', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {selectedTab === 'threats' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Security Threats</h3>
              {/* Threats content */}
            </div>
          )}
          {selectedTab === 'health' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">System Security Status</h3>
            </div>
          )}
        </div>
      </div>

      {/* System Health Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Security Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Firewall</h4>
              <p className="text-sm text-green-600">Active - {systemHealth.firewall.blocked} blocked</p>
              <p className="text-xs text-gray-500">Updated: {systemHealth.firewall.lastUpdate}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Antivirus</h4>
              <p className="text-sm text-green-600">Active - {systemHealth.antivirus.threats} threats</p>
              <p className="text-xs text-gray-500">Scanned: {systemHealth.antivirus.lastScan}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Intrusion Detection</h4>
              <p className="text-sm text-yellow-600">Active - {systemHealth.intrusion.alerts} alerts</p>
              <p className="text-xs text-gray-500">Checked: {systemHealth.intrusion.lastCheck}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">SSL Certificate</h4>
              <p className="text-sm text-green-600">Valid - Grade {systemHealth.ssl.strength}</p>
              <p className="text-xs text-gray-500">Expires: {systemHealth.ssl.expiry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'threats' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Security Threats
          </button>
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'access' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Access Logs
          </button>
        </div>
      </div>

      {/* Security Threats Tab */}
      {selectedTab === 'threats' && (
        <div className="space-y-4">
          {securityThreats.map((threat) => (
            <div key={threat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    threat.severity === 'critical' ? 'bg-red-100' :
                    threat.severity === 'high' ? 'bg-orange-100' :
                    threat.severity === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <AlertTriangle className={`w-6 h-6 ${
                      threat.severity === 'critical' ? 'text-red-600' :
                      threat.severity === 'high' ? 'text-orange-600' :
                      threat.severity === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {threat.type.replace('_', ' ').toUpperCase()}
                      </h3>
                      {getStatusBadge(threat.status)}
                      {getSeverityBadge(threat.severity)}
                    </div>
                    <p className="text-gray-600 mb-2">{threat.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Source: {threat.source}</span>
                      <span>Target: {threat.target}</span>
                      <span>Location: {threat.location}</span>
                      <span>Attempts: {threat.attempts}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details" aria-label="View details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Block IP" aria-label="Block IP">
                    <XCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark resolved" aria-label="Mark resolved">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <span className="text-sm text-gray-600">First Detected:</span>
                  <p className="font-medium text-gray-900">{threat.firstDetected}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Activity:</span>
                  <p className="font-medium text-gray-900">{threat.lastActivity}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <p className={`font-medium ${threat.blocked ? 'text-green-600' : 'text-red-600'}`}>
                    {threat.blocked ? 'Blocked' : 'Active'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Access Logs Tab */}
      {selectedTab === 'access' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Access Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{log.ip}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        log.action.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRiskBadge(log.risk)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityMonitoring;
