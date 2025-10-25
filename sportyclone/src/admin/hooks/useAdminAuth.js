import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdminAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (username, password) => {
        // Replace with actual API call
        if (username === "admin" && password === "password") {
          const userData = {
            username: "admin",
            email: "admin@example.com",
            role: 'super_admin',
            loginTime: new Date().toISOString()
          };

          set({ isAuthenticated: true, user: userData });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        // Dispatch custom event for logout
        window.dispatchEvent(new CustomEvent('admin-logout'));
      },
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);

export { useAdminAuthStore };
