import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  FileText,
  Camera,
  CreditCard,
  User,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';

const UserVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDocumentType, setFilterDocumentType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isRequestModalOpen, closeModal: closeRequestModal } = useModal();
  const { isOpen: isDocumentModalOpen, openModal: openDocumentModal, closeModal: closeDocumentModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();

  const verificationRequests = [
    {
      id: 1,
      user: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        phone: '+233 24 123 4567',
        joinDate: '2024-01-15',
        country: 'Ghana'
      },
      documents: {
        idCard: {
          type: 'National ID',
          status: 'pending',
          uploadDate: '2024-01-20',
          url: '/documents/id_123.jpg'
        },
        proofOfAddress: {
          type: 'Utility Bill',
          status: 'approved',
          uploadDate: '2024-01-20',
          url: '/documents/address_123.pdf'
        },
        selfie: {
          type: 'Selfie with ID',
          status: 'rejected',
          uploadDate: '2024-01-21',
          url: '/documents/selfie_123.jpg',
          rejectionReason: 'Image quality too low'
        }
      },
      overallStatus: 'pending',
      submittedAt: '2024-01-21 14:30',
      reviewedBy: null,
      priority: 'high'
    },
    {
      id: 2,
      user: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        phone: '+233 20 987 6543',
        joinDate: '2024-01-10',
        country: 'Ghana'
      },
      documents: {
        idCard: {
          type: 'Passport',
          status: 'approved',
          uploadDate: '2024-01-18',
          url: '/documents/id_456.jpg'
        },
        proofOfAddress: {
          type: 'Bank Statement',
          status: 'approved',
          uploadDate: '2024-01-18',
          url: '/documents/address_456.pdf'
        },
        selfie: {
          type: 'Selfie with ID',
          status: 'approved',
          uploadDate: '2024-01-19',
          url: '/documents/selfie_456.jpg'
        }
      },
      overallStatus: 'approved',
      submittedAt: '2024-01-19 09:15',
      reviewedBy: 'Admin User',
      priority: 'medium'
    },
    {
      id: 3,
      user: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        phone: '+233 26 555 7890',
        joinDate: '2024-01-12',
        country: 'Ghana'
      },
      documents: {
        idCard: {
          type: 'Voter ID',
          status: 'rejected',
          uploadDate: '2024-01-17',
          url: '/documents/id_789.jpg',
          rejectionReason: 'Document expired'
        },
        proofOfAddress: {
          type: 'Rental Agreement',
          status: 'pending',
          uploadDate: '2024-01-17',
          url: '/documents/address_789.pdf'
        },
        selfie: null
      },
      overallStatus: 'rejected',
      submittedAt: '2024-01-17 16:45',
      reviewedBy: 'Admin User',
      priority: 'low'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
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

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { bg: 'bg-red-100', text: 'text-red-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      low: { bg: 'bg-gray-100', text: 'text-gray-800' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  // Action functions
  const handleViewDocument = (documentUrl) => {
    // Set selected document URL for modal
    setSelectedRequest(prev => prev ? { ...prev, selectedDocumentUrl: documentUrl } : null);
    openDocumentModal();
  };

  const handleApproveDocument = async (request, documentType) => {
    const confirmed = await confirm({
      title: 'Approve Document',
      message: `Are you sure you want to approve the ${documentType} for ${request.user.name}?`,
      confirmText: 'Approve',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Document Approved', `${documentType} has been approved for ${request.user.name}`);
      // TODO: Update document status
    }
  };

  const handleRejectDocument = async (request, documentType) => {
    const confirmed = await confirm({
      title: 'Reject Document',
      message: `Are you sure you want to reject the ${documentType} for ${request.user.name}?`,
      confirmText: 'Reject',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'Document Rejected', `${documentType} has been rejected for ${request.user.name}`);
      // TODO: Update document status
    }
  };

  const handleExportVerifications = () => {
    const csvData = verificationRequests.map(request => ({
      ID: request.id,
      User: request.user.name,
      Email: request.user.email,
      Phone: request.user.phone,
      Country: request.user.country,
      'Overall Status': request.overallStatus,
      'ID Document Status': request.documents.idCard?.status || 'Not submitted',
      'Address Document Status': request.documents.proofOfAddress?.status || 'Not submitted',
      'Selfie Status': request.documents.selfie?.status || 'Not submitted',
      'Submitted At': request.submittedAt,
      'Reviewed By': request.reviewedBy || 'Not reviewed',
      Priority: request.priority
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    downloadFile(csvContent, 'user-verifications-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'User verification data has been exported successfully');
  };

  const getDocumentIcon = (type) => {
    if (type.toLowerCase().includes('id') || type.toLowerCase().includes('passport')) {
      return <CreditCard className="w-4 h-4" />;
    } else if (type.toLowerCase().includes('selfie')) {
      return <Camera className="w-4 h-4" />;
    } else {
      return <FileText className="w-4 h-4" />;
    }
  };

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.overallStatus === filterStatus;
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Verification</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Review and manage user identity verification requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportVerifications}
            title="Export Report" 
            aria-label="Export Report"
            className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'border border-gray-300 text-gray-700'
            }`}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending Reviews</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {verificationRequests.filter(r => r.overallStatus === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Approved Today</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>12</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Rejected Today</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>High Priority</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {verificationRequests.filter(r => r.priority === 'high').length}
              </p>
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
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) =>  setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <button 
            onClick={openFilterModal}
            title="More Filters" 
            aria-label="More Filters"
            className={`px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center border ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}>
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Verification Requests */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{request.user.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {request.user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {request.user.phone}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined: {request.user.joinDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getPriorityBadge(request.priority)}
                {getStatusBadge(request.overallStatus)}
              </div>
            </div>

            {/* Documents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {Object.entries(request.documents).map(([key, doc]) => {
                if (!doc) return null;
                return (
                  <div key={key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDocumentIcon(doc.type)}
                        <span className="text-sm font-medium text-gray-900">{doc.type}</span>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Uploaded: {doc.uploadDate}</p>
                    {(doc).rejectionReason && (
                      <p className="text-xs text-red-600 mb-2">Reason: {(doc).rejectionReason}</p>
                    )}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDocument(doc.url)}
                        title="View Document" 
                        aria-label="View Document"
                        className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      {doc.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveDocument(request, doc.type)}
                            title="Approve Document" 
                            aria-label="Approve Document"
                            className="text-green-600 hover:text-green-800 text-xs flex items-center"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectDocument(request, doc.type)}
                            title="Reject Document" 
                            aria-label="Reject Document"
                            className="text-red-600 hover:text-red-800 text-xs flex items-center"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Submitted: {request.submittedAt}
                {request.reviewedBy && ` • Reviewed by: ${request.reviewedBy}`}
              </div>
              <div className="flex items-center space-x-2">
                {request.overallStatus === 'pending' && (
                  <>
                    <button title="Action button" aria-label="Action button"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Approve All
                    </button>
                    <button title="Action button" aria-label="Action button"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Reject All
                    </button>
                  </>
                )}
                <button title="Action button" aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Contact User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Request Details Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
        title="Verification Request Details"
        size="xl"
      >
        {selectedRequest && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.user.name}</p>
                <p className="text-xs text-gray-500">{selectedRequest.user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.user.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.user.country}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.user.joinDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Overall Status</label>
                <p className="mt-1">{getStatusBadge(selectedRequest.overallStatus)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <p className="mt-1">{getPriorityBadge(selectedRequest.priority)}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Documents</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(selectedRequest.documents).map(([key, doc]) => {
                  if (!doc) return (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-gray-400 mb-2">{getDocumentIcon(key)}</div>
                      <p className="text-sm text-gray-500">Not submitted</p>
                    </div>
                  );
                  return (
                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getDocumentIcon(doc.type)}
                          <span className="text-sm font-medium">{doc.type}</span>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Uploaded: {doc.uploadDate}</p>
                      {doc.rejectionReason && (
                        <p className="text-xs text-red-600 mb-2">Reason: {doc.rejectionReason}</p>
                      )}
                      <div className="flex space-x-2">
                        {doc.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveDocument(selectedRequest, doc.type)}
                              className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectDocument(selectedRequest, doc.type)}
                              className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeRequestModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedRequest.overallStatus === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      addToast('success', 'Request Approved', `Verification request for ${selectedRequest.user.name} has been approved`);
                      closeRequestModal();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve All
                  </button>
                  <button 
                    onClick={() => {
                      addToast('success', 'Request Rejected', `Verification request for ${selectedRequest.user.name} has been rejected`);
                      closeRequestModal();
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject All
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        title="Advanced Verification Filters"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority Level</label>
              <select
                title="Priority Filter"
                aria-label="Priority Filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Document Type</label>
              <select
                title="Document Type Filter"
                aria-label="Document Type Filter"
                value={filterDocumentType}
                onChange={(e) => setFilterDocumentType(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="all">All Document Types</option>
                <option value="id">ID Documents</option>
                <option value="address">Address Proof</option>
                <option value="selfie">Selfie Verification</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Submitted From</label>
              <input
                type="date"
                title="Submitted From Date"
                aria-label="Submitted From Date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Submitted To</label>
              <input
                type="date"
                title="Submitted To Date"
                aria-label="Submitted To Date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                setFilterPriority('all');
                setFilterDocumentType('all');
                setDateRange({ start: '', end: '' });
                addToast('success', 'Filters Cleared', 'All filters have been reset');
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Clear Filters
            </button>
            <button 
              onClick={() => {
                closeFilterModal();
                addToast('success', 'Filters Applied', 'Advanced filters have been applied successfully');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>

      {/* Document View Modal */}
      <Modal
        isOpen={isDocumentModalOpen}
        onClose={closeDocumentModal}
        title="Document Preview"
        size="lg"
      >
        {selectedRequest?.selectedDocumentUrl && (
          <div className="space-y-4">
            <div className="text-center">
              <img 
                src={selectedRequest.selectedDocumentUrl} 
                alt="Document preview"
                className="max-w-full h-auto mx-auto rounded-lg border"
                onError={(e) => {
                  (e.target).style.display = 'none';
                  (e.target).nextElementSibling.classList.remove('hidden');
                }}
              />
              <div className="hidden text-gray-500 p-8">
                <p>Document preview not available</p>
                <p className="text-sm">URL: {selectedRequest.selectedDocumentUrl}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserVerification;