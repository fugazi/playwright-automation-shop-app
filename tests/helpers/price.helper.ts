/**
 * Price helper utilities — Music-Tech Shop.
 *
 * Functions for parsing, formatting, and validating currency values
 * displayed in the application (US Dollar format: $X,XXX.XX).
 */

/**
 * Parse a US-formatted price string (e.g. "$1,299.99") into a number.
 * Returns `NaN` if the string cannot be parsed.
 */
export function parsePrice(priceText: string): number {
  const cleaned = priceText.replace(/[$,]/g, '').trim();
  return Number.parseFloat(cleaned);
}

/**
 * Format a number as a US dollar price string (e.g. "$1,299.99").
 */
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Check whether a string matches the expected US price format: $X,XXX.XX
 */
export function isValidPriceFormat(priceText: string): boolean {
  return /^\$[\d,]+\.\d{2}$/.test(priceText.trim());
}

/**
 * Calculate the expected total for a given unit price and quantity.
 * Returns a formatted price string.
 */
export function calculateTotal(unitPrice: string, quantity: number): string {
  const price = parsePrice(unitPrice);
  return formatPrice(price * quantity);
}
