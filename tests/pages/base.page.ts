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

  /** Navigate to a path relative to the configured baseURL. */
  async navigateTo(path: string): Promise<this> {
    await this.page.goto(path);
    return this;
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
