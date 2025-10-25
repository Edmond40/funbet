import { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminTopbar = ({ onToggleSidebar  }) => {
  const { darkMode, toggleDarkMode, notifications, currentUser } = useAdmin();
  const { logout } = useAdminAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-card shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users, transactions, matches..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => toggleDarkMode()}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Toggle Dark Mode"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              title="Notifications"
              aria-label="Show notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover rounded-lg shadow-lg border border-border z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-muted">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'info' ? 'bg-blue-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-popover-foreground">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(notification.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-destructive hover:text-destructive/80 font-medium" title="Action button" aria-label="Action button">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Settings"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
              title="Profile menu"
              aria-label="Open profile menu"
            >
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{currentUser?.name?.charAt(0) || 'A'}</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{currentUser?.name || 'Admin User'}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.role || 'Super Admin'}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border z-50">
                <div className="py-2">
                  <button className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left" title="Action button" aria-label="Action button">
                    <User className="w-4 h-4 mr-3" />
                    Profile Settings
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted w-full text-left" title="Action button" aria-label="Action button">
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </button>
                  <hr className="my-2" />
                  <button onClick={logout} className="flex items-center px-4 py-2 text-sm text-destructive hover:bg-muted w-full text-left" title="Action button" aria-label="Action button">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
