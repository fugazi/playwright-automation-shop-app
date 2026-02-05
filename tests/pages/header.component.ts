import { type Locator, type Page } from '@playwright/test';

/**
 * Reusable component for the site header (banner).
 * Composed into every page via BasePage — not a standalone page.
 */
export class HeaderComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation Links ──────────────────────────────────────────────

  get homeLink(): Locator {
    return this.page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Home' });
  }

  get productsLink(): Locator {
    return this.page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Products' });
  }

  get apiTestLink(): Locator {
    return this.page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'API Test' });
  }

  get logoLink(): Locator {
    return this.page.getByRole('link', { name: 'Music-Tech Shop Home' });
  }

  // ── Search ────────────────────────────────────────────────────────

  get searchInput(): Locator {
    return this.page.getByRole('searchbox', { name: 'Search products' });
  }

  get searchButton(): Locator {
    return this.page
      .getByRole('search')
      .getByRole('button', { name: 'Search' });
  }

  /** Type a query into the search box and submit. */
  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  // ── Theme Toggle ──────────────────────────────────────────────────

  get themeToggle(): Locator {
    return this.page.getByRole('button', { name: 'Toggle theme' });
  }

  async toggleTheme(): Promise<void> {
    await this.themeToggle.click();
  }

  // ── Auth-dependent elements ───────────────────────────────────────

  /** Visible when the user is NOT authenticated. */
  get loginLink(): Locator {
    return this.page.getByRole('link', { name: 'Login to your account' });
  }

  /** Visible when the user IS authenticated. */
  get userMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'User menu' });
  }

  /** Cart link (visible when authenticated). Contains item count in name. */
  get cartLink(): Locator {
    return this.page.getByRole('link', { name: /Shopping cart with \d+ items/ });
  }

  /** Wishlist link (visible when authenticated). */
  get wishlistLink(): Locator {
    return this.page.getByRole('link', { name: /Wishlist with \d+ items/ });
  }
}
