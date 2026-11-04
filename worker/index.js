// Verge Wellness payment verification (Cloudflare Worker).
//
// The browser takes payment through Paystack's popup, then calls this
// Worker with the payment reference and the cart. The Worker:
//   1. recomputes what the order SHOULD cost from its own price list,
//   2. asks Paystack (using the SECRET key, which only lives here) what was
//      actually charged for that reference,
//   3. only answers "verified" if Paystack says success AND the amount and
//      currency match.
//
// Secrets and config (never commit the secret key):
//   PAYSTACK_SECRET_KEY  secret  `npx wrangler secret put PAYSTACK_SECRET_KEY`
//   ALLOWED_ORIGINS      var     comma-separated site origins (wrangler.toml)

import { PRODUCTS } from "../src/data/content.js";
import { shippingFor } from "../src/data/pricing.js";

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
 * Returns { ok: true, cents } or { ok: false, reason }.
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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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
 * Core handler. `fetchImpl` is injectable so it can be tested without
 * calling the real Paystack API.
 */
export async function handleRequest(request, env, fetchImpl = fetch) {
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

  if (request.method !== "POST" || url.pathname !== "/verify") {
    return json({ verified: false, reason: "Not found." }, 404, cors);
  }

  if (!env.PAYSTACK_SECRET_KEY) {
    return json(
      { verified: false, reason: "Verification is not configured." },
      500,
      cors,
    );
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

  // Ask Paystack what really happened for this reference.
  let paystack;
  try {
    const res = await fetchImpl(
      PAYSTACK_VERIFY_URL + encodeURIComponent(reference),
      { headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` } },
    );
    paystack = await res.json();
  } catch {
    return json(
      { verified: false, reason: "Could not reach the payment provider." },
      502,
      cors,
    );
  }

  const tx = paystack?.data;
  if (!paystack?.status || !tx) {
    return json(
      { verified: false, reason: "Payment not found." },
      422,
      cors,
    );
  }
  if (tx.status !== "success") {
    return json(
      { verified: false, reason: `Payment was not successful (${tx.status}).` },
      422,
      cors,
    );
  }
  if (tx.reference !== reference) {
    return json({ verified: false, reason: "Reference mismatch." }, 422, cors);
  }
  if (tx.currency !== "ZAR") {
    return json({ verified: false, reason: "Wrong currency." }, 422, cors);
  }
  if (tx.amount !== expected.cents) {
    return json(
      { verified: false, reason: "Amount paid does not match the order." },
      422,
      cors,
    );
  }

  return json({ verified: true, amount: tx.amount / 100 }, 200, cors);
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  },
};
