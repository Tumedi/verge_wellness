// Verge Wellness backend (Cloudflare Worker).
//
// Routes
//   GET  /stock    current stock levels from MySQL, for the shop pages
//   POST /orders   submit an order: verifies an online payment with
//                  Paystack, then reduces stock in one safe transaction
//   POST /verify   payment check only (no stock changes)
//
// The browser never sees the Paystack secret or the database password.
//
// Secrets and config (never commit these):
//   PAYSTACK_SECRET_KEY  secret   `npx wrangler secret put PAYSTACK_SECRET_KEY`
//   ALLOWED_ORIGINS      var      comma-separated site origins (wrangler.toml)
//   HYPERDRIVE           binding  MySQL connection (wrangler.toml); optional.
//                                 Without it the Worker still verifies
//                                 payments but does not track stock.

import { PRODUCTS } from "../src/data/content.js";
import { shippingFor } from "../src/data/pricing.js";
import { hasDatabase, readStock, commitOrder } from "./db.js";

const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/";

// name -> price (rand), built from the same product data the site uses.
const PRICES = new Map(
  Object.values(PRODUCTS)
    .flat()
    .map((p) => [p.name, p.price]),
);

const REFERENCE_PATTERN = /^[A-Za-z0-9.=-]{1,100}$/;
const MAX_LINES = 50;
const MAX_QTY = 100;

/**
 * Work out the order total in CENTS from the cart, using server-side prices.
 * Also validates the cart. Returns { ok: true, cents } or { ok, reason }.
 */
export function expectedAmountCents(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > MAX_LINES) {
    return { ok: false, reason: "Invalid cart." };
  }
  let subtotal = 0;
  for (const item of items) {
    const price = PRICES.get(item?.name);
    const qty = item?.qty;
    if (price === undefined) {
      return { ok: false, reason: "Unknown product in cart." };
    }
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
      return { ok: false, reason: "Invalid quantity in cart." };
    }
    subtotal += price * qty;
  }
  const total = subtotal + shippingFor(subtotal);
  return { ok: true, cents: Math.round(total * 100) };
}

function corsHeaders(origin, allowed) {
  if (!origin || !allowed.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

/**
 * Ask Paystack what really happened for this reference and check it against
 * the expected amount. Returns { ok: true, amount } or
 * { ok: false, status, reason } where status is the HTTP status to send.
 */
async function verifyPaystack(reference, expectedCents, env, fetchImpl) {
  let paystack;
  try {
    const res = await fetchImpl(
      PAYSTACK_VERIFY_URL + encodeURIComponent(reference),
      { headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` } },
    );
    paystack = await res.json();
  } catch {
    return {
      ok: false,
      status: 502,
      reason: "Could not reach the payment provider.",
    };
  }

  const tx = paystack?.data;
  if (!paystack?.status || !tx) {
    return { ok: false, status: 422, reason: "Payment not found." };
  }
  if (tx.status !== "success") {
    return {
      ok: false,
      status: 422,
      reason: `Payment was not successful (${tx.status}).`,
    };
  }
  if (tx.reference !== reference) {
    return { ok: false, status: 422, reason: "Reference mismatch." };
  }
  if (tx.currency !== "ZAR") {
    return { ok: false, status: 422, reason: "Wrong currency." };
  }
  if (tx.amount !== expectedCents) {
    return {
      ok: false,
      status: 422,
      reason: "Amount paid does not match the order.",
    };
  }
  return { ok: true, amount: tx.amount / 100 };
}

/**
 * Core handler. `fetchImpl` and `deps` are injectable so it can be tested
 * without the real Paystack API or a real database.
 */
export async function handleRequest(
  request,
  env,
  fetchImpl = fetch,
  deps = {},
) {
  const read = deps.readStock || readStock;
  const commit = deps.commitOrder || commitOrder;

  const url = new URL(request.url);
  const origin = request.headers.get("Origin");
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const cors = corsHeaders(origin, allowed);

  // Browsers from any other site are refused outright.
  if (origin && !cors["Access-Control-Allow-Origin"]) {
    return json({ verified: false, reason: "Origin not allowed." }, 403);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  // ---- GET /stock ----------------------------------------------------
  if (request.method === "GET" && url.pathname === "/stock") {
    if (!hasDatabase(env)) {
      return json({ ok: true, tracked: false, stock: {} }, 200, cors);
    }
    try {
      const stock = await read(env);
      return json({ ok: true, tracked: true, stock }, 200, {
        ...cors,
        "Cache-Control": "public, max-age=5",
      });
    } catch (err) {
      console.error("Stock read failed:", err?.message);
      return json({ ok: false, tracked: false, stock: {} }, 503, cors);
    }
  }

  if (request.method !== "POST") {
    return json({ verified: false, reason: "Not found." }, 404, cors);
  }
  if (url.pathname !== "/verify" && url.pathname !== "/orders") {
    return json({ verified: false, reason: "Not found." }, 404, cors);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ verified: false, reason: "Invalid request." }, 400, cors);
  }

  const reference = body?.reference;
  if (typeof reference !== "string" || !REFERENCE_PATTERN.test(reference)) {
    return json({ verified: false, reason: "Invalid reference." }, 400, cors);
  }

  const expected = expectedAmountCents(body?.items);
  if (!expected.ok) {
    return json({ verified: false, reason: expected.reason }, 400, cors);
  }

  // ---- POST /verify --------------------------------------------------
  if (url.pathname === "/verify") {
    if (!env.PAYSTACK_SECRET_KEY) {
      return json(
        { verified: false, reason: "Verification is not configured." },
        500,
        cors,
      );
    }
    const v = await verifyPaystack(reference, expected.cents, env, fetchImpl);
    if (!v.ok) {
      return json({ verified: false, reason: v.reason }, v.status, cors);
    }
    return json({ verified: true, amount: v.amount }, 200, cors);
  }

  // ---- POST /orders --------------------------------------------------
  const method = body?.method;
  if (method !== "online" && method !== "cod") {
    return json({ ok: false, reason: "Invalid payment method." }, 400, cors);
  }

  // Online orders must be backed by a real, matching Paystack payment.
  let verified = false;
  if (method === "online") {
    if (!env.PAYSTACK_SECRET_KEY) {
      return json(
        { ok: false, verified: false, reason: "Verification is not configured." },
        500,
        cors,
      );
    }
    const v = await verifyPaystack(reference, expected.cents, env, fetchImpl);
    if (!v.ok) {
      return json(
        { ok: false, verified: false, reason: v.reason },
        v.status,
        cors,
      );
    }
    verified = true;
  }

  // No database configured: orders still work, stock just isn't tracked.
  if (!hasDatabase(env)) {
    return json({ ok: true, verified, stockTracked: false }, 200, cors);
  }

  const lines = body.items.map((i) => ({ name: i.name, qty: i.qty }));
  try {
    const result = await commit(env, { reference, method, items: lines });
    if (result.status === "insufficient") {
      return json(
        { ok: false, verified, reason: "out_of_stock", short: result.short },
        409,
        cors,
      );
    }
    return json({ ok: true, verified, stockTracked: true }, 200, cors);
  } catch (err) {
    // The database is down or erroring. Don't punish a customer who may
    // already have paid: accept the order and flag that stock wasn't updated.
    console.error("Stock update failed for", reference, ":", err?.message);
    return json({ ok: true, verified, stockTracked: false }, 200, cors);
  }
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
