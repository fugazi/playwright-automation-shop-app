import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Orders / Order History page (route: /orders).
 */
export class OrdersPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/orders');
  }

  // ── Page Heading ──────────────────────────────────────────────────

  get orderHistoryHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Order History', level: 1 });
  }

  // ── Empty State ───────────────────────────────────────────────────

  get noOrdersHeading(): Locator {
    return this.page.getByRole('heading', { name: 'No orders found' });
  }

  get startShoppingLink(): Locator {
    return this.page.getByRole('link', { name: 'Start Shopping' });
  }

  // ── Order Items ───────────────────────────────────────────────────

  /** All order articles (when orders exist). */
  get orderArticles(): Locator {
    return this.page.getByRole('article');
  }
}
