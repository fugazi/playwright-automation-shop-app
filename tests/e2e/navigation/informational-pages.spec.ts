import { test, expect } from '../../fixtures/test-base';

test.describe('Informational Pages @regression', () => {
  test.describe('About Page', () => {
    test('About page displays all main content sections', async ({
      aboutPage,
    }) => {
      await test.step('Navigate to about page', async () => {
        await aboutPage.goto();
      });

      await test.step('Verify page heading', async () => {
        await expect(aboutPage.pageHeading).toBeVisible();
      });

      await test.step('Verify "Our Mission" section', async () => {
        await expect(aboutPage.missionHeading).toBeVisible();
      });

      await test.step('Verify "Our Vision" section', async () => {
        await expect(aboutPage.visionHeading).toBeVisible();
      });

      await test.step('Verify "Our Values" section', async () => {
        await expect(aboutPage.valuesHeading).toBeVisible();
      });
    });

    test('About page "Explore Our Products" CTA navigates correctly', async ({
      aboutPage,
      page,
    }) => {
      await test.step('Navigate to about page', async () => {
        await aboutPage.goto();
      });

      await test.step('Click "Explore Our Products" link', async () => {
        await aboutPage.exploreProductsLink.click();
      });

      await test.step('Verify navigation to products page', async () => {
        await expect(page).toHaveURL(/\/products/);
      });
    });
  });

  test.describe('Shipping Page', () => {
    test('Shipping page displays all three shipping tiers', async ({
      shippingPage,
    }) => {
      await test.step('Navigate to shipping page', async () => {
        await shippingPage.goto();
      });

      await test.step('Verify page heading', async () => {
        await expect(shippingPage.pageHeading).toBeVisible();
      });

      await test.step('Verify Standard Shipping tier', async () => {
        await expect(shippingPage.standardShippingOption).toBeVisible();
      });

      await test.step('Verify Express Shipping tier', async () => {
        await expect(shippingPage.expressShippingOption).toBeVisible();
      });

      await test.step('Verify Overnight Shipping tier', async () => {
        await expect(shippingPage.overnightShippingOption).toBeVisible();
      });
    });

    test('Shipping calculator input and button are functional', async ({
      shippingPage,
    }) => {
      await test.step('Navigate to shipping page', async () => {
        await shippingPage.goto();
      });

      await test.step('Verify ZIP code input is visible', async () => {
        await expect(shippingPage.zipCodeInput).toBeVisible();
      });

      await test.step('Verify Calculate button is visible', async () => {
        await expect(shippingPage.calculateButton).toBeVisible();
      });

      await test.step('Enter a valid ZIP and calculate', async () => {
        await shippingPage.calculateShipping('10001');
      });

      await test.step('Verify results appear', async () => {
        await expect(
          shippingPage.page.getByText(/\$[\d,]+\.\d{2}|free|shipping/i).first(),
        ).toBeVisible();
      });
    });

    test('FAQ section displays informational cards', async ({ shippingPage }) => {
      await test.step('Navigate to shipping page', async () => {
        await shippingPage.goto();
      });

      await test.step('Verify FAQ section is present', async () => {
        await expect(shippingPage.faqSection).toBeVisible();
      });

      await test.step('Verify FAQ heading is visible', async () => {
        await expect(shippingPage.faqHeading).toBeVisible();
      });

      await test.step('Verify FAQ cards are displayed', async () => {
        const cardCount = await shippingPage.faqCards.count();
        expect(cardCount).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Returns Page', () => {
    test('Returns page displays return process steps', async ({
      returnsPage,
    }) => {
      await test.step('Navigate to returns page', async () => {
        await returnsPage.goto();
      });

      await test.step('Verify page heading', async () => {
        await expect(returnsPage.returnsHeading).toBeVisible();
      });

      await test.step('Verify return steps are listed', async () => {
        const stepsCount = await returnsPage.returnSteps.count();
        expect(stepsCount).toBeGreaterThan(0);
      });
    });

    test('Returns page displays warranty tier headings', async ({
      returnsPage,
    }) => {
      await test.step('Navigate to returns page', async () => {
        await returnsPage.goto();
      });

      await test.step('Verify warranty headings are present', async () => {
        const warrantyCount =
          await returnsPage.warrantyHeadings.count();
        expect(warrantyCount).toBeGreaterThan(0);
      });
    });

    test('Returns page has DHL "Find More Locations" button', async ({
      returnsPage,
    }) => {
      await test.step('Navigate to returns page', async () => {
        await returnsPage.goto();
      });

      await test.step('Verify "Find More Locations" button is visible', async () => {
        await expect(
          returnsPage.findMoreLocationsButton,
        ).toBeVisible();
      });
    });

    test('Returns page action buttons are present', async ({
      returnsPage,
    }) => {
      await test.step('Navigate to returns page', async () => {
        await returnsPage.goto();
      });

      await test.step('Verify "View My Orders" link', async () => {
        await expect(returnsPage.viewMyOrdersLink).toBeVisible();
      });

      await test.step('Verify "Contact Support" button', async () => {
        await expect(returnsPage.contactSupportButton).toBeVisible();
      });
    });
  });

  test.describe('Terms Page', () => {
    test('Terms page displays all 10 section headings', async ({
      termsPage,
    }) => {
      await test.step('Navigate to terms page', async () => {
        await termsPage.goto();
      });

      await test.step('Verify page heading', async () => {
        await expect(termsPage.pageHeading).toBeVisible();
      });

      await test.step('Verify all 10 section headings are present', async () => {
        await expect(termsPage.sectionHeadings).toHaveCount(10);
      });
    });

    test('Terms page has correct section heading titles', async ({
      termsPage,
    }) => {
      await test.step('Navigate to terms page', async () => {
        await termsPage.goto();
      });

      await test.step('Verify "Agreement to Terms" heading', async () => {
        await expect(termsPage.agreementToTermsHeading).toBeVisible();
      });

      await test.step('Verify "Use License" heading', async () => {
        await expect(termsPage.useLicenseHeading).toBeVisible();
      });

      await test.step('Verify "Disclaimer" heading', async () => {
        await expect(termsPage.disclaimerHeading).toBeVisible();
      });

      await test.step('Verify "Limitations" heading', async () => {
        await expect(termsPage.limitationsHeading).toBeVisible();
      });

      await test.step('Verify "Accuracy of Materials" heading', async () => {
        await expect(termsPage.accuracyOfMaterialsHeading).toBeVisible();
      });

      await test.step('Verify "Links" heading', async () => {
        await expect(termsPage.linksHeading).toBeVisible();
      });

      await test.step('Verify "Modifications" heading', async () => {
        await expect(termsPage.modificationsHeading).toBeVisible();
      });

      await test.step('Verify "Governing Law" heading', async () => {
        await expect(termsPage.governingLawHeading).toBeVisible();
      });

      await test.step('Verify "Product Returns" heading', async () => {
        await expect(termsPage.productReturnsHeading).toBeVisible();
      });

      await test.step('Verify "User Accounts" heading', async () => {
        await expect(termsPage.userAccountsHeading).toBeVisible();
      });
    });
  });
});
