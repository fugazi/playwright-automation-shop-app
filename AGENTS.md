# Agent Guidelines for Playwright Automation Shop

This document provides essential information for AI coding agents working in this Playwright TypeScript test automation repository.

## Project Overview

- **Framework**: Playwright v1.58.2 with TypeScript
- **Package Manager**: pnpm (v10.28.2)
- **Target Application**: https://music-tech-shop.vercel.app
- **Test Directory**: `./tests`

## Build/Test/Lint Commands

```bash
# Run all tests (headless)
npx playwright test

# Run a single test file
npx playwright test tests/e2e/auth/login.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests by tag
npx playwright test --grep @smoke
npx playwright test --grep @regression

# Run with visible browser (headed mode)
npx playwright test --headed

# Debug mode (opens Playwright Inspector)
npx playwright test --debug

# View HTML report
npx playwright show-report
```

## Code Style Guidelines

### TypeScript Configuration
- **Target**: ESNext with NodeNext module resolution
- **Strict mode**: Enabled
- **No explicit linting**: Follow Playwright best practices and TypeScript strict mode

### Import Conventions
```typescript
// Tests: Import from custom test base
import { test, expect } from '../fixtures/test-base';

// Page Objects: Import type-only for Locator/Page
import { type Locator, type Page } from '@playwright/test';

// Data: Use named imports
import { CUSTOMER_USER, ADMIN_USER } from '../../data/users.data';
```

### Locator Strategy (Priority Order)
1. **Role-based** (preferred): `page.getByRole('button', { name: 'Submit' })`
2. **Label/Text**: `page.getByLabel('Email')`, `page.getByText('Welcome')`
3. **Test IDs**: `page.getByTestId('submit-button')`
4. **AVOID**: CSS selectors (`.btn-primary`) and XPath

### Naming Conventions
- **Test files**: `<feature>.spec.ts` (e.g., `login.spec.ts`)
- **Page Objects**: `<page>.page.ts` with PascalCase class names
- **Fixtures**: `<name>.fixture.ts`
- **Data files**: `<name>.data.ts`
- **Constants**: UPPER_SNAKE_CASE (e.g., `ADMIN_USER`)
- **Methods**: camelCase with descriptive verbs (e.g., `goto()`, `login()`)

### Page Object Model Pattern
```typescript
export class LoginPage extends BasePage {
  // Use getters for locators
  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  // Fluent interface - return this for chaining
  async goto(): Promise<this> {
    return this.navigateTo('/login');
  }

  // Actions are async methods
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
```

### Test Structure
```typescript
test.describe('Feature Name @smoke', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Descriptive test name', async ({ loginPage, page }) => {
    await test.step('Action description', async () => {
      await loginPage.login(CUSTOMER_USER.email, CUSTOMER_USER.password);
    });

    await test.step('Verification', async () => {
      await expect(page).toHaveURL('/');
    });
  });
});
```

### Assertions
- Use web-first assertions with `await`: `await expect(locator).toHaveText()`
- Prefer `toHaveText()` over `toContainText()` for exact matches
- Use `toMatchAriaSnapshot()` for accessibility tree verification
- Use `toHaveCount()` for element counts
- Use `toHaveURL()` for navigation verification

### Test Tags
- `@smoke` - Critical path tests (22 tests)
- `@regression` - Full test suite (117 tests)
- `@a11y` - Accessibility tests (14 tests)

### Error Handling
- Rely on Playwright's auto-waiting; avoid hard-coded waits
- Use `expect().toPass()` for flaky assertions with retries
- Let assertions fail naturally; don't catch errors unless testing error scenarios

### Comments & Documentation
- Use JSDoc for public methods in Page Objects
- Add section dividers in Page Objects: `// ── Section Name ───`
- Comments should explain WHY, not WHAT
- Keep test titles descriptive enough to minimize inline comments

## Project Structure

```
tests/
├── e2e/               # Test specs organized by feature
│   ├── auth/
│   ├── cart/
│   ├── products/
│   └── ...
├── pages/             # Page Object Model classes
├── fixtures/          # Custom Playwright fixtures
├── data/              # Test data (users, products, etc.)
└── helpers/           # Utility functions
```

## VSCode Integration

The project has MCP server configuration for Playwright tools in `.vscode/mcp.json`.

## Key Files to Reference

- `playwright.config.ts` - Test configuration
- `tests/fixtures/test-base.ts` - Central test fixture export
- `tests/pages/base.page.ts` - Base Page Object class
- `.github/instructions/playwright-typescript.instructions.md` - Detailed test writing guidelines
