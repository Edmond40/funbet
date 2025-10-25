import { useState, useCallback } from 'react';

export const useConfirm = () => {
  const [state, setState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger',
    loading: false,
    onConfirm: () => {},
    onCancel: () => {}
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        ...state,
        ...options,
        isOpen: true,
        onConfirm: () => {
          resolve(true);
          setState((prev) => ({ ...prev, isOpen: false }));
        },
        onCancel: () => {
          resolve(false);
          setState((prev) => ({ ...prev, isOpen: false }));
        },
      });
    });
  }, [state]);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const setLoading = useCallback((loading) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  return {
    ...state,
    confirm,
    close,
    setLoading,
  };
};
