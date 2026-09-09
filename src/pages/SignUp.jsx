import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../components/StoreContext";
import { Leaf, Mail, Arrow, Sparkle, Heart, Globe } from "../components/Icons";

const perks = [
  { icon: Sparkle, text: "Faster checkout & order tracking" },
  { icon: Heart, text: "Save your favourite products" },
  { icon: Globe, text: "Exclusive wellness tips & offers" },
];

export default function SignUp() {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      setError("Please accept the Terms & Conditions to continue.");
      return;
    }

    const res = signup({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    if (res.ok) navigate("/", { replace: true });
    else setError(res.error);
  };

  return (
    <section className="auth">
      <div className="container auth__grid">
        {/* Brand / imagery side */}
        <aside className="auth__aside auth__aside--signup">
          <div className="auth__aside-inner">
            <span className="brand__name" style={{ color: "#fff" }}>
              <Leaf /> Verge Wellness
            </span>
            <p className="auth__aside-tag">Organic · Natural · Holistic</p>
            <h2 className="auth__aside-title">
              Join a community
              <br />
              rooted in nature.
            </h2>
            <ul className="auth__perks">
              {perks.map((p) => (
                <li key={p.text}>
                  <span className="auth__perk-icon">
                    <p.icon size={18} />
                  </span>
                  {p.text}
                </li>
              ))}
            </ul>
            <p className="script script--on-photo auth__aside-script">
              Wellness is a lifestyle. ♡
            </p>
          </div>
        </aside>

        {/* Form side */}
        <div className="auth__form-wrap">
          <div className="auth__card">
            <p className="eyebrow">Get Started</p>
            <h1 className="auth__title">Create Account</h1>
            <p className="text-muted auth__subtitle">
              Start your natural wellness journey with us today.
            </p>

            {error && <div className="auth__error">{error}</div>}

            <form onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="two-col">
                <div className="field">
                  <label htmlFor="password">Password *</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="confirm">Confirm Password *</label>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <label className="auth__terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={onChange}
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="auth__link">
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="auth__link">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Create Account <Arrow />
              </button>
            </form>

            <div className="auth__divider">
              <span>or</span>
            </div>

            <button className="btn btn--pill-light auth__social">
              <Mail size={18} /> Sign up with Email
            </button>

            <p className="auth__switch">
              Already have an account?{" "}
              <Link to="/login" className="auth__link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
