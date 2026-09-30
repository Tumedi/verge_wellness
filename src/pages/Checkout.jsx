import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../components/StoreContext";
import { Arrow, Leaf, Check } from "../components/Icons";
import { sendOrderConfirmation, isEmailConfigured } from "../lib/email";

export default function Checkout() {
  const {
    cartItems,
    subtotal,
    shipping,
    total,
    clearCart,
    user,
    showToast,
  } = useStore();
  const navigate = useNavigate();

  const money = (n) => `R${n.toFixed(2)}`;

  const [placedOrder, setPlacedOrder] = useState(null);
  const [placing, setPlacing] = useState(false);
  // "sent" | "failed" | "skipped" — status of the confirmation email.
  const [emailStatus, setEmailStatus] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    province: "Gauteng",
    payment: "card",
  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    if (placing) return;
    setPlacing(true);

    // Snapshot the order before clearing the cart so the confirmation
    // screen (and the email) can show what was purchased.
    const order = {
      id: `VW-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: { ...form },
    };

    // Send the confirmation email. The order still succeeds even if the
    // email fails or EmailJS isn't configured — we just report the status.
    let status = "skipped";
    if (isEmailConfigured) {
      const res = await sendOrderConfirmation(order);
      status = res.ok ? "sent" : "failed";
    }

    setEmailStatus(status);
    setPlacedOrder(order);
    clearCart();
    setPlacing(false);
    showToast(
      status === "sent"
        ? "Order placed — confirmation email sent!"
        : "Order placed successfully!",
    );
  };

  // CONFIRMATION VIEW
  if (placedOrder) {
    return (
      <section className="section">
        <div className="container">
          <div className="order-confirm">
            <div className="order-confirm__icon">
              <Check size={40} />
            </div>
            <h1>Thank you for your order!</h1>
            <p className="text-muted mt-8">
              Your order <strong>#{placedOrder.id}</strong> has been placed
              successfully.
            </p>
            {emailStatus === "sent" && (
              <p className="email-status email-status--ok mt-8">
                ✓ A confirmation email with your order number was sent to{" "}
                <strong>{placedOrder.customer.email}</strong>.
              </p>
            )}
            {emailStatus === "failed" && (
              <p className="email-status email-status--warn mt-8">
                Your order is confirmed, but we couldn't send the confirmation
                email right now. Please keep your order number for reference.
              </p>
            )}
            {emailStatus === "skipped" && (
              <p className="email-status mt-8">
                A confirmation for order <strong>#{placedOrder.id}</strong> would
                be emailed to <strong>{placedOrder.customer.email}</strong>.
              </p>
            )}

            <div className="order-confirm__summary">
              <h3>Order Summary</h3>
              {placedOrder.items.map((i) => (
                <div className="summary-row" key={i.name}>
                  <span>
                    {i.name} × {i.qty}
                  </span>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              ))}
              <div className="summary-row">
                <span>Shipping</span>
                <strong>
                  {placedOrder.shipping === 0
                    ? "Free"
                    : money(placedOrder.shipping)}
                </strong>
              </div>
              <div className="summary-row summary-row--total">
                <span>Total Paid</span>
                <strong>{money(placedOrder.total)}</strong>
              </div>
            </div>

            <Link to="/shop" className="btn btn--primary mt-24">
              Continue Shopping <Arrow />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // EMPTY CART GUARD
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
              Add some products before heading to checkout.
            </p>
            <Link to="/shop" className="btn btn--primary mt-24">
              Browse Products <Arrow />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // CHECKOUT FORM
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
          <Link to="/cart" style={{ color: "var(--green-500)" }}>
            Cart
          </Link>{" "}
          › Checkout
        </div>

        <h1 style={{ fontSize: "2rem", marginBottom: 28 }}>Checkout</h1>

        <form className="checkout-layout" onSubmit={onPlaceOrder}>
          {/* DETAILS */}
          <div className="checkout-form">
            <div className="form-card">
              <h3>Contact Details</h3>
              <div className="two-col">
                <div className="field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="078 000 0000"
                  required
                />
              </div>
            </div>

            <div className="form-card" style={{ marginTop: 20 }}>
              <h3>Shipping Address</h3>
              <div className="field">
                <label>Street Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="123 Wellness Street"
                  required
                />
              </div>
              <div className="two-col">
                <div className="field">
                  <label>City / Town *</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={set("city")}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="field">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    value={form.postal}
                    onChange={set("postal")}
                    placeholder="0000"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label>Province *</label>
                <select value={form.province} onChange={set("province")}>
                  <option>Gauteng</option>
                  <option>Western Cape</option>
                  <option>KwaZulu-Natal</option>
                  <option>Eastern Cape</option>
                  <option>Free State</option>
                  <option>Limpopo</option>
                  <option>Mpumalanga</option>
                  <option>North West</option>
                  <option>Northern Cape</option>
                </select>
              </div>
            </div>

            <div className="form-card" style={{ marginTop: 20 }}>
              <h3>Payment Method</h3>
              <label className="pay-option">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "card"}
                  onChange={() => setForm((f) => ({ ...f, payment: "card" }))}
                />
                Credit / Debit Card
              </label>
              <label className="pay-option">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "eft"}
                  onChange={() => setForm((f) => ({ ...f, payment: "eft" }))}
                />
                Instant EFT
              </label>
              <label className="pay-option">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "cod"}
                  onChange={() => setForm((f) => ({ ...f, payment: "cod" }))}
                />
                Cash on Delivery
              </label>
              <p className="text-muted" style={{ fontSize: ".8rem", marginTop: 10 }}>
                This is a demo checkout — no real payment is processed.
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cartItems.map((i) => (
                <div className="summary-row" key={i.name}>
                  <span>
                    {i.name} × {i.qty}
                  </span>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shipping === 0 ? "Free" : money(shipping)}</strong>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
            <button
              type="submit"
              className="btn btn--primary summary-cta"
              disabled={placing}
            >
              {placing ? "Placing Order…" : "Place Order"} <Arrow />
            </button>
            <p className="summary-note">
              🌱 By placing your order you agree to our terms and privacy
              policy.
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
