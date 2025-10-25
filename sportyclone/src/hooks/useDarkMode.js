import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDarkMode = create(
  persist(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (value) => {
        set({ isDarkMode: value });
        // Apply dark class to document root
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.isDarkMode;
          // Apply dark class to document root
          if (newValue) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newValue };
        }),
    }),
    {
      name: 'sportybet-dark-mode',
      onRehydrateStorage: () => {
        return (state) => {
          // Apply dark mode class on initial load
          if (state?.isDarkMode) {
            document.documentElement.classList.add('dark');
          }
        };
      },
    }
  )
);
