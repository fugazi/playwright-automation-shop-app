import { expect, type Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Cart / Checkout page (route: /cart).
 * Note: the page heading is "Checkout", not "Cart".
 */
export class CartPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  async goto(): Promise<this> {
    return this.navigateTo('/cart');
  }

  // ── Page Heading ──────────────────────────────────────────────────

  get checkoutHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Checkout', level: 1 });
  }

  // ── Empty Cart ────────────────────────────────────────────────────

  get emptyCartHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Your cart is empty' });
  }

  get exploreProductsLink(): Locator {
    return this.page.getByRole('link', { name: 'Explore Products' });
  }

  // ── Cart Items ────────────────────────────────────────────────────

  /** Heading "Your Items (N)" showing item count. */
  get itemsHeading(): Locator {
    return this.page.getByRole('heading', { name: /Your Items \(\d+\)/ });
  }

  /** All cart-item articles. */
  get cartItems(): Locator {
    return this.page.getByRole('article');
  }

  /** Get a cart item article by product name. */
  cartItem(productName: string): Locator {
    return this.page.getByRole('article', { name: new RegExp(productName) });
  }

  /** Remove button for a specific product. */
  removeButton(productName: string): Locator {
    return this.page.getByRole('button', {
      name: `Remove ${productName} from cart`,
    });
  }

  // ── Quantity Controls (inside a cart item) ────────────────────────

  decreaseQuantityButton(productName: string): Locator {
    return this.cartItem(productName).getByRole('button', {
      name: 'Decrease quantity',
    });
  }

  increaseQuantityButton(productName: string): Locator {
    return this.cartItem(productName).getByRole('button', {
      name: 'Increase quantity',
    });
  }

  /** Remove all items currently in the cart and wait for each removal to settle. */
  async clearCart(): Promise<void> {
    await expect(
      this.emptyCartHeading.or(this.cartItems.first()),
    ).toBeVisible();
    while ((await this.cartItems.count()) > 0) {
      const currentCount = await this.cartItems.count();
      await this.page
        .getByRole('button', { name: /Remove .+ from cart/ })
        .first()
        .click();
      await expect(this.cartItems).toHaveCount(currentCount - 1);
    }
  }

  // ── Order Summary ─────────────────────────────────────────────────

  get orderSummary(): Locator {
    return this.page.getByRole('region', { name: 'Order summary' });
  }

  get proceedToCheckoutButton(): Locator {
    return this.page.getByRole('button', {
      name: 'Proceed to checkout and complete purchase',
    });
  }

  // ── Stepper ───────────────────────────────────────────────────────

  get stepReviewCart(): Locator {
    return this.page.getByText('Review Cart');
  }

  get stepShipping(): Locator {
    return this.page.getByText('2Shipping');
  }

  get stepPayment(): Locator {
    return this.page.getByText('3Payment');
  }
}
