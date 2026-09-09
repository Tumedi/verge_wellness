import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NAV } from "../data/content";
import { useStore } from "./StoreContext";
import { Leaf, Search, User, Cart, Menu } from "./Icons";

function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand__name">
        <Leaf /> Verge Wellness
      </span>
      <span className="brand__tag">Organic · Natural · Holistic</span>
    </Link>
  );
}

export { Brand };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="container nav">
        <Brand />
        <ul className={`nav__links${open ? " open" : ""}`}>
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="nav__actions">
          <button className="icon-btn" aria-label="Search">
            <Search />
          </button>
          {user ? (
            <div className="account-menu">
              <button
                className="icon-btn account-menu__trigger"
                aria-label="Account"
              >
                <User />
                <span className="account-menu__name">
                  {user.name.split(" ")[0]}
                </span>
              </button>
              <div className="account-menu__dropdown">
                <span className="account-menu__email">{user.email}</span>
                <button
                  className="account-menu__logout"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link className="icon-btn" to="/login" aria-label="Sign in">
              <User />
            </Link>
          )}
          <button className="icon-btn" aria-label="Cart">
            <Cart />
            {cart > 0 && <span className="cart-count">{cart}</span>}
          </button>
          <button
            className="nav__toggle"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
