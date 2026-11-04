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
  // Images in an email must be reachable from the public internet — a
  // localhost URL (when testing locally) will always render broken in a
  // mail client. So build image URLs from a fixed PUBLIC base, not from
  // window.location. Override via VITE_PUBLIC_SITE_URL if the site moves.
  const PUBLIC_BASE = (
    import.meta.env.VITE_PUBLIC_SITE_URL ||
    "https://tumedi.github.io/verge_wellness/"
  ).replace(/\/+$/, "");
  const toAbsolute = (src) => {
    if (!src) return "";
    if (/^https?:\/\//i.test(src)) return src;
    const path = src.startsWith("/") ? src : `/${src}`;
    return `${PUBLIC_BASE}${path}`;
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

  const c = order.customer;
  // One-line, email-friendly shipping address assembled from the parts
  // the customer filled in at checkout. Empty parts are skipped.
  const shippingAddress = [
    c.address,
    c.city,
    c.postal,
    c.province,
  ]
    .filter(Boolean)
    .join(", ");

  // Map the stored payment code to a human-readable label.
  const PAYMENT_LABELS = {
    online: "Paid online (Paystack)",
    cod: "Cash on Delivery",
  };
  const pay = order.payment || {};
  const paymentMethod =
    pay.status === "demo"
      ? "Online payment (demo, no charge)"
      : PAYMENT_LABELS[c.payment] || "Not specified";
  const PAYMENT_STATUS_LABELS = {
    paid: pay.verified ? "Paid (verified)" : "Paid",
    pending: "Payment due on delivery",
    demo: "Demo order, no payment taken",
  };
  const paymentStatus = PAYMENT_STATUS_LABELS[pay.status] || "";

  const templateParams = {
    order_id: order.id,
    // Recipient — set the template's "To Email" field to {{email}}.
    email: c.email,
    customer_name: c.name,
    // Shipping / contact details — add {{shipping_address}}, {{phone}},
    // etc. to the template to display them.
    shipping_address: shippingAddress,
    ship_address: c.address || "",
    ship_city: c.city || "",
    ship_postal: c.postal || "",
    ship_province: c.province || "",
    phone: c.phone || "",
    // Payment method — add {{payment_method}} to the template.
    payment_method: paymentMethod,
    // Optional extras: add {{payment_status}} / {{payment_reference}} to
    // the template to show whether it was paid and the Paystack reference.
    payment_status: paymentStatus,
    payment_reference: pay.reference || "",
    // Line items — the template loops: {{#orders}} ... {{/orders}}
    // and prints {{name}}, {{units}}, {{price}}, {{image_url}} per item.
    orders,
    // Cost breakdown.
    cost: {
      shipping: order.shipping.toFixed(2),
      total: order.total.toFixed(2),
    },
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
