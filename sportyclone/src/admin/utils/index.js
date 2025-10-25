// Format currency
export const formatCurrency = (amount, currency = 'GHS')=> {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num)=> {
  return new Intl.NumberFormat('en-US').format(num);
};

// Format percentage
export const formatPercentage = (value, decimals = 1)=> {
  return `${value.toFixed(decimals)}%`;
};

// Format date
export const formatDate = (date, format = 'short')=> {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const optionsMap = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }
  };
  
  const options = optionsMap[format] || { month: 'short', day: 'numeric', year: 'numeric' };

  return dateObj.toLocaleDateString('en-US', options);
};

// Generate random ID
export const generateId = ()=> {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Copy to clipboard
export const copyToClipboard = async (text)=> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Validate email
export const isValidEmail = (email)=> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Ghana format)
export const isValidPhone = (phone)=> {
  const phoneRegex = /^(\+233|0)[2-9]\d{8}$/;
  return phoneRegex.test(phone);
};

// Calculate percentage change
export const calculatePercentageChange = (oldValue, newValue)=> {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
};

// Truncate text
export const truncateText = (text, maxLength)=> {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate booking code
export const generateBookingCode = ()=> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Sleep function
export const sleep = (ms)=> {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Get status color
export const getStatusColor = (status)=> {
  const statusColors = {
    active: 'text-green-600 bg-green-100',
    inactive: 'text-gray-600 bg-gray-100',
    pending: 'text-yellow-600 bg-yellow-100',
    suspended: 'text-red-600 bg-red-100',
    completed: 'text-blue-600 bg-blue-100',
    cancelled: 'text-red-600 bg-red-100',
    approved: 'text-green-600 bg-green-100',
    rejected: 'text-red-600 bg-red-100',
  };
  
  return statusColors[status.toLowerCase()] || 'text-gray-600 bg-gray-100';
};

// Download file
export const downloadFile = (data, filename, type = 'application/json') => {
  const blob = new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};