import { useEffect, useRef, useState } from 'react';

/**
 * Hook for managing focus trap in modals and dialogs
 */
export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return containerRef;
};

/**
 * Hook for managing announcements to screen readers
 */
export const useAnnouncer = () => {
  const [announcement, setAnnouncement] = useState('');
  
  const announce = (message) => {
    setAnnouncement(''); // Clear first to ensure re-announcement
    setTimeout(() => setAnnouncement(message), 100);
  };
  
  return { announcement, announce };
};

/**
 * Hook for managing keyboard navigation
 */
export const useKeyboardNavigation = (
  items,
  onSelect
) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) {
          onSelect(items[activeIndex], activeIndex);
        }
        break;
      case 'Escape':
        setActiveIndex(-1);
        break;
    }
  };
  
  return { activeIndex, setActiveIndex, handleKeyDown };
};

/**
 * Hook for managing form validation and accessibility
 */
export const useFormValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const setFieldError = (field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };
  
  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };
  
  const setFieldTouched = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  const getFieldProps = (field) => ({
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });
  
  const getErrorProps = (field) => ({
    id: `${field}-error`,
    role: 'alert',
    'aria-live': 'polite',
  });
  
  return {
    errors,
    touched,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    getFieldProps,
    getErrorProps,
    hasErrors: Object.keys(errors).length > 0,
  };
};

/**
 * Hook for managing loading states with accessibility
 */
export const useAccessibleLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const startLoading = (message = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
  };
  
  const stopLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };
  
  const getLoadingProps = () => ({
    'aria-busy': isLoading,
    'aria-live': 'polite',
    'aria-label': loadingMessage,
  });
  
  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    getLoadingProps,
  };
};
