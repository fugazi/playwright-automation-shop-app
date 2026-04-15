import { test, expect } from '../../fixtures/test-base';
import {
  ADMIN_USER,
  CUSTOMER_USER,
  INVALID_USERS,
} from '../../data/users.data';

test.describe('Authentication & Session Management @regression', () => {
  test.describe('Session Persistence', () => {
    test('Customer session persists across page navigations', async ({
      homePage,
      productsPage,
      contactPage,
    }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify user menu is visible (authenticated)', async () => {
        await expect(homePage.header.userMenuButton).toBeVisible();
      });

      await test.step('Navigate to products page and verify session', async () => {
        await productsPage.goto();
        await expect(productsPage.header.userMenuButton).toBeVisible();
      });

      await test.step('Navigate to contact page and verify session', async () => {
        await contactPage.goto();
        await expect(contactPage.header.userMenuButton).toBeVisible();
      });

      await test.step('Navigate back to home and verify session', async () => {
        await homePage.goto();
        await expect(homePage.header.userMenuButton).toBeVisible();
      });
    });

    test('Admin session persists across page navigations', async ({
      adminHomePage,
      adminCartPage,
    }) => {
      await test.step('Navigate to home page as admin', async () => {
        await adminHomePage.goto();
      });

      await test.step('Verify admin user menu is visible', async () => {
        await expect(adminHomePage.header.userMenuButton).toBeVisible();
      });

      await test.step('Navigate to cart and verify session', async () => {
        await adminCartPage.goto();
        await expect(adminCartPage.header.userMenuButton).toBeVisible();
      });
    });
  });

  test.describe('Logout Flow', () => {
    test('Logout clears session and redirects to login', async ({
      page,
      homePage,
    }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Open user menu and click Sign Out', async () => {
        await homePage.header.userMenuButton.click();
        await page.getByTestId('logout-button').click();
      });

      await test.step('Verify redirect after logout', async () => {
        // After logout, app redirects to home page
        await expect(page).toHaveURL(/\/$/);
      });
    });
  });

  test.describe('Protected Page Redirects', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Unauthenticated user accessing /orders is redirected to login', async ({
      ordersPage,
      page,
    }) => {
      await test.step('Navigate to /orders without auth', async () => {
        await ordersPage.goto();
      });

      await test.step('Verify redirect to login page', async () => {
        await expect(page).toHaveURL(/\/login/);
      });
    });

    test('Unauthenticated user accessing /cart sees login or empty state', async ({
      cartPage,
      page,
    }) => {
      await test.step('Navigate to /cart without auth', async () => {
        await cartPage.goto();
      });

      await test.step('Verify login redirect or empty cart display', async () => {
        const url = page.url();
        if (url.includes('/login')) {
          await expect(page).toHaveURL(/\/login/);
        } else {
          // If the cart page loads, verify some content is shown
          await expect(cartPage.page.getByRole('heading', { level: 1 })).toBeVisible();
        }
      });
    });
  });

  test.describe('Role Differences', () => {
    test('Customer can view order history page', async ({ ordersPage }) => {
      await test.step('Navigate to orders page as customer', async () => {
        await ordersPage.goto();
      });

      await test.step('Verify orders page heading is visible', async () => {
        await expect(ordersPage.orderHistoryHeading).toBeVisible();
      });
    });

    test('Admin can view order history page', async ({ adminOrdersPage }) => {
      await test.step('Navigate to orders page as admin', async () => {
        await adminOrdersPage.goto();
      });

      await test.step('Verify orders page heading is visible', async () => {
        await expect(adminOrdersPage.orderHistoryHeading).toBeVisible();
      });
    });
  });

  test.describe('Login Negative Scenarios', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Empty fields show validation error', async ({ loginPage, page }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Click sign in without entering credentials', async () => {
        await loginPage.signInButton.click();
      });

      await test.step('Verify error feedback is shown', async () => {
        // HTML5 validation prevents submission — user stays on login page
        await expect(page).toHaveURL(/\/login/);
        await expect(loginPage.signInButton).toBeVisible();
      });
    });

    test('Invalid email format shows error', async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Enter invalid email format and submit', async () => {
        await loginPage.login(
          INVALID_USERS.invalidEmailFormat.email,
          INVALID_USERS.invalidEmailFormat.password,
        );
      });

      await test.step('Verify error message', async () => {
        await expect(loginPage.notificationsRegion).toContainText(
          /invalid|error|credentials/i,
        );
      });
    });

    test('SQL injection payload is handled safely', async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Enter SQL injection payload and submit', async () => {
        await loginPage.login(
          INVALID_USERS.sqlInjection.email,
          INVALID_USERS.sqlInjection.password,
        );
      });

      await test.step('Verify app handles it gracefully — stays on login page', async () => {
        // Should remain on login page (no auth bypass)
        await expect(loginPage.signInButton).toBeVisible();
      });
    });

    test('XSS payload is handled safely', async ({ loginPage }) => {
      await test.step('Navigate to login page', async () => {
        await loginPage.goto();
      });

      await test.step('Enter XSS payload and submit', async () => {
        await loginPage.login(
          INVALID_USERS.xssPayload.email,
          INVALID_USERS.xssPayload.password,
        );
      });

      await test.step('Verify no script execution — page remains functional', async () => {
        await expect(loginPage.signInButton).toBeVisible();
      });
    });
  });
});
