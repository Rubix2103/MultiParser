import { truncate } from './helpers.js';

/**
 * Validates whether an email format matches standard patterns.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validates a payload object against required schema keys.
 * @param {Record<string, any>} payload
 * @param {string[]} requiredFields
 * @returns {{ valid: boolean, missing: string[], summary: string }}
 */
export function validatePayload(payload, requiredFields = []) {
  if (!payload || typeof payload !== 'object') {
    return {
      valid: false,
      missing: requiredFields,
      summary: 'Invalid payload: not an object',
    };
  }

  const missing = requiredFields.filter((field) => payload[field] === undefined || payload[field] === null);
  const isValid = missing.length === 0;

  return {
    valid: isValid,
    missing,
    summary: isValid
      ? 'Payload valid'
      : `Missing required fields: ${truncate(missing.join(', '), 40)}`,
  };
}

/**
 * Ensures a number is within a bounded interval.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function isInRange(value, min, max) {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

