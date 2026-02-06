# Music-Tech Shop — Test Automation Plan

> **Application Under Test:** [https://music-tech-shop.vercel.app](https://music-tech-shop.vercel.app)  
> **Tech Stack:** Playwright + TypeScript  
> **Created:** February 5, 2026  
> **Author:** Senior QA Automation Engineer

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [Application Overview](#application-overview)
- [Phase 0 — Project Foundation & Playwright Configuration](#phase-0--project-foundation--playwright-configuration)
- [Phase 1 — Folder Structure & Architecture Design](#phase-1--folder-structure--architecture-design)
- [Phase 2 — Page Object Model (POM) Implementation](#phase-2--page-object-model-pom-implementation)
- [Phase 3 — Fixtures, Test Data & Authentication Strategy](#phase-3--fixtures-test-data--authentication-strategy)
- [Phase 4 — Smoke Test Suite (Critical Path)](#phase-4--smoke-test-suite-critical-path)
- [Phase 5 — Extended Regression Test Suite](#phase-5--extended-regression-test-suite)
- [Phase 6 — CI/CD Integration & Reporting Strategy](#phase-6--cicd-integration--reporting-strategy)
- [Phase 7 — Documentation & Maintenance Strategy](#phase-7--documentation--maintenance-strategy)
- [Verification Checklist](#verification-checklist)
- [Key Decisions](#key-decisions)

---

## Executive Summary

This document defines a phased test automation strategy for the **Music-Tech Shop** e-commerce web application. The application features 13 routes, 50 products across 5 categories, authentication with 2 roles (admin/customer), cart, orders, contact form, shipping calculator, and an API testing console.

The plan progresses from Playwright configuration through POM architecture, fixtures/test data, and incrementally builds test suites from smoke to full regression. Each phase has clear entry/exit criteria and traceable deliverables.

### Key Discoveries That Shaped This Plan

- The app has auth-gated features (cart, orders) requiring login fixtures
- Two test credential sets exist (admin/customer) enabling role-based testing
- Broken footer links (`/privacy`, `/cookies` → 404) are known risks
- No registration or checkout routes exist — tests are scoped accordingly
- Pagination labels are in Spanish while the rest of the UI is in English (localization risk)
- The `/api-test` console exposes backend endpoints for potential API-level validation

---

## Application Overview

### Routes Discovered (13 total)

| Route | Page Type | Description |
|-------|-----------|-------------|
| `/` | Homepage | Hero section, categories, featured products, CTAs |
| `/products` | Product listing | Paginated grid (50 products, 16/page, 4 pages) with category filter and sort |
| `/products/:id` | Product detail | Full product info, specs, reviews, quantity selector, related products |
| `/products?category=X` | Filtered listing | Filtered by category (Electronics, Photography, Accessories, Synthesizers, Studio Recording) |
| `/login` | Login | Authentication form with test credentials |
| `/cart` | Cart | Shopping cart (redirects to login when not authenticated) |
| `/orders` | Orders | Order history (redirects to login when not authenticated) |
| `/about` | About page | Company mission, vision, values, story, features |
| `/contact` | Contact page | Contact info + contact form |
| `/shipping` | Shipping info | Shipping options, ZIP calculator, FAQ accordion |
| `/returns` | Returns & Warranty | Return process, warranty tiers, DHL locations |
| `/terms` | Terms & Conditions | 10 legal sections |
| `/api-test` | API Testing Console | Interactive API test panel for auth, products, cart, orders |

### Application Features

1. **Product Catalog** — 50 products across 5 categories with paginated grid
2. **Category Filtering** — Filter by Electronics, Photography, Accessories, Synthesizers, Studio Recording
3. **Product Sorting** — Sort products by name (A-Z), possibly other options
4. **Product Detail View** — Full specs, reviews, image gallery, related products
5. **Add to Cart** — From both listing and detail pages, with quantity selector
6. **Favorites/Wishlist** — Heart/favorite button on product cards and detail pages
7. **User Authentication** — Login form with email/password, pre-configured test accounts
8. **Role-Based Access** — Admin and Customer test accounts (different permissions)
9. **Shopping Cart** — Cart management (auth-protected)
10. **Order Management** — Order creation/retrieval (auth-protected)
11. **Search** — Search functionality in header navigation
12. **Theme Toggle** — Dark/light mode switching
13. **Contact Form** — 4-field form with validation
14. **Shipping Calculator** — ZIP code-based delivery estimate
15. **FAQ Accordion** — Collapsible shipping FAQ section
16. **Social Sharing** — Share products via Facebook, Twitter, LinkedIn, WhatsApp, Copy Link
17. **Product Badges** — Best Seller, New Arrival, Limited Stock, Free Shipping
18. **Customer Reviews** — Star ratings, verified reviews with reviewer info
19. **Pagination** — Multi-page product listing with page navigation
20. **API Testing Console** — Interactive API backend testing
21. **Responsive Design** — E-commerce SPA structure
22. **Informational Pages** — About, Shipping, Returns & Warranty, Terms

### Forms Identified

| Form | Page | Fields | Validation |
|------|------|--------|------------|
| Login | `/login` | Email, Password | Email: required + valid format; Password: required |
| Contact | `/contact` | Full Name, Email, Subject, Message | All required; Email: valid format |
| Shipping Calculator | `/shipping` | ZIP Code | US ZIP code format |
| Product Quantity | `/products/:id` | Quantity (number) | Numeric, default 1 |
| API Test Config | `/api-test` | Email, Password, Product ID, Quantity, Search Term, Category | Pre-filled defaults |
| Search | All pages (header) | Search input | Text search |

### Known Risks & Edge Cases

| # | Risk | Category |
|---|------|----------|
| 1 | Broken links: `/privacy` and `/cookies` return 404 but are linked from every page footer | Functional |
| 2 | Auth-gated pages (`/cart`, `/orders`) redirect to login — need to test post-login behavior | Functional |
| 3 | Pagination state may not persist across filter changes | Functional |
| 4 | Cart behavior without authentication (persist? redirect?) | Functional |
| 5 | Quantity boundary values: 0, negative, very large numbers | Functional |
| 6 | API test console is publicly accessible | Security |
| 7 | No registration flow — only pre-configured test accounts | Scope |
| 8 | No checkout route — purchase flow may be incomplete | Scope |
| 9 | Mixed languages: Pagination in Spanish, rest in English | Localization |
| 10 | Theme toggle persistence across navigations and reloads | UI/UX |
| 11 | Price calculation accuracy (quantity * price) | Cart |
| 12 | "Limited Stock" badge vs actual stock behavior | E-commerce |
| 13 | Duplicate cart additions behavior | E-commerce |
| 14 | In-memory backend — data resets on server restart | Infrastructure |

---

## Phase 0 — Project Foundation & Playwright Configuration ✅

> **Status:** Completed — February 5, 2026

### Objective

Configure the Playwright project for multi-browser, stable, production-ready test execution targeting the Music-Tech Shop application.

### Activities / Steps

1. Update `playwright.config.ts` with `baseURL: 'https://music-tech-shop.vercel.app'`
2. Enable three browser projects: `chromium`, `firefox`, `webkit` — remove commented-out mobile/branded projects
3. Explicitly disable screenshots (`use.screenshot: 'off'`) and video recording (`use.video: 'off'`)
4. Configure trace capture to `'on-first-retry'` for debugging failed tests
5. Set `fullyParallel: true` and configure sensible worker counts (e.g., `workers: process.env.CI ? 2 : 4`)
6. Set `retries: 2` for CI, `retries: 0` for local development
7. Configure `expect.timeout` (5s) and `actionTimeout` (10s) for web-first assertions
8. Set HTML reporter with `open: 'never'` for CI compatibility
9. Remove the boilerplate `tests/example.spec.ts`
10. Update `package.json` with npm scripts: `test`, `test:chromium`, `test:headed`, `test:debug`, `test:report`
11. Create a `.gitignore` entry for `test-results/`, `playwright-report/`, and `blob-report/`

### Best Practices Applied

- Single source of truth for base URL (config, not hardcoded in tests)
- Multi-browser by default for cross-browser confidence
- No videos/screenshots per explicit requirement — rely on traces for debugging
- Separate CI vs local settings via environment variables

### Expected Outcomes

- Playwright runs cleanly against the target app with `npx playwright test`
- Three browser projects execute in parallel
- HTML report generates on every run

### Exit Criteria

- `npx playwright test` runs and exits cleanly (no tests yet, but no config errors)
- All three browser projects are listed in `--list` output
- `baseURL` is correctly resolved

### Completion Log

| # | Activity | Result |
|---|----------|--------|
| 1 | `playwright.config.ts` — `baseURL` set to `https://music-tech-shop.vercel.app` (env-overridable via `BASE_URL`) | Done |
| 2 | 3 browser projects: `chromium`, `firefox`, `webkit` — commented-out mobile/branded projects removed | Done |
| 3 | Screenshots `'off'`, video `'off'` | Done |
| 4 | Trace `'on-first-retry'` | Done |
| 5 | `fullyParallel: true`, workers: CI = 2 / local = 4 | Done |
| 6 | Retries: CI = 2 / local = 0 | Done |
| 7 | `expect.timeout: 5000`, `actionTimeout: 10000` | Done |
| 8 | HTML reporter with `open: 'never'` + `list` reporter | Done |
| 9 | Boilerplate `tests/example.spec.ts` removed | Done |
| 10 | `package.json` — 5 npm scripts: `test`, `test:chromium`, `test:headed`, `test:debug`, `test:report` | Done |
| 11 | `.gitignore` — already had `test-results/`, `playwright-report/`, `blob-report/`, `playwright/.auth/` | Verified |

**Verification:** `npx playwright test --list` listed 3 tests across chromium/firefox/webkit. Health check test passed against live `baseURL`.

---

## Phase 1 — Folder Structure & Architecture Design ✅

> **Status:** Completed — February 5, 2026

### Objective

Define a scalable, maintainable folder structure that separates concerns (pages, tests, fixtures, data, utilities) and supports long-term growth.

### Activities / Steps

1. Create the following directory structure:

```
tests/
  e2e/                        # End-to-end test specs organized by feature
    auth/                      # Login, session, role-based tests
    products/                  # Catalog, filtering, sorting, pagination
    product-detail/            # Detail page, specs, reviews, quantity
    cart/                      # Cart management (add, remove, update)
    orders/                    # Order creation, history
    contact/                   # Contact form submission
    shipping/                  # Shipping calculator, FAQ accordion
    navigation/                # Header, footer, links, theme toggle
    search/                    # Search functionality
    api-console/               # API testing console verification
  pages/                       # Page Object Model classes
  fixtures/                    # Custom Playwright fixtures (auth, test data)
  data/                        # Test data (JSON, constants, enums)
  helpers/                     # Utility functions (formatters, validators)
docs/                          # Test plan and documentation
```

2. Establish naming conventions:
   - Test files: `<feature>.spec.ts` (e.g., `login.spec.ts`, `product-catalog.spec.ts`)
   - Page objects: `<page-name>.page.ts` (e.g., `login.page.ts`, `products.page.ts`)
   - Fixtures: `<concern>.fixture.ts` (e.g., `auth.fixture.ts`)
   - Data files: `<domain>.data.ts` (e.g., `users.data.ts`, `products.data.ts`)
   - Helpers: `<utility>.helper.ts` (e.g., `price.helper.ts`)

3. Create a barrel `index.ts` in `pages/` for clean imports

4. Document the architecture in this plan

### Best Practices Applied

- Separation of concerns: tests know WHAT to verify, pages know HOW to interact
- Feature-based test organization (not technical-based) improves discoverability
- Data externalization enables test parametrization without code changes
- Fixture pattern enables reusable setup/teardown across test suites

### Expected Outcomes

- Empty folder scaffold ready for implementation
- Clear ownership: each folder has a single responsibility
- New team members can locate any file within seconds

### Exit Criteria

- All directories created with placeholder `README.md` or `.gitkeep`
- Naming conventions documented and consistently applied from this point forward

### Completion Log

| # | Deliverable | Result |
|---|-------------|--------|
| 1 | `tests/e2e/auth/` | Created with `.gitkeep` |
| 2 | `tests/e2e/products/` | Created with `.gitkeep` |
| 3 | `tests/e2e/product-detail/` | Created with `.gitkeep` |
| 4 | `tests/e2e/cart/` | Created with `.gitkeep` |
| 5 | `tests/e2e/orders/` | Created with `.gitkeep` |
| 6 | `tests/e2e/contact/` | Created with `.gitkeep` |
| 7 | `tests/e2e/shipping/` | Created with `.gitkeep` |
| 8 | `tests/e2e/navigation/` | Created with `.gitkeep` |
| 9 | `tests/e2e/search/` | Created with `.gitkeep` |
| 10 | `tests/e2e/api-console/` | Created with `.gitkeep` |
| 11 | `tests/pages/` | Created with `index.ts` barrel export |
| 12 | `tests/fixtures/` | Created with `.gitkeep` |
| 13 | `tests/data/` | Created with `.gitkeep` |
| 14 | `tests/helpers/` | Created with `.gitkeep` |

**Verification:** `npx playwright test --list` returns 0 tests — no scaffold files mistakenly picked up. Directory tree matches the prescribed structure.

---

## Phase 2 — Page Object Model (POM) Implementation ✅

> **Status:** Completed — February 5, 2026

### Objective

Build Page Object classes for every application page, encapsulating locators and interactions using role-based, accessible selectors.

### Activities / Steps

1. **Create a `BasePage` class** with shared behaviors:
   - Constructor accepting Playwright `Page` instance
   - Common header interactions (search trigger, theme toggle, login link, home link)
   - Common footer link accessors
   - `navigateTo(path)` method leveraging `baseURL`
   - Generic wait/assertion helpers if needed

2. **Create page-specific Page Objects** (each extending `BasePage`):

   | Page Object | File | Key Locators & Methods |
   |-------------|------|----------------------|
   | `HomePage` | `home.page.ts` | Hero CTAs, category cards, featured products, stats, value propositions |
   | `ProductsPage` | `products.page.ts` | Category filter dropdown, sort dropdown, product cards grid, pagination controls, product count indicator |
   | `ProductDetailPage` | `product-detail.page.ts` | Product name, price, quantity input, add-to-cart button, favorites button, specs table, reviews section, share buttons, related products |
   | `LoginPage` | `login.page.ts` | Email input, password input, sign-in button, test credential buttons ("Use This Account"), guest link, error messages |
   | `CartPage` | `cart.page.ts` | Cart items list, quantity controls, remove buttons, totals, checkout action |
   | `OrdersPage` | `orders.page.ts` | Order list, order details, status indicators |
   | `ContactPage` | `contact.page.ts` | Name/email/subject/message fields, submit button, success/error messages |
   | `ShippingPage` | `shipping.page.ts` | ZIP input, calculate button, result display, shipping options cards, FAQ accordion items |
   | `AboutPage` | `about.page.ts` | Mission/vision/values cards, stats, CTAs |
   | `ReturnsPage` | `returns.page.ts` | Return steps, warranty tiers, DHL locations, conditions |
   | `TermsPage` | `terms.page.ts` | Section headings, content sections (for structural verification) |
   | `ApiTestPage` | `api-test.page.ts` | Config form fields, test group buttons, response panel, status indicator |

3. **Create reusable component classes** (composed into pages, not extending `BasePage`):

   | Component | File | Responsibility |
   |-----------|------|----------------|
   | `HeaderComponent` | `header.component.ts` | Logo, search, theme toggle, login/user link, navigation links |
   | `FooterComponent` | `footer.component.ts` | Shop links, company links, contact info, social links, legal links |

4. Apply **fluent interface pattern**: methods return `this` or the destination Page Object for chaining

5. Use exclusively **role-based and user-facing locators**:
   - `getByRole('button', { name: 'Add to Cart' })`
   - `getByRole('link', { name: 'View details' })`
   - `getByLabel('Email')`
   - `getByPlaceholder('Enter your email')`
   - `getByRole('heading', { name: 'Welcome Back' })`

### Best Practices Applied

- Role-based locators ensure accessibility and resilience
- Fluent interface improves test readability: `await loginPage.fillEmail('x').fillPassword('y').submit()`
- Component composition (HeaderComponent, FooterComponent) avoids duplication across page objects
- No assertions in page objects — pages expose state, tests assert on it
- Locators defined as properties/methods, not raw strings — single point of change

### Expected Outcomes

- Complete POM layer covering all 13 application routes
- Every interactive element reachable through type-safe page methods
- Zero CSS/XPath selectors in the codebase

### Exit Criteria

- All page objects compile without errors
- Locators verified against the live application (manual spot-check or smoke test)
- Every Page Object has methods for all its interactive elements
- Fluent return types are correct (TypeScript compilation validates)

### Completion Log

| # | Deliverable | File | Result |
|---|-------------|------|--------|
| 1 | `BasePage` — shared constructor, header/footer composition, `navigateTo()`, `pageHeading`, `notificationsRegion` | `base.page.ts` | Done |
| 2 | `HeaderComponent` — logo, nav links, search, theme toggle, auth-dependent elements | `header.component.ts` | Done |
| 3 | `FooterComponent` — shop/company/social/legal links, contact info | `footer.component.ts` | Done |
| 4 | `HomePage` — hero CTAs, featured products, categories, newsletter | `home.page.ts` | Done |
| 5 | `LoginPage` — email/password, sign-in, quick-login buttons, guest link | `login.page.ts` | Done |
| 6 | `ProductsPage` — search, category/sort filters, product grid, pagination | `products.page.ts` | Done |
| 7 | `ProductDetailPage` — product info, quantity, cart/favorites, specs, reviews, share | `product-detail.page.ts` | Done |
| 8 | `CartPage` — checkout heading, empty/items states, quantity controls, order summary | `cart.page.ts` | Done |
| 9 | `OrdersPage` — order history heading, empty state, order articles | `orders.page.ts` | Done |
| 10 | `ContactPage` — name/email/subject/message fields, submit, `submitContactForm()` | `contact.page.ts` | Done |
| 11 | `ShippingPage` — ZIP input, calculate, shipping tiers, FAQ accordion | `shipping.page.ts` | Done |
| 12 | `AboutPage` — mission/vision/values headings, explore products CTA | `about.page.ts` | Done |
| 13 | `ReturnsPage` — return steps, warranty, DHL locations, contact support | `returns.page.ts` | Done |
| 14 | `TermsPage` — 10 section headings, `sectionHeadings` (level 2) accessor | `terms.page.ts` | Done |
| 15 | `ApiTestPage` — config fields, test group accordions, action buttons | `api-test.page.ts` | Done |
| 16 | Barrel `index.ts` — exports all 15 classes (2 components + base + 12 pages) | `index.ts` | Done |
| 17 | `tsconfig.json` — created for TypeScript compilation validation | `tsconfig.json` | Done |

**Verification:** `npx tsc --noEmit` passed — all 15 Page Object files compile without errors. All locators are role-based (`getByRole`, `getByLabel`, `getByText`) with zero CSS/XPath selectors.

---

## Phase 3 — Fixtures, Test Data & Authentication Strategy ✅

> **Status:** Completed — February 6, 2026

### Objective

Create reusable Playwright fixtures for authentication, test data, and common setup patterns, ensuring test isolation and repeatability.

### Activities / Steps

1. **Authentication Fixture** (`auth.fixture.ts`):
   - Create a custom `test` export that extends Playwright's base `test` with auth fixtures
   - Implement `authenticatedPage` fixture: logs in via UI (or storage state reuse) before each test
   - Implement `adminPage` fixture: logs in as admin (`admin@test.com` / `admin123`)
   - Implement `customerPage` fixture: logs in as customer (`user@test.com` / `user123`)
   - Use `storageState` pattern to save/reuse auth cookies across tests in a project, avoiding repeated login UI flows
   - Create an `auth.setup.ts` setup project that runs login once and saves state to `playwright/.auth/`

2. **Test Data Files** (`data/`):
   - `users.data.ts`: Test user credentials (admin, customer), invalid credentials for negative tests
   - `products.data.ts`: Known product IDs, names, categories, and prices for assertion targets
   - `categories.data.ts`: Enum/array of the 5 categories with expected product counts
   - `contact.data.ts`: Valid and invalid form submission payloads
   - `shipping.data.ts`: ZIP codes for calculator testing (valid, invalid, edge cases)

3. **Custom Fixtures** (`fixtures/`):
   - `pages.fixture.ts`: Pre-instantiated page objects available as test parameters (e.g., `{ homePage, productsPage, loginPage }`)
   - `cart.fixture.ts`: Fixture that adds a specific product to the cart as precondition for cart/order tests
   - `test-base.ts`: Central export combining all fixtures into a single extended `test` object

4. **Helper Utilities** (`helpers/`):
   - `price.helper.ts`: Currency parsing/formatting validation
   - `pagination.helper.ts`: Page count calculation, range validation
   - `validation.helper.ts`: Email format, required field checking patterns

### Best Practices Applied

- Playwright's `storageState` for lightweight auth reuse (avoid login UI in every test)
- Auth setup as a separate project dependency in `playwright.config.ts`
- Test data externalized from test logic — easy to update when app data changes
- Fixtures compose cleanly: `test.use({ storageState: '.auth/customer.json' })`
- Type-safe test data with TypeScript interfaces

### Expected Outcomes

- Tests can declare `{ authenticatedPage }` or `{ adminPage }` in their parameter list and receive a pre-authenticated page
- Test data is centralized and version-controlled
- Auth setup runs once, all dependent tests reuse the saved state

### Exit Criteria

- Auth setup project generates valid `storageState` files for both admin and customer
- Custom fixtures compile and are importable via `import { test } from '../fixtures/test-base'`
- A simple smoke test using the auth fixture logs in successfully

### Completion Log

| # | Deliverable | File | Result |
|---|-------------|------|--------|
| 1 | `auth.setup.ts` — setup project: logs in as admin + customer, saves `storageState` to `playwright/.auth/` | `tests/auth.setup.ts` | Done |
| 2 | `playwright.config.ts` — added `setup` project + `dependencies` + default `storageState` for browser projects | `playwright.config.ts` | Done |
| 3 | `users.data.ts` — admin/customer credentials, invalid credentials (wrong password, wrong email, empty, invalid format, SQL injection, XSS), auth state paths | `tests/data/users.data.ts` | Done |
| 4 | `products.data.ts` — 10 representative products with id/name/price/category/badge + catalog pagination constants | `tests/data/products.data.ts` | Done |
| 5 | `categories.data.ts` — 5 categories with expected product counts, category labels array, total products constant | `tests/data/categories.data.ts` | Done |
| 6 | `contact.data.ts` — 2 valid submissions + 4 invalid/edge-case payloads (all empty, invalid email, missing name, XSS) | `tests/data/contact.data.ts` | Done |
| 7 | `shipping.data.ts` — 5 valid US ZIPs, 6 invalid ZIPs, 2 boundary ZIPs with descriptions | `tests/data/shipping.data.ts` | Done |
| 8 | `auth.fixture.ts` — `adminPage` and `customerPage` fixtures using `storageState` per-context | `tests/fixtures/auth.fixture.ts` | Done |
| 9 | `pages.fixture.ts` — 12 pre-instantiated page object fixtures (all page classes) | `tests/fixtures/pages.fixture.ts` | Done |
| 10 | `cart.fixture.ts` — `cartWithProduct` fixture: customer-authenticated page with one product in cart | `tests/fixtures/cart.fixture.ts` | Done |
| 11 | `test-base.ts` — central `test` export via `mergeTests` combining auth + pages + cart fixtures | `tests/fixtures/test-base.ts` | Done |
| 12 | `price.helper.ts` — `parsePrice`, `formatPrice`, `isValidPriceFormat`, `calculateTotal` | `tests/helpers/price.helper.ts` | Done |
| 13 | `pagination.helper.ts` — `calculateTotalPages`, `itemsOnPage`, `pageRange` | `tests/helpers/pagination.helper.ts` | Done |
| 14 | `validation.helper.ts` — `isValidEmail`, `isValidUSZip`, `isNonEmpty`, `showingProductsPattern` | `tests/helpers/validation.helper.ts` | Done |

**Verification:**
- `npx tsc --noEmit` passed — all files compile without errors.
- `npx playwright test --project=setup` — 2 passed (6.3s): admin + customer storage states generated.
- `Test-Path playwright/.auth/admin.json, playwright/.auth/customer.json` — both `True`.
- `npx playwright test --project=setup --project=chromium --list` — 3 tests listed across 2 files, project dependencies resolved correctly.

---

## Phase 4 — Smoke Test Suite (Critical Path)

### Objective

Build a lean, fast-running smoke test suite covering the most critical user paths — the minimum set of tests that must pass before any deployment.

### Activities / Steps

1. **Smoke tests to implement** (one file per feature area, using `test.describe` blocks):

   | Test File | Test Cases |
   |-----------|------------|
   | `auth/login.spec.ts` | Successful login with customer credentials; Successful login with admin credentials; Login with test credential buttons; Invalid credentials show error; Guest continue redirects to home |
   | `products/product-catalog.spec.ts` | Products page loads with 50 products (16 per page); Category filter shows correct results; Pagination navigates between pages |
   | `product-detail/product-detail.spec.ts` | Product detail page loads with name, price, image; Quantity selector updates total price; Related products section displays |
   | `cart/add-to-cart.spec.ts` | Add product to cart from listing (requires auth); Add product to cart from detail with quantity (requires auth); Cart page shows added items |
   | `navigation/main-navigation.spec.ts` | Header links navigate to correct pages; Footer links navigate to correct pages; Theme toggle changes appearance; Homepage CTAs navigate correctly |
   | `contact/contact-form.spec.ts` | Submit contact form with valid data; Validation errors on empty required fields |

2. Use `test.step()` to group interactions within each test for clear reporting

3. Tag smoke tests with `@smoke` annotation for selective execution

4. All tests import from `fixtures/test-base.ts` and use Page Objects exclusively

5. Use `toMatchAriaSnapshot` for structural/accessibility verification of key components

6. Use auto-retrying assertions (`toHaveText`, `toHaveURL`, `toHaveCount`, `toContainText`)

### Best Practices Applied

- Smoke suite targets the "golden path" — highest-value, highest-risk flows
- Each test is independent and can run in isolation
- Tests use `test.step()` for readable reporting and debugging
- No hard waits — rely on Playwright's auto-waiting
- Role-based locators throughout
- Tagged with `@smoke` for CI pipeline integration

### Expected Outcomes

- ~15-20 focused smoke tests covering auth, catalog, cart, navigation, and contact
- Suite runs in under 2 minutes across all three browsers
- Any critical regression is caught by this suite

### Exit Criteria

- All smoke tests pass consistently across chromium, firefox, and webkit
- No flaky tests (run 3x without failures)
- Tests are tagged and executable via `npx playwright test --grep @smoke`

### Completion Log

| # | Deliverable | File | Result |
|---|-------------|------|--------|
| 1 | `login.spec.ts` — 5 login tests: customer login, admin login, quick-login buttons, invalid credentials error, guest redirect | `tests/e2e/auth/login.spec.ts` | Done |
| 2 | `product-catalog.spec.ts` — 3 catalog tests: product count per page, category filter, pagination navigation | `tests/e2e/products/product-catalog.spec.ts` | Done |
| 3 | `product-detail.spec.ts` — 3 detail tests: name/price/image load, quantity selector, specs & reviews display | `tests/e2e/product-detail/product-detail.spec.ts` | Done |
| 4 | `add-to-cart.spec.ts` — 3 cart tests: add from detail, add with increased quantity, cart shows items | `tests/e2e/cart/add-to-cart.spec.ts` | Done |
| 5 | `main-navigation.spec.ts` — 4 navigation tests: header links, footer links, theme toggle, homepage CTAs | `tests/e2e/navigation/main-navigation.spec.ts` | Done |
| 6 | `contact-form.spec.ts` — 2 contact tests: valid submission, validation errors on empty fields | `tests/e2e/contact/contact-form.spec.ts` | Done |

**POM & Data Corrections During Stabilization:**
- `ProductsPage` — product cards changed from `getByRole('article')` to `locator('[data-testid^="product-card-"]')`; category/sort filters from `selectOption` to click+option pattern; pagination from role-based to `getByTestId` pattern.
- `ProductDetailPage` — reviews region from `getByRole('region')` to `getByTestId('product-reviews-section')`; price from regex `getByText` to `getByTestId('product-price')`.
- `HomePage` — removed non-existent `shopNowLink`/`exploreDealsLink`; added `startShoppingLink`/`browseProductsLink`.
- `products.data.ts` — corrected all 10 product IDs to match actual app catalog.
- `categories.data.ts` — corrected category counts: Electronics=5, Photography=4, Accessories=6, Synthesizers=15, Studio Recording=20.

**Verification:**
- `npx playwright test --project=chromium --grep @smoke` — 22 passed (11.1s).
- `npx playwright test --grep @smoke` — 62 passed (41.2s) across chromium, firefox, and webkit.
- 20 smoke tests + 2 auth setup = 22 per browser × 3 browsers = 62 total, all green.

---

## Phase 5 — Extended Regression Test Suite

### Objective

Expand test coverage beyond the smoke suite to include edge cases, negative scenarios, boundary values, and all remaining features.

### Activities / Steps

1. **Authentication & Session Management:**
   - Session persistence across page navigations
   - Logout flow and session cleanup
   - Accessing protected pages (`/cart`, `/orders`) without auth → redirect verification
   - Role-based access differences between admin and customer

2. **Product Catalog — Extended:**
   - All 5 category filters produce correct product counts (Electronics: 8, Photography: 5, Accessories: 6, Synthesizers: 15, Studio Recording: 16)
   - Sort functionality (A-Z, and any other available sort options)
   - Category + pagination interaction (filter, then paginate)
   - Product card structure: badges, price, image, description, action buttons
   - Product count indicator accuracy ("Showing X of Y products")

3. **Product Detail — Extended:**
   - Technical specifications table renders for different product types
   - Customer reviews section: ratings, verified badges, reviewer info
   - Share buttons functionality (Facebook, Twitter, LinkedIn, WhatsApp, Copy Link)
   - Favorites button toggle behavior
   - Quantity boundary values: 0, 1, max stock, negative numbers
   - "Continue Shopping" link returns to products page

4. **Cart & Orders — Extended:**
   - Update quantity in cart
   - Remove items from cart
   - Cart total calculation accuracy
   - Empty cart state
   - Order history display after cart operations
   - Multiple products in cart

5. **Forms — Negative & Boundary Testing:**
   - Login: empty fields, invalid email format, SQL injection strings, XSS payloads in fields
   - Contact: partial form submission, very long text in message, special characters
   - Shipping calculator: invalid ZIP, empty ZIP, non-US formats, boundary ZIPs

6. **Informational Pages:**
   - About page content and structure verification
   - Shipping page: all 3 shipping tiers displayed, FAQ accordion expand/collapse
   - Returns page: return process steps, warranty tiers, DHL locations
   - Terms page: all 10 sections present with correct headings

7. **Broken Links & 404 Handling:**
   - Footer links to `/privacy` and `/cookies` → verify 404 behavior
   - Non-existent product ID → error handling
   - Non-existent routes → 404 page behavior

8. **API Testing Console:**
   - Authentication test group buttons work
   - Product API calls return valid responses
   - Response panel displays formatted JSON
   - Status indicator reflects auth state

9. **Search Functionality:**
   - Search for known product names
   - Search for categories
   - Empty search behavior
   - Search with no results

10. **Accessibility Verification (lightweight):**
    - `toMatchAriaSnapshot` for critical components (product cards, forms, navigation)
    - Keyboard navigation through main flows
    - Focus management in modals/dialogs (if any)

### Best Practices Applied

- Tests tagged with `@regression` for selective execution
- Negative tests paired alongside positive tests in the same describe block
- Data-driven tests using `test.describe` + loops for category/product parametrization
- Each test remains independent — no test order dependencies
- Edge cases identified from research (quantity bounds, broken links, mixed languages)

### Expected Outcomes

- ~60-80 comprehensive regression tests covering all features and edge cases
- Full application feature coverage
- Documented gaps (e.g., no checkout flow, no registration flow — app does not support them)

### Exit Criteria

- All regression tests pass across three browsers
- No flaky tests (run 3x without failure)
- Coverage matrix: every application route has at least one test
- Every form has both positive and negative test coverage

---

## Phase 6 — CI/CD Integration & Reporting Strategy

### Objective

Configure the test suite for automated execution in CI pipelines with clear reporting, tagging, and execution strategies.

### Activities / Steps

1. **Execution Profiles** (via `playwright.config.ts` projects or npm scripts):
   - `smoke` — Chromium-only, `@smoke` tag, runs on every PR (~2 min)
   - `regression` — All browsers, `@regression` tag, runs nightly or on release branches (~10 min)
   - `a11y` — Chromium-only, `@a11y` tag, accessibility-focused tests

2. **CI Configuration:**
   - GitHub Actions workflow file (`.github/workflows/playwright.yml`)
   - Install dependencies with `pnpm install`
   - Install Playwright browsers with `npx playwright install --with-deps`
   - Run auth setup project first, then test projects
   - Upload HTML report as CI artifact
   - Upload `test-results/` on failure for trace analysis

3. **Tagging Strategy:**
   - `@smoke` — Critical path, must pass before merge
   - `@regression` — Full suite, nightly
   - `@a11y` — Accessibility checks
   - `@negative` — Negative/error scenarios
   - `@api` — API console tests

4. **Reporting:**
   - HTML reporter for detailed local/CI analysis
   - `list` reporter for CI console output
   - Trace files on first retry for failure investigation

5. **Environment Configuration:**
   - Use `process.env.BASE_URL` override for different environments (staging, production)
   - Document how to run against different environments

### Best Practices Applied

- Fail-fast: smoke tests gate PR merges
- Parallel execution for speed
- Trace-on-retry for debugging without bloating happy-path runs
- Artifact upload for post-mortem analysis in CI

### Expected Outcomes

- Fully automated test execution in CI
- Clear pass/fail signals in PR checks
- Accessible HTML reports for stakeholders

### Exit Criteria

- CI pipeline runs successfully end-to-end
- Smoke suite blocks merges on failure
- Reports are accessible as CI artifacts
- Documentation covers how to run locally and in CI

---

## Phase 7 — Documentation & Maintenance Strategy

### Objective

Ensure the test suite is self-documenting, maintainable, and ready for team onboarding and long-term evolution.

### Activities / Steps

1. **Update `README.md`** with:
   - Project overview and tech stack
   - Prerequisites and setup instructions
   - How to run tests (all suites, smoke, regression, single browser, headed, debug)
   - Folder structure explanation
   - Contributing guidelines for new tests

2. **Create `docs/test-plan.md`:** This document — the full phased test plan

3. **Create `docs/test-coverage-matrix.md`:**
   - Feature-to-test mapping table
   - Routes covered / not covered
   - Known gaps and why (e.g., no checkout flow in the app)

4. **Page Object Maintenance Guidelines:**
   - One locator change = one file change (never duplicate selectors)
   - Page objects evolve with the app — treat them as first-class code
   - Regular review: prune unused methods, update locators after UI changes

5. **Test Health Monitoring:**
   - Investigate any test that fails 2+ times in a week (potential flakiness)
   - Monthly review: remove obsolete tests, add tests for new features
   - Keep smoke suite lean (under 20 tests, under 2 minutes)

### Best Practices Applied

- Living documentation: plan and coverage matrix evolve with the codebase
- Onboarding-friendly: new engineers can set up and run tests from README alone
- Proactive maintenance: scheduled reviews prevent test rot
- Coverage visibility: matrix makes gaps explicit and intentional

### Expected Outcomes

- Complete documentation in `/docs`
- Self-explanatory project that any engineer can pick up
- Maintenance rhythm established

### Exit Criteria

- README is accurate and tested (a new user can follow it successfully)
- Test coverage matrix accounts for all known routes and features
- Team has reviewed and approved the documentation

---

## Verification Checklist

| Phase | Verification Command / Action | Expected Result |
|-------|-------------------------------|-----------------|
| Phase 0 | `npx playwright test --list` | ✅ Shows 3 browser projects, no config errors |
| Phase 1 | `tree tests/` | ✅ Shows the prescribed folder structure |
| Phase 2 | `npx tsc --noEmit` | ✅ All Page Objects compile without errors |
| Phase 3 | `npx playwright test auth.setup` | Auth setup generates `playwright/.auth/*.json` successfully |
| Phase 4 | `npx playwright test --grep @smoke` (3 runs) | Passes across all browsers, all 3 runs |
| Phase 5 | `npx playwright test --grep @regression` (3 runs) | Passes across all browsers, all 3 runs |
| Phase 6 | GitHub Actions workflow run | Completes successfully with artifact upload |
| Phase 7 | Fresh clone → follow README instructions | Produces a passing test run |

---

## Key Decisions

| Decision | Chosen Approach | Rationale |
|----------|----------------|-----------|
| Auth strategy | `storageState` reuse via setup project | Speed — avoids login UI in every test |
| Folder structure | Feature-based test organization | Better test discoverability than page-based |
| Locator strategy | Role-based only | Per project a11y instructions and Playwright best practices |
| Component separation | Header/Footer as standalone components | Avoids duplicating locators in every Page Object |
| Screenshots/Videos | Explicitly disabled | Per requirements; traces used for debugging instead |
| Scope boundaries | No checkout or registration tests | Application does not support these flows |
| Test independence | Each test runs in isolation | No test order dependencies; parallel-safe |
| Data management | Externalized in `/data` directory | Easy to update when app data changes |
