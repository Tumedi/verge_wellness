// Stock levels come from MySQL via the Worker (see worker/). If the Worker
// isn't configured, or the database is unreachable, we simply return null and
// the shop treats every product as available. Stock problems must never
// stop customers from browsing.

const API_URL = import.meta.env.VITE_PAYMENT_API_URL;

/** Show an "Only N left" nudge at or below this many units. */
export const LOW_STOCK_THRESHOLD = 5;

/**
 * Fetch current stock.
 * @returns {Promise<Record<string, number> | null>}  { "Product name": 12 }
 *   or null when stock isn't available (not configured / not tracked / error).
 */
export async function fetchStock() {
  if (!API_URL) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${API_URL.replace(/\/+$/, "")}/stock`, {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.tracked || !data.stock) return null;
    return data.stock;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
