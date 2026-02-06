import { test as base, type Page } from '@playwright/test';
import { AUTH_STATE, ADMIN_USER, CUSTOMER_USER } from '../data/users.data';
import { LoginPage } from '../pages';

/**
 * Authentication fixtures for Music-Tech Shop.
 *
 * Provides two approaches:
 * 1. **storageState** (preferred) — `playwright.config.ts` projects set
 *    `storageState` so every test in a project is pre-authenticated.
 * 2. **Per-test fixtures** — `adminPage` and `customerPage` give a
 *    live-login `Page` when a test needs a specific role that differs
 *    from the project default.
 */

export type AuthFixtures = {
  /** A page logged in as the admin user via UI. */
  adminPage: Page;
  /** A page logged in as the customer user via UI. */
  customerPage: Page;
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
});
