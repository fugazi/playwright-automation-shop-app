import { test, expect } from '../../fixtures/test-base';
import { CATALOG } from '../../data/products.data';
import { CATEGORIES } from '../../data/categories.data';

test.describe('Product Catalog @smoke', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test('Products page loads with correct product count per page', async ({ productsPage }) => {
    await test.step('Verify first page displays 16 product cards', async () => {
      await expect(productsPage.productCards).toHaveCount(CATALOG.page1Count);
    });

    await test.step('Verify results info shows total of 50 products', async () => {
      await expect(productsPage.resultsInfo).toContainText(
        String(CATALOG.totalProducts),
      );
    });
  });

  test('Category filter shows correct results', async ({ productsPage }) => {
    const category = CATEGORIES[0]; // Electronics — 8 products

    await test.step(`Select "${category.label}" category filter`, async () => {
      await productsPage.selectCategory(category.label);
    });

    await test.step(`Verify ${category.expectedCount} products are displayed`, async () => {
      await expect(productsPage.productCards).toHaveCount(
        category.expectedCount,
      );
    });
  });

  test('Pagination navigates between pages', async ({ productsPage, page }) => {
    await test.step('Verify pagination navigation is visible', async () => {
      await expect(productsPage.paginationNav).toBeVisible();
    });

    await test.step('Navigate to page 2', async () => {
      await productsPage.goToPage(2);
    });

    await test.step('Verify page 2 displays correct product count', async () => {
      await expect(productsPage.productCards).toHaveCount(CATALOG.page2Count);
    });

    await test.step('Navigate to last page', async () => {
      await productsPage.goToPage(CATALOG.totalPages);
    });

    await test.step('Verify last page displays remaining products', async () => {
      await expect(productsPage.productCards).toHaveCount(CATALOG.page4Count);
    });
  });
});
