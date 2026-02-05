import { type Locator, type Page } from '@playwright/test';

/**
 * Reusable component for the site footer (contentinfo).
 * Composed into every page via BasePage.
 */
export class FooterComponent {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Footer region ─────────────────────────────────────────────────

  get footer(): Locator {
    return this.page.getByRole('contentinfo');
  }

  // ── Shop Category Links ───────────────────────────────────────────

  get electronicsLink(): Locator {
    return this.footer.getByRole('link', { name: 'Electronics' });
  }

  get photographyLink(): Locator {
    return this.footer.getByRole('link', { name: 'Photography' });
  }

  get accessoriesLink(): Locator {
    return this.footer.getByRole('link', { name: 'Accessories' });
  }

  // ── Company Links ─────────────────────────────────────────────────

  get aboutUsLink(): Locator {
    return this.footer.getByRole('link', { name: 'About Us' });
  }

  get shippingPolicyLink(): Locator {
    return this.footer.getByRole('link', { name: 'Shipping Policy' });
  }

  get returnsLink(): Locator {
    return this.footer.getByRole('link', { name: 'Returns & Refunds' });
  }

  get termsLink(): Locator {
    return this.footer.getByRole('link', { name: 'Terms of Service' });
  }

  // ── Contact Information ───────────────────────────────────────────

  get contactLink(): Locator {
    return this.footer.getByRole('link', { name: 'Contact Us' });
  }

  // ── Social Links ──────────────────────────────────────────────────

  get instagramLink(): Locator {
    return this.footer.getByRole('link', { name: 'Instagram' });
  }

  get twitterLink(): Locator {
    return this.footer.getByRole('link', { name: 'Twitter' });
  }

  get githubLink(): Locator {
    return this.footer.getByRole('link', { name: 'GitHub' });
  }

  // ── Legal Links ───────────────────────────────────────────────────

  get privacyPolicyLink(): Locator {
    return this.footer.getByRole('link', { name: 'Privacy Policy' });
  }

  get cookieSettingsButton(): Locator {
    return this.footer.getByRole('button', { name: 'Cookie Settings' });
  }
}
