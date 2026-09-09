import { Link } from "react-router-dom";
import { useStore } from "./StoreContext";
import { Brand } from "./Navbar";
import { Arrow, Facebook, Instagram, TikTok, YouTube } from "./Icons";

export default function Footer() {
  const { showToast } = useStore();

  const onSubscribe = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    showToast("Subscribed!");
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p
              style={{
                fontSize: ".85rem",
                color: "#c3d2bd",
                marginTop: 16,
                maxWidth: 230,
              }}
            >
              Pure ingredients, real care and lasting wellness — rooted in
              nature.
            </p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/benefits">Our Benefits</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Help &amp; Support</h5>
            <ul className="footer-links">
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Shipping &amp; Returns</a>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Stay Connected</h5>
            <p style={{ fontSize: ".85rem", color: "#c3d2bd" }}>
              Join our community for wellness tips, exclusive offers and more.
            </p>
            <form className="subscribe" onSubmit={onSubscribe}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">
                <Arrow />
              </button>
            </form>
          </div>
          <div>
            <h5>Follow Us</h5>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" aria-label="TikTok">
                <TikTok />
              </a>
              <a href="#" aria-label="YouTube">
                <YouTube />
              </a>
            </div>
            <p
              className="script"
              style={{ color: "#c9d8c2", fontSize: "1.25rem", marginTop: 18 }}
            >
              Wellness is a lifestyle ♡
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Verge Wellness. All rights reserved.</span>
          <span className="links">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
