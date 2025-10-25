import { useMemo, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';
import { useAdmin } from '../../hooks/useAdmin';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Gift,
  Calendar,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Settings, 
  DollarSign,
  Zap,
  Percent
} from 'lucide-react';

const CampaignManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  // Hooks
  const { addToast } = useToast();
  const { isOpen: isCampaignModalOpen, openModal: openCampaignModal, closeModal: closeCampaignModal } = useModal();
  const { confirm } = useConfirm();
  const { darkMode } = useAdmin();
  
  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    openCampaignModal();
  };
  
  const handleCloseCampaignModal = () => {
    setSelectedCampaign(null);
    closeCampaignModal();
  };
  
  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end });
    console.log('Date range changed:', { start, end });
  };
  
  // Use darkMode for styling
  const cardBgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white';

  const campaigns = useMemo(() => [
    {
      id: 1,
      name: 'Welcome Bonus 2024',
      type: 'welcome_bonus',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 500000,
      spent: 234567,
      participants: 15420,
      conversions: 8945,
      conversionRate: 58.0,
      bonusAmount: 100,
      bonusType: 'percentage',
      maxBonus: 500,
      minDeposit: 20,
      wagering: 5,
      description: 'Get 100% bonus up to GH₵ 500 on your first deposit',
      targetAudience: 'New Users',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Weekend Cashback',
      type: 'cashback',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 200000,
      spent: 89456,
      participants: 8950,
      conversions: 6234,
      conversionRate: 69.6,
      bonusAmount: 10,
      bonusType: 'percentage',
      maxBonus: 200,
      minLoss: 50,
      wagering: 1,
      description: '10% cashback on weekend losses up to GH₵ 200',
      targetAudience: 'Active Users',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Free Bet Friday',
      type: 'free_bet',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 150000,
      spent: 67890,
      participants: 12340,
      conversions: 4567,
      conversionRate: 37.0,
      bonusAmount: 25,
      bonusType: 'fixed',
      maxBonus: 25,
      minBet: 10,
      wagering: 1,
      description: 'Get a GH₵ 25 free bet every Friday',
      targetAudience: 'Weekly Active Users',
      priority: 'medium'
    },
    {
      id: 4,
      name: 'VIP Reload Bonus',
      type: 'reload_bonus',
      status: 'paused',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 300000,
      spent: 145678,
      participants: 2340,
      conversions: 1890,
      conversionRate: 80.8,
      bonusAmount: 50,
      bonusType: 'percentage',
      maxBonus: 1000,
      minDeposit: 100,
      wagering: 3,
      description: '50% reload bonus up to GH₵ 1000 for VIP members',
      targetAudience: 'VIP Users',
      priority: 'high'
    },
    {
      id: 5,
      name: 'Refer a Friend',
      type: 'referral',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 100000,
      spent: 34567,
      participants: 5670,
      conversions: 1234,
      conversionRate: 21.8,
      bonusAmount: 50,
      bonusType: 'fixed',
      maxBonus: 50,
      minDeposit: 20,
      wagering: 2,
      description: 'Get GH₵ 50 for each friend you refer',
      targetAudience: 'All Users',
      priority: 'low'
    }
  ], []);

  const campaignTypes = ['welcome_bonus', 'reload_bonus', 'cashback', 'free_bet', 'referral', 'tournament'];
  const statuses = ['active', 'paused', 'scheduled', 'expired', 'draft'];

  const handleCampaignAction = async (campaign, action) => {
    let confirmConfig;

    switch (action) {
      case 'pause':
        confirmConfig = {
          title: 'Pause Campaign',
          message: `Pause ${campaign.name}?`,
          confirmText: 'Pause',
          type: 'warning'
        };
        break;
      case 'activate':
        confirmConfig = {
          title: 'Activate Campaign',
          message: `Activate ${campaign.name}?`,
          confirmText: 'Activate',
          type: 'info'
        };
        break;
      case 'delete':
        confirmConfig = {
          title: 'Delete Campaign',
          message: `Delete ${campaign.name}? This action cannot be undone.`,
          confirmText: 'Delete',
          type: 'danger'
        };
        break;
      default:
        confirmConfig = null;
    }

    if (confirmConfig) {
      const confirmed = await confirm(confirmConfig);
      if (confirmed) {
        addToast('success', 'Action Confirmed', `${campaign.name} has been updated.`);
      }
      return;
    }

    addToast('info', 'Edit Campaign', `${campaign.name} editor coming soon.`);
  };

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
      reload_bonus: DollarSign,
      cashback: Percent,
      free_bet: Target,
      referral: Users,
      tournament: TrendingUp
    };
    return typeIcons[type] || Gift;
  };

  const stats = useMemo(() => ({
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalParticipants: campaigns.reduce((sum, c) => sum + c.participants, 0),
    avgConversionRate: campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length
  }), [campaigns]);

  const filteredCampaigns = useMemo(() => (
    campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
      const matchesType = filterType === 'all' || campaign.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
  ), [campaigns, searchTerm, filterStatus, filterType]);

  const handleExportCampaigns = () => {
    const csvRows = campaigns
      .map(({ name, type, status, budget, spent, startDate, endDate }) => `${name},${type},${status},${budget},${spent},${startDate},${endDate}`)
      .join('\n');
    downloadFile(`name,type,status,budget,spent,startDate,endDate\n${csvRows}`, 'campaigns.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Campaign data exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600 mt-1">Create and manage promotional campaigns and bonuses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddCampaign(true)}
            title="Create Campaign"
            aria-label="Create Campaign"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCampaigns}
              title="Export campaigns"
              aria-label="Export campaigns"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button
              onClick={() => addToast('info', 'Bulk Actions', 'Bulk campaign actions coming soon.')}
              title="Bulk actions"
              aria-label="Bulk actions"
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">GH₵ {stats.totalSpent.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalParticipants.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgConversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
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
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select title="Select option" 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {campaignTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>

            <select title="Select option" 
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

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => {
          const IconComponent = getTypeIcon(campaign.type);
          const budgetUsage = (campaign.spent / campaign.budget) * 100;
          
          return (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {campaign.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {campaign.startDate} - {campaign.endDate}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {campaign.targetAudience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    title="View details"
                    aria-label="View details"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit campaign" aria-label="Edit campaign">
                    <Edit className="w-4 h-4" onClick={() => handleCampaignAction(campaign, 'edit')} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Settings">
                    <Settings className="w-4 h-4" onClick={() => handleCampaignAction(campaign, campaign.status === 'active' ? 'pause' : 'activate')} />
                  </button>
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Participants</span>
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{campaign.participants.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Conversions</span>
                    <Target className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{campaign.conversions.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                    <Percent className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{campaign.conversionRate}%</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Budget Used</span>
                    <DollarSign className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-1">{budgetUsage.toFixed(1)}%</p>
                </div>
              </div>

              {/* Budget Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Budget Usage</span>
                  <span>GH₵ {campaign.spent.toLocaleString()} / GH₵ {campaign.budget.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      budgetUsage > 90 ? 'bg-red-500' : budgetUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Bonus Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Bonus Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Bonus Amount:</span>
                    <p className="font-medium text-blue-900">
                      {campaign.bonusType === 'percentage' ? `${campaign.bonusAmount}%` : `GH₵ ${campaign.bonusAmount}`}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700">Max Bonus:</span>
                    <p className="font-medium text-blue-900">GH₵ {campaign.maxBonus}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Min Requirement:</span>
                    <p className="font-medium text-blue-900">
                      GH₵ {campaign.minDeposit || campaign.minBet || campaign.minLoss}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700">Wagering:</span>
                    <p className="font-medium text-blue-900">{campaign.wagering}x</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Campaign Modal */}
      {showAddCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Campaign</h3>
              <button
                onClick={() => setShowAddCampaign(false)}
                title="Close modal"
                aria-label="Close modal"
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                  <input title="Input field" aria-label="Input field" 
                    type="text"
                    placeholder="Enter campaign name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select title="Select option" aria-label="Select option" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    {campaignTypes.map(type => (
                      <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the campaign"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input title="Input field" aria-label="Input field" placeholder="Enter value"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input title="Input field" placeholder="Enter value"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (GH₵)</label>
                  <input title="Input field" type="number"
                    placeholder="100000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
                  <input title="Input field" 
                    type="number"
                    placeholder="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Type</label>
                  <select title="Select option" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button" 
                  type="button"
                  onClick={() => setShowAddCampaign(false)}
           
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button" 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && isCampaignModalOpen && (
        <Modal
          isOpen={isCampaignModalOpen}
          onClose={handleCloseCampaignModal}
          title="Campaign Details"
          size="lg"
        >
          <div className={`space-y-6 ${cardBgClass} p-4 rounded-lg`}>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Campaign Information</h4>
              <p className="text-sm text-gray-600">Name: {selectedCampaign.name}</p>
              <p className="text-sm text-gray-600">Type: {selectedCampaign.type}</p>
              <p className="text-sm text-gray-600">Status: {selectedCampaign.status}</p>
              <p className="text-sm text-gray-600">Budget: GH₵ {selectedCampaign.budget.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Participants: {selectedCampaign.participants.toLocaleString()}</p>
            </div>
            <div>
              <button
                onClick={() => handleViewCampaign(selectedCampaign)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Full Details
              </button>
              <button
                onClick={() => handleDateRangeChange(dateRange.start, dateRange.end)}
                className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Update Date Range
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CampaignManagement;