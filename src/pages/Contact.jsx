import Photo from "../components/Photo";
import { useStore } from "../components/StoreContext";
import {
  Arrow,
  Phone,
  Mail,
  Pin,
  Clock,
  Instagram,
  Facebook,
  TikTok,
  YouTube,
  Leaf,
} from "../components/Icons";

const info = [
  {
    icon: Phone,
    title: "Phone",
    main: "+27 72 123 4567",
    sub: "Mon – Fri: 8:00 AM – 5:00 PM (SAST)",
  },
  {
    icon: Mail,
    title: "Email",
    main: "hello@vergewellness.co.za",
    sub: "We aim to respond within 24 hours.",
  },
  {
    icon: Pin,
    title: "Our Location",
    main: "Johannesburg, Gauteng, South Africa",
    sub: "(By Appointment Only)",
  },
];

export default function Contact() {
  const { showToast } = useStore();

  const onSend = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    showToast("Message sent! We will be in touch soon.");
  };

  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div className="container" style={{ padding: "56px 24px" }}>
          <div className="split split--hero">
            <div>
              <p className="eyebrow">Get in Touch</p>
              <h1 style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>Contact Us</h1>
              <h3
                style={{
                  color: "var(--green-500)",
                  fontSize: "1.4rem",
                  marginTop: 6,
                }}
              >
                We'd love to hear from you.
              </h3>
              <p className="text-muted mt-16" style={{ maxWidth: 440 }}>
                Have a question, feedback or need assistance? Our team is here
                to help. Reach out to us and we'll get back to you as soon as
                possible.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.4rem" }}>
                Your wellness journey matters. ♡
              </p>
            </div>
            <Photo
              media="photo--powder"
              style={{ height: 250, position: "relative" }}
              alt="Natural wellness ingredients"
            >
              <p
                className="script script--on-photo"
                style={{
                  position: "absolute",
                  inset: "20px 20px auto auto",
                  fontSize: "1.4rem",
                  textAlign: "right",
                  lineHeight: 1.4,
                }}
              >
                Natural
                <br />
                Support
                <br />
                Always ♡
              </p>
            </Photo>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* INFO */}
            <div>
              <h2 style={{ fontSize: "1.9rem" }}>Contact Information</h2>
              <p className="text-muted mt-8" style={{ marginBottom: 28 }}>
                Feel free to reach out to us through any of the channels below.
                We're here to help!
              </p>
              <div>
                {info.map((x) => (
                  <div className="info-item" key={x.title}>
                    <div className="info-icon">
                      <x.icon />
                    </div>
                    <div>
                      <h4>{x.title}</h4>
                      <p style={{ color: "var(--forest)", fontWeight: 500 }}>
                        {x.main}
                      </p>
                      <p>{x.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <p
                  style={{
                    fontWeight: 600,
                    color: "var(--forest)",
                    fontSize: ".9rem",
                    marginBottom: 10,
                  }}
                >
                  Follow Us · @vergewellness
                </p>
                <div className="socials socials--dark">
                  <a href="#" aria-label="Instagram">
                    <Instagram />
                  </a>
                  <a href="#" aria-label="Facebook">
                    <Facebook />
                  </a>
                  <a href="#" aria-label="TikTok">
                    <TikTok />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <YouTube />
                  </a>
                </div>
              </div>
              <div
                className="panel"
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div className="feature__icon">
                  <Leaf />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--sans)",
                      fontWeight: 600,
                      color: "var(--forest)",
                    }}
                  >
                    Wholesale &amp; Bulk Orders
                  </h4>
                  <p className="text-muted" style={{ fontSize: ".83rem" }}>
                    Interested in placing a bulk order or partnership? We'd love
                    to work with you!
                  </p>
                  <a
                    href="#"
                    className="btn btn--primary mt-16"
                    style={{ padding: "10px 20px" }}
                  >
                    Get in Touch <Arrow />
                  </a>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="form-card">
              <h2 style={{ fontSize: "1.9rem" }}>Send Us a Message</h2>
              <p className="text-muted mt-8" style={{ marginBottom: 22 }}>
                Fill in the form below and we'll get back to you as soon as
                possible.
              </p>
              <form onSubmit={onSend}>
                <div className="two-col">
                  <div className="field">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="field">
                    <label>Email Address *</label>
                    <input type="email" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="field">
                  <label>Subject *</label>
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option>General Enquiry</option>
                    <option>Product Question</option>
                    <option>Wholesale / Bulk Order</option>
                    <option>Support</option>
                  </select>
                </div>
                <div className="field">
                  <label>Your Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Send Message <Arrow />
                </button>
              </form>
              <p className="script mt-16" style={{ fontSize: "1.3rem" }}>
                🌿 Together for a healthier you. ♡
              </p>
            </div>
          </div>

          {/* MAP + HOURS */}
          <div className="bottom-grid">
            <div className="map">
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: "var(--forest)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Pin />
                </div>
                <strong>Johannesburg</strong>
                <br />
                <span style={{ fontSize: ".82rem" }}>
                  Gauteng, South Africa
                </span>
              </div>
            </div>
            <div className="hours-card">
              <h3 style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Clock /> Business Hours
              </h3>
              <div style={{ marginTop: 16 }}>
                <div className="hours-row">
                  <span>Monday – Friday</span>
                  <strong>8:00 AM – 5:00 PM</strong>
                </div>
                <div className="hours-row">
                  <span>Saturday</span>
                  <strong>9:00 AM – 1:00 PM</strong>
                </div>
                <div className="hours-row" style={{ border: "none" }}>
                  <span>Sunday</span>
                  <strong>Closed</strong>
                </div>
              </div>
              <p className="script mt-16" style={{ fontSize: "1.2rem" }}>
                🌱 We're committed to supporting your wellness journey, every
                step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
