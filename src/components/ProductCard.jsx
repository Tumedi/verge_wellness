import { useStore } from "./StoreContext";
import Photo from "./Photo";
import Stars from "./Stars";
import { Heart } from "./Icons";
import { LOW_STOCK_THRESHOLD } from "../lib/stock";

export default function ProductCard({ product }) {
  const { addToCart, stockFor } = useStore();

  // null = stock unknown (not configured / database unreachable), which we
  // treat as available so the shop keeps working.
  const stock = stockFor(product.name);
  const soldOut = stock !== null && stock <= 0;
  const lowStock = stock !== null && stock > 0 && stock <= LOW_STOCK_THRESHOLD;

  return (
    <article className={`card product${soldOut ? " product--soldout" : ""}`}>
      <Photo
        media={product.media}
        src={product.image}
        alt={product.name}
        className="product__media"
      >
        {soldOut && (
          <span className="stock-badge stock-badge--out">Out of stock</span>
        )}
        {lowStock && (
          <span className="stock-badge stock-badge--low">
            Only {stock} left
          </span>
        )}
        <button className="product__wish" aria-label="Add to wishlist">
          <Heart />
        </button>
      </Photo>
      <div className="product__body">
        <h4 className="product__name">{product.name}</h4>
        {product.size && <div className="product__size">{product.size}</div>}
        <div className="product__price">R{product.price.toFixed(2)}</div>
        <Stars rating={product.rating} reviews={product.reviews} />
        {product.benefits && (
          <p className="product__benefits" title={product.description}>
            {product.benefits}
          </p>
        )}
      </div>
      <button
        className="btn btn--primary"
        onClick={() => addToCart(product)}
        disabled={soldOut}
        aria-disabled={soldOut}
      >
        {soldOut ? "Out of Stock" : "Add to Cart"}
      </button>
    </article>
  );
}
