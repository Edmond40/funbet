import { useCallback, useMemo, useRef, useState } from 'react';

/**
 * Optimized state hook that prevents unnecessary re-renders
 * and provides debounced updates for better performance
 */
export function useOptimizedState(initialValue, debounceMs = 0) {
  const [state, setState] = useState(initialValue);
  const timeoutRef = useRef(undefined);

  const setOptimizedState = useCallback((newValue) => {
    if (debounceMs > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setState(newValue);
      }, debounceMs);
    } else {
      setState(newValue);
    }
  }, [debounceMs]);

  const setStateImmediate = useCallback((newValue) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setState(newValue);
  }, []);

  return [state, setOptimizedState, setStateImmediate];
}

/**
 * Hook for managing form state with validation and performance optimizations
 */
export function useOptimizedForm(
  initialValues,
  validationRules
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback((field) => {
    if (!validationRules?.[field]) return null;
    
    const error = validationRules[field](values[field]);
    setErrors(prev => ({ ...prev, [field]: error || undefined }));
    return error;
  }, [values, validationRules]);

  const validateAll = useCallback(() => {
    if (!validationRules) return true;
    
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = useMemo(() => {
    const validatedErrors = Object.keys(validationRules).reduce((acc, field) => {
      const error = validationRules[field](values[field]);
      if (error) {
        acc[field] = error;
      }
      return acc;
    }, {});
    return Object.keys(validatedErrors).length === 0;
  }, [values, validationRules]);

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateAll,
    reset,
    isValid
  };
}