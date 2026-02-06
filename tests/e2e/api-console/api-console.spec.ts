import { test, expect } from '../../fixtures/test-base';
import { ADMIN_USER } from '../../data/users.data';

test.describe('API Testing Console @regression', () => {
  test.beforeEach(async ({ apiTestPage }) => {
    await apiTestPage.goto();
  });

  test.describe('Page Structure', () => {
    test('API console page displays heading and config fields', async ({
      apiTestPage,
    }) => {
      await test.step('Verify page heading', async () => {
        await expect(apiTestPage.consoleHeading).toBeVisible();
      });

      await test.step('Verify email input is visible', async () => {
        await expect(apiTestPage.emailInput).toBeVisible();
      });

      await test.step('Verify password input is visible', async () => {
        await expect(apiTestPage.passwordInput).toBeVisible();
      });
    });

    test('Product and search config fields are visible', async ({
      apiTestPage,
    }) => {
      await test.step('Verify Product ID input is visible', async () => {
        await expect(apiTestPage.productIdInput).toBeVisible();
      });

      await test.step('Verify Quantity input is visible', async () => {
        await expect(apiTestPage.quantityInput).toBeVisible();
      });

      await test.step('Verify Search Term input is visible', async () => {
        await expect(apiTestPage.searchTermInput).toBeVisible();
      });

      await test.step('Verify Category input is visible', async () => {
        await expect(apiTestPage.categoryInput).toBeVisible();
      });
    });
  });

  test.describe('Test Group Accordions', () => {
    test('Authentication test group accordion is functional', async ({
      apiTestPage,
    }) => {
      await test.step('Verify auth tests accordion is visible', async () => {
        await expect(apiTestPage.authTestsAccordion).toBeVisible();
      });

      await test.step('Verify login button is visible (auth section expanded by default)', async () => {
        await expect(apiTestPage.loginButton).toBeVisible();
      });
    });

    test('Product test group accordion is functional', async ({
      apiTestPage,
    }) => {
      await test.step('Verify product tests accordion is visible', async () => {
        await expect(apiTestPage.productTestsAccordion).toBeVisible();
      });

      await test.step('Verify product buttons are visible (product section expanded by default)', async () => {
        await expect(apiTestPage.getProductsButton).toBeVisible();
        await expect(apiTestPage.getProductButton).toBeVisible();
      });
    });

    test('All test group accordions are present', async ({
      apiTestPage,
    }) => {
      await test.step('Verify all 5 accordion groups exist', async () => {
        await expect(apiTestPage.authTestsAccordion).toBeVisible();
        await expect(apiTestPage.productTestsAccordion).toBeVisible();
        await expect(apiTestPage.cartTestsAccordion).toBeVisible();
        await expect(apiTestPage.orderTestsAccordion).toBeVisible();
        await expect(apiTestPage.utilityTestsAccordion).toBeVisible();
      });
    });
  });

  test.describe('Authentication API Actions', () => {
    test('Login API returns response', async ({ apiTestPage }) => {
      await test.step('Enter credentials', async () => {
        await apiTestPage.emailInput.fill(ADMIN_USER.email);
        await apiTestPage.passwordInput.fill(ADMIN_USER.password);
      });

      await test.step('Click Login button', async () => {
        await apiTestPage.loginButton.click();
      });

      await test.step('Verify response is displayed', async () => {
        await expect(apiTestPage.responseHeading).toBeVisible({
          timeout: 10_000,
        });
      });
    });

    test('Get User API action is available', async ({ apiTestPage }) => {
      await test.step('Verify Get User button exists', async () => {
        await expect(apiTestPage.getUserButton).toBeVisible();
      });
    });

    test('Logout API action is available', async ({ apiTestPage }) => {
      await test.step('Verify Logout button exists', async () => {
        await expect(apiTestPage.logoutButton).toBeVisible();
      });
    });
  });

  test.describe('Product API Actions', () => {
    test('Get Products API returns response', async ({ apiTestPage }) => {
      await test.step('Click Get Products button', async () => {
        await apiTestPage.getProductsButton.click();
      });

      await test.step('Verify response is displayed', async () => {
        await expect(apiTestPage.responseHeading).toBeVisible({
          timeout: 10_000,
        });
      });
    });

    test('Get Product by ID returns response', async ({ apiTestPage }) => {
      await test.step('Enter product ID', async () => {
        await apiTestPage.productIdInput.fill('1');
      });

      await test.step('Click Get Product button', async () => {
        await apiTestPage.getProductButton.click();
      });

      await test.step('Verify response is displayed', async () => {
        await expect(apiTestPage.responseHeading).toBeVisible({
          timeout: 10_000,
        });
      });
    });
  });
});
