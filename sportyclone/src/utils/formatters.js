/**
 * Formats a number
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: GH₵)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount, currency = 'GH₵')=> {
  return `${currency} ${amount.toLocaleString()}`;
};

/**
 * Formats a number percentage
 * @param value - The percentage value
 * @returns Formatted percentage string
 */
export const formatPercentage = (value)=> {
  return `${value}%`;
};