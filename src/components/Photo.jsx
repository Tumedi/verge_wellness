import { Leaf } from "./Icons";

/**
 * Framed media block. Renders a real <img> when `src` is provided,
 * otherwise falls back to the themed gradient + leaf watermark.
 *
 * @param {string} media  - gradient variant class, e.g. "photo--powder"
 * @param {string} [src]  - optional real image url
 * @param {string} [alt]
 */
export default function Photo({
  media = "photo--powder",
  src,
  alt = "",
  style,
  className = "",
  children,
}) {
  return (
    <div className={`photo ${media} ${className}`.trim()} style={style}>
      {src ? (
        <img className="photo__img" src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo-ph" style={{ height: "100%" }}>
          <Leaf />
        </div>
      )}
      {children}
    </div>
  );
}
