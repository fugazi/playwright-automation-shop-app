import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

/**
 * Base page class providing shared behaviors across all pages.
 * All page-specific Page Objects extend this class.
 */
export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
  }

  /** Navigate to a path relative to the configured baseURL and wait for client hydration. */
  async navigateTo(path: string): Promise<this> {
    await this.page.goto(path);
    await this.waitForHydration();
    return this;
  }

  /** Wait until Next.js client providers (theme + localStorage auth state) finish hydrating. */
  async waitForHydration(): Promise<void> {
    await this.page.waitForFunction(() => {
      const htmlClass = document.documentElement.className || '';
      const themeHydrated =
        htmlClass.includes('light') || htmlClass.includes('dark');
      const hasAuthStorage = Boolean(
        window.localStorage.getItem('ecommerce_auth_user'),
      );
      const userMenuRendered = Boolean(
        document.querySelector('button[aria-label="User menu"]') ||
          Array.from(document.querySelectorAll('button')).some(
            (b) => b.textContent?.trim() === 'User menu',
          ),
      );
      return themeHydrated && (!hasAuthStorage || userMenuRendered);
    });
  }

  /** Get the page heading (level 1). */
  get pageHeading(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  /** Get the notifications region used for toast messages. */
  get notificationsRegion(): Locator {
    return this.page.getByRole('region', { name: 'Notifications' });
  }
}
