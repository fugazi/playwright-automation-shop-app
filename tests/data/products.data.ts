/**
 * Known product data for assertion targets — Music-Tech Shop.
 *
 * These products are sourced from the 50-item catalog.
 * The app uses an in-memory backend, so data resets on server restart
 * but the catalog is static and deterministic.
 */

export interface ProductData {
  readonly id: number;
  readonly name: string;
  readonly price: string;
  readonly category: string;
  readonly badge?: string;
}

// ── Representative Products (one per category) ──────────────────────

export const PRODUCTS: Record<string, ProductData> = {
  sdCard: {
    id: 1,
    name: '128GB UHS-II SD Card',
    price: '$39.99',
    category: 'Photography',
    badge: 'Best Seller',
  },
  monitor: {
    id: 2,
    name: '27" 4K UHD Monitor',
    price: '$449.99',
    category: 'Electronics',
    badge: 'Best Seller',
  },
  mirrorlessCamera: {
    id: 3,
    name: '4K Mirrorless Camera',
    price: '$1,299.99',
    category: 'Photography',
    badge: 'Best Seller',
  },
  lens: {
    id: 4,
    name: '50mm f/1.8 Lens',
    price: '$249.99',
    category: 'Photography',
    badge: 'Best Seller',
  },
  usbHub: {
    id: 5,
    name: '7-in-1 USB-C Hub',
    price: '$69.99',
    category: 'Accessories',
  },
  studioMonitors: {
    id: 6,
    name: 'Adam Audio A7X Studio Monitors (Pair)',
    price: '$1,599.99',
    category: 'Studio Recording',
  },
  audioInterface: {
    id: 7,
    name: 'Apogee Duet 3 Audio Interface',
    price: '$649.99',
    category: 'Studio Recording',
  },
  microFreak: {
    id: 8,
    name: 'Arturia MicroFreak',
    price: '$349.99',
    category: 'Synthesizers',
    badge: 'New Arrival',
  },
  condenser: {
    id: 10,
    name: 'Audio-Technica AT2020',
    price: '$99.99',
    category: 'Studio Recording',
  },
  monitorStand: {
    id: 15,
    name: 'Dual Monitor Stand',
    price: '$99.99',
    category: 'Accessories',
  },
} as const;

// ── Pagination Constants ────────────────────────────────────────────

export const CATALOG = {
  totalProducts: 50,
  productsPerPage: 16,
  totalPages: 4,
  page1Count: 16,
  page2Count: 16,
  page3Count: 16,
  page4Count: 2,
} as const;
