import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, Trash2, Check, CheckCheck, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Welcome to SportyBet!',
      message: 'Your account has been successfully created. Start placing bets now!',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '2',
      title: 'Deposit Successful',
      message: 'Your GHS 50.00 deposit has been credited to your account.',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '3',
      title: 'Bet Won!',
      message: 'Congratulations! Your bet on Chelsea vs Liverpool has won GHS 127.50',
      type: 'success',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: '4',
      title: 'Account Verification Required',
      message: 'Please verify your email address to unlock all features.',
      type: 'warning',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: '5',
      title: 'New Feature Available',
      message: 'Try our new live betting feature for real-time odds updates!',
      type: 'info',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}m ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}h ago`;
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d ago`;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 lg:bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white mr-3"
              title="Back to dashboard"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-white text-lg font-semibold">Notifications</h1>
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
            <button
              className="text-white"
              title="Notification settings"
              aria-label="Notification settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 lg:p-6">
          {/* Header Actions */}
          <div className={`flex items-center justify-between mb-6 ${window.innerWidth < 1024 ? 'text-white' : 'text-gray-900'}`}>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {/* Filter Buttons */}
              <div className={`flex rounded-lg p-1 ${window.innerWidth < 1024 ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'all'
                      ? (window.innerWidth < 1024 ? 'bg-gray-600 text-white' : 'bg-white text-gray-900')
                      : (window.innerWidth < 1024 ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'unread'
                      ? (window.innerWidth < 1024 ? 'bg-gray-600 text-white' : 'bg-white text-gray-900')
                      : (window.innerWidth < 1024 ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('read')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'read'
                      ? (window.innerWidth < 1024 ? 'bg-gray-600 text-white' : 'bg-white text-gray-900')
                      : (window.innerWidth < 1024 ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                  }`}
                >
                  Read
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                    window.innerWidth < 1024
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <CheckCheck size={16} className="mr-2" />
                  Mark All Read
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className={`space-y-4 ${window.innerWidth < 1024 ? 'text-white' : 'text-gray-900'}`}>
            {filteredNotifications.length === 0 ? (
              <div className={`text-center py-12 ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-500'}`}>
                <Bell size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No notifications found</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg p-4 transition-colors ${
                    notification.read
                      ? (window.innerWidth < 1024 ? 'bg-gray-800' : 'bg-gray-50')
                      : (window.innerWidth < 1024 ? 'bg-gray-700 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-500')
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium ${notification.read ? 'opacity-75' : ''}`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 text-sm ${notification.read ? 'opacity-75' : ''} ${
                            window.innerWidth < 1024 ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {notification.message}
                          </p>
                          <p className={`mt-2 text-xs flex items-center ${
                            window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            <Clock size={12} className="mr-1" />
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className={`p-1 rounded transition-colors ${
                                window.innerWidth < 1024
                                  ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-600'
                                  : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'
                              }`}
                              title="Mark"
                              aria-label="Mark"
                            >
                              <Check size={16} />
                            </button>
                          )}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className={`p-1 rounded transition-colors ${
                              window.innerWidth < 1024
                                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-600'
                                : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                            }`}
                            title="Delete notification"
                            aria-label="Delete notification"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Notification Settings */}
          <div className={`rounded-lg p-6 mt-8 ${window.innerWidth < 1024 ? 'bg-gray-800 text-white' : 'bg-white shadow-sm'}`}>
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receive notifications on your device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked title="Enable push notifications" aria-label="Enable push notifications" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receive notifications via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked title="Enable email notifications" aria-label="Enable email notifications" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className={`text-sm ${window.innerWidth < 1024 ? 'text-gray-400' : 'text-gray-600'}`}>
                    Receive notifications via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" title="Enable SMS notifications" aria-label="Enable SMS notifications" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
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

export default Notifications;
