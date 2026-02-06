import { test, expect } from '../../fixtures/test-base';
import { VALID_CONTACT } from '../../data/contact.data';

test.describe('Contact Form @smoke', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
  });

  test('Submit contact form with valid data', async ({ contactPage }) => {
    await test.step('Fill all form fields with valid data', async () => {
      await contactPage.submitContactForm(VALID_CONTACT);
    });

    await test.step('Verify success message is displayed', async () => {
      await expect(
        contactPage.page.getByText(/thank you|message.*sent|successfully/i),
      ).toBeVisible();
    });
  });

  test('Validation errors on empty required fields', async ({ contactPage }) => {
    await test.step('Click submit without filling any fields', async () => {
      await contactPage.submitButton.click();
    });

    await test.step('Verify validation errors are displayed', async () => {
      // The form should show validation feedback for required fields
      await expect(
        contactPage.page.getByText(/required|fill|enter/i).first(),
      ).toBeVisible();
    });
  });
});
