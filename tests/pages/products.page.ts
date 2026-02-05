import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Products listing page (route: /products).
 */
export class ProductsPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/products');
  }

  // ── Search (in-page) ─────────────────────────────────────────────

  get searchInput(): Locator {
    return this.page.getByRole('searchbox', { name: 'Search products' });
  }

  // ── Filters ───────────────────────────────────────────────────────

  get categoryFilter(): Locator {
    return this.page.getByRole('combobox', { name: 'Category' });
  }

  get sortFilter(): Locator {
    return this.page.getByRole('combobox', { name: 'Sort by' });
  }

  /** Select a category by its visible label text. */
  async selectCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption({ label: category });
  }

  /** Select a sort option by its visible label text. */
  async selectSort(sort: string): Promise<void> {
    await this.sortFilter.selectOption({ label: sort });
  }

  // ── Product Grid ──────────────────────────────────────────────────

  get productCards(): Locator {
    return this.page.getByRole('article');
  }

  /** Get a specific product card by its heading text. */
  productCard(name: string): Locator {
    return this.page.getByRole('article').filter({ hasText: name });
  }

  /** Get the "Add to cart" or product link inside a product card. */
  productLink(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  // ── Results Info ──────────────────────────────────────────────────

  /** Paragraph showing "Showing X of Y products (Page N of M)" */
  get resultsInfo(): Locator {
    return this.page.getByText(/Showing \d+ of \d+ products/);
  }

  // ── Pagination ────────────────────────────────────────────────────

  get paginationNav(): Locator {
    return this.page.getByRole('navigation', { name: 'Pagination' });
  }

  get previousPageButton(): Locator {
    return this.page.getByRole('button', { name: 'Go to previous page' });
  }

  get nextPageButton(): Locator {
    return this.page.getByRole('button', { name: 'Go to next page' });
  }

  /** Navigate to a specific page number. */
  async goToPage(pageNumber: number): Promise<void> {
    await this.page
      .getByRole('button', { name: `Go to page ${pageNumber}` })
      .click();
  }
}
