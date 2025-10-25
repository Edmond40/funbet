/**
 * Accessibility Utilities
 * Provides standardized accessibility attributes and helpers
 */

// Common accessibility attributes for form elements
export const getFormAccessibility = (label, required = false) => ({
  'aria-label': label,
  'aria-required': required,
  title: label,
});

// Common accessibility attributes for buttons
export const getButtonAccessibility = (action, disabled = false) => ({
  title: action,
  'aria-label': action,
  'aria-disabled': disabled,
});

// Common accessibility attributes for select elements
export const getSelectAccessibility = (label, required = false) => ({
  'aria-label': label,
  'aria-required': required,
  title: label,
});

// Common accessibility attributes for input elements
export const getInputAccessibility = (label, placeholder, required = false) => ({
  'aria-label': label,
  'aria-required': required,
  ...(placeholder && { placeholder }),
  title: label,
});

// Generate unique IDs for form elements
export const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// Common ARIA roles and properties
export const ARIA_ROLES = {
  button: 'button',
  link: 'link',
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  banner: 'banner',
  contentinfo: 'contentinfo',
  search: 'search',
  form: 'form',
  dialog: 'dialog',
  alert: 'alert',
  status: 'status',
  progressbar: 'progressbar',
  tab: 'tab',
  tabpanel: 'tabpanel',
  tablist: 'tablist',
};

// Common accessibility patterns
export const ACCESSIBILITY_PATTERNS = {
  // Skip link for keyboard navigation
  skipLink: {
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50',
    href: '#main-content',
    children: 'Skip to main content',
  },
  
  // Screen reader only text
  srOnly: {
    className: 'sr-only',
  },
  
  // Focus visible styles
  focusVisible: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
};
