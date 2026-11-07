import PaystackPop from "@paystack/inline-js";

// Paystack public key, read from a Vite env var. Use a TEST key
// (pk_test_...) while developing; swap to the LIVE key (pk_live_...) once
// your Paystack business is verified. The public key is safe in front-end
// code. NEVER put the secret key (sk_...) in this project.
const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const isPaymentConfigured = Boolean(PUBLIC_KEY);

// URL of the deployed verification Worker (see worker/). When set, every
// online payment is confirmed server-side before the order is accepted.
const VERIFY_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

export const isVerificationConfigured = Boolean(VERIFY_API_URL);

/**
 * Submit an order to the Worker. For an online order the Worker first
 * confirms the Paystack payment really happened and matches the cart; then,
 * for any order, it reduces stock in the MySQL database in one safe step.
 *
 * @param {object} opts
 * @param {string} opts.reference  Order reference (also the Paystack reference).
 * @param {"online"|"cod"} opts.method
 * @param {Array<{name: string, qty: number}>} opts.items
 * @returns {Promise<
 *   {status: "ok", verified: boolean, stockTracked: boolean} |
 *   {status: "out_of_stock", paid: boolean, short: Array<{name: string, available: number}>} |
 *   {status: "failed", message: string} |
 *   {status: "skipped"}
 * >}
 */
export async function submitOrder({ reference, method, items }) {
  if (!VERIFY_API_URL) return { status: "skipped" };
  try {
    const res = await fetch(`${VERIFY_API_URL.replace(/\/+$/, "")}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        method,
        // Only names and quantities: the Worker applies its own prices.
        items: items.map((i) => ({ name: i.name, qty: i.qty })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      return {
        status: "ok",
        verified: Boolean(data.verified),
        stockTracked: Boolean(data.stockTracked),
      };
    }
    if (res.status === 409 && data.reason === "out_of_stock") {
      return {
        status: "out_of_stock",
        paid: Boolean(data.verified),
        short: Array.isArray(data.short) ? data.short : [],
      };
    }
    return {
      status: "failed",
      message: data.reason || "The order could not be confirmed.",
    };
  } catch {
    return {
      status: "failed",
      message: "The order service could not be reached.",
    };
  }
}

/**
 * Open the Paystack payment popup and resolve when the customer finishes.
 *
 * @param {object} opts
 * @param {string} opts.email      Customer email (required by Paystack).
 * @param {number} opts.amount     Amount in rand (e.g. 572.5).
 * @param {string} opts.reference  Unique reference for this payment.
 * @param {object} [opts.metadata] Extra info saved on the transaction.
 * @returns {Promise<
 *   {status: "success", reference: string} |
 *   {status: "cancelled"} |
 *   {status: "error", message: string}
 * >}
 */
export function payWithPaystack({ email, amount, reference, metadata }) {
  return new Promise((resolve) => {
    if (!isPaymentConfigured) {
      resolve({ status: "error", message: "Payments are not configured." });
      return;
    }

    try {
      const popup = new PaystackPop();
      popup.newTransaction({
        key: PUBLIC_KEY,
        email,
        // Paystack expects the smallest currency unit (cents for ZAR).
        amount: Math.round(amount * 100),
        currency: "ZAR",
        reference,
        metadata,
        onSuccess: (tx) =>
          resolve({ status: "success", reference: tx?.reference || reference }),
        onCancel: () => resolve({ status: "cancelled" }),
        onError: (err) =>
          resolve({
            status: "error",
            message: err?.message || "Could not start the payment.",
          }),
      });
    } catch (err) {
      resolve({
        status: "error",
        message: err?.message || "Could not start the payment.",
      });
    }
  });
}
