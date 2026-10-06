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

  // Resolve image URLs to absolute paths so they load inside the email.
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const base = import.meta.env.BASE_URL || "/";
  const toAbsolute = (src) => {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    const path = src.startsWith("/") ? `${base}${src.slice(1)}` : src;
    return `${origin}${path}`;
  };

  // `orders` matches the EmailJS default "Order Confirmation" template,
  // which loops over {{#orders}} and prints {{name}}, {{units}}, {{price}}
  // and {{image_url}} for each line item.
  const orders = order.items.map((i) => ({
    name: i.name,
    units: i.qty,
    price: (i.price * i.qty).toFixed(2),
    image_url: toAbsolute(i.image),
  }));

  // Plain-text item list, for templates that print {{order_items}} instead.
  const itemsText = order.items
    .map((i) => `${i.name} x ${i.qty} — ${money(i.price * i.qty)}`)
    .join("\n");

  const templateParams = {
    // --- default "Order Confirmation" template variables ---
    order_id: order.id,
    email: order.customer.email,
    orders,
    cost: {
      shipping: order.shipping.toFixed(2),
      tax: "0.00",
      total: order.total.toFixed(2),
    },
    // --- custom/plain-text variables (used by a custom template) ---
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
