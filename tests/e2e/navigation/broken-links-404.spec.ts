import { test, expect } from '../../fixtures/test-base';

test.describe('Broken Links & 404 Handling @regression', () => {
  test('Footer "Privacy Policy" link leads to 404 or handled state', async ({
    homePage,
    page,
  }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Click Privacy Policy link in footer', async () => {
      await homePage.footer.privacyPolicyLink.click();
    });

    await test.step('Verify 404 page or error state is shown', async () => {
      await expect(page).toHaveURL(/\/privacy/);
      // The page should show a 404 message or "not found" content
      await expect(
        page
          .getByText(/404|not found|page doesn.?t exist|coming soon/i)
          .first(),
      ).toBeVisible();
    });
  });

  test('Footer "Cookie Settings" link navigates to cookies page', async ({
    homePage,
    page,
  }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.goto();
    });

    await test.step('Verify Cookie Settings link is visible', async () => {
      await expect(homePage.footer.cookieSettingsLink).toBeVisible();
    });

    await test.step('Click Cookie Settings link', async () => {
      await homePage.footer.cookieSettingsLink.click();
    });

    await test.step('Verify navigation to /cookies and page content', async () => {
      await expect(page).toHaveURL(/\/cookies/);
      // The cookies page may show 404 or actual cookie settings
      await expect(
        page
          .getByText(/404|not found|cookie|settings|preferences/i)
          .first(),
      ).toBeVisible();
    });
  });

  test('Non-existent product ID shows error handling', async ({ page }) => {
    await test.step('Navigate to a non-existent product', async () => {
      await page.goto('/products/99999');
    });

    await test.step('Verify error state or 404 content', async () => {
      await expect(
        page
          .getByText(
            /not found|404|doesn.?t exist|error|no product/i,
          )
          .first(),
      ).toBeVisible();
    });
  });

  test('Non-existent route shows 404 page', async ({ page }) => {
    await test.step('Navigate to a completely invalid route', async () => {
      await page.goto('/this-page-does-not-exist');
    });

    await test.step('Verify 404 page is displayed', async () => {
      await expect(
        page
          .getByText(/404|not found|page doesn.?t exist/i)
          .first(),
      ).toBeVisible();
    });
  });

  test('Non-existent nested route shows 404', async ({ page }) => {
    await test.step('Navigate to a deeply nested invalid route', async () => {
      await page.goto('/products/category/does-not-exist');
    });

    await test.step('Verify 404 or error state', async () => {
      await expect(
        page
          .getByText(/404|not found|page doesn.?t exist|error/i)
          .first(),
      ).toBeVisible();
    });
  });
});
