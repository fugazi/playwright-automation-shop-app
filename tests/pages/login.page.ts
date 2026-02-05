import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Login page (route: /login).
 */
export class LoginPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/login');
  }

  // ── Form Fields ───────────────────────────────────────────────────

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get showPasswordButton(): Locator {
    return this.page.getByRole('button', { name: 'Show password' });
  }

  get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in to your account' });
  }

  // ── Quick-login Buttons ───────────────────────────────────────────

  get useAdminAccountButton(): Locator {
    return this.page
      .getByRole('button', { name: 'Use This Account' })
      .first();
  }

  get useCustomerAccountButton(): Locator {
    return this.page
      .getByRole('button', { name: 'Use This Account' })
      .nth(1);
  }

  get continueAsGuestLink(): Locator {
    return this.page.getByRole('link', { name: 'Continue as Guest' });
  }

  // ── Actions ───────────────────────────────────────────────────────

  /** Fill and submit the login form. */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  /** Quick-login as the admin user. */
  async loginAsAdmin(): Promise<void> {
    await this.useAdminAccountButton.click();
    await this.signInButton.click();
  }

  /** Quick-login as the customer user. */
  async loginAsCustomer(): Promise<void> {
    await this.useCustomerAccountButton.click();
    await this.signInButton.click();
  }
}
