import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Shield,
  Ban,
  Clock,
  Calendar,
  DollarSign,
  Activity,
  Lock,
  Unlock,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile, formatCurrency } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';

const UserRestrictions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedRestriction, setSelectedRestriction] = useState(null);
  
  const { addToast } = useToast();
  const { isOpen: isRestrictionModalOpen, openModal: openRestrictionModal, closeModal: closeRestrictionModal } = useModal();
  const { isOpen: isCreateModalOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpen: isFilterModalOpen, openModal: openFilterModal, closeModal: closeFilterModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();


  const restrictions = [
    {
      id: 1,
      user: {
        name: 'Kwame Asante',
        email: 'kwame.asante@gmail.com',
        phone: '+233 24 123 4567',
        userId: 'USR001'
      },
      type: 'betting_limit',
      description: 'Daily betting limit set to GH₵ 500',
      amount: 500,
      reason: 'Self-imposed responsible gambling limit',
      status: 'active',
      createdBy: 'Admin User',
      createdAt: '2024-01-20 10:30',
      expiresAt: '2024-02-20 10:30',
      severity: 'low'
    },
    {
      id: 2,
      user: {
        name: 'Ama Osei',
        email: 'ama.osei@yahoo.com',
        phone: '+233 20 987 6543',
        userId: 'USR002'
      },
      type: 'account_suspension',
      description: 'Account temporarily suspended',
      amount: null,
      reason: 'Multiple failed login attempts - security concern',
      status: 'active',
      createdBy: 'System',
      createdAt: '2024-01-21 15:45',
      expiresAt: '2024-01-24 15:45',
      severity: 'high'
    },
    {
      id: 3,
      user: {
        name: 'Kofi Mensah',
        email: 'kofi.mensah@hotmail.com',
        phone: '+233 26 555 7890',
        userId: 'USR003'
      },
      type: 'withdrawal_freeze',
      description: 'Withdrawal operations frozen',
      amount: null,
      reason: 'Pending identity verification',
      status: 'active',
      createdBy: 'Admin User',
      createdAt: '2024-01-19 09:20',
      expiresAt: null,
      severity: 'medium'
    },
    {
      id: 4,
      user: {
        name: 'Akosua Frimpong',
        email: 'akosua.frimpong@gmail.com',
        phone: '+233 24 888 9999',
        userId: 'USR004'
      },
      type: 'deposit_limit',
      description: 'Monthly deposit limit set to GH₵ 2,000',
      amount: 2000,
      reason: 'Responsible gambling measure',
      status: 'expired',
      createdBy: 'User Request',
      createdAt: '2024-01-01 08:00',
      expiresAt: '2024-01-21 08:00',
      severity: 'low'
    }
  ];

  const restrictionTypes = [
    { value: 'betting_limit', label: 'Betting Limit', icon: Activity },
    { value: 'deposit_limit', label: 'Deposit Limit', icon: Activity },
    { value: 'withdrawal_freeze', label: 'Withdrawal Freeze', icon: Activity },
    { value: 'account_suspension', label: 'Account Suspension', icon: Activity },
    { value: 'login_restriction', label: 'Login Restriction', icon: Activity },
    { value: 'feature_restriction', label: 'Feature Restriction', icon: Activity }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      expired: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: Ban }
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

  // Action functions
  const handleViewRestriction = (restriction) => {
    setSelectedRestriction(restriction);
    openRestrictionModal();
  };

  const handleEditRestriction = (restriction) => {
    setSelectedRestriction(restriction);
    openCreateModal();
  };

  const handleRemoveRestriction = async (restriction) => {
    const confirmed = await confirm({
      title: 'Remove Restriction',
      message: `Are you sure you want to remove this restriction for ${restriction.user.name}?`,
      confirmText: 'Remove Restriction',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'Restriction Removed', `Restriction has been removed for ${restriction.user.name}`);
      // TODO: Remove restriction from data
    }
  };

  const handleCreateRestriction = () => {
    setSelectedRestriction(null);
    openCreateModal();
  };

  const handleExportRestrictions = () => {
    const csvData = restrictions.map(restriction => ({
      ID: restriction.id,
      User: restriction.user.name,
      Email: restriction.user.email,
      Type: restriction.type,
      Description: restriction.description,
      Amount: restriction.amount,
      Reason: restriction.reason,
      Status: restriction.status,
      'Created By': restriction.createdBy,
      'Created At': restriction.createdAt,
      'Expires At': restriction.expiresAt,
      Severity: restriction.severity
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    downloadFile(csvContent, 'user-restrictions-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'User restrictions data has been exported successfully');
  };

  const getRestrictionIcon = (type) => {
    const typeConfig = {
      betting_limit: DollarSign,
      deposit_limit: DollarSign,
      withdrawal_freeze: Lock,
      account_suspension: Ban,
      login_restriction: Shield,
      feature_restriction: Activity
    };

    const IconComponent = typeConfig[type] || Shield;
    return <IconComponent className="w-5 h-5" />;
  };

  const filteredRestrictions = restrictions.filter(restriction => {
    const matchesSearch = restriction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restriction.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restriction.user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || restriction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Restrictions</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Manage user account restrictions and limitations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleCreateRestriction}
            title="Add Restriction" 
            aria-label="Add Restriction"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Shield className="w-4 h-4 mr-2" />
            Add Restriction
          </button>
          <button 
            onClick={handleExportRestrictions}
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Restrictions</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {restrictions.filter(r => r.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Account Suspensions</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {restrictions.filter(r => r.type === 'account_suspension' && r.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Ban className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Betting Limits</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {restrictions.filter(r => r.type === 'betting_limit' && r.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
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
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expired Today</p>
              <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2</p>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl shadow-sm border p-6 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input title="Input field" aria-label="Input field" 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300'
                }`}
              />
            </div>

            <select title="Select option" aria-label="Select option"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300'
              }`}
             
            >
              <option value="all">All Types</option>
              {restrictionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={openFilterModal}
            title="Open advanced filters" 
            aria-label="Open advanced filters"
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}>
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Restrictions List */}
      <div className="space-y-4">
        {filteredRestrictions.map((restriction) => (
          <div key={restriction.id} className={`rounded-xl shadow-sm border p-6 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-red-100'
                }`}>
                  {getRestrictionIcon(restriction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{restriction.user.name}</h3>
                    {getStatusBadge(restriction.status)}
                    {getSeverityBadge(restriction.severity)}
                  </div>

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div>
                      <span className="font-medium">User ID:</span> {restriction.user.userId}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {restriction.user.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {restriction.user.phone}
                    </div>
                    <div>
                      <span className="font-medium">Created by:</span> {restriction.createdBy}
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {getRestrictionIcon(restriction.type)}
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {restrictionTypes.find(t => t.value === restriction.type)?.label}
                      </span>
                    </div>
                    <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{restriction.description}</p>
                    {restriction.amount && (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="font-medium">Amount:</span> GH₵ {restriction.amount.toLocaleString()}
                      </p>
                    )}
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className="font-medium">Reason:</span> {restriction.reason}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Created: {restriction.createdAt}
                      </div>
                      {restriction.expiresAt && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Expires: {restriction.expiresAt}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewRestriction(restriction)}
                  aria-label="View Restriction"
                  className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'
                  }`}
                  title="View restriction details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditRestriction(restriction)}
                  aria-label="Edit Restriction"
                  className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-600'
                  }`}
                  title="Edit restriction"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleRemoveRestriction(restriction)}
                  aria-label="Remove Restriction"
                  className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                  }`}
                  title="Remove restriction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {restriction.status === 'active' ? (
                  <button className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-600'
                  }`} title="Lift restriction" aria-label="Lift restriction">
                    <Unlock className="w-4 h-4" />
                  </button>
                ) : (
                  <button className={`p-2 transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                  }`} title="Activate restriction" aria-label="Activate restriction">
                    <Lock className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Restriction Details Modal */}
      <Modal
        isOpen={isRestrictionModalOpen}
        onClose={closeRestrictionModal}
        title="Restriction Details"
        size="lg"
      >
        {selectedRestriction && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRestriction.user.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedRestriction.user.email}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User ID</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRestriction.user.userId}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Restriction Type</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>{selectedRestriction.type.replace('_', ' ')}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <p className="mt-1">{getStatusBadge(selectedRestriction.status)}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Severity</label>
                <p className="mt-1">{getSeverityBadge(selectedRestriction.severity)}</p>
              </div>
              {selectedRestriction.amount && (
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(selectedRestriction.amount)}</p>
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Created By</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRestriction.createdBy}</p>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Created At</label>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRestriction.createdAt}</p>
              </div>
              {selectedRestriction.expiresAt && (
                <div className="col-span-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expires At</label>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedRestriction.expiresAt}</p>
                </div>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <p className={`text-sm p-3 rounded-lg ${
                darkMode ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-50'
              }`}>{selectedRestriction.description}</p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reason</label>
              <p className={`text-sm p-3 rounded-lg ${
                darkMode ? 'text-white bg-gray-700' : 'text-gray-900 bg-gray-50'
              }`}>{selectedRestriction.reason}</p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeRestrictionModal}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeRestrictionModal();
                  handleEditRestriction(selectedRestriction);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Restriction
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit Restriction Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title={selectedRestriction ? "Edit Restriction" : "Create New Restriction"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>User ID or Email</label>
              <input
                type="text"
                defaultValue={selectedRestriction?.user.email || ''}
                placeholder="Enter user ID or email"
                className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Restriction Type</label>
              <select
                defaultValue={selectedRestriction?.type || 'betting_limit'}
                className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
                title="Select restriction type"
                aria-label="Select restriction type"
              >
                <option value="betting_limit">Betting Limit</option>
                <option value="deposit_limit">Deposit Limit</option>
                <option value="withdrawal_freeze">Withdrawal Freeze</option>
                <option value="account_suspension">Account Suspension</option>
                <option value="login_restriction">Login Restriction</option>
                <option value="feature_restriction">Feature Restriction</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
            <input
              type="text"
              defaultValue={selectedRestriction?.description || ''}
              placeholder="Brief description of the restriction"
              className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount (if applicable)</label>
              <input
                type="number"
                defaultValue={selectedRestriction?.amount || ''}
                placeholder="Enter amount in GH₵"
                className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expires At</label>
              <input
                type="datetime-local"
                defaultValue={selectedRestriction?.expiresAt || ''}
                className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
                title="Set expiration date and time"
                aria-label="Set expiration date and time"
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reason</label>
            <textarea
              rows={3}
              defaultValue={selectedRestriction?.reason || ''}
              placeholder="Explain the reason for this restriction"
              className={`mt-1 w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
              }`}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                closeCreateModal();
                setSelectedRestriction(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                addToast('success', selectedRestriction ? 'Restriction Updated' : 'Restriction Created', 
                  selectedRestriction ? 'Restriction has been updated successfully' : 'New restriction has been created successfully');
                closeCreateModal();
                setSelectedRestriction(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {selectedRestriction ? 'Update Restriction' : 'Create Restriction'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Advanced Filters Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        title="Advanced Restriction Filters"
        size="md"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
              <select
                title="Status Filter"
                aria-label="Status Filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Created From</label>
              <input
                type="date"
                title="Created From Date"
                aria-label="Created From Date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className={`mt-1 block w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                setFilterStatus('all');
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
    </div>
  );
};
 
export default UserRestrictions;
