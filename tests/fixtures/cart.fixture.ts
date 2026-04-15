import { test as base, expect, type Page } from '@playwright/test';
import { AUTH_STATE } from '../data/users.data';
import { PRODUCTS } from '../data/products.data';
import { ProductDetailPage, CartPage } from '../pages';

/**
 * Cart & product-detail fixtures — provide pre-configured pages for
 * cart management, order, and product-detail tests.
 *
 * Uses the customer storage state so the user is authenticated.
 */

export type CartFixtures = {
  /** A page (customer-authenticated) with one product in the cart. */
  cartWithProduct: Page;
  /** CartPage (customer-authenticated) with one product already in the cart. */
  cartPageWithProduct: CartPage;
  /** ProductDetailPage (customer-authenticated) navigated to a known product. */
  productDetailPageWithProduct: ProductDetailPage;
};

export const cartTest = base.extend<CartFixtures>({
  cartWithProduct: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();

    // Navigate to a known product and add it to the cart
    const detailPage = new ProductDetailPage(page);
    await detailPage.goto(PRODUCTS.condenser.id);
    await detailPage.addToCartButton.click();

    // Wait for the add-to-cart notification before yielding
    await expect(detailPage.notificationsRegion).toContainText(
      /added to cart/i,
    );

    await use(page);
    await context.close();
  },

  cartPageWithProduct: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();

    const detailPage = new ProductDetailPage(page);
    await detailPage.goto(PRODUCTS.condenser.id);
    await detailPage.addToCartButton.click();
    await expect(detailPage.notificationsRegion).toContainText(
      /added to cart/i,
    );

    await use(new CartPage(page));
    await context.close();
  },

  productDetailPageWithProduct: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();

    const detailPage = new ProductDetailPage(page);
    await detailPage.goto(PRODUCTS.condenser.id);

    await use(detailPage);
    await context.close();
  },
});
