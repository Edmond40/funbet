import { useMemo, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Plus,
  CreditCard,
  Smartphone,
  Building,
  Globe,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  Settings,
  Shield,
  Trash2
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile, formatCurrency } from '../../utils';

const PaymentMethods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isMethodOpen, openModal: openMethodModal, closeModal: closeMethodModal } = useModal();
  const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { confirm } = useConfirm();

  const paymentMethods = useMemo(() => [
    {
      id: 1,
      name: 'MTN Mobile Money',
      type: 'mobile_money',
      provider: 'MTN Ghana',
      status: 'active',
      currency: 'GHS',
      minAmount: 1,
      maxAmount: 10000,
      fee: 0.5,
      feeType: 'percentage',
      processingTime: '1-5 minutes',
      totalTransactions: 15420,
      totalVolume: 2456780,
      successRate: 98.5,
      icon: Smartphone,
      featured: true
    },
    {
      id: 2,
      name: 'Vodafone Cash',
      type: 'mobile_money',
      provider: 'Vodafone Ghana',
      status: 'active',
      currency: 'GHS',
      minAmount: 1,
      maxAmount: 8000,
      fee: 0.6,
      feeType: 'percentage',
      processingTime: '1-5 minutes',
      totalTransactions: 8950,
      totalVolume: 1234560,
      successRate: 97.8,
      icon: Smartphone,
      featured: true
    },
    {
      id: 3,
      name: 'Visa/Mastercard',
      type: 'card',
      provider: 'Multiple Banks',
      status: 'active',
      currency: 'GHS',
      minAmount: 10,
      maxAmount: 20000,
      fee: 2.5,
      feeType: 'percentage',
      processingTime: 'Instant',
      totalTransactions: 3420,
      totalVolume: 1876540,
      successRate: 94.5,
      icon: CreditCard,
      featured: false
    },
    {
      id: 4,
      name: 'Bank Transfer',
      type: 'bank_transfer',
      provider: 'Local Banks',
      status: 'active',
      currency: 'GHS',
      minAmount: 50,
      maxAmount: 100000,
      fee: 5,
      feeType: 'fixed',
      processingTime: '1-24 hours',
      totalTransactions: 1250,
      totalVolume: 3456780,
      successRate: 99.2,
      icon: Building,
      featured: false
    }
  ], []);

  const methodTypes= ['mobile_money', 'card', 'bank_transfer', 'e_wallet'];
  const statuses= ['active', 'inactive', 'maintenance', 'suspended'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertTriangle }
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

  const filteredMethods = useMemo(() => (
    paymentMethods.filter(method => {
      const matchesSearch = method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           method.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || method.type === filterType;
      const matchesStatus = filterStatus === 'all' || method.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
  ), [paymentMethods, searchTerm, filterType, filterStatus]);

  const stats = useMemo(() => ({
    totalMethods: paymentMethods.length,
    activeMethods: paymentMethods.filter(m => m.status === 'active').length,
    totalTransactions: paymentMethods.reduce((sum, m) => sum + m.totalTransactions, 0),
    totalVolume: paymentMethods.reduce((sum, m) => sum + m.totalVolume, 0),
    avgSuccessRate: paymentMethods.reduce((sum, m) => sum + m.successRate, 0) / paymentMethods.length
  }), [paymentMethods]);

  // Action functions
  const handleViewMethod = (method) => {
    setSelectedMethod(method);
    openMethodModal();
  };

  const handleEditMethod = (method) => {
    setSelectedMethod(method);
    openCreateModal();
  };

  const handleToggleStatus = async (method) => {
    const newStatus = method.status === 'active' ? 'inactive' : 'active';
    const confirmed = await confirm({
      title: `${newStatus === 'active' ? 'Activate' : 'Deactivate'} Payment Method`,
      message: `Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} ${method.name}?`,
      confirmText: newStatus === 'active' ? 'Activate' : 'Deactivate',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Status Updated', `${method.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      // TODO: Update method status
    }
  };

  const handleDeleteMethod = async (method) => {
    const confirmed = await confirm({
      title: 'Delete Payment Method',
      message: `Are you sure you want to delete ${method.name}? This action cannot be undone.`,
      confirmText: 'Delete Method',
      type: 'danger'
    });

    if (confirmed) {
      addToast('success', 'Method Deleted', `${method.name} has been deleted successfully`);
      // TODO: Delete method
    }
  };

  const handleCreateMethod = () => {
    setSelectedMethod(null);
    openCreateModal();
  };

  const handleExportMethods = () => {
    const csvContent = paymentMethods
      .map(method => [
        method.id,
        method.name,
        method.type,
        method.provider,
        method.status,
        method.currency,
        method.minAmount,
        method.maxAmount,
        method.fee,
        method.feeType,
        method.processingTime,
        method.totalTransactions,
        method.totalVolume,
        method.successRate,
        method.featured ? 'Yes' : 'No'
      ].join(','))
      .join('\n');

    downloadFile(`id,name,type,provider,status,currency,minAmount,maxAmount,fee,feeType,processingTime,totalTransactions,totalVolume,successRate,featured\n${csvContent}`, 'payment-methods-export.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Payment methods data has been exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600 mt-1">Manage payment gateways and processing methods</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleCreateMethod}
            title="Add Method" 
            aria-label="Add Method"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Method
          </button>
          <button 
            onClick={handleExportMethods}
            title="Export Report" 
            aria-label="Export Report"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Methods</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalMethods}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Methods</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeMethods}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalTransactions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Global Coverage</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats?.globalCoverage || 45} Countries</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalVolume.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgSuccessRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
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
              <input title="Search payment methods" aria-label="Search payment methods" placeholder="Search payment methods..."
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Filter by payment type" aria-label="Filter by payment type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {methodTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>

            <select title="Filter by payment status" aria-label="Filter by payment status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <button title="More filter options" aria-label="More filter options"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMethods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div key={method.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
                      {method.featured && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{method.provider}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(method.status)}
                      <span className="text-xs text-gray-500">{method.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewMethod(method)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
                    title="View details" 
                    aria-label="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditMethod(method)}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors" 
                    title="Edit method" 
                    aria-label="Edit method"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(method)}
                    className="p-2 text-gray-400 hover:text-purple-600 transition-colors" 
                    title="Toggle status" 
                    aria-label="Toggle status"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteMethod(method)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                    title="Delete method" 
                    aria-label="Delete method"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Method Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Transactions</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{method.totalTransactions.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Volume</span>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {method.totalVolume.toLocaleString()}</p>
                </div>
              </div>

              {/* Limits and Fees */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transaction Limits:</span>
                  <span className="text-sm font-medium text-gray-900">
                    GH₵ {method.minAmount} - GH₵ {method.maxAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Processing Fee:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {method.feeType === 'percentage' ? `${method.fee}%` : `GH₵ ${method.fee}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate:</span>
                  <span className={`text-sm font-medium ${method.successRate >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {method.successRate}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Method Details Modal */}
      <Modal
        isOpen={isMethodOpen}
        onClose={closeMethodModal}
        title="Payment Method Details"
        size="lg"
      >
        {selectedMethod && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Method Name</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.provider}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{selectedMethod.type.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1">{getStatusBadge(selectedMethod.status)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.currency}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fee</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.fee}% per transaction</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Min Amount</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedMethod.minAmount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Amount</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedMethod.maxAmount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.processingTime}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Success Rate</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.successRate}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Transactions</label>
                <p className="mt-1 text-sm text-gray-900">{selectedMethod.totalTransactions.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Volume</label>
                <p className="mt-1 text-sm text-gray-900">{formatCurrency(selectedMethod.totalVolume)}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeMethodModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closeMethodModal();
                  handleEditMethod(selectedMethod);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Method
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create/Edit Payment Method Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        title={selectedMethod ? "Edit Payment Method" : "Add New Payment Method"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Method Name</label>
              <input
                type="text"
                defaultValue={selectedMethod?.name || ''}
                placeholder="e.g., MTN Mobile Money"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <input
                type="text"
                defaultValue={selectedMethod?.provider || ''}
                placeholder="e.g., MTN Ghana"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Method Type</label>
              <select
                defaultValue={selectedMethod?.type || 'mobile_money'}
                title="Select payment method type"
                aria-label="Select payment method type"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="mobile_money">Mobile Money</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Currency</label>
              <select
                defaultValue={selectedMethod?.currency || 'GHS'}
                title="Select currency"
                aria-label="Select currency"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="GHS">GHS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => {
                closeCreateModal();
                setSelectedMethod(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                addToast('success', selectedMethod ? 'Method Updated' : 'Method Created', 
                  selectedMethod ? 'Payment method has been updated successfully' : 'New payment method has been created successfully');
                closeCreateModal();
                setSelectedMethod(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {selectedMethod ? 'Update Method' : 'Add Method'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethods;
