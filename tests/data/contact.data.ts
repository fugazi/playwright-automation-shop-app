/**
 * Contact form test data — Music-Tech Shop.
 *
 * Valid and invalid payloads for the /contact form.
 * Fields: Full Name, Email Address, Subject, Message.
 */

export interface ContactFormData {
  readonly fullName: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

// ── Valid Submissions ───────────────────────────────────────────────

export const VALID_CONTACT: ContactFormData = {
  fullName: 'Jane Doe',
  email: 'jane.doe@example.com',
  subject: 'Product Inquiry',
  message:
    'Hello, I would like more information about your studio recording equipment.',
};

export const VALID_CONTACT_ALT: ContactFormData = {
  fullName: 'John Smith',
  email: 'john.smith@example.com',
  subject: 'Order Support',
  message: 'I need help with my recent order. Can you assist?',
};

// ── Invalid / Edge-case Submissions ─────────────────────────────────

export const INVALID_CONTACT = {
  /** All fields left empty — tests required-field validation. */
  allEmpty: {
    fullName: '',
    email: '',
    subject: '',
    message: '',
  },

  /** Invalid email format. */
  invalidEmail: {
    fullName: 'Jane Doe',
    email: 'not-an-email',
    subject: 'Test',
    message: 'Checking email validation.',
  },

  /** Missing name only. */
  missingName: {
    fullName: '',
    email: 'jane.doe@example.com',
    subject: 'Test',
    message: 'Missing name field.',
  },

  /** XSS payload in message. */
  xssPayload: {
    fullName: 'Test User',
    email: 'xss@example.com',
    subject: 'XSS Test',
    message: '<script>alert("xss")</script>',
  },
} as const;
