// Validation rules

// Individual validation functions
export const validateRequired = (value)=> {
  if (value === null || value === undefined || value === '') {
    return 'This field is required';
  }
  return null;
};

export const validateMinLength = (value, minLength)=> {
  if (value && value.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  return null;
};

export const validateMaxLength = (value, maxLength)=> {
  if (value && value.length > maxLength) {
    return `Must be no more than ${maxLength} characters`;
  }
  return null;
};

export const validateMin = (value, min)=> {
  if (value !== null && value !== undefined && value < min) {
    return `Must be at least ${min}`;
  }
  return null;
};

export const validateMax = (value, max)=> {
  if (value !== null && value !== undefined && value > max) {
    return `Must be no more than ${max}`;
  }
  return null;
};

export const validatePattern = (value, pattern)=> {
  if (value && !pattern.test(value)) {
    return 'Invalid format';
  }
  return null;
};

export const validateEmail = (value)=> {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailPattern.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (value)=> {
  const phonePattern = /^\+?[\d\s\-()]+$/;
  if (value && !phonePattern.test(value)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validateUrl = (value)=> {
  try {
    if (value) {
      new URL(value);
    }
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

// Main validation function
export const validateField = (value, rules)=> {
  // Required validation
  if (rules.required) {
    const error = validateRequired(value);
    if (error) return error;
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength) {
      const error = validateMinLength(value, rules.minLength);
      if (error) return error;
    }

    if (rules.maxLength) {
      const error = validateMaxLength(value, rules.maxLength);
      if (error) return error;
    }

    if (rules.pattern) {
      const error = validatePattern(value, rules.pattern);
      if (error) return error;
    }

    if (rules.email) {
      const error = validateEmail(value);
      if (error) return error;
    }

    if (rules.phone) {
      const error = validatePhone(value);
      if (error) return error;
    }

    if (rules.url) {
      const error = validateUrl(value);
      if (error) return error;
    }
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined) {
      const error = validateMin(value, rules.min);
      if (error) return error;
    }

    if (rules.max !== undefined) {
      const error = validateMax(value, rules.max);
      if (error) return error;
    }
  }

  // Custom validation
  if (rules.custom) {
    const error = rules.custom(value);
    if (error) return error;
  }

  return null;
};

// Validate multiple fields
export const validateForm = (
  data,
  rules)=> {
  const errors= {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Check if form has errors
export const hasErrors = (errors)=> {
  return Object.keys(errors).length > 0;
};

// Common validation rule sets
export const commonRules = {
  email: {
    required,
    email,
    maxLength: 255
  },
  password: {
    required,
    minLength: 8,
    maxLength: 128
  },
  username: {
    required,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_]+$/
  },
  phone: {
    required,
    phone,
  name: {
    required,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/
  },
  amount: {
    required,
    min: 0
  },
  url: {
    url: true
  }
};

// Form validation hook helper
export const useFormValidation = (
  initialData,
  rules) => {
  const [data, setData] = React.useState(initialData);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateSingleField = (field, value) => {
    const error = validateField(value, rules[field] || {});
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
    return !error;
  };

  const validateAllFields = () => {
    const newErrors = validateForm(data, rules);
    setErrors(newErrors);
    return !hasErrors(newErrors);
  };

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Validate if field has been touched
    if (touched[field]) {
      validateSingleField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateSingleField(field, data[field]);
  };

  const reset = () => {
    setData(initialData);
    setErrors({});
    setTouched({});
  };

  return {
    data,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAllFields,
    validateSingleField,
    reset,
    isValid: !hasErrors(errors)
  };
};

// React import for the hook
import React from 'react';
