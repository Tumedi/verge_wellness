import { useEffect, useState } from "react";
import { Leaf } from "./Icons";

/**
 * Framed media block. Renders a real <img> when `src` is provided AND it
 * loads successfully; otherwise it falls back to the themed gradient +
 * leaf watermark. This means a product can declare an `image` path that
 * hasn't been uploaded yet without showing a broken-image icon — it just
 * shows the placeholder until the real file exists.
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
  const [failed, setFailed] = useState(false);

  // Reset the error state if the src changes (e.g. filters swap products).
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImg = src && !failed;

  return (
    <div className={`photo ${media} ${className}`.trim()} style={style}>
      {showImg ? (
        <img
          className="photo__img"
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-ph" style={{ height: "100%" }}>
          <Leaf />
        </div>
      )}
      {children}
    </div>
  );
}
