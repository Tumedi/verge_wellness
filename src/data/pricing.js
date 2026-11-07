// Shared pricing rules. Imported by BOTH the website (StoreContext) and the
// payment-verification Worker (worker/index.js), so the two can never
// disagree about what an order should cost. Keep this file plain JS with no
// browser or React imports.

// Flat shipping fee (rand).
export const SHIPPING_FLAT = 85;

// Free shipping is switched OFF until further notice. To bring it back, set
// FREE_SHIPPING_ENABLED to true: orders at or above the threshold then ship
// free, and the cart shows the "add R__ more for free shipping" hint again.
// The Worker shares this file, so REDEPLOY THE WORKER after changing it.
export const FREE_SHIPPING_ENABLED = false;
export const FREE_SHIPPING_THRESHOLD = 500;

/** Shipping for a non-empty order with the given subtotal (rand). */
export function shippingFor(subtotal) {
  if (FREE_SHIPPING_ENABLED && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FLAT;
}
