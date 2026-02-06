import { type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Product detail page (route: /products/:id).
 */
export class ProductDetailPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(productId: number): Promise<this> {
    return this.navigateTo(`/products/${productId}`);
  }

  // ── Product Info ──────────────────────────────────────────────────

  get productName(): Locator {
    return this.pageHeading;
  }

  get productPrice(): Locator {
    return this.page.getByTestId('product-price');
  }

  get productDescription(): Locator {
    return this.page.getByRole('region', { name: 'Product description' });
  }

  // ── Quantity ──────────────────────────────────────────────────────

  get quantityInput(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Product quantity' });
  }

  get decreaseQuantityButton(): Locator {
    return this.page.getByRole('button', { name: 'Decrease quantity' });
  }

  get increaseQuantityButton(): Locator {
    return this.page.getByRole('button', { name: 'Increase quantity' });
  }

  /** Set the quantity to a specific value via the spinbutton. */
  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
  }

  // ── Cart / Wishlist Actions ───────────────────────────────────────

  /** "Add N ProductName to cart" — button name is dynamic. */
  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: /Add \d+ .+ to cart/ });
  }

  /** "Add ProductName to favorites" — button name is dynamic. */
  get addToFavoritesButton(): Locator {
    return this.page.getByRole('button', { name: /Add .+ to favorites/ });
  }

  get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: 'Continue Shopping' });
  }

  // ── Specifications ────────────────────────────────────────────────

  /** All specification term elements (dt inside a description list). */
  get specTerms(): Locator {
    return this.page.getByRole('term');
  }

  /** All specification value elements (dd inside a description list). */
  get specDefinitions(): Locator {
    return this.page.getByRole('definition');
  }

  // ── Share Buttons ─────────────────────────────────────────────────

  get shareFacebookButton(): Locator {
    return this.page.getByRole('button', { name: 'Share on Facebook' });
  }

  get shareTwitterButton(): Locator {
    return this.page.getByRole('button', { name: 'Share on Twitter' });
  }

  get shareLinkedInButton(): Locator {
    return this.page.getByRole('button', { name: 'Share on LinkedIn' });
  }

  get shareWhatsAppButton(): Locator {
    return this.page.getByRole('button', { name: 'Share on WhatsApp' });
  }

  get copyLinkButton(): Locator {
    return this.page.getByRole('button', { name: 'Copy Link' });
  }

  // ── Customer Reviews ──────────────────────────────────────────────

  get reviewsRegion(): Locator {
    return this.page.getByTestId('product-reviews-section');
  }

  get reviewArticles(): Locator {
    return this.reviewsRegion.getByRole('article');
  }
}
