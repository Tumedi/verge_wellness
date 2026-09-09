import Photo from "../components/Photo";
import Feature from "../components/Feature";
import { INGREDIENTS } from "../data/content";
import { Leaf, Sparkle, Globe, Heart, Drop } from "../components/Icons";

const keyBenefits = [
  {
    icon: Leaf,
    title: "100% Organic & Natural Ingredients",
    desc: "Pure, clean and free from harmful chemicals.",
  },
  {
    icon: Sparkle,
    title: "No Harmful Chemicals or Additives",
    desc: "Gentle on your body, kind to your health.",
  },
  {
    icon: Globe,
    title: "Sustainably Sourced & Ethically Produced",
    desc: "Better for you, better for the planet.",
  },
  {
    icon: Heart,
    title: "Holistic Wellness for a Better You",
    desc: "Nourish your mind, body and spirit.",
  },
  {
    icon: Drop,
    title: "Nutrient-Dense Superfoods",
    desc: "Packed with essential vitamins and minerals.",
  },
  {
    icon: Sparkle,
    title: "Natural Beauty from Within",
    desc: "Healthy skin, strong hair and lasting radiance.",
  },
];

const why = [
  { icon: Heart, title: "Supports Immune Health" },
  { icon: Leaf, title: "Promotes Healthy Skin & Hair" },
  { icon: Sparkle, title: "Enhances Energy & Vitality" },
  { icon: Globe, title: "Protects Our Planet" },
];

export default function Benefits() {
  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div className="container" style={{ padding: "56px 24px" }}>
          <div className="split split--hero">
            <div>
              <p className="eyebrow">Our Benefits</p>
              <h1 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>
                Pure Nutrition.
                <br />
                Lasting Wellness.
              </h1>
              <p className="text-muted mt-16" style={{ maxWidth: 440 }}>
                At Verge Wellness, we believe that true beauty and health come
                from nature. Our organic products are carefully crafted to
                nourish your body, support your wellbeing, and help you feel
                your best — naturally.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.4rem" }}>
                Good health starts from within. ♡
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <Photo
                media="photo--portrait"
                style={{ height: 320 }}
                alt="Radiant natural skin"
              />
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  top: 24,
                  right: 20,
                  fontSize: "1.6rem",
                  lineHeight: 1.5,
                  textAlign: "right",
                }}
              >
                Healthier
                <br />
                You
                <br />
                Naturally ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEY BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow">Key Benefits</p>
              <h2 style={{ fontSize: "2rem" }}>Why Choose Verge Wellness?</h2>
              <p className="text-muted mt-16" style={{ marginBottom: 30 }}>
                Our products are more than just natural — they are a commitment
                to your health, beauty and overall wellbeing. Here's how we help
                you feel good, inside and out.
              </p>
              <div className="benefit-grid">
                {keyBenefits.map((f) => (
                  <Feature key={f.title} {...f} stacked />
                ))}
              </div>
            </div>
            <Photo
              media="photo--powder"
              style={{ height: 420, position: "relative" }}
              alt="Organic powder bowl"
            >
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  inset: "20px 20px auto auto",
                  fontSize: "1.5rem",
                  textAlign: "right",
                  lineHeight: 1.4,
                }}
              >
                Real Ingredients.
                <br />
                Real Results.
              </p>
            </Photo>
          </div>
        </div>
      </section>

      {/* POWER OF NATURE */}
      <section className="section" style={{ background: "var(--panel)" }}>
        <div className="container">
          <div className="split">
            <Photo
              media="photo--powder"
              style={{ height: 300 }}
              alt="Moringa leaves and powder"
            />
            <div>
              <p className="eyebrow">The Power of Nature</p>
              <h2 style={{ fontSize: "2rem" }}>
                Real Ingredients. Real Benefits.
              </h2>
              <p className="text-muted mt-16">
                From nutrient-rich powders to nourishing oils and butters, our
                products are made with nature's most powerful ingredients,
                giving you the support you need to look and feel your best.
              </p>
            </div>
          </div>
          <div className="ingredients">
            {INGREDIENTS.map((g) => (
              <div className="ingredient" key={g.name}>
                <Photo media="photo--leaves" src={g.image} alt={g.name} />
                <h4>{g.name}</h4>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NATURAL MATTERS */}
      <section
        className="section"
        style={{ background: "linear-gradient(120deg,#e3ecd6,#cddbb5)" }}
      >
        <div className="container">
          <div className="split" style={{ alignItems: "center" }}>
            <div>
              <p className="eyebrow">Why Natural Matters</p>
              <h2 style={{ fontSize: "2rem" }}>
                Small Choices Make
                <br />a Big Difference.
              </h2>
              <p className="text-muted mt-16">
                Choosing organic means choosing a healthier you, cleaner
                products and a greener future. Our ingredients are pure, potent
                and purposefully selected — because you deserve the best,
                naturally.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.4rem" }}>
                Nature Nourishes You ♡
              </p>
            </div>
            <div className="why-grid">
              {why.map((w) => (
                <div key={w.title}>
                  <div className="why-icon">
                    <w.icon />
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: ".85rem",
                      fontWeight: 600,
                      color: "var(--forest)",
                    }}
                  >
                    {w.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
