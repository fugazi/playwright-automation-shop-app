/**
 * Shipping calculator test data — Music-Tech Shop.
 *
 * ZIP codes for the /shipping page calculator.
 * The calculator expects US ZIP code format (5 digits).
 */

export interface ShippingZipData {
  readonly zipCode: string;
  readonly description: string;
}

// ── Valid US ZIP Codes ──────────────────────────────────────────────

export const VALID_ZIPS: ShippingZipData[] = [
  { zipCode: '10001', description: 'New York, NY' },
  { zipCode: '90210', description: 'Beverly Hills, CA' },
  { zipCode: '60601', description: 'Chicago, IL' },
  { zipCode: '33101', description: 'Miami, FL' },
  { zipCode: '98101', description: 'Seattle, WA' },
];

// ── Invalid / Edge-case ZIP Codes ───────────────────────────────────

export const INVALID_ZIPS: ShippingZipData[] = [
  { zipCode: '', description: 'Empty input' },
  { zipCode: '123', description: 'Too short (3 digits)' },
  { zipCode: '1234567', description: 'Too long (7 digits)' },
  { zipCode: 'ABCDE', description: 'Non-numeric characters' },
  { zipCode: '00000', description: 'All zeros boundary' },
  { zipCode: '99999', description: 'Upper boundary' },
];

// ── Boundary ZIP Codes ──────────────────────────────────────────────

export const BOUNDARY_ZIPS: ShippingZipData[] = [
  { zipCode: '00501', description: 'Lowest valid US ZIP (Holtsville, NY)' },
  { zipCode: '99950', description: 'Highest valid US ZIP (Ketchikan, AK)' },
];
