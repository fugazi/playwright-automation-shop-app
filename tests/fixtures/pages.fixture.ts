import { test as base, type Page } from '@playwright/test';
import {
  HomePage,
  LoginPage,
  ProductsPage,
  ProductDetailPage,
  CartPage,
  OrdersPage,
  ContactPage,
  ShippingPage,
  AboutPage,
  ReturnsPage,
  TermsPage,
  ApiTestPage,
} from '../pages';

/**
 * Page Object fixtures — pre-instantiated page objects for cleaner tests.
 *
 * Usage:
 *   test('example', async ({ homePage }) => {
 *     await homePage.goto();
 *   });
 */

export type PageFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  ordersPage: OrdersPage;
  contactPage: ContactPage;
  shippingPage: ShippingPage;
  aboutPage: AboutPage;
  returnsPage: ReturnsPage;
  termsPage: TermsPage;
  apiTestPage: ApiTestPage;
};

export const pagesTest = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  shippingPage: async ({ page }, use) => {
    await use(new ShippingPage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  returnsPage: async ({ page }, use) => {
    await use(new ReturnsPage(page));
  },
  termsPage: async ({ page }, use) => {
    await use(new TermsPage(page));
  },
  apiTestPage: async ({ page }, use) => {
    await use(new ApiTestPage(page));
  },
});
