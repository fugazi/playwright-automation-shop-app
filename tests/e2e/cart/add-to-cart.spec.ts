import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';
import { CartPage, ProductDetailPage } from '../../pages';

test.describe('Add to Cart @smoke', () => {
  test('Add product to cart from product detail page', async ({ page }) => {
    const product = PRODUCTS.condenser;
    const detailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    await test.step('Navigate to product detail page', async () => {
      await detailPage.goto(product.id);
    });

    await test.step('Click "Add to Cart" button', async () => {
      await detailPage.addToCartButton.click();
    });

    await test.step('Verify success notification appears', async () => {
      await expect(detailPage.notificationsRegion).toContainText(/added to cart/i);
    });

    await test.step('Navigate to cart page', async () => {
      await page.waitForLoadState('networkidle');
      await cartPage.goto();
    });

    await test.step('Verify the product appears in the cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
      await expect(cartPage.page.getByText(product.name)).toBeVisible();
    });
  });

  test('Add product with increased quantity from detail page', async ({ page }) => {
    const product = PRODUCTS.usbHub;
    const detailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);

    await test.step('Navigate to product detail page', async () => {
      await detailPage.goto(product.id);
    });

    await test.step('Increase quantity to 3', async () => {
      await detailPage.increaseQuantityButton.click();
      await detailPage.increaseQuantityButton.click();
      await expect(detailPage.quantityInput).toHaveAttribute('aria-valuenow', '3');
    });

    await test.step('Click "Add to Cart" button', async () => {
      await detailPage.addToCartButton.click();
    });

    await test.step('Navigate to cart and verify item is present', async () => {
      await cartPage.goto();
      await expect(cartPage.page.getByText(product.name)).toBeVisible();
    });
  });

  test('Cart page shows added items with correct info', async ({ cartWithProduct }) => {
    const cartPage = new CartPage(cartWithProduct);
    const product = PRODUCTS.condenser;

    await test.step('Navigate to cart page', async () => {
      await cartWithProduct.waitForLoadState('networkidle');
      await cartPage.goto();
    });

    await test.step('Verify checkout heading is displayed', async () => {
      await expect(cartPage.checkoutHeading).toBeVisible();
    });

    await test.step('Verify cart contains the added product', async () => {
      await expect(cartPage.page.getByText(product.name)).toBeVisible();
    });

    await test.step('Verify order summary section is visible', async () => {
      await expect(cartPage.orderSummary).toBeVisible();
    });
  });
});
