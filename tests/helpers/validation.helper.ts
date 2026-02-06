/**
 * Validation helper utilities — Music-Tech Shop.
 *
 * Reusable patterns for validating form inputs and expected formats.
 */

/**
 * Check whether a string is a valid email format.
 * Uses a simplified RFC 5322 compliant pattern.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Check whether a string is a valid US ZIP code (5 digits).
 */
export function isValidUSZip(zip: string): boolean {
  return /^\d{5}$/.test(zip);
}

/**
 * Check whether a required string field has a value (non-empty after trimming).
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Build a regex that matches a currency-formatted product count indicator.
 * Example output pattern: /Showing 1–16 of 50 products/
 */
export function showingProductsPattern(
  start: number,
  end: number,
  total: number,
): RegExp {
  return new RegExp(`Showing ${start}.*${end} of ${total} products`);
}
