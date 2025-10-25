import { useState } from 'react';
import { 
  Download, 
  Eye, 
  Edit,
  Plus,
  Key,
  Activity,
  Shield,
  Clock,
  BarChart3,
  Settings,
  Copy,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const APIManagement = () => {
  const [selectedTab, setSelectedTab] = useState('keys');
  const [showCreateKey, setShowCreateKey] = useState(false);

  const apiKeys = [
    {
      id: 1,
      name: 'Mobile App API', 
      type: 'production',
      status: 'active',
      key: 'sk_prod_1234567890abcdef',
      permissions: ['read', 'write', 'betting'],
      rateLimit: 1000,
      usage: 756,
      lastUsed: '2024-01-21 16:45:12',
      createdAt: '2024-01-01 10:00:00',
      expiresAt: '2024-12-31 23:59:59'
    },
    {
      id: 2,
      name: 'Web Dashboard API', 
      type: 'development',
      status: 'active',
      key: 'sk_dev_abcdef1234567890',
      permissions: ['read', 'write'],
      rateLimit: 500,
      usage: 234,
      lastUsed: '2024-01-21 16:30:25',
      createdAt: '2024-01-15 14:30:00',
      expiresAt: '2024-06-30 23:59:59'
    },
    {
      id: 3,
      name: 'Third Party Integration', 
      type: 'production',
      status: 'suspended',
      key: 'sk_prod_fedcba0987654321',
      permissions: ['read'],
      rateLimit: 100,
      usage: 89,
      lastUsed: '2024-01-20 09:15:30',
      createdAt: '2024-01-10 11:20:00',
      expiresAt: '2024-03-31 23:59:59'
    }
  ];

  const apiEndpoints = [
    {
      id: 1,
      path: '/api/v1/auth/login',
      method: 'POST',
      description: 'User authentication endpoint',
      status: 'active',
      responseTime: 120,
      requests24h: 15420,
      errorRate: 0.5,
      lastUpdated: '2024-01-21 16:00:00'
    },
    {
      id: 2,
      path: '/api/v1/sports/matches',
      method: 'GET',
      description: 'Retrieve available sports matches',
      status: 'active',
      responseTime: 85,
      requests24h: 89456,
      errorRate: 0.2,
      lastUpdated: '2024-01-21 15:45:00'
    },
    {
      id: 3,
      path: '/api/v1/bets/place',
      method: 'POST',
      description: 'Place a new bet',
      status: 'active',
      responseTime: 200,
      requests24h: 23456,
      errorRate: 1.2,
      lastUpdated: '2024-01-21 16:30:00'
    },
    {
      id: 4,
      path: '/api/v1/payments/deposit',
      method: 'POST',
      description: 'Process deposit transaction',
      status: 'maintenance',
      responseTime: 350,
      requests24h: 5678,
      errorRate: 2.1,
      lastUpdated: '2024-01-21 14:20:00'
    }
  ];

  const apiMetrics = {
    totalRequests: 234567,
    successRate: 98.5,
    avgResponseTime: 145,
    activeKeys: apiKeys.filter(k => k.status === 'active').length,
    rateLimitHits: 45,
    errorCount: 123
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      expired: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getMethodBadge = (method) => {
    const methodConfig = {
      GET: { bg: 'bg-blue-100', text: 'text-blue-800' },
      POST: { bg: 'bg-green-100', text: 'text-green-800' },
      PUT: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      DELETE: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = methodConfig[method] || methodConfig.GET;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {method}
      </span>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Management</h1>
          <p className="text-gray-600 mt-1">Manage API keys, endpoints, and monitor usage</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Action button" aria-label="Action button" 
            onClick={() => setShowCreateKey(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center" title="Action button" aria-label="Action button">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
        </div>
      </div>

      {/* API Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{apiMetrics.totalRequests.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{apiMetrics.successRate}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{apiMetrics.avgResponseTime}ms</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Keys</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{apiMetrics.activeKeys}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rate Limit Hits</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{apiMetrics.rateLimitHits}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors (24h)</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{apiMetrics.errorCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('keys')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'keys' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            API Keys
          </button>
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('endpoints')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'endpoints' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Endpoints
          </button>
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'analytics' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* API Keys Tab */}
      {selectedTab === 'keys' && (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => {
            const usagePercentage = (apiKey.usage / apiKey.rateLimit) * 100;
            
            return (
              <div key={apiKey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Key className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                        {getStatusBadge(apiKey.status)}
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                          apiKey.type === 'production' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {apiKey.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Created: {apiKey.createdAt}</span>
                        <span>Expires: {apiKey.expiresAt}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button title="Action button" aria-label="Action button" 
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                      
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit key" aria-label="Edit key">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors" title="Regenerate" aria-label="Regenerate">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">API Key:</span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {apiKey.key.substring(0, 20)}...
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Rate Limit</span>
                      <Shield className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{apiKey.rateLimit}/hour</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Usage</span>
                      <Activity className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{apiKey.usage}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Permissions</span>
                      <Key className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{apiKey.permissions.length}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Usage Progress</span>
                    <span>{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        usagePercentage >= 90 ? 'bg-red-500' : usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((permission, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Endpoints Tab */}
      {selectedTab === 'endpoints' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">API Endpoints</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests (24h)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {apiEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{endpoint.path}</div>
                        <div className="text-sm text-gray-500">{endpoint.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getMethodBadge(endpoint.method)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(endpoint.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{endpoint.responseTime}ms</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{endpoint.requests24h.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        endpoint.errorRate > 2 ? 'text-red-600' : 
                        endpoint.errorRate > 1 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {endpoint.errorRate}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" title="View details" aria-label="View details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Analytics" aria-label="Analytics">
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Request Volume (Last 7 Days)</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 78, 82, 95, 88, 92, 100].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-600 mb-2">{height}k</div>
                  <div 
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${height}k requests`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">
                    Day {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Endpoints by Usage</h3>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => {
                const maxRequests = Math.max(...apiEndpoints.map(e => e.requests24h));
                const percentage = (endpoint.requests24h / maxRequests) * 100;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{endpoint.path}</span>
                        <span className="text-sm text-gray-500">{endpoint.requests24h.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New API Key</h3>
              <button title="Action button" aria-label="Action button" 
                onClick={() => setShowCreateKey(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                  <input title="Input field" aria-label="Input field" 
                    type="text"
                    placeholder="Enter API key name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="development">Development</option>
                    <option value="production">Production</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit (requests/hour)</label>
                <input title="Input field" aria-label="Input field"
                  type="number"
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="space-y-2">
                  {['read', 'write', 'admin'].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500"  title="Input field" aria-label="Input field" />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button" 
                  type="button"
                  onClick={() => setShowCreateKey(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button" 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIManagement;
