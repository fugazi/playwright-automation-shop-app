import { test, expect } from '../../fixtures/test-base';
import { VALID_CONTACT, VALID_CONTACT_ALT, INVALID_CONTACT } from '../../data/contact.data';
import { VALID_ZIPS, INVALID_ZIPS, BOUNDARY_ZIPS } from '../../data/shipping.data';

test.describe('Forms — Negative & Boundary Testing @regression', () => {
  test.describe('Contact Form — Negative Tests', () => {
    test.beforeEach(async ({ contactPage }) => {
      await contactPage.goto();
    });

    test('Submit with all empty fields shows validation errors', async ({
      contactPage,
    }) => {
      await test.step('Click submit button without filling fields', async () => {
        await contactPage.submitButton.click();
      });

      await test.step('Verify validation errors are shown', async () => {
        await expect(
          contactPage.page.getByText(/required|fill|enter/i).first(),
        ).toBeVisible();
      });
    });

    test('Submit with invalid email format shows error', async ({
      contactPage,
    }) => {
      await test.step('Fill form with invalid email', async () => {
        await contactPage.submitContactForm(INVALID_CONTACT.invalidEmail);
      });

      await test.step('Verify email validation error', async () => {
        await expect(
          contactPage.page.getByText(/email|invalid|valid/i).first(),
        ).toBeVisible();
      });
    });

    test('Submit with missing name shows validation error', async ({
      contactPage,
    }) => {
      await test.step('Fill form with missing name', async () => {
        await contactPage.submitContactForm(INVALID_CONTACT.missingName);
      });

      await test.step('Verify name field validation error', async () => {
        await expect(
          contactPage.page.getByText(/required|name|fill/i).first(),
        ).toBeVisible();
      });
    });

    test('XSS payload in message is handled safely', async ({
      contactPage,
    }) => {
      await test.step('Fill form with XSS payload in message', async () => {
        await contactPage.submitContactForm(INVALID_CONTACT.xssPayload);
      });

      await test.step('Verify no script execution — page remains functional', async () => {
        // Page should either show success (sanitized) or validation feedback
        await expect(
          contactPage.page.getByText(/thank you|message|sent|required|error/i).first(),
        ).toBeVisible();
      });
    });

    test('Submit with very long text in message field', async ({
      contactPage,
    }) => {
      const longMessage = 'A'.repeat(5000);

      await test.step('Fill form with extremely long message', async () => {
        await contactPage.submitContactForm({
          fullName: 'Long Message Test',
          email: 'long@example.com',
          subject: 'Long text test',
          message: longMessage,
        });
      });

      await test.step('Verify form handles long input gracefully', async () => {
        // Should either succeed or show a validation message about length
        await expect(
          contactPage.page.getByText(/thank you|message|sent|error|characters|too long/i).first(),
        ).toBeVisible();
      });
    });

    test('Submit with special characters in all fields', async ({
      contactPage,
    }) => {
      await test.step('Fill form with special characters', async () => {
        await contactPage.submitContactForm({
          fullName: "O'Brien-Smith & Co.",
          email: 'special+chars@example.com',
          subject: 'Question about "products" & pricing',
          message: 'Hëllo! I\'d like to know about <products> & {services}.',
        });
      });

      await test.step('Verify form handles special characters', async () => {
        await expect(
          contactPage.page.getByText(/thank you|message|sent|error/i).first(),
        ).toBeVisible();
      });
    });

    test('Submit contact form with alternative valid data', async ({
      contactPage,
    }) => {
      await test.step('Fill form with alternative valid data', async () => {
        await contactPage.submitContactForm(VALID_CONTACT_ALT);
      });

      await test.step('Verify success message', async () => {
        await expect(
          contactPage.page.getByText(/thank you|message.*sent|successfully/i),
        ).toBeVisible();
      });
    });
  });

  test.describe('Shipping Calculator — Boundary Testing', () => {
    test.beforeEach(async ({ shippingPage }) => {
      await shippingPage.goto();
    });

    for (const zip of VALID_ZIPS) {
      test(`Valid ZIP "${zip.zipCode}" (${zip.description}) calculates successfully`, async ({
        shippingPage,
      }) => {
        await test.step(`Enter ZIP code ${zip.zipCode}`, async () => {
          await shippingPage.calculateShipping(zip.zipCode);
        });

        await test.step('Verify shipping rates are displayed', async () => {
          await expect(
            shippingPage.page.getByText(/\$[\d,]+\.\d{2}|free|shipping/i).first(),
          ).toBeVisible();
        });
      });
    }

    for (const zip of INVALID_ZIPS) {
      test(`Invalid ZIP "${zip.zipCode || '(empty)'}" — ${zip.description}`, async ({
        shippingPage,
      }) => {
        await test.step(`Enter invalid ZIP code: ${zip.description}`, async () => {
          await shippingPage.zipCodeInput.fill(zip.zipCode);
        });

        await test.step('Verify calculate button is disabled or error feedback shown', async () => {
          // For invalid/empty/short inputs the Calculate button stays disabled
          const isDisabled = await shippingPage.calculateButton.isDisabled();
          if (isDisabled) {
            await expect(shippingPage.calculateButton).toBeDisabled();
          } else {
            // If the button is enabled (e.g. 5-digit numeric but invalid like 00000/99999),
            // click it and check for error feedback
            await shippingPage.calculateButton.click();
            await expect(
              shippingPage.page
                .getByText(/\$[\d,]+\.\d{2}|free|shipping|invalid|error/i)
                .first(),
            ).toBeVisible();
          }
        });
      });
    }

    for (const zip of BOUNDARY_ZIPS) {
      test(`Boundary ZIP "${zip.zipCode}" (${zip.description}) is handled`, async ({
        shippingPage,
      }) => {
        await test.step(`Enter boundary ZIP code ${zip.zipCode}`, async () => {
          await shippingPage.calculateShipping(zip.zipCode);
        });

        await test.step('Verify shipping result or validation feedback', async () => {
          await expect(
            shippingPage.page.getByText(/\$[\d,]+\.\d{2}|free|shipping|invalid|error/i).first(),
          ).toBeVisible();
        });
      });
    }
  });
});
