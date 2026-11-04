// Shared pricing rules. Imported by BOTH the website (StoreContext) and the
// payment-verification Worker (worker/index.js), so the two can never
// disagree about what an order should cost. Keep this file plain JS with no
// browser or React imports.

// Flat shipping fee (rand), waived for orders at or above the threshold.
export const SHIPPING_FLAT = 85;
export const FREE_SHIPPING_THRESHOLD = 500;

/** Shipping for a non-empty order with the given subtotal (rand). */
export function shippingFor(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
