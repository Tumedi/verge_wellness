import emailjs from "@emailjs/browser";

// EmailJS config is read from Vite env vars (see .env.example). The public
// key is safe to expose in client code — that is how EmailJS is designed.
// Set these in a local `.env` file (or your host's env settings):
//   VITE_EMAILJS_SERVICE_ID
//   VITE_EMAILJS_TEMPLATE_ID
//   VITE_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(
  SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY,
);

const money = (n) => `R${Number(n).toFixed(2)}`;

/**
 * Send an order-confirmation email via EmailJS.
 * @param {object} order - the placed order snapshot from Checkout.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function sendOrderConfirmation(order) {
  if (!isEmailConfigured) {
    return {
      ok: false,
      error: "Email is not configured.",
    };
  }

  // Build a readable line-item list for the email body.
  const itemsText = order.items
    .map((i) => `${i.name} x ${i.qty} — ${money(i.price * i.qty)}`)
    .join("\n");

  // These keys must match the variables used in your EmailJS template,
  // e.g. {{order_id}}, {{customer_name}}, {{to_email}}, {{order_items}},
  // {{order_subtotal}}, {{order_shipping}}, {{order_total}}.
  const templateParams = {
    order_id: order.id,
    customer_name: order.customer.name,
    to_email: order.customer.email,
    order_items: itemsText,
    order_subtotal: money(order.subtotal),
    order_shipping: order.shipping === 0 ? "Free" : money(order.shipping),
    order_total: money(order.total),
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err?.text || err?.message || "Failed to send email.",
    };
  }
}
