/**
 * Pagination helper utilities — Music-Tech Shop.
 *
 * Functions for calculating expected page counts, ranges, and
 * validating "Showing X of Y" indicators.
 */

/**
 * Calculate the total number of pages given total items and items per page.
 */
export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number,
): number {
  return Math.ceil(totalItems / itemsPerPage);
}

/**
 * Calculate the expected item count on a specific page.
 *
 * @returns The number of items expected on the given page number.
 */
export function itemsOnPage(
  pageNumber: number,
  totalItems: number,
  itemsPerPage: number,
): number {
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return 0;
  }

  if (pageNumber === totalPages) {
    const remainder = totalItems % itemsPerPage;
    return remainder === 0 ? itemsPerPage : remainder;
  }

  return itemsPerPage;
}

/**
 * Build the expected "Showing X of Y products" text range.
 *
 * @returns Object with `start`, `end`, and `total` values.
 */
export function pageRange(
  pageNumber: number,
  totalItems: number,
  itemsPerPage: number,
): { start: number; end: number; total: number } {
  const start = (pageNumber - 1) * itemsPerPage + 1;
  const end = Math.min(pageNumber * itemsPerPage, totalItems);
  return { start, end, total: totalItems };
}
