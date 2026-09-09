import { useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/content";
import { Arrow, Leaf, Chevron } from "../components/Icons";

const CATS = [
  "Organic Powders & Superfoods",
  "Capsules & Supplements",
  "Skin Care",
  "Hair Care",
  "Bundles",
  "All Products",
];
const TYPES = [
  "Powders",
  "Capsules",
  "Oils & Butters",
  "Skincare",
  "Haircare",
  "Bundles",
];
const BENEFITS = [
  "Energy & Vitality",
  "Immune Support",
  "Digestive Health",
  "Healthy Skin",
  "Healthy Hair",
  "Detox & Cleansing",
];

export default function Shop() {
  const [activeCat, setActiveCat] = useState(0);

  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div className="container" style={{ padding: "56px 24px" }}>
          <div className="split split--hero">
            <div>
              <p className="eyebrow">Shop</p>
              <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                Pure Ingredients.
                <br />
                Real Wellness.
              </h1>
              <p className="text-muted mt-16" style={{ maxWidth: 420 }}>
                Discover our range of organic powders, superfoods, skincare and
                haircare products designed to nourish your body, inside and out.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.4rem" }}>
                Nature's goodness, made for you. ♡
              </p>
            </div>
            <Photo
              media="photo--powder"
              src="/images/moringa-powder.jpg"
              style={{ height: 260 }}
              alt="Moringa powder"
            />
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div
            className="breadcrumb"
            style={{
              fontSize: ".82rem",
              color: "var(--muted)",
              marginBottom: 24,
            }}
          >
            <Link to="/" style={{ color: "var(--green-500)" }}>
              Home
            </Link>{" "}
            › Shop
          </div>

          <div className="shop-layout">
            {/* SIDEBAR */}
            <aside className="side-col">
              <div className="side-box">
                <h4>Shop by Category</h4>
                <ul className="cat-list">
                  {CATS.map((c, i) => (
                    <li key={c}>
                      <button
                        className={i === activeCat ? "active" : undefined}
                        onClick={() => setActiveCat(i)}
                      >
                        <Leaf size={18} /> {c}{" "}
                        <span style={{ marginLeft: "auto" }}>
                          <Chevron />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="side-box" style={{ marginTop: 20 }}>
                <h4>Filter by</h4>
                <strong style={{ fontSize: ".82rem", color: "var(--forest)" }}>
                  Product Type
                </strong>
                <div style={{ marginTop: 8 }}>
                  {TYPES.map((t) => (
                    <label key={t}>
                      <input type="checkbox" /> {t}
                    </label>
                  ))}
                </div>
                <div className="filter-group">
                  <strong
                    style={{ fontSize: ".82rem", color: "var(--forest)" }}
                  >
                    Benefits
                  </strong>
                  <div style={{ marginTop: 8 }}>
                    {BENEFITS.map((b) => (
                      <label key={b}>
                        <input type="checkbox" /> {b}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="panel panel--sage"
                style={{ marginTop: 20, textAlign: "left" }}
              >
                <h4
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.2rem",
                    color: "var(--forest)",
                  }}
                >
                  Clean Ingredients. Lasting Wellness.
                </h4>
                <Link to="/benefits" className="btn btn--primary mt-16">
                  Our Benefits <Arrow />
                </Link>
              </div>
            </aside>

            {/* PRODUCTS */}
            <div>
              <div className="sort-row">
                <div>
                  <h2 style={{ fontSize: "1.8rem" }}>
                    Organic Powders &amp; Superfoods
                  </h2>
                  <p className="text-muted" style={{ fontSize: ".9rem" }}>
                    Nutrient-rich. Plant-powered. Pure.
                  </p>
                </div>
                <select className="select" defaultValue="pop">
                  <option value="pop">Sort by: Popularity</option>
                  <option value="lh">Price: Low to High</option>
                  <option value="hl">Price: High to Low</option>
                  <option value="new">Newest</option>
                </select>
              </div>
              <div className="product-grid">
                {PRODUCTS.powders.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>

              <div className="cat-banner">
                <div>
                  <h3>Capsules &amp; Supplements</h3>
                  <p className="text-muted" style={{ fontSize: ".85rem" }}>
                    Targeted support for your health and wellness.
                  </p>
                </div>
                <Photo
                  media="photo--oil"
                  src="/images/ashwagandha-capsules.jpg"
                  alt="Capsules"
                />
              </div>
              <div className="product-grid">
                {PRODUCTS.capsules.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>

              <div className="cat-banner">
                <div>
                  <h3>Skin &amp; Hair Care</h3>
                  <p className="text-muted" style={{ fontSize: ".85rem" }}>
                    Pure care. Natural beauty.
                  </p>
                </div>
                <Photo
                  media="photo--oil"
                  src="/images/hair-growth-oil.jpg"
                  alt="Hair &amp; skin care"
                />
              </div>
              <div className="product-grid">
                {PRODUCTS.skincare.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
