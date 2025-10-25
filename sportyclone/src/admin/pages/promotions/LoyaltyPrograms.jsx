import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { Modal } from '../../components/ui';
import { downloadFile } from '../../utils';

// Define LoyaltyProgram interface

import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  Award,
  Star,
  Crown,
  Gift,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  DollarSign,
  Trophy,
  Medal,
  AlertTriangle
} from 'lucide-react';

const LoyaltyPrograms = () => {
  const [selectedTab, setSelectedTab] = useState('programs');
  const [showCreateProgram, setShowCreateProgram] = useState(false);
  const [showCreateTier, setShowCreateTier] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Use showCreateTier
  const handleShowCreateTier = () => {
    setShowCreateTier(true);
    console.log('Showing create tier modal');
  };
  
  // Hooks
  const { addToast } = useToast();
  const { isOpen: isProgramModalOpen, openModal: openProgramModal, closeModal: closeProgramModal } = useModal();
  const { confirm } = useConfirm();
  
  const handleViewProgram = (program) => {
    setSelectedProgram(program);
    openProgramModal();
  };
  
  // Remove duplicate handleCreateTier
  
  const handleCloseProgramModal = () => {
    setSelectedProgram(null);
    closeProgramModal();
  };
  
  const handleExportPrograms = () => {
    const csvContent = loyaltyPrograms
      .map(program => [
        program.name,
        program.type,
        program.status,
        program.members,
        program.totalRewards
      ].join(','))
      .join('\n');
    
    downloadFile(`name,type,status,members,rewards\n${csvContent}`, 'loyalty-programs.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Loyalty programs exported successfully');
  };
  
  const handleCreateTier = () => {
    setShowCreateTier(true);
    addToast('info', 'Create Tier', 'Opening tier creation form');
  };
  
  const handleDeleteProgram = async (programId) => {
    const confirmed = await confirm({
      title: 'Delete Program',
      message: 'Are you sure you want to delete this loyalty program?',
      confirmText: 'Delete',
      type: 'danger'
    });
    
    if (confirmed) {
      console.log('Deleting program with ID:', programId);
      addToast('success', 'Program Deleted', 'Loyalty program deleted successfully');
    }
  };

  const loyaltyPrograms = [
    {
      id: 1,
      name: 'VIP Rewards Program',
      type: 'tiered',
      status: 'active',
      members: 15420,
      tiers: 5,
      totalRewards: 234567,
      avgEngagement: 78.5,
      startDate: '2024-01-01',
      description: 'Multi-tier VIP program with exclusive benefits and rewards',
      benefits: ['Cashback', 'Free Bets', 'Exclusive Events', 'Personal Manager'],
      conversionRate: 12.3
    },
    {
      id: 2,
      name: 'Daily Streak Rewards',
      type: 'streak',
      status: 'active',
      members: 45678,
      streakDays: 30,
      totalRewards: 89456,
      avgEngagement: 65.2,
      startDate: '2024-01-15',
      description: 'Reward users for consecutive daily logins and activity',
      benefits: ['Daily Bonuses', 'Streak Multipliers', 'Milestone Rewards'],
      conversionRate: 8.7
    },
    {
      id: 3,
      name: 'Points Collection System',
      type: 'points',
      status: 'active',
      members: 89456,
      pointsIssued: 2345678,
      totalRewards: 156789,
      avgEngagement: 72.1,
      startDate: '2023-12-01',
      description: 'Earn points for every bet and redeem for rewards',
      benefits: ['Points per Bet', 'Redemption Store', 'Bonus Multipliers'],
      conversionRate: 15.6
    }
  ];

  const loyaltyTiers = [
    {
      id: 1,
      name: 'Bronze',
      level: 1,
      minPoints: 0,
      maxPoints: 999,
      members: 45678,
      color: '#CD7F32',
      benefits: ['5% Cashback', 'Weekly Free Bet GH₵ 10'],
      requirements: 'Minimum GH₵ 100 deposits'
    },
    {
      id: 2,
      name: 'Silver',
      level: 2,
      minPoints: 1000,
      maxPoints: 4999,
      members: 23456,
      color: '#C0C0C0',
      benefits: ['7% Cashback', 'Weekly Free Bet GH₵ 25', 'Birthday Bonus'],
      requirements: 'Minimum GH₵ 500 deposits'
    },
    {
      id: 3,
      name: 'Gold',
      level: 3,
      minPoints: 5000,
      maxPoints: 14999,
      members: 12345,
      color: '#FFD700',
      benefits: ['10% Cashback', 'Weekly Free Bet GH₵ 50', 'Priority Support'],
      requirements: 'Minimum GH₵ 2000 deposits'
    },
    {
      id: 4,
      name: 'Platinum',
      level: 4,
      minPoints: 15000,
      maxPoints: 49999,
      members: 5678,
      color: '#E5E4E2',
      benefits: ['15% Cashback', 'Weekly Free Bet GH₵ 100', 'Personal Manager'],
      requirements: 'Minimum GH₵ 10000 deposits'
    },
    {
      id: 5,
      name: 'Diamond',
      level: 5,
      minPoints: 50000,
      maxPoints: 999999,
      members: 1234,
      color: '#B9F2FF',
      benefits: ['20% Cashback', 'Weekly Free Bet GH₵ 250', 'Exclusive Events'],
      requirements: 'Minimum GH₵ 50000 deposits'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Kwame Asante',
      action: 'Tier Upgrade',
      details: 'Upgraded from Silver to Gold tier',
      points: 5000,
      reward: 'GH₵ 100 Bonus',
      timestamp: '2024-01-21 16:45:12'
    },
    {
      id: 2,
      user: 'Ama Osei',
      action: 'Points Redemption',
      details: 'Redeemed 2000 points for free bet',
      points: -2000,
      reward: 'GH₵ 50 Free Bet',
      timestamp: '2024-01-21 15:30:25'
    },
    {
      id: 3,
      user: 'Kofi Mensah',
      action: 'Streak Milestone',
      details: 'Completed 7-day login streak',
      points: 500,
      reward: 'GH₵ 25 Bonus',
      timestamp: '2024-01-21 14:20:18'
    }
  ];
  
  // Filter programs based on search and status
  const filteredPrograms = loyaltyPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  console.log('Filtered programs:', filteredPrograms);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle }
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
      tiered: Trophy,
      streak: Zap,
      points: Star,
      cashback: DollarSign
    };
    return typeIcons[type] || Award;
  };

  const getTierIcon = (level) => {
    const tierIcons = [Medal, Award, Trophy, Crown, Star];
    return tierIcons[level - 1] || Medal;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loyalty Programs</h1>
          <p className="text-gray-600 mt-1">Manage customer loyalty and rewards programs</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            title="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={handleShowCreateTier}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Tier
          </button>
          <button
            onClick={handleExportPrograms}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleCreateTier}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Tier
          </button>
          <button
            onClick={() => setShowCreateProgram(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Program
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
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
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {loyaltyPrograms.reduce((sum, p) => sum + p.members, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {loyaltyPrograms.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rewards</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                GH₵ {loyaltyPrograms.reduce((sum, p) => sum + p.totalRewards, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(loyaltyPrograms.reduce((sum, p) => sum + p.avgEngagement, 0) / loyaltyPrograms.length).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSelectedTab('programs')}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'programs'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Loyalty Programs
          </button>
          <button
            onClick={() => setSelectedTab('tiers')}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'tiers'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Tier Management
          </button>
          <button
            onClick={() => setSelectedTab('activities')}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'activities'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Recent Activities
          </button>
        </div>
      </div>

      {/* Loyalty Programs Tab */}
      {selectedTab === 'programs' && (
        <div className="space-y-4">
          {loyaltyPrograms.map((program) => {
            const IconComponent = getTypeIcon(program.type);
            return (
              <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                        {getStatusBadge(program.status)}
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {program.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Started: {program.startDate}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {program.members.toLocaleString()} members
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details" aria-label="View details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit program" aria-label="Edit program">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Program Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Members</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{program.members.toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Total Rewards</span>
                      <Gift className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">GH₵ {program.totalRewards.toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Engagement</span>
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{program.avgEngagement}%</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Conversion</span>
                      <Target className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 mt-1">{program.conversionRate}%</p>
                  </div>
                </div>

                {/* Program Benefits */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Program Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.benefits.map((benefit, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tier Management Tab */}
      {selectedTab === 'tiers' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">VIP Tier Structure</h3>
            <button title="Action button" aria-label="Action button"
              onClick={() => setSelectedTab('addTier')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tier
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {loyaltyTiers.map((tier) => {
              const IconComponent = getTierIcon(tier.level);
              return (
                <div key={tier.id} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: tier.color + '20' }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: tier.color }}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{tier.name}</h4>
                        <p className="text-sm text-gray-500">Level {tier.level}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit tier" aria-label="Edit tier">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Points Range:</span>
                      <span className="font-medium text-gray-900">
                        {tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium text-gray-900">{tier.members.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Requirements:</span>
                      <p className="font-medium text-gray-900 mt-1">{tier.requirements}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits</h5>
                    <div className="space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activities Tab */}
      {selectedTab === 'activities' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Loyalty Activities</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900">{activity.user}</h4>
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {activity.action}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Points: {activity.points > 0 ? '+' : ''}{activity.points}</span>
                        <span>Reward: {activity.reward}</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Program Modal */}
      {showCreateProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create Loyalty Program</h3>
              <button title="Action button" aria-label="Action button"
                onClick={() => setShowCreateProgram(false)}

                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                  <input title="Input field" aria-label="Input field"
                    type="text"
                    placeholder="Enter program name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="tiered">Tiered Program</option>
                    <option value="points">Points System</option>
                    <option value="streak">Streak Rewards</option>
                    <option value="cashback">Cashback Program</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the loyalty program"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button"
                  type="button"
                  onClick={() => setShowCreateProgram(false)}

                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button"
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program Details Modal */}
      {selectedProgram && isProgramModalOpen && (
        <Modal
          isOpen={isProgramModalOpen}
          onClose={handleCloseProgramModal}
          title="Program Details"
          size="lg"
        >
          <div className="space-y-6 p-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Program Information</h4>
              <p className="text-sm text-gray-600">Name: {selectedProgram.name}</p>
              <p className="text-sm text-gray-600">Type: {selectedProgram.type}</p>
              <p className="text-sm text-gray-600">Status: {selectedProgram.status}</p>
              <p className="text-sm text-gray-600">Members: {selectedProgram.members?.toLocaleString()}</p>
            </div>
            <div>
              <button
                onClick={() => handleViewProgram(selectedProgram)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                View Details
              </button>
              <button
                onClick={() => handleDeleteProgram(parseInt(selectedProgram.id))}
                className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Program
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Tier Modal */}
      {showCreateTier && (
        <Modal
          isOpen={showCreateTier}
          onClose={() => setShowCreateTier(false)}
          title="Create New Tier"
          size="md"
        >
          <div className="space-y-4 p-4">
            <p>Create a new loyalty tier.</p>
            <button
              onClick={() => setShowCreateTier(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create Tier
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoyaltyPrograms;
