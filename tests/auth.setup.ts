import { test as setup, expect } from '@playwright/test';

const ADMIN_AUTH_FILE = 'playwright/.auth/admin.json';
const CUSTOMER_AUTH_FILE = 'playwright/.auth/customer.json';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');

  // Use the quick-login admin button (first "Use This Account")
  await page.getByRole('button', { name: 'Use This Account' }).first().click();
  await page.getByRole('button', { name: 'Sign in to your account' }).click();

  // Wait until the login redirect completes and the user is authenticated
  await expect(page).not.toHaveURL(/\/login/);

  // Save signed-in state
  await page.context().storageState({ path: ADMIN_AUTH_FILE });
});

setup('authenticate as customer', async ({ page }) => {
  await page.goto('/login');

  // Use the quick-login customer button (second "Use This Account")
  await page.getByRole('button', { name: 'Use This Account' }).nth(1).click();
  await page.getByRole('button', { name: 'Sign in to your account' }).click();

  // Wait until the login redirect completes and the user is authenticated
  await expect(page).not.toHaveURL(/\/login/);

  // Save signed-in state
  await page.context().storageState({ path: CUSTOMER_AUTH_FILE });
});
