import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Key, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Bell } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Security = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: newPassword.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(newPassword) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(newPassword) },
    { text: 'Contains number', met: /\d/.test(newPassword) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
  ];

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordRequirements.some(req => !req.met)) {
      alert('Please meet all password requirements');
      return;
    }
    // Here you would typically make an API call to change the password
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 lg:bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white mr-3"
            title="Back to dashboard"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-lg font-semibold">Safety & Security</h1>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 lg:p-6">
          <div className="space-y-6">
            {/* Account Security Overview */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center mb-4">
                <Shield className={`w-6 h-6 mr-3 ${window.innerWidth < 1024 ? 'text-green-400' : 'text-green-500'}`} />
                <h2 className="text-xl font-semibold">Account Security</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-green-800">Password Protected</div>
                    <div className="text-sm text-green-600">Strong password set</div>
                  </div>
                </div>

                <div className={`flex items-center p-3 rounded-lg ${
                  twoFactorEnabled ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {twoFactorEnabled ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  )}
                  <div>
                    <div className={`font-medium ${twoFactorEnabled ? 'text-green-800' : 'text-yellow-800'}`}>
                      {twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}
                    </div>
                    <div className={`text-sm ${twoFactorEnabled ? 'text-green-600' : 'text-yellow-600'}`}>
                      {twoFactorEnabled ? 'Account protected' : 'Enable for better security'}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center p-3 rounded-lg ${
                  loginAlerts ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {loginAlerts ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-600 mr-3" />
                  )}
                  <div>
                    <div className={`font-medium ${loginAlerts ? 'text-green-800' : 'text-gray-800'}`}>
                      Login Alerts
                    </div>
                    <div className={`text-sm ${loginAlerts ? 'text-green-600' : 'text-gray-600'}`}>
                      {loginAlerts ? 'Active' : 'Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        window.innerWidth < 1024
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        window.innerWidth < 1024 ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        window.innerWidth < 1024
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter new password"
                    />
                  </div>

                  {/* Password Requirements */}
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-xs">
                          {req.met ? (
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="w-3 h-3 text-red-500 mr-2" />
                          )}
                          <span className={req.met ? 'text-green-600' : 'text-red-600'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      window.innerWidth < 1024
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'border-gray-300'
                    }`}
                    placeholder="Confirm new password"
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>

                <button
                  onClick={handlePasswordChange}
                  disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Smartphone className={`w-5 h-5 mr-3 ${twoFactorEnabled ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium">SMS Authentication</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Receive verification codes via SMS
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    aria-label="Enable two-factor authentication"
                    title="Enable two-factor authentication"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {twoFactorEnabled && (
                <div className={`p-4 rounded-lg ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'}`}>
                    Two-factor authentication is now enabled. You'll receive SMS codes for account verification.
                  </p>
                </div>
              )}
            </div>

            {/* Login Alerts */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg font-semibold mb-4">Login Alerts</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className={`w-5 h-5 mr-3 ${loginAlerts ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium">Login Notifications</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Get notified of new login attempts
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={loginAlerts}
                    onChange={() => setLoginAlerts(!loginAlerts)}
                    aria-label="Enable login alerts"
                    title="Enable login alerts"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Recent Login Activity */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>

              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'Accra, Ghana', time: '2 minutes ago', current: true },
                  { device: 'Safari on iPhone', location: 'Accra, Ghana', time: '1 hour ago', current: false },
                  { device: 'Chrome on Android', location: 'Kumasi, Ghana', time: '3 hours ago', current: false }
                ].map((login, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    login.current
                      ? (window.innerWidth < 1024 ? 'bg-green-900' : 'bg-green-50')
                      : (window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-50')
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${login.current ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <div>
                        <div className="font-medium">{login.device}</div>
                        <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                          {login.location} • {login.time}
                        </div>
                      </div>
                    </div>
                    {login.current && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        window.innerWidth < 1024 ? 'bg-green-700 text-green-300' : 'bg-green-200 text-green-800'
                      }`}>
                        Current Session
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Security Tips */}
            <div className={`rounded-lg p-6 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg font-semibold mb-4">Security Tips</h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Use Strong Passwords</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Create unique passwords with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Smartphone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Enable Two-Factor Authentication</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Add an extra layer of security by requiring a verification code sent to your phone.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Monitor Login Activity</div>
                    <div className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                      Regularly check your login history for any suspicious activity and report immediately.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default Security;
