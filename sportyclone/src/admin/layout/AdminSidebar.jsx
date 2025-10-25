import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slogo from '../../assets/S-logo.png'
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  DollarSign, 
  BarChart3, 
  Gift, 
  Settings, 
  Shield, 
  Gamepad2, 
  MessageSquare,
  ChevronDown,
  Menu
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';

const AdminSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { currentUser } = useAdmin();
  const [expandedMenus, setExpandedMenus] = useState([]);

  const menuItems = useMemo(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      exact: true
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      submenu: [
        { label: 'All Users', path: '/admin/users' },
        { label: 'User Verification', path: '/admin/users/verification' },
        { label: 'User Restrictions', path: '/admin/users/restrictions' },
        { label: 'User Activity', path: '/admin/users/activity' }
      ]
    },
    {
      id: 'sports',
      label: 'Sports & Markets',
      icon: Trophy,
      submenu: [
        { label: 'Sports Management', path: '/admin/sports' },
        { label: 'Markets & Odds', path: '/admin/sports/markets' },
        { label: 'Matches & Events', path: '/admin/sports/matches' },
        { label: 'Leagues & Tournaments', path: '/admin/sports/leagues' }
      ]
    },
    {
      id: 'financial',
      label: 'Financial Management',
      icon: DollarSign,
      submenu: [
        { label: 'Transactions', path: '/admin/financial/transactions' },
        { label: 'Betting Operations', path: '/admin/financial/operations' },
        { label: 'Payment Methods', path: '/admin/financial/payments' },
        { label: 'Financial Reports', path: '/admin/financial/reports' }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3,
      submenu: [
        { label: 'Business Analytics', path: '/admin/analytics/business' },
        { label: 'User Analytics', path: '/admin/analytics/users' },
        { label: 'Risk Management', path: '/admin/analytics/risk' },
        { label: 'Performance Reports', path: '/admin/analytics/performance' }
      ]
    },
    {
      id: 'promotions',
      label: 'Promotions & Bonuses',
      icon: Gift,
      submenu: [
        { label: 'Campaign Management', path: '/admin/promotions/campaigns' },
        { label: 'Bonus Codes', path: '/admin/promotions/codes' },
        { label: 'Marketing Tools', path: '/admin/promotions/marketing' },
        { label: 'Loyalty Programs', path: '/admin/promotions/loyalty' }
      ]
    },
    {
      id: 'virtual',
      label: 'Virtual Sports & Games',
      icon: Gamepad2,
      submenu: [
        { label: 'Virtual Sports', path: '/admin/virtual/sports' },
        { label: 'Casino Games', path: '/admin/virtual/casino' },
        { label: 'Game Settings', path: '/admin/virtual/settings' }
      ]
    },
    {
      id: 'support',
      label: 'Customer Support',
      icon: MessageSquare,
      submenu: [
        { label: 'Support Tickets', path: '/admin/support/tickets' },
        { label: 'Live Chat', path: '/admin/support/chat' },
        { label: 'FAQ Management', path: '/admin/support/faq' },
        { label: 'Feedback Analysis', path: '/admin/support/feedback' }
      ]
    },
    {
      id: 'compliance',
      label: 'Compliance & Security',
      icon: Shield,
      submenu: [
        { label: 'Regulatory Tools', path: '/admin/compliance/regulatory' },
        { label: 'Audit Trails', path: '/admin/compliance/audit' },
        { label: 'Security Monitoring', path: '/admin/compliance/security' },
        { label: 'AML Tools', path: '/admin/compliance/aml' }
      ]
    },
    {
      id: 'system',
      label: 'System Configuration',
      icon: Settings,
      submenu: [
        { label: 'Platform Settings', path: '/admin/system/platform' },
        { label: 'API Management', path: '/admin/system/api' },
        { label: 'Maintenance', path: '/admin/system/maintenance' },
        { label: 'Backup & Recovery', path: '/admin/system/backup' }
      ]
    }
  ], []);

  useEffect(() => {
    const activeMenu = menuItems.find(item => item.submenu?.some(sub => location.pathname.startsWith(sub.path)));
    if (activeMenu) {
      setExpandedMenus([activeMenu.id]);
    }
  }, [location.pathname, menuItems]);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [menuId] // Only allow one menu to be open at a time
    );
  };

  const isActive = (path, exact = false) => exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className={`bg-sidebar-background text-sidebar-foreground transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <img src={Slogo} alt="SportyBet" className="w-12 h-8 object-contain" />
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
              </div>
            )}
          </div>
          {!collapsed && onToggle && (
            <button
              onClick={onToggle}
              className="p-1 rounded-lg hover:bg-sidebar-accent transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-4 h-4 text-sidebar-foreground/60" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                      isActive(item.submenu[0].path)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        expandedMenus.includes(item.id) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {!collapsed && item.submenu && expandedMenus.includes(item.id) && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive(child.path, true) 
                              ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path, item.exact)
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-sidebar-accent-foreground">{currentUser?.name?.charAt(0) || 'A'}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">{currentUser?.name || 'Admin User'}</p>
              <p className="text-xs text-sidebar-foreground/60">{currentUser?.role || 'Super Admin'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
