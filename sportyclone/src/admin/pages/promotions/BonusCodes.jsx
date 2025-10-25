import { useMemo, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { downloadFile } from '../../utils';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Copy,
  Gift,
  Calendar,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  DollarSign,
  Percent,
  Hash,
  Trash
} from 'lucide-react';

const BonusCodes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddCode, setShowAddCode] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  
  const { addToast } = useToast();
  const { isOpen: isBonusModalOpen, openModal: openBonusModal, closeModal: closeBonusModal } = useModal();
  const { confirm } = useConfirm();

  const bonusCodes = useMemo(() => [

    {
      id: 1,
      code: 'WELCOME100',
      name: 'Welcome Bonus Code',
      type: 'welcome_bonus',
      status: 'active',
      bonusAmount: 100,
      bonusType: 'percentage',
      maxBonus: 500,
      minDeposit: 20,
      usageLimit: 1000,
      usageCount: 567,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Get 100% bonus up to GH₵ 500 on your first deposit',
      targetAudience: 'New Users',
      wagering: 5,
      validDays: 30,
      createdAt: '2024-01-01 10:00:00',
      createdBy: 'Admin User'
    },
    {
      id: 2,
      code: 'WEEKEND20',
      name: 'Weekend Special',
      type: 'deposit_bonus',
      status: 'active',
      bonusAmount: 20,
      bonusType: 'percentage',
      maxBonus: 100,
      minDeposit: 50,
      usageLimit: 500,
      usageCount: 234,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      description: '20% bonus on weekend deposits up to GH₵ 100',
      targetAudience: 'All Users',
      wagering: 3,
      validDays: 7,
      createdAt: '2024-01-01 09:30:00',
      createdBy: 'Marketing Team'
    },
    {
      id: 3,
      code: 'FREEBET25',
      name: 'Free Bet Friday',
      type: 'free_bet',
      status: 'active',
      bonusAmount: 25,
      bonusType: 'fixed',
      maxBonus: 25,
      minBet: 10,
      usageLimit: 2000,
      usageCount: 1456,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Get a GH₵ 25 free bet every Friday',
      targetAudience: 'Active Users',
      wagering: 1,
      validDays: 1,
      createdAt: '2024-01-01 08:45:00',
      createdBy: 'Promotions Team'
    },
    {
      id: 4,
      code: 'VIP50',
      name: 'VIP Exclusive Bonus',
      type: 'vip_bonus',
      status: 'paused',
      bonusAmount: 50,
      bonusType: 'percentage',
      maxBonus: 1000,
      minDeposit: 200,
      usageLimit: 100,
      usageCount: 67,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      description: '50% VIP bonus up to GH₵ 1000 for premium members',
      targetAudience: 'VIP Users',
      wagering: 2,
      validDays: 14,
      createdAt: '2024-01-15 11:20:00',
      createdBy: 'VIP Manager'
    },
    {
      id: 5,
      code: 'CASHBACK10',
      name: 'Weekly Cashback',
      type: 'cashback',
      status: 'expired',
      bonusAmount: 10,
      bonusType: 'percentage',
      maxBonus: 200,
      minLoss: 100,
      usageLimit: 1500,
      usageCount: 1500,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      description: '10% cashback on weekly losses up to GH₵ 200',
      targetAudience: 'All Users',
      wagering: 1,
      validDays: 7,
      createdAt: '2023-12-01 14:15:00',
      createdBy: 'Admin User'
    }
  ], []);


  const handleViewBonus = (bonus) => {
    setSelectedCode(bonus);
    openBonusModal();
  };

  const handleCreateBonus = () => setShowAddCode(true);

  const handleDeleteBonus = async (bonus) => {
    const confirmed = await confirm({ title: 'Delete Bonus', message: `Delete ${bonus.code}?`, confirmText: 'Delete', type: 'danger' });
    if (confirmed) addToast('success', 'Bonus Deleted', `${bonus.code} deleted successfully`);
  };

  const handleExportBonuses = () => {
    const csvRows = bonusCodes
      .map(({ code, type, bonusAmount, status, startDate, endDate }) => `${code},${type},${bonusAmount},${status},${startDate},${endDate}`)
      .join('\n');
    downloadFile(`code,type,value,status,startDate,endDate\n${csvRows}`, 'bonus-codes.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Bonus codes exported successfully');
  };

  const codeTypes= ['welcome_bonus', 'deposit_bonus', 'free_bet', 'cashback', 'vip_bonus', 'referral'];
  const statuses= ['active', 'paused', 'scheduled', 'expired', 'draft'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      expired: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertTriangle }
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

  const getTypeIcon = (type) => {
    const typeIcons = {
      welcome_bonus: Gift,
      deposit_bonus: DollarSign,
      free_bet: Target,
      cashback: Percent,
      vip_bonus: Zap,
      referral: TrendingUp
    };
    return typeIcons[type] || Gift;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToast('success', 'Copied', `${text} copied to clipboard`);
  };

  const filteredCodes = useMemo(() => (
    bonusCodes.filter(code => {
      const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           code.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || code.status === filterStatus;
      const matchesType = filterType === 'all' || code.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
  ), [bonusCodes, searchTerm, filterStatus, filterType]);

  const stats = useMemo(() => ({
    totalCodes: bonusCodes.length,
    activeCodes: bonusCodes.filter(c => c.status === 'active').length,
    totalUsage: bonusCodes.reduce((sum, c) => sum + c.usageCount, 0),
    totalLimit: bonusCodes.reduce((sum, c) => sum + c.usageLimit, 0),
    avgUsageRate: (bonusCodes.reduce((sum, c) => sum + (c.usageCount / c.usageLimit), 0) / bonusCodes.length) * 100
  }), [bonusCodes]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bonus Codes</h1>
          <p className="text-gray-600 mt-1">Create and manage promotional bonus codes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Create bonus code" aria-label="Create bonus code"
            onClick={handleCreateBonus}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Code
          </button>
          <button
            onClick={handleExportBonuses}
            title="Export bonus codes"
            aria-label="Export bonus codes"
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
              <p className="text-sm font-medium text-gray-600">Total Codes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalCodes}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Codes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeCodes}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalUsage.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usage Limit</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalLimit.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Usage Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgUsageRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-white" />
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
                placeholder="Search bonus codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" aria-label="Select option"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              
            >
              <option value="all">All Types</option>
              {codeTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>

            <select title="Select option" aria-label="Select option"
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
          
          <button title="Action button" aria-label="Action button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Bonus Codes List */}
      <div className="space-y-4">
        {filteredCodes.map((code) => {
          const IconComponent = getTypeIcon(code.type);
          const usagePercentage = (code.usageCount / code.usageLimit) * 100;
          
          return (
            <div key={code.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{code.name}</h3>
                      {getStatusBadge(code.status)}
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {code.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                          {code.code}
                        </span>
                        <button title="Action button" aria-label="Action button" 
                          onClick={() => copyToClipboard(code.code)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                          
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{code.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {code.startDate} - {code.endDate}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {code.targetAudience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewBonus(code)}
                    title="View bonus details"
                    aria-label="View bonus details"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToast('info', 'Edit Bonus', 'Editing bonus codes coming soon.')}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Edit bonus code"
                    aria-label="Edit bonus code"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBonus(code)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete bonus code"
                    aria-label="Delete bonus code"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Code Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Bonus Amount</span>
                    <Gift className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {code.bonusType === 'percentage' ? `${code.bonusAmount}%` : `GH₵ ${code.bonusAmount}`}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Max Bonus</span>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {code.maxBonus}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Usage</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {code.usageCount} / {code.usageLimit}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Wagering</span>
                    <Target className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{code.wagering}x</p>
                </div>
              </div>

              {/* Usage Progress */}
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

              {/* Code Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Code Requirements</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Min Requirement:</span>
                    <p className="font-medium text-blue-900">
                      GH₵ {code.minDeposit || code.minBet || code.minLoss}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700">Valid Days:</span>
                    <p className="font-medium text-blue-900">{code.validDays} days</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Created By:</span>
                    <p className="font-medium text-blue-900">{code.createdBy}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Created:</span>
                    <p className="font-medium text-blue-900">{code.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Bonus Code Modal */}
      {showAddCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Bonus Code</h3>
              <button title="Action button" aria-label="Action button" 
                onClick={() => setShowAddCode(false)}
           
            className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Name</label>
                  <input title="Input field" aria-label="Input field" 
                    type="text"
                    placeholder="Enter code name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Code</label>
                  <input title="Input field" aria-label="Input field" 
                    type="text"
                    placeholder="BONUS100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the bonus code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code Type</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    {codeTypes.map(type => (
                      <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Type</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
                  <input title="Input field" aria-label="Input field" 
                    type="number"
                    placeholder="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input title="Input field" aria-label="Input field" 
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                   />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input title="Input field" aria-label="Input field"   
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                   />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  title="Cancel creation"
                  aria-label="Cancel creation"
                  type="button"
                  onClick={() => setShowAddCode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  title="Submit new bonus code"
                  aria-label="Submit new bonus code"
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bonus Details Modal */}
      {isBonusModalOpen && selectedCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{selectedCode.name}</h3>
              <button
                title="Close bonus details"
                aria-label="Close bonus details"
                onClick={() => {
                  setSelectedCode(null);
                  closeBonusModal();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Bonus Overview</h4>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Code</dt>
                    <dd className="font-mono font-semibold text-gray-900">{selectedCode.code}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Status</dt>
                    <dd>{selectedCode.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Type</dt>
                    <dd>{selectedCode.type.replace('_', ' ')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Bonus</dt>
                    <dd>
                      {selectedCode.bonusType === 'percentage'
                        ? `${selectedCode.bonusAmount}%`
                        : `GH₵ ${selectedCode.bonusAmount}`}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Max Bonus</dt>
                    <dd>GH₵ {selectedCode.maxBonus}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Wagering</dt>
                    <dd>{selectedCode.wagering}x</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Performance</h4>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt>Usage</dt>
                    <dd>{selectedCode.usageCount} / {selectedCode.usageLimit}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Valid Days</dt>
                    <dd>{selectedCode.validDays}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Target Audience</dt>
                    <dd>{selectedCode.targetAudience}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Created By</dt>
                    <dd>{selectedCode.createdBy}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Created At</dt>
                    <dd>{selectedCode.createdAt}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => copyToClipboard(selectedCode.code)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </button>
              <button
                onClick={() => {
                  setSelectedCode(null);
                  closeBonusModal();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusCodes;
