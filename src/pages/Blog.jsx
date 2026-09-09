import Photo from "../components/Photo";
import BlogCard from "../components/BlogCard";
import { useStore } from "../components/StoreContext";
import { POSTS, CATEGORY_COUNTS } from "../data/content";
import { Arrow, Search, Leaf } from "../components/Icons";

export default function Blog() {
  const { showToast } = useStore();

  const onSubscribe = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    showToast("Subscribed!");
  };

  return (
    <>
      {/* HERO */}
      <section className="hero leaf-bg">
        <div className="container" style={{ padding: "56px 24px" }}>
          <div className="split split--hero">
            <div>
              <p className="eyebrow">Our Blog</p>
              <h1 style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
                Wellness Insights
                <br />
                for a Healthier You
              </h1>
              <p className="text-muted mt-16" style={{ maxWidth: 440 }}>
                Explore our blog for natural health tips, organic living advice,
                beauty rituals, and inspiration to support your journey to
                whole-body wellness.
              </p>
              <p className="script mt-16" style={{ fontSize: "1.4rem" }}>
                Natural knowledge. A healthier you. ♡
              </p>
            </div>
            <Photo
              media="photo--powder"
              style={{ height: 250 }}
              alt="Herbs and powder"
            />
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div className="blog-layout">
            {/* ARTICLES */}
            <div>
              <div className="toolbar">
                <p className="text-muted" style={{ fontSize: ".9rem" }}>
                  Showing 1–9 of 18 articles
                </p>
                <select className="select" defaultValue="latest">
                  <option value="latest">Latest Posts</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
              <div className="blog-grid">
                {POSTS.map((p) => (
                  <BlogCard key={p.title} post={p} />
                ))}
              </div>
              <div className="text-center mt-32">
                <button className="btn btn--outline">Load More Articles</button>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className="side-card">
                <div className="search-box">
                  <input type="text" placeholder="Search articles..." />
                  <button aria-label="Search">
                    <Search />
                  </button>
                </div>
              </div>
              <div className="side-card">
                <h4>Categories</h4>
                <ul className="cat-links">
                  {CATEGORY_COUNTS.map(([name, count]) => (
                    <li key={name}>
                      <Leaf size={18} /> <a href="#">{name}</a>{" "}
                      <span className="count">({count})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="newsletter">
                <div style={{ display: "grid", placeItems: "center" }}>
                  <Leaf size={30} />
                </div>
                <h4
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.35rem",
                    color: "var(--forest)",
                    margin: "8px 0 6px",
                  }}
                >
                  Stay in the Loop
                </h4>
                <p className="text-muted" style={{ fontSize: ".83rem" }}>
                  Get the latest wellness tips, new product updates and
                  exclusive offers delivered to your inbox.
                </p>
                <form
                  className="subscribe"
                  style={{ margin: "16px auto 0", maxWidth: "100%" }}
                  onSubmit={onSubscribe}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit" aria-label="Subscribe">
                    <Arrow />
                  </button>
                </form>
                <button
                  className="btn btn--primary mt-16"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => showToast("Subscribed!")}
                >
                  Subscribe <Arrow />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
