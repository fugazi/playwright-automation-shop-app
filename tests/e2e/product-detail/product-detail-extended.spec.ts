import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';

test.describe('Product Detail — Extended @regression', () => {
  const product = PRODUCTS.microFreak;
  const secondProduct = PRODUCTS.studioMonitors;

  test.describe('Technical Specifications', () => {
    test('Specifications table renders for synthesizer product', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(product.id);
      });

      await test.step('Verify specification terms are displayed', async () => {
        await expect(productDetailPage.specTerms.first()).toBeVisible();
        const count = await productDetailPage.specTerms.count();
        expect(count).toBeGreaterThan(0);
      });

      await test.step('Verify specification definitions match terms', async () => {
        const termsCount = await productDetailPage.specTerms.count();
        const defsCount = await productDetailPage.specDefinitions.count();
        expect(defsCount).toBe(termsCount);
      });
    });

    test('Specifications table renders for studio recording product', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to different product type', async () => {
        await productDetailPage.goto(secondProduct.id);
      });

      await test.step('Verify specifications are present', async () => {
        await expect(productDetailPage.specTerms.first()).toBeVisible();
      });
    });
  });

  test.describe('Customer Reviews', () => {
    test('Reviews section displays reviewer info and ratings', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(product.id);
      });

      await test.step('Verify reviews section is visible', async () => {
        await expect(productDetailPage.reviewsRegion).toBeVisible();
      });

      await test.step('Verify review articles exist', async () => {
        const reviewCount =
          await productDetailPage.reviewArticles.count();
        expect(reviewCount).toBeGreaterThan(0);
      });

      await test.step('Verify first review contains text content', async () => {
        const firstReview = productDetailPage.reviewArticles.first();
        const text = await firstReview.textContent();
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(10);
      });
    });
  });

  test.describe('Share Buttons', () => {
    test.beforeEach(async ({ productDetailPage }) => {
      await productDetailPage.goto(product.id);
    });

    test('Facebook share button is visible', async ({
      productDetailPage,
    }) => {
      await test.step('Verify Facebook share button', async () => {
        await expect(
          productDetailPage.shareFacebookButton,
        ).toBeVisible();
      });
    });

    test('Twitter share button is visible', async ({
      productDetailPage,
    }) => {
      await test.step('Verify Twitter share button', async () => {
        await expect(
          productDetailPage.shareTwitterButton,
        ).toBeVisible();
      });
    });

    test('LinkedIn share button is visible', async ({
      productDetailPage,
    }) => {
      await test.step('Verify LinkedIn share button', async () => {
        await expect(
          productDetailPage.shareLinkedInButton,
        ).toBeVisible();
      });
    });

    test('WhatsApp share button is visible', async ({
      productDetailPage,
    }) => {
      await test.step('Verify WhatsApp share button', async () => {
        await expect(
          productDetailPage.shareWhatsAppButton,
        ).toBeVisible();
      });
    });

    test('Copy Link button is visible and functional', async ({
      productDetailPage,
    }) => {
      await test.step('Verify Copy Link button is visible', async () => {
        await expect(productDetailPage.copyLinkButton).toBeVisible();
      });

      await test.step('Click Copy Link button', async () => {
        await productDetailPage.copyLinkButton.click();
      });

      await test.step('Verify button interaction completed without error', async () => {
        // The copy action may show a brief toast or change button text
        // Verify the button is still visible after clicking (no crash)
        await expect(productDetailPage.copyLinkButton).toBeVisible();
      });
    });
  });

  test.describe('Favorites Button', () => {
    test('Add to favorites button is visible and clickable', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(product.id);
      });

      await test.step('Verify add to favorites button is visible', async () => {
        await expect(
          productDetailPage.addToFavoritesButton.first(),
        ).toBeVisible();
      });

      await test.step('Click add to favorites', async () => {
        await productDetailPage.addToFavoritesButton.first().click();
      });

      await test.step('Verify favorites interaction completed', async () => {
        // After clicking, the button may toggle state or show notification
        // Verify the page remains functional
        await expect(
          productDetailPage.addToFavoritesButton.first(),
        ).toBeVisible();
      });
    });
  });

  test.describe('Quantity Boundaries', () => {
    test.beforeEach(async ({ productDetailPage }) => {
      await productDetailPage.goto(product.id);
    });

    test('Quantity starts at 1 and decrease button is disabled at minimum', async ({
      productDetailPage,
    }) => {
      await test.step('Verify initial quantity is 1', async () => {
        await expect(productDetailPage.quantityInput).toHaveAttribute(
          'aria-valuenow',
          '1',
        );
      });

      await test.step('Verify decrease button is disabled at quantity 1', async () => {
        await expect(
          productDetailPage.decreaseQuantityButton,
        ).toBeDisabled();
      });

      await test.step('Verify quantity remains at 1', async () => {
        await expect(productDetailPage.quantityInput).toHaveAttribute(
          'aria-valuenow',
          '1',
        );
      });
    });

    test('Quantity can be increased to a high value', async ({
      productDetailPage,
    }) => {
      await test.step('Increase quantity to 5', async () => {
        for (let i = 0; i < 4; i++) {
          await productDetailPage.increaseQuantityButton.click();
        }
      });

      await test.step('Verify quantity is 5', async () => {
        await expect(productDetailPage.quantityInput).toHaveAttribute(
          'aria-valuenow',
          '5',
        );
      });
    });

    test('Increase then decrease returns to original value', async ({
      productDetailPage,
    }) => {
      await test.step('Increase quantity by 3', async () => {
        for (let i = 0; i < 3; i++) {
          await productDetailPage.increaseQuantityButton.click();
        }
        await expect(productDetailPage.quantityInput).toHaveAttribute(
          'aria-valuenow',
          '4',
        );
      });

      await test.step('Decrease quantity by 3', async () => {
        for (let i = 0; i < 3; i++) {
          await productDetailPage.decreaseQuantityButton.click();
        }
      });

      await test.step('Verify quantity is back to 1', async () => {
        await expect(productDetailPage.quantityInput).toHaveAttribute(
          'aria-valuenow',
          '1',
        );
      });
    });
  });

  test.describe('Continue Shopping', () => {
    test('"Continue Shopping" navigates back to products page', async ({
      productDetailPage,
      page,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(product.id);
      });

      await test.step('Click "Continue Shopping" button', async () => {
        await productDetailPage.continueShoppingButton.click();
      });

      await test.step('Verify navigation to products page', async () => {
        await expect(page).toHaveURL(/\/products/);
      });
    });
  });

  test.describe('Product Image', () => {
    test('Product detail page shows correct product image', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product page', async () => {
        await productDetailPage.goto(product.id);
      });

      await test.step('Verify product image is present with alt text', async () => {
        const img = productDetailPage.page.getByRole('img', {
          name: product.name,
        });
        await expect(img).toBeVisible();
      });
    });
  });
});
