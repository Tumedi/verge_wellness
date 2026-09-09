import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../components/StoreContext";
import { Leaf, Mail, Arrow } from "../components/Icons";

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    const res = login(form);
    if (res.ok) navigate(from, { replace: true });
    else setError(res.error);
  };

  return (
    <section className="auth">
      <div className="container auth__grid">
        {/* Brand / imagery side */}
        <aside className="auth__aside">
          <div className="auth__aside-inner">
            <span className="brand__name" style={{ color: "#fff" }}>
              <Leaf /> Verge Wellness
            </span>
            <p className="auth__aside-tag">Organic · Natural · Holistic</p>
            <h2 className="auth__aside-title">
              Welcome back to
              <br />
              your wellness journey.
            </h2>
            <p className="auth__aside-copy">
              Sign in to track orders, save your favourites and check out faster
              — all in one nourishing place.
            </p>
            <p className="script script--on-photo auth__aside-script">
              Good health starts from within. ♡
            </p>
          </div>
        </aside>

        {/* Form side */}
        <div className="auth__form-wrap">
          <div className="auth__card">
            <p className="eyebrow">Welcome Back</p>
            <h1 className="auth__title">Sign In</h1>
            <p className="text-muted auth__subtitle">
              Enter your details to access your account.
            </p>

            {error && <div className="auth__error">{error}</div>}

            <form onSubmit={onSubmit} noValidate>
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
              <div className="field">
                <label htmlFor="password">Password *</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="auth__row">
                <label className="auth__remember">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="auth__link">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Sign In <Arrow />
              </button>
            </form>

            <div className="auth__divider">
              <span>or</span>
            </div>

            <button className="btn btn--pill-light auth__social">
              <Mail size={18} /> Continue with Email
            </button>

            <p className="auth__switch">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="auth__link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
