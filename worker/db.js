// MySQL access for the Worker, via Cloudflare Hyperdrive + mysql2.
// Tables are defined in worker/schema.sql.
//
// Every function takes `connectImpl` so tests can swap in a fake
// connection. In production it defaults to a real Hyperdrive connection.

/** True when a Hyperdrive binding is configured (see wrangler.toml). */
export function hasDatabase(env) {
  return Boolean(env && env.HYPERDRIVE);
}

/** Open a connection through Hyperdrive. Hyperdrive pools underneath. */
export async function connect(env) {
  // Imported lazily so requests that never touch the database (like
  // /verify) don't pay for loading the driver.
  const { createConnection } = await import("mysql2/promise");
  return createConnection({
    host: env.HYPERDRIVE.host,
    user: env.HYPERDRIVE.user,
    password: env.HYPERDRIVE.password,
    database: env.HYPERDRIVE.database,
    port: env.HYPERDRIVE.port,
    // Required for mysql2 to run inside Workers.
    disableEval: true,
  });
}

/** Current stock for every product: { "Product name": 12, ... } */
export async function readStock(env, connectImpl = connect) {
  const conn = await connectImpl(env);
  try {
    const [rows] = await conn.query("SELECT name, stock FROM products");
    return Object.fromEntries(rows.map((r) => [r.name, Number(r.stock)]));
  } finally {
    await conn.end().catch(() => {});
  }
}

// Merge duplicate lines and sort by name. A consistent lock order stops two
// simultaneous orders from deadlocking each other.
function normaliseLines(items) {
  const totals = new Map();
  for (const { name, qty } of items) {
    totals.set(name, (totals.get(name) || 0) + qty);
  }
  return [...totals.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, qty]) => ({ name, qty }));
}

/**
 * Record an order and reduce stock, all in ONE transaction, so stock can
 * never go negative and a failed order changes nothing.
 *
 * Resolves to one of:
 *   { status: "committed" }                   stock reduced
 *   { status: "duplicate" }                   this reference was already
 *                                             processed (safe to retry)
 *   { status: "insufficient", short: [...] }  not enough stock; nothing
 *                                             changed. short = [{name, available}]
 *
 * Products that have no row in `products` are untracked and never limited.
 * For a PAID (online) order that turns out to be oversold, a row with
 * status 'oversold' is saved so you can see who needs a refund.
 */
export async function commitOrder(
  env,
  { reference, method, items },
  connectImpl = connect,
) {
  const lines = normaliseLines(items);
  const names = lines.map((l) => l.name);
  const conn = await connectImpl(env);

  try {
    await conn.beginTransaction();
    try {
      // 1. Claim the reference. A duplicate means we've seen this order.
      try {
        await conn.execute(
          "INSERT INTO orders (reference, method, items) VALUES (?, ?, ?)",
          [reference, method, JSON.stringify(lines)],
        );
      } catch (err) {
        if (err && err.code === "ER_DUP_ENTRY") {
          await conn.rollback();
          // Report the ORIGINAL outcome: a retry of an oversold order must
          // not look like a success.
          const [prev] = await conn.query(
            "SELECT status FROM orders WHERE reference = ?",
            [reference],
          );
          if (prev[0] && prev[0].status === "oversold") {
            return { status: "insufficient", short: [] };
          }
          return { status: "duplicate" };
        }
        throw err;
      }

      // 2. Lock and read the stock rows for this order.
      const [rows] = await conn.query(
        "SELECT name, stock FROM products WHERE name IN (?) ORDER BY name FOR UPDATE",
        [names],
      );
      const available = new Map(rows.map((r) => [r.name, Number(r.stock)]));

      // 3. Anything short? Then change nothing.
      const short = lines
        .filter((l) => available.has(l.name) && available.get(l.name) < l.qty)
        .map((l) => ({ name: l.name, available: available.get(l.name) }));
      if (short.length > 0) {
        await conn.rollback();
        if (method === "online") {
          // Money was taken: leave a trail so it can be refunded.
          await conn
            .execute(
              "INSERT IGNORE INTO orders (reference, method, status, items) VALUES (?, ?, 'oversold', ?)",
              [reference, method, JSON.stringify(lines)],
            )
            .catch(() => {});
        }
        return { status: "insufficient", short };
      }

      // 4. Reduce stock for tracked products.
      for (const l of lines) {
        if (!available.has(l.name)) continue;
        await conn.execute(
          "UPDATE products SET stock = stock - ? WHERE name = ?",
          [l.qty, l.name],
        );
      }

      await conn.commit();
      return { status: "committed" };
    } catch (err) {
      await conn.rollback().catch(() => {});
      throw err;
    }
  } finally {
    await conn.end().catch(() => {});
  }
}
