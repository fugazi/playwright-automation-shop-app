import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';

test.describe('Product Detail @smoke', () => {
  const product = PRODUCTS.microFreak;

  test.beforeEach(async ({ productDetailPage }) => {
    await productDetailPage.goto(product.id);
  });

  test('Product detail page loads with name, price, and image', async ({ productDetailPage }) => {
    await test.step('Verify product name heading is displayed', async () => {
      await expect(productDetailPage.productName).toHaveText(product.name);
    });

    await test.step('Verify product price is displayed', async () => {
      await expect(productDetailPage.productPrice).toHaveText(product.price);
    });

    await test.step('Verify product image is present', async () => {
      await expect(
        productDetailPage.page.getByRole('img', { name: product.name }),
      ).toBeVisible();
    });
  });

  test('Quantity selector works correctly', async ({ productDetailPage }) => {
    await test.step('Verify default quantity is 1', async () => {
      await expect(productDetailPage.quantityInput).toHaveAttribute('aria-valuenow', '1');
    });

    await test.step('Increase quantity using the button', async () => {
      await productDetailPage.increaseQuantityButton.click();
    });

    await test.step('Verify quantity increased to 2', async () => {
      await expect(productDetailPage.quantityInput).toHaveAttribute('aria-valuenow', '2');
    });

    await test.step('Decrease quantity back to 1', async () => {
      await productDetailPage.decreaseQuantityButton.click();
    });

    await test.step('Verify quantity is back to 1', async () => {
      await expect(productDetailPage.quantityInput).toHaveAttribute('aria-valuenow', '1');
    });
  });

  test('Specifications and reviews sections display', async ({ productDetailPage }) => {
    await test.step('Verify technical specifications are visible', async () => {
      await expect(productDetailPage.specTerms.first()).toBeVisible();
    });

    await test.step('Verify customer reviews section is visible', async () => {
      await expect(productDetailPage.reviewsRegion).toBeVisible();
    });

    await test.step('Verify at least one review article exists', async () => {
      await expect(productDetailPage.reviewArticles.first()).toBeVisible();
    });
  });
});
