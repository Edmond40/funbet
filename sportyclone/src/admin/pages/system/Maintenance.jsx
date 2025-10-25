import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import {
  Search,
  Filter,
  Download,
  Play,
  Pause,
  Settings,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Server,
  Database,
  Globe,
  Wrench,
  Bell,
  Activity
} from 'lucide-react';

const Maintenance = () => {
  const [selectedTab, setSelectedTab] = useState('current');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const { addToast } = useToast();
  
  const handleToggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    console.log('Maintenance mode toggled:', !maintenanceMode);
  };
  
  const handleScheduleMaintenance = () => {
    setShowScheduleModal(true);
    console.log('Opening schedule maintenance modal');
  };
  
  const handleSystemCheck = () => {
    console.log('Running system check');
  };
  
  const handleNotifyUsers = () => {
    console.log('Notifying users about maintenance');
  };
  
  const handleDatabaseMaintenance = () => {
    console.log('Starting database maintenance');
  };
  
  const handleServerMaintenance = () => {
    console.log('Starting server maintenance');
  };
  
  const handlePauseMaintenance = () => {
    console.log('Pausing maintenance');
  };
  
  const handleManageUsers = () => {
    console.log('Managing users during maintenance');
  };
  
  const handleGlobalView = () => {
    console.log('Viewing global maintenance status');
  };
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    console.log('Tab changed to:', tab);
  };

  const currentMaintenance = {
    isActive: false,
    startTime: null,
    endTime: null,
    reason: '',
    affectedServices: [],
    notifiedUsers: 0
  };

  const scheduledMaintenance = [
    {
      id: 1,
      title: 'Database Optimization',
      description: 'Scheduled database maintenance to improve performance and apply security updates',
      startTime: '2024-01-25 02:00:00',
      endTime: '2024-01-25 04:00:00',
      duration: '2 hours',
      status: 'scheduled',
      affectedServices: ['Database', 'User Authentication', 'Betting System'],
      impact: 'high',
      notifyUsers: true,
      createdBy: 'System Administrator'
    },
    {
      id: 2,
      title: 'API Server Update',
      description: 'Updating API servers to latest version with bug fixes and performance improvements',
      startTime: '2024-01-28 01:00:00',
      endTime: '2024-01-28 02:30:00',
      duration: '1.5 hours',
      status: 'scheduled',
      affectedServices: ['API Services', 'Mobile App', 'Third-party Integrations'],
      impact: 'medium',
      notifyUsers: true,
      createdBy: 'DevOps Team'
    },
    {
      id: 3,
      title: 'Security Patch Deployment',
      description: 'Critical security patches for web servers and application components',
      startTime: '2024-01-30 03:00:00',
      endTime: '2024-01-30 05:00:00',
      duration: '2 hours',
      status: 'approved',
      affectedServices: ['Web Application', 'Admin Panel', 'Payment Gateway'],
      impact: 'high',
      notifyUsers: true,
      createdBy: 'Security Team'
    }
  ];
  
  // Filter maintenance tasks
  const filteredTasks = scheduledMaintenance.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  console.log('Filtered maintenance tasks:', filteredTasks);

  const maintenanceHistory = [
    {
      id: 1,
      title: 'Payment Gateway Maintenance',
      startTime: '2024-01-20 02:00:00',
      endTime: '2024-01-20 03:30:00',
      duration: '1.5 hours',
      status: 'completed',
      impact: 'medium',
      affectedUsers: 1250,
      issues: 0,
      completedBy: 'Finance Team'
    },
    {
      id: 2,
      title: 'Server Infrastructure Upgrade',
      startTime: '2024-01-15 01:00:00',
      endTime: '2024-01-15 04:00:00',
      duration: '3 hours',
      status: 'completed',
      impact: 'high',
      affectedUsers: 15420,
      issues: 2,
      completedBy: 'Infrastructure Team'
    },
    {
      id: 3,
      title: 'Database Backup Maintenance',
      startTime: '2024-01-10 03:00:00',
      endTime: '2024-01-10 03:45:00',
      duration: '45 minutes',
      status: 'completed',
      impact: 'low',
      affectedUsers: 0,
      issues: 0,
      completedBy: 'Database Team'
    }
  ];

  const systemServices = [
    { name: 'Web Application', status: 'operational', uptime: '99.9%' },
    { name: 'Mobile API', status: 'operational', uptime: '99.8%' },
    { name: 'Database', status: 'operational', uptime: '99.9%' },
    { name: 'Payment Gateway', status: 'operational', uptime: '99.7%' },
    { name: 'Authentication', status: 'operational', uptime: '99.9%' },
    { name: 'Betting Engine', status: 'operational', uptime: '99.8%' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      operational: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle }
    };

    const config = statusConfig[status] || statusConfig.scheduled;
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getImpactBadge = (impact) => {
    const impactConfig = {
      low: { bg: 'bg-green-100', text: 'text-green-800' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      high: { bg: 'bg-red-100', text: 'text-red-800' }
    };

    const config = impactConfig[impact] || impactConfig.low;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {impact.toUpperCase()} IMPACT
      </span>
    );
  };

  // Use toggleMaintenanceMode for additional functionality
  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    console.log('Toggle maintenance mode called');
  };
  
  // Use toggleMaintenanceMode in a button
  const handleToggleMode = () => {
    toggleMaintenanceMode();
    addToast('info', 'Mode Toggled', 'Maintenance mode has been toggled');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Maintenance</h1>
          <p className="text-gray-600 mt-1">Manage system maintenance schedules and monitor service status</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search maintenance..."
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
            <option value="scheduled">Scheduled</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            onClick={handleSystemCheck}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Activity className="w-4 h-4 mr-2" />
            System Check
          </button>
          <button
            onClick={handleNotifyUsers}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notify Users
          </button>
          <button
            onClick={handleDatabaseMaintenance}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Database className="w-4 h-4 mr-2" />
            Database
          </button>
          <button
            onClick={handleServerMaintenance}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Server className="w-4 h-4 mr-2" />
            Server
          </button>
          <button
            onClick={handlePauseMaintenance}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </button>
          <button
            onClick={handleManageUsers}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Users
          </button>
          <button
            onClick={handleGlobalView}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Globe className="w-4 h-4 mr-2" />
            Global View
          </button>
          <button
            onClick={() => handleTabChange('scheduled')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Tabs
          </button>
          <button
            onClick={handleScheduleMaintenance}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </button>
          <button
            onClick={handleToggleMode}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Wrench className="w-4 h-4 mr-2" />
            Toggle Mode
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Emergency Maintenance Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Maintenance Mode</h3>
            <p className="text-gray-600 mt-1">Enable to immediately put the system into maintenance mode</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="checkbox"
                checked={maintenanceMode}
                onChange={handleToggleMaintenanceMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
            <span className={`text-sm font-medium ${maintenanceMode ? 'text-red-600' : 'text-gray-600'}`}>
              {maintenanceMode ? 'ACTIVE' : 'INACTIVE'}
            </span>
          </div>
        </div>

        {maintenanceMode && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-sm font-medium text-red-800">
                System is currently in maintenance mode. Users cannot access the platform.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* System Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systemServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-500">Uptime: {service.uptime}</div>
                </div>
              </div>
              {getStatusBadge(service.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'current'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Current Status
          </button>
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'scheduled'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Scheduled Maintenance
          </button>
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}

            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'history'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            Maintenance History
          </button>
        </div>
      </div>

      {/* Current Status Tab */}
      {selectedTab === 'current' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!currentMaintenance.isActive ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Systems Operational</h3>
              <p className="text-gray-600">No maintenance activities are currently in progress</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance in Progress</h3>
              <p className="text-gray-600">System maintenance is currently active</p>
            </div>
          )}
        </div>
      )}

      {/* Scheduled Maintenance Tab */}
      {selectedTab === 'scheduled' && (
        <div className="space-y-4">
          {scheduledMaintenance.map((maintenance) => (
            <div key={maintenance.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{maintenance.title}</h3>
                      {getStatusBadge(maintenance.status)}
                      {getImpactBadge(maintenance.impact)}
                    </div>
                    <p className="text-gray-600 mb-2">{maintenance.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Duration: {maintenance.duration}</span>
                      <span>Created by: {maintenance.createdBy}</span>
                      {maintenance.notifyUsers && (
                        <span className="flex items-center">
                          <Bell className="w-4 h-4 mr-1" />
                          Users notified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Edit maintenance" aria-label="Edit maintenance">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Start now" aria-label="Start now">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Cancel" aria-label="Cancel">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Start Time:</span>
                  <p className="font-medium text-gray-900">{maintenance.startTime}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">End Time:</span>
                  <p className="font-medium text-gray-900">{maintenance.endTime}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Affected Services</h4>
                <div className="flex flex-wrap gap-2">
                  {maintenance.affectedServices.map((service, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                      <Server className="w-3 h-3 mr-1" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Maintenance History Tab */}
      {selectedTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Maintenance History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceHistory.map((maintenance) => (
                  <tr key={maintenance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{maintenance.title}</div>
                        <div className="text-sm text-gray-500">{maintenance.startTime}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maintenance.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getImpactBadge(maintenance.impact)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maintenance.affectedUsers.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${maintenance.issues > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                        {maintenance.issues}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(maintenance.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {maintenance.completedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Schedule Maintenance</h3>
              <button title="Action button" aria-label="Action button"
                // onClick={() => /* TODO: Add function */}

                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Title</label>
                <input title="Input field" aria-label="Input field"
                  type="text"
                  placeholder="Enter maintenance title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the maintenance activity"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input title="Input field" aria-label="Input field" placeholder="Enter value"
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input title="Input field" aria-label="Input field" placeholder="Enter value"
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                  <option value="low">Low Impact</option>
                  <option value="medium">Medium Impact</option>
                  <option value="high">High Impact</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" title="Input field" aria-label="Input field" />
                  <span className="ml-2 text-sm text-gray-700">Notify users via email</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" title="Input field" aria-label="Input field" />
                  <span className="ml-2 text-sm text-gray-700">Show maintenance banner</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button title="Action button" aria-label="Action button"
                  type="button"
                  // onClick={() => /* TODO: Add function */}

                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button title="Action button" aria-label="Action button"
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Schedule Maintenance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
