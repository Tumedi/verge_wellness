import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../components/StoreContext";
import { Arrow, Leaf, Check } from "../components/Icons";
import { sendOrderConfirmation, isEmailConfigured } from "../lib/email";
import {
  payWithPaystack,
  submitOrder,
  isPaymentConfigured,
  isVerificationConfigured,
} from "../lib/payment";

// "Neem Powder is out of stock; only 2 of Karela Powder left"
function describeShortage(short) {
  if (!short || short.length === 0) {
    return "one or more items are no longer available";
  }
  return short
    .map((s) =>
      s.available <= 0
        ? `${s.name} is out of stock`
        : `only ${s.available} of ${s.name} left`,
    )
    .join("; ");
}

export default function Checkout() {
  const {
    cartItems,
    subtotal,
    shipping,
    total,
    clearCart,
    user,
    showToast,
    refreshStock,
  } = useStore();
  const navigate = useNavigate();

  const money = (n) => `R${n.toFixed(2)}`;

  const [placedOrder, setPlacedOrder] = useState(null);
  const [placing, setPlacing] = useState(false);
  // True from the moment Paystack reports success until the Worker has
  // confirmed the payment; drives the "please don't leave" overlay.
  const [verifying, setVerifying] = useState(false);

  // While an order is being processed, ask the browser to confirm before
  // the customer closes or reloads the tab (they'd lose the result).
  useEffect(() => {
    if (!placing) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [placing]);
  // "sent" | "failed" | "skipped" — status of the confirmation email.
  const [emailStatus, setEmailStatus] = useState(null);
  // Shown above the Place Order button when a payment fails or is cancelled.
  const [payError, setPayError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    province: "Gauteng",
    // "online" = pay now via Paystack; "cod" = cash on delivery.
    payment: "online",
  });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    if (placing) return;
    setPlacing(true);
    setPayError("");

    // Check the freshest stock BEFORE taking any money. (If stock isn't
    // available, `latest` is null and we carry on; the Worker is the final
    // guard against overselling.)
    const latest = await refreshStock();
    if (latest) {
      const short = cartItems
        .filter((i) => i.name in latest && latest[i.name] < i.qty)
        .map((i) => ({ name: i.name, available: latest[i.name] }));
      if (short.length > 0) {
        setPayError(
          `Sorry, ${describeShortage(short)}. Please go back to your cart and update it.`,
        );
        setPlacing(false);
        return;
      }
    }

    const orderId = `VW-${Date.now().toString().slice(-6)}`;

    // Take payment first. Nothing is cleared or emailed until it succeeds.
    //   paid    = charged via Paystack
    //   pending = cash on delivery, pay when the order arrives
    //   demo    = online selected but Paystack isn't configured (no charge)
    let payment = { status: "pending", reference: "" };
    if (form.payment === "online") {
      if (isPaymentConfigured) {
        const res = await payWithPaystack({
          email: form.email,
          amount: total,
          reference: orderId,
          metadata: { order_id: orderId, customer_name: form.name },
        });
        if (res.status === "cancelled") {
          setPayError("Payment was cancelled. Your cart is still saved.");
          setPlacing(false);
          return;
        }
        if (res.status === "error") {
          setPayError(`Payment could not be completed: ${res.message}`);
          setPlacing(false);
          return;
        }

        // The Worker confirms the money really arrived and matches this
        // cart, then reduces stock. (Skipped only if no Worker is set up.)
        if (isVerificationConfigured) setVerifying(true);
        const result = await submitOrder({
          reference: res.reference,
          method: "online",
          items: cartItems,
        });
        if (result.status === "failed") {
          setVerifying(false);
          setPayError(
            `Your payment (reference ${res.reference}) went through, but we could not confirm it automatically: ${result.message} Please do not pay again. Contact us with this reference and we will sort out your order.`,
          );
          setPlacing(false);
          return;
        }
        if (result.status === "out_of_stock") {
          // Rare: the last unit sold to someone else while this customer
          // was paying. The Worker has logged the order for a refund.
          setVerifying(false);
          setPayError(
            `Your payment (reference ${res.reference}) went through, but ${describeShortage(result.short)} just before your order completed. Please do not pay again. Contact us with this reference and we will refund you or arrange the item.`,
          );
          refreshStock();
          setPlacing(false);
          return;
        }
        payment = {
          status: "paid",
          reference: res.reference,
          verified: result.status === "ok" && result.verified,
        };
      } else {
        payment = { status: "demo", reference: "" };
      }
    } else {
      // Cash on delivery: hold the stock for this order now.
      const result = await submitOrder({
        reference: orderId,
        method: "cod",
        items: cartItems,
      });
      if (result.status === "out_of_stock") {
        setPayError(
          `Sorry, ${describeShortage(result.short)}. Please go back to your cart and update it.`,
        );
        refreshStock();
        setPlacing(false);
        return;
      }
      // If the order service can't be reached we still accept the order;
      // stock just isn't updated until you reconcile it.
    }

    // Snapshot the order before clearing the cart so the confirmation
    // screen (and the email) can show what was purchased.
    const order = {
      id: orderId,
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: { ...form },
      payment,
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
    refreshStock(); // show the reduced levels in the shop right away
    setVerifying(false);
    setPlacing(false);
    showToast(
      payment.status === "paid"
        ? "Payment received — order placed!"
        : status === "sent"
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
                <span>
                  {placedOrder.payment.status === "paid"
                    ? "Total Paid"
                    : "Total Due"}
                </span>
                <strong>{money(placedOrder.total)}</strong>
              </div>
              <div className="summary-row">
                <span>Payment</span>
                <strong>
                  {placedOrder.payment.status === "paid" &&
                    `Paid online (ref ${placedOrder.payment.reference})`}
                  {placedOrder.payment.status === "pending" &&
                    "Cash on delivery"}
                  {placedOrder.payment.status === "demo" &&
                    "Demo order, no payment taken"}
                </strong>
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
                  checked={form.payment === "online"}
                  onChange={() =>
                    setForm((f) => ({ ...f, payment: "online" }))
                  }
                />
                Pay online now (card &amp; more, secured by Paystack)
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
                {form.payment === "cod"
                  ? "Pay in cash when your order is delivered."
                  : isPaymentConfigured
                    ? "A secure Paystack window opens when you place your order. We never see or store your card details."
                    : "Demo mode: online payments are not switched on yet, so no money is taken."}
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
            {payError && (
              <p className="pay-error" role="alert">
                {payError}
              </p>
            )}
            <button
              type="submit"
              className="btn btn--primary summary-cta"
              disabled={placing}
            >
              {placing
                ? "Processing…"
                : form.payment === "online" && isPaymentConfigured
                  ? `Pay ${money(total)}`
                  : "Place Order"}{" "}
              <Arrow />
            </button>
            <p className="summary-note">
              🌱 By placing your order you agree to our terms and privacy
              policy.
            </p>
          </aside>
        </form>
      </div>

      {verifying && (
        <div
          className="verify-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="verify-title"
          aria-describedby="verify-desc"
        >
          <div className="verify-overlay__box">
            <div className="verify-spinner" aria-hidden="true" />
            <h2 id="verify-title">Verifying your payment…</h2>
            <p id="verify-desc">
              Your payment was received. Please <strong>do not close or leave
              this page</strong> and do not go back until we have confirmed
              it. This usually takes a few seconds.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
