import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const StoreContext = createContext(null);

// Demo-only auth: users are kept in localStorage. This is a front-end
// simulation (no real backend / password hashing) so the sign-up and
// login flows are fully interactive. Swap these helpers for real API
// calls when a backend is available.
const USERS_KEY = "vw_users";
const SESSION_KEY = "vw_user";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = Number(localStorage.getItem("vw_cart") || "0");
    return Number.isFinite(saved) ? saved : 0;
  });
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("vw_cart", String(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 1800);
  }, []);

  const addToCart = useCallback(
    (name) => {
      setCart((c) => c + 1);
      showToast(name ? `Added ${name} to cart` : "Added to cart");
    },
    [showToast],
  );

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

  return (
    <StoreContext.Provider
      value={{ cart, addToCart, showToast, user, signup, login, logout }}
    >
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
