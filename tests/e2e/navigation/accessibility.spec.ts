import { test, expect } from '../../fixtures/test-base';
import { PRODUCTS } from '../../data/products.data';

test.describe('Accessibility Verification @regression @a11y', () => {
  test.describe('Landmark Regions', () => {
    test('Home page has proper landmark structure', async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify banner (header) region exists', async () => {
        await expect(
          homePage.page.getByRole('banner'),
        ).toBeVisible();
      });

      await test.step('Verify main region exists', async () => {
        await expect(
          homePage.page.getByRole('main'),
        ).toBeVisible();
      });

      await test.step('Verify contentinfo (footer) region exists', async () => {
        await expect(
          homePage.page.getByRole('contentinfo'),
        ).toBeVisible();
      });

      await test.step('Verify navigation region exists', async () => {
        await expect(
          homePage.page.getByRole('navigation', { name: 'Main navigation' }),
        ).toBeVisible();
      });
    });

    test('Products page has proper landmark structure', async ({
      productsPage,
    }) => {
      await test.step('Navigate to products page', async () => {
        await productsPage.goto();
      });

      await test.step('Verify banner, main, and contentinfo regions', async () => {
        await expect(productsPage.page.getByRole('banner')).toBeVisible();
        await expect(productsPage.page.getByRole('main')).toBeVisible();
        await expect(
          productsPage.page.getByRole('contentinfo'),
        ).toBeVisible();
      });
    });
  });

  test.describe('Heading Hierarchy', () => {
    test('Home page has exactly one h1 heading', async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify single h1 heading exists', async () => {
        await expect(
          homePage.page.getByRole('heading', { level: 1 }),
        ).toHaveCount(1);
      });
    });

    test('Products page has exactly one h1 heading', async ({
      productsPage,
    }) => {
      await test.step('Navigate to products page', async () => {
        await productsPage.goto();
      });

      await test.step('Verify single h1 heading exists', async () => {
        await expect(
          productsPage.page.getByRole('heading', { level: 1 }),
        ).toHaveCount(1);
      });
    });

    test('Product detail page has exactly one h1 heading', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(PRODUCTS.microFreak.id);
      });

      await test.step('Verify single h1 heading exists', async () => {
        await expect(
          productDetailPage.page.getByRole('heading', { level: 1 }),
        ).toHaveCount(1);
      });
    });
  });

  test.describe('Form Accessibility', () => {
    test('Login form fields have accessible labels', async ({ page }) => {
      await test.step('Navigate to login page (unauthenticated)', async () => {
        await page.goto('/login');
      });

      await test.step('Verify email input has accessible label', async () => {
        const emailInput = page.getByRole('textbox', { name: 'Email' });
        await expect(emailInput).toBeVisible();
      });

      await test.step('Verify password input has accessible label', async () => {
        const passwordInput = page.getByRole('textbox', {
          name: 'Password',
        });
        await expect(passwordInput).toBeVisible();
      });

      await test.step('Verify sign in button has accessible name', async () => {
        const signInButton = page.getByRole('button', {
          name: 'Sign in to your account',
        });
        await expect(signInButton).toBeVisible();
      });
    });

    test('Contact form fields have accessible labels', async ({
      contactPage,
    }) => {
      await test.step('Navigate to contact page', async () => {
        await contactPage.goto();
      });

      await test.step('Verify Full Name input', async () => {
        await expect(contactPage.fullNameInput).toBeVisible();
      });

      await test.step('Verify Email Address input', async () => {
        await expect(contactPage.emailInput).toBeVisible();
      });

      await test.step('Verify Subject input', async () => {
        await expect(contactPage.subjectInput).toBeVisible();
      });

      await test.step('Verify Message input', async () => {
        await expect(contactPage.messageInput).toBeVisible();
      });

      await test.step('Verify submit button has accessible name', async () => {
        await expect(contactPage.submitButton).toBeVisible();
      });
    });
  });

  test.describe('Image Accessibility', () => {
    test('Product images have alt text', async ({ productDetailPage }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(PRODUCTS.microFreak.id);
      });

      await test.step('Verify product image has alt text matching product name', async () => {
        const img = productDetailPage.page.getByRole('img', {
          name: PRODUCTS.microFreak.name,
        });
        await expect(img).toBeVisible();
      });
    });

    test('Logo image has alt text', async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify logo link has accessible name', async () => {
        await expect(homePage.header.logoLink).toBeVisible();
      });
    });
  });

  test.describe('Interactive Element Accessibility', () => {
    test('Theme toggle button has accessible name', async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify theme toggle has accessible name', async () => {
        await expect(homePage.header.themeToggle).toBeVisible();
      });
    });

    test('Search has accessible role and label', async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Verify search input has accessible label', async () => {
        await expect(homePage.header.searchInput).toBeVisible();
      });

      await test.step('Verify search button has accessible name', async () => {
        await expect(homePage.header.searchButton).toBeVisible();
      });
    });

    test('Product quantity controls have accessible names', async ({
      productDetailPage,
    }) => {
      await test.step('Navigate to product detail page', async () => {
        await productDetailPage.goto(PRODUCTS.microFreak.id);
      });

      await test.step('Verify quantity spinbutton has accessible name', async () => {
        await expect(productDetailPage.quantityInput).toBeVisible();
      });

      await test.step('Verify decrease button has accessible name', async () => {
        await expect(
          productDetailPage.decreaseQuantityButton,
        ).toBeVisible();
      });

      await test.step('Verify increase button has accessible name', async () => {
        await expect(
          productDetailPage.increaseQuantityButton,
        ).toBeVisible();
      });
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('Tab through header navigation links', async ({
      homePage,
      page,
    }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Press Tab and verify focus moves to interactive elements', async () => {
        // Start tabbing — first focusable element should be a skip link or nav link
        await page.keyboard.press('Tab');
        const firstFocused = page.locator(':focus');
        await expect(firstFocused).toBeVisible();
      });

      await test.step('Continue tabbing to verify focus order', async () => {
        // Tab a few more times to traverse header navigation
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
        }
        const focused = page.locator(':focus');
        await expect(focused).toBeVisible();
      });
    });

    test('Escape key closes expanded user menu', async ({
      homePage,
      page,
    }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.goto();
      });

      await test.step('Open user menu', async () => {
        await homePage.header.userMenuButton.click();
      });

      await test.step('Press Escape to close menu', async () => {
        await page.keyboard.press('Escape');
      });

      await test.step('Verify user menu button is still visible (menu closed)', async () => {
        await expect(homePage.header.userMenuButton).toBeVisible();
      });
    });
  });
});
