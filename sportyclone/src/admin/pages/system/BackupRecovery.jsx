import { useState } from 'react';
import { 
  Download, 
  Upload,
  Play,
  Pause,
  Settings,
  Clock,
  Database,
  HardDrive,
  CheckCircle,
  XCircle,
  Archive,
  FileText,
  User
} from 'lucide-react';

const BackupRecovery = () => {
  const [selectedTab] = useState('backups');
  const [showCreateBackup, setShowCreateBackup] = useState(false);

  const backups = [
    {
      id: 1,
      name: 'Daily Database Backup',
      type: 'database',
      status: 'completed',
      size: '2.4 GB',
      location: 'AWS S3',
      createdAt: '2024-01-21 03:00:00',
      duration: '45 minutes',
      retention: '30 days',
      automated: true
    },
    {
      id: 2,
      name: 'Full System Backup',
      type: 'full_system',
      status: 'in_progress',
      size: '15.2 GB',
      location: 'Local Storage',
      createdAt: '2024-01-21 02:00:00',
      duration: '2 hours',
      retention: '90 days',
      automated: true
    },
    {
      id: 3,
      name: 'User Data Backup',
      type: 'user_data',
      status: 'completed',
      size: '5.8 GB',
      location: 'Google Cloud',
      createdAt: '2024-01-20 23:30:00',
      duration: '1.2 hours',
      retention: '60 days',
      automated: false
    }
  ];

  const schedules = [
    {
      id: 1,
      name: 'Daily Database Backup',
      frequency: 'Daily at 3:00 AM',
      type: 'database',
      status: 'active',
      nextRun: '2024-01-22 03:00:00',
      retention: '30 days',
      location: 'AWS S3'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      frequency: 'Weekly on Sunday at 2:00 AM',
      type: 'full_system',
      status: 'active',
      nextRun: '2024-01-28 02:00:00',
      retention: '90 days',
      location: 'Local Storage'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      paused: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Pause }
    };
    
    const config = statusConfig[status] || statusConfig.completed;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      database: Database,
      full_system: HardDrive,
      user_data: User,
      configuration: Settings
    };
    return typeIcons[type] || Archive;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery</h1>
          <p className="text-gray-600 mt-1">Manage system backups and data recovery operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Action button" aria-label="Action button" 
            onClick={() => setShowCreateBackup(true)}
          
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <Archive className="w-4 h-4 mr-2" />
            Create Backup
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center" title="Action button" aria-label="Action button">
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
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{backups.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">23.4 GB</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-2">98.5%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">2h ago</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'backups' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Backup History
          </button>
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'schedules' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Backup Schedules
          </button>
          <button title="Action button" aria-label="Action button"
            // onClick={() => /* TODO: Add function */}
            
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'recovery' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Recovery Options
          </button>
        </div>
      </div>

      {/* Backup History Tab */}
      {selectedTab === 'backups' && (
        <div className="space-y-4">
          {backups.map((backup) => {
            const IconComponent = getTypeIcon(backup.type);
            
            return (
              <div key={backup.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{backup.name}</h3>
                        {getStatusBadge(backup.status)}
                        {backup.automated && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            AUTOMATED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Size: {backup.size}</span>
                        <span>Duration: {backup.duration}</span>
                        <span>Location: {backup.location}</span>
                        <span>Retention: {backup.retention}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Download backup" aria-label="Download backup">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Restore from backup" aria-label="Restore from backup">
                      <Upload className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Settings" aria-label="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Created:</span>
                    <p className="font-medium text-gray-900">{backup.createdAt}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Type:</span>
                    <p className="font-medium text-gray-900">{backup.type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <p className="font-medium text-gray-900">{backup.status.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Backup Schedules Tab */}
      {selectedTab === 'schedules' && (
        <div className="space-y-4">
          {schedules.map((schedule) => {
            const IconComponent = getTypeIcon(schedule.type);
            
            return (
              <div key={schedule.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{schedule.name}</h3>
                        {getStatusBadge(schedule.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Frequency: {schedule.frequency}</span>
                        <span>Next run: {schedule.nextRun}</span>
                        <span>Location: {schedule.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Run now" aria-label="Run now">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" title="Pause schedule" aria-label="Pause schedule">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="Edit schedule" aria-label="Edit schedule">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recovery Options Tab */}
      {selectedTab === 'recovery' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recovery Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Database Recovery</h4>
              </div>
              <p className="text-gray-600 mb-4">Restore database from available backups</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" title="Action button" aria-label="Action button">
                Start Database Recovery
              </button>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Full System Recovery</h4>
              </div>
              <p className="text-gray-600 mb-4">Complete system restoration from backup</p>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" title="Action button" aria-label="Action button">
                Start System Recovery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Backup Modal */}
      {showCreateBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Create New Backup</h3>
              <button title="Action button" aria-label="Action button" 
                // onClick={() => /* TODO: Add function */}
            className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Name</label>
                <input title="Input field" aria-label="Input field" 
                  type="text"
                  placeholder="Enter backup name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" title="Select option" aria-label="Select option">
                  <option value="database">Database Only</option>
                  <option value="full_system">Full System</option>
                  <option value="user_data">User Data</option>
                  <option value="configuration">Configuration</option>
                </select>
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
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Create Backup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupRecovery;
