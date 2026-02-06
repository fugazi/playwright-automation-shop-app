/**
 * Test user credentials — Music-Tech Shop.
 *
 * The application ships with pre-configured test accounts
 * (admin + customer). No registration flow exists.
 */

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
  readonly role: 'admin' | 'customer';
}

// ── Valid Credentials ───────────────────────────────────────────────

export const ADMIN_USER: UserCredentials = {
  email: 'admin@test.com',
  password: 'admin123',
  role: 'admin',
};

export const CUSTOMER_USER: UserCredentials = {
  email: 'user@test.com',
  password: 'user123',
  role: 'customer',
};

// ── Invalid Credentials (negative testing) ──────────────────────────

export const INVALID_USERS = {
  wrongPassword: {
    email: 'user@test.com',
    password: 'wrongpassword',
  },
  wrongEmail: {
    email: 'nonexistent@test.com',
    password: 'user123',
  },
  emptyFields: {
    email: '',
    password: '',
  },
  invalidEmailFormat: {
    email: 'not-an-email',
    password: 'user123',
  },
  sqlInjection: {
    email: "' OR 1=1 --",
    password: "' OR 1=1 --",
  },
  xssPayload: {
    email: '<script>alert("xss")</script>@test.com',
    password: '<script>alert("xss")</script>',
  },
} as const;

// ── Storage State Paths ─────────────────────────────────────────────

export const AUTH_STATE = {
  admin: 'playwright/.auth/admin.json',
  customer: 'playwright/.auth/customer.json',
} as const;
