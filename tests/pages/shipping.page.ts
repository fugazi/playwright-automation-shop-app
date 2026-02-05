import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Shipping Policy page (route: /shipping).
 */
export class ShippingPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/shipping');
  }

  // ── Shipping Calculator ───────────────────────────────────────────

  get zipCodeInput(): Locator {
    return this.page.getByRole('textbox', { name: 'ZIP code input' });
  }

  get calculateButton(): Locator {
    return this.page.getByRole('button', { name: 'Calculate' });
  }

  /** Enter a ZIP code and click Calculate. */
  async calculateShipping(zipCode: string): Promise<void> {
    await this.zipCodeInput.fill(zipCode);
    await this.calculateButton.click();
  }

  // ── Shipping Tiers ────────────────────────────────────────────────

  get standardShippingHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Standard Shipping' });
  }

  get expressShippingHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Express Shipping' });
  }

  get overnightShippingHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Overnight Shipping' });
  }

  // ── FAQ Sections ──────────────────────────────────────────────────

  /** All FAQ accordion buttons. */
  get faqButtons(): Locator {
    return this.page.getByRole('button', { name: /^(?!Calculate)/ }).filter({
      hasText: /\?/,
    });
  }

  /** Toggle a specific FAQ accordion by its question text. */
  faqToggle(questionText: string): Locator {
    return this.page.getByRole('button', { name: questionText });
  }
}
