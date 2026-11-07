import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FREE_SHIPPING_ENABLED,
  FREE_SHIPPING_THRESHOLD,
  shippingFor,
} from "../data/pricing";
import { fetchStock } from "../lib/stock";

const StoreContext = createContext(null);

// Demo-only auth: users are kept in localStorage. This is a front-end
// simulation (no real backend / password hashing) so the sign-up and
// login flows are fully interactive. Swap these helpers for real API
// calls when a backend is available.
const USERS_KEY = "vw_users";
const SESSION_KEY = "vw_user";
const CART_KEY = "vw_cart_items";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

// Shipping rules live in src/data/pricing.js so the payment-verification
// Worker uses exactly the same numbers.

export function StoreProvider({ children }) {
  // Cart is a list of line items: { name, price, image, size, qty }.
  const [cartItems, setCartItems] = useState(readCart);
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  // Live stock from MySQL: { "Product name": 12 }. null means unknown (not
  // configured or the database is unreachable), and then every product is
  // treated as available so the shop never breaks.
  const [stock, setStock] = useState(null);

  const refreshStock = useCallback(async () => {
    const latest = await fetchStock();
    // Keep the last known levels if a refresh fails.
    if (latest) setStock(latest);
    return latest;
  }, []);

  useEffect(() => {
    refreshStock();
    // Re-check when the customer comes back to the tab.
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshStock();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refreshStock]);

  /** Units available for a product, or null if we don't know. */
  const stockFor = useCallback(
    (name) => (stock && name in stock ? stock[name] : null),
    [stock],
  );

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 1800);
  }, []);

  // Accepts either a product object or a bare name (back-compat).
  const addToCart = useCallback(
    (product, qty = 1) => {
      const item =
        typeof product === "string" ? { name: product, price: 0 } : product;
      if (!item || !item.name) return;

      // Never let the cart exceed what's in stock.
      const limit = stockFor(item.name);
      if (limit !== null) {
        const inCart = cartItems.find((i) => i.name === item.name)?.qty || 0;
        if (limit <= 0) {
          showToast(`${item.name} is out of stock`);
          return;
        }
        if (inCart + qty > limit) {
          showToast(`Only ${limit} of ${item.name} in stock`);
          return;
        }
      }

      setCartItems((items) => {
        const idx = items.findIndex((i) => i.name === item.name);
        if (idx !== -1) {
          const next = [...items];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [
          ...items,
          {
            name: item.name,
            price: Number(item.price) || 0,
            image: item.image,
            size: item.size,
            qty,
          },
        ];
      });
      showToast(item.name ? `Added ${item.name} to cart` : "Added to cart");
    },
    [showToast, stockFor, cartItems],
  );

  const updateQty = useCallback(
    (name, qty) => {
      let next = Math.max(0, qty);
      const limit = stockFor(name);
      if (limit !== null && next > limit) {
        next = Math.max(0, limit);
        showToast(`Only ${limit} of ${name} in stock`);
      }
      setCartItems((items) =>
        items
          .map((i) => (i.name === name ? { ...i, qty: next } : i))
          .filter((i) => i.qty > 0),
      );
    },
    [stockFor, showToast],
  );

  const removeFromCart = useCallback((name) => {
    setCartItems((items) => items.filter((i) => i.name !== name));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // Derived cart figures.
  const cartCount = useMemo(
    () => cartItems.reduce((n, i) => n + i.qty, 0),
    [cartItems],
  );
  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems],
  );
  const shipping = useMemo(
    () => (cartItems.length === 0 ? 0 : shippingFor(subtotal)),
    [cartItems.length, subtotal],
  );
  const total = subtotal + shipping;

  // Returns { ok: true } or { ok: false, error }
  const signup = useCallback(
    ({ name, email, password }) => {
      const users = readUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) {
        return {
          ok: false,
          error: "An account with this email already exists.",
        };
      }
      const record = { name, email, password };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, record]));
      const session = { name, email };
      setUser(session);
      showToast(`Welcome, ${name.split(" ")[0]}!`);
      return { ok: true };
    },
    [showToast],
  );

  const login = useCallback(
    ({ email, password }) => {
      const users = readUsers();
      const match = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!match) {
        return { ok: false, error: "Invalid email or password." };
      }
      const session = { name: match.name, email: match.email };
      setUser(session);
      showToast(`Welcome back, ${match.name.split(" ")[0]}!`);
      return { ok: true };
    },
    [showToast],
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast("Signed out");
  }, [showToast]);

  const value = {
    // cart
    cartItems,
    cartCount,
    // `cart` kept as a number for back-compat (navbar badge etc.)
    cart: cartCount,
    subtotal,
    shipping,
    total,
    // null while free shipping is switched off (see src/data/pricing.js)
    freeShippingThreshold: FREE_SHIPPING_ENABLED
      ? FREE_SHIPPING_THRESHOLD
      : null,
    // stock (null when unknown; see stockFor)
    stockFor,
    refreshStock,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    // ui
    showToast,
    // auth
    user,
    signup,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
