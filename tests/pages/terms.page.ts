import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Terms of Service page (route: /terms).
 */
export class TermsPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/terms');
  }

  // ── Section Headings ──────────────────────────────────────────────

  get agreementToTermsHeading(): Locator {
    return this.page.getByRole('heading', { name: '1. Agreement to Terms' });
  }

  get intellectualPropertyHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '2. Intellectual Property',
    });
  }

  get userResponsibilitiesHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '3. User Responsibilities',
    });
  }

  get productInfoHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '4. Product Information',
    });
  }

  get pricingHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '5. Pricing and Payment',
    });
  }

  get shippingHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '6. Shipping and Delivery',
    });
  }

  get returnsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '7. Returns and Refunds',
    });
  }

  get limitationHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '8. Limitation of Liability',
    });
  }

  get governingLawHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '9. Governing Law',
    });
  }

  get userAccountsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '10. User Accounts',
    });
  }

  /** All section headings (level 2). */
  get sectionHeadings(): Locator {
    return this.page.getByRole('heading', { level: 2 });
  }
}
