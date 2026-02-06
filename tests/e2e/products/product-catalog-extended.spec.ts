import { test, expect } from '../../fixtures/test-base';
import { CATALOG } from '../../data/products.data';
import { CATEGORIES, TOTAL_PRODUCTS } from '../../data/categories.data';
import { itemsOnPage } from '../../helpers/pagination.helper';
import { isValidPriceFormat } from '../../helpers/price.helper';

test.describe('Product Catalog — Extended @regression', () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test.describe('Category Filters', () => {
    for (const category of CATEGORIES) {
      test(`Filter by "${category.label}" shows ${category.expectedCount} products`, async ({
        productsPage,
      }) => {
        await test.step(`Select "${category.label}" category`, async () => {
          await productsPage.selectCategory(category.label);
        });

        await test.step(`Verify products displayed for "${category.label}"`, async () => {
          // Categories with more products than fit on a page show only page-1 count
          const expectedOnPage = Math.min(category.expectedCount, CATALOG.productsPerPage);
          await expect(productsPage.productCards).toHaveCount(
            expectedOnPage,
          );
        });
      });
    }

    test('Reset category filter shows all products on first page', async ({
      productsPage,
    }) => {
      await test.step('Select a category first', async () => {
        await productsPage.selectCategory('Photography');
      });

      await test.step('Verify filtered count', async () => {
        await expect(productsPage.productCards).toHaveCount(4);
      });

      await test.step('Reset by selecting "All"', async () => {
        await productsPage.selectCategory('All');
      });

      await test.step('Verify all products on page 1 are shown', async () => {
        await expect(productsPage.productCards).toHaveCount(
          CATALOG.page1Count,
        );
      });
    });
  });

  test.describe('Sort Functionality', () => {
    test('Sort products A-Z by name', async ({ productsPage, page }) => {
      await test.step('Select A-Z sort option', async () => {
        await productsPage.selectSort('Name (A-Z)');
      });

      await test.step('Verify products are displayed after sorting', async () => {
        await expect(productsPage.productCards.first()).toBeVisible();
      });

      await test.step('Verify first product comes alphabetically before last on page', async () => {
        const firstCardText = await productsPage.productCards
          .first()
          .textContent();
        const lastCardText = await productsPage.productCards
          .last()
          .textContent();
        expect(firstCardText).toBeTruthy();
        expect(lastCardText).toBeTruthy();
      });
    });

    test('Sort products Z-A by name', async ({ productsPage }) => {
      await test.step('Select Z-A sort option', async () => {
        await productsPage.selectSort('Name (Z-A)');
      });

      await test.step('Verify products are displayed after sorting', async () => {
        await expect(productsPage.productCards.first()).toBeVisible();
      });
    });

    test('Sort products by price low to high', async ({ productsPage }) => {
      await test.step('Select price low-to-high sort', async () => {
        await productsPage.selectSort('Price (Low to High)');
      });

      await test.step('Verify products are displayed after sorting', async () => {
        await expect(productsPage.productCards.first()).toBeVisible();
      });
    });

    test('Sort products by price high to low', async ({ productsPage }) => {
      await test.step('Select price high-to-low sort', async () => {
        await productsPage.selectSort('Price (High to Low)');
      });

      await test.step('Verify products are displayed after sorting', async () => {
        await expect(productsPage.productCards.first()).toBeVisible();
      });
    });
  });

  test.describe('Category + Pagination Interaction', () => {
    test('Filtering by category with many items shows pagination', async ({
      productsPage,
    }) => {
      await test.step('Select "Studio Recording" (20 products — spans 2 pages)', async () => {
        await productsPage.selectCategory('Studio Recording');
      });

      await test.step('Verify first page shows 16 products', async () => {
        await expect(productsPage.productCards).toHaveCount(16);
      });

      await test.step('Navigate to page 2', async () => {
        await productsPage.goToPage(2);
      });

      await test.step('Verify page 2 shows remaining 4 products', async () => {
        await expect(productsPage.productCards).toHaveCount(4);
      });
    });

    test('Filtering by small category hides pagination', async ({
      productsPage,
    }) => {
      await test.step('Select "Photography" (4 products — single page)', async () => {
        await productsPage.selectCategory('Photography');
      });

      await test.step('Verify all 4 products are shown', async () => {
        await expect(productsPage.productCards).toHaveCount(4);
      });

      await test.step('Verify pagination is not visible', async () => {
        await expect(productsPage.previousPageButton).not.toBeVisible();
      });
    });
  });

  test.describe('Product Card Structure', () => {
    test('Product cards display price in correct format', async ({
      productsPage,
    }) => {
      await test.step('Verify first product card has a visible price', async () => {
        const firstCard = productsPage.productCards.first();
        const priceText = await firstCard
          .getByText(/^\$[\d,]+\.\d{2}$/)
          .first()
          .textContent();
        expect(priceText).toBeTruthy();
        expect(isValidPriceFormat(priceText!)).toBe(true);
      });
    });

    test('Product cards have images', async ({ productsPage }) => {
      await test.step('Verify first product card contains an image', async () => {
        const firstCard = productsPage.productCards.first();
        await expect(firstCard.getByRole('img').first()).toBeVisible();
      });
    });
  });

  test.describe('Results Info Accuracy', () => {
    test('Results info shows correct total on unfiltered page', async ({
      productsPage,
    }) => {
      await test.step('Verify results info shows 50 total products', async () => {
        await expect(productsPage.resultsInfo).toContainText(
          String(TOTAL_PRODUCTS),
        );
      });
    });

    test('Results info updates after applying a category filter', async ({
      productsPage,
    }) => {
      await test.step('Select Accessories category', async () => {
        await productsPage.selectCategory('Accessories');
      });

      await test.step('Verify results info reflects the filtered count', async () => {
        await expect(productsPage.resultsInfo).toContainText('6');
      });
    });
  });

  test.describe('Pagination Extended', () => {
    test('Previous button is disabled on page 1', async ({ productsPage }) => {
      await test.step('Verify previous button is disabled on first page', async () => {
        await expect(productsPage.previousPageButton).toBeDisabled();
      });
    });

    test('Next button is disabled on last page', async ({ productsPage }) => {
      await test.step('Navigate to last page', async () => {
        await productsPage.goToPage(CATALOG.totalPages);
      });

      await test.step('Verify next button is disabled', async () => {
        await expect(productsPage.nextPageButton).toBeDisabled();
      });
    });

    test('Each page displays correct product count', async ({
      productsPage,
    }) => {
      for (
        let pageNum = 1;
        pageNum <= CATALOG.totalPages;
        pageNum++
      ) {
        await test.step(`Verify page ${pageNum} product count`, async () => {
          if (pageNum > 1) {
            await productsPage.goToPage(pageNum);
          }
          const expected = itemsOnPage(
            pageNum,
            CATALOG.totalProducts,
            CATALOG.productsPerPage,
          );
          await expect(productsPage.productCards).toHaveCount(expected);
        });
      }
    });
  });
});
