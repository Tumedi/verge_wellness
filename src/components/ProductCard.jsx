import { useStore } from "./StoreContext";
import Photo from "./Photo";
import Stars from "./Stars";
import { Heart } from "./Icons";

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  return (
    <article className="card product">
      <Photo
        media={product.media}
        src={product.image}
        alt={product.name}
        className="product__media"
      >
        <button className="product__wish" aria-label="Add to wishlist">
          <Heart />
        </button>
      </Photo>
      <div className="product__body">
        <h4 className="product__name">{product.name}</h4>
        {product.size && <div className="product__size">{product.size}</div>}
        <div className="product__price">R{product.price.toFixed(2)}</div>
        <Stars rating={product.rating} reviews={product.reviews} />
      </div>
      <button
        className="btn btn--primary"
        onClick={() => addToCart(product.name)}
      >
        Add to Cart
      </button>
    </article>
  );
}
