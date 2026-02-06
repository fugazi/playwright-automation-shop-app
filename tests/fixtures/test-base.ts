import { test as base, expect } from '@playwright/test';
import { mergeTests } from '@playwright/test';
import { authTest, type AuthFixtures } from './auth.fixture';
import { pagesTest, type PageFixtures } from './pages.fixture';
import { cartTest, type CartFixtures } from './cart.fixture';

/**
 * Central test export combining all custom fixtures.
 *
 * Usage in test files:
 *   import { test, expect } from '../fixtures/test-base';
 *
 * Available fixtures:
 *   - Page Objects:   homePage, loginPage, productsPage, productDetailPage,
 *                     cartPage, ordersPage, contactPage, shippingPage,
 *                     aboutPage, returnsPage, termsPage, apiTestPage
 *   - Auth:           adminPage, customerPage
 *   - Cart:           cartWithProduct
 */

export const test = mergeTests(authTest, pagesTest, cartTest);
export { expect };
