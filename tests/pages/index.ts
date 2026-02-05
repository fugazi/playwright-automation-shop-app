/**
 * Barrel export for all Page Object Model classes.
 *
 * Import page objects in tests via:
 *   import { LoginPage, ProductsPage } from '../pages';
 */

// ── Components ──────────────────────────────────────────────────────
export { HeaderComponent } from './header.component';
export { FooterComponent } from './footer.component';

// ── Base ────────────────────────────────────────────────────────────
export { BasePage } from './base.page';

// ── Page Objects ────────────────────────────────────────────────────
export { HomePage } from './home.page';
export { LoginPage } from './login.page';
export { ProductsPage } from './products.page';
export { ProductDetailPage } from './product-detail.page';
export { CartPage } from './cart.page';
export { OrdersPage } from './orders.page';
export { ContactPage } from './contact.page';
export { ShippingPage } from './shipping.page';
export { AboutPage } from './about.page';
export { ReturnsPage } from './returns.page';
export { TermsPage } from './terms.page';
export { ApiTestPage } from './api-test.page';
