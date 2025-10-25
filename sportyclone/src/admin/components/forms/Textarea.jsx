import React, { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  variant = 'default',
  resize = 'vertical',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 px-4 py-2.5';
  
  const variantClasses = {
    default: 'border-gray-300 focus:border-red-500 focus:ring-red-500/20',
    filled: 'border-gray-300 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-red-500/20',
    outlined: 'border-2 border-gray-300 focus:border-red-500 focus:ring-red-500/20'
  };

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
    : '';

  const textareaClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${resizeClasses[resize]}
    ${errorClasses}
    ${className}
  `.trim();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        className={textareaClasses}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
