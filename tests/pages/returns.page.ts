import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Returns & Refunds page (route: /returns).
 */
export class ReturnsPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/returns');
  }

  // ── Page Heading ──────────────────────────────────────────────────

  get returnsHeading(): Locator {
    return this.pageHeading;
  }

  // ── Return Steps ──────────────────────────────────────────────────

  get returnSteps(): Locator {
    return this.page.getByRole('listitem');
  }

  // ── Warranty Tiers ────────────────────────────────────────────────

  get warrantyHeadings(): Locator {
    return this.page.getByRole('heading', { level: 3 });
  }

  // ── DHL Locations ─────────────────────────────────────────────────

  get findMoreLocationsButton(): Locator {
    return this.page.getByRole('button', { name: 'Find More Locations' });
  }

  // ── Actions ───────────────────────────────────────────────────────

  get viewMyOrdersLink(): Locator {
    return this.page.getByRole('link', { name: 'View My Orders' });
  }

  get contactSupportButton(): Locator {
    return this.page.getByRole('button', { name: 'Contact Support' });
  }
}
