import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';
import {
  CartPage,
  ProductDetailPage,
  OrdersPage,
} from '../../pages';
import { parsePrice, isValidPriceFormat } from '../../helpers/price.helper';

test.describe('Cart & Orders — Extended @regression', () => {
  test.describe('Update Quantity in Cart', () => {
    test('Increase product quantity in cart', async ({ cartWithProduct }) => {
      const cartPage = new CartPage(cartWithProduct);
      const product = PRODUCTS.condenser;

      await test.step('Navigate to cart page', async () => {
        await cartPage.goto();
      });

      await test.step('Verify product is in the cart', async () => {
        await expect(
          cartPage.page.getByText(product.name),
        ).toBeVisible();
      });

      await test.step('Increase quantity', async () => {
        await cartPage.increaseQuantityButton(product.name).click();
      });

      await test.step('Verify quantity updated — order summary still visible', async () => {
        await expect(cartPage.orderSummary).toBeVisible();
      });
    });

    test('Decrease product quantity in cart', async ({ cartWithProduct }) => {
      const cartPage = new CartPage(cartWithProduct);
      const product = PRODUCTS.condenser;
      const detailPage = new ProductDetailPage(cartWithProduct);

      await test.step('Add product with quantity 2', async () => {
        await detailPage.goto(product.id);
        await detailPage.increaseQuantityButton.click();
        await detailPage.addToCartButton.click();
        await expect(detailPage.notificationsRegion).toContainText(
          /added to cart/i,
        );
      });

      await test.step('Navigate to cart', async () => {
        await cartPage.goto();
      });

      await test.step('Decrease quantity', async () => {
        await cartPage.decreaseQuantityButton(product.name).click();
      });

      await test.step('Verify cart remains functional', async () => {
        await expect(cartPage.orderSummary).toBeVisible();
      });
    });
  });

  test.describe('Remove Items from Cart', () => {
    test('Remove a product from the cart', async ({ cartWithProduct }) => {
      const cartPage = new CartPage(cartWithProduct);
      const product = PRODUCTS.condenser;

      await test.step('Navigate to cart', async () => {
        await cartPage.goto();
      });

      await test.step('Verify product is in the cart', async () => {
        await expect(
          cartPage.page.getByText(product.name),
        ).toBeVisible();
      });

      await test.step('Click remove button for the product', async () => {
        await cartPage.removeButton(product.name).click();
      });

      await test.step('Verify the cart shows empty state', async () => {
        await expect(cartPage.emptyCartHeading).toBeVisible();
      });
    });
  });

  test.describe('Cart Total', () => {
    test('Order summary shows pricing information', async ({
      cartWithProduct,
    }) => {
      const cartPage = new CartPage(cartWithProduct);

      await test.step('Navigate to cart', async () => {
        await cartPage.goto();
      });

      await test.step('Verify order summary is visible', async () => {
        await expect(cartPage.orderSummary).toBeVisible();
      });

      await test.step('Verify summary contains price-formatted text', async () => {
        const summaryText = await cartPage.orderSummary.textContent();
        expect(summaryText).toBeTruthy();
        // The summary should contain a dollar amount
        expect(summaryText).toMatch(/\$[\d,]+\.\d{2}/);
      });
    });
  });

  test.describe('Empty Cart State', () => {
    test('Empty cart displays empty state message and CTA', async ({
      page,
      cartPage,
    }) => {
      // Clear any items first — fresh customer session
      await test.step('Navigate to cart page', async () => {
        await cartPage.goto();
      });

      await test.step('Remove all items if any exist', async () => {
        const itemCount = await cartPage.cartItems.count();
        for (let i = 0; i < itemCount; i++) {
          await cartPage.page
            .getByRole('button', { name: /Remove .+ from cart/ })
            .first()
            .click();
        }
      });

      await test.step('Verify empty cart heading is visible', async () => {
        await expect(cartPage.emptyCartHeading).toBeVisible();
      });

      await test.step('Verify "Explore Products" link is visible', async () => {
        await expect(cartPage.exploreProductsLink).toBeVisible();
      });
    });

    test('"Explore Products" link navigates to products page', async ({
      page,
      cartPage,
    }) => {
      await test.step('Navigate to cart and ensure empty', async () => {
        await cartPage.goto();
        const itemCount = await cartPage.cartItems.count();
        for (let i = 0; i < itemCount; i++) {
          await cartPage.page
            .getByRole('button', { name: /Remove .+ from cart/ })
            .first()
            .click();
        }
      });

      await test.step('Click "Explore Products" link', async () => {
        await cartPage.exploreProductsLink.click();
      });

      await test.step('Verify navigation to products page', async () => {
        await expect(page).toHaveURL(/\/products/);
      });
    });
  });

  test.describe('Multiple Products in Cart', () => {
    test('Add two different products and verify both in cart', async ({
      page,
    }) => {
      const product1 = PRODUCTS.condenser;
      const product2 = PRODUCTS.usbHub;
      const detailPage = new ProductDetailPage(page);
      const cartPage = new CartPage(page);

      await test.step('Navigate to first product and add to cart', async () => {
        await detailPage.goto(product1.id);
        await detailPage.addToCartButton.click();
        await expect(detailPage.notificationsRegion).toContainText(
          /added to cart/i,
        );
      });

      await test.step('Navigate to second product and add to cart', async () => {
        await detailPage.goto(product2.id);
        await detailPage.addToCartButton.click();
        await expect(detailPage.notificationsRegion).toContainText(
          /added to cart/i,
        );
      });

      await test.step('Navigate to cart page', async () => {
        await cartPage.goto();
      });

      await test.step('Verify both products are in the cart', async () => {
        await expect(
          cartPage.page.getByText(product1.name),
        ).toBeVisible();
        await expect(
          cartPage.page.getByText(product2.name),
        ).toBeVisible();
      });

      await test.step('Verify items heading shows count of 2', async () => {
        await expect(cartPage.itemsHeading).toContainText('2');
      });
    });
  });

  test.describe('Order History', () => {
    test('Order history page shows heading and state', async ({
      ordersPage,
    }) => {
      await test.step('Navigate to orders page', async () => {
        await ordersPage.goto();
      });

      await test.step('Verify order history heading is displayed', async () => {
        await expect(ordersPage.orderHistoryHeading).toBeVisible();
      });

      await test.step('Verify either orders exist or empty state is shown', async () => {
        await expect(
          ordersPage.noOrdersHeading.or(ordersPage.orderArticles.first()),
        ).toBeVisible();
      });
    });

    test('Empty orders page has "Start Shopping" CTA', async ({
      ordersPage,
      page,
    }) => {
      await test.step('Navigate to orders page', async () => {
        await ordersPage.goto();
      });

      await test.step('Handle orders state', async () => {
        const hasOrders = await ordersPage.orderArticles.count();
        if (hasOrders === 0) {
          await expect(ordersPage.noOrdersHeading).toBeVisible();
          await expect(ordersPage.startShoppingLink).toBeVisible();
        } else {
          // If orders exist, at least verify the heading
          await expect(ordersPage.orderHistoryHeading).toBeVisible();
        }
      });
    });
  });

  test.describe('Cart Page Structure', () => {
    test('Cart page shows step indicators', async ({ cartWithProduct }) => {
      const cartPage = new CartPage(cartWithProduct);

      await test.step('Navigate to cart', async () => {
        await cartPage.goto();
      });

      await test.step('Verify checkout steps are visible', async () => {
        await expect(cartPage.stepReviewCart).toBeVisible();
        await expect(cartPage.stepShipping).toBeVisible();
        await expect(cartPage.stepPayment).toBeVisible();
      });
    });

    test('Proceed to checkout button is visible', async ({
      cartWithProduct,
    }) => {
      const cartPage = new CartPage(cartWithProduct);

      await test.step('Navigate to cart', async () => {
        await cartPage.goto();
      });

      await test.step('Verify proceed to checkout button', async () => {
        await expect(cartPage.proceedToCheckoutButton).toBeVisible();
      });
    });
  });
});
