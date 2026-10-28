/**
 * Formats a timestamp into an ISO-like standard string or custom readable date.
 * @param {Date|number|string} timestamp
 * @param {boolean} includeTime
 * @returns {string}
 */
export function formatTimestamp(timestamp, includeTime = true) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  if (!includeTime) {
    return date.toISOString().split('T')[0];
  }
  return date.toISOString();
}

/**
 * Truncates text to a specified maximum length with ellipsis.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 50) {
  if (!str || str.length <= maxLen) return str || '';
  return str.slice(0, Math.max(0, maxLen - 3)) + '...';
}

/**
 * Formats a numeric value into a currency string.
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Deep clones a serializable JSON-like object.
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce helper to limit execution frequency.
 * @param {Function} fn
 * @param {number} delayMs
 * @returns {Function}
 */
export function debounce(fn, delayMs = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}
