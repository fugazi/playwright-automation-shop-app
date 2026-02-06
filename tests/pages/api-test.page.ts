import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * API Testing Console page (route: /api-test).
 */
export class ApiTestPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/api-test');
  }

  // ── Page Heading ──────────────────────────────────────────────────

  get consoleHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'API Testing Console',
      level: 1,
    });
  }

  // ── Configuration Fields ──────────────────────────────────────────

  /** Email input — accessible name comes from placeholder text. */
  get emailInput(): Locator {
    return this.page.locator('input[type="email"]');
  }

  /** Password input — accessible name comes from placeholder text. */
  get passwordInput(): Locator {
    return this.page.locator('input[type="password"]');
  }

  get productIdInput(): Locator {
    return this.page.getByPlaceholder('1', { exact: true }).first();
  }

  get quantityInput(): Locator {
    return this.page.getByRole('spinbutton');
  }

  get searchTermInput(): Locator {
    return this.page.getByPlaceholder('headphones');
  }

  get categoryInput(): Locator {
    return this.page.getByPlaceholder('Electronics');
  }

  // ── Test Group Accordions ─────────────────────────────────────────

  get authTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Authentication Tests/i });
  }

  get productTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Product Tests/i });
  }

  get cartTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Cart Tests/i });
  }

  get orderTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Order Tests/i });
  }

  get utilityTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Utility Tests/i });
  }

  // ── Response Panel ────────────────────────────────────────────────

  get responseHeading(): Locator {
    return this.page.getByRole('heading', { name: 'API Response' });
  }

  // ── Action Buttons ────────────────────────────────────────────────

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login', exact: true });
  }

  get getUserButton(): Locator {
    return this.page.getByRole('button', { name: 'Get User' });
  }

  get logoutButton(): Locator {
    return this.page.getByTestId('auth-logout-button');
  }

  get getProductsButton(): Locator {
    return this.page.getByTestId('products-get-all-button');
  }

  get getProductButton(): Locator {
    return this.page.getByTestId('products-get-single-button');
  }
}
