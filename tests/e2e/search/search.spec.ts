import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS, CATALOG } from '../../data/products.data';
import { ProductsPage } from '../../pages';

// ── Search Test Constants ───────────────────────────────────────────

const KNOWN_PRODUCT = PRODUCTS.microFreak;
const PARTIAL_SEARCH_TERM = 'Camera';
const PRODUCTS_PAGE_SEARCH_TERM = 'Monitor';
const NON_EXISTENT_SEARCH_TERM = 'zzzznonexistentxyz';
const CATEGORY_SEARCH_TERM = 'Synthesizers';

test.describe('Search Functionality @regression', () => {
  test.describe('Header Search', () => {
    test('Search for a known product by name navigates to results', async ({
      homePage,
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Search for a known product', async () => {
        await homePage.header.search(KNOWN_PRODUCT.name);
      });

      await test.step('Verify navigation to products page with results', async () => {
        await expect(page).toHaveURL(/\/products/);
        await page.waitForLoadState('networkidle');
      });

      await test.step('Verify the searched product appears in results', async () => {
        await expect(
          productsPage.productTextMatch(KNOWN_PRODUCT.name),
        ).toBeVisible();
      });
    });

    test('Search for a partial product name returns results', async ({
      homePage,
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step(`Search with partial name "${PARTIAL_SEARCH_TERM}"`, async () => {
        await homePage.header.search(PARTIAL_SEARCH_TERM);
      });

      await test.step('Verify products page loads', async () => {
        await expect(page).toHaveURL(/\/products/);
        await page.waitForLoadState('networkidle');
      });

      await test.step('Verify at least one result is displayed', async () => {
        await expect(productsPage.productCards.first()).toBeVisible({
          timeout: 10_000,
        });
        const count = await productsPage.productCards.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Products Page Search', () => {
    test('Search box on products page filters results', async ({
      productsPage,
    }) => {
      await test.step('Navigate to products page', async () => {
        await productsPage.goto();
      });

      await test.step('Type product name in search box', async () => {
        await productsPage.searchProducts(PRODUCTS_PAGE_SEARCH_TERM);
      });

      await test.step('Verify results are filtered', async () => {
        const count = await productsPage.productCards.count();
        expect(count).toBeGreaterThan(0);
        await expect(
          productsPage.productTextMatch(/monitor/i),
        ).toBeVisible();
      });
    });

    test('Search with no results shows empty state', async ({
      productsPage,
    }) => {
      await test.step('Navigate to products page', async () => {
        await productsPage.goto();
      });

      await test.step('Search for a non-existent product', async () => {
        await productsPage.searchProducts(NON_EXISTENT_SEARCH_TERM);
      });

      await test.step('Verify no products or empty state message', async () => {
        await expect(productsPage.productCards).toHaveCount(0);
      });
    });

    test('Empty search shows all products', async ({ productsPage }) => {
      await test.step('Navigate to products page', async () => {
        await productsPage.goto();
      });

      await test.step('Search for a product first', async () => {
        await productsPage.searchProducts(PARTIAL_SEARCH_TERM);
      });

      await test.step('Clear search and submit', async () => {
        await productsPage.clearSearch();
      });

      await test.step('Verify all products on page 1 are shown', async () => {
        await expect(productsPage.productCards).toHaveCount(
          CATALOG.page1Count,
        );
      });
    });
  });

  test.describe('Search by Category Name', () => {
    test(`Search for category "${CATEGORY_SEARCH_TERM}" returns relevant results`, async ({
      homePage,
      page,
    }) => {
      const productsPage = new ProductsPage(page);

      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step(`Search for "${CATEGORY_SEARCH_TERM}"`, async () => {
        await homePage.header.search(CATEGORY_SEARCH_TERM);
      });

      await test.step('Verify products page loads with results', async () => {
        await expect(page).toHaveURL(/\/products/);
        await page.waitForLoadState('networkidle');
        await expect(productsPage.productCards.first()).toBeVisible({
          timeout: 10_000,
        });
        const count = await productsPage.productCards.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });
});
