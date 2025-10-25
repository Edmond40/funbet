import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { useConfirm } from '../../hooks/useConfirm';
import { downloadFile } from '../../utils';
import {
  Download,
  Save,
  Settings,
  BarChart3,
  DollarSign,
  Clock,
  Zap,
  Trophy,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

const GameSettings = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  
  const { addToast } = useToast();
  const { confirm } = useConfirm();
  
  const handleSaveSettings = async () => {
    const confirmed = await confirm({ title: 'Save Settings', message: 'Save game settings changes?', confirmText: 'Save', type: 'info' });
    if (confirmed) {
      addToast('success', 'Settings Saved', 'Game settings updated successfully');
      setHasChanges(false);
    }
  };
  const handleExportSettings = () => {
    downloadFile('setting,value,category\nmax_bet,1000,limits', 'game-settings.csv', 'text/csv');
    addToast('success', 'Export Complete', 'Settings exported successfully');
  };

  const settingsCategories = [
    { id: 'general', name: 'General Settings', icon: Settings },
    { id: 'rtp', name: 'RTP Configuration', icon: BarChart3 },
    { id: 'limits', name: 'Betting Limits', icon: DollarSign},
    { id: 'frequency', name: 'Game Frequency', icon: Clock},
    { id: 'features', name: 'Game Features', icon: Zap }
  ];

  const gameTypes = [
    {
      id: 'virtual_football',
      name: 'Virtual Football',
      status: 'active',
      settings: {
        enabled: true,
        rtp: 94.5,
        minBet: 1,
        maxBet: 5000,
        frequency: 180, // seconds
        maxOdds: 1000,
        features: {
          liveStreaming: true,
          statistics: true,
          multipleMarkets: true,
          cashOut: true
        }
      }
    },
    {
      id: 'virtual_horse_racing',
      name: 'Virtual Horse Racing',
      status: 'active',
      settings: {
        enabled: true,
        rtp: 92.8,
        minBet: 1,
        maxBet: 2000,
        frequency: 120,
        maxOdds: 500,
        features: {
          liveStreaming: true,
          statistics: true,
          multipleMarkets: false,
          cashOut: true
        }
      }
    },
    {
      id: 'virtual_basketball',
      name: 'Virtual Basketball',
      status: 'maintenance',
      settings: {
        enabled: false,
        rtp: 93.2,
        minBet: 1,
        maxBet: 3000,
        frequency: 300,
        maxOdds: 750,
        features: {
          liveStreaming: false,
          statistics: true,
          multipleMarkets: true,
          cashOut: false
        }
      }
    },
    {
      id: 'virtual_tennis',
      name: 'Virtual Tennis',
      status: 'active',
      settings: {
        enabled: true,
        rtp: 95.1,
        minBet: 1,
        maxBet: 1500,
        frequency: 240,
        maxOdds: 400,
        features: {
          liveStreaming: true,
          statistics: true,
          multipleMarkets: true,
          cashOut: false
        }
      }
    }
  ];

  const globalSettings = {
    maintenanceMode: false,
    autoStart: true,
    maxConcurrentGames: 50,
    defaultLanguage: 'English',
    timezone: 'Africa/Accra',
    currency: 'GHS',
    taxRate: 10,
    maxWinLimit: 100000,
    sessionTimeout: 30
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      maintenance: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
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

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Games</label>
          <input title="Input field" aria-label="Input field" placeholder="Enter value"
            type="number"
            value={globalSettings.maxConcurrentGames}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input title="Input field" aria-label="Input field" placeholder="Enter value"
            type="number"
            value={globalSettings.sessionTimeout}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select title="Select option" aria-label="Select option"
            value={globalSettings.defaultLanguage}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Twi">Twi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select title="Select option" aria-label="Select option"
            value={globalSettings.timezone}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          >
            <option value="Africa/Accra">Africa/Accra (GMT)</option>
            <option value="UTC">UTC</option>
            <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input title="Input field" aria-label="Input field" placeholder="Enter value"
            type="number"
            value={globalSettings.taxRate}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={() => setHasChanges(true)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
            <p className="text-sm text-gray-600">Temporarily disable all virtual games</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input title="Input field" aria-label="Input field" placeholder="Enter value"
              type="checkbox"
              checked={globalSettings.maintenanceMode}
              className="sr-only peer"
              onChange={() => setHasChanges(true)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Auto Start Games</h4>
            <p className="text-sm text-gray-600">Automatically start games at scheduled intervals</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input title="Input field" aria-label="Input field" placeholder="Enter value"
              type="checkbox"
              checked={globalSettings.autoStart}
              className="sr-only peer"
              onChange={() => setHasChanges(true)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderGameTypeSettings = () => (
    <div className="space-y-6">
      {gameTypes.map((gameType) => (
        <div key={gameType.id} className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{gameType.name}</h3>
                {getStatusBadge(gameType.status)}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input title="Input field" aria-label="Input field" placeholder="Enter value"
                  type="checkbox"
                  checked={gameType.settings.enabled}
                  className="sr-only peer"
                  onChange={() => setHasChanges(true)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RTP (%)</label>
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="number"
                step="0.1"
                value={gameType.settings.rtp}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Bet (GH₵)</label>
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="number"
                value={gameType.settings.minBet}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Bet (GH₵)</label>
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="number"
                value={gameType.settings.maxBet}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onChange={() => setHasChanges(true)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency (seconds)</label>
              <input title="Input field" aria-label="Input field" placeholder="Enter value"
                type="number"
                value={gameType.settings.frequency}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onChange={() => setHasChanges(true)}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Game Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(gameType.settings.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                      type="checkbox"
                      checked={enabled}
                      className="sr-only peer"
                      onChange={() => setHasChanges(true)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Game Settings</h1>
          <p className="text-gray-600 mt-1">Configure virtual sports and casino game settings</p>
        </div>
        <div className="flex items-center space-x-3">
          {hasChanges && (
            <button 
              onClick={handleSaveSettings}
              title="Save changes"
              aria-label="Save changes"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          )}
          <button 
            onClick={handleExportSettings}
            title="Export configuration"
            aria-label="Export configuration"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </button>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Categories</h3>
            <nav className="space-y-2">
              {settingsCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    title={`Select ${category.name}`}
                    aria-label={`Select ${category.name}`}
                    className={selectedCategory === category.id 
                      ? 'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 bg-red-50 text-red-600 border-red-200'
                      : 'w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 text-gray-600 hover:bg-gray-50'
                    }
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {settingsCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              {hasChanges && (
                <div className="flex items-center text-orange-600">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Unsaved changes</span>
                </div>
              )}
            </div>

            {selectedCategory === 'general' ? renderGeneralSettings() : renderGameTypeSettings()}
          </div>
        </div>
      </div>

      {/* Game Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Game Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {gameTypes.map((game) => (
            <div key={game.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${game.status === 'active' ? 'bg-green-100' :
                  game.status === 'maintenance' ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                <Trophy className={`w-6 h-6 ${game.status === 'active' ? 'text-green-600' :
                    game.status === 'maintenance' ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{game.name}</h4>
              <p className="text-sm text-gray-500 mb-2">RTP: {game.settings.rtp}%</p>
              {getStatusBadge(game.status)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
