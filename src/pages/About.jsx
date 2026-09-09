import Photo from "../components/Photo";
import Feature from "../components/Feature";
import { Leaf, Sparkle, Globe, Heart, User } from "../components/Icons";

const missionFeatures = [
  { icon: Leaf, title: "100% Organic", desc: "& Natural Ingredients" },
  { icon: Sparkle, title: "No Harmful Chemicals", desc: "or Additives" },
  { icon: Globe, title: "Sustainably Sourced", desc: "& Ethically Produced" },
  { icon: Heart, title: "Holistic Wellness", desc: "for a Better You" },
];

const values = [
  { icon: Leaf, title: "Natural Living" },
  { icon: Heart, title: "Self Care & Beauty" },
  { icon: User, title: "Community Wellness" },
  { icon: Globe, title: "Sustainable Future" },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div className="container" style={{ padding: "56px 24px" }}>
          <div className="split split--hero">
            <div>
              <p className="eyebrow">About Us</p>
              <h1 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>
                Wellness Rooted
                <br />
                in Nature
              </h1>
              <p
                style={{
                  fontWeight: 600,
                  color: "var(--forest)",
                  letterSpacing: ".08em",
                  fontSize: ".8rem",
                  textTransform: "uppercase",
                  margin: "14px 0",
                }}
              >
                Pure Ingredients · Real Care · Lasting Wellness
              </p>
              <p className="text-muted" style={{ maxWidth: 440 }}>
                At Verge Wellness, we believe true beauty and health come from
                nature. Our organic products, superfoods, skin and haircare
                solutions are carefully crafted to nourish your body from the
                inside out.
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <Photo
                media="photo--portrait"
                style={{ height: 320 }}
                alt="Natural glowing skin"
              />
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  fontSize: "1.6rem",
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

      {/* OUR STORY */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Photo
              media="photo--oil"
              style={{ height: 340 }}
              alt="Botanical ingredients"
            />
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 style={{ fontSize: "2.2rem" }}>
                Nature Inspired.
                <br />
                Wellness Driven.
              </h2>
              <p className="text-muted mt-16">
                Verge Wellness was born from a simple belief — that nature
                provides everything we need to thrive. What started as a passion
                for organic living quickly grew into a brand dedicated to
                helping others achieve their wellness goals, naturally.
              </p>
              <p className="text-muted mt-16">
                We carefully source the highest quality superfoods, botanical
                extracts and natural ingredients, ensuring that every product we
                offer is pure, potent and effective.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.5rem" }}>
                Because your wellness journey matters. ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section" style={{ background: "var(--panel)" }}>
        <div className="container">
          <div className="split">
            <div>
              <p className="eyebrow">Our Mission</p>
              <h2 style={{ fontSize: "2.2rem" }}>Simplify Holistic Living</h2>
              <p className="text-muted mt-16">
                To simplify holistic living through pure, potent, and
                sustainably sourced ingredients. From nutrient-dense powders to
                traditionally crafted oils and butters, we empower your organic
                journey from the inside out.
              </p>
              <p
                style={{
                  color: "var(--forest)",
                  fontWeight: 600,
                  marginTop: 20,
                }}
              >
                🌱 Verge Wellness | Foundational Health | Holistic Beauty
              </p>
            </div>
            <div>
              {missionFeatures.map((f) => (
                <Feature key={f.title} {...f} style={{ marginBottom: 22 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Photo
              media="photo--landscape"
              style={{ height: 340, position: "relative" }}
              alt="Green landscape"
            >
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  inset: "auto auto 24px 24px",
                  fontSize: "1.7rem",
                  lineHeight: 1.4,
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
            </Photo>
            <div>
              <p className="eyebrow">Our Values</p>
              <h2 style={{ fontSize: "2.2rem" }}>More Than Just Products</h2>
              <p className="text-muted mt-16">
                We are committed to making a positive impact — not just on your
                health and beauty, but on the planet. Our products are
                thoughtfully crafted with sustainability in mind, because we
                believe in a healthier you and a healthier earth.
              </p>
              <div className="values">
                {values.map((v) => (
                  <div className="value" key={v.title}>
                    <div className="value-icon">
                      <v.icon />
                    </div>
                    <h4>{v.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
