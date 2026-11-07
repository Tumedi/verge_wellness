import { Link, useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import { useStore } from "../components/StoreContext";
import { Arrow, Leaf } from "../components/Icons";

export default function Cart() {
  const {
    cartItems,
    subtotal,
    shipping,
    total,
    freeShippingThreshold,
    updateQty,
    removeFromCart,
    clearCart,
    stockFor,
  } = useStore();
  const navigate = useNavigate();

  const money = (n) => `R${n.toFixed(2)}`;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  // A line is a problem when we know the stock and the cart asks for more.
  const isOver = (item) => {
    const limit = stockFor(item.name);
    return limit !== null && item.qty > limit;
  };
  const blocked = cartItems.some(isOver);

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty__icon">
              <Leaf size={40} />
            </div>
            <h1>Your cart is empty</h1>
            <p className="text-muted mt-8">
              Looks like you haven't added anything yet. Explore our organic
              range and find something to nourish your wellness.
            </p>
            <Link to="/shop" className="btn btn--primary mt-24">
              Continue Shopping <Arrow />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div
          className="breadcrumb"
          style={{
            fontSize: ".82rem",
            color: "var(--muted)",
            marginBottom: 20,
          }}
        >
          <Link to="/" style={{ color: "var(--green-500)" }}>
            Home
          </Link>{" "}
          › <Link to="/shop" style={{ color: "var(--green-500)" }}>
            Shop
          </Link>{" "}
          › Cart
        </div>

        <h1 style={{ fontSize: "2rem", marginBottom: 6 }}>Your Cart</h1>
        <p className="text-muted" style={{ marginBottom: 28 }}>
          {cartItems.length} {cartItems.length === 1 ? "product" : "products"}{" "}
          in your cart.
        </p>

        <div className="cart-layout">
          {/* LINE ITEMS */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-row" key={item.name}>
                <div className="cart-row__media">
                  <Photo
                    media="photo--powder"
                    src={item.image}
                    alt={item.name}
                    style={{ height: 96, width: 96 }}
                  />
                </div>
                <div className="cart-row__info">
                  <h4>{item.name}</h4>
                  {item.size && (
                    <div className="cart-row__size">{item.size}</div>
                  )}
                  <div className="cart-row__price">{money(item.price)}</div>
                  {isOver(item) && (
                    <p className="cart-row__stock" role="alert">
                      {stockFor(item.name) <= 0
                        ? "Sorry, this item is now out of stock. Please remove it to continue."
                        : `Only ${stockFor(item.name)} available. Please reduce the quantity to continue.`}
                    </p>
                  )}
                  <button
                    className="cart-row__remove"
                    onClick={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-row__qty">
                  <div className="qty-stepper">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => updateQty(item.name, item.qty - 1)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      disabled={
                        stockFor(item.name) !== null &&
                        item.qty >= stockFor(item.name)
                      }
                      onClick={() => updateQty(item.name, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-row__subtotal">
                    {money(item.price * item.qty)}
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <Link to="/shop" className="btn btn--outline">
                Continue Shopping
              </Link>
              <button className="link-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shipping === 0 ? "Free" : money(shipping)}</strong>
            </div>
            {remainingForFree > 0 && (
              <p className="summary-hint">
                Add {money(remainingForFree)} more to qualify for free shipping.
              </p>
            )}
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
            {blocked && (
              <p className="summary-hint" role="alert">
                Some items in your cart are no longer available in the quantity
                you chose. Please update them to continue.
              </p>
            )}
            <button
              className="btn btn--primary summary-cta"
              onClick={() => navigate("/checkout")}
              disabled={blocked}
            >
              Proceed to Checkout <Arrow />
            </button>
            <p className="summary-note">
              🌿 Secure checkout. Taxes calculated at the next step.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
