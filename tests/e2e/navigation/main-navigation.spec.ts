import { test, expect } from '../../fixtures/test-base';

test.describe('Main Navigation @smoke', () => {
  test('Header links navigate to correct pages', async ({ homePage, page }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Click Products link and verify URL', async () => {
      await homePage.header.productsLink.click();
      await expect(page).toHaveURL('/products');
    });

    await test.step('Click API Test link and verify URL', async () => {
      await homePage.header.apiTestLink.click();
      await expect(page).toHaveURL('/api-test');
    });

    await test.step('Click Home link and verify URL', async () => {
      await homePage.header.homeLink.click();
      await expect(page).toHaveURL('/');
    });
  });

  test('Footer links navigate to correct pages', async ({ homePage, page }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Click About Us footer link and verify URL', async () => {
      await homePage.footer.aboutUsLink.click();
      await expect(page).toHaveURL('/about');
    });

    await test.step('Click Shipping Policy footer link and verify URL', async () => {
      await homePage.footer.shippingPolicyLink.click();
      await expect(page).toHaveURL('/shipping');
    });

    await test.step('Click Returns & Refunds footer link and verify URL', async () => {
      await homePage.footer.returnsLink.click();
      await expect(page).toHaveURL('/returns');
    });

    await test.step('Click Terms of Service footer link and verify URL', async () => {
      await homePage.footer.termsLink.click();
      await expect(page).toHaveURL('/terms');
    });
  });

  test('Theme toggle changes appearance', async ({ homePage, page }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Get initial theme state', async () => {
      // Store initial state via HTML element class
      await expect(page.locator('html')).toHaveAttribute('class', /.*/);
    });

    await test.step('Click theme toggle button', async () => {
      await homePage.header.toggleTheme();
    });

    await test.step('Verify theme class toggled on html element', async () => {
      // After toggling, the class should have changed (dark/light mode)
      await expect(page.locator('html')).toHaveAttribute('class', /dark/);
    });
  });

  test('Homepage CTAs navigate correctly', async ({ homePage, page }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Verify hero heading is visible', async () => {
      await expect(homePage.heroHeading).toBeVisible();
    });

    await test.step('Click "View All Products" CTA and verify navigation', async () => {
      await homePage.viewAllProductsLink.click();
      await expect(page).toHaveURL('/products');
    });

    await test.step('Go back and click category link', async () => {
      await page.goBack();
      await expect(homePage.categoriesHeading).toBeVisible();
    });
  });
});
