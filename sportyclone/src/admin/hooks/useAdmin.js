import { create } from 'zustand';

const useAdminStore = create((set) => ({
  currentUser: {
    id: '1',
    name: 'Admin User',
    email: 'admin@sportybet.com',
    role: 'super_admin',
    permissions: [
      'users.read', 'users.write', 'users.delete',
      'financial.read', 'financial.write',
      'sports.read', 'sports.write',
      'analytics.read', 'system.read', 'system.write'
    ]
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  
  stats: {
    totalUsers: 12847,
    activeUsers: 9234,
    totalRevenue: 2847392,
    totalBets: 89234,
    pendingWithdrawals: 23,
    activeBonuses: 12,
    riskAlerts: 5
  },
  setStats: (stats) => set({ stats }),
  refreshStats: () => set((state) => ({ stats: state.stats })),
  
  notifications: [
    {
      id: '1',
      title: 'New User Registration',
      message: '5 new users registered in the last hour',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      title: 'High Value Bet Alert',
      message: 'Bet of $10,000 placed on Manchester vs Arsenal',
      type: 'warning',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true
    }
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false
        },
        ...state.notifications
      ]
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({ notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    })),
  clearAllNotifications: () => set({ notifications: [] }),
  
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  darkMode: false,
  setDarkMode: (dark) => {
    set({ darkMode: dark });
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  toggleDarkMode: () =>
    set((state) => {
      const newValue = !state.darkMode;
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { darkMode: newValue };
    }),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export const useAdmin = () => {
  const currentUser = useAdminStore((state) => state.currentUser);
  const setCurrentUser = useAdminStore((state) => state.setCurrentUser);
  const stats = useAdminStore((state) => state.stats);
  const setStats = useAdminStore((state) => state.setStats);
  const refreshStats = useAdminStore((state) => state.refreshStats);
  const notifications = useAdminStore((state) => state.notifications);
  const addNotification = useAdminStore((state) => state.addNotification);
  const markNotificationAsRead = useAdminStore((state) => state.markNotificationAsRead);
  const clearAllNotifications = useAdminStore((state) => state.clearAllNotifications);
  const sidebarCollapsed = useAdminStore((state) => state.sidebarCollapsed);
  const setSidebarCollapsed = useAdminStore((state) => state.setSidebarCollapsed);
  const darkMode = useAdminStore((state) => state.darkMode);
  const setDarkMode = useAdminStore((state) => state.setDarkMode);
  const toggleDarkMode = useAdminStore((state) => state.toggleDarkMode);
  const isLoading = useAdminStore((state) => state.isLoading);
  const setIsLoading = useAdminStore((state) => state.setIsLoading);

  return {
    currentUser,
    setCurrentUser,
    stats,
    setStats,
    refreshStats,
    notifications,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    sidebarCollapsed,
    setSidebarCollapsed,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    isLoading,
    setIsLoading,
  };
};
