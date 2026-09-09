import { Link } from "react-router-dom";
import Photo from "../components/Photo";
import Feature from "../components/Feature";
import { CATEGORIES } from "../data/content";
import { Arrow, Leaf, Sparkle, Globe, Heart } from "../components/Icons";

const aboutFeatures = [
  { icon: Leaf, title: "100% Organic", desc: "& Natural Ingredients" },
  { icon: Sparkle, title: "No Harmful Chemicals", desc: "or Additives" },
  { icon: Globe, title: "Sustainably Sourced", desc: "& Ethically Produced" },
  { icon: Heart, title: "Holistic Wellness", desc: "for a Better You" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div
          className="container section"
          style={{ paddingTop: 64, paddingBottom: 64 }}
        >
          <div className="split split--hero">
            <div>
              <p className="eyebrow">Pure Ingredients. Real Results.</p>
              <h1 style={{ fontSize: "clamp(2.2rem,4.6vw,3.4rem)" }}>
                Your Journey to
                <br />
                Natural Wellness
                <br />
                Starts Here
              </h1>
              <p className="text-muted mt-24" style={{ maxWidth: 440 }}>
                At Verge Wellness, we believe true beauty and health come from
                nature. Our organic powders, superfoods, skin and haircare
                products are carefully crafted to nourish your body from the
                inside out.
              </p>
              <Link to="/shop" className="btn btn--primary mt-32">
                Shop Our Collection <Arrow />
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Photo
                media="photo--portrait"
                style={{ height: 380 }}
                alt="Woman enjoying natural skincare"
              />
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  top: 24,
                  right: 20,
                  fontSize: "1.7rem",
                  lineHeight: 1.5,
                  textAlign: "right",
                }}
              >
                Healthy Hair
                <br />
                Glowing Skin
                <br />
                Balanced Body ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr .9fr",
              gap: 32,
              alignItems: "center",
            }}
            className="about-strip"
          >
            <Photo
              media="photo--oil"
              style={{ height: 280 }}
              alt="Organic powders and oils"
            />
            <div>
              <p className="eyebrow">About Us</p>
              <h2 style={{ fontSize: "2rem" }}>
                Nature's Goodness,
                <br />
                For a Healthier You
              </h2>
              <p className="text-muted mt-16">
                Verge Wellness is an organic health and beauty brand dedicated
                to foundational vitality. We source the highest quality
                superfoods and botanical essentials to nourish your hair, skin,
                and body from the inside out.
              </p>
              <Link to="/about" className="btn btn--primary mt-24">
                Learn More <Arrow />
              </Link>
            </div>
            <div className="panel">
              {aboutFeatures.map((f) => (
                <Feature key={f.title} {...f} style={{ marginBottom: 18 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section
        className="section"
        style={{
          background: "var(--forest)",
          color: "#dbe7d3",
          position: "relative",
        }}
      >
        <div className="container text-center" style={{ position: "relative" }}>
          <p className="eyebrow" style={{ color: "#a9c39d" }}>
            Our Mission
          </p>
          <h2 style={{ color: "#fff", fontSize: "2.4rem" }}>
            Simplify Holistic Living
          </h2>
          <p style={{ maxWidth: 680, margin: "16px auto 0", color: "#cdddc6" }}>
            To simplify holistic living through pure, potent, and sustainably
            sourced ingredients. From nutrient-dense powders to traditionally
            crafted oils and butters, we empower your organic journey from the
            inside out.
          </p>
          <p style={{ marginTop: 22, color: "#eaf1e5", fontWeight: 500 }}>
            🌱 Verge Wellness | Foundational Health | Holistic Beauty 🌱
          </p>
          <p
            className="script"
            style={{
              position: "absolute",
              right: 24,
              top: 0,
              color: "#cfe0c6",
              fontSize: "1.6rem",
              lineHeight: 1.4,
              textAlign: "right",
            }}
          >
            Good
            <br />
            Health
            <br />
            Greener
            <br />
            Future ♡
          </p>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div className="section-head">
            <h2>Organic Powders, Superfoods &amp; More</h2>
            <p>Pure ingredients. Powerful benefits.</p>
            <Link to="/shop" className="btn btn--outline mt-16">
              View All Products <Arrow />
            </Link>
          </div>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(5,1fr)" }}
          >
            {CATEGORIES.map((c) => (
              <Link key={c.name} className="cat-card" to="/shop">
                <Photo media={c.media} src={c.image} alt={c.name} />
                <h4>{c.name}</h4>
                <p>{c.blurb}</p>
                <span className="shop-link">
                  {c.link} <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
