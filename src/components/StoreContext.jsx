import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

// Free shipping over this order value; flat rate otherwise.
const SHIPPING_FLAT = 60;
const FREE_SHIPPING_THRESHOLD = 500;

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
    [showToast],
  );

  const updateQty = useCallback((name, qty) => {
    setCartItems((items) =>
      items
        .map((i) => (i.name === name ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

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
  const shipping = useMemo(() => {
    if (cartItems.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return SHIPPING_FLAT;
  }, [cartItems.length, subtotal]);
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
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
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
