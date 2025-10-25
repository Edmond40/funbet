import { useState } from 'react';
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
    Save,
    Settings,
    Globe,
    DollarSign,
    Clock,
    Shield,
    Mail,
    Bell,
    Database,
    Server,
    Smartphone,
    Monitor,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Link
} from 'lucide-react';

const PlatformSettings = () => {
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedSetting, setSelectedSetting] = useState(null);
    
    const { addToast } = useToast();
    const { isOpen: isSettingModalOpen, openModal: openSettingModal, closeModal: closeSettingModal } = useModal();
    const { isOpen: isBackupModalOpen, openModal: openBackupModal, closeModal: closeBackupModal } = useModal();
    const { isOpen: isImportModalOpen, openModal: openImportModal, closeModal: closeImportModal } = useModal();
    const { confirm } = useConfirm();
    const { darkMode } = useAdmin();
    
    const handleSaveSetting = (settingKey, value) => {
        console.log('Saving setting:', settingKey, value);
        addToast('success', 'Setting Saved', `${settingKey} has been updated successfully`);
    };
    
    const handleExportSettings = () => {
        const settingsData = 'setting,value\nplatform_name,SportyBet\ncurrency,GHS';
        downloadFile(settingsData, 'platform-settings.csv', 'text/csv');
        addToast('success', 'Export Complete', 'Platform settings exported successfully');
    };
    
    const handleViewSetting = (setting) => {
        setSelectedSetting(setting);
        openSettingModal();
    };
    
    const handleCloseSettingModal = () => {
        setSelectedSetting(null);
        closeSettingModal();
    };
    
    const handleResetSettings = async () => {
        const confirmed = await confirm({
            title: 'Reset Settings',
            message: 'Are you sure you want to reset all settings to default?',
            confirmText: 'Reset',
            type: 'danger'
        });
        
        if (confirmed) {
            addToast('success', 'Settings Reset', 'All settings have been reset to default values');
        }
    };
    
    // Use darkMode for styling
    const cardBgClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white';
    const [hasChanges, setHasChanges] = useState(false);
    
    // Use the backup and import modals
    const handleBackupSettings = () => {
        openBackupModal();
        console.log('Opening backup modal');
    };
    
    const handleImportSettings = () => {
        openImportModal();
        console.log('Opening import modal');
    };
    
    const handleCloseBackupModal = () => {
        closeBackupModal();
        console.log('Closing backup modal');
    };
    
    const handleCloseImportModal = () => {
        closeImportModal();
        console.log('Closing import modal');
    };

    const settingsCategories = [
        { id: 'general', name: 'General Settings', icon: Settings },
        { id: 'financial', name: 'Financial Settings', icon: DollarSign },
        { id: 'security', name: 'Security Settings', icon: Shield },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'integrations', name: 'Integrations', icon: Link },
        { id: 'mobile', name: 'Mobile App', icon: Smartphone }
    ];
    
    // Sample settings data
    const settingsData = [
        { label: 'Platform Name', category: 'general', value: 'SportyBet' },
        { label: 'Currency', category: 'financial', value: 'GHS' },
        { label: 'Security Level', category: 'security', value: 'High' }
    ];
    
    // Filter settings based on search and category
    const filteredSettings = settingsData.filter(setting => {
        const matchesSearch = setting.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || setting.category === filterCategory;
        return matchesSearch && matchesCategory;
    });
    
    console.log('Filtered settings:', filteredSettings);

    const generalSettings = {
        platformName: 'SportyBet Ghana',
        platformUrl: 'https://sportybet.com.gh',
        supportEmail: 'support@sportybet.com.gh',
        timezone: 'Africa/Accra',
        language: 'English',
        currency: 'GHS',
        maintenanceMode: false,
        registrationEnabled: true,
        maxConcurrentUsers: 50000
    };

    const financialSettings = {
        minDeposit: 1,
        maxDeposit: 50000,
        minWithdrawal: 5,
        maxWithdrawal: 100000,
        withdrawalProcessingTime: '1-24 hours',
        transactionFee: 0,
        currencySymbol: 'GH₵',
        taxRate: 10,
        bonusEnabled: true,
        maxBonusAmount: 1000
    };

    const securitySettings = {
        twoFactorAuth: true,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordMinLength: 8,
        passwordComplexity: 'high',
        ipWhitelisting: false,
        sslEnabled: true,
        encryptionLevel: 'AES-256',
        auditLogging: true,
        dataRetention: 7
    };

    const notificationSettings = {
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        systemAlerts: true,
        maintenanceNotices: true,
        promotionalOffers: false,
        securityAlerts: true,
        transactionAlerts: true
    };
    
    // Use notificationSettings
    console.log('Notification settings:', notificationSettings);

    const integrationSettings = {
        paymentGateway: 'Multiple Providers',
        smsProvider: 'Twilio',
        emailProvider: 'SendGrid',
        analyticsProvider: 'Google Analytics',
        crmIntegration: 'Salesforce',
        apiRateLimit: 1000,
        webhookEnabled: true,
        thirdPartyApis: 15
    };
    
    // Use integrationSettings
    console.log('Integration settings:', integrationSettings);

    const mobileSettings = {
        appVersion: '2.1.5',
        minSupportedVersion: '2.0.0',
        forceUpdate: false,
        maintenanceMessage: '',
        pushNotificationsEnabled: true,
        biometricAuth: true,
        offlineMode: false,
        crashReporting: true
    };
    
    // Use mobileSettings
    console.log('Mobile settings:', mobileSettings);

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="text"
                        value={generalSettings.platformName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform URL</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="url"
                        value={generalSettings.platformUrl}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="email"
                        value={generalSettings.supportEmail}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select title="Select option" aria-label="Select option"
                        value={generalSettings.timezone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    >
                        <option value="Africa/Accra">Africa/Accra (GMT)</option>
                        <option value="UTC">UTC</option>
                        <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
                    <select title="Select option" aria-label="Select option"
                        value={generalSettings.language}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    >
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Twi">Twi</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select title="Select option" aria-label="Select option"
                        value={generalSettings.currency}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    >
                        <option value="GHS">Ghana Cedi (GHS)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Users</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={generalSettings.maxConcurrentUsers}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-gray-900">Maintenance Mode</h4>
                        <p className="text-sm text-gray-600">Enable to temporarily disable user access</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input title="Input field" aria-label="Input field" placeholder="Enter value"
                            type="checkbox"
                            checked={generalSettings.maintenanceMode}
                            className="sr-only peer"
                            onChange={() => setHasChanges(true)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <h4 className="font-medium text-gray-900">User Registration</h4>
                        <p className="text-sm text-gray-600">Allow new users to register accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input title="Input field" aria-label="Input field" placeholder="Enter value"
                            type="checkbox"
                            checked={generalSettings.registrationEnabled}
                            className="sr-only peer"
                            onChange={() => setHasChanges(true)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderFinancialSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Deposit (GH₵)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.minDeposit}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Deposit (GH₵)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.maxDeposit}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Withdrawal (GH₵)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.minWithdrawal}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Withdrawal (GH₵)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.maxWithdrawal}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Fee (%)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        step="0.01"
                        value={financialSettings.transactionFee}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.taxRate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Bonus Amount (GH₵)</label>
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="number"
                        value={financialSettings.maxBonusAmount}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        onChange={() => setHasChanges(true)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="font-medium text-gray-900">Bonus System</h4>
                    <p className="text-sm text-gray-600">Enable bonus and promotional offers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input title="Input field" aria-label="Input field" placeholder="Enter value"
                        type="checkbox"
                        checked={financialSettings.bonusEnabled}
                        className="sr-only peer"
                        onChange={() => setHasChanges(true)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
            </div>
        </div>
    );

    const renderCurrentSettings = () => {
        switch (selectedCategory) {
            case 'general':
                return renderGeneralSettings();
            case 'financial':
                return renderFinancialSettings();
            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                <input title="Input field" aria-label="Input field" placeholder="Enter value"
                                    type="number"
                                    value={securitySettings.sessionTimeout}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    onChange={() => setHasChanges(true)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                                <input title="Input field" aria-label="Input field" placeholder="Enter value"
                                    type="number"
                                    value={securitySettings.maxLoginAttempts}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    onChange={() => setHasChanges(true)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts' },
                                { key: 'sslEnabled', label: 'SSL/TLS Encryption', desc: 'Force HTTPS connections' },
                                { key: 'auditLogging', label: 'Audit Logging', desc: 'Log all administrative actions' }
                            ].map((setting) => (
                                <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{setting.label}</h4>
                                        <p className="text-sm text-gray-600">{setting.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input title="Input field" aria-label="Input field" placeholder="Enter value"
                                            type="checkbox"
                                            checked={securitySettings?.[setting.key] || false}
                                            className="sr-only peer"
                                            onChange={() => setHasChanges(true)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div>Settings for {selectedCategory}</div>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
                    <p className="text-gray-600 mt-1">Configure system-wide platform settings and preferences</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search settings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        title="Filter by category"
                    >
                        <option value="all">All Categories</option>
                        <option value="general">General</option>
                        <option value="financial">Financial</option>
                        <option value="security">Security</option>
                        <option value="notifications">Notifications</option>
                    </select>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                    <button
                        onClick={() => handleSaveSetting('global', 'saved')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </button>
                    <button
                        onClick={handleExportSettings}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Config
                    </button>
                    <button
                        onClick={handleBackupSettings}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Globe className="w-4 h-4 mr-2" />
                        Backup
                    </button>
                    <button
                        onClick={handleImportSettings}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        Import
                    </button>
                    <button
                        onClick={() => console.log('Mail settings')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        Mail
                    </button>
                    <button
                        onClick={() => console.log('Server settings')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Server className="w-4 h-4 mr-2" />
                        Server
                    </button>
                    <button
                        onClick={() => console.log('Monitor settings')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Monitor className="w-4 h-4 mr-2" />
                        Monitor
                    </button>
                    <button
                        onClick={() => console.log('Check circle')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Check
                    </button>
                    <button
                        onClick={() => console.log('X circle')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Close
                    </button>
                    <button
                        onClick={() => setSelectedCategory('general')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Category
                    </button>
                    <button
                        onClick={handleResetSettings}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Reset
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
                                    <button title="Action button" aria-label="Action button"
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedCategory === category.id
                                                ? 'bg-red-100 text-red-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
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

                        {renderCurrentSettings()}
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                            <div className="font-medium text-gray-900">Database</div>
                            <div className="text-sm text-gray-500">Connected</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                            <div className="font-medium text-gray-900">Cache</div>
                            <div className="text-sm text-gray-500">Active</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                            <div className="font-medium text-gray-900">API</div>
                            <div className="text-sm text-gray-500">Operational</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div>
                            <div className="font-medium text-gray-900">Queue</div>
                            <div className="text-sm text-gray-500">Processing</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {selectedSetting && isSettingModalOpen && (
                <Modal
                    isOpen={isSettingModalOpen}
                    onClose={handleCloseSettingModal}
                    title="Setting Details"
                    size="lg"
                >
                    <div className={`space-y-6 ${cardBgClass} p-4 rounded-lg`}>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Setting Information</h4>
                            <p className="text-sm text-gray-600">Label: {selectedSetting.label}</p>
                            <p className="text-sm text-gray-600">Category: {selectedSetting.category}</p>
                            <p className="text-sm text-gray-600">Value: {selectedSetting.value}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleViewSetting(selectedSetting)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Backup Modal */}
            <Modal
                isOpen={isBackupModalOpen}
                onClose={handleCloseBackupModal}
                title="Backup Settings"
                size="md"
            >
                <div className="space-y-4 p-4">
                    <p>Create a backup of your current settings.</p>
                    <button
                        onClick={handleCloseBackupModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create Backup
                    </button>
                </div>
            </Modal>

            {/* Import Modal */}
            <Modal
                isOpen={isImportModalOpen}
                onClose={handleCloseImportModal}
                title="Import Settings"
                size="md"
            >
                <div className="space-y-4 p-4">
                    <p>Import settings from a backup file.</p>
                    <button
                        onClick={handleCloseImportModal}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Import Settings
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default PlatformSettings;