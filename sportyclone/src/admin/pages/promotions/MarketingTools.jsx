import { useMemo, useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useConfirm } from '../../hooks/useConfirm';
import { downloadFile } from '../../utils';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Send,
  Mail,
  MessageSquare,
  Bell,
  Megaphone,
  Target,
  Users,
  Calendar,
  TrendingUp,
  BarChart3,
  Settings,
  Image,
  Link,
  Smartphone,
  Globe,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Share2
} from 'lucide-react';

const MarketingTools = () => {
  const [selectedTool, setSelectedTool] = useState('campaigns');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateNotification, setShowCreateNotification] = useState(false);

  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const marketingCampaigns = useMemo(() => [
    {
      id: 1,
      name: 'Welcome Series Email Campaign',
      type: 'email',
      status: 'active',
      audience: 'New Users',
      sent: 2340,
      opened: 1456,
      clicked: 234,
      converted: 89,
      openRate: 62.2,
      clickRate: 16.1,
      conversionRate: 3.8,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 5000,
      spent: 2340
    },
    {
      id: 2,
      name: 'Weekend Betting Push Notification',
      type: 'push',
      status: 'active',
      audience: 'Active Users',
      sent: 15678,
      opened: 8945,
      clicked: 1234,
      converted: 456,
      openRate: 57.1,
      clickRate: 13.8,
      conversionRate: 2.9,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      budget: 3000,
      spent: 890
    },
    {
      id: 3,
      name: 'VIP Exclusive SMS Campaign',
      type: 'sms',
      status: 'completed',
      audience: 'VIP Users',
      sent: 567,
      opened: 534,
      clicked: 123,
      converted: 67,
      openRate: 94.2,
      clickRate: 23.0,
      conversionRate: 11.8,
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      budget: 2000,
      spent: 1890
    }
  ], []);

  const handleExportCampaigns = () => {
    const csvRows = marketingCampaigns
      .map(({ name, type, status, audience, sent, openRate, clickRate }) => `${name},${type},${status},${audience},${sent},${openRate},${clickRate}`)
      .join('\n');
    downloadFile(`name,type,status,audience,sent,openRate,clickRate\n${csvRows}`, 'marketing-campaigns.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Campaigns exported successfully');
  };

  const handleExportNotifications = () => {
    const csvRows = notifications
      .map(({ title, type, audience, scheduled, status, recipients }) => `${title},${type},${audience},${scheduled},${status},${recipients}`)
      .join('\n');
    downloadFile(`title,type,audience,scheduled,status,recipients\n${csvRows}`, 'notifications.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Notifications exported successfully');
  };

  const handleManageTool = (toolName) => {
    addToast('info', 'Manage Tool', `${toolName} management coming soon.`);
  };

  const handleSendNotificationNow = async (notification) => {
    const confirmed = await confirm({
      title: 'Send Notification',
      message: `Send "${notification.title}" to ${notification.recipients.toLocaleString()} recipients?`,
      confirmText: 'Send Now',
      type: 'info'
    });

    if (confirmed) {
      addToast('success', 'Notification Sent', `${notification.title} will be delivered shortly.`);
    }
  };

  const handleScheduleNotification = () => {
    addToast('success', 'Notification Scheduled', 'Notification scheduled successfully.');
    setShowCreateNotification(false);
  };

  const handleCreateCampaignSubmit = () => {
    addToast('success', 'Campaign Created', 'Campaign draft saved successfully.');
    setShowCreateCampaign(false);
  };

  const notifications = useMemo(() => [
    {
      id: 1,
      title: 'New Match Available',
      message: 'Manchester United vs Arsenal is now available for betting!',
      type: 'match_alert',
      audience: 'Football Fans',
      scheduled: '2024-01-21 18:00:00',
      status: 'scheduled',
      recipients: 45678
    },
    {
      id: 2,
      title: 'Bonus Expiring Soon',
      message: 'Your welcome bonus expires in 24 hours. Use it now!',
      type: 'bonus_reminder',
      audience: 'Users with Active Bonuses',
      scheduled: '2024-01-21 12:00:00',
      status: 'sent',
      recipients: 1234
    },
    {
      id: 3,
      title: 'Weekend Cashback Available',
      message: 'Get 10% cashback on all weekend bets. Limited time offer!',
      type: 'promotion',
      audience: 'All Users',
      scheduled: '2024-01-20 09:00:00',
      status: 'sent',
      recipients: 89456
    }
  ], []);

  const marketingTools = useMemo(() => [
    {
      id: 'email',
      name: 'Email Marketing',
      description: 'Create and send targeted email campaigns',
      icon: Mail,
      color: 'blue',
      campaigns: 15,
      avgOpenRate: 58.3
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Send instant push notifications to mobile users',
      icon: Bell,
      color: 'green',
      campaigns: 8,
      avgOpenRate: 72.1
    },
    {
      id: 'sms',
      name: 'SMS Marketing',
      description: 'Reach users directly via SMS messages',
      icon: MessageSquare,
      color: 'purple',
      campaigns: 5,
      avgOpenRate: 94.5
    },
    {
      id: 'social',
      name: 'Social Media',
      description: 'Manage social media campaigns and posts',
      icon: Share2,
      color: 'pink',
      campaigns: 12,
      avgOpenRate: 45.2
    },
    {
      id: 'banner',
      name: 'Banner Ads',
      description: 'Create and manage promotional banners',
      icon: Image,
      color: 'orange',
      campaigns: 6,
      avgOpenRate: 23.8
    },
    {
      id: 'affiliate',
      name: 'Affiliate Marketing',
      description: 'Manage affiliate partnerships and tracking',
      icon: Link,
      color: 'indigo',
      campaigns: 3,
      avgOpenRate: 67.9
    }
  ], []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      completed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle },
      paused: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      sent: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
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
      email: Mail,
      push: Bell,
      sms: MessageSquare,
      social: Share2,
      banner: Image,
      match_alert: Target,
      bonus_reminder: Clock,
      promotion: Megaphone
    };
    return typeIcons[type] || Bell;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing Tools</h1>
          <p className="text-gray-600 mt-1">Create and manage marketing campaigns and communications</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={handleExportCampaigns}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Campaigns
          </button>
          <button
            onClick={handleExportNotifications}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Notifications
          </button>
          <button
            onClick={() => handleManageTool('Analytics')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </button>
          <button
            onClick={() => handleScheduleNotification()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </button>
          <button
            onClick={() => handleManageTool('Trending Analytics')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </button>
          <button
            onClick={() => handleSendNotificationNow(notifications[0])}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Send SMS
          </button>
          <button
            onClick={handleCreateCampaignSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
          <button
            onClick={() => setShowCreateNotification(true)}
            title="Create Notification"
            aria-label="Create Notification"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            Send Notification
          </button>
        </div>
      </div>

      {/* Marketing Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketingTools.map((tool) => {
          const IconComponent = tool.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            purple: 'bg-purple-500',
            pink: 'bg-pink-500',
            orange: 'bg-orange-500',
            indigo: 'bg-indigo-500'
          };
          
          return (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorClasses[tool.color] || 'bg-gray-500'} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Configure tool settings" aria-label="Configure tool settings">
                  <Settings className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{tool.campaigns}</div>
                  <div className="text-sm text-gray-500">Active Campaigns</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{tool.avgOpenRate}%</div>
                  <div className="text-sm text-gray-500">Avg Open Rate</div>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" title={`Manage ${tool.name}`} aria-label={`Manage ${tool.name}`}>
                Manage {tool.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* Tool Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="View Marketing Campaigns"
            onClick={() => setSelectedTool('campaigns')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'campaigns' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Marketing Campaigns
          </button>
          <button title="View Notifications"
            onClick={() => setSelectedTool('notifications')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'notifications' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Notifications
          </button>
          <button title="View Analytics"
            onClick={() => setSelectedTool('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'analytics' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Marketing Campaigns */}
      {selectedTool === 'campaigns' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Marketing Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketingCampaigns.map((campaign) => {
                  const IconComponent = getTypeIcon(campaign.type);
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {campaign.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.audience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>Sent: {campaign.sent.toLocaleString()}</div>
                          <div>Open Rate: {campaign.openRate}%</div>
                          <div>Click Rate: {campaign.clickRate}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>Budget: GH₵ {campaign.budget.toLocaleString()}</div>
                          <div>Spent: GH₵ {campaign.spent.toLocaleString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3" title="View details" aria-label="View details">
                          <Eye className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 mr-3" title="Edit campaign" aria-label="Edit campaign">
                          <Edit className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Analytics" aria-label="Analytics">
                          <BarChart3 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications */}
      {selectedTool === 'notifications' && (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = getTypeIcon(notification.type);
            return (
              <div key={notification.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{notification.title}</h4>
                        {getStatusBadge(notification.status)}
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {notification.type.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Audience: </span>
                          <span className="font-medium text-gray-900">{notification.audience}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Recipients: </span>
                          <span className="font-medium text-gray-900">{notification.recipients.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Scheduled: </span>
                          <span className="font-medium text-gray-900">{notification.scheduled}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="View details" aria-label="View details">
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit notification" aria-label="Edit notification">
                      <Edit className="w-4 h-4" aria-hidden="true" />
                    </button>
                    {notification.status === 'scheduled' && (
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Send now" aria-label="Send now">
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Analytics */}
      {selectedTool === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Performance</h3>
            <div className="space-y-4">
              {marketingCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.type.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{campaign.conversionRate}%</div>
                    <div className="text-sm text-gray-500">Conversion Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Channel Performance</h3>
            <div className="space-y-4">
              {marketingTools.slice(0, 4).map((tool, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{tool.name}</span>
                      <span className="text-sm text-gray-500">{tool.avgOpenRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tool.avgOpenRate || 0}%` }.CSSProperties}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create Marketing Campaign</h3>
              <button 
                onClick={() => setShowCreateCampaign(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Close campaign creation"
                aria-label="Close campaign creation"
              >
                <XCircle className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            
            <form className="space-y-4">
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
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="email">Email</option>
                    <option value="push">Push Notification</option>
                    <option value="sms">SMS</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                  <option value="all">All Users</option>
                  <option value="new">New Users</option>
                  <option value="active">Active Users</option>
                  <option value="vip">VIP Users</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Cancel campaign creation" aria-label="Cancel campaign creation" 
                  type="button"
                  onClick={() => setShowCreateCampaign(false)}
            
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Create new marketing campaign" aria-label="Create new marketing campaign"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Notification Modal */}
      {showCreateNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Send Notification</h3>
              <button 
                onClick={() => setShowCreateNotification(false)}
                className="text-gray-400 hover:text-gray-600"
                title="Close notification creation"
                aria-label="Close notification creation"
              >
                <XCircle className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input title="Input field" aria-label="Input field" 
                  type="text"
                  placeholder="Enter notification title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea title="Input field" aria-label="Input field" 
                  rows={3}
                  placeholder="Enter notification message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="promotion">Promotion</option>
                    <option value="match_alert">Match Alert</option>
                    <option value="bonus_reminder">Bonus Reminder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="football_fans">Football Fans</option>
                    <option value="bonus_users">Users with Bonuses</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowCreateNotification(false)}
            
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Schedule notification for later" aria-label="Schedule notification for later">
                  Schedule for Later
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Send notification immediately" aria-label="Send notification immediately">
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTools;
