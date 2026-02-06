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
    return this.page.getByTestId('search-products-input');
  }

  /** Fill the search box and press Enter to filter products. */
  async searchProducts(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  /** Clear the search box and press Enter to reset filtering. */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // ── Filters ───────────────────────────────────────────────────────

  get categoryFilter(): Locator {
    return this.page.getByTestId('category-filter');
  }

  get sortFilter(): Locator {
    return this.page.getByTestId('sort-filter');
  }

  /** Select a category by clicking the custom dropdown and choosing an option. */
  async selectCategory(category: string): Promise<void> {
    await this.categoryFilter.click();
    await this.page.getByRole('option', { name: category }).click();
  }

  /** Select a sort option by clicking the custom dropdown and choosing an option. */
  async selectSort(sort: string): Promise<void> {
    await this.sortFilter.click();
    await this.page.getByRole('option', { name: sort }).click();
  }

  // ── Product Grid ──────────────────────────────────────────────────

  get productCards(): Locator {
    return this.page.locator('[data-testid^="product-card-"]');
  }

  /** Get a specific product card by its heading text. */
  productCard(name: string): Locator {
    return this.page.getByRole('article').filter({ hasText: name });
  }

  /** Get the "Add to cart" or product link inside a product card. */
  productLink(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  /** Locator that matches visible text within the product grid. */
  productTextMatch(text: string | RegExp): Locator {
    return this.page.getByText(text).first();
  }

  // ── Results Info ──────────────────────────────────────────────────

  /** Paragraph showing "Showing X of Y products (Page N of M)" */
  get resultsInfo(): Locator {
    return this.page.getByText(/Showing \d+ of \d+ products/);
  }

  // ── Pagination ────────────────────────────────────────────────────

  get paginationNav(): Locator {
    return this.page.getByTestId('pagination-prev').locator('..');
  }

  get previousPageButton(): Locator {
    return this.page.getByTestId('pagination-prev');
  }

  get nextPageButton(): Locator {
    return this.page.getByTestId('pagination-next');
  }

  /** Navigate to a specific page number. */
  async goToPage(pageNumber: number): Promise<void> {
    await this.page.getByTestId(`pagination-page-${pageNumber}`).click();
  }
}
