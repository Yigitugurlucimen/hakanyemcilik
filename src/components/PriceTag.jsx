import { formatPrice, hasPrice } from "../lib/formatPrice.js";

const PriceTag = ({ price, size = "md", className = "" }) => {
  if (!hasPrice(price)) {
    return (
      <p
        className={`font-semibold text-emeraldDark/60 ${size === "lg" ? "text-base" : "text-sm"} ${className}`}
      >
        Fiyat için iletişime geçin
      </p>
    );
  }

  return (
    <p
      className={`font-black text-emeraldDark ${size === "lg" ? "text-2xl md:text-3xl" : "text-lg"} ${className}`}
    >
      {formatPrice(price)}
    </p>
  );
};

export default PriceTag;
