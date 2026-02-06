import { test, expect } from '../../fixtures/test-base';
import {
  ADMIN_USER,
  CUSTOMER_USER,
  INVALID_USERS,
} from '../../data/users.data';

test.describe('Login @smoke', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Successful login with customer credentials', async ({ loginPage, page }) => {
    await test.step('Fill customer credentials and submit', async () => {
      await loginPage.login(CUSTOMER_USER.email, CUSTOMER_USER.password);
    });

    await test.step('Verify redirect to home page after login', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('Successful login with admin credentials', async ({ loginPage, page }) => {
    await test.step('Fill admin credentials and submit', async () => {
      await loginPage.login(ADMIN_USER.email, ADMIN_USER.password);
    });

    await test.step('Verify redirect to home page after login', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('Login with test credential quick-login buttons', async ({ loginPage, page }) => {
    await test.step('Click "Use This Account" for customer and submit', async () => {
      await loginPage.loginAsCustomer();
    });

    await test.step('Verify redirect to home page after quick login', async () => {
      await expect(page).toHaveURL('/');
    });
  });

  test('Invalid credentials show error', async ({ loginPage }) => {
    await test.step('Submit with wrong password', async () => {
      await loginPage.login(
        INVALID_USERS.wrongPassword.email,
        INVALID_USERS.wrongPassword.password,
      );
    });

    await test.step('Verify error message is displayed in notifications', async () => {
      await expect(loginPage.notificationsRegion).toContainText(/invalid credentials/i);
    });
  });

  test('Guest continue redirects to home', async ({ loginPage, page }) => {
    await test.step('Click "Continue as Guest" link', async () => {
      await loginPage.continueAsGuestLink.click();
    });

    await test.step('Verify redirect to home page', async () => {
      await expect(page).toHaveURL('/');
    });
  });
});
