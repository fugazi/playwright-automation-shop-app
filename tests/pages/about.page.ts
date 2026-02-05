import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * About Us page (route: /about).
 */
export class AboutPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/about');
  }

  // ── Section Headings ──────────────────────────────────────────────

  get missionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Our Mission' });
  }

  get visionHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Our Vision' });
  }

  get valuesHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Our Values' });
  }

  // ── Call-to-Action ────────────────────────────────────────────────

  get exploreProductsLink(): Locator {
    return this.page.getByRole('link', { name: 'Explore Our Products' });
  }
}
