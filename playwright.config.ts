import { defineConfig, devices } from '@playwright/test';

/**
 * Music-Tech Shop — Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://music-tech-shop.vercel.app',
    screenshot: 'off',
    video: 'off',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },

  expect: {
    timeout: 5_000,
  },

  projects: [
    /* ── Auth Setup ────────────────────────────────────────────────── */
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    /* ── Browser Projects ─────────────────────────────────────────── */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/customer.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/customer.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/customer.json',
      },
      dependencies: ['setup'],
    },
  ],
});
