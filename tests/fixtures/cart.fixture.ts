import { test as base, type Page } from '@playwright/test';
import { AUTH_STATE } from '../data/users.data';
import { PRODUCTS } from '../data/products.data';
import { ProductDetailPage, CartPage } from '../pages';

/**
 * Cart fixture — provides a page with a product already added to the cart.
 *
 * Useful as a precondition for cart management and order tests.
 * Uses the customer storage state so the user is authenticated.
 */

export type CartFixtures = {
  /** A page (customer-authenticated) with one product in the cart. */
  cartWithProduct: Page;
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

    await use(page);
    await context.close();
  },
});
