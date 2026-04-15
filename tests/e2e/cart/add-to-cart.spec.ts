import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';

test.describe('Add to Cart @smoke', () => {
  test('Add product to cart from product detail page', async ({
    productDetailPage,
    cartPage,
    page,
  }) => {
    const product = PRODUCTS.condenser;

    await test.step('Navigate to product detail page', async () => {
      await productDetailPage.goto(product.id);
    });

    await test.step('Click "Add to Cart" button', async () => {
      await productDetailPage.addToCartButton.click();
    });

    await test.step('Verify success notification appears', async () => {
      await expect(productDetailPage.notificationsRegion).toContainText(/added to cart/i);
    });

    await test.step('Navigate to cart page', async () => {
      await cartPage.goto();
    });

    await test.step('Verify the product appears in the cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.page.getByText(product.name)).toBeVisible();
    });
  });

  test('Add product with increased quantity from detail page', async ({
    productDetailPage,
    cartPage,
    page,
  }) => {
    const product = PRODUCTS.usbHub;

    await test.step('Navigate to product detail page', async () => {
      await productDetailPage.goto(product.id);
    });

    await test.step('Increase quantity to 3', async () => {
      await productDetailPage.increaseQuantityButton.click();
      await productDetailPage.increaseQuantityButton.click();
      await expect(productDetailPage.quantityInput).toHaveAttribute('aria-valuenow', '3');
    });

    await test.step('Click "Add to Cart" button', async () => {
      await productDetailPage.addToCartButton.click();
    });

    await test.step('Navigate to cart and verify item is present', async () => {
      await cartPage.goto();
      await expect(cartPage.page.getByText(product.name)).toBeVisible();
    });
  });

  test('Cart page shows added items with correct info', async ({
    cartPageWithProduct,
  }) => {
    const product = PRODUCTS.condenser;

    await test.step('Navigate to cart page', async () => {
      await cartPageWithProduct.goto();
    });

    await test.step('Verify checkout heading is displayed', async () => {
      await expect(cartPageWithProduct.checkoutHeading).toBeVisible();
    });

    await test.step('Verify cart contains the added product', async () => {
      await expect(cartPageWithProduct.page.getByText(product.name)).toBeVisible();
    });

    await test.step('Verify order summary section is visible', async () => {
      await expect(cartPageWithProduct.orderSummary).toBeVisible();
    });
  });
});
