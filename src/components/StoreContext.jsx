import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = Number(localStorage.getItem("vw_cart") || "0");
    return Number.isFinite(saved) ? saved : 0;
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("vw_cart", String(cart));
  }, [cart]);

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

  return (
    <StoreContext.Provider value={{ cart, addToCart, showToast }}>
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
