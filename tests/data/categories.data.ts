/**
 * Product category data — Music-Tech Shop.
 *
 * 5 categories with known product counts (50 products total).
 */

export interface CategoryData {
  readonly label: string;
  readonly expectedCount: number;
}

export const CATEGORIES: CategoryData[] = [
  { label: 'Electronics', expectedCount: 5 },
  { label: 'Photography', expectedCount: 4 },
  { label: 'Accessories', expectedCount: 6 },
  { label: 'Synthesizers', expectedCount: 15 },
  { label: 'Studio Recording', expectedCount: 20 },
] as const;

/** All category labels as a simple array. */
export const CATEGORY_LABELS = CATEGORIES.map((c) => c.label);

/** Total products across all categories. */
export const TOTAL_PRODUCTS = 50;
