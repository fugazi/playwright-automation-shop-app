import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Contact page (route: /contact).
 */
export class ContactPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/contact');
  }

  // ── Form Fields ───────────────────────────────────────────────────

  get fullNameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Full Name' });
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  get subjectInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Subject' });
  }

  get messageInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Message' });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit contact form' });
  }

  // ── Actions ───────────────────────────────────────────────────────

  /** Fill and submit the contact form. */
  async submitContactForm(data: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
    await this.submitButton.click();
  }
}
