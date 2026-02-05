import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Home / Landing page (route: /).
 */
export class HomePage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/');
  }

  // ── Hero Section ──────────────────────────────────────────────────

  get heroHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Music-Tech Shop', level: 1 });
  }

  get shopNowLink(): Locator {
    return this.page.getByRole('link', { name: 'Shop Now' });
  }

  get exploreDealsLink(): Locator {
    return this.page.getByRole('link', { name: 'Explore Deals' });
  }

  // ── Featured Products ─────────────────────────────────────────────

  get featuredProductsHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Featured Products' });
  }

  get featuredProductCards(): Locator {
    return this.page.getByRole('article');
  }

  get viewAllProductsLink(): Locator {
    return this.page.getByRole('link', { name: 'View All Products' });
  }

  // ── Categories ────────────────────────────────────────────────────

  get categoriesHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Shop by Category' });
  }

  // ── Newsletter ────────────────────────────────────────────────────

  get newsletterHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Stay Updated' });
  }

  get newsletterEmailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email address' });
  }

  get subscribeButton(): Locator {
    return this.page.getByRole('button', { name: 'Subscribe' });
  }

  /** Subscribe with an email address. */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.newsletterEmailInput.fill(email);
    await this.subscribeButton.click();
  }
}
