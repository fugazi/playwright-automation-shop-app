import { test as base, type Page } from '@playwright/test';
import { AUTH_STATE } from '../data/users.data';
import { HomePage, CartPage, OrdersPage } from '../pages';

/**
 * Authentication fixtures for Music-Tech Shop.
 *
 * Provides two approaches:
 * 1. **storageState** (preferred) — `playwright.config.ts` projects set
 *    `storageState` so every test in a project is pre-authenticated.
 * 2. **Per-test fixtures** — `adminPage` and `customerPage` give a
 *    live-login `Page` when a test needs a specific role that differs
 *    from the project default.
 * 3. **Auth-scoped POM fixtures** — pre-instantiated page objects on
 *    authenticated contexts (`adminHomePage`, `customerCartPage`, etc.).
 */

export type AuthFixtures = {
  /** A page logged in as the admin user via UI. */
  adminPage: Page;
  /** A page logged in as the customer user via UI. */
  customerPage: Page;
  /** HomePage on an admin-authenticated context. */
  adminHomePage: HomePage;
  /** HomePage on a customer-authenticated context. */
  customerHomePage: HomePage;
  /** CartPage on an admin-authenticated context. */
  adminCartPage: CartPage;
  /** OrdersPage on an admin-authenticated context. */
  adminOrdersPage: OrdersPage;
  /** OrdersPage on a customer-authenticated context. */
  customerOrdersPage: OrdersPage;
};

export const authTest = base.extend<AuthFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.admin,
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  customerPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  adminHomePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.admin,
    });
    const page = await context.newPage();
    await use(new HomePage(page));
    await context.close();
  },

  customerHomePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();
    await use(new HomePage(page));
    await context.close();
  },

  adminCartPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.admin,
    });
    const page = await context.newPage();
    await use(new CartPage(page));
    await context.close();
  },

  adminOrdersPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.admin,
    });
    const page = await context.newPage();
    await use(new OrdersPage(page));
    await context.close();
  },

  customerOrdersPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: AUTH_STATE.customer,
    });
    const page = await context.newPage();
    await use(new OrdersPage(page));
    await context.close();
  },
});
