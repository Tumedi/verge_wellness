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
 * Ask the Worker to confirm a payment really went through for this cart.
 * @returns {Promise<
 *   {status: "verified"} | {status: "skipped"} |
 *   {status: "failed", message: string}
 * >}
 */
export async function verifyPayment({ reference, items }) {
  if (!VERIFY_API_URL) return { status: "skipped" };
  try {
    const res = await fetch(`${VERIFY_API_URL.replace(/\/+$/, "")}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        // Only names and quantities: the Worker applies its own prices.
        items: items.map((i) => ({ name: i.name, qty: i.qty })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.verified) return { status: "verified" };
    return {
      status: "failed",
      message: data.reason || "The payment could not be verified.",
    };
  } catch {
    return {
      status: "failed",
      message: "The verification service could not be reached.",
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
