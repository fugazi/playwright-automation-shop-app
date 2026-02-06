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

  get standardShippingOption(): Locator {
    return this.page.getByTestId('shipping-option-standard');
  }

  get expressShippingOption(): Locator {
    return this.page.getByTestId('shipping-option-express');
  }

  get overnightShippingOption(): Locator {
    return this.page.getByTestId('shipping-option-overnight');
  }

  get shippingOptionsHeading(): Locator {
    return this.page.getByTestId('shipping-options-title');
  }

  // ── FAQ Sections ──────────────────────────────────────────────────

  get faqSection(): Locator {
    return this.page.getByTestId('shipping-faq');
  }

  get faqHeading(): Locator {
    return this.page.getByTestId('shipping-faq-title');
  }

  /** All FAQ card titles (static — not accordion). */
  get faqCards(): Locator {
    return this.faqSection.locator('[data-slot="card"]');
  }
}
