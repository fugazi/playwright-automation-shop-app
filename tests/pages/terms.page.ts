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

  get useLicenseHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '2. Use License',
    });
  }

  get disclaimerHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '3. Disclaimer',
    });
  }

  get limitationsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '4. Limitations',
    });
  }

  get accuracyOfMaterialsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '5. Accuracy of Materials',
    });
  }

  get linksHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '6. Links',
    });
  }

  get modificationsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '7. Modifications',
    });
  }

  get governingLawHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '8. Governing Law',
    });
  }

  get productReturnsHeading(): Locator {
    return this.page.getByRole('heading', {
      name: '9. Product Returns',
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
