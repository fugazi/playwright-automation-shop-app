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

  get baseUrlInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Base URL' });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get productIdInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Product ID' });
  }

  get quantityInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Quantity' });
  }

  get orderIdInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Order ID' });
  }

  // ── Test Group Accordions ─────────────────────────────────────────

  get authTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Authentication Tests/ });
  }

  get productTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Product Tests/ });
  }

  get cartTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Cart Tests/ });
  }

  get orderTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Order Tests/ });
  }

  get utilityTestsAccordion(): Locator {
    return this.page.getByRole('button', { name: /Utility Tests/ });
  }

  // ── Action Buttons ────────────────────────────────────────────────

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login', exact: true });
  }

  get getUserButton(): Locator {
    return this.page.getByRole('button', { name: 'Get User' });
  }

  get logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  get getProductsButton(): Locator {
    return this.page.getByRole('button', { name: 'Get Products' });
  }

  get getProductButton(): Locator {
    return this.page.getByRole('button', { name: 'Get Product' });
  }
}
