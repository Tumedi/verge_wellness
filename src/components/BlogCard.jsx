import Photo from "./Photo";
import { Arrow } from "./Icons";

export default function BlogCard({ post }) {
  return (
    <article className="card blog-card">
      <Photo media={post.media} src={post.image} alt={post.title} />
      <div className="blog-card__body">
        <span className="badge">{post.tag}</span>
        <h3>{post.title}</h3>
        <div className="blog-meta">
          {post.date} &nbsp;·&nbsp; {post.read}
        </div>
        <p>{post.excerpt}</p>
        <a href="#" className="read-more">
          Read More <Arrow />
        </a>
      </div>
    </article>
  );
}
