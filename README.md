<div align="center">
  <img src="docs/assets/steve-jobs-banner.jpg" width="1200" alt="Music-Tech Shop Banner - Steve Jobs DAWless Live Set">
</div>

# Music-Tech Shop — Playwright E2E Automation 🎸

<p align="left">
  <a href="https://playwright.dev/">
    <img src="https://img.shields.io/badge/Playwright-v1.58.2-2EAD33?logo=playwright" alt="Playwright">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-v5.0-3178C6?logo=typescript" alt="TypeScript">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js" alt="Node.js">
  </a>
  <a href="https://pnpm.io/">
    <img src="https://img.shields.io/badge/pnpm-v10-F69220?logo=pnpm" alt="pnpm">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
</p>

A highly scalable, maintainable, and industry-standard End-to-End (E2E) automation framework built for the **Music-Tech Shop** e-commerce application.

**Target App:** [https://music-tech-shop.vercel.app](https://music-tech-shop.vercel.app)

---

## 🚀 Project Overview

This framework leverages **Playwright** with **TypeScript** to provide robust coverage for critical business flows including authentication, product discovery, cart management, and administrative functions. It follows the **Page Object Model (POM)** pattern and utilizes **Fixtures** for optimized setup and teardown.

### Key Features

- **Phased Strategy:** Incremental build from foundation to full regression.
- **Role-Based Testing:** Dedicated fixtures for Admin and Customer roles.
- **Auth Reuse:** Leveraging `storageState` to skip repetitive login steps.
- **Fluent POM:** Readable, chainable page interactions.
- **A11Y Integration:** Structural accessibility snapshots via `toMatchAriaSnapshot`.
- **Data Driven:** Externalized test data in the `/data` directory.

---

## 🛠️ Tech Stack

- **Engine:** [Playwright](https://playwright.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Reporting:** HTML Reporter + List Reporter
- **CI/CD:** GitHub Actions (ready)

---

## 📂 Folder Structure

```text
tests/
  e2e/                        # Feature-based test suites
    auth/                     # Login & session management
    products/                 # Catalog, filtering, sorting
    product-detail/           # Detail page interactions
    cart/                     # Shopping cart & orders
    navigation/               # Navigation, accessibility, 404s
    search/                   # Search functionality
    api-console/              # API Testing Console verification
  pages/                      # Page Object Model classes
  fixtures/                   # Custom Playwright fixtures (auth, pages)
  data/                       # Test data & constants
  helpers/                    # Utility & validation helpers
docs/                         # Project documentation (Test Plan, Coverage Matrix)
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps chromium
   ```

---

## 🧪 Running Tests

| Suite           | Command                    | Description                                              |
| --------------- | -------------------------- | -------------------------------------------------------- |
| **All Tests**   | `pnpm test`                | Runs the entire suite in headless mode                   |
| **Smoke Suite** | `pnpm run test:smoke`      | Runs critical path tests tagged with `@smoke`            |
| **Regression**  | `pnpm run test:regression` | Runs the full regression suite tagged with `@regression` |
| **Headed**      | `pnpm run test:headed`     | Runs tests with visible browser                          |
| **Debug**       | `pnpm run test:debug`      | Opens Playwright Inspector for debugging                 |
| **Report**      | `pnpm run test:report`     | Opens the last HTML report                               |

### Generating Auth State

To manually refresh authentication states:

```bash
npx playwright test auth.setup
```

---

## 📊 Test Coverage

### Route Coverage

| Route                  | Page Name          | Status     | Test Files                                                                                                                                                             |
| ---------------------- | ------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                    | Homepage           | ✅ Covered | [main-navigation.spec.ts](tests/e2e/navigation/main-navigation.spec.ts), [accessibility.spec.ts](tests/e2e/navigation/accessibility.spec.ts)                           |
| `/products`            | Product listing    | ✅ Covered | [product-catalog.spec.ts](tests/e2e/products/product-catalog.spec.ts), [product-catalog-extended.spec.ts](tests/e2e/products/product-catalog-extended.spec.ts)         |
| `/products?category=X` | Filtered listing   | ✅ Covered | [product-catalog-extended.spec.ts](tests/e2e/products/product-catalog-extended.spec.ts)                                                                                |
| `/products/:id`        | Product detail     | ✅ Covered | [product-detail.spec.ts](tests/e2e/product-detail/product-detail.spec.ts), [product-detail-extended.spec.ts](tests/e2e/product-detail/product-detail-extended.spec.ts) |
| `/login`               | Login              | ✅ Covered | [login.spec.ts](tests/e2e/auth/login.spec.ts), [auth-session.spec.ts](tests/e2e/auth/auth-session.spec.ts)                                                             |
| `/cart`                | Cart               | ✅ Covered | [add-to-cart.spec.ts](tests/e2e/cart/add-to-cart.spec.ts), [cart-orders-extended.spec.ts](tests/e2e/cart/cart-orders-extended.spec.ts)                                 |
| `/orders`              | Orders             | ✅ Covered | [cart-orders-extended.spec.ts](tests/e2e/cart/cart-orders-extended.spec.ts)                                                                                            |
| `/about`               | About page         | ✅ Covered | [informational-pages.spec.ts](tests/e2e/navigation/informational-pages.spec.ts)                                                                                        |
| `/contact`             | Contact page       | ✅ Covered | [contact-form.spec.ts](tests/e2e/contact/contact-form.spec.ts), [forms-negative.spec.ts](tests/e2e/contact/forms-negative.spec.ts)                                     |
| `/shipping`            | Shipping info      | ✅ Covered | [informational-pages.spec.ts](tests/e2e/navigation/informational-pages.spec.ts), [forms-negative.spec.ts](tests/e2e/contact/forms-negative.spec.ts)                    |
| `/returns`             | Returns & Warranty | ✅ Covered | [informational-pages.spec.ts](tests/e2e/navigation/informational-pages.spec.ts)                                                                                        |
| `/terms`               | Terms & Conditions | ✅ Covered | [informational-pages.spec.ts](tests/e2e/navigation/informational-pages.spec.ts)                                                                                        |
| `/api-test`            | API Console        | ✅ Covered | [api-console.spec.ts](tests/e2e/api-console/api-console.spec.ts)                                                                                                       |

### Feature Coverage

| Feature             | Description                                         | Status     | Suite(s)           |
| ------------------- | --------------------------------------------------- | ---------- | ------------------ |
| **Authentication**  | Login (Admin/Customer), Session persistence, Logout | ✅ Full    | Smoke, Regression  |
| **Product Catalog** | Grid display, Categories, Sorting, Pagination       | ✅ Full    | Smoke, Regression  |
| **Product Detail**  | Specs, Reviews, Image, Quantity, Related            | ✅ Full    | Smoke, Regression  |
| **Shopping Cart**   | Add/Remove, Update quantity, Totals                 | ✅ Full    | Smoke, Regression  |
| **Orders**          | History display, Status indicators                  | ✅ Full    | Regression         |
| **Contact Form**    | Valid submission, Field validation, Negatives       | ✅ Full    | Smoke, Regression  |
| **Shipping Calc**   | ZIP code logic, valid/invalid inputs                | ✅ Full    | Regression         |
| **Search**          | Header search, Results page filtering               | ✅ Full    | Regression         |
| **Navigation**      | Header/Footer links, Theme toggle                   | ✅ Full    | Smoke, Regression  |
| **Accessibility**   | Semantic structure, Landmarks, A11y snapshots       | ✅ Partial | Regression (@a11y) |
| **Error Handling**  | 404 pages, Broken link redirects                    | ✅ Full    | Regression         |

### Known Gaps & Out of Scope

| Gap                         | Reason                                                                                                      |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **User Registration**       | The application does not feature a registration flow; only pre-configured test accounts are used.           |
| **Checkout Flow**           | There is no dedicated checkout route in the current version of the application.                             |
| **Payment Integration**     | Out of scope as the app is a demonstration platform without real payment processing.                        |
| **Real Email Verification** | Contact form submissions are verified at the UI level but actual email delivery is not tested.              |
| **Full WCAG Audit**         | Automated accessibility tests cover structural and semantic basics, but do not replace a full manual audit. |

---

## 🤝 Contributing Guidelines

1. **Naming Conventions:**
   - Tests: `<feature>.spec.ts`
   - POMs: `<name>.page.ts`
   - Helpers: `<name>.helper.ts`
2. **Locator Strategy:** Prioritize role-based locators (`getByRole`, `getByLabel`, `getByText`). Avoid CSS/XPath.
3. **Assertions:** Use web-first assertions (`await expect(locator).toHaveText()`).
4. **DRY Principle:** Never duplicate a locator string; update the appropriate Page Object.

---

## 📖 Documentation

- [Full Test Plan](docs/test-plan.md) — Detailed strategy and phasing.
- [CLAUDE.md](CLAUDE.md) — AI assistant guide for working with this codebase.
- [AGENTS.md](AGENTS.md) — AI assistant guide for working with this codebase.

---

## 🔧 Maintenance

- **Weekly Review:** Check for flakiness and update dependencies.
- **Reporting:** Traces are captured on the first retry for easier failure investigation.
- **Screenshots/Videos:** Disabled by default to keep CI lean; rely on traces for post-mortems.

---

## 🏠 Developer
* Name: `Douglas Urrea Ocampo`
* Job: `SDET - Software Developer Engineer in Test`
* Country: `Colombia`
* City: `Medellin`
* E-mail: `douglas@douglasfugazi.co`
* LinkedIn: [https://www.linkedin.com/in/douglasfugazi](https://www.linkedin.com/in/douglasfugazi)
* Contact: [https://douglasfugazi.co](https://douglasfugazi.co)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
---

<p align="center">Built with ❤️ by Douglas Urrea Ocampo for the QA Community.</p>
