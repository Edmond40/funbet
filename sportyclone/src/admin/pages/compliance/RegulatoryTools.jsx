import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Calendar,
  Settings,
  Upload,
  ExternalLink
} from 'lucide-react';

const RegulatoryTools = () => {
  const [selectedTab, setSelectedTab] = useState('licenses');
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const licenses = [
    {
      id: 1,
      name: 'Gaming Commission License',
      type: 'gaming_license',
      issuer: 'Ghana Gaming Commission',
      licenseNumber: 'GGC-2024-001',
      status: 'active',
      issueDate: '2024-01-01',
      expiryDate: '2024-12-31',
      renewalDate: '2024-11-01',
      jurisdiction: 'Ghana',
      description: 'Primary gaming license for sports betting operations',
      documents: ['license_certificate.pdf', 'terms_conditions.pdf']
    },
    {
      id: 2,
      name: 'Anti-Money Laundering Certificate',
      type: 'aml_certificate',
      issuer: 'Financial Intelligence Centre',
      licenseNumber: 'FIC-AML-2024-789',
      status: 'active',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      renewalDate: '2024-12-15',
      jurisdiction: 'Ghana',
      description: 'AML compliance certification',
      documents: ['aml_certificate.pdf', 'compliance_report.pdf']
    },
    {
      id: 3,
      name: 'Data Protection Registration',
      type: 'data_protection',
      issuer: 'Data Protection Commission',
      licenseNumber: 'DPC-REG-2024-456',
      status: 'pending_renewal',
      issueDate: '2023-06-01',
      expiryDate: '2024-06-01',
      renewalDate: '2024-05-01',
      jurisdiction: 'Ghana',
      description: 'Data protection and privacy compliance registration',
      documents: ['data_protection_cert.pdf']
    }
  ];

  const complianceReports = [
    {
      id: 1,
      title: 'Monthly Compliance Report - December 2023',
      type: 'monthly_report',
      status: 'submitted',
      dueDate: '2024-01-15',
      submittedDate: '2024-01-10',
      recipient: 'Ghana Gaming Commission',
      description: 'Monthly operational and financial compliance report',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'AML Transaction Monitoring Report',
      type: 'aml_report',
      status: 'draft',
      dueDate: '2024-01-25',
      submittedDate: '-',
      recipient: 'Financial Intelligence Centre',
      description: 'Quarterly AML and suspicious transaction report',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Player Protection Assessment',
      type: 'player_protection',
      status: 'overdue',
      dueDate: '2024-01-20',
      submittedDate: '-',
      recipient: 'Gaming Commission',
      description: 'Annual player protection and responsible gambling assessment',
      size: '3.2 MB'
    }
  ];

  const regulatoryUpdates = [
    {
      id: 1,
      title: 'New KYC Requirements Effective February 2024',
      source: 'Ghana Gaming Commission',
      date: '2024-01-15',
      priority: 'high',
      status: 'action_required',
      description: 'Enhanced customer verification requirements for all gaming operators',
      deadline: '2024-02-01'
    },
    {
      id: 2,
      title: 'Updated Tax Rates for Gaming Revenue',
      source: 'Ghana Revenue Authority',
      date: '2024-01-10',
      priority: 'medium',
      status: 'reviewed',
      description: 'Changes to gaming tax rates and reporting requirements',
      deadline: '2024-03-01'
    },
    {
      id: 3,
      title: 'Data Retention Policy Updates',
      source: 'Data Protection Commission',
      date: '2024-01-05',
      priority: 'low',
      status: 'implemented',
      description: 'Updated guidelines for customer data retention and deletion',
      deadline: '2024-04-01'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending_renewal: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      expired: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      submitted: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FileText },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
      action_required: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle },
      reviewed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Eye },
      implemented: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { bg: 'bg-gray-100', text: 'text-gray-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regulatory Tools</h1>
          <p className="text-gray-600 mt-1">Manage licenses, compliance reports, and regulatory requirements</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select
            title="Filter by status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Assign Users
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </button>
          <button title="Action button" 
            onClick={() => setShowAddDocument(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Document
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center" aria-label="Action button">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Licenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {licenses.filter(l => l.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reports</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {complianceReports.filter(r => r.status === 'draft' || r.status === 'overdue').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {regulatoryUpdates.filter(u => u.status === 'action_required').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600 mt-2">94.5%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('licenses')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'licenses' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Licenses & Permits
          </button>
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('reports')} 
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'reports' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Compliance Reports
          </button>
          <button title="Action button" aria-label="Action button"
            onClick={() => setSelectedTab('updates')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'updates' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Regulatory Updates
          </button>
        </div>
      </div>

      {/* Licenses Tab */}
      {selectedTab === 'licenses' && (
        <div className="space-y-4">
          {licenses.map((license) => (
            <div key={license.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{license.name}</h3>
                      {getStatusBadge(license.status)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>License: {license.licenseNumber}</span>
                      <span>Issuer: {license.issuer}</span>
                      <span>Jurisdiction: {license.jurisdiction}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View license" aria-label="Action button">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit license" aria-label="Action button">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Action button">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{license.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Issue Date:</span>
                  <p className="font-medium text-gray-900">{license.issueDate}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Expiry Date:</span>
                  <p className="font-medium text-gray-900">{license.expiryDate}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Renewal Due:</span>
                  <p className="font-medium text-gray-900">{license.renewalDate}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Associated Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {license.documents.map((doc, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                      <FileText className="w-3 h-3 mr-1" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reports Tab */}
      {selectedTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Compliance Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complianceReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.recipient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" title="View report" aria-label="Action button">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-3" title="Edit report" aria-label="Action button">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900" title="Download" aria-label="Action button">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Updates Tab */}
      {selectedTab === 'updates' && (
        <div className="space-y-4">
          {regulatoryUpdates.map((update) => (
            <div key={update.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3> 
                    {getStatusBadge(update.status)}
                    {getPriorityBadge(update.priority)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>Source: {update.source}</span>
                    <span>Date: {update.date}</span>
                    <span>Deadline: {update.deadline}</span>
                  </div>
                  <p className="text-gray-600">{update.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details" aria-label="View details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark" aria-label="Mark">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="External link" aria-label="External link">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Document Modal */}
      {showAddDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Add Regulatory Document</h3>
              <button title="Action button" aria-label="Action button" 
                onClick={() => setShowAddDocument(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="license">License</option>
                    <option value="certificate">Certificate</option>
                    <option value="report">Compliance Report</option>
                    <option value="policy">Policy Document</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                <input title="Input field" aria-label="Input field" placeholder="Enter value"
                  type="text"
                
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button" 
                  type="button"
                  onClick={() => setShowAddDocument(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                 >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegulatoryTools;
